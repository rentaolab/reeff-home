import Link from "next/link";
import { GUIDE_GROUPS, formatDate, guidePath, readingMinutes } from "@/lib/content";
import type { Guide } from "@/content/types";
import type { Dictionary, Locale } from "@/lib/dictionaries";

/** One article in the /guides index or the homepage "latest" strip. */
export default function GuideCard({ locale, guide, t }: { locale: Locale; guide: Guide; t: Dictionary }) {
  const group = GUIDE_GROUPS.find((entry) => entry.key === guide.group);

  return (
    <Link
      href={guidePath(locale, guide.slug)}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-red-500/40 hover:bg-white/[0.06]"
    >
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{group?.[locale]}</span>
      <h3 className="mt-2 text-base font-bold leading-snug text-white">{guide.title}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{guide.description}</p>
      <span className="mt-4 text-[11px] text-slate-500">
        {formatDate(guide.updated, locale)} · {readingMinutes(guide.body)} {t.common.minRead}
      </span>
    </Link>
  );
}
