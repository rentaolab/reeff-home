import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PDF_BASE, type Dictionary, type Locale } from "@/lib/dictionaries";

/** The four product cards. Only Reeff.PDF is live today; the rest feed the waitlist. */
export default function ProductGrid({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.products.title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.products.items.map((item) => {
          const card = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className="text-base font-bold text-white">{item.name}</span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    item.live ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-slate-400"
                  }`}
                >
                  {item.live ? t.products.live : t.products.soon}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{item.tagline}</p>
            </>
          );

          return item.live ? (
            <a
              key={item.name}
              href={`${PDF_BASE}/${locale}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-red-500/40 hover:bg-white/[0.06]"
            >
              {card}
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-red-400">
                {t.hero.cta} <ArrowUpRight className="h-3 w-3" />
              </span>
            </a>
          ) : (
            <Link
              key={item.name}
              href="#waitlist"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
