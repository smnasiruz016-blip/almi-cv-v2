"use server";

import Anthropic from "@anthropic-ai/sdk";
import { requireUser } from "@/lib/auth";
import { MODELS } from "@/lib/ai/models";
import { requireAIAccess } from "@/lib/ai/access";

const RATE_LIMIT_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;

const MAX_ROLE = 100;
const MAX_YEARS = 20;
const MAX_SKILLS = 300;
const MAX_ACHIEVEMENTS = 500;
const MAX_AUDIENCE = 200;

// LinkedIn's hard cap for the About section is 2,600 characters.
const LINKEDIN_HARD_CAP = 2600;

const FRIENDLY_ERROR = "Couldn't generate right now — try again";

const MODEL_ID = MODELS.SONNET;

export type LinkedInAboutTone = "professional" | "conversational" | "bold";

export type GenerateLinkedInAboutResult =
  | { ok: true; short: string; medium: string; long: string }
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

const SYSTEM_PROMPT = `You are an expert LinkedIn copywriter. The user provides structured details about their career. You produce THREE polished versions of a LinkedIn About section — short, medium, and long — all matching the requested tone.

OUTPUT FORMAT — return ONLY valid JSON. No markdown fences, no preamble, no commentary, no trailing text. The shape MUST be exactly:
{
  "short": "<text>",
  "medium": "<text>",
  "long": "<text>"
}

LENGTH TARGETS (LinkedIn renders the About section as plain text — line breaks are honored):
- short: ~500 characters. A punchy hook + one or two sentences. Useful as a headline-adjacent blurb.
- medium: ~1,300 characters. Hook + value proposition + one or two proof points + a soft CTA. Usable as the full About for most professionals.
- long: ~2,400 characters (must stay under 2,600 — LinkedIn's hard cap). Full narrative arc: hook, story, value proposition, two or three proof points, what excites you, soft CTA. Use blank lines between paragraphs.

VOICE & STYLE — non-negotiable:
- First person throughout ("I help...", "I build..."). Never third person.
- Open with a HOOK — a vivid sentence or question. NEVER open with a job title, with the user's role label, or with cliché phrases.
- Match the requested tone PRECISELY:
  - professional: confident, polished, executive-register first person. Restrained warmth.
  - conversational: warm, natural, lightly informal, like a great colleague telling you what they do at a coffee shop. Short sentences welcome.
  - bold: high-energy, direct, achievement-forward. Strong verbs. No hedging.
- BANNED phrases (do not use any form of these): "results-driven", "passionate about", "synergy", "leverage", "team player", "self-starter", "go-getter", "results-oriented", "out-of-the-box", "thought leader", "guru", "ninja", "rockstar".
- Use ONLY facts the user provides. Never invent specific employer names, dollar amounts, percentages, dates, certifications, or technologies the user did not mention.
- Active voice. Concrete language.

CTA RULES:
- End each version with a soft, specific call-to-action shaped to the targetAudience the user provided.
  - If audience is "recruiters": invite outreach about specific roles/relocation/availability.
  - If audience is "clients": invite project conversations or DMs about scope.
  - If audience is "founders": invite advisory / collaboration / co-build chats.
  - If audience is generic or empty: invite connection from anyone working in adjacent space.
- Keep the CTA to one short sentence. No "open to opportunities" or "always learning" cliches.

PROOF & FACTS:
- Use the achievements field for proof. If none provided, lean on years of experience and top skills as proof — never fabricate.
- If years of experience is qualitative ("a decade", "5+"), use the user's exact phrasing.

If you cannot satisfy ALL rules, still return the best valid JSON you can — never refuse, never explain, never apologize.`;

const FENCE_RE = /^\s*```(?:json)?\s*\n?|\n?```\s*$/gi;

function stripJsonFences(raw: string): string {
  return raw.replace(FENCE_RE, "").trim();
}

