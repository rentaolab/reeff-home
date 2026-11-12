import { NextResponse, type NextRequest } from "next/server";
import { isToolPath } from "@/lib/tool-paths";

/**
 * Locale negotiation + legacy URL cleanup for the root brand site.
 *
 * `middleware.ts` was renamed to `proxy.ts` in Next.js 16, so this file is the
 * replacement and is picked up automatically by the framework.
 *
 * v0 keeps i18n deliberately hand-rolled: two languages, one dictionary file,
 * zero dependencies. Swap in next-intl (like the tool site) if we ever add more.
 *
 * Three Search Console findings drove the extra rules below:
 *   - `www.reeff.app/en` served byte-identical HTML to `reeff.app/en` with no
 *     redirect, so the two hosts competed as duplicates.
 *   - `/merge-pdf` … `/image-to-pdf` were 307'd into `/en/…`, where no such
 *     page exists, so Google recorded 404s. Those URLs date from when the PDF
 *     tools still lived on the root domain; they now get a permanent 301 to the
 *     subdomain instead of a temporary bounce into a dead end.
 *   - `/en/compress-pdf` and friends are the older 307 *targets*; they were 404s
 *     too, and need the same 301 with the locale preserved.
 *
 * The legacy path list is imported from `src/lib/tool-paths.ts` instead of being
 * written out again here. It used to be a second hand-kept copy, and when the
 * tool count went 11 → 12 that copy was not updated: `/compress-pdf` answered
 * 404 on the root domain while its eleven siblings redirected.
 */
const LOCALES = ["en", "zh"] as const;
const DEFAULT_LOCALE = "en";

const APEX_HOST = "reeff.app";
const WWW_HOST = `www.${APEX_HOST}`;

/** Tool subdomain. Keep in sync with `PDF_BASE` in `src/lib/dictionaries.ts`. */
const PDF_BASE = "https://pdf.reeff.app";

/**
 * `/{locale}/{tool}`, built from `LOCALES` so adding a third language cannot
 * silently leave this 301 branch behind. The captured groups are the locale and
 * the tool path, e.g. `["/en", "/en/compress-pdf", "/compress-pdf"]`.
 */
const LOCALIZED_TOOL_RE = new RegExp(`^/(${LOCALES.join("|")})(/.+)$`);

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

  // Normalise one trailing slash defensively: Next already answers 308 for
  // `/x/` → `/x` before this runs, but if a runtime ever reorders that step,
  // `/compress-pdf/` must still reach the 301 branch instead of the 404 one.
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  // 2. Localized legacy tool URLs — `/en/compress-pdf`, `/zh/crop-pdf`, …
  //    These are the *targets* the old "send every unknown path to
  //    /{locale}{path}" rule produced, so Search Console has them on file too.
  //    The locale is already explicit in the URL, so the 301 keeps it. This has
  //    to run before the "already localized" pass-through below, otherwise the
  //    branch is unreachable.
  const localizedTool = path.match(LOCALIZED_TOOL_RE);
  if (localizedTool && isToolPath(localizedTool[2])) {
    return NextResponse.redirect(`${PDF_BASE}${path}`, 301);
  }

  // 3. Already localized.
  if (LOCALES.some((locale) => path === `/${locale}` || path.startsWith(`/${locale}/`))) {
    return NextResponse.next();
  }

  // 4. Legacy tool URLs: permanent move to the subdomain. The target is fixed at
  //    the default locale on purpose — a cached 301 must not depend on
  //    `Accept-Language`, or the first visitor would pin the language for all.
  if (isToolPath(path)) {
    return NextResponse.redirect(`${PDF_BASE}/${DEFAULT_LOCALE}${path}`, 301);
  }

  // 5. Root only: negotiate. Stays temporary (307) because `/` legitimately
  //    resolves to a different locale per visitor.
  if (path === "/") {
    const acceptsChinese = /(^|,)\s*zh\b/i.test(request.headers.get("accept-language") ?? "");
    const url = request.nextUrl.clone();
    url.pathname = `/${acceptsChinese ? "zh" : DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // 6. Anything else does not exist here. `next()` yields a real 404; the old
  //    behaviour redirected to `/en{path}` and 404'd one hop later, which is
  //    exactly what Search Console recorded as both a redirect and a 404.
  return NextResponse.next();
}

export const config = {
  // Same exclusions as the tool site: skip /api, /_next, /_vercel and anything
  // that looks like a file (e.g. /icon.svg, /sitemap.xml).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
