import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductGrid from "@/components/ProductGrid";
import PillarGrid from "@/components/PillarGrid";
import ToolDirectory from "@/components/ToolDirectory";
import WaitlistForm from "@/components/WaitlistForm";
import HomeSections from "@/components/HomeSections";
import Faq from "@/components/Faq";
import GuideCard from "@/components/GuideCard";
import { homeContent } from "@/content/home";
import { SITE } from "@/content/site";
import { getGuides } from "@/lib/content";
import { PDF_BASE, dictionaries, isLocale } from "@/lib/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const home = homeContent[locale];
  // Most recently updated articles; the strip disappears while there are none.
  const latest = getGuides(locale).slice(0, 3);

  // Brand-entity signals for search engines (docs/brand-brief.md §9), plus the
  // FAQ block whose questions are rendered further down the same page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/icon.png` },
      { "@type": "WebSite", name: SITE.name, url: SITE.url, inLanguage: locale },
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
      {
        "@type": "FAQPage",
        mainEntity: home.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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

        <HomeSections sections={home.sections} />

        {latest.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.nav.guides}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((guide) => (
                <GuideCard key={guide.slug} locale={locale} guide={guide} t={t} />
              ))}
            </div>
          </section>
        )}

        <Faq heading={home.faq.heading} intro={home.faq.intro} items={home.faq.items} />

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
