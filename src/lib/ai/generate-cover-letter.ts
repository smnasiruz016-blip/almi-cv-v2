"use server";

import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";
import { MODELS } from "@/lib/ai/models";
import { requireAIAccess } from "@/lib/ai/access";
import type { CVData } from "@/lib/cv-types";

const RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;
const MAX_JD_CHARS = 5000;
const MIN_JD_CHARS = 50;
const MAX_MANAGER_CHARS = 100;
const FRIENDLY_ERROR = "Couldn't generate cover letter right now — try again";

const MODEL_ID = MODELS.SONNET;

export type CoverLetterTone = "formal" | "confident" | "conversational";

export type GenerateCoverLetterResult =
  | { ok: true; body: string }
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

const SYSTEM_PROMPT = `You are a senior career coach writing professional cover letters. Your job is to produce ONE polished cover letter — 3 to 4 paragraphs, 250 to 400 words — tailored to the specific job description, grounded in the candidate's CV.

OUTPUT FORMAT:
- Output ONLY the letter text. No preamble (no "Here is your cover letter:"), no markdown fences, no headings, no commentary.
- Plain text. Separate paragraphs with a blank line. No bullet points unless the JD explicitly demands a list.
- Start with the salutation line ("Dear [Name]," or "Dear Hiring Manager,") on its own line, then a blank line, then the body, then a blank line, then "Sincerely," (or appropriate sign-off for the tone) and the candidate's name.

STRUCTURE:
1. Hook paragraph: open with a strong, specific opener that names the role and company (or "this role" / "your team" if not provided) and signals the most relevant qualification in one sentence.
2. Evidence paragraphs (1 or 2): connect 2 to 3 specific accomplishments from the candidate's Experience to the most prominent needs in the JD. Use concrete details from the CV — never invent.
3. Close: confident, forward-looking call-to-action (e.g. "I'd welcome the chance to discuss…"). Single short paragraph.

RULES — non-negotiable:
- NEVER invent facts not in the CV. No fabricated metrics, dates, employers, technologies, or certifications.
- Address by name when hiringManager is provided ("Dear Sarah,"); otherwise "Dear Hiring Manager,".
- Sign off with the candidate's full name from the CV. If the CV has no name, sign off with "Sincerely," and nothing more.
- Match the requested TONE precisely:
  - formal: traditional, restrained, third-person-feel, executive register. Sign-off: "Sincerely,".
  - confident: bold, achievement-forward, direct first-person. Sign-off: "Best regards,".
  - conversational: warm, natural, lightly first-person, still professional. Sign-off: "Thank you,".

EXAMPLE — tone: formal

Inputs:
  Hiring manager: not provided
  JD: Senior Operations Manager at a logistics company. Needs a leader who can scale fulfillment operations across multiple warehouses, drive process standardization, and improve cost-per-shipment metrics.
  CV summary: Operations leader with 12 years scaling fulfillment in e-commerce.
  CV experience: Director of Operations at NorthernShip — led a 3-warehouse expansion, reduced cost per shipment by 19% over 18 months, standardized SOPs across the network.
  CV skills: Lean operations, P&L, vendor negotiation, SOP design.

Output:
Dear Hiring Manager,

I am writing to express my interest in the Senior Operations Manager position at your organization. With twelve years of experience scaling fulfillment operations in e-commerce, I am confident in my ability to advance your goals around multi-warehouse standardization and unit-economics improvement.

In my current role as Director of Operations at NorthernShip, I led a three-warehouse expansion while standardizing SOPs across the network, an effort that reduced cost per shipment by nineteen percent over eighteen months. The work required tight collaboration between fulfillment, vendor management, and finance — disciplines I would bring directly to your team. My background in Lean operations and P&L ownership has consistently translated into measurable operational gains.

I would welcome the opportunity to discuss how my experience aligns with your priorities. Thank you for your consideration.

Sincerely,
Avery Lin

EXAMPLE — tone: conversational

Inputs:
  Hiring manager: Priya
  JD: Product Designer at a small SaaS startup. Wants someone comfortable with end-to-end product work, including research and prototyping. Bonus: experience designing for SMB users.
  CV summary: Product designer with 6 years across consumer and B2B SaaS, currently focused on SMB onboarding.
  CV experience: Senior Product Designer at Helmline — owned onboarding redesign for 40k SMB customers, ran 22 customer interviews, shipped a prototype-led design system.
  CV skills: Figma, user research, design systems, SMB UX.

Output:
Dear Priya,

I'm reaching out about the Product Designer role on your team. The end-to-end scope and the focus on SMB users feel like a natural fit — I've spent the last six years working across consumer and B2B SaaS, and the most rewarding stretch has been my current focus on SMB onboarding.

At Helmline, I owned the onboarding redesign for forty thousand SMB customers. The work started with twenty-two customer interviews and ended with a prototype-led design system that the rest of the product team now builds on. Along the way, I learned that small-business users will absolutely tell you what they need — but only if you make space for it early, before the wireframes harden.

I'd love to chat about what you're building and how I can help. Thanks for considering me.

Thank you,
Jordan Park`;

