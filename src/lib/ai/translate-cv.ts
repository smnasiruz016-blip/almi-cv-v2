"use server";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { MODELS } from "@/lib/ai/models";
import { requireAIAccess } from "@/lib/ai/access";
import type { CVData, LanguageCode } from "@/lib/cv-types";

const RATE_LIMIT_PER_HOUR = 10;
const HOUR_MS = 60 * 60 * 1000;
const FRIENDLY_ERROR = "Couldn't translate your CV right now — try again";
const MODEL_ID = MODELS.SONNET;

export type SupportedLanguage = Exclude<LanguageCode, "en">;

export const SUPPORTED_LANGUAGES: {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  rtl: boolean;
}[] = [
  { code: "ur", name: "Urdu", nativeName: "اردو", rtl: true },
  { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  { code: "de", name: "German", nativeName: "Deutsch", rtl: false },
  { code: "es", name: "Spanish", nativeName: "Español", rtl: false },
  { code: "fr", name: "French", nativeName: "Français", rtl: false },
  { code: "it", name: "Italian", nativeName: "Italiano", rtl: false },
  { code: "pt", name: "Portuguese", nativeName: "Português", rtl: false },
  { code: "zh", name: "Mandarin Chinese", nativeName: "中文", rtl: false },
];

const LANGUAGE_NAME: Record<SupportedLanguage, string> = Object.fromEntries(
  SUPPORTED_LANGUAGES.map((l) => [l.code, l.name]),
) as Record<SupportedLanguage, string>;

export type TranslatedCV = {
  basics: {
    role?: string;
    location?: string;
    summary?: string;
  };
  experience: Array<{
    role?: string;
    location?: string;
    bullets?: string[];
  }>;
  education: Array<{
    degree?: string;
    location?: string;
    notes?: string;
  }>;
  skills: string[];
  projects?: Array<{ description?: string }>;
  languages?: Array<{ name?: string; level?: string }>;
  awards?: Array<{ title?: string }>;
  certifications?: Array<{ name?: string }>;
  interests?: string[];
  sectionLabels: {
    profile: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    languages: string;
    awards: string;
    certifications: string;
    interests: string;
  };
};

export type TranslateCvResult =
  | {
      ok: true;
      translated: TranslatedCV;
      languageCode: SupportedLanguage;
      languageName: string;
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

const SYSTEM_PROMPT = `You are an expert professional translator specializing in CVs and résumés. The user will provide a CV as JSON. Translate ALL human-readable fields into the requested target language.

OUTPUT — return ONLY valid JSON matching the schema below. No markdown fences, no preamble, no commentary, no trailing text.

WHAT TO TRANSLATE:
- All natural-language prose: summary, experience bullets, education notes, project descriptions, interests.
- Job titles / roles (e.g., "Software Engineer" → German "Softwareentwickler").
- Cities and country names where they have a well-known native form (e.g., "Munich" → German "München", but keep "San Francisco").
- Skills that are general words (e.g., "communication", "leadership").
- Language names and proficiency levels (e.g., "English (fluent)" → German "Englisch (fließend)").
- Section labels (PROFILE, EXPERIENCE, EDUCATION, SKILLS, PROJECTS, LANGUAGES, AWARDS, CERTIFICATIONS, INTERESTS) into idiomatic uppercase native equivalents.
- Generic certification names ("First Aid Certificate") and award titles where applicable.
- Degree names ("Bachelor of Science" → "Licenciatura en Ciencias" / "Bachelor of Science je nach Region" — use the standard local equivalent).

WHAT TO KEEP IN ORIGINAL LANGUAGE:
- Proper nouns: company names, school/university names, brand product names, branded certification names ("AWS Certified Solutions Architect", "PMP", "CFA").
- Technologies, frameworks, tools, programming languages ("React", "PostgreSQL", "Kubernetes", "Figma", "Jira").
- Email, phone, URL, linkedIn — DO NOT INCLUDE in output (omit the field).
- Names of people.
- Dates — DO NOT INCLUDE in output.
- City names with no clear native form.

RICH TEXT — summary and experience bullets may contain inline HTML tags (<strong>, <em>, <u>, <br>, <p>). PRESERVE these tags exactly around translated text. Do not invent new tags. Do not strip existing ones.

PROFESSIONAL TONE — this is a job application. Use formal/business register appropriate to the target language. Match the original CV's level of confidence — do not soften or exaggerate.

ARRAY ORDER — output arrays in the SAME order as the input. The same number of elements. If the input has 5 experience entries, output 5 entries. If experience entry index 2 has 4 bullets, output 4 translated bullets at index 2.

OUTPUT JSON SHAPE:
{
  "basics": { "role": "...", "location": "...", "summary": "..." },
  "experience": [{ "role": "...", "location": "...", "bullets": ["..."] }],
  "education": [{ "degree": "...", "location": "...", "notes": "..." }],
  "skills": ["..."],
  "projects": [{ "description": "..." }],
  "languages": [{ "name": "...", "level": "..." }],
  "awards": [{ "title": "..." }],
  "certifications": [{ "name": "..." }],
  "interests": ["..."],
  "sectionLabels": {
    "profile": "...",
    "experience": "...",
    "education": "...",
    "skills": "...",
    "projects": "...",
    "languages": "...",
    "awards": "...",
    "certifications": "...",
    "interests": "..."
  }
}

OMIT optional fields entirely if they are empty in the source. The "sectionLabels" object MUST always be fully populated (all 9 keys) regardless of which sections exist in the source — labels are needed for any sections the user might add later.

Section labels should be UPPERCASE in the target language when the source script supports case (Latin, Cyrillic). For scripts without case (Arabic, Chinese), use idiomatic native section headings without artificial casing.

If you cannot translate any single field, return your best attempt. Never refuse, never explain, never add commentary outside the JSON.`;

const StringOrUndef = z.string().optional();

const TranslatedSchema = z.object({
  basics: z
    .object({
      role: StringOrUndef,
      location: StringOrUndef,
      summary: StringOrUndef,
    })
    .partial()
    .default({}),
  experience: z
    .array(
      z
        .object({
          role: StringOrUndef,
          location: StringOrUndef,
          bullets: z.array(z.string()).optional(),
        })
        .partial(),
    )
    .default([]),
  education: z
    .array(
      z
        .object({
          degree: StringOrUndef,
          location: StringOrUndef,
          notes: StringOrUndef,
        })
        .partial(),
    )
    .default([]),
  skills: z.array(z.string()).default([]),
  projects: z
    .array(z.object({ description: StringOrUndef }).partial())
    .optional(),
  languages: z
    .array(
      z.object({ name: StringOrUndef, level: StringOrUndef }).partial(),
    )
    .optional(),
  awards: z.array(z.object({ title: StringOrUndef }).partial()).optional(),
  certifications: z
    .array(z.object({ name: StringOrUndef }).partial())
    .optional(),
  interests: z.array(z.string()).optional(),
  sectionLabels: z.object({
    profile: z.string().min(1),
    experience: z.string().min(1),
    education: z.string().min(1),
    skills: z.string().min(1),
    projects: z.string().min(1),
    languages: z.string().min(1),
    awards: z.string().min(1),
    certifications: z.string().min(1),
    interests: z.string().min(1),
  }),
});

const FENCE_RE = /^\s*```(?:json)?\s*\n?|\n?```\s*$/gi;

function stripJsonFences(raw: string): string {
  return raw.replace(FENCE_RE, "").trim();
}

function isSupportedLanguage(v: unknown): v is SupportedLanguage {
  return typeof v === "string" && v in LANGUAGE_NAME;
}

/**
 * Build a compact JSON view of the CV for the model. Strips identity-only
 * fields (email/phone/URLs/dates/names) the model is told not to translate.
 */
function buildSourcePayload(cv: CVData) {
  return {
    basics: {
      role: cv.basics?.role ?? "",
      location: cv.basics?.location ?? "",
      summary: cv.basics?.summary ?? "",
    },
    experience: (cv.experience ?? []).map((e) => ({
      role: e.role ?? "",
      location: e.location ?? "",
      bullets: e.bullets ?? [],
    })),
    education: (cv.education ?? []).map((e) => ({
      degree: e.degree ?? "",
      location: e.location ?? "",
      notes: e.notes ?? "",
    })),
    skills: cv.skills ?? [],
    projects: (cv.projects ?? []).map((p) => ({ description: p.description ?? "" })),
    languages: (cv.languages ?? []).map((l) => ({
      name: l.name ?? "",
      level: l.level ?? "",
    })),
    awards: (cv.awards ?? []).map((a) => ({ title: a.title ?? "" })),
    certifications: (cv.certifications ?? []).map((c) => ({ name: c.name ?? "" })),
    interests: cv.interests ?? [],
  };
}

export async function translateCv(input: {
  cvId: string;
  targetLanguage: string;
}): Promise<TranslateCvResult> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.length < 20) {
      console.error(
        "[translateCv] ANTHROPIC_API_KEY is missing or invalid in process.env",
      );
      return { ok: false, error: "AI service not configured" };
    }

    const user = await requireUser();

    const access = await requireAIAccess(user.id);
    if (!access.ok) return { ok: false, error: access.error };

    const cvId = (input.cvId ?? "").trim();
    if (!cvId) return { ok: false, error: "CV id is required" };

    if (!isSupportedLanguage(input.targetLanguage)) {
      return { ok: false, error: "Unsupported target language" };
    }
    const languageCode = input.targetLanguage;
    const languageName = LANGUAGE_NAME[languageCode];

    const row = await prisma.resume.findFirst({
      where: { id: cvId, userId: user.id },
      select: { data: true },
    });
    if (!row) return { ok: false, error: "Resume not found" };
    const cv = row.data as unknown as CVData;

    const hasContent =
      (cv.basics?.summary ?? "").trim().length > 0 ||
      (cv.experience ?? []).length > 0 ||
      (cv.skills ?? []).length > 0 ||
      (cv.education ?? []).length > 0;
    if (!hasContent) {
      return {
        ok: false,
        error: "Your CV doesn't have enough content to translate",
      };
    }

    if (!checkRateLimit(user.id)) {
      return {
        ok: false,
        error: "You've hit the limit for this hour — try again later",
      };
    }

    const sourcePayload = buildSourcePayload(cv);
    const userMessage = `Target language: ${languageName} (code: ${languageCode})

SOURCE CV (JSON):
${JSON.stringify(sourcePayload, null, 2)}

Return the translated JSON now.`;

    console.log("[translateCv] sending request:", {
      model: MODEL_ID,
      cvId,
      targetLanguage: languageCode,
      experienceCount: sourcePayload.experience.length,
      educationCount: sourcePayload.education.length,
      skillsCount: sourcePayload.skills.length,
      summaryLen: sourcePayload.basics.summary.length,
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
      console.error("[translateCv] empty response from Claude", {
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
      console.error("[translateCv] JSON.parse failed", {
        rawHead: cleaned.slice(0, 300),
        rawTail: cleaned.slice(-200),
        message:
          parseErr instanceof Error ? parseErr.message : String(parseErr),
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    const validated = TranslatedSchema.safeParse(parsed);
    if (!validated.success) {
      console.error("[translateCv] schema validation failed", {
        issues: validated.error.issues.slice(0, 5),
      });
      return { ok: false, error: FRIENDLY_ERROR };
    }

    return {
      ok: true,
      translated: validated.data as TranslatedCV,
      languageCode,
      languageName,
    };
  } catch (err) {
    const e = err as {
      message?: unknown;
      name?: unknown;
      status?: unknown;
      type?: unknown;
    };
    console.error("[translateCv] FAILED:", {
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      status: e?.status,
      type: e?.type,
    });
    return { ok: false, error: FRIENDLY_ERROR };
  }
}
