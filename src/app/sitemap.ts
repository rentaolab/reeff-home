import type { MetadataRoute } from "next";
import { locales } from "@/lib/dictionaries";

const SITE_URL = "https://reeff.app";
const PATHS = ["", "/privacy", "/terms"];

/**
 * Only three pages in v0, each in two languages, with proper alternates so the
 * two locales are not treated as duplicates. Tool long-tail pages live in the
 * subdomain's own sitemap.
 *
 * Bump `LAST_MODIFIED` by hand when the copy actually changes. `new Date()`
 * would restamp every URL on each deploy and make Google ignore `lastmod`.
 */
const LAST_MODIFIED = new Date("2026-10-30T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.5,
      alternates: {
        languages: Object.fromEntries(locales.map((code) => [code, `${SITE_URL}/${code}${path}`])),
      },
    })),
  );
}
