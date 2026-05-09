import { notFound } from "next/navigation";
import { RecipePreviewClient } from "./RecipePreviewClient";

/**
 * Internal eyeball-review route for recipe-driven templates.
 *
 * Renders every entry in RECIPE_LIST against every persona in
 * PERSONAS, with a printSafe toggle so we can eyeball how the
 * Chromium print pipeline will treat blends, gradients, and
 * decorators before merging.
 *
 * Non-prod only — `VERCEL_ENV === "production"` returns 404 so this
 * surface never leaks to real users. Same gate as
 * /internal/primitive-preview.
 */
export const dynamic = "force-static";

export default function RecipePreviewPage() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return <RecipePreviewClient />;
}
