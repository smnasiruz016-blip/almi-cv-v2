import Link from "next/link";
import { ArrowRight, FileText, MoreVertical, Plus, Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listResumes } from "@/lib/resume-actions";
import { getTemplate } from "@/lib/templates";
import { TemplateThumbnail } from "@/components/templates/TemplateThumbnail";
import type { CVData } from "@/lib/cv-types";

const RTF = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function relativeTime(date: Date) {
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSec);
  if (abs < 60) return RTF.format(diffSec, "second");
  if (abs < 3600) return RTF.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return RTF.format(Math.round(diffSec / 3600), "hour");
  if (abs < 86400 * 30) return RTF.format(Math.round(diffSec / 86400), "day");
  if (abs < 86400 * 365) return RTF.format(Math.round(diffSec / (86400 * 30)), "month");
  return RTF.format(Math.round(diffSec / (86400 * 365)), "year");
}

export default async function DashboardPage() {
  const user = await requireUser();
  const resumes = await listResumes();

  return (
    <div className="space-y-8">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full bg-mint/20 px-3 py-1 text-xs font-medium text-[#0F4A42]">
          <Sparkles className="h-3.5 w-3.5" />
          {user.subscriptionTier === "PREMIUM" ? "Premium" : "Free plan"}
        </span>
        <h1 className="mt-4 text-4xl text-plum md:text-5xl">
          Welcome back, {user.name.split(" ")[0]}.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-plum-soft">
          Your CV workspace. Pick a template, fill in your story, and ship something polished.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
          <p className="text-xs font-medium uppercase tracking-widest text-coral">Your CVs</p>
          <p className="mt-3 font-display text-4xl font-medium text-plum">{resumes.length}</p>
        </div>
        <div className="rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
          <p className="text-xs font-medium uppercase tracking-widest text-coral">Plan</p>
          <p className="mt-3 font-display text-4xl font-medium text-plum">
            {user.subscriptionTier === "PREMIUM" ? "Premium" : "Free"}
          </p>
        </div>
        <div className="rounded-2xl border border-lavender/40 bg-lavender-soft p-6 shadow-warm-card">
          <p className="text-xs font-medium uppercase tracking-widest text-coral">Coming next</p>
          <p className="mt-3 font-display text-2xl font-medium text-plum">Editor + AI</p>
        </div>
      </section>

      <section className="rounded-2xl border border-peach/40 bg-white p-8 shadow-warm-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl text-plum">Your CVs</h2>
            <p className="mt-2 text-sm text-plum-soft">Start with a brand-quality template.</p>
          </div>
          <Link
            href="/cv/new?template=classic-serif"
            className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
          >
            <Plus className="h-4 w-4" />
            New CV
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-peach p-10 text-center sm:p-12">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/10">
              <FileText className="h-6 w-6 text-coral" />
            </div>
            <h3 className="mt-4 text-xl text-plum">No CVs yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-plum-soft">
              Start with Classic Serif — fill in your story, and your CV updates live.
            </p>
            <Link
              href="/cv/new?template=classic-serif"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              Start your first CV
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Link
                key={resume.id}
                href={`/cv/${resume.id}/edit`}
                className="group relative block rounded-2xl border border-peach/40 bg-white p-5 shadow-warm-card transition-all hover:shadow-warm-card-hover"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-widest text-coral">
                    {getTemplate(resume.template).name}
                  </p>
                  <p className="shrink-0 text-xs text-plum-faint">
                    Edited {relativeTime(resume.updatedAt)}
                  </p>
                </div>
                <p className="mt-2 font-display text-lg text-plum">{resume.title}</p>
                <div className="mt-3">
                  <TemplateThumbnail
                    template={getTemplate(resume.template)}
                    data={(resume.data ?? {}) as CVData}
                    scale={0.3}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-coral">Open editor →</span>
                  <span className="text-plum-faint transition-colors group-hover:text-plum">
                    <MoreVertical className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
