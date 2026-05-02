"use server";

import Anthropic from "@anthropic-ai/sdk";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";
import { MODELS } from "@/lib/ai/models";

const MAX_FIELD_CHARS = 500;
const RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;
const FRIENDLY_ERROR = "Couldn't generate right now — try again";

export type SummaryTone = "formal" | "friendly" | "confident";

export type GenerateSummaryResult =
  | { ok: true; summary: string }
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

const SYSTEM_PROMPT = `You are a professional CV writer. Your job is to generate a polished 2-3 sentence professional Summary for the top of a CV, based on the structured details the user provides.

RULES:
- ALWAYS produce a Summary. Never refuse, never return empty, never ask for more info.
- Output ONLY the Summary text. No preamble, no quotes, no headings, no "Here is...", no explanation.
- Length: 2-3 sentences. Tight, confident, professional English.
- Match the requested TONE precisely:
  - Formal: traditional, restrained, third-person, executive-summary feel.
  - Friendly: warm, approachable, still professional, light first-person OK.
  - Confident: bold, action-driven, achievement-forward, third-person.
- Use ONLY facts the user provides. Never invent specific employer names, dollar amounts, percentages, dates, certifications, or technologies the user did not mention.
- When an optional field is missing, write neutral phrasing — never fabricate to fill the gap.
- Active voice, concrete language. Avoid clichés like "team player", "results-driven", "self-starter".
- Lead with role and years of experience when both are provided.

EXAMPLES — same inputs, three tones:

Inputs: Role "Senior Product Manager", Years 8, Top skills "B2B SaaS, roadmapping, customer research", Achievement "Led a relaunch that doubled monthly active users", Goal "Lead a product team at a growth-stage SaaS company"

Tone: formal
Output: Senior Product Manager with eight years of experience in B2B SaaS, specializing in roadmapping and customer research. Led a product relaunch that doubled monthly active users. Seeking to lead a product team at a growth-stage SaaS organization.

Tone: friendly
Output: I'm a Senior Product Manager with 8 years in B2B SaaS, and I love turning customer research into roadmaps that ship. Most recently I led a relaunch that doubled monthly active users — and I'm now looking to lead a product team at a growth-stage SaaS company.

Tone: confident
Output: Senior Product Manager with 8 years driving B2B SaaS outcomes through sharp roadmapping and rigorous customer research. Recently led a relaunch that doubled monthly active users. Ready to lead a product team at a growth-stage SaaS company.

EXAMPLE — sparse input, optional fields missing:

Inputs: Role "Customer Service Representative", Years 2, Top skills "communication, problem solving, CRM tools", no achievement, no goal

Tone: confident
Output: Customer Service Representative with 2 years of experience resolving complex customer issues through clear communication and rigorous problem solving. Skilled with leading CRM tools and committed to delivering positive customer outcomes at every touchpoint.`;

function normalizeResponse(raw: string): string {
  const stripped = stripRichText(raw ?? "");
  return stripped
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["'`]+|["'`]+$/g, "")
    .trim();
}

const MODEL_ID = MODELS.SONNET;

export async function generateSummary(input: {
  role: string;
  years: number;
  topSkills: string;
  biggestAchievement?: string;
  careerGoal?: string;
  tone: SummaryTone;
}): Promise<GenerateSummaryResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[generateSummary] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const role = (input.role ?? "").trim();
    const topSkills = (input.topSkills ?? "").trim();
    const achievement = (input.biggestAchievement ?? "").trim();
    const goal = (input.careerGoal ?? "").trim();

    if (!role) {
      return { ok: false, error: "Role is required" };
    }
    if (!Number.isFinite(input.years) || input.years < 0 || input.years > 80) {
      return { ok: false, error: "Years of experience must be 0–80" };
    }
    if (!topSkills) {
      return { ok: false, error: "Top skills are required" };
    }
    if (
      role.length > MAX_FIELD_CHARS ||
      topSkills.length > MAX_FIELD_CHARS ||
      achievement.length > MAX_FIELD_CHARS ||
      goal.length > MAX_FIELD_CHARS
    ) {
      return {
        ok: false,
        error: "One of the fields is too long — shorten it",
      };
    }

    const tone: SummaryTone =
      input.tone === "formal" ||
      input.tone === "friendly" ||
      input.tone === "confident"
        ? input.tone
        : "confident";

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the limit for this hour — try again later",
      };
    }

    const client = new Anthropic({ apiKey });

    const userMessage = `Tone: ${tone}
Role: ${role}
Years of experience: ${input.years}
Top skills: ${topSkills}
Biggest achievement: ${achievement || "(not provided)"}
Career goal: ${goal || "(not provided)"}

Write the Summary.`;

    console.log("[generateSummary] sending request:", {
      model: MODEL_ID,
      tone,
      years: input.years,
      roleLength: role.length,
      skillsLength: topSkills.length,
      hasAchievement: !!achievement,
      hasGoal: !!goal,
    });

    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const cleaned = normalizeResponse(raw);

    if (!cleaned) {
      console.error("[generateSummary] empty response from Claude", {
        stopReason: message.stop_reason,
        contentLength: message.content?.length ?? 0,
        firstBlockType: firstBlock?.type,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    return { ok: true, summary: cleaned };
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
    console.error("[generateSummary] FAILED:", {
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
