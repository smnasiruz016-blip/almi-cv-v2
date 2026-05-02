"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { tailorCV, type TailorProposal } from "@/lib/ai/tailor-cv";

const MIN_JD = 50;
const MAX_JD = 5000;

export function TailorClient({
  resumeId,
  cvTitle,
}: {
  resumeId: string;
  cvTitle: string;
}) {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proposal, setProposal] = useState<TailorProposal | null>(null);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const trimmedLength = jd.trim().length;
  const validLength = trimmedLength >= MIN_JD && trimmedLength <= MAX_JD;

  const submit = async () => {
    if (loading) return;
    if (!validLength) {
      showError(
        trimmedLength < MIN_JD
          ? `Paste a longer job description — at least ${MIN_JD} characters`
          : `Job description is too long — keep it under ${MAX_JD.toLocaleString()} characters`,
      );
      return;
    }
    setLoading(true);
    setError(null);
    if (errorTimer.current) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
    setProposal(null);
    try {
      const result = await tailorCV({
        cvId: resumeId,
        jobDescription: jd.trim(),
      });
      if (!result.ok) {
        showError(result.error);
        return;
      }
      setProposal(result.proposal);
    } catch (err) {
      console.error("[TailorClient] submit failed:", err);
      showError("Couldn't tailor your CV right now — try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream-soft px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/cv/${resumeId}/edit`}
          className="inline-flex items-center gap-1.5 text-sm text-plum-soft transition-colors hover:text-coral"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to editor
        </Link>

        <header className="mb-8 mt-6">
          <h1 className="text-2xl font-semibold text-plum sm:text-3xl">
            <span aria-hidden="true">✨ </span>Tailor your CV for a job
          </h1>
          <p className="mt-2 text-sm text-plum-soft">
            Paste a job description below. We&apos;ll rewrite your Summary,
            Experience bullets, and Skills order to match.
          </p>
          {cvTitle && (
            <p className="mt-1 text-xs text-plum-faint">
              Working on:{" "}
              <span className="font-medium text-plum-soft">{cvTitle}</span>
            </p>
          )}
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="space-y-4 rounded-xl border border-plum/10 bg-white p-5 shadow-sm sm:p-6"
        >
          <div>
            <label
              htmlFor="tailor-jd"
              className="mb-1.5 block text-xs font-medium text-plum-soft"
            >
              Job description
            </label>
            <textarea
              id="tailor-jd"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job description here — title, requirements, responsibilities..."
              rows={12}
              disabled={loading}
              className="block max-h-96 w-full resize-y rounded-md border border-plum/15 bg-cream-soft px-3 py-2.5 text-sm leading-relaxed text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
              <span className="text-plum-faint">
                Tip: longer JDs (200+ words) produce sharper rewrites.
              </span>
              <span
                className={
                  validLength || trimmedLength === 0
                    ? "text-plum-soft"
                    : "text-coral-deep"
                }
              >
                {trimmedLength.toLocaleString()} / {MAX_JD.toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !validLength}
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Tailoring...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Tailor my CV
                </>
              )}
            </button>
            {loading && (
              <p className="mt-2 text-center text-xs text-plum-faint">
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

        {proposal && (
          <section className="mt-6 space-y-3">
            <div className="rounded-md bg-mint/20 px-4 py-3 text-sm font-medium text-[#0F4A42]">
              <span aria-hidden="true">✅ </span>Tailored! Diff UI coming in the
              next update.
            </div>
            <details className="rounded-xl border border-plum/10 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer select-none text-sm font-medium text-plum-soft transition-colors hover:text-plum">
                View raw JSON output
              </summary>
              <pre className="mt-3 max-h-96 overflow-auto rounded-md bg-cream-soft p-3 font-mono text-xs leading-relaxed text-plum">
                {JSON.stringify(proposal, null, 2)}
              </pre>
            </details>
          </section>
        )}
      </div>
    </main>
  );
}
