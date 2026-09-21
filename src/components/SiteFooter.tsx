import Link from "next/link";
import { CONTACT_EMAIL, PDF_BASE, type Dictionary, type Locale } from "@/lib/dictionaries";

export default function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#080E18]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
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
                  <span className="text-slate-500">
                    {item.name} <span className="text-slate-600">· {t.products.soon}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

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
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-300 transition-colors hover:text-white">
                {t.footer.contact}
              </a>
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
