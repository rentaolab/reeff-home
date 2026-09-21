import Link from "next/link";
import { PDF_BASE, type Dictionary, type Locale, locales } from "@/lib/dictionaries";

/** Locale names shown in the switcher, in their own language. */
const LOCALE_LABEL: Record<Locale, string> = { en: "EN", zh: "中文" };

/**
 * Shared header for every page. `path` is the locale-free part of the current
 * URL ("" | "/privacy" | "/terms") so the language switcher can swap the first
 * segment without needing a client component.
 */
export default function SiteHeader({ locale, t, path = "" }: { locale: Locale; t: Dictionary; path?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B1220]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="group flex items-center gap-2.5">
          {/* Plain <img> on purpose: the mark is an SVG, so the image optimizer would only pass it through. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/mark.svg" alt="" width={30} height={30} className="rounded-[9px]" />
          <span className="text-lg font-black tracking-tight text-white transition-opacity group-hover:opacity-90">
            Reeff<span className="text-red-500">.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 text-xs font-bold">
          <a
            href={`${PDF_BASE}/${locale}`}
            className="rounded-xl px-3 py-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            {t.products.items[0].name}
          </a>
          {locales.map((code) => (
            <Link
              key={code}
              href={`/${code}${path}`}
              aria-current={code === locale ? "true" : undefined}
              className={`rounded-xl px-3 py-2 transition-colors ${
                code === locale ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {LOCALE_LABEL[code]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
