"use client";

import { Sparkles } from "lucide-react";

type Props = {
  acceptedCount: number;
  onDiscard: () => void;
  onApply: () => void;
};

export function ActionBar({ acceptedCount, onDiscard, onApply }: Props) {
  const disabled = acceptedCount === 0;
  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 border-t border-plum/10 bg-white/95 px-4 py-3 shadow-[0_-4px_12px_rgba(45,27,61,0.05)] backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onDiscard}
          className="inline-flex items-center justify-center rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
        >
          Discard changes
        </button>
        <button
          type="button"
          onClick={onApply}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4" />
          Apply {acceptedCount} {acceptedCount === 1 ? "change" : "changes"}
        </button>
      </div>
    </div>
  );
}
