"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, RotateCcw, Sparkles } from "lucide-react";
import {
  scoreResume,
  type ScoreBreakdown,
} from "@/lib/ai/score-resume";

const MIN_TEXT = 200;
const MAX_TEXT = 10_000;

type Status = "idle" | "loading" | "result";

function tierColors(score: number): {
  label: string;
  text: string;
  ring: string;
  fill: string;
  bgSoft: string;
} {
  if (score < 60) {
    return {
      label: "Needs work",
      text: "text-coral-deep",
      ring: "stroke-coral-deep",
      fill: "bg-coral-deep",
      bgSoft: "bg-coral-soft/40",
    };
  }
  if (score < 80) {
    return {
      label: "Decent",
      text: "text-[#A87528]",
      ring: "stroke-[#D4A24C]",
      fill: "bg-[#D4A24C]",
      bgSoft: "bg-[#D4A24C]/15",
    };
  }
  return {
    label: "Strong",
    text: "text-[#0F4A42]",
    ring: "stroke-mint",
    fill: "bg-mint",
    bgSoft: "bg-mint/20",
  };
}

function ScoreGauge({ value }: { value: number }) {
  const radius = 64;
  const stroke = 10;
  const c = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;
  const tier = tierColors(value);

  return (
    <div className="relative inline-flex h-44 w-44 items-center justify-center">
      <svg
        viewBox="0 0 160 160"
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-plum/10"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          className={tier.ring}
          style={{ transition: "stroke-dasharray 600ms ease-out" }}
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <span className={`text-5xl font-bold ${tier.text}`}>{value}</span>
        <span className="text-xs text-plum-soft">out of 100</span>
        <span
          className={`mt-1 inline-flex rounded-pill px-2.5 py-0.5 text-[11px] font-semibold ${tier.text} ${tier.bgSoft}`}
        >
          {tier.label}
        </span>
      </div>
    </div>
  );
}

function SubBar({ label, value }: { label: string; value: number }) {
  const tier = tierColors(value);
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-sm font-medium text-plum">{label}</span>
        <span className={`text-sm font-semibold ${tier.text}`}>{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-pill bg-plum/10">
        <div
          className={`h-full rounded-pill ${tier.fill}`}
          style={{
            width: `${Math.max(0, Math.min(100, value))}%`,
            transition: "width 600ms ease-out",
          }}
        />
      </div>
    </div>
  );
}

export function ScoreClient() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<ScoreBreakdown | null>(null);

  const trimmedLen = text.trim().length;
  const validLen = trimmedLen >= MIN_TEXT && trimmedLen <= MAX_TEXT;
  const counterTooLong = text.length > MAX_TEXT;

  const handleSubmit = async () => {
    if (status === "loading" || !validLen) return;
    setStatus("loading");
    setError(null);
    try {
      const result = await scoreResume({ resumeText: text.trim() });
      if (!result.ok) {
        setError(result.error || "Something went wrong — try again");
        setStatus("idle");
        return;
      }
      setScore(result.score);
      setStatus("result");
    } catch (err) {
      console.error("[ScoreClient] scoreResume failed:", err);
      setError("Couldn't reach the scoring service — try again");
      setStatus("idle");
    }
  };

  const handleReset = () => {
    setText("");
    setScore(null);
    setError(null);
    setStatus("idle");
  };

  if (status === "result" && score) {
    return (
      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card md:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
            <div className="shrink-0">
              <ScoreGauge value={score.total} />
            </div>
            <div className="flex-1 space-y-3 md:pt-2">
              <SubBar label="Keywords" value={score.keywords} />
              <SubBar label="Action Verbs" value={score.actionVerbs} />
              <SubBar label="Format" value={score.format} />
              <SubBar label="Length" value={score.length} />
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-plum-soft/10 px-4 py-3 text-sm text-plum md:px-5 md:py-4">
            <span className="mr-1.5">💡</span>
            <span className="font-medium text-plum-soft">Tip:</span>{" "}
            <span>{score.tip}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-coral/30 bg-gradient-to-br from-coral-soft/30 to-cream p-6 text-center md:p-8">
          <h2 className="text-lg font-semibold text-plum md:text-xl">
            Want to improve?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-plum-soft">
            Build a polished, tailored CV with AlmiCV — premium templates, AI
            writing helper, and live ATS scoring. Free to start, $7/month for
            unlimited AI with a 7-day free trial.
          </p>
          <Link
            href="/signup"
            className="mt-5 inline-flex items-center gap-2 rounded-pill bg-coral px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
          >
            Build a better CV with AlmiCV
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
          >
            <RotateCcw className="h-4 w-4" />
            Try another resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
      className="mt-8 space-y-4"
    >
      <div className="rounded-2xl border border-plum/10 bg-white p-5 shadow-warm-card md:p-6">
        <label
          htmlFor="resume-text"
          className="mb-2 block text-sm font-medium text-plum"
        >
          Paste your resume here
        </label>
        <textarea
          id="resume-text"
          aria-label="Resume text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the full text of your resume — name, contact, summary, experience, education, skills."
          rows={12}
          disabled={status === "loading"}
          className="block max-h-[60vh] min-h-[260px] w-full resize-y rounded-xl border border-plum/15 bg-cream-soft px-3.5 py-3 font-mono text-sm leading-relaxed text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
          <span className="text-plum-faint">
            Tip: include experience, education, and skills sections.
          </span>
          <span
            className={
              counterTooLong || (trimmedLen > 0 && trimmedLen < MIN_TEXT)
                ? "text-coral-deep"
                : "text-plum-soft"
            }
          >
            {text.length.toLocaleString()} / {MAX_TEXT.toLocaleString()}
            {trimmedLen > 0 && trimmedLen < MIN_TEXT && (
              <span className="ml-1">· need at least {MIN_TEXT}</span>
            )}
          </span>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-coral/30 bg-cream-soft px-4 py-3 text-sm text-coral-deep"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !validLen}
        className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing your resume...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Check My Score
          </>
        )}
      </button>
      {status === "loading" && (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-xs text-plum-faint"
        >
          This usually takes 5–10 seconds.
        </p>
      )}
    </form>
  );
}
