/**
 * The twelve tool paths — one list, two consumers.
 *
 * `src/lib/dictionaries.ts` renders these as the homepage's tool directory and
 * as the "related tools" block under every guide. `src/proxy.ts` uses them to
 * 301 legacy root-domain URLs (`/merge-pdf`, `/en/crop-pdf`, …) to the tool
 * subdomain.
 *
 * They used to keep separate copies, and the copies drifted: commit 1802e50 took
 * the tool count from 11 to 12 and added `compress-pdf` to the dictionary only,
 * so `/compress-pdf` answered 404 on reeff.app while its eleven siblings
 * redirected. Search Console kept that 404 in "Not indexed" indefinitely. Import
 * from here and the two can no longer disagree.
 *
 * Paths are locale-free and relative to the tool subdomain root:
 * `/compress-pdf` → https://pdf.reeff.app/{locale}/compress-pdf.
 *
 * Deliberately dependency-free and copy-free: `proxy.ts` runs on the edge, so it
 * must not pull the whole dictionary bundle into the middleware.
 */
export const TOOL_PATHS = [
  "/organize-pdf",
  "/merge-pdf",
  "/split-pdf",
  "/rotate-pdf",
  "/reorder-pdf-pages",
  "/delete-pdf-pages",
  "/extract-pdf-pages",
  "/crop-pdf",
  "/edit-pdf",
  "/pdf-to-image",
  "/image-to-pdf",
  "/compress-pdf",
] as const;

export type ToolPath = (typeof TOOL_PATHS)[number];

/** Runtime membership test for a raw, already-normalised path. */
export const isToolPath = (path: string): path is ToolPath => (TOOL_PATHS as readonly string[]).includes(path);