function clampToCap(s: string, cap: number): string {
  if (s.length <= cap) return s;
  // Soft truncate: prefer the last sentence boundary before the cap.
  const sliced = s.slice(0, cap);
  const lastBoundary = Math.max(
    sliced.lastIndexOf(". "),
    sliced.lastIndexOf("!\n"),
    sliced.lastIndexOf("?\n"),
    sliced.lastIndexOf("\n\n"),
  );
  if (lastBoundary > cap - 200) {
    return sliced.slice(0, lastBoundary + 1).trim();
  }
  return sliced.trim();
}

export async function generateLinkedInAbout(input: {
  currentRole: string;
  yearsExperience: string;
  topSkills?: string;
  achievements?: string;
  targetAudience?: string;
  tone: LinkedInAboutTone;
}): Promise<GenerateLinkedInAboutResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[generateLinkedInAbout] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const currentRole = (input.currentRole ?? "").trim();
    const yearsExperience = (input.yearsExperience ?? "").trim();
    const topSkills = (input.topSkills ?? "").trim();
    const achievements = (input.achievements ?? "").trim();
    const targetAudience = (input.targetAudience ?? "").trim();

    if (!currentRole) {
      return { ok: false, error: "Current role is required" };
    }
    if (!yearsExperience) {
      return { ok: false, error: "Years of experience is required" };
    }
    if (currentRole.length > MAX_ROLE) {
      return { ok: false, error: "Current role is too long" };
    }
    if (yearsExperience.length > MAX_YEARS) {
      return { ok: false, error: "Years of experience is too long" };
    }
    if (topSkills.length > MAX_SKILLS) {
      return { ok: false, error: "Top skills field is too long" };
    }
    if (achievements.length > MAX_ACHIEVEMENTS) {
      return { ok: false, error: "Achievements field is too long" };
    }
    if (targetAudience.length > MAX_AUDIENCE) {
      return { ok: false, error: "Target audience is too long" };
    }

    const tone: LinkedInAboutTone =
      input.tone === "professional" ||
      input.tone === "conversational" ||
      input.tone === "bold"
        ? input.tone
        : "professional";

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the limit for this hour — try again later",
      };
    }

    const userMessage = `Tone: ${tone}
Current role / headline: ${currentRole}
Years of experience: ${yearsExperience}
Top skills: ${topSkills || "(not provided)"}
Key achievements: ${achievements || "(not provided)"}
Target audience: ${targetAudience || "(not provided)"}

Return the JSON now.`;

    console.log("[generateLinkedInAbout] sending request:", {
      model: MODEL_ID,
      tone,
      roleLength: currentRole.length,
      hasSkills: topSkills.length > 0,
      hasAchievements: achievements.length > 0,
      hasAudience: targetAudience.length > 0,
    });

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 2400,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const firstBlock = message.content[0];
    const raw =
      firstBlock && firstBlock.type === "text" ? firstBlock.text : "";
    const cleaned = stripJsonFences(raw);

    if (!cleaned) {
      console.error("[generateLinkedInAbout] empty response from Claude", {
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
      console.error("[generateLinkedInAbout] JSON.parse failed", {
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
      typeof (parsed as { short?: unknown }).short !== "string" ||
      typeof (parsed as { medium?: unknown }).medium !== "string" ||
      typeof (parsed as { long?: unknown }).long !== "string"
    ) {
      console.error("[generateLinkedInAbout] invalid JSON shape", {
        keys: parsed && typeof parsed === "object" ? Object.keys(parsed) : [],
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const obj = parsed as { short: string; medium: string; long: string };
    const short = obj.short.trim();
    const medium = obj.medium.trim();
    const long = clampToCap(obj.long.trim(), LINKEDIN_HARD_CAP);

    if (!short || !medium || !long) {
      console.error("[generateLinkedInAbout] one or more lengths empty", {
        shortLen: short.length,
        mediumLen: medium.length,
        longLen: long.length,
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    return { ok: true, short, medium, long };
  } catch (err) {
    const e = err as {
      message?: unknown;
      name?: unknown;
      status?: unknown;
      type?: unknown;
    };
    console.error("[generateLinkedInAbout] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      status: e?.status,
      type: e?.type,
    });
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
