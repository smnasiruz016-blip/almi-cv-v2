"use server";

import Anthropic from "@anthropic-ai/sdk";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";
import { MODELS } from "@/lib/ai/models";
import { requireAIAccess } from "@/lib/ai/access";

const MAX_FIELD_CHARS = 500;
const MAX_BULLETS = 5;
const RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;
const FRIENDLY_ERROR = "Couldn't generate bullets right now — try again";

export type BulletTone = "formal" | "confident" | "results-driven";

export type GenerateBulletsResult =
  | { ok: true; bullets: string[] }
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

const SYSTEM_PROMPT = `You are a professional CV writer. Your job is to generate exactly 5 distinct, polished bullet points for a single CV entry, based on the role and responsibility the user provides.

RULES:
- ALWAYS return exactly 5 bullets. Never fewer, never more.
- Output format: one bullet per line, plain text only. NO leading dashes, NO asterisks, NO bullet characters, NO numbering, NO quotes, NO headings, NO preamble, NO explanation. Just five lines, one bullet each.
- Each bullet starts with a strong, varied action verb. Do NOT repeat verbs across the 5 bullets.
- Use concrete, professional language. Active voice. Avoid clichés like "team player", "self-starter", "synergy".
- Include metrics (numbers, percentages, dollar amounts, scale) ONLY when the user explicitly provided them. NEVER invent numbers, employers, tools, dates, or technologies.
- Stay grounded in the stated role and responsibility. Generic, neutral phrasing is fine when a field is missing — never fabricate to fill a gap.
- Match the requested TONE precisely:
  - Formal: traditional, restrained, third-person, executive-summary feel.
  - Confident: bold, achievement-forward, direct, third-person.
  - Results-driven: outcome-focused, impact-led, leading with what changed, improved, grew, or shipped.

EXAMPLES — same input style, two different tones:

Inputs:
Tone: confident
Job title: Senior Product Manager
Company: Stripe
Responsibility: led customer onboarding redesign for SMB segment
Years: 3
Industry: fintech

Output:
Owned end-to-end customer onboarding redesign for the SMB segment, partnering across design, engineering, and revenue.
Reframed onboarding from a form-heavy flow into a guided activation experience built on progressive disclosure.
Drove cross-functional alignment between sales, support, and product on a single onboarding north star.
Established success metrics and instrumentation that gave SMB stakeholders a shared view of activation health.
Shipped iterative improvements in tight cycles, validating each change with cohort-level qualitative research.

Inputs:
Tone: results-driven
Job title: Marketing Manager
Company: (not provided)
Responsibility: ran paid acquisition for B2C app
Years: 4
Industry: consumer mobile

Output:
Scaled paid acquisition for a consumer mobile app across Meta, Google, and TikTok ad networks.
Reduced blended customer acquisition cost by tightening creative testing cadence and pruning underperforming audiences weekly.
Built a self-serve attribution dashboard that gave finance and growth a shared source of truth.
Expanded into incrementality testing, surfacing channels that had been overcredited under last-click attribution.
Lifted activation rate by aligning paid creative narratives with onboarding messaging in the product.`;

const LEADING_MARKER = /^\s*(?:[-*•]|\d+[.)])\s*/;
const SURROUNDING_QUOTES = /^["'`]+|["'`]+$/g;

function parseBullets(raw: string): string[] {
  if (!raw) return [];
  const lines = raw
    .split(/\r?\n/)
    .map((line) => stripRichText(line ?? ""))
    .map((line) => line.replace(LEADING_MARKER, ""))
    .map((line) => line.replace(SURROUNDING_QUOTES, ""))
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of lines) {
    const key = line.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(line);
    if (out.length >= MAX_BULLETS) break;
  }
  return out;
}

const MODEL_ID = MODELS.SONNET;

export async function generateBullets(input: {
  jobTitle: string;
  company?: string;
  responsibility: string;
  years?: number;
  industry?: string;
  tone: BulletTone;
}): Promise<GenerateBulletsResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[generateBullets] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const jobTitle = (input.jobTitle ?? "").trim();
    const company = (input.company ?? "").trim();
    const responsibility = (input.responsibility ?? "").trim();
    const industry = (input.industry ?? "").trim();
    const years = input.years;

    if (!jobTitle) {
      return { ok: false, error: "Job title is required" };
    }
    if (!responsibility) {
      return { ok: false, error: "Responsibility is required" };
    }
    if (years !== undefined) {
      if (!Number.isFinite(years) || years < 0 || years > 80) {
        return { ok: false, error: "Years of experience must be 0–80" };
      }
    }
    if (
      jobTitle.length > MAX_FIELD_CHARS ||
      company.length > MAX_FIELD_CHARS ||
      responsibility.length > MAX_FIELD_CHARS ||
      industry.length > MAX_FIELD_CHARS
    ) {
      return {
        ok: false,
        error: "One of the fields is too long — shorten it",
      };
    }

    const tone: BulletTone =
      input.tone === "formal" ||
      input.tone === "confident" ||
      input.tone === "results-driven"
        ? input.tone
        : "results-driven";

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the limit for this hour — try again later",
      };
    }

    const client = new Anthropic({ apiKey });

    const userMessage = `Tone: ${tone}
Job title: ${jobTitle}
Company: ${company || "(not provided)"}
Responsibility: ${responsibility}
Years: ${years !== undefined ? years : "(not provided)"}
Industry: ${industry || "(not provided)"}

Write the 5 bullets.`;

    console.log("[generateBullets] sending request:", {
      model: MODEL_ID,
      tone,
      hasCompany: !!company,
      jobTitleLength: jobTitle.length,
      responsibilityLength: responsibility.length,
      hasYears: years !== undefined,
      hasIndustry: !!industry,
    });

    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const bullets = parseBullets(raw);

    if (bullets.length === 0) {
      console.error(
        "[generateBullets] empty/unparseable response from Claude",
        {
          stopReason: message.stop_reason,
          contentLength: message.content?.length ?? 0,
          firstBlockType: firstBlock?.type,
          rawLength: raw.length,
        },
      );
      return { ok: false, error: FRIENDLY_ERROR };
    }

    return { ok: true, bullets };
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
    console.error("[generateBullets] FAILED:", {
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
