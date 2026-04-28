import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";
import { BRAND_BUTTON_CLASSES } from "@/components/ui/button";

async function signupAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 8) {
    redirect("/signup?error=invalid");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) redirect("/signup?error=taken");

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="rounded-3xl border border-muted/20 bg-navy-800/50 p-8 backdrop-blur">
      <h1 className="font-display text-3xl font-bold text-soft-white">Create your account</h1>
      <p className="mt-2 text-sm text-muted">
        Start building polished CVs in minutes — free, no credit card.
      </p>

      {error === "taken" && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          An account with that email already exists.
        </p>
      )}
      {error === "invalid" && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Please fill in all fields. Password must be at least 8 characters.
        </p>
      )}

      <form action={signupAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-soft-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-muted/20 bg-navy-900 px-4 py-3 text-sm text-soft-white placeholder-muted focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-soft-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-muted/20 bg-navy-900 px-4 py-3 text-sm text-soft-white placeholder-muted focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-soft-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="new-password"
            minLength={8}
            className="mt-2 w-full rounded-xl border border-muted/20 bg-navy-900 px-4 py-3 text-sm text-soft-white focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
          />
          <p className="mt-2 text-xs text-muted">At least 8 characters.</p>
        </div>
        <button type="submit" className={`${BRAND_BUTTON_CLASSES} w-full`}>
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-mint transition hover:opacity-80">
          Log in
        </Link>
      </p>
    </div>
  );
}
