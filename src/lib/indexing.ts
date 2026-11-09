import type { Metadata } from "next";

/**
 * One switch for "may this route be indexed yet?".
 *
 * Why it exists: the whole point of the AdSense remediation is to stop shipping
 * pages that are thinner than a placeholder. Stages 1–5 of
 * docs/adsense-review-plan.md added routes before their copy was finished, so
 * those routes stayed out of the sitemap, out of the nav, and carried `noindex`
 * until stage 6 emptied this list.
 *
 * Stage 6 has now emptied it: every route below has finished copy, a screenshot
 * and a word count that clears scripts/check-content.mjs. If a future page is
 * ever added before its copy is ready, put its locale-free path back here and it
 * will leave the sitemap, the header/footer and the index again — in one edit.
 *
 * Paths are locale-free. A trailing `[slug]` means "everything under it".
 */
export const PENDING_PATHS: readonly string[] = [];


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
