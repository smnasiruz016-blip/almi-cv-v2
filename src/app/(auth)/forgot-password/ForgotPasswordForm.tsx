"use client";

// Email form → POSTs to the existing /api/auth/forgot-password route (which is
// rate-limited and always returns a generic 200, so we never leak whether an
// account exists). On success we swap the form for a generic confirmation.

import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!res.ok) throw new Error("Something went wrong");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div className="mt-6 rounded-xl border border-mint/40 bg-mint/10 px-4 py-4 text-sm text-plum">
        <p className="font-medium">Check your inbox</p>
        <p className="mt-1 text-plum-soft">
          If an account exists for <span className="font-medium text-plum">{email.trim().toLowerCase()}</span>, we&apos;ve
          sent a password reset link. It expires in 1 hour. Don&apos;t forget to check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error && (
        <p className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral-deep">{error}</p>
      )}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-plum/15 bg-cream-soft px-4 py-3 text-sm text-plum placeholder:text-plum-faint focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
