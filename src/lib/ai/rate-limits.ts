// Per-model rate limits for the centralized Anthropic client wrapper.
//
// These values are CLIENT-SIDE LIMITS we self-impose to stay safely
// under the org's hard caps reported by Anthropic — i.e. for every
// limit Anthropic shows in Console → Settings → Limits, we leave ~10%
// headroom. The wrapper enforces both ITPM (input tokens per minute)
// and RPM (requests per minute) per model and blocks-and-waits when
// either bucket is exhausted.
//
// Update procedure: when org tier changes (e.g. on credit refresh
// Anthropic bumps the limits) edit numbers below to match the new
// values from https://console.anthropic.com/settings/limits minus
// 10%. Single file, no migration. If a model is not listed here,
// requests fall back to DEFAULT_LIMITS (conservative).

export type RateLimit = {
  /** Input tokens per minute. Includes both prompt and image tokens.
   *  Image tokens for Claude vision average ~1568 per image. */
  itpm: number;
  /** Requests per minute. */
  rpm: number;
};

export const AI_RATE_LIMITS: Record<string, RateLimit> = {
  // Org limit observed during PR #52 backfill: 50,000 ITPM. Leave 10%
  // headroom against the 50k wall — at concurrency 5 with ~3k input
  // tokens/call we comfortably stay under.
  "claude-haiku-4-5-20251001": { itpm: 45000, rpm: 50 },

  // Sonnet 4.6 — org limits not yet measured in this account; values
  // are conservative defaults. Bump after first live use.
  "claude-sonnet-4-6": { itpm: 40000, rpm: 50 },

  // Opus 4.7 — same situation; conservative defaults.
  "claude-opus-4-7": { itpm: 30000, rpm: 50 },
};

/** Fallback used when a request lands with a model id not in the table.
 *  Picks the cheapest plausible limit so we don't accidentally exceed
 *  a tier we haven't measured. */
export const DEFAULT_LIMITS: RateLimit = { itpm: 20000, rpm: 30 };

export function getLimitsFor(model: string): RateLimit {
  return AI_RATE_LIMITS[model] ?? DEFAULT_LIMITS;
}
