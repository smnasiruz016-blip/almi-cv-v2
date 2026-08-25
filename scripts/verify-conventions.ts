// GATE A — MINIMUM SOURCED FIELDS FOR COUNTRY_OVERRIDES.
//
//   npx tsx scripts/verify-conventions.ts
//   npx tsx scripts/verify-conventions.ts --self-test
//
// Offline. No database, no network, no key.
//
// -- WHY ----------------------------------------------------------------------
// A COUNTRY_OVERRIDES entry is the difference between a page that says something
// about Germany and a page that says something about "the region" with Germany's
// name pasted in. The override is what earns /cv-guide/germany/<role> its place
// in the sitemap (isRoleCountryIndexable gates on hasVerifiedConvention), so an
// override that is incomplete, generic, or unsourced is not a small data problem
// — it is a thin page we told Google to index.
//
// Three things are checked per entry:
//   A. all seven convention fields present and inside their unions
//   B. a country-SPECIFIC notes line (names the country, not "the region")
//   C. at least one source
//
// -- WHY THIS IS NOT ARMED IN THE BUILD ---------------------------------------
// Check C is red for all 29 entries today, and that is the correct reading of
// reality rather than a bug: the file header claimed the overrides "come from
// public career-guidance sources cited in PR description", and they do not. PR
// #34's body cites no source at all — the only URLs in it are a sitemap and a
// tool footer — and neither commit that touched the file names one. That was
// checked before the field was added, and no URL was invented to make this
// green.
//
// So the script ships unarmed. A gate that can only ever be red is a gate
// somebody deletes, and deleting it would cost more than the red. Arm it in
// `prebuild` the day the last source lands; checks A and B pass today and would
// hold the line on their own if you would rather arm it sooner (--fields-only).

import {
  COUNTRY_OVERRIDE_SLUGS,
  getVerifiedOverride,
  type VerifiedCountryConvention,
} from "../src/lib/cv-conventions";
import { COUNTRIES_SERVED } from "../src/lib/countries";

const SELF_TEST = process.argv.includes("--self-test");
const FIELDS_ONLY = process.argv.includes("--fields-only");

