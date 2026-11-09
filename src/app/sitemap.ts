import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { locales } from "@/lib/dictionaries";
import { isIndexable } from "@/lib/indexing";

const SITE_URL = "https://reeff.app";

/**
 * Non-article routes, each with the date its copy last changed.
 *
 * Bumped by hand, never `new Date()`: a timestamp that moves on every deploy
 * teaches Google to ignore `lastmod`, and an ignored `lastmod` is worse than
 * none. Articles take their date from the guide's own `updated` field below.
 */
const STATIC_PATHS = [
  { path: "", lastModified: "2026-11-06", changeFrequency: "weekly", priority: 1 },
  { path: "/guides", lastModified: "2026-11-06", changeFrequency: "weekly", priority: 0.9 },
  { path: "/why-local", lastModified: "2026-11-06", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", lastModified: "2026-11-06", changeFrequency: "monthly", priority: 0.6 },
  { path: "/roadmap", lastModified: "2026-11-06", changeFrequency: "monthly", priority: 0.5 },
  { path: "/changelog", lastModified: "2026-11-06", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", lastModified: "2026-11-06", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", lastModified: "2026-11-06", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms", lastModified: "2026-11-06", changeFrequency: "monthly", priority: 0.3 },
] as const;

type Entry = MetadataRoute.Sitemap[number];

const url = (locale: string, path: string) => `${SITE_URL}/${locale}${path}`;

/**
 * Both locales of one path, cross-linked so Google treats them as translations
 * of each other rather than as duplicates. Every entry goes through
 * `isIndexable`, so listing a path in `PENDING_PATHS` removes it from here too.
 */
function localized(path: string, lastModified: string, changeFrequency: Entry["changeFrequency"], priority: number): Entry[] {
  if (!isIndexable(path)) return [];
  const alternates = { languages: Object.fromEntries(locales.map((code) => [code, url(code, path)])) };
  return locales.map((locale) => ({
    url: url(locale, path),
    lastModified: new Date(`${lastModified}T00:00:00.000Z`),
    changeFrequency,
    priority,
    alternates,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = STATIC_PATHS.flatMap((entry) =>
    localized(entry.path, entry.lastModified, entry.changeFrequency, entry.priority),
  );

  const articles = guides.flatMap((entry) =>
    localized(`/guides/${entry.en.slug}`, entry.en.updated, "monthly", 0.7),
  );

  return [...pages, ...articles];
}

