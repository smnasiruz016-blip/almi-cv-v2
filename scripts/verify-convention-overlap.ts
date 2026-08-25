// GATE B — SIBLING OVERLAP BETWEEN VERIFIED COUNTRIES.
//
//   npx tsx scripts/verify-convention-overlap.ts
//   npx tsx scripts/verify-convention-overlap.ts --sabotage
//
// Offline. No database, no network, no key. This is the thinness detector the
// 16 Aug audit recorded as MISSING.
//
// -- WHY ----------------------------------------------------------------------
// hasVerifiedConvention() decides whether /cv-guide/<country>/<role> is put in
// the sitemap. A COUNTRY_OVERRIDES entry therefore converts a page from
// noindexed to submitted. Nothing checked that two "verified" countries actually
// SAY different things — and if they do not, we have asked Google to index two
// pages that differ by a proper noun. That is the definition of the doorway page
// Search's guidelines describe, and it is the exact failure the regional-default
// countries are already noindexed to avoid.
//
// -- WHAT IS COMPARED ---------------------------------------------------------
// The country-facing convention copy, assembled from the same data the page
// renders in its "CV conventions in {Country}" section: the six convention
// fields and the notes line. Not the whole page — the master marketing sections
// are IDENTICAL on every page by design, and including them would drown the
// signal in shared boilerplate and make every pair look ~99% similar.
//
// -- THE NORMALISATION THAT MAKES THE CHECK ABLE TO FIRE ----------------------
// The country name is stripped before comparing, and so is its language. Leave
// them in and "Common in France: 2-page CV, photo optional" versus "Common in
// Spain: 2-page CV, photo optional" score below the threshold purely because
// "France" is not "Spain" — the detector would be blind to the one defect it
// exists to find. What survives normalisation is the substance: if two countries
// still read the same with their names removed, they ARE the same page.
//
// -- THE METRIC ---------------------------------------------------------------
// Sorensen-Dice over character trigrams.
//   * Bounded 0..1, so "90%" means something fixed rather than a distance that
//     grows with length.
//   * Order-insensitive: reordering clauses ("no photo, 1-page" vs "1-page, no
//     photo") is not a real difference and must not score as one. Levenshtein
//     would count it as a large edit and let a true duplicate through.
//   * Character-level, not word-level: the field values are a 17-word closed
//     vocabulary, so word-set overlap saturates near 1.0 for every pair and
//     cannot discriminate. Trigrams keep resolution over short, formulaic text.
// Threshold 0.90 comes from the brief. The full sorted distribution is printed
// so the number can be argued with rather than trusted.

import { COUNTRY_OVERRIDE_SLUGS, getVerifiedOverride } from "../src/lib/cv-conventions";
import { COUNTRIES_SERVED } from "../src/lib/countries";

const THRESHOLD = 0.90;
const SABOTAGE = process.argv.includes("--sabotage");

