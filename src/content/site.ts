/**
 * Facts about the site that appear inside written content.
 *
 * Keep this as the single source of truth: guides, /about and the JSON-LD all
 * read from here, so a change lands everywhere at once.
 *
 * ⚠️ `AUTHOR` is intentionally an organisation, not a made-up person. AdSense
 * and Google's guidance both treat fabricated author identities as a
 * trust problem — replace this with a real name only when a real person is
 * willing to put their name on the page (see docs/adsense-review-plan.md §8).
 */
export const SITE = {
  url: "https://reeff.app",
  name: "Reeff",
  /** Public GitHub organisation that owns both repos — the verifiable "who". */
  org: "rentaolab",
  orgUrl: "https://github.com/rentaolab",
  author: "The Reeff maintainers",
  email: "reeff.app@proton.me",
  /** Operating entity, as stated in /terms and /about. */
  entity: "Ripple Effect Technologies",
  jurisdiction: "Malaysia",
} as const;
