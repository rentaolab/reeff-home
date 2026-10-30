import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale negotiation + legacy URL cleanup for the root brand site.
 *
 * `middleware.ts` was renamed to `proxy.ts` in Next.js 16, so this file is the
 * replacement and is picked up automatically by the framework.
 *
 * v0 keeps i18n deliberately hand-rolled: two languages, one dictionary file,
 * zero dependencies. Swap in next-intl (like the tool site) if we ever add more.
 *
 * Two Search Console findings drove the extra rules below:
 *   - `www.reeff.app/en` served byte-identical HTML to `reeff.app/en` with no
 *     redirect, so the two hosts competed as duplicates.
 *   - `/merge-pdf` … `/image-to-pdf` were 307'd into `/en/…`, where no such
 *     page exists, so Google recorded nine 404s. Those URLs date from when the
 *     PDF tools still lived on the root domain; they now get a permanent 301 to
 *     the subdomain instead of a temporary bounce into a dead end.
 */
const LOCALES = ["en", "zh"] as const;
const DEFAULT_LOCALE = "en";

const APEX_HOST = "reeff.app";
const WWW_HOST = `www.${APEX_HOST}`;

/** Tool subdomain. Keep in sync with `PDF_BASE` in `src/lib/dictionaries.ts`. */
const PDF_BASE = "https://pdf.reeff.app";

/** Tool paths that used to live on the root domain before the subdomain split. */
const LEGACY_TOOL_PATHS = new Set([
  "/organize-pdf",
  "/merge-pdf",
  "/split-pdf",
  "/rotate-pdf",
  "/reorder-pdf-pages",
  "/delete-pdf-pages",
  "/extract-pdf-pages",
  "/crop-pdf",
  "/edit-pdf",
  "/pdf-to-image",
  "/image-to-pdf",
]);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. www → apex, permanent, preserving path and query. Canonical tags already
  //    point at the apex, so this is the belt to that braces.
  //
  //    Read the `Host` header rather than `nextUrl.hostname`: behind some
  //    runtimes (and under `next start`) the latter is the internal host, which
  //    would silently skip this branch in local verification.
  const host = (request.headers.get("host") ?? request.nextUrl.hostname)
    .split(":")[0]
    .toLowerCase();

  if (host === WWW_HOST) {
    const url = request.nextUrl.clone();
    url.host = APEX_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  // 2. Already localized.
  if (LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next();
  }

  // 3. Legacy tool URLs: permanent move to the subdomain. The target is fixed at
  //    the default locale on purpose — a cached 301 must not depend on
  //    `Accept-Language`, or the first visitor would pin the language for all.
  if (LEGACY_TOOL_PATHS.has(pathname)) {
    return NextResponse.redirect(`${PDF_BASE}/${DEFAULT_LOCALE}${pathname}`, 301);
  }

  // 4. Root only: negotiate. Stays temporary (307) because `/` legitimately
  //    resolves to a different locale per visitor.
  if (pathname === "/") {
    const acceptsChinese = /(^|,)\s*zh\b/i.test(request.headers.get("accept-language") ?? "");
    const url = request.nextUrl.clone();
    url.pathname = `/${acceptsChinese ? "zh" : DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // 5. Anything else does not exist here. `next()` yields a real 404; the old
  //    behaviour redirected to `/en{path}` and 404'd one hop later, which is
  //    exactly what Search Console recorded as both a redirect and a 404.
  return NextResponse.next();
}

export const config = {
  // Same exclusions as the tool site: skip /api, /_next, /_vercel and anything
  // that looks like a file (e.g. /icon.svg, /sitemap.xml).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
