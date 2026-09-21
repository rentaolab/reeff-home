import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/LegalPage";
import { dictionaries, isLocale } from "@/lib/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: `${dictionaries[locale].terms.title} · Reeff`, alternates: { canonical: `/${locale}/terms` } };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];

  return <LegalPage locale={locale} t={t} doc={t.terms} path="/terms" />;
}
