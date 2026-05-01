"use server";

import Anthropic from "@anthropic-ai/sdk";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";
import { MODELS } from "@/lib/ai/models";

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

const SYSTEM_PROMPT = `You are a professional CV writer. Your job is to ALWAYS rewrite the user's text into a polished, professional Summary or bullet point. Even if the input is short, casual, grammatically broken, or in mixed language — you must produce a clean, confident, grammatically correct rewrite in professional English.

RULES:
- ALWAYS rewrite. Never return the input unchanged.
- Output ONLY the rewritten text. No preamble, no quotes, no "Here is...", no explanation.
- Match the input's intent: if it's a Summary, write 2-3 sentences. If it's a bullet point, write 1 strong sentence with an action verb.
- Use professional tone, active voice, and concrete language.
- If the input is too vague to be specific (e.g. "i worked b4"), produce a neutral professional version (e.g. "Experienced professional with a proven track record of delivering results, seeking opportunities to contribute meaningfully to a growing organization.").
- Never invent specific facts (numbers, employer names, dates) the user didn't provide.
- Preserve the user's first-person or third-person framing if clear; otherwise default to third-person Summary style.`;

function normalizeResponse(raw: string): string {
  const stripped = stripRichText(raw ?? "");
  return stripped
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["'`]+|["'`]+$/g, "")
    .trim();
}

const MODEL_ID = MODELS.SONNET;

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
