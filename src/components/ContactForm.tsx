"use client";

import { useActionState } from "react";
import { Check, Loader2 } from "lucide-react";
import { sendMessage } from "@/app/actions";
import type { Dictionary } from "@/lib/dictionaries";
import type { ContactState } from "@/lib/waitlist";

const INITIAL: ContactState = { status: "idle" };

/**
 * The /contact form. Kept in the same shape as WaitlistForm so both forms behave
 * identically (server action, no client-side fetch, no third-party form service).
 */
export default function ContactForm({ t }: { t: Dictionary["contactForm"] }) {
  const [state, formAction, pending] = useActionState(sendMessage, INITIAL);

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
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">{t.emailLabel}</span>
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

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">{t.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={4000}
          placeholder={t.messagePlaceholder}
          className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-400"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {t.submit}
      </button>

      {state.status === "error" && <p className="text-xs text-red-400">{t.error}</p>}
    </form>
  );
}
