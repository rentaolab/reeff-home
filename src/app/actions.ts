"use server";

import type { WaitlistState } from "@/lib/waitlist";

/** Deliberately strict enough to catch typos, loose enough for real addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Waitlist signup.
 *
 * v0 stores nothing by itself: set `WAITLIST_WEBHOOK_URL` to any endpoint that
 * accepts a JSON POST (Formspree, Buttondown, Resend, Zapier, your own API) and
 * every signup is forwarded there. Without it the form still works, but the
 * signup is dropped — see the checklist in README.md.
 */
export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim();
  const pick = String(formData.get("pick") ?? "").trim();

  if (!EMAIL_RE.test(email) || email.length > 200) return { status: "error" };

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    // Never log personal data outside development.
    if (process.env.NODE_ENV !== "production") console.info("[waitlist] would store", { email, pick });
    else console.error("[waitlist] WAITLIST_WEBHOOK_URL is not set — signup dropped", { pick });
    return { status: "ok" };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, pick, source: "reeff.app" }),
    });
    return response.ok ? { status: "ok" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}
