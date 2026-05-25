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
import { NeutralDefault } from "@/components/templates/NeutralDefault";

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
    slug: "neutral-default",
    name: "Neutral Default",
    tier: "free",
    tagline: "Clean · ATS-friendly · Print-safe",
    description:
      "The single CV layout the builder uses by default. ATS-friendly typography, generous whitespace, A4-print-safe. Sections render only when their data is present, so the template adapts to whatever the parsed PNG or user input provides.",
    Component: NeutralDefault,
    addedAt: "2026-05-25T00:00:00.000Z",
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
