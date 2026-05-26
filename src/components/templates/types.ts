// ============================================================================
// AlmiCV — shared types for the 20 production template components.
//
// Templates were originally authored against an internal `ResumeData` shape
// (Claude Design's Batch 2 handoff). Production storage uses CVData
// (src/lib/cv-types.ts), which is broader: it carries optional
// projects/awards/interests/sectionLabels/language and uses RichText
// (HTML-string) bullets and summary.
//
// To avoid silent data loss when rendering existing CVs, templates were
// adapted to consume CVData directly. This file re-exports CVData under
// TemplateProps and provides defensive helpers each template uses.
// ============================================================================

import type { CVData, SectionLabels } from "@/lib/cv-types";
import { isRichTextEmpty } from "@/lib/rich-text";

export type { CVData } from "@/lib/cv-types";

/** Template render contract. `paginated` and `printSafe` are accepted by
 *  the editor preview + print pipeline; templates may ignore them. */
export interface TemplateProps {
  data: CVData;
  paginated?: boolean;
  printSafe?: boolean;
}

// ----------------------------------------------------------------------------
// Default labels — used when sectionLabels are missing or empty. Translated
// CVs populate sectionLabels via the AI translator (see resume-actions.ts).
// ----------------------------------------------------------------------------
const DEFAULT_LABELS: Required<SectionLabels> = {
  profile: "Profile",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  languages: "Languages",
  awards: "Awards",
  certifications: "Certifications",
  interests: "Interests",
};

/** Read a translatable section label with English fallback. */
export function getLabel(data: CVData, key: keyof SectionLabels): string {
  return data.sectionLabels?.[key]?.trim() || DEFAULT_LABELS[key];
}

// ----------------------------------------------------------------------------
// DEFAULT_DATA — sensible placeholders so the template renders something
// reasonable when a Resume row is freshly created and most fields are empty.
// Used in the editor preview via:
//
//   <TemplateComponent data={mergeWithDefaults(resume.data)} />
//
// All RichText values are plain strings here so sanitize/strip pass through
// untouched.
// ----------------------------------------------------------------------------
export const DEFAULT_DATA: CVData = {
  basics: {
    fullName: "Your Name",
    role: "Your Role",
    email: "you@example.com",
    phone: "+1 (000) 000-0000",
    website: "yourname.dev",
    location: "City, Country",
    summary:
      "Short professional summary. Lead with the most impressive thing you've done in the past two years; finish with what you're looking for next.",
  },
  experience: [
    {
      company: "Company Name",
      role: "Senior Role",
      startDate: "2022",
      endDate: "Present",
      bullets: [
        "Led a measurable outcome that mattered to the business.",
        "Built or shipped a thing that scaled to (n) users / dollars / impact.",
        "Owned a process or function from end to end.",
      ],
    },
    {
      company: "Previous Company",
      role: "Role",
      startDate: "2018",
      endDate: "2022",
      bullets: [
        "Earlier outcome worth bragging about.",
        "Second earlier outcome.",
      ],
    },
  ],
  education: [
    {
      school: "Your University",
      degree: "BSc Your Field",
      startDate: "2014",
      endDate: "2018",
      notes: "Honours / cum laude / relevant thesis title.",
    },
  ],
  skills: [
    "Skill One",
    "Skill Two",
    "Skill Three",
    "Skill Four",
    "Skill Five",
    "Skill Six",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Second Language", level: "Fluent · C1" },
  ],
  certifications: [
    { name: "Certification Name", issuer: "Issuer", year: "2023" },
    { name: "Another Certification", issuer: "Issuer", year: "2022" },
  ],
};

/** Tiny merge helper — fills missing fields with defaults without nuking the
 *  user's data. Required sections (experience/education/skills) fall back to
 *  DEFAULT_DATA's seeded entries; optional sections (projects/awards/
 *  interests) pass through as-is (undefined stays undefined so templates can
 *  conditionally render). */
export function mergeWithDefaults(
  partial: Partial<CVData> | undefined | null,
): CVData {
  const p = partial ?? {};
  return {
    basics: { ...DEFAULT_DATA.basics, ...(p.basics ?? {}) },
    experience:
      p.experience && p.experience.length > 0
        ? p.experience
        : DEFAULT_DATA.experience,
    education:
      p.education && p.education.length > 0
        ? p.education
        : DEFAULT_DATA.education,
    skills: p.skills && p.skills.length > 0 ? p.skills : DEFAULT_DATA.skills,
    projects: p.projects,
    languages:
      p.languages && p.languages.length > 0
        ? p.languages
        : DEFAULT_DATA.languages,
    awards: p.awards,
    certifications:
      p.certifications && p.certifications.length > 0
        ? p.certifications
        : DEFAULT_DATA.certifications,
    interests: p.interests,
    achievements: p.achievements,
    style: p.style,
    language: p.language,
    sectionLabels: p.sectionLabels,
  };
}

/** Shared helper — formats a date range "Jan 2022 — Present".
 *  endDate is optional in CVData; treat undefined/empty as "Present". */
export function dateRange(
  start: string | undefined,
  end: string | undefined,
): string {
  const s = (start ?? "").trim();
  const e = (end ?? "").trim();
  if (s && e) return `${s} — ${e}`;
  if (s) return `${s} — Present`;
  if (e) return e;
  return "";
}

/** Initials from a name — falls back to "•" if name is empty. */
export function initials(fullName: string): string {
  const parts = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "•";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Re-export RichText helpers so templates only need one import path.
export { RichTextRender, isRichTextEmpty, stripRichText } from "@/lib/rich-text";

/** True when a bullets array is effectively empty (all entries blank/whitespace). */
export function hasNonEmptyBullets(
  bullets: string[] | undefined | null,
): boolean {
  if (!bullets || bullets.length === 0) return false;
  return bullets.some((b) => !isRichTextEmpty(b));
}
