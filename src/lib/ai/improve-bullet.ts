"use server";

import Anthropic from "@anthropic-ai/sdk";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";

const MAX_INPUT_CHARS = 1000;
const RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;

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

export async function improveBullet(input: {
  bullet: string;
  role?: string;
  company?: string;
}): Promise<{ improved: string }> {
  const user = await requireUser();

  const plain = stripRichText(input.bullet ?? "").trim();
  if (!plain) {
    throw new Error("Couldn't improve right now — please try again in a moment");
  }
  if (plain.length > MAX_INPUT_CHARS) {
    throw new Error("That bullet is too long to improve — try shortening it first");
  }

  if (!checkRateLimit(user.id)) {
    throw new Error("You've hit the limit for this hour — try again later");
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[improveBullet] ANTHROPIC_API_KEY is not set");
    throw new Error("Couldn't improve right now — please try again in a moment");
  }

  const client = new Anthropic({ apiKey });

  const userMessage = `Role: ${input.role?.trim() || "unspecified"}
Company: ${input.company?.trim() || "unspecified"}
Original bullet: ${plain}

Return the improved bullet.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const cleaned = raw
      .trim()
      .replace(/^["'`]+|["'`]+$/g, "")
      .trim();

    if (!cleaned) {
      throw new Error("empty response");
    }

    return { improved: cleaned };
  } catch (err) {
    console.error("[improveBullet] failed:", err);
    throw new Error("Couldn't improve right now — please try again in a moment");
  }
}
