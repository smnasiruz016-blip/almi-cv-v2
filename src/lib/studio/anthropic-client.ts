// Anthropic client wrapper for the Template Studio — Stage 3b.
//
// Cost-protected entry point for ALL Studio API calls. The contract:
//
//   1. Estimate cost up front (conservative).
//   2. Call canGenerate(estimate). Bail with the budget reason if blocked.
//   3. Make the Anthropic call.
//   4. Always recordGeneration() in the ledger — success OR failure.
//
// No Studio code may call the Anthropic SDK directly. Every API spend
// must flow through callStudio() so the budget gate and ledger stay
// canonical. If you find yourself reaching for `new Anthropic()`
// elsewhere in the Studio, stop and add the case here instead.

import { randomUUID } from "crypto";
import {
  canGenerate,
  computeCostUsd,
  recordGeneration,
} from "@/lib/studio-cost";
import { MODELS, type ModelId } from "@/lib/ai/models";
import { getAnthropicClient } from "@/lib/ai/anthropic-client";

export type StudioCallInput = {
  model: ModelId;
  systemPrompt: string;
  userPrompt: string;
  maxTokens: number;
  /** Email of the founder running the call — written to the ledger. */
  founderEmail: string;
  /** Optional override of the conservative cost estimate. Defaults to a
   *  3x-overestimate of the most likely cost so the budget gate stays
   *  protective if the model produces an unexpectedly long response. */
  estimateUsdOverride?: number;
};

export type StudioCallResult =
  | {
      ok: true;
      content: string;
      generationId: string;
      inputTokens: number;
      outputTokens: number;
      costUsd: number;
      warning?: string;
    }
  | {
      ok: false;
      reason: string;
      generationId: string;
      stage: "budget" | "api" | "empty-response";
      costUsd: number;
      inputTokens?: number;
      outputTokens?: number;
    };

/** Rough token estimator — 1 token ≈ 4 chars of English text. Used only
 *  for the pre-flight budget gate, never for billing. */
function estimateInputTokens(systemPrompt: string, userPrompt: string): number {
  return Math.ceil((systemPrompt.length + userPrompt.length) / 4);
}

/** Pre-flight cost estimate, conservatively scaled. Real billing uses
 *  the exact token counts from the API response via computeCostUsd(). */
function estimateCostUsd(
  model: string,
  inputTokenEstimate: number,
  maxTokens: number,
): number {
  // Assume the model uses the full max_tokens output budget — this is
  // the worst case for cost, which is what the gate should plan for.
  const baseline = computeCostUsd(model, inputTokenEstimate, maxTokens);
  // 1.5x cushion for tokenizer differences and any input-token surprise.
  return baseline * 1.5;
}

export async function callStudio(
  input: StudioCallInput,
): Promise<StudioCallResult> {
  const generationId = randomUUID();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.length < 20) {
    // No API call yet, no cost. Record nothing — there was no spend.
    return {
      ok: false,
      reason: "ANTHROPIC_API_KEY is missing or invalid in environment",
      generationId,
      stage: "api",
      costUsd: 0,
    };
  }

  const inputTokenEstimate = estimateInputTokens(
    input.systemPrompt,
    input.userPrompt,
  );
  const estimateUsd =
    input.estimateUsdOverride ??
    estimateCostUsd(input.model, inputTokenEstimate, input.maxTokens);

  const gate = await canGenerate(estimateUsd);
  if (!gate.allowed) {
    // Budget blocked — no API call made. Don't write to ledger; the
    // ledger is for actual API spend, not refused calls.
    return {
      ok: false,
      reason: gate.reason ?? "Monthly budget would be exceeded.",
      generationId,
      stage: "budget",
      costUsd: 0,
    };
  }

  const client = getAnthropicClient();

  try {
    const message = await client.messages.create({
      model: input.model,
      max_tokens: input.maxTokens,
      system: input.systemPrompt,
      messages: [{ role: "user", content: input.userPrompt }],
    });

    const inputTokens = message.usage.input_tokens;
    const outputTokens = message.usage.output_tokens;
    const costUsd = computeCostUsd(input.model, inputTokens, outputTokens);

    const firstBlock = message.content[0];
    const text =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";

    if (!text) {
      await recordGeneration({
        generationId,
        model: input.model,
        inputTokens,
        outputTokens,
        founderEmail: input.founderEmail,
        success: false,
        errorMessage: `Empty response — stop_reason=${message.stop_reason ?? "unknown"}`,
        generationType: "studio_recipe",
      });
      return {
        ok: false,
        reason: `Empty response from Claude (stop_reason=${message.stop_reason ?? "unknown"})`,
        generationId,
        stage: "empty-response",
        costUsd,
        inputTokens,
        outputTokens,
      };
    }

    await recordGeneration({
      generationId,
      model: input.model,
      inputTokens,
      outputTokens,
      founderEmail: input.founderEmail,
      success: true,
      generationType: "studio_recipe",
    });

    return {
      ok: true,
      content: text,
      generationId,
      inputTokens,
      outputTokens,
      costUsd,
      warning: gate.warning,
    };
  } catch (err) {
    // API call failed — we may have been billed for partial usage,
    // but Anthropic's SDK doesn't expose token counts on errors. Record
    // the failure with zero tokens so the ledger has a row, costUsd 0.
    const errorMessage = err instanceof Error ? err.message : String(err);
    await recordGeneration({
      generationId,
      model: input.model,
      inputTokens: 0,
      outputTokens: 0,
      founderEmail: input.founderEmail,
      success: false,
      errorMessage: errorMessage.slice(0, 500),
      generationType: "studio_recipe",
    });
    return {
      ok: false,
      reason: `Anthropic API error: ${errorMessage}`,
      generationId,
      stage: "api",
      costUsd: 0,
    };
  }
}

/** Re-export MODELS so callers can pick a model without a second import. */
export { MODELS };
