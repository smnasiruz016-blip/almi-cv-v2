"use client";

// Stage 3b verification UI — a single founder-only button that POSTs
// to /api/admin/studio/generate-test and dumps the result on the page.
//
// This is INTENTIONALLY not the variant picker. Stage 3c will add the
// real Studio UI (form for role/mood/variant count, side-by-side live
// renders of generated recipes, accept/reject buttons, persist-on-accept
// flow). This button only proves the integration works end-to-end on
// production with cost protection in place.

import { useState } from "react";
import { RecipeRenderer } from "@/components/templates/engine/render-recipe";
import type { TemplateRecipe } from "@/components/templates/engine/recipe-types";
import { PERSONAS, type PersonaId } from "@/lib/personas";

type ApiResult =
  | {
      ok: true;
      recipe: TemplateRecipe;
      generationId: string;
      model: string;
      inputTokens: number;
      outputTokens: number;
      costUsd: number;
      warning?: string;
    }
  | {
      ok: false;
      reason: string;
      stage: string;
      generationId?: string;
      model?: string;
      inputTokens?: number;
      outputTokens?: number;
      costUsd?: number;
      validationErrors?: string[];
      rawContent?: string;
    };

function resolvePersonaId(recipeId: string): PersonaId {
  // recipe.preview_persona_id is a free-form string in the schema; coerce
  // to a known PersonaId, falling back so the preview renders even if the
  // model picked an off-list value.
  if (recipeId in PERSONAS) return recipeId as PersonaId;
  return "healthcare-bold";
}

const ROLES = [
  "healthcare",
  "trades",
  "customer-service-bpo",
  "hospitality-chef",
  "tech",
] as const;

const MOODS = ["bold", "modern", "refined"] as const;

const MODELS_AVAILABLE = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku (cheap, ~$0.01)" },
  { value: "claude-sonnet-4-6", label: "Sonnet (better, ~$0.05)" },
] as const;

export function StudioTestButton() {
  const [role, setRole] = useState<(typeof ROLES)[number]>("healthcare");
  const [mood, setMood] = useState<(typeof MOODS)[number]>("modern");
  const [model, setModel] = useState<string>(MODELS_AVAILABLE[0].value);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  async function handleRun() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/studio/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, mood, model }),
      });
      const data = (await res.json()) as ApiResult;
      setResult(data);
    } catch (err) {
      setResult({
        ok: false,
        reason: err instanceof Error ? err.message : String(err),
        stage: "network",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
      <h2 className="font-display text-lg text-plum">
        🧪 Run test generation
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-plum-soft">
        Stage 3b verification. Generates one recipe via the cost-protected
        Anthropic pipeline, validates it against the Zod schema, and logs
        the call to the cost ledger. Nothing is persisted to the Recipe
        table yet — that lands in Stage 3c.
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs text-plum-soft">
          Role
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as (typeof ROLES)[number])}
            className="rounded-md border border-peach/40 bg-white px-3 py-2 text-sm text-plum"
            disabled={loading}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-plum-soft">
          Mood
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value as (typeof MOODS)[number])}
            className="rounded-md border border-peach/40 bg-white px-3 py-2 text-sm text-plum"
            disabled={loading}
          >
            {MOODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-plum-soft">
          Model
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="rounded-md border border-peach/40 bg-white px-3 py-2 text-sm text-plum"
            disabled={loading}
          >
            {MODELS_AVAILABLE.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleRun}
          disabled={loading}
          className="rounded-md bg-coral px-4 py-2 text-sm font-medium text-white shadow-warm-card transition hover:bg-coral-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating…" : "Run test generation"}
        </button>
      </div>

      {result && result.ok && (
        <div className="mt-4 rounded-md border border-mint/50 bg-mint/10 p-4 text-sm text-plum">
          <p className="font-medium">
            ✅ Generated and validated.
          </p>
          <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
            <div>
              <dt className="text-plum-soft">Slug</dt>
              <dd className="font-mono">{result.recipe.slug}</dd>
            </div>
            <div>
              <dt className="text-plum-soft">Name</dt>
              <dd>{result.recipe.name}</dd>
            </div>
            <div>
              <dt className="text-plum-soft">Tagline</dt>
              <dd>{result.recipe.tagline}</dd>
            </div>
            <div>
              <dt className="text-plum-soft">Model</dt>
              <dd className="font-mono">{result.model}</dd>
            </div>
            <div>
              <dt className="text-plum-soft">Tokens</dt>
              <dd>
                {result.inputTokens.toLocaleString()} in ·{" "}
                {result.outputTokens.toLocaleString()} out
              </dd>
            </div>
            <div>
              <dt className="text-plum-soft">Cost</dt>
              <dd className="font-mono">${result.costUsd.toFixed(4)}</dd>
            </div>
          </dl>
          {result.warning && (
            <p className="mt-3 text-xs text-[#8A5F1F]">
              ⚠️ {result.warning}
            </p>
          )}
          <p className="mt-3 text-xs text-plum-soft">
            Refresh the page to see the cost dashboard tick up.
          </p>
        </div>
      )}

      {result && result.ok && (
        <div className="mt-4">
          <p className="mb-3 text-xs uppercase tracking-widest text-plum-soft">
            Live preview · rendered with{" "}
            <span className="font-mono normal-case tracking-normal">
              {resolvePersonaId(result.recipe.preview_persona_id)}
            </span>{" "}
            persona
          </p>
          <div className="mx-auto aspect-[210/297] w-full max-w-[600px] overflow-hidden rounded-lg bg-white shadow-warm-card-hover">
            <RecipeRenderer
              recipe={result.recipe}
              data={
                PERSONAS[
                  resolvePersonaId(result.recipe.preview_persona_id)
                ]
              }
            />
          </div>
          <p className="mt-3 text-center text-xs text-plum-faint">
            A4 Portrait · 21 × 29.7 cm · this template is NOT persisted
            (Stage 3c adds the accept-and-save flow)
          </p>
        </div>
      )}

      {result && !result.ok && (
        <div className="mt-4 rounded-md border border-coral/40 bg-coral/10 p-4 text-sm text-plum">
          <p className="font-medium text-coral-deep">
            ❌ Generation failed at stage:{" "}
            <span className="font-mono">{result.stage}</span>
          </p>
          <p className="mt-2 text-xs text-plum">{result.reason}</p>

          {result.costUsd !== undefined && result.costUsd > 0 && (
            <p className="mt-2 text-xs text-plum-soft">
              Cost incurred (logged to ledger): $
              {result.costUsd.toFixed(4)}
              {result.inputTokens !== undefined &&
                result.outputTokens !== undefined &&
                ` · ${result.inputTokens.toLocaleString()} in / ${result.outputTokens.toLocaleString()} out tokens`}
            </p>
          )}

          {result.validationErrors && result.validationErrors.length > 0 && (
            <details className="mt-3 text-xs">
              <summary className="cursor-pointer text-plum-soft">
                Schema validation errors ({result.validationErrors.length})
              </summary>
              <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs">
                {result.validationErrors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </details>
          )}

          {result.rawContent && (
            <details className="mt-3 text-xs">
              <summary className="cursor-pointer text-plum-soft">
                Raw model output
              </summary>
              <pre className="mt-2 max-h-80 overflow-auto rounded bg-white/60 p-3 font-mono text-[11px] text-plum">
                {result.rawContent}
              </pre>
            </details>
          )}
        </div>
      )}
    </section>
  );
}
