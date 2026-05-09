// One-shot zod-validation check for the live RECIPE_LIST. Used by
// the Phase 5b followup to confirm every recipe passes validation
// after the previewPersonaKey rename. Safe to keep around — it
// imports nothing the build doesn't already pull in.
import { RECIPE_LIST } from "@/lib/recipes";
import { validateRecipe } from "@/components/templates/engine/recipe-zod-schema";

let okCount = 0;
let failCount = 0;
for (const r of RECIPE_LIST) {
  const result = validateRecipe(r);
  if (result.ok) {
    console.log(`PASS ${r.slug} -> ${r.previewPersonaKey}`);
    okCount++;
  } else {
    console.log(`FAIL ${r.slug}`);
    for (const e of result.errors) console.log(`  - ${e}`);
    failCount++;
  }
}
console.log(`TOTAL ok=${okCount} fail=${failCount}`);
process.exit(failCount > 0 ? 1 : 0);
