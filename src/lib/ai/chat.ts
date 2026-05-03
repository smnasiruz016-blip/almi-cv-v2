"use server";

import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { stripRichText } from "@/lib/rich-text";
import { MODELS } from "@/lib/ai/models";
import { requireAIAccess } from "@/lib/ai/access";
import type { CVData } from "@/lib/cv-types";

const RATE_LIMIT_PER_HOUR = 20;
const HOUR_MS = 60 * 60 * 1000;

const MAX_MESSAGE = 2000;
const HISTORY_LIMIT_FOR_CONTEXT = 20;
const HISTORY_LIMIT_FOR_DISPLAY = 50;

const FRIENDLY_ERROR = "Couldn't reach the assistant — try again";

const MODEL_ID = MODELS.SONNET;

export type ChatRole = "user" | "assistant";

export type ChatMessageDTO = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type SendChatMessageResult =
  | { ok: true; reply: string; messageId: string }
  | { ok: false; error: string };

export type GetChatHistoryResult =
  | { ok: true; messages: ChatMessageDTO[] }
  | { ok: false; error: string };

export type ClearChatHistoryResult =
  | { ok: true }
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

function asRole(value: string): ChatRole {
  return value === "assistant" ? "assistant" : "user";
}

function buildCvContext(cv: CVData): string {
  const lines: string[] = [];
  const role = cv.basics?.role?.trim();
  const fullName = cv.basics?.fullName?.trim();
  if (fullName) lines.push(`Name: ${fullName}`);
  if (role) lines.push(`Current/most recent role: ${role}`);

  const summary = stripRichText(cv.basics?.summary ?? "").trim();
  if (summary) {
    lines.push("");
    lines.push("Summary (their current CV summary — quote it back when asked about the summary):");
    lines.push(summary.slice(0, 800));
  }

  const exp = (cv.experience ?? []).slice(0, 5);
  if (exp.length > 0) {
    lines.push("");
    lines.push("Work experience:");
    for (const e of exp) {
      const header = [e.role, e.company].filter(Boolean).join(" at ");
      lines.push(`- ${header || "(role)"}`);
      const bullets = (e.bullets ?? [])
        .map((b) => stripRichText(b).trim())
        .filter(Boolean)
        .slice(0, 5);
      for (const b of bullets) {
        lines.push(`  • ${b.slice(0, 240)}`);
      }
    }
  }

  const edu = (cv.education ?? []).slice(0, 4);
  if (edu.length > 0) {
    lines.push("");
    lines.push("Education:");
    for (const ed of edu) {
      const header = [ed.degree, ed.school].filter(Boolean).join(" — ");
      lines.push(`- ${header || "(degree)"}`);
    }
  }

  const skills = (cv.skills ?? []).slice(0, 40);
  if (skills.length > 0) {
    lines.push("");
    lines.push(`Skills: ${skills.join(", ")}`);
  }

  return lines.join("\n");
}

const BASE_SYSTEM_PROMPT = `You are AlmiCV's career assistant. You help users improve their CV, prepare for jobs, and navigate their career.

VOICE & STYLE:
- Friendly, expert, concise. Skip preamble like "Great question!" or "I'd be happy to help!".
- Lead with the answer. Then unpack briefly if useful.
- Use markdown when it aids readability — short bullet lists, **bold** for emphasis, short headings only when the answer has 3+ distinct sections. Avoid heavy headings for short answers.
- Never use code blocks unless the user asks for code.
- Two to four short paragraphs is plenty for most answers. Don't pad.

SCOPE — stay on-topic:
- CV writing, resume formatting, summary/bullet wording, skills selection
- Job search strategy, applications, networking
- Interview preparation, salary negotiation, offer evaluation
- Career growth, role transitions, professional development
- For off-topic questions (math help, code questions, personal life advice unrelated to career), politely redirect: "I focus on careers and CVs — happy to help with anything in that lane."

ACTIONS — advice only:
- You give advice. You do NOT modify the user's CV directly. Tell them what to change and where; they make the edit in the editor.
- Never claim you've updated their CV. Never say "I'll save that change."

HONESTY:
- If you don't know, say so. Don't invent statistics, salary ranges, or company-specific facts.
- If the user provides a CV in context, ground your advice in what's actually there. Don't invent jobs, skills, or accomplishments they didn't list.`;

const CV_GROUNDED_PROMPT_RULES = `

CV-AWARE MODE — the user has a CV loaded in this session. THE CV CONTENT BELOW IS THEIR ACTUAL CURRENT CV. Use it.
- When they ask about "my summary", "my experience", "my skills", refer to the SPECIFIC text in their CV.
- Quote short snippets back to them when giving feedback (e.g., "Your bullet 'Led migration of payments service' is strong, but...").
- Suggest concrete edits that reference real bullets, real roles, real skills they listed.
- Do NOT make up CV facts not in the data below.

THEIR CV:`;

const NO_CV_PROMPT_RULES = `

NO CV LOADED — the user hasn't selected a CV for this conversation.
- Give general advice grounded in best practices.
- When advice would benefit from their actual CV (e.g., "rewrite my summary"), suggest they open a CV in the editor so you can give specific feedback.
- Don't pretend to know their background.`;

