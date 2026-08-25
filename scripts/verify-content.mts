// THE /learn CONTENT GATE.
//
//   npx tsx scripts/verify-content.ts
//   npx tsx scripts/verify-content.ts --self-test
//
// Offline. No database, no network, no key. Third port of this gate:
// almi-celpip -> almi-prep-v2 (#85) -> here, adapted to AlmiCV's route tree.
//
// -- WHY ---------------------------------------------------------------------
// Structure lives in frontmatter precisely SO THAT it can be checked. A CTA
// written as a line of prose is unreachable by any gate, and by page 60 it has
// drifted into six shapes. Typed frontmatter turns that into a build failure the
// day page 73 forgets its CTA, instead of a discovery months later.
//
// The orphan checks are the AlmiOET lesson made mechanical. /register returned
// 404 there, so Google had no path to any register page and none were ever
// indexed - 144,266 pages behind a door that did not open. Here the hub is
// derived from the directory, but "derived" is a claim about code, so it is
// checked: every guide must be reachable from a hub that itself is servable and
// in the sitemap.
//
// -- WHY THE CTA TARGETS ARE ENUMERATED, NEVER LISTED -------------------------
// A hardcoded list of targets is wrong in both directions. A page added next
// month is not in it, so a correct CTA fails. A page deleted next month is still
// in it, so a dead CTA passes. Both failures are silent. So the set is read off
// the filesystem every time this runs, and dynamic segments are expanded from
// the same real data the routes use.
//
// Something still has to say WHICH surfaces a guide may send a reader to, and
// that is a policy, not a discovery - see CTA_SURFACES below. The members of
// each surface are enumerated; the surfaces themselves are a deliberate choice.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
// Namespace import, not named ones: tsx transpiles this .ts module to CJS and
// ESM's static named-export detection over a CJS module is heuristic - it missed
// CONTENT_DIR and killed the gate at load. A namespace import does not depend on
// that detection.
import * as Learn from "../src/lib/cv/learn/articles";

// ...and the namespace object is the CJS interop wrapper, whose real exports sit
// on `.default` ({ default, "module.exports" } is all Object.keys shows). Reach
// through it explicitly rather than destructuring undefineds and discovering it
// three checks later as "Cannot read properties of undefined".
const L = ((Learn as unknown as { default?: typeof Learn }).default ?? Learn) as typeof Learn;
const {
  getAllArticles, getSections, learnUrls, frontmatterSchema, CONTENT_DIR, LEARN_BASE,
} = L;

// WHY THIS IMPORTS THE PACKAGE AND NOT src/lib/roles.ts
// src/lib/roles.ts is a thin adapter over @smnasiruz016-blip/job-roles, which is
// ESM-ONLY. tsx loads .ts files through the CJS resolver, so ANY script that
// reaches roles.ts dies with ERR_PACKAGE_PATH_NOT_EXPORTED before running a
// check - measured, three ways, not assumed. The adapter is 1:1 on slugs
// (`getAllRoles().map(toLegacyRole)`, `slug: r.slug`), so the package is the
// same set the route's generateStaticParams builds from. That equivalence is not
// left to trust: control ADAPTER below re-reads roles.ts and goes red if the
// adapter ever starts filtering or rewriting slugs.
import { getAllRoles } from "@smnasiruz016-blip/job-roles";
const ROLE_SLUGS: string[] = getAllRoles().map((r: { slug: string }) => r.slug);

