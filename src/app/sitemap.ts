import type { MetadataRoute } from "next";
import { locales } from "@/lib/dictionaries";

const SITE_URL = "https://reeff.app";
const PATHS = ["", "/privacy", "/terms"];

/**
 * Only three pages in v0, each in two languages, with proper alternates so the
 * two locales are not treated as duplicates. Tool long-tail pages live in the
 * subdomain's own sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.5,
      alternates: {
        languages: Object.fromEntries(locales.map((code) => [code, `${SITE_URL}/${code}${path}`])),
      },
    })),
  );
}
