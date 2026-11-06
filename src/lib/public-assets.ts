import { existsSync } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const cache = new Map<string, boolean>();

/**
 * Whether a `/public` path really exists in this build.
 *
 * Guide figures point at screenshots that are taken separately from the copy.
 * Rendering an <img> for a file nobody has shot yet would put a broken image on
 * a page we are asking a human reviewer to trust, so the check happens at build
 * time (these pages are statically generated) and the figure is skipped when the
 * file is missing. In development the block renders a dashed placeholder with
 * its planned path instead, so the gap stays visible while writing.
 */
export function publicFileExists(src: string): boolean {
  const cached = cache.get(src);
  if (cached !== undefined) return cached;
  const exists = existsSync(path.join(PUBLIC_DIR, src.replace(/^\//, "")));
  cache.set(src, exists);
  return exists;
}
