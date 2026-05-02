"use client";

import { useEffect, useRef, useState } from "react";
import {
  Copy as CopyIcon,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Modal } from "@/components/ui/modal";
import {
  generateLinkedInAbout,
  type LinkedInAboutTone,
} from "@/lib/ai/generate-linkedin-about";

type GenerateLinkedInAboutModalProps = {
  open: boolean;
  onClose: () => void;
  defaultRole?: string;
};

const FALLBACK_ERROR = "Couldn't generate right now — try again";

const TONES: { value: LinkedInAboutTone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "conversational", label: "Conversational" },
  { value: "bold", label: "Bold" },
];

const TABS: { value: "short" | "medium" | "long"; label: string; hint: string }[] = [
  { value: "short", label: "Short", hint: "~500 chars" },
  { value: "medium", label: "Medium", hint: "~1,300 chars" },
  { value: "long", label: "Long", hint: "~2,400 chars" },
];

const LINKEDIN_HARD_CAP = 2600;

const inputClass =
  "w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60";
const textareaClass = inputClass + " resize-vertical min-h-[70px]";
const labelClass = "mb-1 block text-xs font-medium text-plum-soft";

type Variants = { short: string; medium: string; long: string };

export function GenerateLinkedInAboutModal({
  open,
  onClose,
  defaultRole,
}: GenerateLinkedInAboutModalProps) {
  const [currentRole, setCurrentRole] = useState(defaultRole ?? "");
  const [yearsExperience, setYearsExperience] = useState("");
  const [topSkills, setTopSkills] = useState("");
  const [achievements, setAchievements] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState<LinkedInAboutTone>("professional");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variants, setVariants] = useState<Variants | null>(null);
  const [activeTab, setActiveTab] = useState<"short" | "medium" | "long">(
    "medium",
  );
  const [copiedTab, setCopiedTab] = useState<
    "short" | "medium" | "long" | null
  >(null);

  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestId = useRef(0);

  // Pre-fill role from prop when the field is still empty
  useEffect(() => {
    if (defaultRole && !currentRole) setCurrentRole(defaultRole);
  }, [defaultRole, currentRole]);

  // Reset variants/error/loading on close; keep typed form values
  useEffect(() => {
    if (open) return;
    requestId.current++;
    setVariants(null);
    setError(null);
    setLoading(false);
    setCopiedTab(null);
    setActiveTab("medium");
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
    if (copyTimer.current) {
      clearTimeout(copyTimer.current);
      copyTimer.current = null;
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (errorTimer.current) clearTimeout(errorTimer.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const showError = (msg: string) => {
    setError(msg);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setError(null), 4000);
  };

  const requiredFilled =
    currentRole.trim().length > 0 && yearsExperience.trim().length > 0;

  const submit = async () => {
    if (loading) return;
    if (!requiredFilled) {
      showError("Please fill in role and years of experience");
      return;
    }
    const myId = ++requestId.current;
    setLoading(true);
    setError(null);
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
    try {
      const result = await generateLinkedInAbout({
        currentRole: currentRole.trim(),
        yearsExperience: yearsExperience.trim(),
        topSkills: topSkills.trim() || undefined,
        achievements: achievements.trim() || undefined,
        targetAudience: targetAudience.trim() || undefined,
        tone,
      });
      if (myId !== requestId.current) return;
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
      setVariants({
        short: result.short,
        medium: result.medium,
        long: result.long,
      });
      setActiveTab("medium");
    } catch (err) {
      if (myId !== requestId.current) return;
      console.error("[GenerateLinkedInAboutModal] submit failed:", err);
      showError(FALLBACK_ERROR);
    } finally {
      if (myId === requestId.current) setLoading(false);
    }
  };

  const handleCopy = async (which: "short" | "medium" | "long") => {
    if (!variants) return;
    try {
      await navigator.clipboard.writeText(variants[which]);
      setCopiedTab(which);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedTab(null), 2000);
    } catch {
      showError("Couldn't copy to clipboard");
    }
  };

  const activeText = variants ? variants[activeTab] : "";
  const activeLength = activeText.length;
  const overCap = activeLength > LINKEDIN_HARD_CAP;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Generate LinkedIn About with AI"
      size="lg"
    >
      {!variants ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="space-y-4"
        >
          <p className="text-sm text-plum-soft">
            We&apos;ll write three versions of your LinkedIn About — short,
            medium, and long — in the tone you pick. First person, no
            cliches.
          </p>

          <div>
            <label className={labelClass} htmlFor="li-role">
              Current role or headline <span className="text-coral">*</span>
            </label>
            <input
              id="li-role"
              type="text"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              placeholder="e.g. Senior Product Manager at fintech startups"
              className={inputClass}
              disabled={loading}
              autoComplete="off"
              maxLength={100}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="li-years">
              Years of experience <span className="text-coral">*</span>
            </label>
            <input
              id="li-years"
              type="text"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              placeholder="e.g. 5, 5+, a decade"
              className={inputClass}
              disabled={loading}
              autoComplete="off"
              maxLength={20}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="li-skills">
              Top skills <span className="text-plum-faint">(optional)</span>
            </label>
            <textarea
              id="li-skills"
              value={topSkills}
              onChange={(e) => setTopSkills(e.target.value)}
              placeholder="comma-separated or freeform"
              className={textareaClass}
              disabled={loading}
              maxLength={300}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="li-achievements">
              Key achievements{" "}
              <span className="text-plum-faint">(optional)</span>
            </label>
            <textarea
              id="li-achievements"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="e.g. Grew MRR 3x in 18 months, shipped onboarding redesign for 40k SMBs"
              className={textareaClass}
              disabled={loading}
              maxLength={500}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="li-audience">
              Target audience{" "}
              <span className="text-plum-faint">(optional)</span>
            </label>
            <input
              id="li-audience"
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="recruiters, clients, founders…"
              className={inputClass}
              disabled={loading}
              autoComplete="off"
              maxLength={200}
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
                    } ${
                      i > 0 ? "border-l border-plum/15" : ""
                    } disabled:cursor-not-allowed disabled:opacity-60`}
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
                  Writing your LinkedIn About...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate LinkedIn About
                </>
              )}
            </button>
            {loading && (
              <p
                role="status"
                aria-live="polite"
                className="mt-2 text-center text-xs text-plum-faint"
              >
                This usually takes 8–15 seconds.
              </p>
            )}
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
          <div
            role="tablist"
            aria-label="LinkedIn About length"
            className="inline-flex w-full overflow-hidden rounded-md border border-plum/15"
          >
            {TABS.map((t, i) => {
              const active = activeTab === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(t.value)}
                  className={`flex flex-1 flex-col items-center gap-0.5 px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-coral text-white"
                      : "bg-cream-soft text-plum hover:bg-cream"
                  } ${i > 0 ? "border-l border-plum/15" : ""}`}
                >
                  <span>{t.label}</span>
                  <span
                    className={`text-[10px] font-normal ${
                      active ? "text-white/85" : "text-plum-faint"
                    }`}
                  >
                    {t.hint}
                  </span>
                </button>
              );
            })}
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-widest text-plum-soft">
                Preview · {activeTab}
              </p>
              <span
                className={`text-xs ${overCap ? "text-coral-deep" : "text-plum-faint"}`}
              >
                {activeLength.toLocaleString()} / {LINKEDIN_HARD_CAP.toLocaleString()}
              </span>
            </div>
            <div className="max-h-[45vh] overflow-y-auto whitespace-pre-wrap rounded-md border border-plum/15 bg-cream-soft p-4 text-sm leading-relaxed text-plum">
              {activeText}
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

          <div className="flex flex-col gap-2 border-t border-plum/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs italic text-plum-soft sm:mr-auto">
              💡 Try each tone — each gives a different feel
            </p>
            <button
              type="button"
              onClick={() => void submit()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => void handleCopy(activeTab)}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CopyIcon className="h-4 w-4" />
              {copiedTab === activeTab ? "Copied!" : "Copy"}
            </button>
            {copiedTab && (
              <span className="sr-only" aria-live="polite">
                Copied to clipboard
              </span>
            )}
          </div>

          <p className="flex items-center justify-center gap-1.5 text-[11px] text-plum-faint">
            <LinkedInIcon className="h-3 w-3" />
            Paste into LinkedIn → Profile → About
          </p>
        </div>
      )}
    </Modal>
  );
}
