// Safe serialisation for <script type="application/ld+json"> blocks.
//
// THE PROBLEM JSON.stringify DOES NOT SOLVE. Inside a <script> element the HTML
// parser is still looking for the closing tag, and it finds it by scanning for
// the literal characters "</script". JSON.stringify escapes quotes and
// backslashes but leaves "<" alone, so any string that reaches the JSON-LD
// payload containing "</script>" ends the block early and everything after it
// is parsed as HTML. That is a script-injection primitive, not a formatting
// nit.
//
// Escaping "<" as its < form is invisible to JSON.parse — the structured
// data is byte-identical to a consumer — and removes the primitive entirely.
//
// This was already being done correctly in exactly ONE of the eight ld+json
// blocks in the codebase (jobs/[country]). Seven were passing raw
// JSON.stringify output. The fix is one helper rather than seven copies of a
// regex, because seven copies is how the eighth one gets forgotten.

/**
 * Serialise a JSON-LD object for embedding in a <script> tag.
 *
 * Today the payloads are server-built, so the risk is latent rather than live —
 * but these blocks interpolate role names, country names and page titles that
 * come from data files, and "the data is trusted" is exactly the assumption
 * that stops being true when someone adds a user-supplied field.
 */
export function ldJsonSafe(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