let pass = 0, fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? ` - ${detail}` : ""}`); }
}

const SELF_TEST = process.argv.includes("--self-test");
// .mts, not .ts: src/lib/roles.ts pulls in @smnasiruz016-blip/job-roles, which is
// ESM-only ("type": "module", import-only exports). Loaded as CJS this file died
// with ERR_PACKAGE_PATH_NOT_EXPORTED before running a single check. Same reason
// scripts/smoke-test-roles.mjs is .mjs.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(ROOT, "src", "app");

// -- route tree ---------------------------------------------------------------
/** Every route that has a page, as its URL segments. Route groups like "(app)"
 *  and "(editor)" are URL-invisible and contribute no segment. */
function collectRoutes(dir: string, segs: string[] = [], out: string[][] = []): string[][] {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (!statSync(abs).isDirectory()) {
      if (name === "page.tsx" || name === "page.ts") out.push([...segs]);
      continue;
    }
    if (name.startsWith("_") || name === "api") continue;
    const next = name.startsWith("(") && name.endsWith(")") ? segs : [...segs, name];
    collectRoutes(abs, next, out);
  }
  return out;
}
const allRoutes = existsSync(APP) ? collectRoutes(APP) : [];
const routePaths = allRoutes.map((r) => `/${r.join("/")}`);

/** THE CTA SURFACE POLICY.
 *
 *  A guide exists to move a reader into the product, so a CTA may point at the
 *  builder entry or the templates surface and nowhere else. Not the account
 *  area, not admin, not an editor URL that needs a CV id that does not exist
 *  until the reader has made one.
 *
 *  These are PREFIXES, not targets. Which concrete pages live under them is
 *  discovered from the filesystem below. */
const CTA_SURFACES: readonly string[] = ["/templates", "/cv/new"];

/** REFUSED OUTRIGHT, whatever the surface rule would otherwise say.
 *
 *  /resume-score is a login door sitting on 14,848 indexed pages. The decision
 *  not to send readers there stands from 16 Aug, so it is written into the gate
 *  rather than left to whoever writes guide 40 to remember. */
const CTA_DENY: readonly string[] = ["/resume-score"];

/** THE ENUMERATED CTA TARGET SET.
 *
 *  Static routes under a CTA surface are taken as they are. Dynamic ones are
 *  expanded from the SAME data the route's generateStaticParams uses, because
 *  shape alone cannot see a wrong param: /templates/role/nurse-typo matches the
 *  [roleSlug] pattern and 404s at runtime (dynamicParams is false there). */
function enumerateCtaTargets(): string[] {
  const out = new Set<string>();
  for (const segs of allRoutes) {
    const path = `/${segs.join("/")}`;
    if (!CTA_SURFACES.some((s) => path === s || path.startsWith(`${s}/`))) continue;
    if (segs.some((x) => x.startsWith("["))) {
      // The one dynamic CTA surface today. Expand it from real role data.
      if (path === "/templates/role/[roleSlug]") {
        for (const slug of ROLE_SLUGS) out.add(`/templates/role/${slug}`);
      }
      // Any OTHER dynamic route that appears under a CTA surface is skipped on
      // purpose and reported, so a new one cannot be quietly half-supported.
      continue;
    }
    out.add(path);
  }
  return [...out].sort();
}
const CTA_TARGETS = enumerateCtaTargets();
const CTA_TARGET_SET = new Set(CTA_TARGETS);

/** Dynamic CTA-surface routes this gate does not know how to expand. */
const UNEXPANDED = allRoutes
  .map((segs) => `/${segs.join("/")}`)
  .filter((p) => CTA_SURFACES.some((s) => p === s || p.startsWith(`${s}/`)))
  .filter((p) => p.includes("[") && p !== "/templates/role/[roleSlug]");

function isAllowedCta(href: string): boolean {
  if (CTA_DENY.includes(href)) return false;
  return CTA_TARGET_SET.has(href);
}

/** Servable at all - used for the hub, which is not a CTA surface. */
function servable(path: string): boolean {
  const parts = path.split("/").filter(Boolean);
  return allRoutes.some((r) => r.length === parts.length && r.every((seg, i) => seg === parts[i]));
}

const staticTargets = CTA_TARGETS.filter((t) => !t.startsWith("/templates/role/"));
const roleTargets = CTA_TARGETS.filter((t) => t.startsWith("/templates/role/"));

console.log("ENUMERATED CTA TARGETS");
console.log(`  surfaces (policy): ${CTA_SURFACES.join(", ")}`);
console.log(`  refused outright : ${CTA_DENY.join(", ")}`);
console.log(`  static pages discovered under those surfaces (${staticTargets.length}):`);
for (const t of staticTargets) console.log(`     ${t}`);
console.log(`  /templates/role/<slug> expanded from the shared roles registry: ${roleTargets.length}`);
console.log(`     e.g. ${roleTargets.slice(0, 3).join(", ")}${roleTargets.length > 3 ? ", ..." : ""}`);
console.log(`  TOTAL allowed CTA targets: ${CTA_TARGETS.length}`);
if (UNEXPANDED.length) console.log(`  ⚠ dynamic CTA-surface routes NOT expanded: ${UNEXPANDED.join(", ")}`);

console.log("\nCONTROLS");
check("the route scan found routes at all", allRoutes.length > 0, `${allRoutes.length}`);
check("the CTA enumeration found targets at all", CTA_TARGETS.length > 0,
  `${CTA_TARGETS.length} - a zero here is a broken scan, not a product with no builder`);
check("the templates hub IS an allowed CTA target", isAllowedCta("/templates"));
check("the builder entry IS an allowed CTA target", isAllowedCta("/cv/new"));
check("a real role hub IS an allowed CTA target", isAllowedCta(`/templates/role/${ROLE_SLUGS[0]}`),
  ROLE_SLUGS[0]);
check("a TYPOd role hub is NOT allowed (shape alone would pass it)",
  !isAllowedCta("/templates/role/definitely-not-a-role-xyz"));
check("/resume-score is REFUSED (login door on 14,848 indexed pages, decision of 16 Aug)",
  !isAllowedCta("/resume-score"));
check("/resume-score really exists as a route - so the refusal is a POLICY, not a typo",
  routePaths.includes("/resume-score"),
  "if this goes red the deny entry is stale and proves nothing");
check("an off-surface real route is NOT allowed (/pricing)", !isAllowedCta("/pricing"));
check("an editor URL needing a CV id is NOT allowed", !isAllowedCta("/cv/some-id/edit"));
check("every enumerated STATIC target has a real page file on disk",
  staticTargets.every((t) => routePaths.includes(t)),
  "the enumeration invented a route - it is no longer reading the filesystem");
check("frontmatter schema REJECTS a missing cta",
  !frontmatterSchema.safeParse({ title: "t", description: "d", section: "s", order: 1 }).success);
check("frontmatter schema REJECTS an unrecognised key (strict, so a typo cannot pass silently)",
  !frontmatterSchema.safeParse({
    title: "t", description: "d", section: "s", order: 1,
    cta: { label: "l", href: "/templates" }, ctas: "typo",
  }).success);
check("frontmatter schema ACCEPTS a complete minimal article",
  frontmatterSchema.safeParse({
    title: "t", description: "d", section: "s", order: 1,
    cta: { label: "l", href: "/templates" },
  }).success);
// Controls for the two derived detectors. Each proves the detector FIRES on a
// synthetic defect, so a clean run means "looked and found nothing" rather than
// "did not look".
check("order detector FIRES on a duplicate within a section",
  [...new Map([[1, ["a", "b"]], [2, ["c"]]])].filter(([, v]) => v.length > 1).length === 1);
check("order detector is SILENT when every order is distinct",
  [...new Map([[1, ["a"]], [2, ["b"]]])].filter(([, v]) => v.length > 1).length === 0);
check("dangling-slug detector FIRES on a slug with no file", !new Set(["real-one"]).has("not-a-file"));
check("dangling-slug detector is SILENT on a slug that exists", new Set(["real-one"]).has("real-one"));

// The loader THROWS on invalid frontmatter, which is right for the build but
// would stack-trace out of this gate before it names anything. Catch it so the
// offending file is reported as a normal FAIL line. Same reason getSections(),
// learnUrls() and the sitemap builder are all called through safe() below: each
// re-enters the loader.
function safe<T>(f: () => T, fallback: T): T {
  try { return f(); } catch { return fallback; }
}
let articles: ReturnType<typeof getAllArticles> = [];
let loadError: string | null = null;
try { articles = getAllArticles(); }
catch (e) { loadError = e instanceof Error ? e.message : String(e); }
check("content/learn loaded without throwing", loadError === null, loadError ?? "");

// -- A. EVERY ARTICLE'S FRONTMATTER IS COMPLETE -------------------------------
console.log("\nA. FRONTMATTER COMPLETE AND TYPED");
const files = existsSync(CONTENT_DIR)
  ? readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md")).sort()
  : [];
check(`there are guides to check - ${files.length}`, files.length > 0,
  "a zero here is a broken loader or an empty content/learn, not a clean surface");
check("every .md file parsed into an article", articles.length === files.length,
  `${articles.length} parsed / ${files.length} files`);
for (const f of files) {
  const { data } = matter(readFileSync(join(CONTENT_DIR, f), "utf8"));
  const r = frontmatterSchema.safeParse(data);
  check(`${f} declares complete frontmatter`, r.success,
    r.success ? "" : r.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`).join("; "));
}

