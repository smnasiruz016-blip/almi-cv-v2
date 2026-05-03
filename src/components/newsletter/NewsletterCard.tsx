"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { subscribeToNewsletter } from "@/lib/subscribers";

export function NewsletterCard() {
  const showToast = useToast();
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  // Honeypot — visually hidden but rendered in the DOM. Bots that scrape
  // and fill every input will populate this; humans cannot see or focus it.
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      showToast("Please enter your email", "error");
      return;
    }
    startTransition(async () => {
      const r = await subscribeToNewsletter({
        email: trimmed,
        source: "homepage_footer",
        website,
      });
      if (r.ok) {
        setSubmitted(true);
        // Generic success — same message whether new subscriber, already
        // subscribed, or already-opted-in account-holder. No info leak.
      } else {
        showToast(r.error, "error");
      }
    });
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-coral/20 bg-white p-6 shadow-warm-card sm:p-8">
      {submitted ? (
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
          <div>
            <h3 className="text-base font-semibold text-plum">
              Thanks! You&apos;re on the list.
            </h3>
            <p className="mt-1 text-sm text-plum-soft">
              We&apos;ll email you when we launch new features and templates.
              Unsubscribe anytime.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
            <div>
              <h3 className="text-base font-semibold text-plum sm:text-lg">
                Stay in the loop
              </h3>
              <p className="mt-1 text-sm text-plum-soft">
                Be the first to know about new AI features, templates, and
                updates.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-2 sm:flex-row"
          >
            {/* Honeypot — visibility:hidden + position:absolute (NOT
                display:none, which sophisticated bots detect). Human users
                cannot see, focus, or tab into this field. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{
                visibility: "hidden",
                position: "absolute",
                left: "-9999px",
                width: 0,
                height: 0,
              }}
            />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={pending}
              className="flex-1 rounded-pill border border-plum/15 bg-cream-soft px-4 py-2.5 text-sm text-plum placeholder:text-plum-faint focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-plum-faint">
            No spam. Unsubscribe anytime.
          </p>
        </>
      )}
    </div>
  );
}
