"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import {
  generateSummary,
  type SummaryTone,
} from "@/lib/ai/generate-summary";

type GenerateSummaryModalProps = {
  open: boolean;
  onClose: () => void;
  defaultRole?: string;
  onAccept: (summary: string) => void;
};

const FALLBACK_ERROR = "Couldn't generate right now — try again";

const TONES: { value: SummaryTone; label: string }[] = [
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "confident", label: "Confident" },
];

const inputClass =
  "w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60";
const textareaClass = inputClass + " resize-vertical min-h-[70px]";
const labelClass = "mb-1 block text-xs font-medium text-plum-soft";

export function GenerateSummaryModal({
  open,
  onClose,
  defaultRole,
  onAccept,
}: GenerateSummaryModalProps) {
  const [role, setRole] = useState(defaultRole ?? "");
  const [years, setYears] = useState("");
  const [topSkills, setTopSkills] = useState("");
  const [biggestAchievement, setBiggestAchievement] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [tone, setTone] = useState<SummaryTone>("confident");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string | null>(null);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-fill role from props if the field is still empty
  useEffect(() => {
    if (defaultRole && !role) setRole(defaultRole);
  }, [defaultRole, role]);

  // Reset preview/error/loading on close; keep typed form values
  useEffect(() => {
    if (open) return;
    setGenerated(null);
    setError(null);
    setLoading(false);
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, []);

  const showError = (msg: string) => {
    setError(msg);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setError(null), 4000);
  };

  const yearsNumber = parseFloat(years);
  const requiredFilled =
    role.trim().length > 0 &&
    years.trim().length > 0 &&
    Number.isFinite(yearsNumber) &&
    yearsNumber >= 0 &&
    topSkills.trim().length > 0;

  const submit = async () => {
    if (loading) return;
    if (!requiredFilled) {
      showError("Please fill in role, years, and top skills");
      return;
    }
    setLoading(true);
    setError(null);
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
    try {
      const result = await generateSummary({
        role: role.trim(),
        years: yearsNumber,
        topSkills: topSkills.trim(),
        biggestAchievement: biggestAchievement.trim() || undefined,
        careerGoal: careerGoal.trim() || undefined,
        tone,
      });

      if (!result || typeof result !== "object" || !("ok" in result)) {
        showError(FALLBACK_ERROR);
        return;
      }
      if (!result.ok) {
        showError(
          typeof result.error === "string" && result.error.trim()
            ? result.error
            : FALLBACK_ERROR,
        );
        return;
      }
      const summary = result.summary;
      if (typeof summary !== "string" || !summary.trim()) {
        showError(FALLBACK_ERROR);
        return;
      }
      setGenerated(summary);
    } catch (err) {
      console.error("[GenerateSummaryModal] submit failed:", err);
      showError(FALLBACK_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleUseThis = () => {
    if (generated) onAccept(generated);
    onClose();
  };

  const handleTryAgain = () => {
    void submit();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate Summary with AI"
      size="md"
    >
      {!generated ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="space-y-4"
        >
          <p className="text-sm text-plum-soft">
            Answer a few quick questions and we&apos;ll write a polished
            Summary for you.
          </p>

          <div>
            <label className={labelClass} htmlFor="gs-role">
              Current or target role <span className="text-coral">*</span>
            </label>
            <input
              id="gs-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Product Manager"
              className={inputClass}
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gs-years">
              Years of experience <span className="text-coral">*</span>
            </label>
            <input
              id="gs-years"
              type="number"
              min={0}
              max={80}
              step={1}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g. 5"
              className={inputClass}
              disabled={loading}
              inputMode="numeric"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gs-skills">
              Top 3 skills <span className="text-coral">*</span>
            </label>
            <input
              id="gs-skills"
              type="text"
              value={topSkills}
              onChange={(e) => setTopSkills(e.target.value)}
              placeholder="e.g. Python, leadership, data analysis"
              className={inputClass}
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gs-achievement">
              Biggest achievement{" "}
              <span className="text-plum-faint">(optional)</span>
            </label>
            <textarea
              id="gs-achievement"
              value={biggestAchievement}
              onChange={(e) => setBiggestAchievement(e.target.value)}
              placeholder="e.g. Grew revenue 40% in 2 years"
              className={textareaClass}
              disabled={loading}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gs-goal">
              Career goal <span className="text-plum-faint">(optional)</span>
            </label>
            <textarea
              id="gs-goal"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g. Looking to lead a product team at a SaaS company"
              className={textareaClass}
              disabled={loading}
            />
          </div>

          <div>
            <span className={labelClass}>Tone</span>
            <div
              role="radiogroup"
              aria-label="Tone"
              className="inline-flex w-full overflow-hidden rounded-md border border-plum/15"
            >
              {TONES.map((t, i) => {
                const active = tone === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTone(t.value)}
                    disabled={loading}
                    className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-coral text-white"
                        : "bg-cream-soft text-plum hover:bg-cream"
                    } ${i > 0 ? "border-l border-plum/15" : ""} disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading || !requiredFilled}
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Summary
                </>
              )}
            </button>
            {error && (
              <div
                role="alert"
                className="mt-2 rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
              >
                {error}
              </div>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-plum-soft">
              Preview
            </p>
            <div className="rounded-md border border-plum/15 bg-cream-soft p-4 text-sm leading-relaxed text-plum">
              {generated}
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleTryAgain}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Try again
            </button>
            <button
              type="button"
              onClick={handleUseThis}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Use this
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
