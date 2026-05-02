"use server";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";
import { MODELS } from "@/lib/ai/models";
import { requireAIAccess } from "@/lib/ai/access";
import type { CVData } from "@/lib/cv-types";

const RATE_LIMIT_PER_HOUR = 10;
const HOUR_MS = 60 * 60 * 1000;
const MAX_JD_CHARS = 12000;
const MIN_JD_CHARS = 30;
const FRIENDLY_ERROR = "Couldn't tailor your CV right now — try again";

const MODEL_ID = MODELS.SONNET;

export type TailoredExperienceBullets = {
  entryId: string;
  bullets: string[];
};

export type TailorProposal = {
  summary: string;
  experienceBullets: TailoredExperienceBullets[];
  skillsOrder: string[];
};

export type TailorCVResult =
  | { ok: true; proposal: TailorProposal }
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

const TailorOutputSchema = z.object({
  summary: z.string().min(1),
  experienceBullets: z.array(
    z.object({
      entryId: z.string().min(1),
      bullets: z.array(z.string().min(1)),
    }),
  ),
  skillsOrder: z.array(z.string().min(1)),
});

const SYSTEM_PROMPT = `You are a senior CV editor. Your job is to tailor an existing CV to a specific job description, returning STRICT JSON only.

YOU MUST:
- Output a single JSON object and NOTHING ELSE — no prose before, no prose after, no markdown fences, no explanation.
- Match this exact shape:
  {
    "summary": "<rewritten summary, 2-4 sentences>",
    "experienceBullets": [
      { "entryId": "exp-0", "bullets": ["…", "…"] },
      { "entryId": "exp-1", "bullets": ["…"] }
    ],
    "skillsOrder": ["<skill1>", "<skill2>", "..."]
  }

RULES — these are non-negotiable:
1. Return EXACTLY one experienceBullets entry per experience entry the user provided, with entryId matching the provided entryId verbatim.
2. For each experience entry, return EXACTLY the same number of bullets the user provided. Never add or remove bullets.
3. skillsOrder must contain EXACTLY the same skills the user provided — same strings, same count — only the ORDER changes. Do not invent, rename, merge, or drop skills.
4. Never invent employers, dates, technologies, certifications, or metrics that are not in the user's CV. You may re-emphasize existing facts to align with the job description; you may not fabricate new ones.
5. Bullets are plain text. No leading dashes, no asterisks, no quotes, no numbering — just the sentence itself.
6. Each bullet starts with a strong action verb. Use varied verbs.
7. Re-frame existing experience to emphasize relevance to the job description. Lift keywords from the JD into bullets where the underlying experience supports them.
8. Reorder skills so the most JD-relevant skills come first.
9. Tighten and refocus the summary toward the JD without inventing experience.

If you cannot satisfy ALL rules, still return the best valid JSON you can — never refuse, never explain, never apologize.`;

const FENCE_RE = /^\s*```(?:json)?\s*\n?|\n?```\s*$/gi;

function stripJsonFences(raw: string): string {
  return raw.replace(FENCE_RE, "").trim();
}

function multisetEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const counts = new Map<string, number>();
  for (const s of a) counts.set(s, (counts.get(s) ?? 0) + 1);
  for (const s of b) {
    const n = counts.get(s);
    if (!n) return false;
    counts.set(s, n - 1);
  }
  return true;
}

function buildUserMessage(jd: string, cv: CVData): string {
  const summary = stripRichText(cv.basics?.summary ?? "").trim();
  const experiencePayload = (cv.experience ?? []).map((entry, idx) => ({
    entryId: `exp-${idx}`,
    company: entry.company,
    role: entry.role,
    dates: `${entry.startDate ?? ""} – ${entry.endDate ?? "present"}`,
    bullets: (entry.bullets ?? []).map((b) => stripRichText(b ?? "").trim()),
  }));
  const skills = cv.skills ?? [];

  return `JOB DESCRIPTION:
${jd}

CURRENT CV:
Summary:
${summary || "(no current summary)"}

Experience entries (preserve entryId and bullet count for each):
${JSON.stringify(experiencePayload, null, 2)}

Skills (return same items in skillsOrder, only reorder):
${JSON.stringify(skills)}

Return the strict JSON object now.`;
}

export async function tailorCV(input: {
  cvId: string;
  jobDescription: string;
}): Promise<TailorCVResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[tailorCV] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const cvId = (input.cvId ?? "").trim();
    const jd = (input.jobDescription ?? "").trim();

    if (!cvId) return { ok: false, error: "CV id is required" };
    if (jd.length < MIN_JD_CHARS) {
      return {
        ok: false,
        error: "Job description is too short — paste the full posting",
      };
    }
    if (jd.length > MAX_JD_CHARS) {
      return {
        ok: false,
        error: "Job description is too long — shorten it to under 12,000 characters",
      };
    }

    const row = await prisma.resume.findFirst({
      where: { id: cvId, userId: user.id },
      select: { data: true },
    });
    if (!row) return { ok: false, error: "Resume not found" };

    const cv = row.data as unknown as CVData;
    const experienceCount = (cv.experience ?? []).length;
    const skills = cv.skills ?? [];

    if (experienceCount === 0 && skills.length === 0 && !cv.basics?.summary) {
      return {
        ok: false,
        error: "Your CV doesn't have enough content to tailor yet",
      };
    }

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the tailor limit for this hour — try again later",
      };
    }

    const userMessage = buildUserMessage(jd, cv);

    console.log("[tailorCV] sending request:", {
      model: MODEL_ID,
      cvId,
      jdLength: jd.length,
      experienceCount,
      skillsCount: skills.length,
      hasSummary: !!cv.basics?.summary,
    });

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const cleaned = stripJsonFences(raw);

    if (!cleaned) {
      console.error("[tailorCV] empty response from Claude", {
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
      console.error("[tailorCV] JSON.parse failed", {
        rawHead: cleaned.slice(0, 300),
        rawTail: cleaned.slice(-200),
        message: parseErr instanceof Error ? parseErr.message : String(parseErr),
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const validated = TailorOutputSchema.safeParse(parsed);
    if (!validated.success) {
      console.error("[tailorCV] schema validation failed", {
        issues: validated.error.issues.slice(0, 5),
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const proposal = validated.data;

    // Cross-validations against the input CV.
    if (proposal.experienceBullets.length !== experienceCount) {
      console.error("[tailorCV] experience entry count mismatch", {
        expected: experienceCount,
        got: proposal.experienceBullets.length,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }
    for (let i = 0; i < experienceCount; i++) {
      const expectedId = `exp-${i}`;
      const got = proposal.experienceBullets[i];
      if (got.entryId !== expectedId) {
        console.error("[tailorCV] entryId mismatch", {
          index: i,
          expected: expectedId,
          got: got.entryId,
        });
        return { ok: false, error: FRIENDLY_ERROR };
      }
      const expectedBulletCount = (cv.experience?.[i]?.bullets ?? []).length;
      if (got.bullets.length !== expectedBulletCount) {
        console.error("[tailorCV] bullet count mismatch", {
          entryId: expectedId,
          expected: expectedBulletCount,
          got: got.bullets.length,
        });
        return { ok: false, error: FRIENDLY_ERROR };
      }
    }
    if (!multisetEqual(proposal.skillsOrder, skills)) {
      console.error("[tailorCV] skillsOrder is not a permutation of skills", {
        skillsCount: skills.length,
        proposedCount: proposal.skillsOrder.length,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    return { ok: true, proposal };
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
    console.error("[tailorCV] FAILED:", {
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
