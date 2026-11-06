import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import GuideBody from "@/components/GuideBody";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE } from "@/content/site";
import { formatDate, getGuide, guidePath, guideSlugs, readingMinutes } from "@/lib/content";
import { PDF_BASE, dictionaries, isLocale, locales } from "@/lib/dictionaries";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return locales.flatMap((locale) => guideSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuide(locale, slug);
  if (!guide) return {};
  return buildMetadata({
    locale,
    path: `/guides/${slug}`,
    title: guide.title,
    description: guide.description,
    type: "article",
  });
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const guide = getGuide(locale, slug);
  if (!guide) notFound();

  // Tool names come from the dictionary so a guide never invents a label the
  // tool site does not use.
  const tools = guide.tools
    .map((href) => ({ href, name: t.tools.items.find((item) => item.href === href)?.name }))
    .filter((tool): tool is { href: string; name: string } => Boolean(tool.name));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: guide.published,
        dateModified: guide.updated,
        inLanguage: locale,
        mainEntityOfPage: `${SITE.url}${guidePath(locale, slug)}`,
        author: { "@type": "Organization", name: guide.author, url: `${SITE.url}/${locale}/about` },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/icon.png` },
      },
      breadcrumbJsonLd(locale, [
        { name: t.common.home, path: "" },
        { name: t.nav.guides, path: "/guides" },
        { name: guide.title, path: `/guides/${slug}` },
      ]),
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader locale={locale} t={t} path={`/guides/${slug}`} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-wider text-slate-500">
          <Link href={`/${locale}/guides`} className="transition-colors hover:text-white">
            {t.nav.guides}
          </Link>
        </nav>

        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">{guide.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">{guide.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-400">{guide.author}</span>
          <span aria-hidden>·</span>
          <span>
            {t.common.published} {formatDate(guide.published, locale)}
          </span>
          <span aria-hidden>·</span>
          <span>
            {t.common.lastUpdated} {formatDate(guide.updated, locale)}
          </span>
          <span aria-hidden>·</span>
          <span>
            {readingMinutes(guide.body)} {t.common.minRead}
          </span>
        </div>

        <GuideBody blocks={guide.body} />

        {tools.length > 0 && (
          <section className="mt-12 border-t border-white/5 pt-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.common.relatedTools}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <a
                  key={tool.href}
                  href={`${PDF_BASE}/${locale}${tool.href}`}
                  className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-red-500/40 hover:text-white"
                >
                  {tool.name}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter locale={locale} t={t} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
