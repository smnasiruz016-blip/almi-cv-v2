"use client";

import { useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  Loader2,
  MoreVertical,
  Pencil,
  Printer,
  Sparkles,
  Trash2,
} from "lucide-react";
import { duplicateResume, deleteResume } from "@/lib/resume-actions";
import { downloadCvPdf } from "@/lib/download-pdf";
import { useToast } from "@/components/ui/Toast";

const MENU_HEIGHT_ESTIMATE = 265;

type Position = "below" | "above";

export function CVCardMenu({
  resumeId,
  resumeTitle,
  onStartRename,
}: {
  resumeId: string;
  resumeTitle: string;
  onStartRename: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [position, setPosition] = useState<Position>("below");
  const [pending, startTransition] = useTransition();
  const [downloading, setDownloading] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const showToast = useToast();

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceBelow < MENU_HEIGHT_ESTIMATE && rect.top > spaceBelow) {
      setPosition("above");
    } else {
      setPosition("below");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(t) &&
        triggerRef.current &&
        !triggerRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const handleDuplicate = () => {
    setOpen(false);
    startTransition(async () => {
      try {
        await duplicateResume(resumeId);
        router.refresh();
      } catch (err) {
        console.error("Duplicate failed", err);
      }
    });
  };

  const handleRename = () => {
    setOpen(false);
    onStartRename();
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        setConfirmDelete(false);
        router.refresh();
      } catch (err) {
        console.error("Delete failed", err);
      }
    });
  };

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    setOpen(false);
    try {
      await downloadCvPdf(resumeId);
      showToast("PDF downloaded", "success");
    } catch (err) {
      console.error("PDF download failed", err);
      showToast("Couldn't generate PDF, please try again", "error");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          aria-label="CV actions"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-faint transition-colors hover:bg-peach/30 hover:text-plum focus:outline-none focus:ring-2 focus:ring-coral/30"
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin text-coral" />
          ) : (
            <MoreVertical className="h-4 w-4" />
          )}
        </button>

        {open && (
          <div
            ref={menuRef}
            role="menu"
            className={`absolute right-0 z-20 w-52 overflow-hidden rounded-xl border border-peach/40 bg-cream shadow-warm-card-hover ${
              position === "above" ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            <a
              role="menuitem"
              href={`/cv/${resumeId}/edit`}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-plum transition-colors hover:bg-coral/10"
              onClick={() => setOpen(false)}
            >
              <Pencil className="h-4 w-4" />
              Open editor
            </a>
            <a
              role="menuitem"
              href={`/cv/${resumeId}/tailor`}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-plum transition-colors hover:bg-coral/10"
              onClick={() => setOpen(false)}
            >
              <Sparkles className="h-4 w-4 text-coral" />
              Tailor for job
            </a>
            <button
              role="menuitem"
              type="button"
              onClick={handleRename}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-plum transition-colors hover:bg-coral/10"
            >
              <Pencil className="h-4 w-4" />
              Rename
            </button>
            <button
              role="menuitem"
              type="button"
              onClick={handleDuplicate}
              disabled={pending}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-plum transition-colors hover:bg-coral/10 disabled:opacity-50"
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Pencil className="h-4 w-4" />
              )}
              Duplicate
            </button>
            <button
              role="menuitem"
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-plum transition-colors hover:bg-coral/10 disabled:opacity-50"
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download PDF
            </button>
            <a
              role="menuitem"
              href={`/cv/${resumeId}/print`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-plum transition-colors hover:bg-coral/10"
              onClick={() => setOpen(false)}
            >
              <Printer className="h-4 w-4" />
              Print
            </a>
            <div className="border-t border-peach/40" />
            <button
              role="menuitem"
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirmDelete(true);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-coral-deep transition-colors hover:bg-coral/10"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-plum/40 p-4"
          onClick={(e) => {
            e.stopPropagation();
            if (!pending) setConfirmDelete(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape" && !pending) setConfirmDelete(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-warm-card-hover"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl text-plum">Delete this CV?</h3>
            <p className="mt-2 text-sm text-plum-soft">
              &ldquo;{resumeTitle}&rdquo; will be permanently removed. This can&rsquo;t be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                disabled={pending}
                className="rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-plum/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-pill bg-coral-deep px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral disabled:opacity-50"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
