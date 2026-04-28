import Link from "next/link";
import { ArrowRight, FileText, ScanLine, Sparkles, Wand2 } from "lucide-react";
import { BRAND_BUTTON_CLASSES, OUTLINE_BUTTON_CLASSES } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

const BRAND_TOKENS = [
  { name: "Dark navy", hex: "#0F1729", swatch: "bg-navy-900 border border-muted/30" },
  { name: "Deep navy", hex: "#1A2238", swatch: "bg-navy-800 border border-muted/30" },
  { name: "Mint", hex: "#5EEAD4", swatch: "bg-mint" },
  { name: "Soft white", hex: "#F8FAFC", swatch: "bg-soft-white" },
  { name: "Muted", hex: "#94A3B8", swatch: "bg-muted" },
];

const FEATURES = [
  {
    icon: FileText,
    title: "Live preview",
    body: "See your CV update as you type. Every change reflects instantly in the polished export.",
  },
  {
    icon: Wand2,
    title: "AI writing helper",
    body: "Paste a job description, get bullet rewrites that keep your voice and the right keywords.",
  },
  {
    icon: ScanLine,
    title: "ATS score",
    body: "Real-time feedback on parseability, keyword match, and structure. Ship when you hit green.",
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  const primaryHref = user ? "/dashboard" : "/signup";
  const primaryLabel = user ? "Open dashboard" : "Get started — free";

  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-mint/10 blur-3xl" />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint">
            <span className="font-display text-lg font-bold text-navy-900">A</span>
          </div>
          <span className="font-display text-xl font-bold text-soft-white">AlmiCV</span>
        </div>
        {!user ? (
          <Link
            href="/login"
            className="text-sm font-medium text-muted transition hover:text-soft-white"
          >
            Log in
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted transition hover:text-soft-white"
          >
            Dashboard
          </Link>
        )}
      </header>

      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 text-xs font-medium text-mint">
          <Sparkles className="h-3.5 w-3.5" />
          Brand-quality CVs without the design work
        </span>
        <h1 className="font-display mt-8 text-5xl font-bold leading-[1.05] tracking-tight text-soft-white md:text-7xl">
          A CV that looks like it was{" "}
          <span className="text-mint">designed for you.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
          Premium-grade templates, an editor that updates live, AI writing that respects your voice, and an ATS score
          that tells you when you&apos;re ready.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href={primaryHref} className={`${BRAND_BUTTON_CLASSES} gap-2`}>
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/templates" className={OUTLINE_BUTTON_CLASSES}>
            See templates
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-muted/20 bg-navy-800/50 p-8 backdrop-blur">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.3em] text-muted">
            Brand system, locked from day one
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {BRAND_TOKENS.map((color) => (
              <div key={color.hex} className="text-center">
                <div className={`mx-auto h-16 w-16 rounded-2xl ${color.swatch}`} />
                <p className="mt-3 text-sm font-medium text-soft-white">{color.name}</p>
                <p className="font-mono text-xs text-muted">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-muted/20 bg-navy-800/50 p-6 backdrop-blur transition hover:border-mint/40"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-mint/10">
                <feature.icon className="h-5 w-5 text-mint" />
              </div>
              <h3 className="font-display mt-4 text-lg font-semibold text-soft-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-12 text-center text-xs text-muted">
        <p>AlmiCV · Built with Next.js, Prisma, and Tailwind CSS</p>
      </footer>
    </main>
  );
}
