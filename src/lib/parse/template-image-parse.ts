// PR #52 — TemplateImage vision parse.
//
// Takes a public Vercel Blob URL pointing at a CV-template PNG and asks
// Claude Haiku 4.5 (vision) to extract every CVData field the image
// shows (placeholder name, role, contact, summary, experience entries,
// education entries, skills, etc.). The result is cached on the
// TemplateImage row's `parsedFields` column and used as the builder
// seed when a logged-in user clicks the card from /templates.
//
// Architectural choices:
//
//   - We do NOT reuse src/lib/studio/anthropic-client.ts. That client
//     is text-only and the Studio cost gate is wired around its
//     {systemPrompt, userPrompt} shape. Parse calls use vision content
//     blocks, so a small parallel client lives here. Both spend rolls
//     into the same StudioCostLedger / monthly cap via recordGeneration().
//
//   - Image is referenced by URL (not base64-streamed). Vercel Blob URLs
//     are public; Anthropic fetches them server-side, which is cheaper
//     than us downloading + base64-encoding + re-uploading the bytes.
//
//   - Output validation uses a permissive Zod schema mirroring CVData
//     with every field optional (we are taking a partial seed, not
//     building a complete CV — the user fills in what the image didn't
//     show). Schema rejection produces a `parseError` row; it does NOT
//     throw to the caller.
//
//   - Role hint comes from the JOB_ROLES taxonomy as a comma-joined
//     list of canonical names. We don't constrain the model to *only*
//     return values from the list — sometimes a template's placeholder
//     role doesn't match any taxonomy entry (e.g. fictional titles).
//     We accept whatever the model returns and surface the role string
//     to the builder; downstream code can resolve to a slug if needed.

import Anthropic from "@anthropic-ai/sdk";
import { randomUUID } from "crypto";
import { z } from "zod";
import {
  canGenerate,
  computeCostUsd,
  recordGeneration,
  type GenerationType,
} from "@/lib/studio-cost";
import { MODELS } from "@/lib/ai/models";
import { JOB_ROLES } from "@/lib/roles";
import type { CVData } from "@/lib/cv-types";

const PARSE_MODEL = MODELS.HAIKU;
const PARSE_GENERATION_TYPE: GenerationType = "template_image_parse";
const MAX_OUTPUT_TOKENS = 2500;

export type ParseTemplateImageResult =
  | { ok: true; parsed: Partial<CVData>; costUsd: number; generationId: string }
  | { ok: false; error: string; costUsd: number; generationId: string };

/** Permissive — every field is optional because no single template
 *  exposes every section. The Zod parse rejects rows where the model
 *  hallucinated structurally wrong shapes (e.g. experience returned as
 *  a string instead of an array), but accepts a sparse object. */
const ParsedSchema = z.object({
  basics: z
    .object({
      fullName: z.string().min(1).optional(),
      role: z.string().min(1).optional(),
      email: z.string().min(1).optional(),
      phone: z.string().min(1).optional(),
      location: z.string().min(1).optional(),
      website: z.string().min(1).optional(),
      linkedIn: z.string().min(1).optional(),
      summary: z.string().min(1).optional(),
    })
    .optional(),
  experience: z
    .array(
      z.object({
        company: z.string().min(1),
        role: z.string().min(1),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        bullets: z.array(z.string().min(1)).optional(),
      }),
    )
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(1),
        degree: z.string().min(1),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .optional(),
  skills: z.array(z.string().min(1)).optional(),
  projects: z
    .array(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        url: z.string().optional(),
      }),
    )
    .optional(),
  languages: z
    .array(z.object({ name: z.string().min(1), level: z.string().min(1) }))
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string().min(1),
        issuer: z.string().optional(),
        year: z.string().optional(),
      }),
    )
    .optional(),
  interests: z.array(z.string().min(1)).optional(),
});

/** Normalizes a Claude response that may have ```json fences. */
function stripFences(raw: string): string {
  let s = raw.trim();
  if (s.startsWith("```")) {
    const nl = s.indexOf("\n");
    if (nl !== -1) s = s.slice(nl + 1);
    if (s.endsWith("```")) s = s.slice(0, -3);
    s = s.trim();
  }
  const open = s.indexOf("{");
  const close = s.lastIndexOf("}");
  if (open !== -1 && close > open) return s.slice(open, close + 1);
  return s;
}

