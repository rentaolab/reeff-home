import type { Metadata } from "next";

/**
 * One switch for "may this route be indexed yet?".
 *
 * Why it exists: the whole point of the AdSense remediation is to stop shipping
 * pages that are thinner than a placeholder. Stages 1–5 of
 * docs/adsense-review-plan.md add routes before their copy is finished, so those
 * routes stay out of the sitemap, out of the nav, and carry `noindex` until
 * stage 6 empties this list. Never link to or index a pending path.
 *
 * Paths are locale-free. A trailing `[slug]` means "everything under it".
 */
export const PENDING_PATHS = [
  "/guides",
  "/guides/[slug]",
  "/why-local",
  "/about",
  "/contact",
  "/changelog",
  "/roadmap",
] as const;

function normalise(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/** True when `path` (locale-free) is allowed in the sitemap, the nav and the index. */
export function isIndexable(path: string): boolean {
  const target = normalise(path);
  return !PENDING_PATHS.some((pending) => {
    const prefix = pending.replace("[slug]", "");
    return pending.endsWith("[slug]") ? target.startsWith(prefix) : target === prefix;
  });
}

/** `robots` value for a route's metadata: undefined (indexable) or a noindex pair. */
export function robotsFor(path: string): Metadata["robots"] {
  return isIndexable(path) ? undefined : { index: false, follow: true };
}
