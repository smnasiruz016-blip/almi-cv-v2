import { createElement, type ComponentType } from "react";
import type { CVData } from "@/lib/cv-types";
import { RecipeRenderer } from "./render-recipe";
import type { TemplateRecipe } from "./recipe-types";

/**
 * Server-safe factory. Returns a Component that points to the
 * RecipeRenderer client component via createElement. Because this
 * file is a regular .ts module (no "use client"), templates.ts can
 * call it during server-side registry construction without crossing
 * a client/server invocation boundary — the resulting element only
 * references the client component, it doesn't execute it.
 *
 * The returned wrapper accepts the same props the registry's
 * Component contract declares ({ data, paginated? }), plus an
 * optional `printSafe` that the print route sets via JSX. Hand-coded
 * templates ignore unknown props; recipe templates honor printSafe.
 */
export function makeRecipeComponent(
  recipe: TemplateRecipe,
): ComponentType<{ data: CVData; paginated?: boolean; printSafe?: boolean }> {
  function RecipeWrapper(props: {
    data: CVData;
    paginated?: boolean;
    printSafe?: boolean;
  }) {
    return createElement(RecipeRenderer, {
      recipe,
      data: props.data,
      paginated: props.paginated,
      printSafe: props.printSafe,
    });
  }
  RecipeWrapper.displayName = `Recipe(${recipe.slug})`;
  return RecipeWrapper;
}
