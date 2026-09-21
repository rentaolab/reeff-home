import { PDF_BASE, type Dictionary, type Locale } from "@/lib/dictionaries";

/**
 * The root domain's only internal-link hub into the tool subdomain.
 *
 * Keyword split (docs/brand-brief.md §9): the root targets brand and category
 * terms only, while every tool long-tail query belongs to pdf.reeff.app — so
 * these links are plain anchors, never keyword-stuffed headings.
 */
export default function ToolDirectory({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.tools.title}</h2>
        <p className="text-[11px] text-slate-500">{t.tools.note}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {t.tools.items.map((tool) => (
          <a
            key={tool.href}
            href={`${PDF_BASE}/${locale}${tool.href}`}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-red-500/40 hover:text-white"
          >
            {tool.name}
          </a>
        ))}
      </div>
    </section>
  );
}
