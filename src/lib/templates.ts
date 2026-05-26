// Template registry — Phase 4d bridge to the 20-template engine.
//
// History:
//   PR #53 collapsed the Recipe system to a single "neutral-default"
//   template, with this file as the sole public seam consumed by the
//   editor, print, dashboard, sitemap, and resume-actions call sites.
//
//   Phase 4 (this commit) re-points the registry at the 20-template
//   engine in src/components/templates/template-registry.ts. Consumers
//   still see the same TemplateMeta shape and the same getTemplate /
//   isKnownTemplate API — only the underlying templates change.
//
//   The new registry uses `component` (lowercase) + ResumeData→CVData
//   adapted components; this bridge re-exposes them as `Component`
//   (capital) with the broader `{ data, paginated?, printSafe? }`
//   contract every call site already expects.

import type { ComponentType } from "react";
import type { CVData } from "@/lib/cv-types";
import {
  TEMPLATES as REGISTRY_TEMPLATES,
  getTier,
  getTagline,
  getAddedAt,
} from "@/components/templates/template-registry";

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

/** Default fallback slug. Resumes whose `template` column points at a
 *  legacy or unknown value (e.g. "neutral-default" from PR #53, or any
 *  retired recipe slug) silently render via this template instead of
 *  500-ing. Picked because it's the safest professional fallback. */
const DEFAULT_TEMPLATE_SLUG = "classic-serif";

/** Build the public TEMPLATE_LIST by mapping each new-registry entry into
 *  the existing TemplateMeta shape. Order is preserved (most-specific
 *  first → classic-serif last). */
export const TEMPLATE_LIST: TemplateMeta[] = REGISTRY_TEMPLATES.map((t) => ({
  slug: t.slug,
  name: t.name,
  tier: getTier(t),
  tagline: getTagline(t),
  description: t.description,
  Component: t.component,
  addedAt: getAddedAt(t),
}));

export const TEMPLATES: Record<string, TemplateMeta> = Object.fromEntries(
  TEMPLATE_LIST.map((t) => [t.slug, t]),
);

/** Returns the template by slug, falling back to the default when the
 *  slug is unknown. Shields existing user CVs whose `template` column
 *  points at a legacy slug — they all render via classic-serif rather
 *  than 500-ing. */
export function getTemplate(slug: string): TemplateMeta {
  return TEMPLATES[slug] ?? TEMPLATES[DEFAULT_TEMPLATE_SLUG];
}

export function isKnownTemplate(slug: string): boolean {
  return slug in TEMPLATES;
}
