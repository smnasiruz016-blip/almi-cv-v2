import type { Metadata } from "next";
import { listResumes } from "@/lib/resume-actions";
import { PrepClient } from "./prep-client";

export const metadata: Metadata = {
  title: "Interview Prep · AlmiCV",
  description:
    "Generate 12 tailored interview questions with frameworks, talking points, and red flags for your target role.",
};

export default async function InterviewPrepPage() {
  const resumes = await listResumes();
  const cvs = resumes.map((r) => ({ id: r.id, title: r.title }));

  return (
    <section className="mx-auto w-full max-w-3xl pb-20">
      <header className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-coral-soft/50 px-3 py-1 text-xs font-medium text-coral-deep">
          ✨ Interview Prep
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-plum md:text-5xl">
          12 Questions, Tailored
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-plum-soft">
          Generate realistic interview questions for your target role —
          frameworks, talking points, red flags, and curveballs interviewers
          actually ask.
        </p>
      </header>

      <PrepClient cvs={cvs} />
    </section>
  );
}
