import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductGrid from "@/components/ProductGrid";
import PillarGrid from "@/components/PillarGrid";
import ToolDirectory from "@/components/ToolDirectory";
import WaitlistForm from "@/components/WaitlistForm";
import { PDF_BASE, dictionaries, isLocale } from "@/lib/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];

  // Brand-entity signals for search engines (docs/brand-brief.md §9).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "Reeff", url: "https://reeff.app", logo: "https://reeff.app/icon.png" },
      { "@type": "WebSite", name: "Reeff", url: "https://reeff.app", inLanguage: locale },
      {
        "@type": "ItemList",
        name: t.products.title,
        itemListElement: t.products.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          description: item.tagline,
        })),
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader locale={locale} t={t} />

      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
          <div aria-hidden className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-red-600/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/mark.svg" alt="Reeff" width={88} height={88} className="mx-auto rounded-[26px] shadow-2xl" />
            <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl">{t.hero.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <a
                href={`${PDF_BASE}/${locale}`}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700"
              >
                {t.hero.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <span className="text-[11px] text-slate-500">{t.hero.ctaNote}</span>
            </div>
          </div>
        </section>

        <ProductGrid locale={locale} t={t} />
        <PillarGrid t={t} />
        <ToolDirectory locale={locale} t={t} />

        <section id="waitlist" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-14 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white">{t.waitlist.title}</h2>
            <p className="mb-6 mt-2 text-xs leading-relaxed text-slate-400">{t.waitlist.body}</p>
            <WaitlistForm t={t.waitlist} />
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} t={t} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
