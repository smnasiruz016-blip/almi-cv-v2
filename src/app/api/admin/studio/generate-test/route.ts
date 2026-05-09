// Stage 3b end-to-end test endpoint — founder-only.
//
// POST /api/admin/studio/generate-test
//   Body: { role: RecipeRole, mood: RecipeMood, gender?: "female"|"male", model?: ModelId }
//   Returns: { ok: true, recipe, costUsd, ... } | { ok: false, reason, ... }
//
// This endpoint exists for one purpose: prove the Anthropic generation
// pipeline works end-to-end on production with cost protection in place.
// It does NOT persist generated recipes — Stage 3c adds the variant
// picker UI and the accept-and-save flow that writes to the Recipe
// table.
//
// Auth: requireFounder() — anonymous, free, and non-owner Pro users get
// a 404 indistinguishable from "this route doesn't exist".

import { NextResponse } from "next/server";
import { requireFounder } from "@/lib/founder";
import { generateRecipe, type RecipeGender } from "@/lib/studio/studio-generate";
import type {
  RecipeRole,
  RecipeMood,
} from "@/components/templates/engine/recipe-types";
import { MODELS, type ModelId } from "@/lib/ai/models";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Recipe generation can take 10–30s on Sonnet, ~5–15s on Haiku. Keep
// well clear of platform timeouts.
export const maxDuration = 60;

const VALID_ROLES: RecipeRole[] = [
  "healthcare",
  "trades",
  "customer-service-bpo",
  "hospitality-chef",
  "tech",
];
const VALID_MOODS: RecipeMood[] = ["bold", "modern", "refined"];
const VALID_GENDERS: RecipeGender[] = ["female", "male"];
const VALID_MODELS = new Set<ModelId>([
  MODELS.HAIKU,
  MODELS.SONNET,
  MODELS.OPUS,
]);

function isRecipeRole(v: unknown): v is RecipeRole {
  return typeof v === "string" && (VALID_ROLES as string[]).includes(v);
}

function isRecipeMood(v: unknown): v is RecipeMood {
  return typeof v === "string" && (VALID_MOODS as string[]).includes(v);
}

function isRecipeGender(v: unknown): v is RecipeGender {
  return typeof v === "string" && (VALID_GENDERS as string[]).includes(v);
}

function isModelId(v: unknown): v is ModelId {
  return typeof v === "string" && VALID_MODELS.has(v as ModelId);
}

export async function POST(req: Request) {
  // 404 for non-founders. notFound() throws inside requireFounder().
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

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, reason: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  const { role, mood, gender, model } = body as {
    role?: unknown;
    mood?: unknown;
    gender?: unknown;
    model?: unknown;
  };

  if (!isRecipeRole(role)) {
    return NextResponse.json(
      {
        ok: false,
        reason: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}.`,
      },
      { status: 400 },
    );
  }
  if (!isRecipeMood(mood)) {
    return NextResponse.json(
      {
        ok: false,
        reason: `Invalid mood. Must be one of: ${VALID_MOODS.join(", ")}.`,
      },
      { status: 400 },
    );
  }
  if (gender !== undefined && !isRecipeGender(gender)) {
    return NextResponse.json(
      {
        ok: false,
        reason: `Invalid gender. Must be "female" or "male".`,
      },
      { status: 400 },
    );
  }
  if (model !== undefined && !isModelId(model)) {
    return NextResponse.json(
      {
        ok: false,
        reason: `Invalid model. Must be one of: ${[...VALID_MODELS].join(", ")}.`,
      },
      { status: 400 },
    );
  }

  const result = await generateRecipe({
    role,
    mood,
    gender,
    founderEmail: founder.email,
    model,
  });

  // Always 200 — the result envelope ({ ok: true | false }) carries
  // success / failure detail. Saves the client from having to parse
  // both status code AND body to understand the outcome.
  return NextResponse.json(result, { status: 200 });
}
