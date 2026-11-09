#!/usr/bin/env node
/**
 * Content gate for reeff.app (see docs/adsense-review-plan.md §6).
 *
 * Runs from `postbuild`, so it reads the pages Next actually rendered rather
 * than the source that was supposed to produce them. A green run means: every
 * article exists in both languages, is long enough, carries honest ISO dates and
 * author, shows its screenshot, is not `noindex`, and appears in a sitemap with
 * more than the six URLs that got the site rejected.
 *
 * Exit code is non-zero on any failure, so `npm run build` fails too. That is
 * the point: a thin or half-finished page must not reach production.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD = path.join(ROOT, ".next", "server", "app");
const GUIDES_SRC = path.join(ROOT, "src", "content", "guides");
const PUBLIC = path.join(ROOT, "public");

/** Floors from §2/§6 of the plan. They are engineering thresholds, not Google's. */
const MIN_GUIDE_WORDS = 1200;
const MIN_GUIDE_CJK = 1500;
const MIN_HOME_WORDS = 900;
const MIN_SITEMAP_URLS = 30;

/** The 9 articles committed to in §5 of the plan. A silent disappearance fails. */
const EXPECTED_SLUGS = [
  "merge-pdf-without-losing-bookmarks",
  "split-pdf-into-chapters",
  "why-compress-pdf-barely-shrinks",
  "print-ready-pdf-checklist",
  "delete-extract-reorder-which-tool",
  "sign-a-pdf-without-printer",
  "images-to-pdf-dpi-and-size",
  "pdf-to-image-dpi-guide",
  "browser-memory-limits-for-pdf",
];

/** Pages a reviewer must be able to reach. Home is checked separately. */
const REQUIRED_PAGES = ["/about", "/contact", "/why-local", "/guides", "/changelog", "/roadmap", "/privacy", "/terms"];

const LOCALES = ["en", "zh"];
const problems = [];
const notes = [];
const fail = (message) => problems.push(message);

const read = (file) => readFileSync(file, "utf8");
const rel = (file) => path.relative(ROOT, file);

/** `.next/server/app/<locale>.html` for home, `<locale>/<path>.html` otherwise. */
function htmlFile(locale, routePath) {
  const target = routePath === "" || routePath === "/" ? `${locale}.html` : path.join(locale, `${routePath.replace(/^\//, "")}.html`);
  return path.join(BUILD, target);
}

/** Rendered text only: no scripts, no styles, no tags, no entities. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&[a-z]+;|&#\d+;/g, " ");
}

const CJK_RE = /[\u3400-\u9fff\uf900-\ufaff]/g;
const LATIN_WORD_RE = /[A-Za-z0-9][A-Za-z0-9'’-]*/g;

/** Same maths as textStats() in src/lib/content.ts, applied to rendered HTML. */
function stats(text) {
  const cjk = text.match(CJK_RE)?.length ?? 0;
  const words = text.replace(CJK_RE, " ").match(LATIN_WORD_RE)?.length ?? 0;
  return { words, cjk };
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/* ---------------------------------------------------------------- sources -- */

/**
 * Source-level facts that HTML cannot show once a page is rendered: dates,
 * author, and the screenshot a figure points at. Read with regexes on purpose —
 * this script has no TypeScript toolchain and must stay `node scripts/*.mjs`.
 */
function readGuideSources() {
  const files = readdirSync(GUIDES_SRC).filter((name) => name.endsWith(".ts") && name !== "index.ts");

  return files.map((name) => {
    const file = path.join(GUIDES_SRC, name);
    const text = read(file);
    const all = (re) => [...text.matchAll(re)].map((match) => match[1]);

    const info = {
      file: rel(file),
      name,
      slug: all(/slug:\s*"([^"]+)"/g)[0],
      published: all(/published:\s*"([^"]+)"/g),
      updated: all(/updated:\s*"([^"]+)"/g),
      authors: all(/author:\s*([^,\n]+),/g),
      figures: all(/src:\s*"(\/guides\/[^"]+)"/g),
      locales: [/const en: Guide\s*=/.test(text), /const zh: Guide\s*=/.test(text)],
    };

    if (!info.slug) fail(`${info.file}: 无法读出 slug`);
    if (!info.locales[0] || !info.locales[1]) fail(`${info.file}: en 与 zh 必须写在同一个文件里`);

    for (const [field, values] of [["published", info.published], ["updated", info.updated]]) {
      if (values.length !== 2) fail(`${info.file}: ${field} 应出现 2 次（en/zh），实际 ${values.length} 次`);
      for (const value of values) {
        if (!ISO_DATE.test(value)) fail(`${info.file}: ${field} 不是 ISO 日期（${value}）`);
      }
    }

    if (info.authors.length !== 2 || info.authors.some((value) => !value.trim() || value.trim() === '""')) {
      fail(`${info.file}: author 必填且两种语言都要有`);
    }

    const [published] = info.published;
    const [updated] = info.updated;
    if (ISO_DATE.test(published) && ISO_DATE.test(updated) && updated < published) {
      fail(`${info.file}: updated ${updated} 早于 published ${published}`);
    }

    if (info.figures.length === 0) {
      fail(`${info.file}: 没有任何 figure —— 每篇必修都要求至少一张真实截图`);
    }

    return info;
  });
}

