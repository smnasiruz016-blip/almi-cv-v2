/**
 * AlmiCV — CV conventions per country.
 *
 * Static deterministic table covering all 193 served countries. Drives
 * the `/cv-guide/[country]/[role]` page's "Common in {Country}" section.
 *
 * HONESTY DOCTRINE: copy on the page must read "Common in {Country}: …"
 * — NEVER "{Country} CVs MUST include …". These are convention defaults,
 * not rules. The page directs visitors to verify with their target
 * employer for each application.
 *
 * Where a country isn't individually verified, we use the regional
 * default for its 14-region bucket (see `lib/countries.ts:Region`) and
 * mark the entry `// regional default`. Country-specific overrides
 * each carry a `sources` array; see the note above COUNTRY_OVERRIDES for
 * why every one of them is currently empty.
 */

import type { Region } from "./countries";
import { COUNTRIES_SERVED } from "./countries";

export type PageLength = "1-page" | "2-page" | "flexible";
export type PhotoConvention = "required" | "optional" | "avoid";
export type AddressConvention = "full" | "city-only" | "avoid";
export type DOBConvention = "common" | "avoid";
export type GPAConvention = "common" | "optional" | "avoid";
export type ReferenceConvention = "list" | "available-on-request" | "avoid";

/** A hand-verified country entry. `sources` is REQUIRED and must not be empty —
 *  scripts/verify-conventions.ts fails on an entry without one. Regional defaults
 *  are exempt: they are labelled defaults on the page, and claim nothing about a
 *  specific country. */
export type VerifiedCountryConvention = CountryConvention & { sources: string[] };

export type CountryConvention = {
  pageLength: PageLength;
  includePhoto: PhotoConvention;
  includeAddress: AddressConvention;
  includeDOB: DOBConvention;
  includeGPA: GPAConvention;
  referenceSection: ReferenceConvention;
  /** One line, "Common in {Country}" framing for the page. */
  notes: string;
};

/**
 * Regional defaults — best-effort grounding for the 14 regions.
 * Country-specific knowledge (US, UK, Gulf, Germany, Japan, etc.) overrides.
 */
const REGIONAL_DEFAULTS: Record<Region, CountryConvention> = {
  "north-america": {
    pageLength: "1-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 1-page CV, no photo or DOB, references available on request.",
  },
  caribbean: {
    pageLength: "1-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 1-page CV, no photo, US-influenced format.",
  },
  "central-south-america": {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 1-2 page CV, photo often included, DOB common.",
  },
  "western-europe": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 2-page CV, photo optional, DOB avoided under EU equal-opportunity norms.",
  },
  nordic: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 2-page CV, no photo, no DOB, concise factual format.",
  },
  "eastern-europe": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 2-page CV, photo often included, DOB common.",
  },
  mena: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 2-page CV, photo often included, full address and DOB common.",
  },
  gulf: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the Gulf: 2-page CV with photo, full personal details (DOB, nationality, marital status) and references list.",
  },
  "sub-saharan-africa": {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 1-2 page CV, photo optional, DOB and references list common.",
  },
  "south-asia": {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in the region: 1-2 page CV, photo optional, DOB and references commonly included.",
  },
  "southeast-asia": {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in the region: 1-page CV, photo often included, DOB common.",
  },
  "east-asia": {
    pageLength: "1-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "available-on-request",
    notes: "Common in the region: 1-page CV with required photo, full personal details, DOB common.",
  },
  "central-asia": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 2-page CV, photo often included, DOB and references common.",
  },
  oceania: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 1-2 page CV, no photo or DOB, references available on request.",
  },
};

/**
 * Country-specific overrides — verified knowledge per country.
 * Anything NOT in this map falls through to REGIONAL_DEFAULTS.
 */
/** ⚠️ EVERY ENTRY BELOW HAS `sources: []`, AND THAT IS THE TRUE VALUE.
 *
 *  The header used to say these "come from public career-guidance sources cited
 *  in PR description". They are not: PR #34's description cites no source at all
 *  — its only URLs are a sitemap and a tool footer — and neither commit that
 *  touched this file names one either. The claim was checked, not assumed.
 *
 *  Rather than invent 29 plausible URLs, the field records the truth: unsourced.
 *  scripts/verify-conventions.ts lists every entry still in that state, and it is
 *  deliberately NOT armed in the build, because a gate that can only be red is a
 *  gate someone deletes. Arm it in `prebuild` the day the last source lands. */
