"use server";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { headers } from "next/headers";
import { MODELS } from "@/lib/ai/models";

const RATE_LIMIT_PER_DAY = 30;
const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_TEXT = 200;
const MAX_TEXT = 10_000;
const FRIENDLY_ERROR = "Couldn't score your resume right now — try again";

const MODEL_ID = MODELS.SONNET;

const WEIGHTS = {
  keywords: 0.4,
  actionVerbs: 0.25,
  format: 0.2,
  length: 0.15,
} as const;

export type ScoreBreakdown = {
  total: number;
  keywords: number;
  actionVerbs: number;
  format: number;
  length: number;
  tip: string;
};

export type ScoreResumeResult =
  | { ok: true; score: ScoreBreakdown }
  | { ok: false; error: string };

const rateLimitMap = new Map<string, number[]>();

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - DAY_MS;
  const recent = (rateLimitMap.get(ip) ?? []).filter((ts) => ts > cutoff);
  if (recent.length >= RATE_LIMIT_PER_DAY) {
    rateLimitMap.set(ip, recent);
    return false;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

const SYSTEM_PROMPT = `You are an experienced ATS reviewer and career coach. The user will paste resume text. Analyze it and produce a quality assessment.

OUTPUT FORMAT — return ONLY valid JSON matching this exact schema. No markdown fences, no preamble, no commentary, no trailing text:
{
  "keywords": <integer 0-100>,
  "actionVerbs": <integer 0-100>,
  "format": <integer 0-100>,
  "length": <integer 0-100>,
  "tip": "<one actionable improvement sentence, max 140 characters, imperative voice>"
}

SCORING RUBRIC:

KEYWORDS (0-100):
Density and specificity of role-relevant terms — technologies, methodologies, hard skills, industry vocabulary, named tools, measurable outcomes.
- 90-100: dense with specific, measurable keywords throughout.
- 70-89: solid but some sections feel generic.
- 40-69: relies on vague phrases, missing concrete tools / skills / metrics.
- 0-39: almost no specific keywords; generic descriptions only.

ACTION VERBS (0-100):
What fraction of bullet points lead with strong action verbs (Led, Built, Drove, Launched, Reduced, Designed, Architected, Owned, Shipped) versus weak openers (Responsible for, Worked on, Helped with, Was involved in, Duties included).
- 90-100: nearly every bullet leads with a strong, specific verb.
- 70-89: most bullets do; a few passive openers.
- 40-69: many bullets are passive or noun-led.
- 0-39: pervasive passive voice or "responsible for…" style.

FORMAT (0-100):
Structural quality: clear sections (Summary, Experience, Education, Skills), consistent date formatting, scannable bullet lists, no wall-of-paragraph text. ATS-readability.
- 90-100: clean structure, easy to scan, all standard sections present.
- 70-89: structure visible but inconsistent or missing one section.
- 40-69: poor structure, paragraph blocks instead of bullets, or missing multiple sections.
- 0-39: unstructured, hard for ATS to parse.

LENGTH (0-100):
Word-count appropriateness for a resume.
- 90-100: 300-700 words, focused.
- 70-89: 200-299 OR 700-1000 words.
- 40-69: under 200 OR 1000-1500 words.
- 0-39: too short to evaluate (<100) or wildly bloated (>1500).

TIP:
One specific, actionable improvement that targets whichever sub-score is LOWEST. Imperative voice. Max 140 characters. No fluff, no apology, no "consider". Examples:
- "Replace 'Responsible for' bullets with verbs like Led, Built, Reduced — start every line with one."
- "Add concrete tools and metrics — name technologies, quantities, and outcomes."

Never refuse. Even if the input looks thin or non-resume, score it accurately (low keywords + low length) and return valid JSON.`;

const ScoreSchema = z.object({
  keywords: z.number().int().min(0).max(100),
  actionVerbs: z.number().int().min(0).max(100),
  format: z.number().int().min(0).max(100),
  length: z.number().int().min(0).max(100),
  tip: z.string().min(1).max(280),
});

const FENCE_RE = /^\s*```(?:json)?\s*\n?|\n?```\s*$/gi;

function stripJsonFences(raw: string): string {
  return raw.replace(FENCE_RE, "").trim();
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

export async function scoreResume(input: {
  resumeText: string;
}): Promise<ScoreResumeResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[scoreResume] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const text = (input.resumeText ?? "").trim();
    if (text.length < MIN_TEXT) {
      return {
        ok: false,
        error: `Paste a longer resume — at least ${MIN_TEXT} characters`,
      };
    }
    if (text.length > MAX_TEXT) {
      return {
        ok: false,
        error: `Resume is too long — keep it under ${MAX_TEXT.toLocaleString()} characters`,
      };
    }

    const ip = await getClientIp();
    if (!checkIpRateLimit(ip)) {
      return {
        ok: false,
        error: "Daily limit reached — try again tomorrow",
      };
    }

    console.log("[scoreResume] sending request:", {
      model: MODEL_ID,
      ipHash: ip.slice(0, 8) + "…",
      textLength: text.length,
    });

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `RESUME TEXT:\n${text}\n\nReturn ONLY the JSON.`,
        },
      ],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const cleaned = stripJsonFences(raw);

    if (!cleaned) {
      console.error("[scoreResume] empty response from Claude", {
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
      console.error("[scoreResume] JSON.parse failed", {
        rawHead: cleaned.slice(0, 300),
        rawTail: cleaned.slice(-200),
        message:
          parseErr instanceof Error ? parseErr.message : String(parseErr),
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const validated = ScoreSchema.safeParse(parsed);
    if (!validated.success) {
      console.error("[scoreResume] schema validation failed", {
        issues: validated.error.issues.slice(0, 5),
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const v = validated.data;
    const total = Math.round(
      v.keywords * WEIGHTS.keywords +
        v.actionVerbs * WEIGHTS.actionVerbs +
        v.format * WEIGHTS.format +
        v.length * WEIGHTS.length,
    );

    return {
      ok: true,
      score: {
        total: clamp(total),
        keywords: clamp(v.keywords),
        actionVerbs: clamp(v.actionVerbs),
        format: clamp(v.format),
        length: clamp(v.length),
        tip: v.tip.trim().slice(0, 280),
      },
    };
  } catch (err) {
    const e = err as {
      message?: unknown;
      name?: unknown;
      status?: unknown;
      type?: unknown;
    };
    console.error("[scoreResume] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      status: e?.status,
      type: e?.type,
    });
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
