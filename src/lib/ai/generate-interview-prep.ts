"use server";

import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";
import { MODELS } from "@/lib/ai/models";
import { requireAIAccess } from "@/lib/ai/access";
import type { CVData } from "@/lib/cv-types";

const RATE_LIMIT_PER_HOUR = 10;
const HOUR_MS = 60 * 60 * 1000;

const MAX_JOB_TITLE = 150;
const MAX_JD = 5000;

const FRIENDLY_ERROR = "Couldn't generate interview prep right now — try again";

const MODEL_ID = MODELS.SONNET;

export type InterviewType = "behavioral" | "technical" | "mixed";
export type InterviewDifficulty = "junior" | "mid" | "senior";
export type InterviewQuestionType = "standard" | "curveball";

export type InterviewQuestion = {
  question: string;
  type: InterviewQuestionType;
  why: string;
  framework: string;
  talkingPoints: string[];
  redFlags: string[];
};

export type GenerateInterviewPrepResult =
  | {
      ok: true;
      questions: InterviewQuestion[];
      cvGapNote?: string;
    }
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

const SYSTEM_PROMPT = `You are an expert interview coach with 20 years of experience helping candidates prepare for job interviews at companies of all sizes. You generate realistic, high-signal interview prep tailored to the user's target role.

OUTPUT FORMAT — return ONLY valid JSON. No markdown fences, no preamble, no commentary, no trailing text. The shape MUST be exactly:
{
  "questions": [
    {
      "question": "<the interview question>",
      "type": "standard" | "curveball",
      "why": "<one sentence — what the interviewer is probing for>",
      "framework": "<short structured approach to answering>",
      "talkingPoints": ["<point 1>", "<point 2>", "<point 3>"],
      "redFlags": ["<thing not to say 1>", "<thing not to say 2>"]
    }
  ],
  "cvGapNote": "<optional — only when CV provided AND a real gap exists, otherwise omit this key entirely>"
}

QUANTITY — generate EXACTLY 12 questions:
- 10 marked type="standard" (real questions interviewers actually ask)
- 2 marked type="curveball" (unexpected/lateral questions interviewers actually use to probe judgment, not gotcha questions)
- Standard questions come first (indices 0-9), curveballs last (indices 10-11)

PER-QUESTION RULES:
- "framework": For behavioral questions use STAR (Situation/Task/Action/Result). For technical questions use a structured problem-solving approach (clarify → outline → trade-offs → implement → verify). For mixed, match the question type.
- "talkingPoints": 2–3 items. If a CV is provided, talkingPoints MUST reference SPECIFIC items from the CV (a real role, a real bullet, a real skill). If no CV is provided, give strong generic examples appropriate to the difficulty level.
- "redFlags": 2–3 items. MUST be SPECIFIC to that question — what a candidate should NOT say. Examples: for "Tell me about yourself" → "Don't recite your full resume", "Don't lead with personal hobbies". Generic platitudes ("be confident", "smile more") are forbidden.
- "why": ONE sentence describing what the interviewer is actually evaluating with this question.

INTERVIEW TYPE:
- "behavioral": all 10 standard questions are behavioral (past experience, conflict, leadership, failure, growth). Curveballs may be lateral judgment questions.
- "technical": all 10 standard questions are technical (problem solving, system design, domain knowledge appropriate to role). Curveballs may be unexpected technical scenarios.
- "mixed": exactly 5 behavioral standard + 5 technical standard + 2 curveballs.

DIFFICULTY:
- "junior": fundamentals, learning ability, eagerness, mentorship; avoid system design and team-leadership questions.
- "mid": ownership, cross-functional collaboration, debugging real production problems, scoping work, mentoring juniors.
- "senior": leadership, strategy, system design, hiring, organizational impact, ambiguity navigation.

CURVEBALLS — must be questions interviewers actually use, not gotchas:
- "What would you do in your first 90 days?"
- "Sell me this pen / Convince me to hire you"
- "What's your biggest weakness for THIS specific role?"
- "What questions do you have for me?" (probing the candidate's curiosity)
- "Tell me about a time you were wrong"
- "What's a strong opinion you hold loosely?"

CV GAP NOTE — include "cvGapNote" key ONLY when:
- A CV is provided in the input, AND
- There is a SPECIFIC, REAL gap between the CV and the role the user is targeting (e.g., applying for senior role with no leadership bullets; targeting a backend role with only frontend bullets).
- Format: "Your CV doesn't show <specific gap>. Here's how to frame what you have: <constructive advice referencing what IS on the CV>."
- If no meaningful gap exists, OMIT this key entirely. Do not say "no gap" — just omit.
- Maximum 2 sentences.

QUALITY BAR:
- No trick questions, no gotchas, no Glassdoor cliches without substance.
- Match the seniority — don't ask a junior about org design, don't ask a senior about syntax.
- Questions should be specific enough to feel tailored to the role; don't just say "Tell me about a time you led a team" without grounding in the role context.

If you cannot satisfy ALL rules, still return the best valid JSON you can — never refuse, never explain, never apologize.`;

