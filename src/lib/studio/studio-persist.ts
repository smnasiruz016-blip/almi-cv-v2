// Recipe persistence — Stage 3c.
//
// acceptRecipe() is the single entry point for writing a validated
// TemplateRecipe to the Recipe table. It is intentionally thin:
// - No validation here; callers must pass a TemplateRecipe that has
//   already passed validateRecipe() (Zod).
// - Throws on DB error; callers handle and return structured responses.
// - Upserts on slug so the founder can accept the same generation twice
//   without a duplicate-key crash (idempotent).

import { prisma } from "@/lib/db";
import type { TemplateRecipe } from "@/components/templates/engine/recipe-types";

export type AcceptRecipeResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; reason: string };

export async function acceptRecipe(
  recipe: TemplateRecipe,
  founderEmail: string,
): Promise<AcceptRecipeResult> {
  try {
    const result = await prisma.recipe.upsert({
      where: { slug: recipe.slug },
      create: {
        slug: recipe.slug,
        name: recipe.name,
        description: recipe.description,
        tier: recipe.tier === "free" ? "FREE" : "PREMIUM",
        role: recipe.role ?? null,
        mood: recipe.mood ?? null,
        culturalFit: recipe.cultural_fit ?? [],
        recipeJson: recipe as object,
        previewPersonaId: recipe.preview_persona_id,
        status: "DRAFT",
        createdBy: founderEmail,
      },
      update: {
        name: recipe.name,
        description: recipe.description,
        tier: recipe.tier === "free" ? "FREE" : "PREMIUM",
        role: recipe.role ?? null,
        mood: recipe.mood ?? null,
        culturalFit: recipe.cultural_fit ?? [],
        recipeJson: recipe as object,
        previewPersonaId: recipe.preview_persona_id,
        createdBy: founderEmail,
      },
    });
    return { ok: true, id: result.id, slug: result.slug };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, reason: `Database error: ${message}` };
  }
}
