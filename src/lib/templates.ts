// Template registry.
//
// PR #53 collapsed the Recipe system: 29 hand-coded designs and the
// recipe engine (factory.ts, primitives/, personas/) were removed in
// favor of a single neutral default template. The TemplateMeta shape
// is preserved so call sites (editor, print, dashboard, sitemap) keep
// working without refactor — `Component`, `slug`, `name`, `tier`, and
// `addedAt` stay; recipe-specific metadata (role/mood/culturalFit/
// source/tags/sampleData) was dropped from the type.
//
// Sole entry below is "classic-serif" — the transitional default while
// PR #53 lands. Commit 2 of this PR introduces `neutral-default` and
// retires `classic-serif`; commit 3 wires it as the builder default.

import type { ComponentType } from "react";
import type { CVData } from "@/lib/cv-types";
import { ClassicSerif } from "@/components/templates/ClassicSerif";

export type TemplateMeta = {
  slug: string;
  name: string;
  tier: "free" | "premium";
  tagline: string;
  description: string;
  Component: ComponentType<{ data: CVData; paginated?: boolean; printSafe?: boolean }>;
  /** ISO 8601 datetime when this template was added to the catalog. */
  addedAt: string;
};

export const TEMPLATE_LIST: TemplateMeta[] = [
  {
    slug: "classic-serif",
    name: "Classic Serif",
    tier: "free",
    tagline: "Timeless · Formal · Single-column",
    description:
      "A timeless, formal CV layout with a single-column structure. Designed for executives, consultants, and traditional industries.",
    Component: ClassicSerif,
    addedAt: "2025-10-01T00:00:00.000Z",
  },
];

export const TEMPLATES: Record<string, TemplateMeta> = Object.fromEntries(
  TEMPLATE_LIST.map((t) => [t.slug, t]),
);

const DEFAULT_TEMPLATE_SLUG = TEMPLATE_LIST[0].slug;

/** Returns the template by slug, falling back to the default when the
 *  slug is unknown. This is what shields existing user CVs whose
 *  `template` column points at a legacy recipe slug (29 deleted in PR
 *  #53) — they all silently render through the surviving template
 *  instead of 500-ing. */
export function getTemplate(slug: string): TemplateMeta {
  return TEMPLATES[slug] ?? TEMPLATES[DEFAULT_TEMPLATE_SLUG];
}

export function isKnownTemplate(slug: string): boolean {
  return slug in TEMPLATES;
}
