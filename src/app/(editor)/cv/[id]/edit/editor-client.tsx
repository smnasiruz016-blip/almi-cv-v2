"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { CVEditorSidebar } from "@/components/editor/CVEditorSidebar";
import { updateResume } from "@/lib/resume-actions";
import type { CVData } from "@/lib/cv-types";
import { getTemplate } from "@/lib/templates";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function EditorClient({
  resumeId,
  initialTitle,
  initialData,
  templateSlug,
}: {
  resumeId: string;
  initialTitle: string;
  initialData: CVData;
  templateSlug: string;
}) {
  const template = getTemplate(templateSlug);
  const TemplateComponent = template.Component;
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [cvName, setCvName] = useState(initialTitle);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const isInitialMount = useRef(true);

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

  return (
    <div className="flex min-h-screen flex-col bg-cream-soft">
      <div className="print-hide sticky top-0 z-30 border-b border-plum/10 bg-white/95 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
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
              className="min-w-[200px] rounded border-0 bg-transparent px-2 py-1 text-base font-medium text-plum focus:outline-none focus:ring-2 focus:ring-coral/30"
            />
            <SaveIndicator status={saveStatus} />
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/cv/${resumeId}/preview`}
              className="rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-plum/5"
            >
              Preview
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="print-hide w-[420px] overflow-y-auto border-r border-plum/10 bg-white">
          <div className="p-6">
            <CVEditorSidebar data={cvData} onChange={setCvData} />
          </div>
        </aside>
        <main className="flex flex-1 flex-col items-center overflow-y-auto bg-cream p-8">
          <p className="print-hide mb-3 text-xs uppercase tracking-widest text-plum-soft">
            Live preview · A4
          </p>
          <div className="print-target w-full max-w-[600px]">
            <TemplateComponent data={cvData} />
          </div>
        </main>
      </div>
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
