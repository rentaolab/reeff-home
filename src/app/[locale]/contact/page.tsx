import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ProsePage from "@/components/ProsePage";
import { SITE } from "@/content/site";
import { getPage } from "@/lib/content";
import { dictionaries, isLocale } from "@/lib/dictionaries";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

const PATH = "/contact";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const doc = getPage(locale, "contact");
  return buildMetadata({ locale, path: PATH, title: doc.title, description: doc.description });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const doc = getPage(locale, "contact");

  const jsonLd = breadcrumbJsonLd(locale, [
    { name: t.common.home, path: "" },
    { name: t.nav.contact, path: PATH },
  ]);

  return (
    <>
      <ProsePage locale={locale} t={t} path={PATH} doc={doc}>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white">{t.contactForm.title}</h2>
          <p className="mb-6 mt-2 text-xs leading-relaxed text-slate-400">{t.contactForm.body}</p>
          <ContactForm t={t.contactForm} />
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.footer.contact}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-3 inline-flex items-center gap-2 text-lg font-bold text-white transition-colors hover:text-red-400"
          >
            <Mail className="h-4 w-4 text-red-400" />
            {SITE.email}
          </a>
        </div>
      </ProsePage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
