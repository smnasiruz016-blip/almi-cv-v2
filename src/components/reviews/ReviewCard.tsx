"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader2, Star } from "lucide-react";
import { getMyReview } from "@/lib/reviews";
import { ReviewModal } from "./ReviewModal";

export function ReviewCard() {
  const [open, setOpen] = useState(false);
  const [hasReview, setHasReview] = useState<boolean | null>(null);

  // Fetch on mount and after the modal closes — covers the case where the
  // user just submitted their first review and we need to flip the card to
  // the "Edit" state.
  useEffect(() => {
    if (open) return;
    let cancelled = false;
    (async () => {
      const r = await getMyReview();
      if (cancelled) return;
      if (r.ok) setHasReview(r.review !== null);
      else setHasReview(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const loading = hasReview === null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-4 rounded-2xl border border-coral/20 bg-white p-5 text-left shadow-warm-card transition-all hover:-translate-y-0.5 hover:border-coral/40 hover:shadow-warm-card-hover focus:outline-none focus:ring-4 focus:ring-coral/20"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral/10 text-coral">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : hasReview ? (
            <Check className="h-5 w-5" />
          ) : (
            <Star className="h-5 w-5 fill-coral" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-plum">
            {hasReview ? "You've shared a review" : "Share your experience"}
          </p>
          <p className="mt-0.5 text-xs text-plum-soft">
            {hasReview
              ? "Tap to update your review."
              : "Help us improve AlmiCV. Your feedback shapes what we build next."}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-coral transition-colors group-hover:text-coral-deep">
          {hasReview ? "Edit" : "Review"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>

      <ReviewModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
