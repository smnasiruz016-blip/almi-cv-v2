"use client";

import { Loader2, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/modal";

type Props = {
  open: boolean;
  acceptedCount: number;
  loading: boolean;
  error: string | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ApplyConfirmModal({
  open,
  acceptedCount,
  loading,
  error,
  onConfirm,
  onCancel,
}: Props) {
  const title =
    acceptedCount === 1 ? "Apply 1 change?" : `Apply ${acceptedCount} changes?`;
  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm">
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-plum-soft">
          Your current CV will be backed up automatically. You can restore the
          previous version anytime from the editor.
        </p>

        {error && (
          <div
            role="alert"
            className="rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Apply Changes
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
