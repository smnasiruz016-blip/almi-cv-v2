"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  setTemplateImageActive,
  updateTemplateImageTitle,
  deleteTemplateImage,
} from "../actions";
import type { TemplateImage } from "@/lib/template-images";

export function TemplateImageRow({ row }: { row: TemplateImage }) {
  const [title, setTitle] = useState(row.title);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function saveTitle() {
    if (title === row.title) return;
    startTransition(async () => {
      const res = await updateTemplateImageTitle(row.id, title);
      if (!res.ok) {
        setError(res.error ?? "Save failed.");
        setTitle(row.title);
      } else {
        setError(null);
      }
    });
  }

  function toggleActive() {
    startTransition(async () => {
      await setTemplateImageActive(row.id, !row.active);
    });
  }

  function remove() {
    if (!confirm(`Delete "${row.title}" permanently?`)) return;
    startTransition(async () => {
      await deleteTemplateImage(row.id);
    });
  }

  return (
    <li className="flex gap-3 rounded-lg border border-plum/10 bg-white p-3">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-plum/5">
        <Image
          src={row.imageUrl}
          alt={row.title}
          fill
          sizes="80px"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveTitle}
          className="rounded-md border border-plum/20 px-2 py-1 text-sm"
        />
        <p className="truncate text-xs text-plum-faint">/{row.slug}</p>
        <p className="truncate text-xs text-plum-faint">
          {row.filenameOriginal}
        </p>
        {error && <p className="text-xs text-coral-deep">{error}</p>}
      </div>
      <div className="flex flex-col items-end gap-1 text-xs">
        <span
          className={`rounded-pill px-2 py-0.5 ${
            row.active
              ? "bg-mint/15 text-[#0F766E]"
              : "bg-plum/10 text-plum-soft"
          }`}
        >
          {row.active ? "Active" : "Hidden"}
        </span>
        <button
          type="button"
          onClick={toggleActive}
          disabled={isPending}
          className="text-plum-soft hover:text-plum disabled:opacity-50"
        >
          {row.active ? "Hide" : "Show"}
        </button>
        <button
          type="button"
          onClick={remove}
          disabled={isPending}
          className="text-coral-deep hover:underline disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
