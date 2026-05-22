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
 * come from public career-guidance sources cited in PR description.
 */

import type { Region } from "./countries";
import { COUNTRIES_SERVED } from "./countries";

export type PageLength = "1-page" | "2-page" | "flexible";
export type PhotoConvention = "required" | "optional" | "avoid";
export type AddressConvention = "full" | "city-only" | "avoid";
export type DOBConvention = "common" | "avoid";
export type GPAConvention = "common" | "optional" | "avoid";
export type ReferenceConvention = "list" | "available-on-request" | "avoid";

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
const COUNTRY_OVERRIDES: Record<string, CountryConvention> = {
  "united-states": {
    pageLength: "1-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the United States: 1-page resume, no photo or DOB (EEOC compliance), references available on request.",
  },
  "united-kingdom": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the UK: 2-page CV with a personal statement at the top, no photo or DOB, references available on request.",
  },
  canada: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Canada: 1-2 page resume, no photo or DOB, references available on request.",
  },
  germany: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in Germany: 2-page Lebenslauf with photo optional, full personal details and chronological work history; certificates often attached.",
  },
  france: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in France: 1-page CV, photo optional, no DOB under equal-opportunity norms; lettre de motivation typically separate.",
  },
  netherlands: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the Netherlands: 2-page CV, no photo or DOB, factual concise format.",
  },
  spain: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Spain: 1-2 page CV (curriculum vitae), photo optional, DOB avoided under EU norms.",
  },
  italy: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Italy: 2-page CV, Europass format common in public sector, photo optional.",
  },
  ireland: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Ireland: 2-page CV, no photo or DOB, references available on request.",
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
  },
  "united-arab-emirates": {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the UAE: 2-page CV with photo, full personal details and references list.",
  },
  qatar: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Qatar: 2-page CV with photo, full personal details and references list.",
  },
  kuwait: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Kuwait: 2-page CV with photo, full personal details and references list.",
  },
  bahrain: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Bahrain: 2-page CV with photo, full personal details and references list.",
  },
  oman: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Oman: 2-page CV with photo, full personal details and references list.",
  },
  egypt: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in Egypt: 2-page CV, photo often included, DOB and full address common.",
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
  },
  india: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in India: 1-2 page CV, photo optional, DOB and full education details (including GPA) commonly included.",
  },
  bangladesh: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in Bangladesh: 1-2 page CV, photo optional, DOB and references commonly included.",
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
  },
  "south-korea": {
    pageLength: "1-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "avoid",
    notes: "Common in South Korea: 1-page CV with required photo, DOB, full personal details, GPA and certifications.",
  },
  china: {
    pageLength: "1-page",
    includePhoto: "required",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "avoid",
    notes: "Common in China: 1-page CV with required photo, DOB and full education details.",
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
  },
  "new-zealand": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in New Zealand: 1-2 page CV, no photo or DOB, references available on request.",
  },
  "south-africa": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in South Africa: 2-page CV, no photo or DOB (employment-equity norms), references list common.",
  },
  brazil: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Brazil: 1-2 page CV (currículo), photo optional, DOB common.",
  },
  mexico: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Mexico: 1-page CV, photo often included, DOB common.",
  },
  philippines: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in the Philippines: 2-page CV with photo often included, DOB and full personal details common.",
  },
  singapore: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "available-on-request",
    notes: "Common in Singapore: 1-2 page CV, photo optional, DOB and education details commonly included.",
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
export function hasVerifiedConvention(countrySlug: string): boolean {
  return Boolean(COUNTRY_OVERRIDES[countrySlug]);
}