const COUNTRY_OVERRIDES: Record<string, VerifiedCountryConvention> = {
  "united-states": {
    pageLength: "1-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the United States: 1-page resume, no photo or DOB (EEOC compliance), references available on request.",
    sources: [],
  },
  "united-kingdom": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the UK: 2-page CV with a personal statement at the top, no photo or DOB, references available on request.",
    sources: [],
  },
  canada: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Canada: 1-2 page resume, no photo or DOB, references available on request.",
    sources: [],
  },
  germany: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in Germany: 2-page Lebenslauf with photo optional, full personal details and chronological work history; certificates often attached.",
    sources: [],
  },
  france: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in France: 1-page CV, photo optional, no DOB under equal-opportunity norms; lettre de motivation typically separate.",
    sources: [],
  },
  netherlands: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the Netherlands: 2-page CV, no photo or DOB, factual concise format.",
    sources: [],
  },
  spain: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Spain: 1-2 page CV (curriculum vitae), photo optional, DOB avoided under EU norms.",
    sources: [],
  },
  italy: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Italy: 2-page CV, Europass format common in public sector, photo optional.",
    sources: [],
  },
  ireland: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Ireland: 2-page CV, no photo or DOB, references available on request.",
    sources: [],
  },
  // Gulf — all 6 follow the same convention
  "saudi-arabia": {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Saudi Arabia: 2-page CV with photo, full personal details (DOB, nationality, marital status), and references list.",
    sources: [],
  },
  "united-arab-emirates": {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the UAE: 2-page CV with photo, full personal details and references list.",
    sources: [],
  },
  qatar: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Qatar: 2-page CV with photo, full personal details and references list.",
    sources: [],
  },
  kuwait: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Kuwait: 2-page CV with photo, full personal details and references list.",
    sources: [],
  },
  bahrain: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Bahrain: 2-page CV with photo, full personal details and references list.",
    sources: [],
  },
  oman: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Oman: 2-page CV with photo, full personal details and references list.",
    sources: [],
  },
  egypt: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in Egypt: 2-page CV, photo often included, DOB and full address common.",
    sources: [],
  },
  // South Asia
  pakistan: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in Pakistan: 1-2 page CV, photo optional, DOB and references commonly included.",
    sources: [],
  },
  india: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in India: 1-2 page CV, photo optional, DOB and full education details (including GPA) commonly included.",
    sources: [],
  },
  bangladesh: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in Bangladesh: 1-2 page CV, photo optional, DOB and references commonly included.",
    sources: [],
  },
  // East Asia
  japan: {
    pageLength: "1-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "avoid",
    notes: "Common in Japan: 1-page rirekisho format with required photo, DOB, full personal details, and chronological education + work history.",
    sources: [],
  },
  "south-korea": {
    pageLength: "1-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "avoid",
    notes: "Common in South Korea: 1-page CV with required photo, DOB, full personal details, GPA and certifications.",
    sources: [],
  },
  china: {
    pageLength: "1-page",
    includePhoto: "required",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "avoid",
    notes: "Common in China: 1-page CV with required photo, DOB and full education details.",
    sources: [],
  },
  // Oceania
  australia: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Australia: 2-page CV, no photo or DOB, references available on request.",
    sources: [],
  },
  "new-zealand": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in New Zealand: 1-2 page CV, no photo or DOB, references available on request.",
    sources: [],
  },
  "south-africa": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in South Africa: 2-page CV, no photo or DOB (employment-equity norms), references list common.",
    sources: [],
  },
  brazil: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Brazil: 1-2 page CV (currículo), photo optional, DOB common.",
    sources: [],
  },
  mexico: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Mexico: 1-page CV, photo often included, DOB common.",
    sources: [],
  },
  philippines: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in the Philippines: 2-page CV with photo often included, DOB and full personal details common.",
    sources: [],
  },
  singapore: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "available-on-request",
    notes: "Common in Singapore: 1-2 page CV, photo optional, DOB and education details commonly included.",
    sources: [],
  },
};

/**
 * Build CV_CONVENTIONS — one entry per served country.
 * Country override wins; falls through to the country's regional default.
 * Notes the source ("regional default") inline for transparency.
 */
function buildConventions(): Record<string, CountryConvention> {
  const out: Record<string, CountryConvention> = {};
  for (const country of COUNTRIES_SERVED) {
    const override = COUNTRY_OVERRIDES[country.slug];
    if (override) {
      out[country.slug] = override;
    } else {
      const def = REGIONAL_DEFAULTS[country.region];
      out[country.slug] = {
        ...def,
        notes: `Common in ${country.name}: ${def.notes.replace(/^Common in (the )?region: /, "")} (regional default — verify with target employer)`,
      };
    }
  }
  return out;
}

export const CV_CONVENTIONS: Record<string, CountryConvention> = buildConventions();

export function getConvention(countrySlug: string): CountryConvention | undefined {
  return CV_CONVENTIONS[countrySlug];
}

/**
 * True when this country has a hand-verified entry (not a regional default).
 * Used to flag "verified" badge on the page vs the "regional default" note.
 */
/** The hand-verified country slugs, in declaration order. Exported so the gate
 *  iterates the SAME object the page reads rather than a second list that can
 *  drift from it. */
export const COUNTRY_OVERRIDE_SLUGS: readonly string[] = Object.keys(COUNTRY_OVERRIDES);

/** The raw override, sources and all. getConvention() deliberately does not
 *  expose these — the page needs the seven fields, the gate needs the sources. */
export function getVerifiedOverride(countrySlug: string): VerifiedCountryConvention | undefined {
  return COUNTRY_OVERRIDES[countrySlug];
}

export function hasVerifiedConvention(countrySlug: string): boolean {
  return Boolean(COUNTRY_OVERRIDES[countrySlug]);
}
