"use client";

import { useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { restoreSnapshot } from "@/lib/cv/snapshots";

type Props = {
  open: boolean;
  resumeId: string;
  onClose: () => void;
};

export function RestoreCVModal({ open, resumeId, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (loading) return;
    setError(null);
    onClose();
  };

  const handleRestore = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await restoreSnapshot(resumeId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      // Full reload so the editor picks up the restored CV from the server
      // — the client's local cvData state would otherwise stay stale.
      window.location.assign(`/cv/${resumeId}/edit`);
    } catch (err) {
      console.error("[RestoreCVModal] restore failed:", err);
      setError("Couldn't restore right now — try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Restore previous CV?"
      size="sm"
    >
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-plum-soft">
          This will replace your current CV with the version from before the
          last tailor. This action can&apos;t be undone after this point.
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
            onClick={handleClose}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleRestore}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4" />
                Restore
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