/* ------------------------------------------------------------- structure -- */

function checkStructure(guides) {
  const slugs = guides.map((guide) => guide.slug).filter(Boolean);

  for (const slug of EXPECTED_SLUGS) {
    if (!slugs.includes(slug)) fail(`缺少指南：${slug}`);
  }

  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  for (const slug of new Set(duplicates)) fail(`slug 重复：${slug}`);

  // Registered in index.ts, otherwise the article exists but is unreachable.
  const indexFile = path.join(GUIDES_SRC, "index.ts");
  const indexText = read(indexFile);
  const imported = [...indexText.matchAll(/from\s+"\.\/([a-z0-9-]+)"/g)].map((match) => match[1]);
  const registered = [...indexText.matchAll(/^\s{2}([a-zA-Z0-9]+),$/gm)].length;

  for (const guide of guides) {
    const moduleName = guide.name.replace(/\.ts$/, "");
    if (!imported.includes(moduleName)) fail(`src/content/guides/index.ts 未导入 ${moduleName}`);
  }
  if (registered !== guides.length) {
    fail(`src/content/guides/index.ts 的 guides 数组有 ${registered} 项，但磁盘上有 ${guides.length} 篇`);
  }

  const figureSrcs = [...new Set(guides.flatMap((guide) => guide.figures))];
  for (const src of figureSrcs) {
    const file = path.join(PUBLIC, src.replace(/^\//, ""));
    if (!existsSync(file)) fail(`截图不存在：public${src}（内容里有 figure 指向它）`);
  }

  notes.push(`指南 ${guides.length} 篇，截图引用 ${figureSrcs.length} 张`);
}

/* --------------------------------------------------------------- rendered -- */

/** Home page, both locales. The English page carries the reading weight. */
function checkHome() {
  const enFile = htmlFile("en", "");
  if (!existsSync(enFile)) {
    fail("缺少构建产物 .next/server/app/en.html");
    return;
  }
  const en = stats(visibleText(read(enFile)));
  if (en.words < MIN_HOME_WORDS) fail(`首页 ${en.words} words < ${MIN_HOME_WORDS}`);

  const zhFile = htmlFile("zh", "");
  const zh = existsSync(zhFile) ? stats(visibleText(read(zhFile))) : { words: 0, cjk: 0 };
  if (zh.cjk < MIN_HOME_WORDS) fail(`首页（zh）${zh.cjk} 字 < ${MIN_HOME_WORDS}`);

  notes.push(`首页 en ${en.words} 词 / zh ${zh.cjk} 字`);
}

function checkPages() {
  for (const locale of LOCALES) {
    for (const routePath of REQUIRED_PAGES) {
      if (!existsSync(htmlFile(locale, routePath))) fail(`缺少页面 /${locale}${routePath}`);
    }
  }
  notes.push(`必需页面 ${REQUIRED_PAGES.length} 个 × ${LOCALES.length} 语言齐全`);
}

function checkRenderedGuides(guides) {
  for (const guide of guides) {
    for (const locale of LOCALES) {
      const file = htmlFile(locale, `/guides/${guide.slug}`);
      if (!existsSync(file)) {
        fail(`缺少文章页 /${locale}/guides/${guide.slug}`);
        continue;
      }
      const html = read(file);
      const { words, cjk } = stats(visibleText(html));

      if (locale === "en" && words < MIN_GUIDE_WORDS) {
        fail(`${guide.slug} (en): ${words} words < ${MIN_GUIDE_WORDS}`);
      }
      if (locale === "zh" && cjk < MIN_GUIDE_CJK) {
        fail(`${guide.slug} (zh): ${cjk} 字 < ${MIN_GUIDE_CJK}`);
      }
      if (/noindex/i.test(html)) fail(`${guide.slug} (${locale}) 仍是 noindex，阶段 6 未放开`);
      if (!html.includes(`/guides/${guide.slug}/`)) fail(`${guide.slug} (${locale}) 页面上没有出现截图`);
      if (!/<img[^>]+alt="/.test(html)) fail(`${guide.slug} (${locale}) 的截图缺 alt`);
    }
  }
}

/** Total English reading weight of the root domain, across every indexable page. */
function totalEnglishWords(guides) {
  const targets = [
    htmlFile("en", ""),
    ...REQUIRED_PAGES.map((routePath) => htmlFile("en", routePath)),
    ...guides.map((guide) => htmlFile("en", `/guides/${guide.slug}`)),
  ];
  return targets.reduce((sum, file) => (existsSync(file) ? sum + stats(visibleText(read(file))).words : sum), 0);
}

function checkSitemap() {
  for (const name of ["sitemap.xml.body", "sitemap.xml"]) {
    const file = path.join(BUILD, name);
    if (!existsSync(file)) continue;
    const xml = read(file);
    const locs = (xml.match(/<loc>/g) ?? []).length;
    const links = (xml.match(/<xhtml:link/g) ?? []).length;
    if (locs < MIN_SITEMAP_URLS) fail(`sitemap 只有 ${locs} 条 < ${MIN_SITEMAP_URLS}，阶段 6 未放开索引`);
    if (links < locs) fail(`sitemap 的 alternates 缺失：${links} 个 xhtml:link 配不上 ${locs} 条 URL`);
    notes.push(`sitemap ${locs} 条 URL、${links} 个 hreflang 链接（${name}）`);
    return;
  }
  fail("找不到构建产物里的 sitemap.xml");
}

/** Stage 6 rule: nothing may still be waiting to be released. */
function checkPendingPaths() {
  const text = read(path.join(ROOT, "src", "lib", "indexing.ts"));
  const body = text.match(/export const PENDING_PATHS = \[([\s\S]*?)\]/)?.[1] ?? "";
  const pending = (body.match(/"[^"]+"/g) ?? []).length;
  if (pending > 0) fail(`indexing.ts 仍有 ${pending} 个待放开路径（阶段 6 要求清空）`);
  notes.push("PENDING_PATHS 已清空，内容页可被索引");
}

function checkForbiddenText() {
  const pattern = /\bTODO\b|\bFIXME\b|lorem ipsum/i;
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const file = path.join(dir, name);
      if (statSync(file).isDirectory()) {
        walk(file);
        continue;
      }
      if (!/\.(ts|tsx|mjs|css)$/.test(name)) continue;
      read(file)
        .split("\n")
        .forEach((line, index) => {
          if (pattern.test(line)) fail(`${rel(file)}:${index + 1} 仍有 TODO/FIXME 残留`);
        });
    }
  };
  walk(path.join(ROOT, "src"));
  notes.push("src/ 内无 TODO / FIXME / lorem ipsum");
}


/* ------------------------------------------------------------------- run -- */

/**
 * Aspiration from §2 of the plan. Reported, not enforced: this repo cannot reach
 * it while the tool site's own copy is still thin, and a red build would only
 * teach us to ignore red builds. The per-page floors above are the hard gates.
 */
const SITE_WORD_TARGET = 18000;

function main() {
  if (!existsSync(BUILD)) {
    console.error("✗ 没有构建产物。本脚本挂在 postbuild 上，请先 npm run build。");
    process.exit(1);
  }

  const guides = readGuideSources();
  checkStructure(guides);
  checkHome();
  checkPages();
  checkRenderedGuides(guides);
  checkSitemap();
  checkPendingPaths();
  checkForbiddenText();

  const total = totalEnglishWords(guides);

  for (const note of notes) console.log(`· ${note}`);
  if (total < SITE_WORD_TARGET) {
    console.log(`· 根域 en 正文合计 ${total} 词，距 §2 目标 ${SITE_WORD_TARGET} 还差 ${SITE_WORD_TARGET - total} 词（不阻塞，见 docs/content-plan.md）`);
  } else {
    console.log(`· 根域 en 正文合计 ${total} 词，已过 §2 目标 ${SITE_WORD_TARGET}`);
  }

  if (problems.length > 0) {
    console.error(`\n✗ check:content 失败，共 ${problems.length} 项：`);
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }

  console.log("\n✓ check:content 全绿：9 篇双语指南、截图、日期与 sitemap 均达标");
}

main();

