import { isIndexable } from "@/lib/indexing";

/**
 * Locale-free routes for the content section.
 *
 * One list feeds the header, the footer and the sitemap so the three can never
 * drift apart. Labels live in `dictionaries[key].nav` / `footer` — see
 * src/lib/dictionaries.ts.
 */
export const RESOURCE_PATHS = [
  "/guides",
  "/why-local",
  "/about",
  "/changelog",
  "/roadmap",
  "/contact",
] as const;

export type ResourcePath = (typeof RESOURCE_PATHS)[number];
export type ResourceKey = "guides" | "whyLocal" | "about" | "changelog" | "roadmap" | "contact";

/** Maps a resource path to its dictionary key (labels, titles). */
export const RESOURCE_KEYS: Record<ResourcePath, ResourceKey> = {
  "/guides": "guides",
  "/why-local": "whyLocal",
  "/about": "about",
  "/changelog": "changelog",
  "/roadmap": "roadmap",
  "/contact": "contact",
};

export const href = (locale: string, path: string) => `/${locale}${path}`;

/**
 * Resource links that are finished enough to be linked from the header/footer.
 * Stages 1–5 keep every content page in `PENDING_PATHS`, so this returns an empty
 * list until stage 6 opens indexing — no thin pages get linked into the nav.
 */
export function visibleResources(): ResourcePath[] {
  return RESOURCE_PATHS.filter((path) => isIndexable(path));
}
