import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale negotiation for the two supported languages (en / zh).
 *
 * `middleware.ts` was renamed to `proxy.ts` in Next.js 16, so this file is the
 * replacement and is picked up automatically by the framework.
 *
 * v0 keeps i18n deliberately hand-rolled: two languages, one dictionary file,
 * zero dependencies. Swap in next-intl (like the tool site) if we ever add more.
 */
const LOCALES = ["en", "zh"] as const;
const DEFAULT_LOCALE = "en";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
    return NextResponse.next();
  }

  const acceptsChinese = /(^|,)\s*zh\b/i.test(request.headers.get("accept-language") ?? "");
  const url = request.nextUrl.clone();
  url.pathname = `/${acceptsChinese ? "zh" : DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Same exclusions as the tool site: skip /api, /_next, /_vercel and anything
  // that looks like a file (e.g. /icon.svg, /sitemap.xml).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
