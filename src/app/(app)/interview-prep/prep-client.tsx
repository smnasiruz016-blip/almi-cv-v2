"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Brain,
  ChevronDown,
  Copy as CopyIcon,
  Eye,
  EyeOff,
  Loader2,
  MessageCircleQuestion,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";
import {
  generateInterviewPrep,
  type InterviewDifficulty,
  type InterviewQuestion,
  type InterviewType,
} from "@/lib/ai/generate-interview-prep";

const FALLBACK_ERROR = "Couldn't generate interview prep right now — try again";
const MAX_JOB_TITLE = 150;
const MAX_JD = 5000;

type Status = "idle" | "loading" | "result";

type CVOption = { id: string; title: string };

type Props = {
  cvs: CVOption[];
};

const TYPES: { value: InterviewType; label: string; hint: string }[] = [
  { value: "behavioral", label: "Behavioral", hint: "STAR stories" },
  { value: "technical", label: "Technical", hint: "Problem solving" },
  { value: "mixed", label: "Mixed", hint: "Both" },
];

const DIFFICULTIES: {
  value: InterviewDifficulty;
  label: string;
}[] = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
];

const inputClass =
  "w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60";
const textareaClass = inputClass + " resize-vertical min-h-[120px]";
const labelClass = "mb-1 block text-xs font-medium text-plum-soft";

function pillClass(active: boolean) {
  return [
    "rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
    active
      ? "border-coral bg-coral text-white"
      : "border-plum/15 bg-white text-plum hover:border-coral/40 hover:text-coral",
  ].join(" ");
}

function questionAsText(q: InterviewQuestion, index: number): string {
  return [
    `Q${index + 1}${q.type === "curveball" ? " (curveball)" : ""}: ${q.question}`,
    `Why: ${q.why}`,
    `Framework: ${q.framework}`,
    `Talking points:`,
    ...q.talkingPoints.map((t) => `  - ${t}`),
    `Red flags:`,
    ...q.redFlags.map((t) => `  - ${t}`),
  ].join("\n");
}

function buildAllText(
  jobTitle: string,
  questions: InterviewQuestion[],
  cvGapNote: string | undefined,
): string {
  const parts: string[] = [];
  parts.push(`Interview Prep — ${jobTitle}`);
  parts.push("");
  if (cvGapNote) {
    parts.push(`CV coaching note: ${cvGapNote}`);
    parts.push("");
  }
  questions.forEach((q, i) => {
    parts.push(questionAsText(q, i));
    parts.push("");
  });
  return parts.join("\n").trim();
}