let pass = 0, fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? ` - ${detail}` : ""}`); }
}

/** Character trigrams of a normalised string. */
export function trigrams(s: string): Map<string, number> {
  const t = ` ${s.replace(/\s+/g, " ").trim()} `;
  const m = new Map<string, number>();
  for (let i = 0; i + 3 <= t.length; i++) {
    const g = t.slice(i, i + 3);
    m.set(g, (m.get(g) ?? 0) + 1);
  }
  return m;
}

/** Sorensen-Dice over trigram multisets: 2*|A∩B| / (|A|+|B|). */
export function dice(a: string, b: string): number {
  const A = trigrams(a), B = trigrams(b);
  const sizeA = [...A.values()].reduce((x, y) => x + y, 0);
  const sizeB = [...B.values()].reduce((x, y) => x + y, 0);
  if (sizeA === 0 && sizeB === 0) return 1;
  let inter = 0;
  for (const [g, n] of A) inter += Math.min(n, B.get(g) ?? 0);
  return (2 * inter) / (sizeA + sizeB);
}

const NAME_BY_SLUG = new Map(COUNTRIES_SERVED.map((c) => [c.slug, c.name]));
const LANG_BY_SLUG = new Map(COUNTRIES_SERVED.map((c) => [c.slug, c.primaryLanguage]));

/** The country-facing copy, minus the country's own identity. */
export function conventionCopy(slug: string, override?: {
  pageLength: string; includePhoto: string; includeAddress: string;
  includeDOB: string; includeGPA: string; referenceSection: string; notes: string;
}): string {
  const c = override ?? getVerifiedOverride(slug)!;
  const raw = [
    `page length ${c.pageLength}`,
    `photo ${c.includePhoto}`,
    `address ${c.includeAddress}`,
    `date of birth ${c.includeDOB}`,
    `gpa ${c.includeGPA}`,
    `references ${c.referenceSection}`,
    c.notes,
  ].join(". ");
  return stripIdentity(raw, NAME_BY_SLUG.get(slug) ?? slug, LANG_BY_SLUG.get(slug) ?? "");
}

/** Remove the country name, its derived initials and its language, so two
 *  entries that differ only by proper noun compare as what they are: the same. */
export function stripIdentity(text: string, name: string, language: string): string {
  let t = text;
  const initials = name.split(/\s+/).filter((w) => /^[A-Z]/.test(w));
  const forms = [name, ...(initials.length >= 2 ? [initials.map((w) => w[0]).join("")] : []), language]
    .filter((x) => x && x.length >= 2)
    .sort((a, b) => b.length - a.length);
  for (const f of forms) {
    t = t.replace(new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), " ");
  }
  return t.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
}

// -- CONTROLS -----------------------------------------------------------------
console.log("CONTROLS (the metric and the normalisation must both be shown to work)");
check("identical text scores 1.0", dice("a b c d e f", "a b c d e f") === 1);
check("unrelated text scores low", dice(
  "page length 1 page photo avoid references list",
  "quantum chromodynamics and the strong nuclear force") < 0.2);
check("reordered clauses still score HIGH (why Dice, not Levenshtein)",
  dice("no photo, 1-page cv, no dob", "1-page cv, no dob, no photo") > 0.7);
check("a genuinely different convention scores BELOW the threshold",
  dice("page length 1 page photo avoid date of birth avoid references available on request",
       "page length 2 page photo required date of birth common references list") < THRESHOLD);
// The normalisation control is the load-bearing one: without it the detector is
// blind to the only defect it exists to catch.
const A = "Common in France: 2-page CV, photo optional, no DOB.";
const B = "Common in Spain: 2-page CV, photo optional, no DOB.";
check("WITHOUT normalisation two name-only-different entries score below 1.0 (the blindness)",
  dice(A, B) < 0.97, `${dice(A, B).toFixed(4)}`);
check("WITH normalisation the same pair scores ~1.0 (the blindness removed)",
  dice(stripIdentity(A, "France", "French"), stripIdentity(B, "Spain", "Spanish")) > 0.99,
  dice(stripIdentity(A, "France", "French"), stripIdentity(B, "Spain", "Spanish")).toFixed(4));
check("stripIdentity removes the derived initials too",
  !/uk/i.test(stripIdentity("Common in the UK: 2-page CV.", "United Kingdom", "English")));
check("there are overrides to compare", COUNTRY_OVERRIDE_SLUGS.length >= 2,
  `${COUNTRY_OVERRIDE_SLUGS.length}`);

// -- THE REAL PAIRS -----------------------------------------------------------
const slugs = [...COUNTRY_OVERRIDE_SLUGS];
const copy = new Map<string, string>();
for (const s of slugs) copy.set(s, conventionCopy(s));

// --sabotage plants a duplicate: Mexico is given Brazil's convention copy
// verbatim, which is what "two verified countries saying the same thing" looks
// like in the data. The run must go RED on that pair and only that pair.
if (SABOTAGE) {
  const donor = slugs.find((s) => s === "brazil") ?? slugs[0];
  const victim = slugs.find((s) => s === "mexico") ?? slugs[1];
  copy.set(victim, copy.get(donor)!);
  console.log(`\n[--sabotage] ${victim} has been given ${donor}'s convention copy verbatim.`);
}

const pairs: Array<{ a: string; b: string; score: number }> = [];
for (let i = 0; i < slugs.length; i++) {
  for (let j = i + 1; j < slugs.length; j++) {
    pairs.push({ a: slugs[i], b: slugs[j], score: dice(copy.get(slugs[i])!, copy.get(slugs[j])!) });
  }
}
pairs.sort((x, y) => y.score - x.score);

console.log(`\nPAIRWISE OVERLAP — ${slugs.length} verified countries, ${pairs.length} pairs, Dice over character trigrams`);
console.log(`threshold ${THRESHOLD}`);
console.log("\n  worst 12:");
for (const p of pairs.slice(0, 12)) {
  console.log(`    ${p.score.toFixed(4)}  ${p.a} <-> ${p.b}${p.score > THRESHOLD ? "   <-- OVER" : ""}`);
}
const scores = pairs.map((p) => p.score);
const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
const median = scores.slice().sort((a, b) => a - b)[Math.floor(scores.length / 2)];
console.log(`\n  max ${scores[0].toFixed(4)}   mean ${mean.toFixed(4)}   median ${median.toFixed(4)}   min ${scores[scores.length - 1].toFixed(4)}`);

const over = pairs.filter((p) => p.score > THRESHOLD);
check(`no verified pair exceeds ${THRESHOLD} similarity`, over.length === 0,
  over.map((p) => `${p.a} <-> ${p.b} = ${p.score.toFixed(4)}`).join("; "));

// Regional-default countries are exempt and it is worth saying why in the
// output, so nobody reads this gate as covering all 193.
const regional = COUNTRIES_SERVED.length - slugs.length;
console.log(`\n     ${regional} countries run on a labelled regional default and are EXEMPT: they are`);
console.log("     honestly marked as defaults on the page and are already noindexed at");
console.log("     role x country level, so their near-duplication is disclosed, not hidden.");

console.log(`\n${fail === 0 ? "PASS" : "FAIL"} - ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
