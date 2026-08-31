// GATE — THE TEMPLATE REGISTRY MUST NEVER SHRINK.
//
//   npx tsx scripts/verify-template-registry.ts
//   npx tsx scripts/verify-template-registry.ts --sabotage
//
// Offline. No database, no network, no key.
//
// -- WHY ----------------------------------------------------------------------
// src/components/templates/template-registry.ts has now been overwritten with a
// near-empty stub THREE times, each time by a tool that rewrote the whole file
// instead of appending to it:
//
//   15 Aug          168 KB -> 14 KB   recovered in the next commit
//   30 Aug 19:31    192 KB -> 13 KB   recovered at 19:44 (0546f59)
//   30 Aug 20:03    192 KB -> 18 KB   NOT recovered; drifted down to 14 KB by
//                                     575191a and reached main that way
//
// Nothing failed on any of those three occasions. No component file was ever
// deleted -- every module the big registry imports still exists on disk -- so
// the type-checker stayed green while 221 of 243 templates silently stopped
// being offered to users. A shrinking registry is invisible to every check the
// repo had, because a smaller correct-looking array is still correct TypeScript.
//
// -- THE RULE -----------------------------------------------------------------
// The entry count may go UP. It may never go DOWN past the high-water mark.
//
// -- WHY THE NUMBER IS A LITERAL ----------------------------------------------
// HIGH_WATER_MARK below is typed out by hand. It is NEVER read from the registry
// this gate is checking, nor from a generated snapshot, nor from git. A verifier
// that takes its expectation from its own subject proves only that the subject
// agrees with itself -- which is exactly as true of the 244-entry file as it is
// of the 22-entry stub that replaced it. The literal is the only part of this
// gate that a whole-file overwrite cannot rewrite in the same edit.
//
// When templates are legitimately ADDED, raise this number in the same commit.
// That edit is the point: it forces a human to state the new floor out loud.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// ---------------------------------------------------------------------------
// THE PINNED FLOOR. Hand-written. Do not derive, do not generate, do not import.
// 243 entries survived in 0546f59 (the last good registry), + 1 for
// cyber-nurse-futuristic, created at 609ce66 after that snapshot = 244.
// 31 Aug: +1 noir-blanc-communication = 245, +1 noir-blanc-minimal = 246, +1 chef-marco-board = 247, +1 chef-marco-thematic = 248.
// ---------------------------------------------------------------------------
const HIGH_WATER_MARK = 248;

const HERE = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(HERE, "..", "src", "components", "templates");
const REGISTRY = join(TEMPLATES_DIR, "template-registry.ts");

const SABOTAGE = process.argv.includes("--sabotage");

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) {
    pass++;
    console.log(`  ok   ${name}`);
  } else {
    fail++;
    console.log(`  FAIL ${name}${detail ? ` - ${detail}` : ""}`);
  }
}

/**
 * Count TEMPLATES entries by PARSING, not by grepping.
 *
 * A grep for "slug:" also matches the `slug: string;` field on the TemplateMeta
 * interface, and would report 245 where there are 244. It would also count a
 * slug nested inside another object, or one sitting in a comment. The AST
 * cannot make either mistake: it walks to the single `export const TEMPLATES`
 * declaration and counts the object literals that are direct elements of its
 * array initialiser.
 */
export function readRegistry(source: string): { count: number; slugs: string[] } {
  const sf = ts.createSourceFile("template-registry.ts", source, ts.ScriptTarget.Latest, true);
  let arr: ts.ArrayLiteralExpression | undefined;

  const visit = (node: ts.Node): void => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "TEMPLATES" &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      if (arr) throw new Error("more than one TEMPLATES array declaration");
      arr = node.initializer;
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (!arr) throw new Error("no `const TEMPLATES = [...]` array literal found");

  const objects = arr.elements.filter(ts.isObjectLiteralExpression);
  if (objects.length !== arr.elements.length) {
    throw new Error(
      `TEMPLATES holds ${arr.elements.length - objects.length} non-object element(s); cannot count reliably`,
    );
  }

  const slugs: string[] = [];
  for (const o of objects) {
    for (const p of o.properties) {
      if (
        ts.isPropertyAssignment(p) &&
        ts.isIdentifier(p.name) &&
        p.name.text === "slug" &&
        ts.isStringLiteral(p.initializer)
      ) {
        slugs.push(p.initializer.text);
      }
    }
  }
  return { count: objects.length, slugs };
}

