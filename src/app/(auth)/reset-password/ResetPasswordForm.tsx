"use client";

// New-password form → POSTs to the existing /api/auth/reset-password route,
// which validates the single-use token, updates the bcrypt hash, marks the
// token used, and clears all sessions. Token comes from the ?token= query param.

import { useState } from "react";
import Link from "next/link";

const PASSWORD_MIN = 8;

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="mt-6 rounded-xl border border-coral/30 bg-coral/10 px-4 py-4 text-sm text-coral-deep">
        <p className="font-medium">Invalid reset link</p>
        <p className="mt-1">
          This link is missing its token.{" "}
          <Link href="/forgot-password" className="font-medium underline">
            Request a new one
          </Link>
          .
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mt-6">
        <div className="rounded-xl border border-mint/40 bg-mint/10 px-4 py-4 text-sm text-plum">
          <p className="font-medium">Password updated</p>
          <p className="mt-1 text-plum-soft">You can now log in with your new password.</p>
        </div>
        <Link
          href="/login"
          className="mt-4 inline-flex w-full min-h-[44px] items-center justify-center rounded-pill bg-coral px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
        >
          Log in
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < PASSWORD_MIN) {
      setError(`Password must be at least ${PASSWORD_MIN} characters.`);
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(
          data.error === "Invalid or expired token"
            ? "This reset link is invalid or has expired. Please request a new one."
            : "Something went wrong. Please try again.",
        );
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error && (
        <p className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral-deep">{error}</p>
      )}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-plum">
          New password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={PASSWORD_MIN}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
        />
        <p className="mt-1 text-xs text-plum-faint">At least {PASSWORD_MIN} characters.</p>
      </div>
      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-plum">
          Confirm new password
        </label>
        <input
          type="password"
          id="confirm"
          name="confirm"
          required
          minLength={PASSWORD_MIN}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-2 w-full rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Updating…" : "Set new password"}
      </button>
    </form>
  );
}
