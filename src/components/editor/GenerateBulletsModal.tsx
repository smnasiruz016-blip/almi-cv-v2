"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import {
  generateBullets,
  type BulletTone,
} from "@/lib/ai/generate-bullets";

type GenerateBulletsModalProps = {
  open: boolean;
  onClose: () => void;
  defaultJobTitle?: string;
  defaultCompany?: string;
  onAccept: (bullets: string[]) => void;
};

const FALLBACK_ERROR = "Couldn't generate bullets right now — try again";

const TONES: { value: BulletTone; label: string }[] = [
  { value: "formal", label: "Formal" },
  { value: "confident", label: "Confident" },
  { value: "results-driven", label: "Results-driven" },
];

const inputClass =
  "w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60";
const textareaClass = inputClass + " resize-vertical min-h-[70px]";
const labelClass = "mb-1 block text-xs font-medium text-plum-soft";

export function GenerateBulletsModal({
  open,
  onClose,
  defaultJobTitle,
  defaultCompany,
  onAccept,
}: GenerateBulletsModalProps) {
  const [jobTitle, setJobTitle] = useState(defaultJobTitle ?? "");
  const [company, setCompany] = useState(defaultCompany ?? "");
  const [responsibility, setResponsibility] = useState("");
  const [years, setYears] = useState("");
  const [industry, setIndustry] = useState("");
  const [tone, setTone] = useState<BulletTone>("results-driven");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bullets, setBullets] = useState<string[] | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-fill jobTitle/company from props when those fields are still blank.
  // Don't clobber a user-typed value on prop changes.
  useEffect(() => {
    if (defaultJobTitle && !jobTitle) setJobTitle(defaultJobTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultJobTitle]);

  useEffect(() => {
    if (defaultCompany && !company) setCompany(defaultCompany);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCompany]);

  // Reset preview/error/loading/selections on close; keep typed form values
  useEffect(() => {
    if (open) return;
    setBullets(null);
    setSelected(new Set());
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

  const yearsTrimmed = years.trim();
  const yearsNumber =
    yearsTrimmed.length > 0 ? parseFloat(yearsTrimmed) : undefined;
  const yearsValid =
    yearsNumber === undefined ||
    (Number.isFinite(yearsNumber) && yearsNumber >= 0 && yearsNumber <= 80);
  const requiredFilled =
    jobTitle.trim().length > 0 &&
    responsibility.trim().length > 0 &&
    yearsValid;

  const submit = async () => {
    if (loading) return;
    if (!requiredFilled) {
      showError("Please fill in job title and responsibility");
      return;
    }
    setLoading(true);
    setError(null);
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
    try {
      const result = await generateBullets({
        jobTitle: jobTitle.trim(),
        company: company.trim() || undefined,
        responsibility: responsibility.trim(),
        years: yearsNumber,
        industry: industry.trim() || undefined,
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
      const list = Array.isArray(result.bullets) ? result.bullets : [];
      const cleaned = list.filter(
        (b): b is string => typeof b === "string" && b.trim().length > 0,
      );
      if (cleaned.length === 0) {
        showError(FALLBACK_ERROR);
        return;
      }
      setBullets(cleaned);
      setSelected(new Set(cleaned.map((_, i) => i)));
    } catch (err) {
      console.error("[GenerateBulletsModal] submit failed:", err);
      showError(FALLBACK_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelected = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleAddSelected = () => {
    if (!bullets || selected.size === 0) return;
    const out: string[] = [];
    bullets.forEach((b, i) => {
      if (selected.has(i)) out.push(b);
    });
    onAccept(out);
    onClose();
  };

  const handleTryAgain = () => {
    void submit();
  };

  const checkedCount = selected.size;
  const totalCount = bullets?.length ?? 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate Bullets with AI"
      size="lg"
    >
      {!bullets ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="space-y-4"
        >
          <p className="text-sm text-plum-soft">
            Tell us what you did in this role and we&apos;ll suggest 5 strong
            bullet points.
          </p>

          <div>
            <label className={labelClass} htmlFor="gb-jobTitle">
              Job title / Role <span className="text-coral">*</span>
            </label>
            <input
              id="gb-jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Product Manager"
              className={inputClass}
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gb-company">
              Company / Organization{" "}
              <span className="text-plum-faint">(optional)</span>
            </label>
            <input
              id="gb-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Stripe"
              className={inputClass}
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gb-responsibility">
              Key responsibility or what you did{" "}
              <span className="text-coral">*</span>
            </label>
            <textarea
              id="gb-responsibility"
              value={responsibility}
              onChange={(e) => setResponsibility(e.target.value)}
              placeholder="e.g. led customer onboarding for SaaS clients"
              className={textareaClass}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="gb-years">
                Years in role{" "}
                <span className="text-plum-faint">(optional)</span>
              </label>
              <input
                id="gb-years"
                type="number"
                min={0}
                max={80}
                step={1}
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="e.g. 3"
                className={inputClass}
                disabled={loading}
                inputMode="numeric"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="gb-industry">
                Industry <span className="text-plum-faint">(optional)</span>
              </label>
              <input
                id="gb-industry"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. fintech"
                className={inputClass}
                disabled={loading}
                autoComplete="off"
              />
            </div>
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
                  Generate Bullets
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
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-plum">
              Pick the bullets you want to add
            </p>
            <span className="rounded-full bg-cream-soft px-2.5 py-0.5 text-xs font-medium text-plum-soft">
              {checkedCount} of {totalCount} selected
            </span>
          </div>

          <ul className="space-y-2">
            {bullets.map((bullet, idx) => {
              const isChecked = selected.has(idx);
              return (
                <li key={idx}>
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2.5 transition-colors ${
                      isChecked
                        ? "border-coral/30 bg-coral/5"
                        : "border-plum/15 bg-cream-soft hover:bg-cream"
                    } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelected(idx)}
                      disabled={loading}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-coral disabled:cursor-not-allowed"
                    />
                    <span className="text-sm leading-relaxed text-plum">
                      {bullet}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>

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
              onClick={handleAddSelected}
              disabled={loading || checkedCount === 0}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Add Selected ({checkedCount})
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
