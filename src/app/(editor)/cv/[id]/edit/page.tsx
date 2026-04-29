"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClassicSerif } from "@/components/templates/ClassicSerif";
import { CVEditorSidebar } from "@/components/editor/CVEditorSidebar";
import { mayaRodriguez } from "@/lib/sample-cv-data";

export default function EditCVPage() {
  const [cvData, setCvData] = useState(mayaRodriguez);
  const [cvName, setCvName] = useState("Untitled CV");

  return (
    <div className="flex min-h-screen flex-col bg-cream-soft">
      <div className="sticky top-0 z-30 border-b border-plum/10 bg-white/95 backdrop-blur-md">
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
            <span className="text-xs text-plum-faint">Auto-save coming soon</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/cv/temp-id/preview"
              className="rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-plum/5"
            >
              Preview
            </Link>
            <button
              disabled
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-pill bg-coral/60 px-4 py-2 text-sm font-medium text-white"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[420px] overflow-y-auto border-r border-plum/10 bg-white">
          <div className="p-6">
            <CVEditorSidebar data={cvData} onChange={setCvData} />
          </div>
        </aside>
        <main className="flex flex-1 flex-col items-center overflow-y-auto bg-cream p-8">
          <p className="mb-3 text-xs uppercase tracking-widest text-plum-soft">
            Live preview · A4
          </p>
          <div className="w-full max-w-[600px]">
            <ClassicSerif data={cvData} />
          </div>
        </main>
      </div>
    </div>
  );
}
