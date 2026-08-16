// Server-side sanitisation of resume data, applied at the DATA BOUNDARY.
//
// WHY THIS EXISTS. Rich text was sanitised in exactly one place —
// RichTextEditor.tsx, in the browser — and the server persisted whatever
// arrived. A crafted POST to the save action skipped the editor entirely, and
// the stored HTML was then rendered by templates that call
// dangerouslySetInnerHTML. A client-side sanitiser is a formatting nicety; it
// is not a security control, because the client is the thing you are defending
// against.
//
// Fixing it here rather than in the templates is deliberate: there are 199
// template files and more arriving. Sanitising each render site means every new
// template is a new chance to forget, and the ones that forget look identical to
// the ones that do not. Sanitising once, on the way in, covers every template
// that exists and every template nobody has written yet.
//
// IT REUSES THE EXISTING ALLOWLIST. sanitizeRichText in src/lib/rich-text.tsx is
// the single policy (strong/b/em/i/u/br/p, no attributes, no URL schemes). A
// second allowlist here would be a second thing to keep in step, and the two
// would drift the first time someone allowed a tag in one of them.
//
// ONLY `RichText` FIELDS ARE TOUCHED, and that restraint matters. Plain-string
// fields (names, roles, companies, dates) are rendered as JSX text, which React
// already escapes. Running an HTML sanitiser over them would encode their
// ampersands — "R&D Engineer" would render as "R&amp;D Engineer" — so
// over-sanitising would trade an XSS bug for a corruption bug. The fields below
// are exactly the ones `CVData` declares as RichText, which are also exactly the
// ones that reach a dangerouslySetInnerHTML sink.

import { sanitizeRichText } from "@/lib/rich-text";
import type { CVData } from "@/lib/cv-types";

/** Sanitise a value that should be RichText. Non-strings are passed through
 *  untouched rather than coerced: a caller sending the wrong type is a schema
 *  problem, and silently stringifying it would hide that. */
function clean(value: unknown): unknown {
  return typeof value === "string" ? sanitizeRichText(value) : value;
}

/**
 * Return a copy of `data` with every RichText field run through the shared
 * allowlist. Never mutates the input.
 *
 * Defensive about shape on purpose: this runs on data that arrived over the
 * wire, so it must not throw on a missing `basics`, a `bullets` that is not an
 * array, or an entry that is not an object. Anything it does not recognise is
 * left exactly as it was — this function's job is to remove dangerous HTML, not
 * to validate the payload.
 */
export function sanitizeResumeData<T>(data: T): T {
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;

  const d = data as unknown as Partial<CVData> & Record<string, unknown>;
  const out: Record<string, unknown> = { ...d };

  // basics.summary
  if (d.basics && typeof d.basics === "object" && !Array.isArray(d.basics)) {
    const basics = d.basics as Record<string, unknown>;
    if ("summary" in basics) {
      out.basics = { ...basics, summary: clean(basics.summary) };
    }
  }

  // experience[].bullets[]
  if (Array.isArray(d.experience)) {
    out.experience = d.experience.map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return entry;
      const e = entry as Record<string, unknown>;
      // `CVData` declares bullets as RichText[], but the Batch 3 template types
      // declare the same field as a single RichText string (an HTML <ul>), and
      // those templates feed it straight to dangerouslySetInnerHTML. Handling
      // both keeps a row written in the other shape from slipping past
      // unsanitised — a skip here would be silent, which is the worst kind.
      if (typeof e.bullets === "string") return { ...e, bullets: clean(e.bullets) };
      if (!Array.isArray(e.bullets)) return entry;
      return { ...e, bullets: e.bullets.map(clean) };
    });
  }

  // achievements
  if ("achievements" in d) out.achievements = clean(d.achievements);

  return out as unknown as T;
}

/**
 * The RichText paths this module covers, as data. Exported so the verifier can
 * assert the list matches what `CVData` declares — if someone adds a fourth
 * RichText field and forgets this file, the check fails instead of quietly
 * leaving the new field unsanitised.
 */
export const SANITIZED_RICHTEXT_PATHS = [
  "basics.summary",
  "experience[].bullets[]",
  "achievements",
] as const;
