import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Dictionary, Locale, Section } from "@/lib/dictionaries";

/** Shared shell for /privacy and /terms so both stay in sync visually. */
export default function LegalPage({
  locale,
  t,
  doc,
  path,
}: {
  locale: Locale;
  t: Dictionary;
  doc: { title: string; updated: string; sections: Section[] };
  path: string;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader locale={locale} t={t} path={path} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-black tracking-tight text-white">{doc.title}</h1>
        <p className="mt-2 text-xs text-slate-500">{doc.updated}</p>

        <div className="mt-10 space-y-8">
          {doc.sections.map((section) => (
            <section key={section.h}>
              <h2 className="text-sm font-bold text-white">{section.h}</h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{section.p}</p>
              {section.list && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-400">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>

      <SiteFooter locale={locale} t={t} />
    </div>
  );
}
