import { GUIDE_GROUPS, guideSlugs, guides } from "@/content/guides";
import { pages, type PageKey } from "@/content/pages";
import type { Block, Guide, GuideGroup, PageDoc } from "@/content/types";
import type { Locale } from "@/lib/dictionaries";

export { GUIDE_GROUPS, guideSlugs };

/** Locale-free path for an article, so links and metadata cannot drift. */
export const guidePath = (locale: Locale, slug: string) => `/${locale}/guides/${slug}`;

/** Newest first: the index and the homepage "latest" block both rely on this. */
export function getGuides(locale: Locale): Guide[] {
  return guides.map((entry) => entry[locale]).sort((a, b) => b.updated.localeCompare(a.updated));
}

export function getGuide(locale: Locale, slug: string): Guide | undefined {
  return guides.find((entry) => entry.en.slug === slug)?.[locale];
}

/** Groups in GUIDE_GROUPS order, with empty groups dropped (never show an empty shelf). */
export function getGuideGroups(locale: Locale): { key: GuideGroup; label: string; items: Guide[] }[] {
  const all = getGuides(locale);
  return GUIDE_GROUPS.map((group) => ({
    key: group.key,
    label: group[locale],
    items: all.filter((guide) => guide.group === group.key),
  })).filter((group) => group.items.length > 0);
}

export function getPage(locale: Locale, key: PageKey): PageDoc {
  return pages[key][locale];
}

/** Every string a reader would see, joined. Used by the word gates and reading time. */
export function plainText(blocks: Block[]): string {
  const parts: string[] = [];
  for (const block of blocks) {
    switch (block.kind) {
      case "p":
      case "h2":
      case "h3":
        parts.push(block.text);
        break;
      case "ul":
      case "ol":
        parts.push(...block.items);
        break;
      case "steps":
        parts.push(...block.items.flatMap((item) => [item.title, item.text]));
        break;
      case "table":
        parts.push(...block.head, ...block.rows.flat());
        break;
      case "figure":
        parts.push(block.alt, block.caption ?? "");
        break;
      case "callout":
        parts.push(block.title ?? "", block.text);
        break;
      case "quote":
        parts.push(block.text);
        break;
    }
  }
  return parts.filter(Boolean).join("\n");
}

const CJK_RE = /[\u3400-\u9fff\uf900-\ufaff]/g;
const LATIN_WORD_RE = /[A-Za-z0-9][A-Za-z0-9'’-]*/g;

/**
 * Word statistics that make sense in both languages: Latin words and CJK
 * characters are counted separately, because "1,200 words" and "1,500 字" mean
 * different amounts of reading. scripts/check-content.mjs uses the same maths.
 */
export function textStats(text: string): { words: number; cjk: number } {
  const cjk = text.match(CJK_RE)?.length ?? 0;
  const words = text.replace(CJK_RE, " ").match(LATIN_WORD_RE)?.length ?? 0;
  return { words, cjk };
}

/** Minutes, rounded up. ~220 English words/min, ~450 Chinese characters/min. */
export function readingMinutes(blocks: Block[]): number {
  const { words, cjk } = textStats(plainText(blocks));
  return Math.max(1, Math.ceil(words / 220 + cjk / 450));
}

/**
 * Dates are stored as ISO strings and rendered in UTC on purpose: a date written
 * as 2026-11-06 should not become 2026-11-05 for readers west of Greenwich.
 */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
