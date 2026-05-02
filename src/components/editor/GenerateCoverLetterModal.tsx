"use client";

import { useEffect, useRef, useState } from "react";
import {
  Copy as CopyIcon,
  Loader2,
  RefreshCw,
  Save,
  Sparkles,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import {
  generateCoverLetter,
  type CoverLetterTone,
} from "@/lib/ai/generate-cover-letter";
import { createCoverLetter } from "@/lib/cv/cover-letters";

const MIN_JD = 50;
const MAX_JD = 5000;
const MAX_MANAGER = 100;
const MAX_TITLE = 100;

const TONES: { value: CoverLetterTone; label: string }[] = [
  { value: "formal", label: "Formal" },
  { value: "confident", label: "Confident" },
  { value: "conversational", label: "Conversational" },
];

const FALLBACK_ERROR = "Couldn't generate cover letter right now — try again";

const inputClass =
  "w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60";
const textareaClass = inputClass + " resize-vertical min-h-[80px]";
const labelClass = "mb-1 block text-xs font-medium text-plum-soft";

const TITLE_LABEL_RE = /(?:job title|position|role)\s*[:\-]+\s*([A-Za-z][^\n.]{2,80})/i;
const TITLE_SEPARATORS = /[|·–—@]| - | at /;

function extractJobTitle(jd: string): string {
  const head = jd.slice(0, 400);
  const labelled = head.match(TITLE_LABEL_RE);
  if (labelled?.[1]) {
    const t = labelled[1].split(TITLE_SEPARATORS)[0].trim();
    if (t) return `Cover Letter for ${t}`;
  }
  const firstLine = head
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!firstLine) return "Untitled Cover Letter";
  let candidate = firstLine.split(TITLE_SEPARATORS)[0].trim();
  if (candidate.length > 80) candidate = candidate.slice(0, 80).trim();
  return candidate ? `Cover Letter for ${candidate}` : "Untitled Cover Letter";
}

type Props = {
  open: boolean;
  onClose: () => void;
  cvId: string;
  onSaved: () => void;
};

