// RR-400 · the home page's "ATS-friendly resume templates" showcase, as data.
//
//   npx tsx scripts/gen-template-showcase.mts           (write)
//   npx tsx scripts/gen-template-showcase.mts --check   (exit 1 if the file is stale)
//
// Offline. No database, no network, no key. Runs in prebuild, so every build
// regenerates it from the registry.
//
// WHY: the home page (a server component) imported TEMPLATES from
// template-registry.ts only to pick the 12 newest slugs and names. That file
// imports every template component, and every template is a "use client"
// module, so ~240 templates became client references of the home page and
// their whole bundle (~1.5 MB raw) loaded and ran on every visit, ahead of the
// hero (mobile LCP 10 s). The registry is read here as TypeScript SOURCE (the
// same way verify-template-registry.ts reads it) and only {slug, name} of the
// 12 newest go to src/components/templates/showcase.generated.json.
//
// "Newest" is exactly getAddedAt(): addedAt when set, else V1_BASE + index
// minutes; sorted newest first with JavaScript's stable sort, as the page did.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = join(ROOT, "src", "components", "templates", "template-registry.ts");
const OUT = join(ROOT, "src", "components", "templates", "showcase.generated.json");
const COUNT = 12;

const src = ts.createSourceFile(REGISTRY, readFileSync(REGISTRY, "utf8"), ts.ScriptTarget.Latest, true);
let base: number | null = null;
let entries: ts.ObjectLiteralExpression[] | null = null;
src.forEachChild(function visit(node: ts.Node): void {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
    if (node.name.text === "V1_BASE_MS" && node.initializer && ts.isCallExpression(node.initializer)) {
      const arg = node.initializer.arguments[0];
      if (arg && ts.isStringLiteral(arg)) base = Date.parse(arg.text);
    }
    if (node.name.text === "TEMPLATES" && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      entries = node.initializer.elements.filter(ts.isObjectLiteralExpression);
    }
  }
  node.forEachChild(visit);
});
if (base === null || !entries) throw new Error("template-registry.ts: V1_BASE_MS or the TEMPLATES array literal was not found");

const str = (o: ts.ObjectLiteralExpression, key: string): string | undefined => {
  for (const p of o.properties) {
    if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === key) {
      if (ts.isStringLiteralLike(p.initializer)) return p.initializer.text;
      throw new Error(`template-registry.ts: "${key}" is not a string literal`);
    }
  }
  return undefined;
};
const all = (entries as ts.ObjectLiteralExpression[]).map((o, i) => {
  const slug = str(o, "slug"), name = str(o, "name");
  if (!slug || !name) throw new Error(`template-registry.ts: entry ${i} has no slug or name`);
  return { slug, name, addedAt: str(o, "addedAt") ?? new Date((base as number) + i * 60_000).toISOString() };
});
if (all.length < 50) throw new Error(`template-registry.ts has only ${all.length} entries: refusing to write a showcase from a shrunken registry`);
const showcase = [...all].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, COUNT).map(({ slug, name }) => ({ slug, name }));
const text = JSON.stringify(showcase, null, 2) + "\n";

if (process.argv.includes("--check")) {
  const now = existsSync(OUT) ? readFileSync(OUT, "utf8").replace(/\r\n/g, "\n") : "";
  if (now !== text) { console.error(`✗ ${OUT} is stale: run npx tsx scripts/gen-template-showcase.mts`); process.exit(1); }
  console.log(`✓ template showcase up to date (${showcase.length} of ${all.length})`);
} else {
  writeFileSync(OUT, text);
  console.log(`✓ wrote ${showcase.length} of ${all.length} templates to the home showcase`);
}
