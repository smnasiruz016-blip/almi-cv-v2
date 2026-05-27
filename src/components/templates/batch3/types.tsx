// ============================================================================
// AlmiCV — shared types for template components (v3 — Batch 3)
// ----------------------------------------------------------------------------
// Adopts CVData (the live AlmiCV schema) as the canonical shape. Keeps
// ResumeData as a deprecated alias + a `normalize()` adapter so Batch 1/2
// templates keep rendering during the migration.
//
// Drop into src/components/templates/types.ts (replacing v2).
// ============================================================================

import React from "react";

// ============================================================================
// CVData — canonical shape. Matches your live database / editor types.
// ============================================================================
export interface CVData {
  basics: {
    name?: string;
    role?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedIn?: string;
    photo?: string;
    summary?: string; // RichText (HTML)
  };
  experience?: Array<{
    title?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    bullets?: string; // RichText (HTML, typically a <ul>)
    notes?: string;
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    notes?: string;
  }>;
  skills?: Array<{ name?: string; level?: string }>;
  projects?: Array<{ name?: string; description?: string; link?: string }>;
  awards?: Array<{ title?: string; issuer?: string; date?: string }>;
  interests?: string[];
  languages?: Array<{ language?: string; level?: string }>;
  certifications?: Array<{ name?: string; issuer?: string; date?: string }>;
  /** Used by translated CVs — overrides default English section labels. */
  sectionLabels?: Record<string, string>;
}

export interface TemplateProps {
  data: CVData;
}

// ============================================================================
// Backwards-compat with Batch 1 / 2 (ResumeData)
// ============================================================================
/** @deprecated Use CVData. Kept so older imports don't break. */
export interface ResumeData {
  basics: {
    fullName: string;
    role: string;
    email: string;
    phone: string;
    website?: string;
    location?: string;
    photoUrl?: string;
    summary?: string;
  };
  work: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    details?: string;
  }>;
  skills: string[];
  languages: Array<{ name: string; proficiency: string }>;
  certifications: Array<{ name: string; issuer: string; year: string }>;
}

/** Convert legacy ResumeData → canonical CVData. Used by the editor / print
 *  routes if you still feed templates the old shape. */
export function normalize(input: ResumeData | CVData | Partial<CVData> | undefined | null): CVData {
  const i = (input ?? {}) as any;
  // Already-CVData has `name` on basics; legacy has `fullName`.
  if (i.basics?.fullName !== undefined && i.work !== undefined) {
    const legacy = i as ResumeData;
    return {
      basics: {
        name: legacy.basics.fullName,
        role: legacy.basics.role,
        email: legacy.basics.email,
        phone: legacy.basics.phone,
        location: legacy.basics.location,
        website: legacy.basics.website,
        photo: legacy.basics.photoUrl,
        summary: legacy.basics.summary,
      },
      experience: legacy.work.map((w) => ({
        title: w.role,
        company: w.company,
        startDate: w.startDate,
        endDate: w.endDate,
        bullets: `<ul>${w.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`,
      })),
      education: legacy.education.map((e) => ({
        degree: e.degree,
        institution: e.school,
        startDate: e.startDate,
        endDate: e.endDate,
        notes: e.details,
      })),
      skills: legacy.skills.map((s) => ({ name: s })),
      languages: legacy.languages.map((l) => ({ language: l.name, level: l.proficiency })),
      certifications: legacy.certifications.map((c) => ({ name: c.name, issuer: c.issuer, date: c.year })),
    };
  }
  // Already a CVData / partial — fill arrays, ensure basics object exists.
  return {
    basics: i.basics ?? {},
    experience: i.experience ?? [],
    education: i.education ?? [],
    skills: i.skills ?? [],
    projects: i.projects ?? [],
    awards: i.awards ?? [],
    interests: i.interests ?? [],
    languages: i.languages ?? [],
    certifications: i.certifications ?? [],
    sectionLabels: i.sectionLabels,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================================
// Defaults — sensible placeholders so empty rows still render.
// ============================================================================
export const DEFAULT_CV_DATA: CVData = {
  basics: {
    name: "Your Name",
    role: "Your Role",
    email: "you@example.com",
    phone: "+1 (000) 000-0000",
    location: "City, Country",
    website: "yourname.dev",
    summary:
      "<p>Short professional summary. Lead with the most impressive thing you've done in the past two years; finish with what you're looking for next.</p>",
  },
  experience: [
    {
      title: "Senior Role",
      company: "Company Name",
      startDate: "2022",
      endDate: "Present",
      current: true,
      bullets:
        "<ul><li>Led a measurable outcome that mattered to the business.</li><li>Built or shipped a thing that scaled.</li><li>Owned a process or function end to end.</li></ul>",
    },
  ],
  education: [
    {
      degree: "BSc Your Field",
      institution: "Your University",
      startDate: "2014",
      endDate: "2018",
      notes: "Honours / cum laude.",
    },
  ],
  skills: [
    { name: "Skill One" }, { name: "Skill Two" }, { name: "Skill Three" },
    { name: "Skill Four" }, { name: "Skill Five" }, { name: "Skill Six" },
  ],
  languages: [
    { language: "English", level: "Native" },
    { language: "Spanish", level: "Fluent · C1" },
  ],
  certifications: [
    { name: "Certification Name", issuer: "Issuer", date: "2023" },
  ],
};

/** Merge user data with defaults so blank fields don't break the preview. */
export function mergeWithDefaults(input: Partial<CVData> | undefined | null): CVData {
  const p = (input ?? {}) as Partial<CVData>;
  return {
    basics: { ...DEFAULT_CV_DATA.basics, ...(p.basics ?? {}) },
    experience: p.experience && p.experience.length ? p.experience : DEFAULT_CV_DATA.experience,
    education: p.education && p.education.length ? p.education : DEFAULT_CV_DATA.education,
    skills: p.skills && p.skills.length ? p.skills : DEFAULT_CV_DATA.skills,
    projects: p.projects ?? [],
    awards: p.awards ?? [],
    interests: p.interests ?? [],
    languages: p.languages && p.languages.length ? p.languages : DEFAULT_CV_DATA.languages,
    certifications: p.certifications && p.certifications.length ? p.certifications : DEFAULT_CV_DATA.certifications,
    sectionLabels: p.sectionLabels,
  };
}

// ============================================================================
// Render helpers used inside every Batch 3 template
// ============================================================================

/** Render RichText (HTML string) safely. Pass `as` to choose the wrapper element. */
export function RichTextRender({
  html, className, style, as: As = "div" as any,
}: {
  html?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  if (!html || !html.trim()) return null;
  // @ts-ignore — dynamic element
  return <As className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Look up a translated section label. Falls back to the English default. */
export function getLabel(data: CVData, key: string, fallback: string): string {
  return data.sectionLabels?.[key] ?? fallback;
}

/** "Jan 2022 — Present" / "Jan 2022 — Apr 2024". Handles `current` flag. */
export function dateRange(start?: string, end?: string, current?: boolean): string {
  const s = (start ?? "").trim();
  const e = current ? "Present" : (end ?? "").trim();
  if (s && e) return `${s} — ${e}`;
  if (s) return `${s} — Present`;
  if (e) return e;
  return "";
}

/** "JS" from "Jordan Smith"; "AI" from "Alex Iversen"; falls back to "•". */
export function initials(name?: string): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "•";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Strip HTML tags — used when a template wants plain-text from a RichText field. */
export function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}