function buildSystemPrompt(): string {
  // Closed-list role hint. Kept as a flat comma-joined string instead
  // of a numbered list so it costs fewer tokens. The model is told to
  // prefer matches but is allowed to return free-form when nothing fits.
  const roleHint = JOB_ROLES.map((r) => r.name).join(", ");

  return [
    "You are a structured-data extractor.",
    "",
    "Input: a single image of a CV / résumé template. The image contains",
    "placeholder content (names like 'John Smith', sample roles, dummy",
    "contact info, made-up companies) — that is expected. Your job is to",
    "transcribe what the image literally shows into a JSON object that",
    "matches the schema below. Do NOT invent values not visible in the",
    "image. Omit any field that is not legible.",
    "",
    "Schema (all fields optional; omit when absent in the image):",
    "{",
    '  "basics": {',
    '    "fullName": string,',
    '    "role": string,           // job title shown under the name',
    '    "email": string,',
    '    "phone": string,',
    '    "location": string,        // e.g. "San Francisco, CA"',
    '    "website": string,',
    '    "linkedIn": string,',
    '    "summary": string          // about-me / profile paragraph (plain text)',
    "  },",
    '  "experience": [',
    "    {",
    '      "company": string,',
    '      "role": string,',
    '      "location": string,',
    '      "startDate": string,    // free-form as shown ("Jan 2022", "2020")',
    '      "endDate": string,       // "Present" if ongoing',
    '      "bullets": string[]      // one entry per visible bullet point',
    "    }",
    "  ],",
    '  "education": [',
    "    {",
    '      "school": string,',
    '      "degree": string,',
    '      "location": string,',
    '      "startDate": string,',
    '      "endDate": string,',
    '      "notes": string',
    "    }",
    "  ],",
    '  "skills": string[],',
    '  "projects": [{ "name": string, "description": string, "url": string }],',
    '  "languages": [{ "name": string, "level": string }],',
    '  "certifications": [{ "name": string, "issuer": string, "year": string }],',
    '  "interests": string[]',
    "}",
    "",
    "Role-matching guidance: when transcribing basics.role, prefer the",
    "closest match from this canonical list when the placeholder role is",
    "ambiguous; otherwise transcribe verbatim:",
    roleHint,
    "",
    "Output rules:",
    "1. Respond with strict JSON only. No prose, no markdown fences, no",
    "   commentary.",
    "2. Omit any object/array whose fields you cannot read confidently.",
    "3. Bullets should be plain text — strip leading bullet glyphs",
    "   (•, ·, -, →) and trim whitespace.",
    "4. If the image is unreadable, return an empty object {}.",
    "5. For experience and education arrays: only include entries where you",
    "   can clearly read BOTH the company/school name AND the role/degree.",
    "   If either field is missing, illegible, or empty in the image, OMIT",
    "   the entire entry — do not emit it with empty strings or placeholder",
    "   text. Same rule applies to projects (name + description required),",
    "   languages (name + level required), and certifications (name required).",
  ].join("\n");
}

// Placeholder patterns — values that the parse module nulls out after a
// successful Zod parse so the builder shows the user blank fields
// instead of "YOUR NAME" / "your.email@email.com" / etc.
//
// For optional basics.* fields the matching key is deleted from the
// payload entirely. For required sub-fields on experience/education
// (company, role, school, degree) we use EXACT-match-only patterns to
// avoid nuking legitimate company names that happen to contain
// substrings like "company" or "name" — and when we hit one of those,
// we drop the entire entry rather than emit empty required strings.
const PLACEHOLDER_PATTERNS = {
  fullName: [
    /^your name$/i,
    /^john doe$/i,
    /^jane doe$/i,
    /^firstname lastname$/i,
    /^name$/i,
    /^client name$/i,
    /^full name$/i,
  ],
  email: [
    /your\.?email/i,
    /email@/i,
    /hello@reallygreatsite/i,
    /info@example/i,
    /name@/i,
    /you@/i,
  ],
  phone: [
    /^(\+?1?\s?)?(555|123)[\s.-]?(555|0123|1234)/i,
    /^xxx[\s.-]/i,
    /^000/,
    /your phone/i,
  ],
  location: [
    /^city,?\s*(country|state|zip)/i,
    /^your (city|address|location)/i,
    /^123 main st/i,
    /^street address/i,
  ],
  linkedIn: [
    /linkedin\.com\/in\/(yourname|username|johndoe|reallygreatsite)/i,
  ],
  website: [
    /(reallygreatsite|example|yoursite|yourdomain)\.com/i,
  ],
} as const;

