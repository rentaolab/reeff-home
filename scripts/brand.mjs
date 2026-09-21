#!/usr/bin/env node
/**
 * Regenerates every asset for the brand site from the two source SVGs.
 *
 *   npm run brand
 *
 * Sources: public/brand/mark.svg (32x32 family mark), public/brand/og.svg (1200x630).
 * Outputs: src/app/icon.svg|icon.png|icon1.png|icon2.png|apple-icon.png|opengraph-image.png
 *          public/brand/icon-192.png|icon-512.png|icon-512-maskable.png
 *
 * The mark ships four product colours at once, so unlike the tool subdomain there
 * is no single accent to swap here.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = path.resolve(import.meta.dirname, "..");
const DARK = "#0F172A";

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const write = (p, data) => {
  fs.mkdirSync(path.dirname(path.join(ROOT, p)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, p), data);
};
const raster = (svg, size, out) =>
  sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, out));

const mark = read("public/brand/mark.svg");
const og = read("public/brand/og.svg");
const markInner = mark.slice(mark.indexOf("-->") + 3, mark.lastIndexOf("</svg>"));

// 1. vector favicon + raster sizes for Safari / iOS / Android
write("src/app/icon.svg", mark);
await raster(mark, 32, "src/app/icon.png");
await raster(mark, 48, "src/app/icon1.png");
await raster(mark, 96, "src/app/icon2.png");
await raster(mark, 180, "src/app/apple-icon.png");
await raster(mark, 192, "public/brand/icon-192.png");
await raster(mark, 512, "public/brand/icon-512.png");

// 2. maskable icon: keep the mark inside the centre 80% safe area
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="${DARK}"/>
  <g transform="translate(71.68 71.68) scale(${(512 * 0.72) / 32})">${markInner}</g>
</svg>`;
await raster(maskable, 512, "public/brand/icon-512-maskable.png");

// 3. social card — density 72 keeps the 1200x630 pixels 1:1
const ogPng = await sharp(Buffer.from(og), { density: 72 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, "src/app/opengraph-image.png"));

// ---- report + sanity check --------------------------------------------------
const meta = await sharp(path.join(ROOT, "src/app/opengraph-image.png")).metadata();
const { data, info } = await sharp(path.join(ROOT, "src/app/opengraph-image.png"))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let brightMinX = info.width;
let brightMaxX = -1;
let brightMaxY = -1;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    if (data[i] > 140 && data[i + 1] > 140 && data[i + 2] > 140) {
      if (x < brightMinX) brightMinX = x;
      if (x > brightMaxX) brightMaxX = x;
      if (y > brightMaxY) brightMaxY = y;
    }
  }
}
const margin = Math.min(brightMinX, info.width - 1 - brightMaxX);

console.log("brand assets regenerated");
console.log(`  src/app/icon.svg        ${mark.length} bytes`);
console.log(`  icon.png 32 / icon1.png 48 / icon2.png 96 / apple-icon.png 180`);
console.log(
  `  opengraph-image.png     ${meta.width}x${meta.height} (${ogPng.size} bytes); white ink x ${brightMinX}..${brightMaxX}, bottom ${brightMaxY} → margin ${margin}px ${margin >= 24 ? "OK" : "TOO TIGHT"}`,
);
console.log(`  public/brand/icon-192, icon-512, icon-512-maskable`);
