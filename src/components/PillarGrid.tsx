import { BadgeCheck, Gauge, Zap } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

/** 轻 / 快 / 简 as three verifiable promises (docs/brand-brief.md §3). */
const ICONS = [Zap, Gauge, BadgeCheck];

export default function PillarGrid({ t }: { t: Dictionary }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.pillars.title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {t.pillars.items.map((pillar, index) => {
          const Icon = ICONS[index] ?? Zap;
          return (
            <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-red-400">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">{pillar.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{pillar.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
