// Centralized Anthropic SDK wrapper — Layer 1 of the AI infrastructure
// rebuild (PR #52, post-backfill 429 storm).
//
// Three responsibilities:
//
//   1. SINGLE SOURCE OF CLIENT INSTANCE. Every AI call site in the
//      codebase routes through getAnthropicClient() instead of calling
//      `new Anthropic({apiKey})` directly. One process holds one SDK
//      instance, one rate-limiter, one telemetry stream.
//
//   2. CLIENT-SIDE TOKEN-BUCKET RATE LIMITER. Maintains a rolling
//      per-model 60-second window of {input_tokens_used, requests_used}
//      and BLOCKS-AND-WAITS when either bucket would overflow on the
//      next call. Capacity per model lives in
//      `src/lib/ai/rate-limits.ts` and is set 10% under the org's hard
//      caps. This prevents the 429 storm we hit during the 238-row
//      backfill at sustained concurrency 5.
//
//   3. RETRY-WITH-BACKOFF for transient errors. Three retries max:
//        - 429 → honor Retry-After header (capped at 90s), then retry
//        - 503/504 → exponential backoff 1s, 2s, 4s
//        - Network errors (ECONNRESET, ETIMEDOUT, EAI_AGAIN, fetch
//          failed) → same exponential backoff
//      All other errors throw immediately so call-site error handling
//      stays in charge (auth, malformed input, content policy, etc.).
//
// Behavior the wrapper does NOT take over (intentional):
//   - Cost-ledger writes — owned by callers (StudioCostLedger via
//     recordGeneration in src/lib/studio-cost.ts).
//   - Budget gating (monthly spend cap) — owned by canGenerate() in
//     the same module.
//   - Output validation / JSON parsing / schema checks — every call
//     site has its own success shape.
//
// The exported `getAnthropicClient()` returns an object that mimics
// Anthropic SDK's client shape (.messages.create) so call-site swaps
// are mechanical:
//     -  const client = new Anthropic({ apiKey });
//     +  const client = getAnthropicClient();
//   followed by `client.messages.create(...)` unchanged.

import Anthropic from "@anthropic-ai/sdk";
import type {
  Message,
  MessageCreateParamsNonStreaming,
} from "@anthropic-ai/sdk/resources/messages";
import { getLimitsFor } from "./rate-limits";

// ---- Module-level state ----------------------------------------------

let rawClient: Anthropic | null = null;

type Bucket = {
  itpmCapacity: number;
  rpmCapacity: number;
  itpmUsed: number;
  rpmUsed: number;
  /** UTC millis when this 60-second window expires and the counters
   *  reset. Set on first reservation; recreated when expired. */
  windowExpiresAt: number;
};

const buckets = new Map<string, Bucket>();

// ---- Raw client lazy init --------------------------------------------

function getRawClient(): Anthropic {
  if (rawClient) return rawClient;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.length < 20) {
    throw new Error(
      "ANTHROPIC_API_KEY missing or invalid — every AI call site MUST handle this thrown error and degrade gracefully.",
    );
  }
  // The SDK's built-in retry (default 2) overlaps with our retry
  // layer below in confusing ways. Disable it; we own retry timing.
  rawClient = new Anthropic({ apiKey, maxRetries: 0 });
  return rawClient;
}

// ---- Token estimation -------------------------------------------------

/** Rough pre-flight input-token estimate. Anthropic vision blocks
 *  average ~1568 tokens each per the docs (~1024px images). Text
 *  uses the ~4 chars/token heuristic that all our other modules
 *  already use. Estimate is conservative — slight over-count is fine
 *  for the bucket gate; under-count is what we must avoid. */
