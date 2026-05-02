import type { Metadata } from "next";
import { ScoreClient } from "./score-client";

export const metadata: Metadata = {
  title: "Resume Score Checker — Free, No Signup · AlmiCV",
  description:
    "Get an instant 0-100 resume quality score with personalized improvement tips. Free, no signup required.",
  openGraph: {
    title: "Free Resume Score Checker · AlmiCV",
    description:
      "Paste your resume, get an instant 0-100 score across keywords, action verbs, format, and length — plus one actionable tip.",
    type: "website",
  },
};

export default function ResumeScorePage() {
  return (
    <main className="min-h-screen bg-cream-soft">
      <section className="mx-auto w-full max-w-2xl px-6 pb-20 pt-14 md:pt-20">
        <header className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-coral-soft/50 px-3 py-1 text-xs font-medium text-coral-deep">
            ✨ Free · No signup
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-plum md:text-5xl">
            Resume Score Checker
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-plum-soft">
            Get an instant 0-100 score with personalized improvement tips.
            Paste your resume below — we&apos;ll analyze keywords, action
            verbs, format, and length.
          </p>
        </header>

        <ScoreClient />
      </section>
    </main>
  );
}
