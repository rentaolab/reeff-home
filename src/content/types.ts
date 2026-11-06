/**
 * Content model for long-form pages and guides.
 *
 * Deliberately structured instead of MDX so the repo stays dependency-free
 * (see the note at the top of src/lib/dictionaries.ts) and so the word-count /
 * structure gates in scripts/check-content.mjs can read the same data the
 * pages render.
 */
import type { Locale } from "@/lib/dictionaries";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string; id?: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] }
  | { kind: "figure"; src: string; alt: string; caption?: string; width: number; height: number }
  | { kind: "callout"; tone?: "note" | "warn"; title?: string; text: string }
  | { kind: "quote"; text: string; cite?: string };

/** Grouping used by the /guides index. Order comes from GUIDE_GROUPS. */
export type GuideGroup = "organize" | "convert" | "print" | "privacy";

/** One article. Both locales must exist — see Localized below. */
export type Guide = {
  slug: string;
  group: GuideGroup;
  title: string;
  description: string;
  author: string;
  /** ISO date, e.g. "2026-11-06". Required so sitemap and JSON-LD stay honest. */
  published: string;
  updated: string;
  /** Locale-free tool paths on pdf.reeff.app, e.g. "/merge-pdf". */
  tools: string[];
  body: Block[];
};

/** A non-article page that is still long enough to live in content, not in the dictionary. */
export type PageDoc = {
  title: string;
  /** Used for <meta name="description"> and cards. */
  description: string;
  updated: string;
  body: Block[];
};

/** Both languages live in the same file so a missing translation fails the build. */
export type Localized<T> = Record<Locale, T>;
