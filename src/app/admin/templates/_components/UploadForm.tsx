"use client";

import { useRef, useState, useTransition } from "react";
import { uploadTemplateImages, type UploadResult } from "../actions";
import {
  isNumericLikeTitle,
  titleFromFilename,
} from "@/lib/template-images";
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

type Props = {
  roles: Role[];
  // Existing-count map per role slug. Used by the smart-title generator
  // to position auto-numbered titles ("${roleName} Design ${N}") past
  // any rows already in the DB. Includes hidden rows so re-uploading
  // doesn't reuse a previously-burned number.
  existingCountByRole: Record<string, number>;
};

export function UploadForm({ roles, existingCountByRole }: Props) {
  const [titles, setTitles] = useState<string[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [roleInput, setRoleInput] = useState<string>(roles[0]?.name ?? "");
  const [state, setState] = useState<UploadResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Resolve the typed role name (case-insensitive, alias-aware — same
  // contract the server enforces). Returns the canonical Role or null
  // if the input doesn't match anything. Used for smart-title gen.
  function resolveRole(typed: string): Role | null {
    const q = typed.trim().toLowerCase();
    if (!q) return null;
    return (
      roles.find(
        (r) =>
          r.name.toLowerCase() === q ||
          (r.aliases ?? []).some((a) => a.toLowerCase() === q),
      ) ?? null
    );
  }

  // For numeric/short Canva filenames ("1.png", "3.png"), generate
  //   `${role.name} Design ${position}`
  // where position = existing count for role + index in current batch.
  // For meaningful filenames ("modern-design.png"), keep the existing
  // title-from-filename behavior.
  function generateTitles(files: File[], typedRole: string): string[] {
    const role = resolveRole(typedRole);
    const existing = role ? (existingCountByRole[role.slug] ?? 0) : 0;
    return files.map((f, i) => {
      const fromFilename = titleFromFilename(f.name);
      if (!isNumericLikeTitle(fromFilename)) return fromFilename;
      if (!role) return fromFilename; // can't auto-number without a role
      const position = existing + i + 1;
      return `${role.name} Design ${position}`;
    });
  }

  function onFilesPicked(list: FileList | null) {
    if (!list || list.length === 0) {
      setTitles([]);
      setFilenames([]);
      return;
    }
    const arr = Array.from(list);
    setTitles(generateTitles(arr, roleInput));
    setFilenames(arr.map((f) => f.name));
  }

  // When the founder edits the role AFTER picking files, re-derive any
  // titles that were auto-generated. Manually-edited titles aren't
  // tracked separately — re-typing the role re-runs generateTitles on
  // the current filenames. That's fine: the typical flow is pick role,
  // then files, not the reverse.
  function onRoleChanged(value: string) {
    setRoleInput(value);
    if (filenames.length > 0 && fileInputRef.current?.files) {
      const arr = Array.from(fileInputRef.current.files);
      setTitles(generateTitles(arr, value));
    }
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
          filenames; for purely numeric filenames (Canva exports) they
          auto-number per role — edit any field before submitting. Slugs
          are derived from the final title.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="block font-medium text-plum">Role</span>
          <input
            id="roleName"
            name="roleName"
            type="text"
            list="upload-roles-list"
            value={roleInput}
            onChange={(e) => onRoleChanged(e.target.value)}
            placeholder="Type to search — e.g. marketing specialist"
            required
            autoComplete="off"
            spellCheck={false}
            className="mt-1 w-full rounded-lg border border-plum/20 bg-white px-3 py-2 text-sm"
          />
          <datalist id="upload-roles-list">
            {roles.map((r) => (
              <option key={r.slug} value={r.name}>
                {r.sector}
              </option>
            ))}
          </datalist>
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