// -- B. TITLES AND DESCRIPTIONS ARE UNIQUE ------------------------------------
console.log("\nB. UNIQUE TITLE AND DESCRIPTION ACROSS ALL GUIDES");
function dupes(values: string[]): string[] {
  const seen = new Set<string>(), bad = new Set<string>();
  for (const v of values) { if (seen.has(v)) bad.add(v); seen.add(v); }
  return [...bad];
}
// --self-test forces every title identical so the uniqueness check must go RED.
// It needs at least two articles to have anything to collide; with one it can
// only report that it could not run, never a false green.
const titleDupes = dupes(articles.map((a) => (SELF_TEST ? "SAME TITLE" : a.title)));
check("no two guides share a title", titleDupes.length === 0, titleDupes.join(" | "));
check("no two guides share a description", dupes(articles.map((a) => a.description)).length === 0);
check("no two guides share a slug", dupes(articles.map((a) => a.slug)).length === 0);

// -- C. EVERY CTA POINTS AT AN ENUMERATED TARGET ------------------------------
console.log("\nC. EVERY CTA HREF IS ONE OF THE ENUMERATED CTA TARGETS");
for (const a of articles) {
  check(`${a.slug}: cta -> ${a.cta.href}`, isAllowedCta(a.cta.href),
    CTA_DENY.includes(a.cta.href)
      ? "REFUSED surface - see CTA_DENY and the 16 Aug decision"
      : `not among the ${CTA_TARGETS.length} targets enumerated from ${CTA_SURFACES.join(" + ")}`);
}

