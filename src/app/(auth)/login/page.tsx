import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) redirect("/login?error=invalid");

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) redirect("/login?error=invalid");

  await createSession(user.id);
  redirect("/dashboard");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="rounded-2xl border border-peach/30 bg-white p-8 shadow-warm-card-hover">
      <h1 className="text-3xl text-plum">Welcome back</h1>
      <p className="mt-2 text-sm text-plum-soft">Log in to continue building your CV.</p>

      {error === "invalid" && (
        <p className="mt-4 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral-deep">
          Email or password is incorrect.
        </p>
      )}
      {error === "missing" && (
        <p className="mt-4 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral-deep">
          Please enter both email and password.
        </p>
      )}

      <form action={loginAction} className="mt-6 space-y-4">
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
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-plum-soft">
        New here?{" "}
        <Link href="/signup" className="font-medium text-coral hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
