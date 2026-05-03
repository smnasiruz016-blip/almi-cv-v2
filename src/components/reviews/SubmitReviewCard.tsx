"use client";

import { useEffect, useState, useTransition } from "react";
import { CheckCircle2, Loader2, Star } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import {
  getMyReview,
  submitOrUpdateReview,
  type MyReviewPayload,
} from "@/lib/reviews";

const COMMENT_MAX = 2000;
const IMPROVEMENT_MAX = 2000;
const COMMENT_MIN = 10;

function StarPicker({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (n: number) => void;
  disabled: boolean;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="radiogroup"
      aria-label="Rating"
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            disabled={disabled}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(null)}
            onClick={() => onChange(n)}
            className="rounded-md p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-coral/30 disabled:cursor-not-allowed"
          >
            <Star
              className={`h-7 w-7 ${
                filled ? "fill-coral text-coral" : "text-plum-faint"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export function SubmitReviewCard() {
  const showToast = useToast();
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [hasExisting, setHasExisting] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [improvement, setImprovement] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await getMyReview();
      if (cancelled) return;
      if (r.ok) {
        applyPayload(r);
      }
      setLoading(false);
    })();

    function applyPayload(p: { ok: true } & MyReviewPayload) {
      if (p.review) {
        setHasExisting(true);
        setRating(p.review.rating);
        setComment(p.review.comment);
        setImprovement(p.review.improvement ?? "");
        setDisplayName(p.review.displayName ?? p.defaultDisplayName);
      } else {
        setDisplayName(p.defaultDisplayName);
      }
      setMarketingOptIn(p.marketingOptIn || !p.review);
      // Rule: if they have NO review yet, the checkbox starts checked
      // (default-checked design). If they have a prior review, restore the
      // last opt-in state they chose (could be checked or unchecked).
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedComment = comment.trim();
    if (trimmedComment.length < COMMENT_MIN) {
      showToast(
        `Please share at least ${COMMENT_MIN} characters of feedback`,
        "error",
      );
      return;
    }
    startTransition(async () => {
      const r = await submitOrUpdateReview({
        rating,
        comment: trimmedComment,
        improvement: improvement.trim() || undefined,
        displayName: displayName.trim() || undefined,
        marketingOptIn,
      });
      if (r.ok) {
        setHasExisting(true);
        showToast("JazakAllah khair! We read every review.");
      } else {
        showToast(r.error, "error");
      }
    });
  };

  const submitLabel = hasExisting ? "Update Review" : "Submit Review";
  const commentRemaining = COMMENT_MAX - comment.length;
  const improvementRemaining = IMPROVEMENT_MAX - improvement.length;
  const tooLong = comment.length > COMMENT_MAX || improvement.length > IMPROVEMENT_MAX;

  return (
    <section className="rounded-2xl border border-plum/10 bg-white p-6 shadow-warm-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-plum">
            Share your experience
          </h2>
          <p className="mt-1 text-sm text-plum-soft">
            Help other professionals discover AlmiCV. Your feedback helps us
            improve.
          </p>
        </div>
        {hasExisting && !loading && (
          <span className="inline-flex items-center gap-1 rounded-pill bg-mint/30 px-2.5 py-0.5 text-[11px] font-semibold text-[#0F4A42]">
            <CheckCircle2 className="h-3 w-3" />
            Submitted
          </span>
        )}
      </div>

      {loading ? (
        <div className="mt-4 flex items-center gap-2 text-sm text-plum-soft">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading…
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div>
            <label className="block text-xs font-medium text-plum-soft">
              Rating
            </label>
            <div className="mt-1">
              <StarPicker
                value={rating}
                onChange={setRating}
                disabled={pending}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="review-comment"
              className="flex items-center justify-between text-xs font-medium text-plum-soft"
            >
              <span>Your review</span>
              <span
                className={`tabular-nums ${
                  commentRemaining < 0
                    ? "text-coral-deep"
                    : "text-plum-faint"
                }`}
              >
                {comment.length} / {COMMENT_MAX}
              </span>
            </label>
            <textarea
              id="review-comment"
              required
              minLength={COMMENT_MIN}
              maxLength={COMMENT_MAX}
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you build with AlmiCV? What worked well?"
              className="mt-1 w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
            />
          </div>

          <div>
            <label
              htmlFor="review-improvement"
              className="flex items-center justify-between text-xs font-medium text-plum-soft"
            >
              <span>What could we improve? (optional)</span>
              <span
                className={`tabular-nums ${
                  improvementRemaining < 0
                    ? "text-coral-deep"
                    : "text-plum-faint"
                }`}
              >
                {improvement.length} / {IMPROVEMENT_MAX}
              </span>
            </label>
            <textarea
              id="review-improvement"
              maxLength={IMPROVEMENT_MAX}
              rows={3}
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              placeholder="Optional — share ideas to make AlmiCV better for you"
              className="mt-1 w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
            />
          </div>

          <div>
            <label
              htmlFor="review-display-name"
              className="block text-xs font-medium text-plum-soft"
            >
              Display name (optional)
            </label>
            <input
              id="review-display-name"
              type="text"
              maxLength={80}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
            />
            <p className="mt-1 text-xs text-plum-faint">
              How your name appears on testimonials. Defaults to your account
              name.
            </p>
          </div>

          <div className="rounded-xl border border-plum/10 bg-cream-soft px-4 py-3">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                disabled={pending}
                className="mt-0.5 h-4 w-4 rounded border-plum/30 text-coral focus:ring-coral/30"
              />
              <span className="text-sm">
                <span className="font-medium text-plum">
                  📧 Send me product updates and launch news
                </span>
                <span className="mt-0.5 block text-xs text-plum-soft">
                  We&apos;ll only email about new features and launches.
                  Unsubscribe anytime.
                </span>
              </span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={pending || tooLong || comment.trim().length < COMMENT_MIN}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Star className="h-4 w-4 fill-white" />
              )}
              {submitLabel}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
