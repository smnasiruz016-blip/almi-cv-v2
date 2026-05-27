// ============================================================================
// Claude Design (Batch 3) adapter.
//
// Why this file exists:
//   The 10 Batch 3 templates ship with their own pseudo-`CVData` shape
//   defined in src/components/templates/batch3/types.ts — fields like
//   `basics.name` (vs AlmiCV's `basics.fullName`), `experience[].title`
//   (vs `.role`), `experience[].bullets: string` (vs `RichText[]`),
//   `skills: Array<{name}>` (vs `string[]`), etc.
//
//   Rather than (a) rewriting all 10 templates to consume AlmiCV's real
//   CVData or (b) regressing the 20 existing Batch 1+2 templates to
//   match CD's schema, we adapt at the rendering boundary: editor +
//   print routes pipe data through `toCDShape()` ONLY when the active
//   slug is in `BATCH_3_SLUGS`. Batch 1+2 templates render directly
//   against AlmiCV CVData (no adapter).
//
//   This file is the entire contract between AlmiCV's data layer and
//   CD's pseudo-schema. Future CD batches should reuse `toCDShape()`
//   unmodified — or, ideally, ship templates against AlmiCV's real
//   CVData so the adapter can retire.
// ============================================================================

import type { CVData } from "@/lib/cv-types";
import type { CVData as CDCVData } from "@/components/templates/batch3/types";

/** Slugs of the 10 Batch 3 templates. Used at the editor/print boundary
 *  to decide whether to pipe data through `toCDShape()`. Sourced from
 *  HANDOFFcd.md (Claude Design Batch 3, 2026-05-26). */
export const BATCH_3_SLUGS: ReadonlySet<string> = new Set([
  "legal-formal",
  "finance-elite",
  "finance-precise",
  "people-warm",
  "insurance-trust",
  "operations-structured",
  "aviation-precise",
  "veterinary-caring",
  "hospitality-elegant",
  "linguist-multilingual",
]);

export function isBatch3Slug(slug: string | null | undefined): boolean {
  return slug != null && BATCH_3_SLUGS.has(slug);
}

/** Convert AlmiCV's canonical CVData → Claude Design's pseudo-CVData
 *  shape so a Batch 3 template renders user data correctly. Pure data
 *  transformation: every field on the output is sourced from a field on
 *  the input (or sensibly defaulted), no API calls. */
export function toCDShape(data: CVData): CDCVData {
  return {
    basics: {
      name: data.basics?.fullName,
      role: data.basics?.role,
      email: data.basics?.email,
      phone: data.basics?.phone,
      location: data.basics?.location,
      website: data.basics?.website,
      linkedIn: data.basics?.linkedIn,
      photo: data.basics?.photoUrl,
      summary: data.basics?.summary,
    },
    experience: (data.experience ?? []).map((e) => ({
      title: e.role,
      company: e.company,
      location: e.location,
      startDate: e.startDate,
      endDate: e.endDate,
      // Heuristic: empty endDate signals "Present" in AlmiCV's data shape.
      current: !e.endDate,
      // CD wants a single HTML string (typically <ul><li>…</li></ul>).
      // AlmiCV stores each bullet as RichText (already sanitized HTML
      // with allowed inline tags). Join without escaping so emphasis
      // survives.
      bullets: bulletsToHtmlList(e.bullets ?? []),
    })),
    education: (data.education ?? []).map((e) => ({
      degree: e.degree,
      institution: e.school,
      location: e.location,
      startDate: e.startDate,
      endDate: e.endDate,
      notes: e.notes,
    })),
    skills: (data.skills ?? []).map((s) => ({ name: s })),
    projects: (data.projects ?? []).map((p) => ({
      name: p.name,
      description: p.description,
      link: p.url,
    })),
    awards: (data.awards ?? []).map((a) => ({
      title: a.title,
      issuer: a.issuer,
      date: a.year,
    })),
    interests: data.interests,
    languages: (data.languages ?? []).map((l) => ({
      language: l.name,
      level: l.level,
    })),
    certifications: (data.certifications ?? []).map((c) => ({
      name: c.name,
      issuer: c.issuer,
      date: c.year,
    })),
    // SectionLabels is `Partial<Record<SectionKey,string>>` on AlmiCV's
    // side; CD wants `Record<string,string>`. Cast — the runtime shape
    // is compatible (only `undefined` values differ, which CD's
    // `getLabel` already handles via `??`).
    sectionLabels: data.sectionLabels as Record<string, string> | undefined,
  };
}

/** Join AlmiCV's RichText[] bullets into a single <ul><li>…</li></ul>
 *  string for CD's `experience[].bullets: string` field. Each RichText
 *  is already sanitized inline HTML; do not escape further. */
function bulletsToHtmlList(bullets: string[]): string {
  const items = bullets
    .map((b) => (b ?? "").trim())
    .filter((b) => b.length > 0)
    .map((b) => `<li>${b}</li>`)
    .join("");
  return items ? `<ul>${items}</ul>` : "";
}
