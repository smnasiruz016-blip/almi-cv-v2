import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";

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
    <div className="rounded-2xl border border-peach/30 bg-white p-8 shadow-warm-card-hover">
      <h1 className="text-3xl text-plum">Create your account</h1>
      <p className="mt-2 text-sm text-plum-soft">
        Start building polished CVs in minutes — free, no credit card.
      </p>

      {error === "taken" && (
        <p className="mt-4 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral-deep">
          An account with that email already exists.
        </p>
      )}
      {error === "invalid" && (
        <p className="mt-4 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral-deep">
          Please fill in all fields. Password must be at least 8 characters.
        </p>
      )}

      <form action={signupAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-plum">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-sm text-plum placeholder:text-plum-faint focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-plum">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-sm text-plum placeholder:text-plum-faint focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-plum">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="new-password"
            minLength={8}
            className="mt-2 w-full rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
          />
          <p className="mt-2 text-xs text-plum-faint">At least 8 characters.</p>
        </div>
        <button
          type="submit"
          className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-plum-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-coral hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