// -- D. NOTHING IS ORPHANED ---------------------------------------------------
console.log("\nD. NOTHING IS ORPHANED (the AlmiOET lesson)");
check(`the hub ${LEARN_BASE} is itself servable`, servable(LEARN_BASE),
  "if the hub 404s, every guide behind it is invisible - this is exactly how AlmiOET lost 144,266 pages");
const hubListed = new Set(
  safe(() => getSections(), [] as ReturnType<typeof getSections>).flatMap((s) => s.articles.map((x) => x.slug)),
);
for (const a of articles) check(`${a.slug} appears on the hub`, hubListed.has(a.slug));

// THE SITEMAP CHECK IS STRUCTURAL HERE, AND THAT IS A LIMITATION, NOT A CHOICE.
//
// The other two ports of this gate CALL the sitemap builder and assert every
// article path comes back. src/lib/cv-sitemap-urls.ts imports @/lib/roles, which
// reaches the ESM-only package tsx cannot load (see the import block above), so
// calling it here is impossible without restructuring a file this PR has no
// business restructuring. What is checked instead is the WIRING: that the
// builder reads learnUrls() and pushes every element it returns. The URLs
// themselves are proved by curling the built /sitemap/0.xml, which is evidence
// in the PR rather than in this gate - say so, do not let it read as proved here.
const sitemapSrc = readFileSync(join(ROOT, "src", "lib", "cv-sitemap-urls.ts"), "utf8");
function wiresLearnUrls(src: string): boolean {
  // No \b here on purpose. An earlier revision of this file was written
  // through a shell heredoc that halved the escape, so the word boundary
  // reached disk as a literal BACKSPACE and the pattern matched nothing --
  // the exact failure mode the CONTROLS below exist to catch.
  const importsIt = /import\s*\{[^}]*learnUrls[^}]*\}\s*from\s*["\x27][^"\x27]*learn\/articles["\x27]/.test(src);
  const iteratesIt = /for\s*\(\s*const\s+\w+\s+of\s+learnUrls\(\)\s*\)/.test(src);
  return importsIt && iteratesIt;
}
const WIRED_FIXTURE = [
  "import { learnUrls } from \"@/lib/cv/learn/articles\";",
  "for (const path of learnUrls()) out.push({ url: path });",
].join("\n");
const IMPORT_ONLY_FIXTURE = WIRED_FIXTURE.split("\n")[0];
check("CONTROL: the wiring detector is SILENT on a correctly wired sitemap",
  wiresLearnUrls(WIRED_FIXTURE),
  "the detector matches nothing at all -- a mangled pattern would look like this");
