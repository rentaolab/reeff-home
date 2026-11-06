import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { locales, type Locale } from "@/lib/dictionaries";
import { robotsFor } from "@/lib/indexing";

/**
 * Metadata for a content page. Kept in one place so canonical, hreflang and the
 * `noindex` switch during stages 1–5 cannot be forgotten on a new route.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
}: {
  locale: Locale;
  /** Locale-free path, e.g. "/about". */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = `${title} · ${SITE.name}`;

  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, `/${code}${path}`])),
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      type,
      siteName: SITE.name,
      title: fullTitle,
      description,
      url: `/${locale}${path}`,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/opengraph-image.png"] },
    robots: robotsFor(path),
  };
}

/** BreadcrumbList for a page, so the SERP shows a path instead of a bare URL. */
export function breadcrumbJsonLd(locale: Locale, crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE.url}/${locale}${crumb.path}`,
    })),
  };
}
