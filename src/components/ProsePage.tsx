import GuideBody from "@/components/GuideBody";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { PageDoc } from "@/content/types";
import { formatDate } from "@/lib/content";
import type { Dictionary, Locale } from "@/lib/dictionaries";

/**
 * Shared shell for the long-form pages that are not articles (/about, /contact,
 * /why-local, /changelog, /roadmap, /guides). Same header/footer as LegalPage,
 * but with a readable type scale and an explicit last-updated line — the date is
 * part of the trust signal, so it is rendered, not just stored in metadata.
 */
export default function ProsePage({
  locale,
  t,
  path,
  doc,
  children,
}: {
  locale: Locale;
  t: Dictionary;
  path: string;
  doc: PageDoc;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader locale={locale} t={t} path={path} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{doc.title}</h1>
        <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-500">
          {t.common.lastUpdated} {formatDate(doc.updated, locale)}
        </p>
        <GuideBody blocks={doc.body} />
        {children}
      </main>

      <SiteFooter locale={locale} t={t} />
    </div>
  );
}