function buildSystemPrompt(cvContext: string | null): string {
  if (cvContext && cvContext.trim().length > 0) {
    return `${BASE_SYSTEM_PROMPT}${CV_GROUNDED_PROMPT_RULES}\n${cvContext}`;
  }
  return `${BASE_SYSTEM_PROMPT}${NO_CV_PROMPT_RULES}`;
}

export async function sendChatMessage(input: {
  cvId?: string;
  message: string;
}): Promise<SendChatMessageResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[sendChatMessage] ANTHROPIC_API_KEY is missing or invalid",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const message = (input.message ?? "").trim();
    const cvId = (input.cvId ?? "").trim() || null;

    if (!message) {
      return { ok: false, error: "Message is required" };
    }
    if (message.length > MAX_MESSAGE) {
      return { ok: false, error: "Message is too long" };
    }

    let cvContext: string | null = null;
    if (cvId) {
      const row = await prisma.resume.findFirst({
        where: { id: cvId, userId: user.id },
        select: { data: true },
      });
      if (!row) {
        return { ok: false, error: "Selected CV not found" };
      }
      cvContext = buildCvContext(row.data as unknown as CVData);
    }

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the chat limit for this hour — try again later",
      };
    }

    // Pull last N turns for in-context conversation memory, scoped to this CV
    // (or global, when no cvId). Reverse so oldest is first.
    const historyRows = await prisma.chatMessage.findMany({
      where: {
        userId: user.id,
        cvId: cvId,
      },
      orderBy: { createdAt: "desc" },
      take: HISTORY_LIMIT_FOR_CONTEXT,
    });
    const historyOldestFirst = [...historyRows].reverse();

    const conversation: { role: ChatRole; content: string }[] = [];
    for (const row of historyOldestFirst) {
      conversation.push({ role: asRole(row.role), content: row.content });
    }
    conversation.push({ role: "user", content: message });

    const systemPrompt = buildSystemPrompt(cvContext);

    console.log("[sendChatMessage] sending request:", {
      model: MODEL_ID,
      hasCv: cvContext !== null,
      historyTurns: historyOldestFirst.length,
      messageLen: message.length,
    });

    const client = new Anthropic({ apiKey });
    const aiResponse = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 1500,
      system: systemPrompt,
      messages: conversation.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const firstBlock = aiResponse.content[0];
    const reply =
      firstBlock && firstBlock.type === "text" ? firstBlock.text.trim() : "";

    if (!reply) {
      console.error("[sendChatMessage] empty response from Claude", {
        stopReason: aiResponse.stop_reason,
        firstBlockType: firstBlock?.type,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    // Persist both the user turn and the assistant reply so the next call
    // can read them back as conversation history.
    await prisma.chatMessage.create({
      data: {
        userId: user.id,
        cvId,
        role: "user",
        content: message,
      },
    });
    const savedAssistant = await prisma.chatMessage.create({
      data: {
        userId: user.id,
        cvId,
        role: "assistant",
        content: reply,
      },
      select: { id: true },
    });

    return { ok: true, reply, messageId: savedAssistant.id };
  } catch (err) {
    const e = err as {
      message?: unknown;
      name?: unknown;
      status?: unknown;
      type?: unknown;
    };
    console.error("[sendChatMessage] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      status: e?.status,
      type: e?.type,
    });
    return { ok: false, error: FRIENDLY_ERROR };
  }
}

export async function getChatHistory(
  cvId?: string,
): Promise<GetChatHistoryResult> {
  try {
    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const scopedCvId = (cvId ?? "").trim() || null;

    if (scopedCvId) {
      const owned = await prisma.resume.findFirst({
        where: { id: scopedCvId, userId: user.id },
        select: { id: true },
      });
      if (!owned) return { ok: false, error: "Selected CV not found" };
    }

    const rows = await prisma.chatMessage.findMany({
      where: {
        userId: user.id,
        cvId: scopedCvId,
      },
      orderBy: { createdAt: "desc" },
      take: HISTORY_LIMIT_FOR_DISPLAY,
    });

    const messages: ChatMessageDTO[] = [...rows].reverse().map((r) => ({
      id: r.id,
      role: asRole(r.role),
      content: r.content,
      createdAt: r.createdAt.toISOString(),
    }));

    return { ok: true, messages };
  } catch (err) {
    console.error("[getChatHistory] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
    });
    return { ok: false, error: "Couldn't load chat history" };
  }
}

export async function clearChatHistory(
  cvId?: string,
): Promise<ClearChatHistoryResult> {
  try {
    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const scopedCvId = (cvId ?? "").trim() || null;

    await prisma.chatMessage.deleteMany({
      where: {
        userId: user.id,
        cvId: scopedCvId,
      },
    });

    return { ok: true };
  } catch (err) {
    console.error("[clearChatHistory] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
    });
    return { ok: false, error: "Couldn't clear chat — try again" };
  }
}