// Exact-only — match against the entire trimmed value (case-insensitive).
const PLACEHOLDER_COMPANY_EXACT = new Set([
  "company name",
  "your company",
  "acme corp",
]);
const PLACEHOLDER_SCHOOL_EXACT = new Set([
  "school name",
  "university name",
  "your university",
]);

function matchesAny(value: string, patterns: readonly RegExp[]): boolean {
  return patterns.some((p) => p.test(value));
}

/** Pre-Zod filter. Drops array entries whose REQUIRED sub-fields are
 *  missing or empty in the raw model output. This is the belt-and-
 *  suspenders behind the prompt rule that asks the model to omit
 *  incomplete entries. Run BEFORE Zod so the schema's min(1) guards
 *  don't reject the whole row when only one entry is bad. */
function filterIncompleteEntries(raw: unknown): unknown {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
  const o = raw as Record<string, unknown>;

  function nonEmpty(v: unknown): boolean {
    return typeof v === "string" && v.trim().length > 0;
  }
  function filterArray<T extends Record<string, unknown>>(
    arr: unknown,
    required: ReadonlyArray<keyof T>,
  ): T[] | unknown {
    if (!Array.isArray(arr)) return arr;
    return arr.filter(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        required.every((k) => nonEmpty((entry as Record<string, unknown>)[k as string])),
    );
  }

  if ("experience" in o) o.experience = filterArray(o.experience, ["company", "role"]);
  if ("education" in o) o.education = filterArray(o.education, ["school", "degree"]);
  if ("projects" in o) o.projects = filterArray(o.projects, ["name", "description"]);
  if ("languages" in o) o.languages = filterArray(o.languages, ["name", "level"]);
  if ("certifications" in o) o.certifications = filterArray(o.certifications, ["name"]);
  return o;
}

/** Post-Zod placeholder cleanup. Removes obvious template placeholders
 *  (YOUR NAME, JOHN DOE, your.email@…, 555-0123, etc.) so the builder
 *  shows empty fields the user fills fresh rather than transcribed
 *  template dummy text. Mutates and returns the input. */
function dropPlaceholders(
  parsed: z.infer<typeof ParsedSchema>,
): z.infer<typeof ParsedSchema> {
  if (parsed.basics) {
    const b = parsed.basics;
    if (b.fullName && matchesAny(b.fullName.trim(), PLACEHOLDER_PATTERNS.fullName)) {
      delete b.fullName;
    }
    if (b.email && matchesAny(b.email.trim(), PLACEHOLDER_PATTERNS.email)) {
      delete b.email;
    }
    if (b.phone && matchesAny(b.phone.trim(), PLACEHOLDER_PATTERNS.phone)) {
      delete b.phone;
    }
    if (b.location && matchesAny(b.location.trim(), PLACEHOLDER_PATTERNS.location)) {
      delete b.location;
    }
    if (b.linkedIn && matchesAny(b.linkedIn.trim(), PLACEHOLDER_PATTERNS.linkedIn)) {
      delete b.linkedIn;
    }
    if (b.website && matchesAny(b.website.trim(), PLACEHOLDER_PATTERNS.website)) {
      delete b.website;
    }
  }

  if (parsed.experience) {
    parsed.experience = parsed.experience.filter(
      (e) => !PLACEHOLDER_COMPANY_EXACT.has(e.company.trim().toLowerCase()),
    );
  }
  if (parsed.education) {
    parsed.education = parsed.education.filter(
      (e) => !PLACEHOLDER_SCHOOL_EXACT.has(e.school.trim().toLowerCase()),
    );
  }
  return parsed;
}

