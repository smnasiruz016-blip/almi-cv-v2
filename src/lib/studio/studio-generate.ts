// Recipe generation pipeline — Stage 3b.
//
// Flow:
//   buildRecipePrompt(role, mood)
//     → callStudio(...)               cost-protected, ledger-logged
//     → extract JSON from response    tolerant of markdown fences
//     → JSON.parse                    syntax check
//     → validateRecipe                Zod schema check
//     → return validated recipe OR structured error reason
//
// The pipeline records cost in the ledger regardless of success or
// validation failure (any API call that returned tokens is a real spend
// and must be tracked).

import { callStudio } from "./anthropic-client";
import { buildRecipePrompt, type RecipeGender } from "./studio-prompts";
import { validateRecipe } from "@/components/templates/engine/recipe-zod-schema";
import type { TemplateRecipe } from "@/components/templates/engine/recipe-types";
import type {
  RecipeRole,
  RecipeMood,
} from "@/components/templates/engine/recipe-types";
import { MODELS, type ModelId } from "@/lib/ai/models";

export type { RecipeGender };

export type GenerateRecipeInput = {
  role: RecipeRole;
  mood: RecipeMood;
  /** Gender aesthetic for the generated design. Defaults to "female". */
  gender?: RecipeGender;
  founderEmail: string;
  /** Defaults to MODELS.HAIKU for cost. Pass MODELS.SONNET for harder
   *  creative cases when Haiku consistently fails Zod validation. */
  model?: ModelId;
};

export type GenerateRecipeResult =
  | {
      ok: true;
      recipe: TemplateRecipe;
      generationId: string;
      model: string;
      inputTokens: number;
      outputTokens: number;
      costUsd: number;
      warning?: string;
    }
  | {
      ok: false;
      reason: string;
      stage: "budget" | "api" | "empty-response" | "json-parse" | "zod-validation";
      generationId: string;
      model: string;
      inputTokens?: number;
      outputTokens?: number;
      costUsd: number;
      validationErrors?: string[];
      rawContent?: string;
    };

const MAX_OUTPUT_TOKENS = 4000;

/** Strip a leading ```json fence and a trailing ``` if Claude emitted
 *  one despite the prompt's instruction. Then narrow to the substring
 *  bounded by the first '{' and the last '}'. */
function extractJsonString(raw: string): string {
  let s = raw.trim();

  // Remove fenced code block wrappers.
  if (s.startsWith("```")) {
    const firstNewline = s.indexOf("\n");
    if (firstNewline !== -1) s = s.slice(firstNewline + 1);
    if (s.endsWith("```")) s = s.slice(0, -3);
    s = s.trim();
  }

  const firstBrace = s.indexOf("{");
  const lastBrace = s.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return s;
  }
  return s.slice(firstBrace, lastBrace + 1);
}

export async function generateRecipe(
  input: GenerateRecipeInput,
): Promise<GenerateRecipeResult> {
  const model: ModelId = input.model ?? MODELS.HAIKU;
  const gender: RecipeGender = input.gender ?? "female";
  const { systemPrompt, userPrompt } = buildRecipePrompt(input.role, input.mood, gender);

  const call = await callStudio({
    model,
    systemPrompt,
    userPrompt,
    maxTokens: MAX_OUTPUT_TOKENS,
    founderEmail: input.founderEmail,
  });

  if (!call.ok) {
    return {
      ok: false,
      reason: call.reason,
      stage: call.stage,
      generationId: call.generationId,
      model,
      inputTokens: call.inputTokens,
      outputTokens: call.outputTokens,
      costUsd: call.costUsd,
    };
  }

  const jsonStr = extractJsonString(call.content);

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      reason: `Generated content was not valid JSON: ${message}`,
      stage: "json-parse",
      generationId: call.generationId,
      model,
      inputTokens: call.inputTokens,
      outputTokens: call.outputTokens,
      costUsd: call.costUsd,
      rawContent: call.content,
    };
  }

  const validation = validateRecipe(parsed);
  if (!validation.ok) {
    return {
      ok: false,
      reason: `Generated recipe failed schema validation (${validation.errors.length} issue${validation.errors.length === 1 ? "" : "s"}).`,
      stage: "zod-validation",
      generationId: call.generationId,
      model,
      inputTokens: call.inputTokens,
      outputTokens: call.outputTokens,
      costUsd: call.costUsd,
      validationErrors: validation.errors,
      rawContent: call.content,
    };
  }

  return {
    ok: true,
    recipe: validation.recipe,
    generationId: call.generationId,
    model,
    inputTokens: call.inputTokens,
    outputTokens: call.outputTokens,
    costUsd: call.costUsd,
    warning: call.warning,
  };
}