check("CONTROL: the wiring detector FIRES on a sitemap that never mentions learnUrls",
  !wiresLearnUrls("export function buildAllCvUrls() { return []; }"));
check("CONTROL: the wiring detector FIRES on an import with no loop",
  !wiresLearnUrls(IMPORT_ONLY_FIXTURE));
check("the sitemap builder imports learnUrls() and iterates it", wiresLearnUrls(sitemapSrc),
  "the /learn URLs are not wired into src/lib/cv-sitemap-urls.ts");
check("the sitemap gives the /learn entries a CONSTANT lastModified",
  /LEARN_LAST_MODIFIED/.test(sitemapSrc) && /lastModified:\s*LEARN_LAST_MODIFIED/.test(sitemapSrc),
  "a wall-clock lastModified tells Google the page changed when it did not");
const learnUrlCount = safe(() => learnUrls().length, -1);
check("learnUrls() and the article set agree",
  learnUrlCount === articles.length + 1,
  `${learnUrlCount} urls vs ${articles.length} articles + 1 hub (-1 = the loader threw)`);

// -- E. RELATED LINKS ---------------------------------------------------------
// A related entry may name a guide not yet written - normal while a set is being
// authored. But a slug that is PRESENT must resolve, or it is a typo that
// silently renders as plain text forever.
console.log("\nE. RELATED SLUGS, WHERE DECLARED, RESOLVE");
const known = new Set(articles.map((a) => a.slug));
let checkedSlugs = 0, unlinked = 0;
for (const a of articles) {
  for (const r of a.related) {
    if (!r.slug) { unlinked++; continue; }
    checkedSlugs++;
    check(`${a.slug} -> ${r.slug}`, known.has(r.slug),
      `no content/learn/${r.slug}.md - the link would silently render as plain text forever`);
  }
}
// Reported, not checked, while the set is a scaffold with no cross-links yet:
// asserting checkedSlugs > 0 would be red for a state that is correct. The
// anti-vacuous guarantee is carried by the two dangling-slug CONTROLS above.
// Promote this to a hard check once real cross-links are authored.
console.log(`     ${checkedSlugs} related slugs checked, ${unlinked} label-only entries (no slug yet)`);

// -- F. ORDER IS UNIQUE WITHIN EACH SECTION -----------------------------------
// order decides the hub's running order inside a section. Two guides sharing a
// number break nothing at build time - the hub falls back to the slug tiebreak
// and quietly renders them in an order nobody chose. Duplicates ACROSS sections
// are fine: "CV basics" 1 and "By country" 1 are different lists.
console.log("\nF. ORDER IS UNIQUE WITHIN EACH SECTION");
const bySection = new Map<string, Map<number, string[]>>();
for (const a of articles) {
  if (!bySection.has(a.section)) bySection.set(a.section, new Map());
  const m = bySection.get(a.section)!;
  if (!m.has(a.order)) m.set(a.order, []);
  m.get(a.order)!.push(a.slug);
}
check("there are sections to check at all", bySection.size > 0);
for (const [section, orders] of [...bySection].sort()) {
  const clashes = [...orders].filter(([, slugs]) => slugs.length > 1);
  const n = articles.filter((a) => a.section === section).length;
  const list = [...orders.keys()].sort((x, y) => x - y).join(", ");
  check(`${section}: ${orders.size} distinct orders across ${n} guides  [${list}]`,
    clashes.length === 0,
    clashes.map(([o, slugs]) => `order ${o} used by ${slugs.join(" and ")}`).join("; "));
}

// -- verdict ------------------------------------------------------------------
console.log(`\n${fail === 0 ? "PASS" : "FAIL"} - ${pass} passed, ${fail} failed`);
if (SELF_TEST) {
  if (articles.length < 2) {
    console.log(`SELF-TEST COULD NOT RUN - the title collision needs >=2 guides, found ${articles.length}. ` +
      "Prove the gate red by planting a bad frontmatter file instead.");
    process.exit(1);
  }
  console.log(fail > 0
    ? "SELF-TEST OK - with every title forced identical the uniqueness check went RED as it must."
    : "SELF-TEST BROKEN - titles were forced identical and nothing failed.");
  process.exit(fail > 0 ? 0 : 1);
}
process.exit(fail === 0 ? 0 : 1);
