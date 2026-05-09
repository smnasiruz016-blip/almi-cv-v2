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
import type { CVData } from "@/lib/cv-types";
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

type Gender = "female" | "male";

// Photo URLs + display names sourced directly from the existing persona
// library — one female and one male per role. The generation pipeline
// uses gender to shape the palette/decorators; the preview photo just
// makes that visible with a matching face.
const GENDER_PREVIEW: Record<
  string,
  { female: string; femaleName: string; male: string; maleName: string }
> = {
  healthcare: {
    female:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
    femaleName: "Sarah Chen, RN, BSN",
    male: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces",
    maleName: "James Okafor, MD",
  },
  trades: {
    female:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
    femaleName: "Fatima Hassan",
    male: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop&crop=faces",
    maleName: "Marcus Reilly",
  },
  "customer-service-bpo": {
    female:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
    femaleName: "Priya Sharma",
    male: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
    maleName: "Hassan Khan",
  },
  "hospitality-chef": {
    female:
      "https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400&h=400&fit=crop&crop=faces",
    femaleName: "Yuki Tanaka",
    male: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&crop=faces",
    maleName: "Carlos Hernández",
  },
  tech: {
    female:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
    femaleName: "Lin Wei",
    male: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    maleName: "Alex Volkov",
  },
};

function resolvePersonaId(recipeId: string): PersonaId {
  if (recipeId in PERSONAS) return recipeId as PersonaId;
  return "healthcare-bold";
}

function applyGenderPhoto(base: CVData, role: string, gender: Gender): CVData {
  const swap = GENDER_PREVIEW[role];
  if (!swap) return base;
  return {
    ...base,
    basics: {
      ...base.basics,
      fullName: gender === "female" ? swap.femaleName : swap.maleName,
      photoUrl: gender === "female" ? swap.female : swap.male,
    },
  };
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
  const [gender, setGender] = useState<Gender>("female");
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
        body: JSON.stringify({ role, mood, gender, model }),
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

        <div className="flex flex-col gap-1">
          <span className="text-xs text-plum-soft">Gender</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setGender("female")}
              disabled={loading}
              className={
                "rounded-l-md border border-r-0 px-3 py-2 text-sm font-medium transition " +
                (gender === "female"
                  ? "border-coral bg-coral text-white"
                  : "border-peach/40 bg-white text-plum-soft hover:border-coral/40")
              }
            >
              Female
            </button>
            <button
              type="button"
              onClick={() => setGender("male")}
              disabled={loading}
              className={
                "rounded-r-md border border-l-0 px-3 py-2 text-sm font-medium transition " +
                (gender === "male"
                  ? "border-coral bg-coral text-white"
                  : "border-peach/40 bg-white text-plum-soft hover:border-coral/40")
              }
            >
              Male
            </button>
          </div>
        </div>

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
            Live preview · {gender} design · rendered with{" "}
            <span className="font-mono normal-case tracking-normal">
              {resolvePersonaId(result.recipe.preview_persona_id)}
            </span>{" "}
            persona
          </p>
          <div className="mx-auto aspect-[210/297] w-full max-w-[600px] overflow-hidden rounded-lg bg-white shadow-warm-card-hover">
            <RecipeRenderer
              recipe={result.recipe}
              data={applyGenderPhoto(
                PERSONAS[resolvePersonaId(result.recipe.preview_persona_id)],
                result.recipe.role ?? role,
                gender,
              )}
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
