import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";
import { BRAND_BUTTON_CLASSES } from "@/components/ui/button";

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
    <div className="rounded-3xl border border-muted/20 bg-navy-800/50 p-8 backdrop-blur">
      <h1 className="font-display text-3xl font-bold text-soft-white">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">Log in to continue building your CV.</p>

      {error === "invalid" && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Email or password is incorrect.
        </p>
      )}
      {error === "missing" && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Please enter both email and password.
        </p>
      )}

      <form action={loginAction} className="mt-6 space-y-4">
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
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-muted/20 bg-navy-900 px-4 py-3 text-sm text-soft-white focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
          />
        </div>
        <button type="submit" className={`${BRAND_BUTTON_CLASSES} w-full`}>
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-mint transition hover:opacity-80">
          Create an account
        </Link>
      </p>
    </div>
  );
}
