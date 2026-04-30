"use server";

import Anthropic from "@anthropic-ai/sdk";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";

const MAX_INPUT_CHARS = 1000;
const RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;
const FRIENDLY_ERROR = "Couldn't improve right now — try again";

export type ImproveBulletResult =
  | { ok: true; improved: string }
  | { ok: false; error: string };

const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const cutoff = now - HOUR_MS;
  const recent = (rateLimitMap.get(userId) ?? []).filter((ts) => ts > cutoff);
  if (recent.length >= RATE_LIMIT_PER_HOUR) {
    rateLimitMap.set(userId, recent);
    return false;
  }
  recent.push(now);
  rateLimitMap.set(userId, recent);
  return true;
}

const SYSTEM_PROMPT = `You are a CV writing expert who rewrites resume bullets to be sharper and more impactful. Rules:
- Keep the rewrite concise — same length or shorter than the original
- Lead with a strong action verb
- Quantify impact when the original implies measurable outcomes (use numbers, percentages, scale)
- Remove filler words and corporate jargon
- Match the tone of the role if provided
- NEVER fabricate facts, metrics, or claims not implied by the original
- Return ONLY the rewritten bullet — no preamble, no explanation, no quotation marks, no prefix like 'Here is...'
- If the input is gibberish, empty, or already excellent, return it unchanged`;

function normalizeResponse(raw: string): string {
  const stripped = stripRichText(raw ?? "");
  return stripped
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["'`]+|["'`]+$/g, "")
    .trim();
}

const MODEL_ID = "claude-3-5-sonnet-20241022";

export async function improveBullet(input: {
  bullet: string;
  role?: string;
  company?: string;
}): Promise<ImproveBulletResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[improveBullet] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const plain = stripRichText(input.bullet ?? "").trim();
    if (!plain) {
      return { ok: false, error: FRIENDLY_ERROR };
    }
    if (plain.length > MAX_INPUT_CHARS) {
      return {
        ok: false,
        error: "That bullet is too long to improve — shorten it first",
      };
    }

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the limit for this hour — try again later",
      };
    }

    const client = new Anthropic({ apiKey });

    const userMessage = `Role: ${input.role?.trim() || "unspecified"}
Company: ${input.company?.trim() || "unspecified"}
Original bullet: ${plain}

Return the improved bullet.`;

    console.log("[improveBullet] sending request:", {
      model: MODEL_ID,
      inputLength: input.bullet?.length ?? 0,
      plainLength: plain.length,
      hasRole: !!input.role?.trim(),
      hasCompany: !!input.company?.trim(),
    });

    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const cleaned = normalizeResponse(raw);

    if (!cleaned) {
      console.error("[improveBullet] empty response from Claude", {
        stopReason: message.stop_reason,
        contentLength: message.content?.length ?? 0,
        firstBlockType: firstBlock?.type,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    return { ok: true, improved: cleaned };
  } catch (err) {
    const e = err as {
      message?: unknown;
      name?: unknown;
      stack?: unknown;
      status?: unknown;
      error?: unknown;
      type?: unknown;
      cause?: unknown;
    };
    console.error("[improveBullet] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      stack: err instanceof Error ? err.stack : undefined,
      status: e?.status,
      error: e?.error,
      type: e?.type,
      cause: e?.cause,
    });
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
