"use client";

import { useRef, useState, useTransition } from "react";
import { uploadTemplateImages } from "../actions";
import { titleFromFilename } from "@/lib/template-images";
import type { Role } from "@/lib/roles";

type StagedFile = {
  file: File;
  title: string;
};

export function UploadForm({ roles }: { roles: Role[] }) {
  const [staged, setStaged] = useState<StagedFile[]>([]);
  const [roleSlug, setRoleSlug] = useState<string>(roles[0]?.slug ?? "");
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "error"; message: string }
    | { kind: "success"; created: number }
  >({ kind: "idle" });
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onFilesPicked(list: FileList | null) {
    if (!list) return;
    const next: StagedFile[] = [];
    for (const f of Array.from(list)) {
      next.push({ file: f, title: titleFromFilename(f.name) });
    }
    setStaged(next);
    setStatus({ kind: "idle" });
  }

  function updateTitle(index: number, value: string) {
    setStaged((prev) =>
      prev.map((s, i) => (i === index ? { ...s, title: value } : s)),
    );
  }

  function removeStaged(index: number) {
    setStaged((prev) => prev.filter((_, i) => i !== index));
  }

  function reset() {
    setStaged([]);
    setStatus({ kind: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function submit() {
    if (staged.length === 0) {
      setStatus({ kind: "error", message: "Pick at least one image." });
      return;
    }
    if (!roleSlug) {
      setStatus({ kind: "error", message: "Pick a role." });
      return;
    }
    if (staged.some((s) => !s.title.trim())) {
      setStatus({ kind: "error", message: "Every file needs a title." });
      return;
    }
    const fd = new FormData();
    fd.set("roleSlug", roleSlug);
    for (const s of staged) {
      fd.append("files", s.file);
      fd.append("titles", s.title);
    }
    startTransition(async () => {
      const res = await uploadTemplateImages(fd);
      if (res.ok) {
        setStatus({ kind: "success", created: res.created });
        reset();
      } else {
        setStatus({ kind: "error", message: res.error });
      }
    });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card">
      <div>
        <h2 className="font-display text-lg text-plum">Upload templates</h2>
        <p className="mt-1 text-sm text-plum-soft">
          Pick a role, then drop image files. Titles auto-suggest from
          filenames — edit before submitting. Slugs are derived from the
          final title.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="block font-medium text-plum">Role</span>
          <select
            value={roleSlug}
            onChange={(e) => setRoleSlug(e.target.value)}
            className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm"
          >
            {roles.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name} ({r.sector})
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="block font-medium text-plum">Images</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onFilesPicked(e.target.files)}
            className="mt-1 block w-full text-sm text-plum-soft file:mr-3 file:rounded-lg file:border-0 file:bg-coral/15 file:px-3 file:py-2 file:text-sm file:text-coral-deep hover:file:bg-coral/25"
          />
        </label>
      </div>

      {staged.length > 0 && (
        <ul className="divide-y divide-plum/10 rounded-lg border border-plum/10">
          {staged.map((s, i) => (
            <li
              key={`${s.file.name}-${i}`}
              className="flex items-center gap-3 px-3 py-2"
            >
              <span className="truncate text-xs text-plum-faint flex-1 min-w-0">
                {s.file.name}
              </span>
              <input
                value={s.title}
                onChange={(e) => updateTitle(i, e.target.value)}
                className="flex-1 rounded-md border border-plum/20 px-2 py-1 text-sm"
                aria-label={`Title for ${s.file.name}`}
              />
              <button
                type="button"
                onClick={() => removeStaged(i)}
                className="text-xs text-plum-soft hover:text-coral-deep"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={isPending || staged.length === 0}
          className="inline-flex items-center rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-coral-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Uploading…" : `Upload ${staged.length || ""}`.trim()}
        </button>
        {staged.length > 0 && (
          <button
            type="button"
            onClick={reset}
            disabled={isPending}
            className="text-sm text-plum-soft hover:text-plum"
          >
            Clear
          </button>
        )}
      </div>

      {status.kind === "error" && (
        <p className="rounded-md bg-coral/10 px-3 py-2 text-xs text-coral-deep">
          {status.message}
        </p>
      )}
      {status.kind === "success" && (
        <p className="rounded-md bg-mint/10 px-3 py-2 text-xs text-[#0F766E]">
          Uploaded {status.created} image{status.created === 1 ? "" : "s"}.
        </p>
      )}
    </div>
  );
}
