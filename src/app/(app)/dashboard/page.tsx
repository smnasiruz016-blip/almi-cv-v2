import Link from "next/link";
import { ArrowRight, FileText, Plus, Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BRAND_BUTTON_CLASSES } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await requireUser();
  const resumes = await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-3 py-1 text-xs font-medium text-mint">
          <Sparkles className="h-3.5 w-3.5" />
          {user.subscriptionTier === "PREMIUM" ? "Premium" : "Free plan"}
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-soft-white md:text-5xl">
          Welcome back, {user.name.split(" ")[0]}.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Your CV workspace. Pick a template, fill in your story, and ship something polished.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-muted/20 bg-navy-800/50 p-6 backdrop-blur">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Your CVs</p>
          <p className="font-display mt-3 text-4xl font-bold text-soft-white">{resumes.length}</p>
        </div>
        <div className="rounded-3xl border border-muted/20 bg-navy-800/50 p-6 backdrop-blur">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Plan</p>
          <p className="font-display mt-3 text-4xl font-bold text-soft-white">
            {user.subscriptionTier === "PREMIUM" ? "Premium" : "Free"}
          </p>
        </div>
        <div className="rounded-3xl border border-mint/30 bg-mint/10 p-6 backdrop-blur">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mint">Coming next</p>
          <p className="font-display mt-3 text-2xl font-bold text-soft-white">Editor + AI</p>
        </div>
      </section>

      <section className="rounded-3xl border border-muted/20 bg-navy-800/50 p-8 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-soft-white">Your CVs</h2>
            <p className="mt-2 text-sm text-muted">Start with a brand-quality template.</p>
          </div>
          <Link href="/templates" className={`${BRAND_BUTTON_CLASSES} gap-2`}>
            <Plus className="h-4 w-4" />
            New CV
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-muted/30 p-10 text-center sm:p-12">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/10">
              <FileText className="h-6 w-6 text-mint" />
            </div>
            <h3 className="font-display mt-4 text-xl font-semibold text-soft-white">No CVs yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Pick a template to start. The editor and AI writing helper land in the next session.
            </p>
            <Link href="/templates" className={`${BRAND_BUTTON_CLASSES} mt-6 gap-2`}>
              Browse templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {resumes.map((resume) => (
              <li
                key={resume.id}
                className="flex items-center justify-between rounded-2xl border border-muted/10 bg-navy-900/50 px-5 py-4"
              >
                <div>
                  <p className="font-medium text-soft-white">{resume.title}</p>
                  <p className="text-xs text-muted">
                    {resume.templateKey} · Updated {resume.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <span className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-muted">
                  {resume.status.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
