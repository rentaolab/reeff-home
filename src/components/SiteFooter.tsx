import Link from "next/link";
import { PDF_BASE, type Dictionary, type Locale } from "@/lib/dictionaries";
import { RESOURCE_KEYS, visibleResources } from "@/lib/nav";

export default function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  const resources = visibleResources();

  return (
    <footer className="mt-24 border-t border-white/5 bg-[#080E18]">
      <div
        className={`mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 ${resources.length > 0 ? "md:grid-cols-4" : "md:grid-cols-3"}`}
      >
        <div>
          <p className="text-sm font-bold text-white">{t.footer.brandLine}</p>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500">{t.meta.description}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.footer.products}</p>
          <ul className="mt-3 space-y-2 text-xs">
            {t.products.items.map((item) => (
              <li key={item.name}>
                {item.live ? (
                  <a href={`${PDF_BASE}/${locale}`} className="text-slate-300 transition-colors hover:text-white">
                    {item.name} ↗
                  </a>
                ) : (
                  <Link href={`/${locale}/roadmap`} className="text-slate-500 transition-colors hover:text-slate-300">
                    {item.name} <span className="text-slate-600">· {t.products.soon}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Only rendered once the content pages are indexable — see src/lib/indexing.ts. */}
        {resources.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.footer.resources}</p>
            <ul className="mt-3 space-y-2 text-xs">
              {resources.map((path) => (
                <li key={path}>
                  <Link href={`/${locale}${path}`} className="text-slate-300 transition-colors hover:text-white">
                    {t.nav[RESOURCE_KEYS[path]]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.footer.legal}</p>
          <ul className="mt-3 space-y-2 text-xs">
            <li>
              <Link href={`/${locale}/privacy`} className="text-slate-300 transition-colors hover:text-white">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/terms`} className="text-slate-300 transition-colors hover:text-white">
                {t.footer.terms}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="text-slate-300 transition-colors hover:text-white">
                {t.footer.contact}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-6 text-center text-[11px] text-slate-600 sm:px-6">
        {t.footer.copyright}
      </div>
    </footer>
  );
}

