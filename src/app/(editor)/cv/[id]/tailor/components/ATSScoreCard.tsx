"use client";

import { useEffect, useState } from "react";
import type { ATSScore } from "@/lib/cv/ats-score";

type Props = {
  score: ATSScore;
  baseline: number;
};

const RADIUS = 52;
const CIRC = 2 * Math.PI * RADIUS;

function colorForScore(n: number): {
  stroke: string;
  text: string;
  glow: string;
} {
  if (n < 60)
    return {
      stroke: "var(--color-coral)",
      text: "text-coral-deep",
      glow: "var(--color-coral)",
    };
  if (n < 80)
    return {
      stroke: "var(--color-gold)",
      text: "text-[#A77A1F]",
      glow: "var(--color-gold)",
    };
  return {
    stroke: "var(--color-mint)",
    text: "text-[#0F4A42]",
    glow: "var(--color-mint)",
  };
}

function Gauge({ value }: { value: number }) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(value));
    return () => cancelAnimationFrame(id);
  }, [value]);

  const offset = CIRC * (1 - clamp(animated, 0, 100) / 100);
  const colors = colorForScore(value);

  return (
    <div className="relative inline-flex h-32 w-32 items-center justify-center">
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="var(--color-cream-soft)"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 400ms var(--ease-out-quint, ease-out)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-semibold leading-none ${colors.text}`}>
          {Math.round(value)}
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-plum-faint">
          / 100
        </span>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function Bar({ label, value }: { label: string; value: number }) {
  const colors = colorForScore(value);
  const widthPct = clamp(value, 0, 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-xs">
        <span className="font-medium text-plum-soft">{label}</span>
        <span className="font-semibold tabular-nums text-plum">{value}</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-cream-soft">
        <div
          className="h-full rounded-full"
          style={{
            width: `${widthPct}%`,
            backgroundColor: colors.stroke,
            transition:
              "width 400ms var(--ease-out-quint, ease-out), background-color 250ms ease",
          }}
        />
      </div>
    </div>
  );
}

function DeltaChip({ delta }: { delta: number }) {
  if (delta === 0) {
    return (
      <span className="inline-flex items-center rounded-pill border border-plum/15 bg-cream-soft px-2 py-0.5 text-xs font-medium text-plum-soft">
        no change
      </span>
    );
  }
  const positive = delta > 0;
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2 py-0.5 text-xs font-semibold ${
        positive
          ? "bg-mint/20 text-[#0F4A42]"
          : "border border-plum/15 bg-cream-soft text-plum-soft"
      }`}
    >
      {positive ? `+${delta}` : delta} from original
    </span>
  );
}

export function ATSScoreCard({ score, baseline }: Props) {
  const delta = score.total - baseline;
  return (
    <section className="rounded-xl border border-plum/10 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex justify-center sm:justify-start">
          <Gauge value={score.total} />
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h2 className="text-base font-semibold text-plum">ATS Score</h2>
            <span className="text-xs text-plum-faint">
              {score.total} / 100
            </span>
            <DeltaChip delta={delta} />
          </div>
          <div className="space-y-2">
            <Bar label="Keywords" value={score.subscores.keywords} />
            <Bar label="Action verbs" value={score.subscores.actionVerbs} />
            <Bar label="Format" value={score.subscores.format} />
            <Bar label="Length" value={score.subscores.length} />
          </div>
        </div>
      </div>
      <p className="mt-4 rounded-md bg-cream-soft px-3 py-2 text-xs italic leading-relaxed text-plum-soft">
        <span aria-hidden="true">💡 </span>
        {score.tip}
      </p>
    </section>
  );
}
