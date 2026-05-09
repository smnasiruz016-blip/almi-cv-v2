// Stage 3c accept endpoint — founder-only.
//
// POST /api/admin/studio/accept-recipe
//   Body: { recipe: TemplateRecipe }
//   Returns: { ok: true, id, slug } | { ok: false, reason }
//
// Validates the recipe through Zod (same schema as the generation
// pipeline) then writes it to the Recipe table as a DRAFT. The founder
// can promote it to PUBLISHED via the admin dashboard later.
//
// Auth: requireFounder() — 404 for everyone else.

import { NextResponse } from "next/server";
import { requireFounder } from "@/lib/founder";
import { validateRecipe } from "@/components/templates/engine/recipe-zod-schema";
import { acceptRecipe } from "@/lib/studio/studio-persist";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const founder = await requireFounder();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, reason: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || !("recipe" in body)) {
    return NextResponse.json(
      { ok: false, reason: "Request body must be { recipe: TemplateRecipe }." },
      { status: 400 },
    );
  }

  const validation = validateRecipe((body as { recipe: unknown }).recipe);
  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        reason: `Recipe failed schema validation (${validation.errors.length} issue${validation.errors.length === 1 ? "" : "s"}).`,
        validationErrors: validation.errors,
      },
      { status: 422 },
    );
  }

  const result = await acceptRecipe(validation.recipe, founder.email);
  return NextResponse.json(result, { status: 200 });
}