const FENCE_RE = /^\s*```(?:json)?\s*\n?|\n?```\s*$/gi;

function stripJsonFences(raw: string): string {
  return raw.replace(FENCE_RE, "").trim();
}

function buildCvContext(cv: CVData): string {
  const lines: string[] = [];
  const role = cv.basics?.role?.trim();
  if (role) lines.push(`Current/most recent role: ${role}`);
  const summary = stripRichText(cv.basics?.summary ?? "").trim();
  if (summary) lines.push(`Summary: ${summary.slice(0, 500)}`);

  const exp = (cv.experience ?? []).slice(0, 4);
  if (exp.length > 0) {
    lines.push("Experience:");
    for (const e of exp) {
      const header = [e.role, e.company].filter(Boolean).join(" at ");
      lines.push(`- ${header || "(role)"}`);
      const bullets = (e.bullets ?? [])
        .map((b) => stripRichText(b).trim())
        .filter(Boolean)
        .slice(0, 4);
      for (const b of bullets) {
        lines.push(`  • ${b.slice(0, 220)}`);
      }
    }
  }

  const skills = (cv.skills ?? []).slice(0, 30);
  if (skills.length > 0) {
    lines.push(`Skills: ${skills.join(", ")}`);
  }

  return lines.join("\n");
}

function isQuestion(v: unknown): v is InterviewQuestion {
  if (!v || typeof v !== "object") return false;
  const q = v as Record<string, unknown>;
  if (typeof q.question !== "string" || !q.question.trim()) return false;
  if (q.type !== "standard" && q.type !== "curveball") return false;
  if (typeof q.why !== "string" || !q.why.trim()) return false;
  if (typeof q.framework !== "string" || !q.framework.trim()) return false;
  if (!Array.isArray(q.talkingPoints) || q.talkingPoints.length === 0) {
    return false;
  }
  if (!q.talkingPoints.every((t) => typeof t === "string" && t.trim())) {
    return false;
  }
  if (!Array.isArray(q.redFlags) || q.redFlags.length === 0) return false;
  if (!q.redFlags.every((t) => typeof t === "string" && t.trim())) return false;
  return true;
}

