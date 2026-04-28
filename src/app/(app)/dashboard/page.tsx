import Link from "next/link";
import { ArrowRight, FileText, Plus, Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const user = await requireUser();
  const resumes = await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

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
            href="/templates"
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
              Pick a template to start. The editor and AI writing helper land in the next session.
            </p>
            <Link
              href="/templates"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              Browse templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {resumes.map((resume) => (
              <li
                key={resume.id}
                className="flex items-center justify-between rounded-2xl border border-peach/30 bg-cream-soft px-5 py-4"
              >
                <div>
                  <p className="font-medium text-plum">{resume.title}</p>
                  <p className="text-xs text-plum-faint">
                    {resume.templateKey} · Updated {resume.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                <span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-medium text-[#0F4A42]">
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
