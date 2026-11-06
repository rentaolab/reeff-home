import { notFound } from "next/navigation";
import ProsePage from "@/components/ProsePage";
import { getPage } from "@/lib/content";
import { dictionaries, isLocale } from "@/lib/dictionaries";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

const PATH = "/changelog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const doc = getPage(locale, "changelog");
  return buildMetadata({ locale, path: PATH, title: doc.title, description: doc.description });
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const doc = getPage(locale, "changelog");

  const jsonLd = breadcrumbJsonLd(locale, [
    { name: t.common.home, path: "" },
    { name: t.nav.changelog, path: PATH },
  ]);

  return (
    <>
      <ProsePage locale={locale} t={t} path={PATH} doc={doc} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
