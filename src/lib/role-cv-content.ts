// Sourced role-CV content — the "verified role-content dataset" that un-thins the
// /cv-guide/[country]/[role] grid (each entry SOURCED via a SERP/research pass:
// what people actually ask about a [role] CV — sections, length, the skills &
// ATS keywords recruiters search). Honest: figures are sourced, never invented;
// banned-verb clean. Added in batches like the origin set; a role becomes
// self-canonical + indexable only once it has an entry here (real-data-or-noindex).

export type RoleCvContent = {
  /** What a [role] CV should include — the sections. */
  include: string;
  /** How long / format guidance. */
  length: string;
  hardSkills: string[];
  softSkills: string[];
  atsKeywords: string[];
  /** Sourced note on the keywords (e.g. "appear in 85%+ of nursing job descriptions"). */
  atsNote: string;
};

export const ROLE_CV_CONTENT: Record<string, RoleCvContent> = {
  // ── Batch 1 (sourced via live SERP 2026: Indeed, Nurse.org, enhancv, ATS guides) ──
  // NOTE: keys MUST be the canonical role slug from @smnasiruz016-blip/job-roles
  // (e.g. "registered-nurse", not "nurse" — there is no "nurse" slug).
  "registered-nurse": {
    include:
      "Your name and contact details, a short professional summary, your nursing registration and licence number, clinical experience with measurable achievements, education, certifications (BLS, ACLS, PALS), and a key-skills section.",
    length:
      "Recruiters scan in seconds, so keep it tight and tailored to the posting — lead with your strongest clinical experience and current certifications rather than listing every duty.",
    hardSkills: [
      "Patient assessment",
      "Medication administration",
      "IV therapy",
      "Wound care",
      "EHR (Epic / Cerner / Meditech)",
      "Infection control",
      "Care planning",
    ],
    softSkills: [
      "Communication",
      "Critical thinking",
      "Teamwork",
      "Time management",
      "Patient advocacy",
    ],
    atsKeywords: [
      "Patient Care",
      "Medication Administration",
      "Patient Assessment",
      "IV Therapy",
      "Care Planning",
      "BLS/ACLS Certified",
      "EHR",
    ],
    atsNote:
      "These appear in 85%+ of nursing job descriptions — use 15–25 drawn from the actual posting, integrated naturally, never keyword-stuffed.",
  },
};

const BY_SLUG = ROLE_CV_CONTENT;
export function getRoleCvContent(roleSlug: string): RoleCvContent | undefined {
  return BY_SLUG[roleSlug];
}
export function hasRoleCvContent(roleSlug: string): boolean {
  return roleSlug in BY_SLUG;
}
export const ROLE_CV_CONTENT_SLUGS: string[] = Object.keys(ROLE_CV_CONTENT);

// ── Curated CV-destination countries (founder gate, real-data-or-noindex) ────
// The ~40 markets where CV norms genuinely differ and CV/resume search demand is
// real: anglophone + European (Europass) + Gulf (photo) + the largest origin
// markets. A role×country grid cell is self-canonical + indexed only when the
// role has sourced content AND the country is in this set — keeps the grid from
// becoming 99k near-duplicates (the AlmiPrep 26k→4k lesson).
export const CURATED_CV_COUNTRIES: readonly string[] = [
  // Anglophone
  "united-states", "united-kingdom", "canada", "australia", "new-zealand", "ireland",
  // Europe (Europass / distinct conventions)
  "germany", "france", "netherlands", "spain", "italy", "sweden", "switzerland",
  "belgium", "austria", "poland", "portugal", "norway", "denmark", "finland",
  // Gulf / Middle East (photo conventions, migration)
  "united-arab-emirates", "saudi-arabia", "qatar", "oman", "kuwait", "bahrain",
  // Largest origin markets / high CV demand
  "india", "pakistan", "bangladesh", "philippines", "nigeria", "kenya",
  "south-africa", "egypt", "singapore", "malaysia", "indonesia", "japan", "brazil",
];

const CURATED_SET = new Set(CURATED_CV_COUNTRIES);
export function isCuratedCvCountry(slug: string): boolean {
  return CURATED_SET.has(slug);
}

/** Grid gate: a role×country page is self-canonical + indexable only where the
 *  role has sourced CV content AND the country is a curated CV destination. */
export function isRoleCountryIndexable(roleSlug: string, countrySlug: string): boolean {
  return hasRoleCvContent(roleSlug) && isCuratedCvCountry(countrySlug);
}
