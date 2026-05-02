"use server";

import Anthropic from "@anthropic-ai/sdk";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";
import { MODELS } from "@/lib/ai/models";
import { requireAIAccess } from "@/lib/ai/access";

const RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;
const MAX_EXPERIENCE_CHARS = 5000;
const MIN_EXPERIENCE_CHARS = 50;
const MAX_SUMMARY_CHARS = 2000;
const MAX_EXISTING_SKILLS = 200;
const FRIENDLY_ERROR = "Couldn't extract skills right now — try again";

const MODEL_ID = MODELS.SONNET;

export type ExtractedSkills = {
  technical: string[];
  soft: string[];
  tools: string[];
  languages: string[];
};

export type ExtractSkillsResult =
  | { ok: true; skills: ExtractedSkills }
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

const SYSTEM_PROMPT = `You are a CV reviewer. Your job is to read a candidate's Summary and Experience text, then suggest exactly 8 distinct skills they almost certainly have but did NOT list, grouped into four categories.

OUTPUT FORMAT — STRICT JSON, NOTHING ELSE:
{
  "technical": ["..."],
  "soft": ["..."],
  "tools": ["..."],
  "languages": ["..."]
}

RULES:
- Output ONLY the JSON object. No prose before, no prose after, no markdown fences, no preamble, no explanation.
- The four arrays' lengths SUM to exactly 8. A typical split is 3 / 2 / 2 / 1, but adjust to whatever the input supports.
- Every suggested skill must be GROUNDED in the input. Only suggest "Python" if Python work is mentioned. Only suggest "Spanish" if Spanish-language work is mentioned. NEVER invent skills.
- If a category has nothing well-supported by the input, return an empty array for that category. Do NOT make up filler skills to hit a count.
- Each skill is 1–3 words. No descriptions, no parentheses, no qualifiers.
- EXCLUDE skills the candidate already lists. Treat existing skills as case-insensitive — do not return "javascript" if "JavaScript" is already listed. Do not return "Slack" if "slack" is already listed.
- Categories:
  - technical: hard skills, methodologies, domains (e.g. "Python", "B2B SaaS", "API design", "Data modeling")
  - soft: interpersonal / leadership / process skills (e.g. "Cross-functional collaboration", "Stakeholder management")
  - tools: named products / platforms (e.g. "Figma", "Jira", "Salesforce", "AWS")
  - languages: human spoken/written languages (e.g. "Spanish", "Mandarin"). NOT programming languages — those go under technical.
- Prefer specific over generic. "Stakeholder management" beats "communication". "PostgreSQL" beats "databases".

If the input is too thin to support 8 grounded skills, return fewer total — but the JSON shape stays the same with empty arrays where needed. Never return more than 8 across all four categories combined.`;

const FENCE_RE = /^\s*```(?:json)?\s*\n?|\n?```\s*$/gi;

function stripJsonFences(raw: string): string {
  return raw.replace(FENCE_RE, "").trim();
}

function isStringArray(v: unknown): v is string[] {
  return (
    Array.isArray(v) &&
    v.every((x) => typeof x === "string" && x.trim().length > 0)
  );
}

function dedupAgainstExisting(
  arr: string[],
  existingLower: Set<string>,
  seen: Set<string>,
): string[] {
  const out: string[] = [];
  for (const raw of arr) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (existingLower.has(key)) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

function totalCount(s: ExtractedSkills): number {
  return (
    s.technical.length +
    s.soft.length +
    s.tools.length +
    s.languages.length
  );
}

function trimToEight(s: ExtractedSkills): ExtractedSkills {
  let remaining = 8;
  const out: ExtractedSkills = {
    technical: [],
    soft: [],
    tools: [],
    languages: [],
  };
  for (const key of ["technical", "soft", "tools", "languages"] as const) {
    if (remaining <= 0) break;
    const slice = s[key].slice(0, remaining);
    out[key] = slice;
    remaining -= slice.length;
  }
  return out;
}

export async function extractSkills(input: {
  cvId?: string;
  summary?: string;
  experienceText: string;
  existingSkills: string[];
}): Promise<ExtractSkillsResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[extractSkills] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const summary = stripRichText(input.summary ?? "").trim();
    const experienceText = stripRichText(input.experienceText ?? "").trim();
    const existingSkills = Array.isArray(input.existingSkills)
      ? input.existingSkills
      : [];

    if (experienceText.length < MIN_EXPERIENCE_CHARS) {
      return {
        ok: false,
        error:
          "Add some Experience details first — we need something to read",
      };
    }
    if (experienceText.length > MAX_EXPERIENCE_CHARS) {
      return {
        ok: false,
        error: "Your Experience is too long — try trimming and rerunning",
      };
    }
    if (summary.length > MAX_SUMMARY_CHARS) {
      return {
        ok: false,
        error: "Your Summary is too long — try trimming and rerunning",
      };
    }
    if (existingSkills.length > MAX_EXISTING_SKILLS) {
      return {
        ok: false,
        error: "Your Skills list is too long — extraction may not be useful",
      };
    }

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the limit for this hour — try again later",
      };
    }

    const existingLower = new Set(
      existingSkills
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s.length > 0),
    );

    const userMessage = `SUMMARY:
${summary || "(no summary provided)"}

EXPERIENCE:
${experienceText}

EXISTING SKILLS (already on the CV — do NOT suggest these):
${
  existingSkills.length === 0
    ? "(none)"
    : existingSkills.map((s) => `- ${s}`).join("\n")
}

Return the strict JSON object now.`;

    console.log("[extractSkills] sending request:", {
      model: MODEL_ID,
      summaryLength: summary.length,
      experienceLength: experienceText.length,
      existingSkillsCount: existingSkills.length,
    });

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const cleaned = stripJsonFences(raw);

    if (!cleaned) {
      console.error("[extractSkills] empty response from Claude", {
        stopReason: message.stop_reason,
        contentLength: message.content?.length ?? 0,
        firstBlockType: firstBlock?.type,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("[extractSkills] JSON.parse failed", {
        rawHead: cleaned.slice(0, 300),
        rawTail: cleaned.slice(-200),
        message:
          parseErr instanceof Error ? parseErr.message : String(parseErr),
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !isStringArray((parsed as { technical?: unknown }).technical) ||
      !isStringArray((parsed as { soft?: unknown }).soft) ||
      !isStringArray((parsed as { tools?: unknown }).tools) ||
      !isStringArray((parsed as { languages?: unknown }).languages)
    ) {
      console.error("[extractSkills] schema validation failed", {
        keys: parsed && typeof parsed === "object" ? Object.keys(parsed) : [],
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const p = parsed as ExtractedSkills;
    const seen = new Set<string>();
    const cleanedSkills: ExtractedSkills = {
      technical: dedupAgainstExisting(p.technical, existingLower, seen),
      soft: dedupAgainstExisting(p.soft, existingLower, seen),
      tools: dedupAgainstExisting(p.tools, existingLower, seen),
      languages: dedupAgainstExisting(p.languages, existingLower, seen),
    };

    const total = totalCount(cleanedSkills);
    if (total === 0) {
      console.error(
        "[extractSkills] all suggestions filtered out (already-listed or empty)",
      );
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const trimmed = total > 8 ? trimToEight(cleanedSkills) : cleanedSkills;

    return { ok: true, skills: trimmed };
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
    console.error("[extractSkills] FAILED:", {
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
