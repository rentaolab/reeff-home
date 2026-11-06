/** Shared types for the waitlist flow (kept out of the "use server" file). */
export type WaitlistState = { status: "idle" | "ok" | "error" };

/** Same shape for the /contact feedback form — deliberately identical so one UI pattern fits both. */
export type ContactState = WaitlistState;