function buildCVContext(cv: CVData): string {
  const summary = stripRichText(cv.basics?.summary ?? "").trim();
  const name = (cv.basics?.fullName ?? "").trim();
  const experience = (cv.experience ?? [])
    .map((e) => {
      const dates = `${e.startDate ?? ""}${
        e.endDate ? ` – ${e.endDate}` : " – present"
      }`;
      const bullets = (e.bullets ?? [])
        .map((b) => `- ${stripRichText(b ?? "").trim()}`)
        .filter((line) => line.length > 2)
        .join("\n");
      const head = `${e.role || "(role)"} at ${
        e.company || "(company)"
      } (${dates}):`;
      return bullets ? `${head}\n${bullets}` : head;
    })
    .join("\n\n");
  const skills = (cv.skills ?? []).join(", ");

  return `Candidate name (use for sign-off): ${name || "(not provided)"}

Summary:
${summary || "(no summary provided)"}

Experience:
${experience || "(no experience provided)"}

Skills:
${skills || "(no skills provided)"}`;
}

export async function generateCoverLetter(input: {
  cvId: string;
  jobDescription: string;
  hiringManager?: string;
  tone: CoverLetterTone;
}): Promise<GenerateCoverLetterResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[generateCoverLetter] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const cvId = (input.cvId ?? "").trim();
    const jd = (input.jobDescription ?? "").trim();
    const hiringManager = (input.hiringManager ?? "").trim();

    if (!cvId) return { ok: false, error: "CV id is required" };
    if (jd.length < MIN_JD_CHARS) {
      return {
        ok: false,
        error: "Paste a longer job description — at least 50 characters",
      };
    }
    if (jd.length > MAX_JD_CHARS) {
      return {
        ok: false,
        error:
          "Job description is too long — keep it under 5,000 characters",
      };
    }
    if (hiringManager.length > MAX_MANAGER_CHARS) {
      return {
        ok: false,
        error: "Hiring manager name is too long",
      };
    }

    const tone: CoverLetterTone =
      input.tone === "formal" ||
      input.tone === "confident" ||
      input.tone === "conversational"
        ? input.tone
        : "confident";

    const row = await prisma.resume.findFirst({
      where: { id: cvId, userId: user.id },
      select: { data: true },
    });
    if (!row) return { ok: false, error: "Resume not found" };

    const cv = row.data as unknown as CVData;
    const hasContent =
      !!stripRichText(cv.basics?.summary ?? "").trim() ||
      (cv.experience ?? []).length > 0 ||
      (cv.skills ?? []).length > 0;
    if (!hasContent) {
      return {
        ok: false,
        error: "Your CV doesn't have enough content to write a cover letter",
      };
    }

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the limit for this hour — try again later",
      };
    }

    const cvContext = buildCVContext(cv);
    const userMessage = `Tone: ${tone}
Hiring manager: ${hiringManager || "(not provided)"}

JOB DESCRIPTION:
${jd}

CANDIDATE CV:
${cvContext}

Write the cover letter now.`;

    console.log("[generateCoverLetter] sending request:", {
      model: MODEL_ID,
      cvId,
      tone,
      jdLength: jd.length,
      hasManager: !!hiringManager,
      experienceCount: (cv.experience ?? []).length,
      skillsCount: (cv.skills ?? []).length,
      hasSummary: !!cv.basics?.summary,
    });

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 1200,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const body = raw.replace(/^["'`]+|["'`]+$/g, "").trim();

    if (!body) {
      console.error("[generateCoverLetter] empty response from Claude", {
        stopReason: message.stop_reason,
        contentLength: message.content?.length ?? 0,
        firstBlockType: firstBlock?.type,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    return { ok: true, body };
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
    console.error("[generateCoverLetter] FAILED:", {
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