function QuestionCard({
  q,
  index,
  practiceMode,
}: {
  q: InterviewQuestion;
  index: number;
  practiceMode: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  // When toggling practice mode on, collapse the card so user can self-quiz
  useEffect(() => {
    if (practiceMode) setOpen(false);
  }, [practiceMode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(questionAsText(q, index));
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const isCurveball = q.type === "curveball";

  return (
    <div
      className={[
        "rounded-xl border bg-white shadow-warm-card transition-shadow",
        isCurveball ? "border-coral/40" : "border-plum/10",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left focus:outline-none focus:ring-2 focus:ring-coral/30 md:px-5"
      >
        <span
          className={[
            "mt-0.5 inline-flex h-6 min-w-[1.75rem] shrink-0 items-center justify-center rounded-md px-1 text-[11px] font-semibold",
            isCurveball
              ? "bg-coral text-white"
              : "bg-plum/10 text-plum",
          ].join(" ")}
        >
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium leading-snug text-plum">
              {q.question}
            </p>
            {isCurveball && (
              <span className="inline-flex items-center gap-1 rounded-pill bg-coral-soft/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-coral-deep">
                <Sparkles className="h-3 w-3" />
                Curveball
              </span>
            )}
          </div>
        </div>
        <span className="ml-2 mt-1 inline-flex shrink-0 items-center text-plum-soft">
          {practiceMode && !open ? (
            <span className="inline-flex items-center gap-1 rounded-pill border border-plum/15 px-2 py-1 text-[11px] font-medium text-plum">
              <Eye className="h-3 w-3" />
              Reveal
            </span>
          ) : (
            <ChevronDown
              className={[
                "h-4 w-4 transition-transform",
                open ? "rotate-180" : "",
              ].join(" ")}
            />
          )}
        </span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-plum/10 px-4 py-4 md:px-5">
          <div>
            <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-plum-faint">
              <Target className="h-3 w-3" />
              Why they're asking
            </p>
            <p className="text-sm leading-relaxed text-plum">{q.why}</p>
          </div>

          <div>
            <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-plum-faint">
              <Brain className="h-3 w-3" />
              Framework
            </p>
            <p className="text-sm leading-relaxed text-plum">{q.framework}</p>
          </div>

          <div>
            <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-plum-faint">
              <MessageCircleQuestion className="h-3 w-3" />
              Talking points
            </p>
            <ul className="space-y-1.5 text-sm leading-relaxed text-plum">
              {q.talkingPoints.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-coral/20 bg-coral-soft/20 px-3 py-2.5">
            <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-coral-deep">
              <AlertTriangle className="h-3 w-3" />
              Red flags — don't say
            </p>
            <ul className="space-y-1 text-sm leading-relaxed text-plum">
              {q.redFlags.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral-deep" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="inline-flex items-center gap-1.5 rounded-pill border border-plum/15 bg-white px-3 py-1.5 text-xs font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
            >
              <CopyIcon className="h-3.5 w-3.5" />
              {copied ? "Copied!" : "Copy this Q&A"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PrepClient({ cvs }: Props) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [cvId, setCvId] = useState<string>("");
  const [interviewType, setInterviewType] = useState<InterviewType>("mixed");
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>("mid");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[] | null>(null);
  const [cvGapNote, setCvGapNote] = useState<string | undefined>(undefined);
  const [resultJobTitle, setResultJobTitle] = useState("");

  const [practiceMode, setPracticeMode] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const copyAllTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestId = useRef(0);

  useEffect(() => {
    return () => {
      if (copyAllTimer.current) clearTimeout(copyAllTimer.current);
    };
  }, []);

  const trimmedTitle = jobTitle.trim();
  const trimmedJD = jobDescription.trim();
  const titleValid = trimmedTitle.length > 0 && trimmedTitle.length <= MAX_JOB_TITLE;
  const jdValid = trimmedJD.length <= MAX_JD;
  const canSubmit = titleValid && jdValid && status !== "loading";

  const handleGenerate = async () => {
    if (!canSubmit) return;
    const myId = ++requestId.current;
    setStatus("loading");
    setError(null);
    try {
      const res = await generateInterviewPrep({
        jobTitle: trimmedTitle,
        jobDescription: trimmedJD || undefined,
        cvId: cvId || undefined,
        interviewType,
        difficulty,
      });
      if (myId !== requestId.current) return;
      if (!res.ok) {
        setError(res.error || FALLBACK_ERROR);
        setStatus("idle");
        return;
      }
      setQuestions(res.questions);
      setCvGapNote(res.cvGapNote);
      setResultJobTitle(trimmedTitle);
      setStatus("result");
    } catch (err) {
      if (myId !== requestId.current) return;
      console.error("[PrepClient] generate failed:", err);
      setError(FALLBACK_ERROR);
      setStatus("idle");
    }
  };

  const handleStartOver = () => {
    requestId.current++;
    setStatus("idle");
    setQuestions(null);
    setCvGapNote(undefined);
    setError(null);
  };

  const handleCopyAll = async () => {
    if (!questions) return;
    try {
      await navigator.clipboard.writeText(
        buildAllText(resultJobTitle, questions, cvGapNote),
      );
      setCopiedAll(true);
      if (copyAllTimer.current) clearTimeout(copyAllTimer.current);
      copyAllTimer.current = setTimeout(() => setCopiedAll(false), 1800);
    } catch {
      /* ignore */
    }
  };

  if (questions && status !== "idle") {
    return (
      <div className="mt-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-plum md:text-2xl">
              12 Questions for{" "}
              <span className="text-coral-deep">{resultJobTitle}</span>
            </h2>
            <p className="mt-0.5 text-xs text-plum-soft">
              10 standard · 2 curveballs
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPracticeMode(!practiceMode)}
            aria-pressed={practiceMode}
            className={[
              "inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-xs font-medium transition-colors",
              practiceMode
                ? "border-mint-glow bg-mint/20 text-[#0F4A42]"
                : "border-plum/15 bg-white text-plum hover:bg-cream-soft",
            ].join(" ")}
          >
            {practiceMode ? (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                Practice mode: ON
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" />
                Practice mode
              </>
            )}
          </button>
        </div>

        {cvGapNote && (
          <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 md:px-5">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-plum">
              📋 CV Coaching Note
            </p>
            <p className="text-sm leading-relaxed text-plum">{cvGapNote}</p>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-coral/30 bg-cream-soft px-4 py-3 text-sm text-coral-deep"
          >
            {error}
          </div>
        )}

        <div className="space-y-3">
          {questions.map((q, i) => (
            <QuestionCard
              key={i}
              q={q}
              index={i}
              practiceMode={practiceMode}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-plum/10 pt-5">
          <button
            type="button"
            onClick={() => void handleCopyAll()}
            className="inline-flex items-center gap-2 rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
          >
            <CopyIcon className="h-4 w-4" />
            {copiedAll ? "Copied!" : "Copy all"}
          </button>
          <button
            type="button"
            onClick={() => void handleGenerate()}
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? (
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
            onClick={handleStartOver}
            className="ml-auto inline-flex items-center gap-2 rounded-pill border border-plum/15 bg-white px-4 py-2 text-sm font-medium text-plum-soft transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
          >
            <ArrowLeft className="h-4 w-4" />
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleGenerate();
      }}
      className="mt-8 space-y-5"
    >
      <div className="space-y-4 rounded-2xl border border-plum/10 bg-white p-5 shadow-warm-card md:p-6">
        <div>
          <label htmlFor="ip-title" className={labelClass}>
            Job title <span className="text-coral">*</span>
          </label>
          <input
            id="ip-title"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Senior Product Manager"
            disabled={status === "loading"}
            maxLength={MAX_JOB_TITLE}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="ip-jd" className={labelClass}>
            Job description{" "}
            <span className="font-normal text-plum-faint">(optional)</span>
          </label>
          <textarea
            id="ip-jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job ad here for tailored questions"
            disabled={status === "loading"}
            maxLength={MAX_JD}
            rows={5}
            className={textareaClass}
          />
          <div className="mt-1 flex justify-end">
            <span
              className={
                trimmedJD.length > MAX_JD
                  ? "text-[11px] text-coral-deep"
                  : "text-[11px] text-plum-faint"
              }
            >
              {trimmedJD.length.toLocaleString()} / {MAX_JD.toLocaleString()}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="ip-cv" className={labelClass}>
            Use one of your CVs for tailoring{" "}
            <span className="font-normal text-plum-faint">(optional)</span>
          </label>
          <select
            id="ip-cv"
            value={cvId}
            onChange={(e) => setCvId(e.target.value)}
            disabled={status === "loading" || cvs.length === 0}
            className={inputClass}
          >
            <option value="">None — generic prep</option>
            {cvs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title || "Untitled CV"}
              </option>
            ))}
          </select>
          {cvs.length === 0 && (
            <p className="mt-1 text-[11px] text-plum-faint">
              You don't have any saved CVs yet — that's fine, we'll generate
              generic prep.
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Interview type</label>
          <div className="flex flex-wrap gap-2" role="radiogroup">
            {TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                role="radio"
                aria-checked={interviewType === t.value}
                onClick={() => setInterviewType(t.value)}
                disabled={status === "loading"}
                className={pillClass(interviewType === t.value)}
              >
                <span>{t.label}</span>
                <span className="ml-1.5 text-[10px] opacity-70">
                  · {t.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Difficulty</label>
          <div className="flex flex-wrap gap-2" role="radiogroup">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                type="button"
                role="radio"
                aria-checked={difficulty === d.value}
                onClick={() => setDifficulty(d.value)}
                disabled={status === "loading"}
                className={pillClass(difficulty === d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
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
        disabled={!canSubmit}
        className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-coral px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating 12 questions...
          </>
        ) : (
          <>
            <MessageCircleQuestion className="h-4 w-4" />
            Generate Interview Prep
          </>
        )}
      </button>
      {status === "loading" && (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-xs text-plum-faint"
        >
          This usually takes 15–30 seconds.
        </p>
      )}
    </form>
  );
}
