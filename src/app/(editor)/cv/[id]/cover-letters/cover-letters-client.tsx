"use client";

import { useCallback, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Loader2,
  Mail,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/Toast";
import { GenerateCoverLetterModal } from "@/components/editor/GenerateCoverLetterModal";
import {
  deleteCoverLetter,
  listCoverLetters,
} from "@/lib/cv/cover-letters";
import { downloadCoverLetterPdf } from "@/lib/download-pdf";

const RTF = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function relativeTime(iso: string): string {
  const date = new Date(iso);
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSec);
  if (abs < 60) return RTF.format(diffSec, "second");
  if (abs < 3600) return RTF.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return RTF.format(Math.round(diffSec / 3600), "hour");
  if (abs < 86400 * 30) return RTF.format(Math.round(diffSec / 86400), "day");
  if (abs < 86400 * 365)
    return RTF.format(Math.round(diffSec / (86400 * 30)), "month");
  return RTF.format(Math.round(diffSec / (86400 * 365)), "year");
}

const TONE_LABELS: Record<string, string> = {
  formal: "Formal",
  confident: "Confident",
  conversational: "Conversational",
};

function toneLabel(tone: string) {
  return TONE_LABELS[tone] ?? "Confident";
}

function previewSnippet(body: string, max = 140): string {
  const flat = body.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max).trimEnd() + "…";
}

type CoverLetterItem = {
  id: string;
  title: string;
  tone: string;
  body: string;
  hiringManager: string | null;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  resumeId: string;
  cvTitle: string;
  initialItems: CoverLetterItem[];
};

export function CoverLettersClient({
  resumeId,
  cvTitle,
  initialItems,
}: Props) {
  const showToast = useToast();
  const [items, setItems] = useState<CoverLetterItem[]>(initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [confirmDelete, setConfirmDelete] = useState<CoverLetterItem | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [, startRefresh] = useTransition();

  const refresh = useCallback(() => {
    startRefresh(async () => {
      const result = await listCoverLetters(resumeId);
      if (!result.ok) return;
      setItems(
        result.data.map((it) => ({
          id: it.id,
          title: it.title,
          tone: it.tone,
          body: it.body,
          hiringManager: it.hiringManager,
          createdAt: it.createdAt.toISOString(),
          updatedAt: it.updatedAt.toISOString(),
        })),
      );
    });
  }, [resumeId]);

  const openCreate = () => {
    setEditingId(undefined);
    setModalOpen(true);
  };

  const openEdit = (id: string) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const handleSaved = () => {
    showToast(editingId ? "Cover letter updated" : "✨ Cover letter saved", "success");
    refresh();
  };

  const handleDownload = async (id: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    try {
      await downloadCoverLetterPdf(id);
      showToast("PDF downloaded", "success");
    } catch (err) {
      console.error("[CoverLettersClient] download failed:", err);
      showToast(
        err instanceof Error && err.message
          ? err.message
          : "Couldn't generate PDF — try again",
        "error",
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async () => {
    const target = confirmDelete;
    if (!target || deletingId) return;
    setDeletingId(target.id);
    try {
      const result = await deleteCoverLetter(target.id);
      if (!result.ok) {
        showToast(result.error || "Couldn't delete — try again", "error");
        return;
      }
      setItems((prev) => prev.filter((it) => it.id !== target.id));
      setConfirmDelete(null);
      showToast("Cover letter deleted", "success");
    } catch (err) {
      console.error("[CoverLettersClient] delete failed:", err);
      showToast("Couldn't delete — try again", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream-soft">
      <div className="sticky top-0 z-30 border-b border-plum/10 bg-white/95 backdrop-blur-md">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/cv/${resumeId}/edit`}
              className="inline-flex items-center gap-1.5 text-sm text-plum-soft transition-colors hover:text-plum"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to editor
            </Link>
            <div className="h-5 w-px bg-plum/15" />
            <div>
              <h1 className="text-lg font-semibold text-plum">Cover Letters</h1>
              <p className="text-xs text-plum-faint">
                Working on: <span className="text-plum-soft">{cvTitle}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
          >
            <Plus className="h-4 w-4" />
            New cover letter
          </button>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-plum/10 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-coral-soft text-coral-deep">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-plum">
              No cover letters yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-plum-soft">
              Generate your first one with AI — we&apos;ll tailor it to the job
              and ground it in this CV.
            </p>
            <button
              type="button"
              onClick={openCreate}
              className="mt-6 inline-flex items-center gap-2 rounded-pill bg-coral px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              <Sparkles className="h-4 w-4" />
              Create Cover Letter
            </button>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => {
              const snippet = previewSnippet(item.body);
              return (
                <li key={item.id}>
                  <div className="group relative rounded-2xl border border-plum/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-coral/30 hover:shadow-warm-card-hover">
                    <button
                      type="button"
                      onClick={() => openEdit(item.id)}
                      aria-label={`Edit ${item.title}`}
                      className="absolute inset-0 z-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coral/30"
                    />
                    <div className="pointer-events-none relative z-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-plum">
                            {item.title}
                          </h3>
                          <span className="inline-flex items-center rounded-pill bg-coral-soft px-2.5 py-0.5 text-[11px] font-medium text-coral-deep">
                            {toneLabel(item.tone)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-plum-faint">
                          Created {relativeTime(item.createdAt)}
                          {item.updatedAt !== item.createdAt &&
                            ` · Updated ${relativeTime(item.updatedAt)}`}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm text-plum-soft">
                          {snippet}
                        </p>
                      </div>
                      <div className="pointer-events-auto flex shrink-0 flex-wrap items-center gap-2 self-end sm:self-start">
                        <button
                          type="button"
                          onClick={() => openEdit(item.id)}
                          className="inline-flex items-center gap-1.5 rounded-pill border border-plum/15 bg-white px-3 py-1.5 text-xs font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDownload(item.id)}
                          disabled={downloadingId === item.id}
                          aria-label={`Download ${item.title} as PDF`}
                          className="inline-flex items-center gap-1.5 rounded-pill border border-plum/15 bg-white px-3 py-1.5 text-xs font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {downloadingId === item.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Download className="h-3.5 w-3.5" />
                          )}
                          {downloadingId === item.id ? "Generating…" : "PDF"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(item)}
                          aria-label={`Delete ${item.title}`}
                          className="inline-flex items-center gap-1.5 rounded-pill border border-plum/15 bg-white px-3 py-1.5 text-xs font-medium text-plum-soft transition-colors hover:border-coral/40 hover:bg-cream-soft hover:text-coral-deep focus:outline-none focus:ring-2 focus:ring-coral/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      <GenerateCoverLetterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cvId={resumeId}
        editingId={editingId}
        onSaved={handleSaved}
      />

      <Modal
        open={!!confirmDelete}
        onClose={() => {
          if (!deletingId) setConfirmDelete(null);
        }}
        title="Delete cover letter?"
        size="sm"
      >
        <p className="text-sm text-plum-soft">
          Delete{" "}
          <span className="font-semibold text-plum">
            &ldquo;{confirmDelete?.title}&rdquo;
          </span>
          ? This cannot be undone.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => setConfirmDelete(null)}
            disabled={!!deletingId}
            className="inline-flex items-center justify-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={!!deletingId}
            className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deletingId ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}
