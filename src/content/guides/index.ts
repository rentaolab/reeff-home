import { mergeWithoutLosingBookmarks } from "./merge-without-losing-bookmarks";
import { splitPdfIntoChapters } from "./split-pdf-into-chapters";
import { whyCompressPdfBarelyShrinks } from "./why-compress-pdf-barely-shrinks";
import type { Guide, Localized } from "@/content/types";

/**
 * Every published article, both languages in one file each so a missing
 * translation fails the build instead of shipping a half-published pair.
 *
 * Add new entries here (and to `guideSlugs` implicitly, it reads this array).
 * Order here does not matter: `getGuides` sorts by `updated` descending.
 */
export const guides: Localized<Guide>[] = [
  mergeWithoutLosingBookmarks,
  splitPdfIntoChapters,
  whyCompressPdfBarelyShrinks,
];

/** Stable list used by generateStaticParams and the sitemap. */
export const guideSlugs: string[] = guides.map((entry) => entry.en.slug);

/** Group headings, in the order the /guides index shows them. */
export const GUIDE_GROUPS = [
  { key: "organize", en: "Organise pages", zh: "整理页面" },
  { key: "convert", en: "Convert and compress", zh: "转换与压缩" },
  { key: "print", en: "Print and share", zh: "打印与发送" },
  { key: "privacy", en: "How local processing behaves", zh: "本机处理的实际表现" },
] as const;
