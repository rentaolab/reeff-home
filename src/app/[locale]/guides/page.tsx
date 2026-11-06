import { notFound } from "next/navigation";
import GuideCard from "@/components/GuideCard";
import ProsePage from "@/components/ProsePage";
import { getGuideGroups, getPage } from "@/lib/content";
import { dictionaries, isLocale } from "@/lib/dictionaries";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

const PATH = "/guides";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const doc = getPage(locale, "guides");
  return buildMetadata({ locale, path: PATH, title: doc.title, description: doc.description });
}

export default async function GuidesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const doc = getPage(locale, "guides");
  const groups = getGuideGroups(locale);

  const jsonLd = breadcrumbJsonLd(locale, [
    { name: t.common.home, path: "" },
    { name: t.nav.guides, path: PATH },
  ]);

  return (
    <>
      <ProsePage locale={locale} t={t} path={PATH} doc={doc}>
        {groups.map((group) => (
          <section key={group.key} className="mt-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{group.label}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {group.items.map((guide) => (
                <GuideCard key={guide.slug} locale={locale} guide={guide} t={t} />
              ))}
            </div>
          </section>
        ))}
      </ProsePage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