/** Every `from "./X"` in the registry must resolve to a file that exists. */
export function unresolvedImports(source: string): string[] {
  const missing: string[] = [];
  for (const m of source.matchAll(/from\s+"(\.\/[^"]+)"/g)) {
    const spec = m[1];
    const base = join(TEMPLATES_DIR, spec);
    const found =
      [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"].some((ext) => existsSync(base + ext)) ||
      existsSync(base);
    if (!found) missing.push(spec);
  }
  return [...new Set(missing)];
}

/**
 * The whole rule, in one place. Both the real run and --sabotage call THIS --
 * there is no second inlined copy, so the sabotage pass cannot go red against
 * logic the real run does not actually use.
 */
function runChecks(source: string, label: string): void {
  console.log(`\n${label}`);
  const { count, slugs } = readRegistry(source);
  console.log(`  measured: ${count} entries, ${new Set(slugs).size} distinct slugs (floor ${HIGH_WATER_MARK})`);

  check(
    `entry count >= ${HIGH_WATER_MARK}`,
    count >= HIGH_WATER_MARK,
    `registry holds ${count}; ${HIGH_WATER_MARK - count} template(s) have been dropped`,
  );
  check("every entry carries a slug", slugs.length === count, `${count - slugs.length} entr(ies) without a slug`);
  check(
    "slugs are unique",
    new Set(slugs).size === slugs.length,
    [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))].join(", "),
  );

  const missing = unresolvedImports(source);
  check("every relative import resolves", missing.length === 0, missing.join(", "));
}

const source = readFileSync(REGISTRY, "utf8");

/**
 * --sabotage removes 5 entries from the registry TEXT in memory -- nothing on
 * disk is touched, so there is no damaged state to restore and no way for an
 * aborted run to leave the working tree broken -- and asserts the rule above
 * goes RED. A gate nobody has watched fail is not known to be able to fail.
 */
if (SABOTAGE) {
  const { count: before } = readRegistry(source);
  const sf = ts.createSourceFile("r.ts", source, ts.ScriptTarget.Latest, true);
  let arr: ts.ArrayLiteralExpression | undefined;
  const find = (n: ts.Node): void => {
    if (
      ts.isVariableDeclaration(n) &&
      ts.isIdentifier(n.name) &&
      n.name.text === "TEMPLATES" &&
      n.initializer &&
      ts.isArrayLiteralExpression(n.initializer)
    ) {
      arr = n.initializer;
    }
    ts.forEachChild(n, find);
  };
  find(sf);
  const victims = arr!.elements.slice(0, 5);
  const cutFrom = victims[0].getStart(sf);
  const cutTo = victims[4].getEnd() + 1; // + the trailing comma
  const damaged = source.slice(0, cutFrom) + source.slice(cutTo);

  const { count: after } = readRegistry(damaged);
  console.log(`\n[--sabotage] removed 5 entries from the parsed text: ${before} -> ${after}. Disk untouched.`);

  runChecks(damaged, "-- SABOTAGED REGISTRY (this MUST go red) --");

  if (fail === 0) {
    console.error("\nSELF-TEST FAILED: 5 entries were deleted and the gate stayed green. The gate is blind.");
    process.exit(1);
  }
  console.log(`\nSELF-TEST PASSED: the gate reported ${fail} failure(s) against a registry missing 5 entries.`);
  process.exit(0);
}

runChecks(source, "-- TEMPLATE REGISTRY --");

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.error(
    "\nThe template registry has shrunk below its recorded high-water mark.\n" +
      "This has happened three times before, always by a whole-file rewrite.\n" +
      "Do NOT lower HIGH_WATER_MARK to make this pass. Restore the dropped entries:\n" +
      "  git log --oneline -- src/components/templates/template-registry.ts\n" +
      "  git checkout <last-good> -- src/components/templates/template-registry.ts\n",
  );
  process.exit(1);
}
