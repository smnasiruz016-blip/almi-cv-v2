"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Download,
  Languages,
  Loader2,
  Mail,
  MessageCircleQuestion,
  Printer,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { CVEditorSidebar } from "@/components/editor/CVEditorSidebar";
import { GenerateCoverLetterModal } from "@/components/editor/GenerateCoverLetterModal";
import { TranslateCvModal } from "@/components/editor/TranslateCvModal";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { updateResume } from "@/lib/resume-actions";
import { downloadCvPdf } from "@/lib/download-pdf";
import { useToast } from "@/components/ui/Toast";
import type { CVData } from "@/lib/cv-types";
import { getTemplate } from "@/lib/templates";
import { RestoreCVModal } from "./restore-modal";
import { TailoredBanner } from "./tailored-banner";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function EditorClient({
  resumeId,
  initialTitle,
  initialData,
  templateSlug,
  hasSnapshot,
  isPro,
}: {
  resumeId: string;
  initialTitle: string;
  initialData: CVData;
  templateSlug: string;
  hasSnapshot: boolean;
  isPro: boolean;
}) {
  const template = getTemplate(templateSlug);
  const TemplateComponent = template.Component;
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [cvName, setCvName] = useState(initialTitle);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [downloading, setDownloading] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const isInitialMount = useRef(true);
  const showToast = useToast();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setSaveStatus("idle");
    const timer = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await updateResume(resumeId, { title: cvName, data: cvData });
        setSaveStatus("saved");
      } catch (err) {
        setSaveStatus("error");
        console.error("Save failed", err);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [cvData, cvName, resumeId]);

  useEffect(() => {
    document.title = cvName ? `${cvName} - AlmiCV` : "AlmiCV";
  }, [cvName]);

  // Auto-rename: when the CV is still using the placeholder title and the
  // user has filled in their name, promote the name into the title. Only
  // fires while the title is the untouched default — once the user edits
  // the title themselves, this stops interfering.
  useEffect(() => {
    if (cvName !== "Untitled CV") return;
    const fullName = cvData.basics?.fullName?.trim();
    if (!fullName) return;
    setCvName(`${fullName} - CV`);
  }, [cvData, cvName]);

  return (
    <div className="flex min-h-screen flex-col bg-cream-soft">
      <div className="print-hide sticky top-0 z-30 border-b border-plum/10 bg-white/95 backdrop-blur-md">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Link
              href="/dashboard"
              className="text-plum-soft transition-colors hover:text-plum"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="h-6 w-px bg-plum/15" />
            <input
              value={cvName}
              onChange={(e) => setCvName(e.target.value)}
              placeholder="Untitled CV"
              className="min-w-0 flex-1 rounded border-0 bg-transparent px-2 py-1 text-base font-medium text-plum focus:outline-none focus:ring-2 focus:ring-coral/30 sm:max-w-[280px]"
            />
            <SaveIndicator status={saveStatus} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!isPro && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-pill border border-coral/40 bg-coral-soft/40 px-4 py-2 text-sm font-semibold text-coral-deep transition-colors hover:border-coral hover:bg-coral-soft/60 focus:outline-none focus:ring-4 focus:ring-coral/30"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Upgrade to Pro</span>
              </Link>
            )}
            <Link
              href={`/cv/${resumeId}/tailor`}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Tailor for Job</span>
            </Link>
            <button
              type="button"
              onClick={() => setCoverLetterOpen(true)}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Cover Letter</span>
            </button>
            <button
              type="button"
              onClick={() => setTranslateOpen(true)}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">Translate</span>
            </button>
            <Link
              href="/interview-prep"
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              <MessageCircleQuestion className="h-4 w-4" />
              <span className="hidden sm:inline">Interview Prep</span>
            </Link>
            <Link
              href={`/cv/${resumeId}/cover-letters`}
              className="inline-flex items-center gap-2 rounded-pill border border-plum/15 px-3 py-1.5 text-xs font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
            >
              <span className="hidden sm:inline">Cover Letters</span>
              <span className="sm:hidden">All</span>
            </Link>
            {hasSnapshot && (
              <button
                type="button"
                onClick={() => setRestoreOpen(true)}
                className="inline-flex items-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Restore previous</span>
              </button>
            )}
            <button
              type="button"
              disabled={downloading}
              onClick={async () => {
                if (downloading) return;
                setDownloading(true);
                try {
                  // Flush any in-flight edits so puppeteer reads the latest
                  // version from the DB, not a stale snapshot.
                  setSaveStatus("saving");
                  await updateResume(resumeId, { title: cvName, data: cvData });
                  setSaveStatus("saved");
                  await downloadCvPdf(resumeId);
                  showToast("PDF downloaded", "success");
                } catch (err) {
                  console.error("PDF download failed", err);
                  showToast("Couldn't generate PDF, please try again", "error");
                } finally {
                  setDownloading(false);
                }
              }}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:opacity-70"
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {downloading ? "Generating…" : "Download PDF"}
            </button>
            <a
              href={`/cv/${resumeId}/print`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-plum/5"
            >
              <Printer className="h-4 w-4" />
              Print
            </a>
          </div>
        </div>
        <div
          role="tablist"
          aria-label="Editor view"
          className="flex gap-2 border-t border-plum/10 px-4 py-2 md:hidden"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "edit"}
            aria-controls="edit-panel"
            onClick={() => setActiveTab("edit")}
            className={`min-h-[48px] flex-1 rounded-pill text-sm font-medium transition-colors ${
              activeTab === "edit"
                ? "bg-coral text-white"
                : "bg-cream-soft text-plum hover:bg-cream"
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "preview"}
            aria-controls="preview-panel"
            onClick={() => setActiveTab("preview")}
            className={`min-h-[48px] flex-1 rounded-pill text-sm font-medium transition-colors ${
              activeTab === "preview"
                ? "bg-coral text-white"
                : "bg-cream-soft text-plum hover:bg-cream"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside
          id="edit-panel"
          role="tabpanel"
          className={`print-hide w-full overflow-y-auto border-r border-plum/10 bg-white md:w-[420px] md:block ${
            activeTab === "edit" ? "block" : "hidden"
          }`}
        >
          <div className="p-6">
            <CVEditorSidebar data={cvData} onChange={setCvData} />
          </div>
        </aside>
        <main
          id="preview-panel"
          role="tabpanel"
          className={`flex-1 flex-col items-center overflow-y-auto bg-cream p-8 md:flex ${
            activeTab === "preview" ? "flex" : "hidden"
          }`}
        >
          <p className="print-hide mb-3 text-xs uppercase tracking-widest text-plum-soft">
            Live preview · A4
          </p>
          <div className="print-target w-full max-w-[600px]">
            <TemplateComponent data={cvData} paginated />
          </div>
        </main>
      </div>

      {hasSnapshot && (
        <TailoredBanner
          resumeId={resumeId}
          onRestoreClick={() => setRestoreOpen(true)}
        />
      )}

      <RestoreCVModal
        open={restoreOpen}
        resumeId={resumeId}
        onClose={() => setRestoreOpen(false)}
      />

      <GenerateCoverLetterModal
        open={coverLetterOpen}
        onClose={() => setCoverLetterOpen(false)}
        cvId={resumeId}
        onSaved={() =>
          showToast("✨ Cover letter saved", "success", {
            label: "View all →",
            href: `/cv/${resumeId}/cover-letters`,
          })
        }
      />

      <TranslateCvModal
        open={translateOpen}
        onClose={() => setTranslateOpen(false)}
        cvId={resumeId}
      />

      <ChatLauncher cvId={resumeId} />
    </div>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === "idle") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-plum-faint">
        <span className="h-2 w-2 rounded-full bg-coral" />
        Unsaved changes
      </span>
    );
  }
  if (status === "saving") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-plum-faint">
        <span className="h-2 w-2 animate-pulse rounded-full bg-coral" />
        Saving…
      </span>
    );
  }
  if (status === "saved") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-plum-soft">
        <Check className="h-3 w-3 text-sage" />
        Saved
      </span>
    );
  }
  return (
    <span className="text-xs text-coral-deep">Save failed</span>
  );
}