export function GenerateCoverLetterModal({
  open,
  onClose,
  cvId,
  onSaved,
}: Props) {
  const [jd, setJd] = useState("");
  const [hiringManager, setHiringManager] = useState("");
  const [tone, setTone] = useState<CoverLetterTone>("confident");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const titleAutoSetOnce = useRef(false);

  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestId = useRef(0);

  // Reset everything on close. Bump the request id so any in-flight
  // generate response that arrives after close is dropped silently.
  useEffect(() => {
    if (open) return;
    requestId.current++;
    setJd("");
    setHiringManager("");
    setTone("confident");
    setTitle("");
    setBody("");
    titleAutoSetOnce.current = false;
    setGenerating(false);
    setSaving(false);
    setError(null);
    setSaveError(null);
    setCopied(false);
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

  const trimmedJdLen = jd.trim().length;
  const validJd = trimmedJdLen >= MIN_JD && trimmedJdLen <= MAX_JD;
  const inPreview = body.length > 0;

  const generate = async () => {
    if (generating) return;
    if (!validJd) {
      showError(
        trimmedJdLen < MIN_JD
          ? `Paste a longer job description — at least ${MIN_JD} characters`
          : `Job description is too long — keep it under ${MAX_JD.toLocaleString()} characters`,
      );
      return;
    }
    if (hiringManager.trim().length > MAX_MANAGER) {
      showError(`Hiring manager name is too long`);
      return;
    }
    const myId = ++requestId.current;
    setGenerating(true);
    setError(null);
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
    try {
      const trimmedJd = jd.trim();
      const result = await generateCoverLetter({
        cvId,
        jobDescription: trimmedJd,
        hiringManager: hiringManager.trim() || undefined,
        tone,
      });
      if (myId !== requestId.current) return;
      if (!result.ok) {
        showError(result.error || FALLBACK_ERROR);
        return;
      }
      setBody(result.body);
      if (!titleAutoSetOnce.current) {
        setTitle(extractJobTitle(trimmedJd).slice(0, MAX_TITLE));
        titleAutoSetOnce.current = true;
      }
    } catch (err) {
      if (myId !== requestId.current) return;
      console.error("[GenerateCoverLetterModal] generate failed:", err);
      showError(FALLBACK_ERROR);
    } finally {
      if (myId === requestId.current) setGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      showError("Couldn't copy to clipboard");
    }
  };

  const handleSave = async () => {
    if (saving) return;
    const t = title.trim();
    const b = body.trim();
    if (!t) {
      setSaveError("Title cannot be empty");
      return;
    }
    if (!b) {
      setSaveError("Cover letter body is empty");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      const result = await createCoverLetter({
        cvId,
        title: t,
        jobDescription: jd.trim(),
        hiringManager: hiringManager.trim() || undefined,
        tone,
        body: b,
      });
      if (!result.ok) {
        setSaveError(result.error || "Couldn't save right now — try again");
        return;
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error("[GenerateCoverLetterModal] save failed:", err);
      setSaveError("Couldn't save right now — try again");
    } finally {
      setSaving(false);
    }
  };

  const titleStr = inPreview
    ? "Cover Letter"
    : "Generate Cover Letter with AI";

  return (
    <Modal open={open} onClose={onClose} title={titleStr} size="lg">
      {!inPreview ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void generate();
          }}
          className="space-y-4"
        >
          <p className="text-sm text-plum-soft">
            Paste the job description and pick a tone — we&apos;ll write a
            polished cover letter grounded in your CV.
          </p>

          <div>
            <label className={labelClass} htmlFor="cl-jd">
              Job description <span className="text-coral">*</span>
            </label>
            <textarea
              id="cl-jd"
              aria-label="Job description"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job description here — title, requirements, responsibilities..."
              rows={10}
              disabled={generating}
              className={`${textareaClass} max-h-72`}
            />
            <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
              <span className="text-plum-faint">
                Tip: full JDs (200+ words) produce sharper letters.
              </span>
              <span
                className={
                  validJd || trimmedJdLen === 0
                    ? "text-plum-soft"
                    : "text-coral-deep"
                }
              >
                {trimmedJdLen.toLocaleString()} / {MAX_JD.toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="cl-manager">
              Hiring manager name{" "}
              <span className="text-plum-faint">(optional)</span>
            </label>
            <input
              id="cl-manager"
              type="text"
              aria-label="Hiring manager name"
              value={hiringManager}
              onChange={(e) => setHiringManager(e.target.value)}
              placeholder="e.g. Sarah Chen (optional)"
              maxLength={MAX_MANAGER}
              className={inputClass}
              disabled={generating}
              autoComplete="off"
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
                    disabled={generating}
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
              disabled={generating || !validJd}
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Writing your cover letter...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Cover Letter
                </>
              )}
            </button>
            {generating && (
              <p
                role="status"
                aria-live="polite"
                className="mt-2 text-center text-xs text-plum-faint"
              >
                This usually takes 5–15 seconds.
              </p>
            )}
            {error && (
              <div
                role="alert"
                className="mt-3 rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
              >
                {error}
              </div>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="cl-title">
              Title
            </label>
            <input
              id="cl-title"
              type="text"
              aria-label="Cover letter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={MAX_TITLE}
              className={inputClass}
              disabled={saving}
              autoComplete="off"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="cl-body">
              Preview <span className="text-plum-faint">(editable)</span>
            </label>
            <textarea
              id="cl-body"
              aria-label="Cover letter body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={14}
              disabled={saving || generating}
              className="block max-h-[55vh] w-full resize-y rounded-md border border-plum/15 bg-cream-soft px-3 py-2.5 font-mono text-sm leading-relaxed text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
            >
              {error}
            </div>
          )}

          {saveError && (
            <div
              role="alert"
              className="rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
            >
              {saveError}
            </div>
          )}

          <div className="flex flex-col gap-2 border-t border-plum/10 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => void generate()}
              disabled={generating || saving}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => void handleCopy()}
              disabled={generating || saving}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CopyIcon className="h-4 w-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
            {copied && (
              <span className="sr-only" aria-live="polite">
                Copied to clipboard
              </span>
            )}
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={generating || saving}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