let pass = 0, fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? ` - ${detail}` : ""}`); }
}

const PAGE_LENGTH = ["1-page", "2-page", "flexible"];
const PHOTO = ["required", "optional", "avoid"];
const ADDRESS = ["full", "city-only", "avoid"];
const DOB = ["common", "avoid"];
const GPA = ["common", "optional", "avoid"];
const REFS = ["list", "available-on-request", "avoid"];

/** "United Kingdom" -> "UK". Derived, not an allowlist: an entry may name its
 *  country by the initials people actually write ("Common in the UK: ..."), and
 *  a check that only accepts the full name would flag correct copy. Built from
 *  the country's own name so a new override needs no edit here. */
export function acronym(name: string): string {
  const words = name.split(/\s+/).filter((w) => /^[A-Z]/.test(w));
  return words.length >= 2 ? words.map((w) => w[0]).join("") : "";
}

/** Country-specific enough: the notes name the country, or its derived initials
 *  as a standalone word. */
export function namesTheCountry(notes: string, name: string): boolean {
  if (notes.includes(name)) return true;
  const a = acronym(name);
  return a.length >= 2 && new RegExp("(^|[^A-Za-z])" + a + "([^A-Za-z]|$)").test(notes);
}

type Result = { ok: boolean; why: string[] };

/** The three checks, as one pure function so the controls can drive it on
 *  fixtures instead of on the real data. */
export function inspect(
  slug: string,
  name: string,
  c: VerifiedCountryConvention | undefined,
  opts: { requireSources: boolean },
): Result {
  const why: string[] = [];
  if (!c) return { ok: false, why: ["no entry"] };

  // A. seven fields, each inside its union.
  const fields: Array<[string, unknown, string[]]> = [
    ["pageLength", c.pageLength, PAGE_LENGTH],
    ["includePhoto", c.includePhoto, PHOTO],
    ["includeAddress", c.includeAddress, ADDRESS],
    ["includeDOB", c.includeDOB, DOB],
    ["includeGPA", c.includeGPA, GPA],
    ["referenceSection", c.referenceSection, REFS],
  ];
  for (const [k, v, allowed] of fields) {
    if (v === undefined || v === null || v === "") why.push(`${k} missing`);
    else if (!allowed.includes(String(v))) why.push(`${k}="${String(v)}" not in [${allowed.join("|")}]`);
  }

  // B. notes present AND country-specific. "Common in the region: ..." with a
  //    name swapped in is exactly the thin page this whole gate exists to stop,
  //    so an override whose notes never name its own country is not an override.
  const notes = (c.notes ?? "").trim();
  if (!notes) why.push("notes missing");
  else {
    if (!namesTheCountry(notes, name)) why.push(`notes never name "${name}" (nor ${acronym(name) || "an accepted short form"})`);
    if (/regional default/i.test(notes)) why.push("notes carry the regional-default marker");
  }

  // C. sources.
  if (opts.requireSources) {
    const src = c.sources ?? [];
    if (!Array.isArray(src) || src.length === 0) why.push("no source");
    else {
      for (const u of src) {
        if (!/^https?:\/\/\S+$/.test(String(u))) why.push(`source is not a URL: "${String(u)}"`);
      }
    }
  }
  return { ok: why.length === 0, why };
}

const NAME_BY_SLUG = new Map(COUNTRIES_SERVED.map((c) => [c.slug, c.name]));

// -- CONTROLS -----------------------------------------------------------------
console.log("CONTROLS (each detector must fire on a synthetic defect and stay silent on a good entry)");
const GOOD: VerifiedCountryConvention = {
  pageLength: "1-page", includePhoto: "avoid", includeAddress: "city-only",
  includeDOB: "avoid", includeGPA: "optional", referenceSection: "available-on-request",
  notes: "Common in Testland: 1-page resume, no photo.",
  sources: ["https://example.org/testland-cv-guidance"],
};
const opts = { requireSources: true };
check("SILENT on a complete, sourced, country-specific entry",
  inspect("testland", "Testland", GOOD, opts).ok);
check("FIRES on a missing field",
  !inspect("testland", "Testland", { ...GOOD, pageLength: undefined as never }, opts).ok);
check("FIRES on a field outside its union",
  !inspect("testland", "Testland", { ...GOOD, includePhoto: "sometimes" as never }, opts).ok);
check("FIRES on empty notes",
  !inspect("testland", "Testland", { ...GOOD, notes: "" }, opts).ok);
check("SILENT on notes naming the country by derived initials (\"Common in the UK\")",
  inspect("uk", "United Kingdom",
    { ...GOOD, notes: "Common in the UK: 2-page CV, no photo." }, opts).ok);
check("FIRES on initials that are only part of a longer word",
  !inspect("uk", "United Kingdom",
    { ...GOOD, notes: "Common in the UKRAINIAN market: 2-page CV." }, opts).ok);
check("FIRES on notes that never name the country",
  !inspect("testland", "Testland", { ...GOOD, notes: "Common in the region: 1-page resume." }, opts).ok);
check("FIRES on notes still carrying the regional-default marker",
  !inspect("testland", "Testland",
    { ...GOOD, notes: "Common in Testland: 1-page (regional default — verify with target employer)" }, opts).ok);
check("FIRES on an entry with no source",
  !inspect("testland", "Testland", { ...GOOD, sources: [] }, opts).ok);
check("FIRES on a source that is not a URL",
  !inspect("testland", "Testland", { ...GOOD, sources: ["a careers blog I read"] }, opts).ok);
check("SILENT on a sourceless entry when sources are not required (--fields-only)",
  inspect("testland", "Testland", { ...GOOD, sources: [] }, { requireSources: false }).ok);
check("the override list is non-empty", COUNTRY_OVERRIDE_SLUGS.length > 0,
  `${COUNTRY_OVERRIDE_SLUGS.length} - a zero here is a broken export, not a clean surface`);
check("every override slug is a served country",
  COUNTRY_OVERRIDE_SLUGS.every((s) => NAME_BY_SLUG.has(s)),
  COUNTRY_OVERRIDE_SLUGS.filter((s) => !NAME_BY_SLUG.has(s)).join(", "));

if (SELF_TEST) {
  // Proves the PASS path is reachable: the same real entries, with a source
  // grafted on, go green. Without this the sources check could be red because it
  // is broken rather than because the data is unsourced.
  console.log("\nSELF-TEST — real entries + a synthetic source must go GREEN");
  let bad = 0;
  for (const slug of COUNTRY_OVERRIDE_SLUGS) {
    const c = getVerifiedOverride(slug)!;
    const r = inspect(slug, NAME_BY_SLUG.get(slug)!, { ...c, sources: ["https://example.org/x"] }, opts);
    if (!r.ok) { bad++; console.log(`  FAIL ${slug} - ${r.why.join("; ")}`); }
  }
  console.log(bad === 0
    ? `SELF-TEST OK - all ${COUNTRY_OVERRIDE_SLUGS.length} entries pass once a source is present, so a red run below means UNSOURCED, not broken.`
    : `SELF-TEST BROKEN - ${bad} entries fail even with a source.`);
  process.exit(bad === 0 ? 0 : 1);
}

// -- THE REAL DATA ------------------------------------------------------------
console.log(`\nA+B. FIELDS AND COUNTRY-SPECIFIC NOTES (${COUNTRY_OVERRIDE_SLUGS.length} overrides)`);
const unsourced: string[] = [];
for (const slug of COUNTRY_OVERRIDE_SLUGS) {
  const name = NAME_BY_SLUG.get(slug) ?? slug;
  const c = getVerifiedOverride(slug);
  const r = inspect(slug, name, c, { requireSources: false });
  check(`${slug}: 7 fields + country-specific notes`, r.ok, r.why.join("; "));
  if (!c || (c.sources ?? []).length === 0) unsourced.push(slug);
}

if (!FIELDS_ONLY) {
  console.log(`\nC. EVERY OVERRIDE CARRIES A SOURCE`);
  for (const slug of COUNTRY_OVERRIDE_SLUGS) {
    const c = getVerifiedOverride(slug);
    const r = inspect(slug, NAME_BY_SLUG.get(slug) ?? slug, c, { requireSources: true });
    check(`${slug}: sourced`, r.ok, r.why.join("; "));
  }
}

// The regional defaults are exempt, but say so out loud with a number, so nobody
// reads the override count as coverage of all 193 served countries.
const regional = COUNTRIES_SERVED.length - COUNTRY_OVERRIDE_SLUGS.length;
console.log(`\n     ${COUNTRY_OVERRIDE_SLUGS.length} hand-verified overrides, ${regional} countries on a labelled regional default (exempt).`);

if (unsourced.length) {
  console.log(`\nUNRECOVERABLE SOURCES — ${unsourced.length} entries, for Nasir, NOT invented:`);
  console.log(`  ${unsourced.join(", ")}`);
  console.log("  PR #34's description cites no source (checked: its only URLs are a sitemap and a");
  console.log("  tool footer), and neither commit that touched cv-conventions.ts names one. Every");
  console.log("  one of the 29 needs a source supplied by hand.");
}

console.log(`\n${fail === 0 ? "PASS" : "FAIL"} - ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