export function estimateInputTokens(
  params: MessageCreateParamsNonStreaming,
): number {
  let chars = 0;
  let imageBlocks = 0;

  // System prompt (string or array of blocks)
  if (typeof params.system === "string") {
    chars += params.system.length;
  } else if (Array.isArray(params.system)) {
    for (const b of params.system) {
      if (b.type === "text") chars += b.text.length;
    }
  }

  // Messages
  for (const m of params.messages) {
    if (typeof m.content === "string") {
      chars += m.content.length;
    } else {
      for (const block of m.content) {
        if (block.type === "text") chars += block.text.length;
        else if (block.type === "image") imageBlocks++;
      }
    }
  }

  return Math.ceil(chars / 4) + imageBlocks * 1568;
}

// ---- Rate-limit bucket -----------------------------------------------

function getBucket(model: string): Bucket {
  const now = Date.now();
  const existing = buckets.get(model);
  if (existing && now < existing.windowExpiresAt) return existing;
  const limits = getLimitsFor(model);
  const fresh: Bucket = {
    itpmCapacity: limits.itpm,
    rpmCapacity: limits.rpm,
    itpmUsed: 0,
    rpmUsed: 0,
    windowExpiresAt: now + 60_000,
  };
  buckets.set(model, fresh);
  return fresh;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Block until both ITPM and RPM budgets can accommodate the next
 *  call, then reserve capacity. The reservation is conservative —
 *  it uses the pre-flight estimate; actual usage may be slightly
 *  lower (which is fine; the next call just sees more headroom). */
async function acquireBudget(
  model: string,
  estimatedInputTokens: number,
): Promise<void> {
  for (;;) {
    const b = getBucket(model);
    const fitsTokens = b.itpmUsed + estimatedInputTokens <= b.itpmCapacity;
    const fitsRequests = b.rpmUsed + 1 <= b.rpmCapacity;
    if (fitsTokens && fitsRequests) {
      b.itpmUsed += estimatedInputTokens;
      b.rpmUsed += 1;
      return;
    }
    const waitMs = Math.max(100, b.windowExpiresAt - Date.now());
    console.log(
      `[ai-wrapper] paced: waiting ${waitMs}ms for ${model} window reset ` +
        `(itpm=${b.itpmUsed}/${b.itpmCapacity}, rpm=${b.rpmUsed}/${b.rpmCapacity})`,
    );
    await sleep(waitMs);
  }
}

// ---- Retry classification --------------------------------------------

type RetryDecision =
  | { kind: "throw" }
  | { kind: "wait"; waitMs: number; reason: string };

const MAX_RETRIES = 3;
const RETRY_AFTER_CAP_MS = 90_000;

function classifyError(err: unknown, attempt: number): RetryDecision {
  if (attempt >= MAX_RETRIES) return { kind: "throw" };

  const status = (err as { status?: number })?.status;
  const code = (err as { code?: string })?.code;
  const message =
    (err as { message?: string })?.message ?? String(err ?? "");
  const headers = (err as { headers?: Record<string, string> })?.headers;

  // 429 — honor Retry-After when present. Anthropic sends seconds.
  if (status === 429) {
    const retryAfter = headers?.["retry-after"];
    let waitMs = retryAfter ? Number(retryAfter) * 1000 : 30_000;
    if (!Number.isFinite(waitMs) || waitMs <= 0) waitMs = 30_000;
    waitMs = Math.min(waitMs, RETRY_AFTER_CAP_MS);
    return { kind: "wait", waitMs, reason: `429 retry-after=${retryAfter ?? "unspecified"}` };
  }

  // 5xx transient — exponential 1s, 2s, 4s.
  if (status === 503 || status === 504 || status === 529) {
    return { kind: "wait", waitMs: 1000 * Math.pow(2, attempt), reason: `${status}` };
  }

  // Network errors (no HTTP status). Anthropic SDK surfaces these as
  // APIConnectionError but the inner code/message is what we can match.
  const networkSignals = [
    code === "ECONNRESET",
    code === "ETIMEDOUT",
    code === "EAI_AGAIN",
    code === "ENETUNREACH",
    /fetch failed/i.test(message),
    /socket hang up/i.test(message),
  ];
  if (networkSignals.some(Boolean)) {
    return {
      kind: "wait",
      waitMs: 1000 * Math.pow(2, attempt),
      reason: `network ${code ?? message.slice(0, 40)}`,
    };
  }

  return { kind: "throw" };
}

// ---- Telemetry -------------------------------------------------------

export type CallTelemetry = {
  model: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  retries: number;
};

let telemetryHook: ((t: CallTelemetry) => void) | null = null;

/** Optional hook for tests + dashboards. Set once; replaces any prior
 *  hook. The default behavior (no hook) logs to console at INFO. */
export function setTelemetryHook(
  hook: ((t: CallTelemetry) => void) | null,
): void {
  telemetryHook = hook;
}

function emitTelemetry(t: CallTelemetry): void {
  if (telemetryHook) {
    telemetryHook(t);
    return;
  }
  console.log(
    `[ai-wrapper] ${t.model} in=${t.inputTokens} out=${t.outputTokens} ` +
      `latency=${t.latencyMs}ms retries=${t.retries}`,
  );
}

// ---- The wrapped create call -----------------------------------------

async function createWithRateLimitAndRetry(
  params: MessageCreateParamsNonStreaming,
): Promise<Message> {
  const estimated = estimateInputTokens(params);
  await acquireBudget(params.model, estimated);

  const startedAt = Date.now();
  let attempt = 0;
  let lastErr: unknown;

  for (;;) {
    try {
      const result = await getRawClient().messages.create(params);
      emitTelemetry({
        model: params.model,
        inputTokens: result.usage.input_tokens,
        outputTokens: result.usage.output_tokens,
        latencyMs: Date.now() - startedAt,
        retries: attempt,
      });
      return result;
    } catch (err) {
      lastErr = err;
      const decision = classifyError(err, attempt);
      if (decision.kind === "throw") {
        // Final failure — record retries-so-far for visibility.
        emitTelemetry({
          model: params.model,
          inputTokens: 0,
          outputTokens: 0,
          latencyMs: Date.now() - startedAt,
          retries: attempt,
        });
        throw err;
      }
      console.log(
        `[ai-wrapper] retry ${attempt + 1}/${MAX_RETRIES} for ${params.model}: ${decision.reason} — sleeping ${decision.waitMs}ms`,
      );
      await sleep(decision.waitMs);
      attempt += 1;
    }
  }
  // Unreachable; satisfy TS exhaustiveness.
  // eslint-disable-next-line no-unreachable
  throw lastErr;
}

// ---- Public surface --------------------------------------------------

export type WrappedAnthropicClient = {
  messages: {
    create: (params: MessageCreateParamsNonStreaming) => Promise<Message>;
  };
};

/** Returns the singleton wrapper. Shape matches the Anthropic SDK
 *  client so call-site refactors are mechanical (replace
 *  `new Anthropic({apiKey})` with `getAnthropicClient()`).
 *
 *  The wrapper itself is cheap to construct; the underlying SDK
 *  client is initialized lazily on first call. */
export function getAnthropicClient(): WrappedAnthropicClient {
  return wrappedSingleton;
}

const wrappedSingleton: WrappedAnthropicClient = {
  messages: { create: createWithRateLimitAndRetry },
};

// ---- Test helpers (NOT for production use) ---------------------------

/** Reset all rate-limit buckets and the raw client cache. Used by
 *  tests + the stress smoke script to start each scenario fresh. */
export function _resetForTests(): void {
  buckets.clear();
  rawClient = null;
}

/** Read current bucket state for a model. Returns null if no calls
 *  have been made yet for that model. */
export function _getBucketState(model: string): Bucket | null {
  return buckets.get(model) ?? null;
}

/** Force-override the limits for a model. Used by the manual stress
 *  test to lower ITPM to a tiny number and verify throttling kicks in. */
export function _setBucketLimits(
  model: string,
  limits: { itpm: number; rpm: number },
): void {
  buckets.set(model, {
    itpmCapacity: limits.itpm,
    rpmCapacity: limits.rpm,
    itpmUsed: 0,
    rpmUsed: 0,
    windowExpiresAt: Date.now() + 60_000,
  });
}