export async function parseTemplateImageFromUrl(
  blobUrl: string,
  founderEmail: string,
): Promise<ParseTemplateImageResult> {
  const generationId = randomUUID();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.length < 20) {
    return {
      ok: false,
      error: "ANTHROPIC_API_KEY missing — parse skipped.",
      costUsd: 0,
      generationId,
    };
  }

  // Pre-flight budget gate. Conservative estimate: ~1500 input tokens
  // for the image + ~1500 for the (large) system prompt with role hint
  // + the maxTokens output budget. Round up + 1.5x for safety, same
  // policy as the Studio path.
  const inputEstimate = 3000;
  const estimateUsd =
    computeCostUsd(PARSE_MODEL, inputEstimate, MAX_OUTPUT_TOKENS) * 1.5;
  const gate = await canGenerate(estimateUsd);
  if (!gate.allowed) {
    return {
      ok: false,
      error: gate.reason ?? "Monthly budget would be exceeded.",
      costUsd: 0,
      generationId,
    };
  }

  const client = new Anthropic({ apiKey });
  const systemPrompt = buildSystemPrompt();

  let message;
  try {
    message = await client.messages.create({
      model: PARSE_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "url", url: blobUrl },
            },
            {
              type: "text",
              text: "Extract the CV fields from this template image. Return JSON only.",
            },
          ],
        },
      ],
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    await recordGeneration({
      generationId,
      model: PARSE_MODEL,
      inputTokens: 0,
      outputTokens: 0,
      founderEmail,
      success: false,
      errorMessage: `vision api: ${errorMessage}`,
      generationType: PARSE_GENERATION_TYPE,
    });
    return {
      ok: false,
      error: `Anthropic API error: ${errorMessage}`,
      costUsd: 0,
      generationId,
    };
  }

  const inputTokens = message.usage.input_tokens;
  const outputTokens = message.usage.output_tokens;
  const costUsd = computeCostUsd(PARSE_MODEL, inputTokens, outputTokens);

  const firstBlock = message.content[0];
  const text =
    firstBlock && firstBlock.type === "text" ? firstBlock.text : "";

  if (!text) {
    await recordGeneration({
      generationId,
      model: PARSE_MODEL,
      inputTokens,
      outputTokens,
      founderEmail,
      success: false,
      errorMessage: `empty response (stop_reason=${message.stop_reason ?? "unknown"})`,
      generationType: PARSE_GENERATION_TYPE,
    });
    return {
      ok: false,
      error: `Empty Claude response (stop_reason=${message.stop_reason ?? "unknown"})`,
      costUsd,
      generationId,
    };
  }

  const jsonStr = stripFences(text);
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(jsonStr);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await recordGeneration({
      generationId,
      model: PARSE_MODEL,
      inputTokens,
      outputTokens,
      founderEmail,
      success: false,
      errorMessage: `json parse: ${msg}`,
      generationType: PARSE_GENERATION_TYPE,
    });
    return {
      ok: false,
      error: `JSON parse failed: ${msg}`,
      costUsd,
      generationId,
    };
  }

  // Pre-validation cleanup — drop array entries where the model emitted
  // empty or missing required sub-fields despite the prompt rule.
  // Without this, ONE bad entry kills the whole row's parsedFields.
  const filtered = filterIncompleteEntries(parsedJson);

  const validated = ParsedSchema.safeParse(filtered);
  if (!validated.success) {
    const summary = validated.error.issues
      .slice(0, 3)
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    await recordGeneration({
      generationId,
      model: PARSE_MODEL,
      inputTokens,
      outputTokens,
      founderEmail,
      success: false,
      errorMessage: `zod: ${summary}`,
      generationType: PARSE_GENERATION_TYPE,
    });
    return {
      ok: false,
      error: `Schema validation failed: ${summary}`,
      costUsd,
      generationId,
    };
  }

  await recordGeneration({
    generationId,
    model: PARSE_MODEL,
    inputTokens,
    outputTokens,
    founderEmail,
    success: true,
    generationType: PARSE_GENERATION_TYPE,
  });

  // Post-validation cleanup — blank obvious template placeholders so
  // the builder shows the user empty fields instead of transcribed
  // dummy text. Runs AFTER Zod so the schema's typing still holds.
  const cleaned = dropPlaceholders(validated.data);

  return {
    ok: true,
    // Zod's parsed value is structurally narrower than CVData (no
    // RichText brand, no style/language metadata) — cast through to
    // Partial<CVData> at the boundary. The builder merges with
    // mayaRodriguez defaults so the missing fields are filled in.
    parsed: cleaned as Partial<CVData>,
    costUsd,
    generationId,
  };
}
