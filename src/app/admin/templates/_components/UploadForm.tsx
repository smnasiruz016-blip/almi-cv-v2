"use client";

import { useRef, useState, useTransition } from "react";
import { uploadTemplateImages, type UploadResult } from "../actions";
import { titleFromFilename } from "@/lib/template-images";
import type { Role } from "@/lib/roles";

// <form onSubmit={...}> with every field carrying a `name` attribute
// so FormData(formElement) picks up the user's input via standard
// form serialization. The submit handler calls preventDefault and
// invokes the server action under startTransition.
//
// Why onSubmit instead of <form action={fn}>: React 19's `action` prop
// for client functions renders the HTML form with
//   action="javascript:throw new Error('React form unexpectedly submitted.')"
// as a fallback for no-JS submission. While this is intentional in
// React, some browser configurations (ad-blockers, security plugins,
// Vercel Firewall rules) treat javascript: URLs as malicious and
// refuse to render forms containing them, producing a "page couldn't
// load" symptom with no console errors. onSubmit avoids that
// rendered-HTML entirely.
//
// Why not the original (PR #46) imperative-FormData pattern: that one
// built FormData from React state and gated submit on
// `staged.length === 0`. If the file picker's onChange didn't sync
// state (browser focus quirks, etc.), the submit button stayed
// disabled and clicks silently no-op'd. onSubmit + FormData(form) is
// robust against state desync because it reads directly from the DOM.

export function UploadForm({ roles }: { roles: Role[] }) {
  const [titles, setTitles] = useState<string[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [state, setState] = useState<UploadResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function onFilesPicked(list: FileList | null) {
    if (!list || list.length === 0) {
      setTitles([]);
      setFilenames([]);
      return;
    }
    const arr = Array.from(list);
    setTitles(arr.map((f) => titleFromFilename(f.name)));
    setFilenames(arr.map((f) => f.name));
  }

  function clearAll() {
    setTitles([]);
    setFilenames([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      const result = await uploadTemplateImages(formData);
      setState(result);
      if (result.ok) {
        clearAll();
        form.reset();
      }
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-peach/40 bg-white p-6 shadow-warm-card"
    >
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
            id="roleSlug"
            name="roleSlug"
            defaultValue={roles[0]?.slug ?? ""}
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
            id="files"
            name="files"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onFilesPicked(e.target.files)}
            className="mt-1 block w-full text-sm text-plum-soft file:mr-3 file:rounded-lg file:border-0 file:bg-coral/15 file:px-3 file:py-2 file:text-sm file:text-coral-deep hover:file:bg-coral/25"
          />
        </label>
      </div>

      {titles.length > 0 && (
        <ul className="divide-y divide-plum/10 rounded-lg border border-plum/10">
          {titles.map((title, i) => (
            <li
              key={`${filenames[i] ?? "file"}-${i}`}
              className="flex items-center gap-3 px-3 py-2"
            >
              <span className="truncate text-xs text-plum-faint flex-1 min-w-0">
                {filenames[i]}
              </span>
              <input
                name="titles"
                defaultValue={title}
                aria-label={`Title for ${filenames[i] ?? "file"}`}
                className="flex-1 rounded-md border border-plum/20 px-2 py-1 text-sm"
              />
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-coral-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Uploading…"
            : titles.length > 0
              ? `Upload ${titles.length}`
              : "Upload"}
        </button>
        {titles.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            disabled={isPending}
            className="text-sm text-plum-soft hover:text-plum"
          >
            Clear
          </button>
        )}
      </div>

      {state && !state.ok && (
        <p className="rounded-md bg-coral/10 px-3 py-2 text-xs text-coral-deep">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="rounded-md bg-mint/10 px-3 py-2 text-xs text-[#0F766E]">
          Uploaded {state.created} image{state.created === 1 ? "" : "s"}.
        </p>
      )}
    </form>
  );
}
