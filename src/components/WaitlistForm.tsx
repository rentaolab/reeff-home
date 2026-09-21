"use client";

import { useActionState } from "react";
import { Check, Loader2 } from "lucide-react";
import { joinWaitlist } from "@/app/actions";
import type { Dictionary } from "@/lib/dictionaries";
import type { WaitlistState } from "@/lib/waitlist";

const INITIAL: WaitlistState = { status: "idle" };

export default function WaitlistForm({ t }: { t: Dictionary["waitlist"] }) {
  const [state, formAction, pending] = useActionState(joinWaitlist, INITIAL);

  if (state.status === "ok") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 text-sm text-emerald-300">
        <Check className="h-4 w-4 shrink-0" />
        {t.success}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">{t.emailLabel}</span>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            placeholder={t.emailPlaceholder}
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </label>

        <label className="sm:w-64">
          <span className="sr-only">{t.pickLabel}</span>
          <select
            name="pick"
            defaultValue={t.options[0]}
            className="w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            {t.options.map((option) => (
              <option key={option} value={option} className="bg-[#0F172A]">
                {option}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={pending}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-400"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {t.submit}
        </button>
      </div>

      {state.status === "error" && <p className="text-xs text-red-400">{t.error}</p>}
    </form>
  );
}
