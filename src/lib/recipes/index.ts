/**
 * Recipe registry — Stage 2 of the template factory.
 *
 * Recipes are TypeScript modules (not DB rows) per the Phase 5a
 * persistence recommendation: full type-checking, atomic deploys,
 * git-versioned, no DB roundtrip per page render. New recipes get added
 * here and imported by src/lib/templates.ts.
 *
 * Versioning rule: bumping a recipe's visuals = new slug
 * (e.g. healthcare-bold-clinical-v2). Old slugs stay frozen so users'
 * saved CVs never silently re-style.
 */
import type { TemplateRecipe } from "@/components/templates/engine/recipe-types";
import { healthcareBoldClinicalV1 } from "./healthcare/bold-clinical-v1";
import { healthcareBoldIcuNurseV1 } from "./healthcare/bold-icu-nurse-v1";

export const RECIPES = {
  [healthcareBoldClinicalV1.slug]: healthcareBoldClinicalV1,
  [healthcareBoldIcuNurseV1.slug]: healthcareBoldIcuNurseV1,
} as const satisfies Record<string, TemplateRecipe>;

export const RECIPE_LIST: TemplateRecipe[] = Object.values(RECIPES);

export function getRecipe(slug: string): TemplateRecipe | undefined {
  return (RECIPES as Record<string, TemplateRecipe>)[slug];
}

export { healthcareBoldClinicalV1 } from "./healthcare/bold-clinical-v1";
export { healthcareBoldIcuNurseV1 } from "./healthcare/bold-icu-nurse-v1";
