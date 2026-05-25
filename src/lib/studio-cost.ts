// Studio cost protection — Phase 6 / Stage 3a scaffolding.
//
// The Studio drives Anthropic API spend whenever Nasir clicks
// "Generate variants". Stage 3b will wire the API calls; this module
// is the pre-flight check + post-flight ledger that protects the
// founder's wallet from runaway generation costs.
//
// Contract:
//   getCurrentMonthSpend() — read sum of costUsd in StudioCostLedger
//                            for the current UTC calendar month.
//   canGenerate(estimate)  — returns whether a planned generation
//                            fits within the monthly cap, plus a
//                            soft warning at 80% spend.
//   recordGeneration(usage) — append-only insert, computing costUsd
//                             from the hard-coded MODEL_RATES table.
//
// No callers in this commit. Stage 3b is the first to call any of
// these. The Studio's cost dashboard reads getCurrentMonthSpend()
// from day one so an empty ledger still surfaces $0 / $20 / 0%.

import { prisma } from "@/lib/db";

export type StudioModel =
  | "claude-haiku-4-5-20251001"
  | "claude-sonnet-4-6"
  | "claude-opus-4-7";

/**
 * Per-million-token rates in USD.
 *
 * TODO: verify against https://www.anthropic.com/pricing on every
 * model bump. Keep numbers conservative (over-estimate when in doubt)
 * — surprise underbilling is fine; surprise overbilling is the
 * failure mode this whole module exists to prevent.
 */
const MODEL_RATES: Record<string, { input: number; output: number }> = {
  "claude-haiku-4-5-20251001": { input: 1.0, output: 5.0 },
  "claude-sonnet-4-6": { input: 3.0, output: 15.0 },
  "claude-opus-4-7": { input: 15.0, output: 75.0 },
};

/** Conservative fallback when an unknown model id shows up. We charge
 *  at the most expensive published rate so the budget gate stays
 *  protective even when Anthropic ships a new model the rates table
 *  doesn't know about yet. */
const UNKNOWN_MODEL_RATES = MODEL_RATES["claude-opus-4-7"];

const DEFAULT_BUDGET_USD = 20;
const WARNING_THRESHOLD = 0.8;

export function getMonthlyBudget(): number {
  const raw = process.env.STUDIO_MONTHLY_BUDGET_USD;
  if (!raw) return DEFAULT_BUDGET_USD;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_BUDGET_USD;
  return parsed;
}

function getCurrentMonthStart(): Date {
  const now = new Date();
  // UTC start of month — Vercel functions run in UTC, and the
  // StudioCostLedger.timestamp default is also UTC, so the boundary
  // stays consistent regardless of where the founder is browsing
  // from.
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

export function computeCostUsd(
  model: string,
  inputTokens: number,
  outputTokens: number,
): number {
  const rates = MODEL_RATES[model] ?? UNKNOWN_MODEL_RATES;
  const cost =
    (inputTokens / 1_000_000) * rates.input +
    (outputTokens / 1_000_000) * rates.output;
  // Clamp to non-negative, finite — defensive against bad token counts
  // (negative numbers, NaN) leaking from API edge cases.
  if (!Number.isFinite(cost) || cost < 0) return 0;
  return cost;
}

export type CurrentMonthSpend = {
  spentUsd: number;
  budgetUsd: number;
  remainingUsd: number;
  /** 0–100 with one decimal of resolution (e.g. 73.4). */
  percentUsed: number;
};

export async function getCurrentMonthSpend(): Promise<CurrentMonthSpend> {
  const monthStart = getCurrentMonthStart();
  const result = await prisma.studioCostLedger.aggregate({
    _sum: { costUsd: true },
    where: { timestamp: { gte: monthStart } },
  });
  const spentUsd = result._sum.costUsd ? Number(result._sum.costUsd) : 0;
  const budgetUsd = getMonthlyBudget();
  const remainingUsd = Math.max(0, budgetUsd - spentUsd);
  const percentUsed =
    budgetUsd === 0
      ? 0
      : Math.min(100, Math.round((spentUsd / budgetUsd) * 1000) / 10);
  return { spentUsd, budgetUsd, remainingUsd, percentUsed };
}

export type CanGenerateResult = {
  allowed: boolean;
  /** Set when allowed=false — surface to the user as the hard-block reason. */
  reason?: string;
  /** Set when allowed=true and projected spend ≥ 80% of budget. The
   *  Studio UI should surface this so the founder can extend the cap
   *  before hitting 100%. */
  warning?: string;
  spentUsd: number;
  budgetUsd: number;
};

export async function canGenerate(
  estimatedCostUsd: number,
): Promise<CanGenerateResult> {
  const { spentUsd, budgetUsd } = await getCurrentMonthSpend();
  const projected = spentUsd + estimatedCostUsd;
  if (projected > budgetUsd) {
    return {
      allowed: false,
      reason: `Monthly Studio budget exhausted ($${spentUsd.toFixed(2)} of $${budgetUsd.toFixed(2)} spent; this generation would cost ~$${estimatedCostUsd.toFixed(2)}).`,
      spentUsd,
      budgetUsd,
    };
  }
  if (projected >= budgetUsd * WARNING_THRESHOLD) {
    const projectedPct = Math.round((projected / budgetUsd) * 100);
    return {
      allowed: true,
      warning: `Approaching monthly budget — ${projectedPct}% of $${budgetUsd.toFixed(0)} used after this generation.`,
      spentUsd,
      budgetUsd,
    };
  }
  return { allowed: true, spentUsd, budgetUsd };
}

// Source of a spend row. Free-form string in the DB; this union exists
// so calling code (and the cost dashboard) can't typo a new variant.
// Add a value here when introducing a new pipeline that bills against
// the same monthly cap.
export type GenerationType = "studio_recipe" | "template_image_parse";

export type RecordGenerationInput = {
  generationId: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  founderEmail: string;
  success: boolean;
  errorMessage?: string | null;
  /** When omitted, the row keeps generationType=null. Existing pre-PR-52
   *  rows are all null and read as legacy Studio recipe spend; new code
   *  should always pass a value. */
  generationType?: GenerationType;
};

export async function recordGeneration(
  input: RecordGenerationInput,
): Promise<void> {
  const costUsd = computeCostUsd(
    input.model,
    input.inputTokens,
    input.outputTokens,
  );
  await prisma.studioCostLedger.create({
    data: {
      generationId: input.generationId,
      model: input.model,
      inputTokens: input.inputTokens,
      outputTokens: input.outputTokens,
      // Prisma accepts number | string | Decimal for Decimal columns.
      // toFixed(6) preserves the full Decimal(10,6) precision.
      costUsd: costUsd.toFixed(6),
      founderEmail: input.founderEmail,
      success: input.success,
      errorMessage: input.errorMessage ?? null,
      generationType: input.generationType ?? null,
    },
  });
}
