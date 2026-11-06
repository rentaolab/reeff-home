import type { Localized, PageDoc } from "@/content/types";
import { aboutPage } from "./about";
import { changelogPage } from "./changelog";
import { contactPage } from "./contact";
import { guidesIndexPage } from "./guides";
import { roadmapPage } from "./roadmap";
import { whyLocalPage } from "./why-local";

/**
 * Long-form pages that are not articles. Keep UI chrome in src/lib/dictionaries.ts
 * and everything a reader would call "content" here.
 */
export type PageKey = "guides" | "whyLocal" | "about" | "contact" | "changelog" | "roadmap";

export const pages: Record<PageKey, Localized<PageDoc>> = {
  guides: guidesIndexPage,
  whyLocal: whyLocalPage,
  about: aboutPage,
  contact: contactPage,
  changelog: changelogPage,
  roadmap: roadmapPage,
};