export async function generateInterviewPrep(input: {
  jobTitle: string;
  jobDescription?: string;
  cvId?: string;
  interviewType: InterviewType;
  difficulty: InterviewDifficulty;
}): Promise<GenerateInterviewPrepResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[generateInterviewPrep] ANTHROPIC_API_KEY is missing or invalid",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const jobTitle = (input.jobTitle ?? "").trim();
    const jobDescription = (input.jobDescription ?? "").trim();
    const cvId = (input.cvId ?? "").trim();

    if (!jobTitle) {
      return { ok: false, error: "Job title is required" };
    }
    if (jobTitle.length > MAX_JOB_TITLE) {
      return { ok: false, error: "Job title is too long" };
    }
    if (jobDescription.length > MAX_JD) {
      return { ok: false, error: "Job description is too long" };
    }

    const interviewType: InterviewType =
      input.interviewType === "behavioral" ||
      input.interviewType === "technical" ||
      input.interviewType === "mixed"
        ? input.interviewType
        : "mixed";
    const difficulty: InterviewDifficulty =
      input.difficulty === "junior" ||
      input.difficulty === "mid" ||
      input.difficulty === "senior"
        ? input.difficulty
        : "mid";

    let cvContext = "";
    if (cvId) {
      const row = await prisma.resume.findFirst({
        where: { id: cvId, userId: user.id },
        select: { data: true },
      });
      if (!row) {
        return { ok: false, error: "Selected CV not found" };
      }
      const cv = row.data as unknown as CVData;
      cvContext = buildCvContext(cv);
    }

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the limit for this hour — try again later",
      };
    }

    const userMessage = `Target role: ${jobTitle}
Interview type: ${interviewType}
Difficulty: ${difficulty}

${jobDescription ? `Job description:\n${jobDescription.slice(0, MAX_JD)}\n` : "(No job description provided — generate based on role title and difficulty.)\n"}
${cvContext ? `\nCandidate CV summary (for tailoring talkingPoints and any cvGapNote):\n${cvContext}\n` : "\n(No CV provided — talkingPoints should be strong generic examples; do NOT include cvGapNote.)\n"}
Return the JSON now.`;

    console.log("[generateInterviewPrep] sending request:", {
      model: MODEL_ID,
      jobTitleLength: jobTitle.length,
      hasJD: jobDescription.length > 0,
      hasCv: cvContext.length > 0,
      interviewType,
      difficulty,
    });

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 4500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const cleaned = stripJsonFences(raw);

    if (!cleaned) {
      console.error("[generateInterviewPrep] empty response from Claude", {
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
      console.error("[generateInterviewPrep] JSON.parse failed", {
        rawHead: cleaned.slice(0, 300),
        rawTail: cleaned.slice(-200),
        message:
          parseErr instanceof Error ? parseErr.message : String(parseErr),
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    if (!parsed || typeof parsed !== "object") {
      console.error("[generateInterviewPrep] non-object response");
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const obj = parsed as { questions?: unknown; cvGapNote?: unknown };
    if (!Array.isArray(obj.questions) || obj.questions.length !== 12) {
      console.error("[generateInterviewPrep] wrong question count", {
        count: Array.isArray(obj.questions) ? obj.questions.length : -1,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const validated: InterviewQuestion[] = [];
    for (const q of obj.questions) {
      if (!isQuestion(q)) {
        console.error("[generateInterviewPrep] invalid question shape", {
          sample: q,
        });
        return { ok: false, error: FRIENDLY_ERROR };
      }
      validated.push({
        question: q.question.trim(),
        type: q.type,
        why: q.why.trim(),
        framework: q.framework.trim(),
        talkingPoints: q.talkingPoints
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 4),
        redFlags: q.redFlags
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 4),
      });
    }

    const curveballs = validated.filter((q) => q.type === "curveball").length;
    if (curveballs !== 2) {
      console.error("[generateInterviewPrep] wrong curveball count", {
        curveballs,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    let cvGapNote: string | undefined;
    if (
      typeof obj.cvGapNote === "string" &&
      obj.cvGapNote.trim().length > 0 &&
      cvContext.length > 0
    ) {
      cvGapNote = obj.cvGapNote.trim();
    }

    return { ok: true, questions: validated, cvGapNote };
  } catch (err) {
    const e = err as {
      message?: unknown;
      name?: unknown;
      status?: unknown;
      type?: unknown;
    };
    console.error("[generateInterviewPrep] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      status: e?.status,
      type: e?.type,
    });
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
