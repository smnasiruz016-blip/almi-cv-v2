"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";
import { TemplateThumbnail } from "@/components/templates/TemplateThumbnail";
import { CVCardMenu } from "@/components/dashboard/CVCardMenu";
import { updateResume } from "@/lib/resume-actions";
import { getTemplate } from "@/lib/templates";
import type { CVData } from "@/lib/cv-types";

export function DashboardCard({
  resumeId,
  title,
  templateSlug,
  data,
  editedLabel,
}: {
  resumeId: string;
  title: string;
  templateSlug: string;
  data: CVData;
  editedLabel: string;
}) {
  const template = getTemplate(templateSlug);
  const [renaming, setRenaming] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (renaming) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [renaming]);

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  const commit = () => {
    const next = draftTitle.trim();
    if (!next || next === title) {
      setRenaming(false);
      setDraftTitle(title);
      return;
    }
    startTransition(async () => {
      try {
        await updateResume(resumeId, { title: next });
        setRenaming(false);
        router.refresh();
      } catch (err) {
        console.error("Rename failed", err);
      }
    });
  };

  const cancel = () => {
    setRenaming(false);
    setDraftTitle(title);
  };

  return (
    <div className="group relative rounded-2xl border border-peach/40 bg-white p-5 shadow-warm-card transition-all hover:shadow-warm-card-hover">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-coral">
          {template.name}
        </p>
        <p className="shrink-0 text-xs text-plum-faint">{editedLabel}</p>
      </div>

      {renaming ? (
        <div className="mt-2 flex items-center gap-2">
          <input
            ref={inputRef}
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") cancel();
            }}
            disabled={pending}
            className="flex-1 rounded border border-coral/40 bg-white px-2 py-1 font-display text-lg text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
          />
          <button
            type="button"
            aria-label="Save name"
            onClick={commit}
            disabled={pending}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-coral-deep hover:bg-coral/10 disabled:opacity-50"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            aria-label="Cancel rename"
            onClick={cancel}
            disabled={pending}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-faint hover:bg-plum/5 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <p className="mt-2 font-display text-lg text-plum">{title}</p>
      )}

      <Link
        href={`/cv/${resumeId}/edit`}
        className="mt-3 block"
        aria-label={`Open ${title} in editor`}
        tabIndex={renaming ? -1 : 0}
      >
        <TemplateThumbnail template={template} data={data} scale={0.3} />
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/cv/${resumeId}/edit`}
          className="text-sm font-medium text-coral hover:text-coral-deep"
          tabIndex={renaming ? -1 : 0}
        >
          Open editor →
        </Link>
        <CVCardMenu
          resumeId={resumeId}
          resumeTitle={title}
          onStartRename={() => setRenaming(true)}
        />
      </div>
    </div>
  );
}
