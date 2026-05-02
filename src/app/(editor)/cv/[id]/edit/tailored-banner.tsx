"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, X } from "lucide-react";

const VISIBLE_MS = 6000;

type Props = {
  resumeId: string;
  onRestoreClick: () => void;
};

export function TailoredBanner({ resumeId, onRestoreClick }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    if (searchParams.get("tailored") !== "1") return;
    handled.current = true;
    setOpen(true);
    // Strip the query param so a refresh doesn't replay the banner.
    router.replace(`/cv/${resumeId}/edit`, { scroll: false });
    const t = setTimeout(() => setOpen(false), VISIBLE_MS);
    return () => clearTimeout(t);
  }, [searchParams, router, resumeId]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-auto fixed right-4 top-4 z-[60] flex max-w-md items-center gap-3 rounded-pill border border-mint/40 bg-white px-4 py-2.5 text-sm text-plum shadow-warm-card-hover"
    >
      <Sparkles className="h-4 w-4 shrink-0 text-[#0F4A42]" />
      <span className="font-medium">Your CV has been tailored.</span>
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          onRestoreClick();
        }}
        className="rounded text-xs font-semibold text-coral underline-offset-2 transition-colors hover:text-coral-deep hover:underline focus:outline-none focus:ring-2 focus:ring-coral/30"
      >
        Restore previous
      </button>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setOpen(false)}
        className="ml-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-plum-faint transition-colors hover:bg-cream-soft hover:text-plum"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
