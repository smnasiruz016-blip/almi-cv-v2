// Centralized Anthropic model registry.
// All AI features should import from here so we have ONE place to update
// when models change.
//
// Verified current as of 2026-05-01 against Anthropic docs.

export const MODELS = {
  // Default workhorse — bullet rewrites, summaries, cover letters,
  // section generation, skills extraction. Best quality/cost balance.
  SONNET: "claude-sonnet-4-6",

  // Use for short, fast, cheap calls — e.g. translation, single-line edits.
  HAIKU: "claude-haiku-4-5-20251001",

  // Reserve for hardest tasks — full job-tailored CV rewrites,
  // interview prep generation. Highest quality, slower, costlier.
  OPUS: "claude-opus-4-7",
} as const;

export type ModelId = typeof MODELS[keyof typeof MODELS];
