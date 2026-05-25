"use client";

import { useState, useTransition } from "react";
import {
  regenerateAllNumericTitles,
  type RegenResult,
} from "../actions";

// Shown at the top of /admin/templates when at least one row has a
// numeric-looking title (typically the leftover Canva uploads). One
// click runs the whole regen inside a prisma.$transaction.
export function RegenAllBanner({ numericCount }: { numericCount: number }) {
  const [result, setResult] = useState<RegenResult | null>(null);
  const [isPending, startTransition] = useTransition();

  if (numericCount === 0 && (!result || !result.ok)) return null;

  function run() {
    if (
      !confirm(
        `Regenerate titles for ${numericCount} numeric-named template${numericCount === 1 ? "" : "s"}? This updates title + slug in one transaction. Backup table is preserved.`,
      )
    )
      return;
    startTransition(async () => {
      const r = await regenerateAllNumericTitles();
      setResult(r);
    });
  }

  return (
    <div className="rounded-2xl border border-gold/40 bg-gold/5 p-4 shadow-warm-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-base text-plum">
            Numeric titles detected
          </h2>
          <p className="mt-1 text-sm text-plum-soft">
            {numericCount} row{numericCount === 1 ? "" : "s"} have
            numeric-only titles (e.g. &quot;1&quot;, &quot;3-3&quot;) from
            Canva exports. Click below to regenerate as
            &quot;[Role] Design [N]&quot;.
          </p>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={isPending}
          className="inline-flex items-center rounded-pill bg-plum px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-plum/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Regenerating…" : `Regenerate ${numericCount} titles`}
        </button>
      </div>

      {result && !result.ok && (
        <p className="mt-3 rounded-md bg-coral/10 px-3 py-2 text-xs text-coral-deep">
          {result.error}
        </p>
      )}
      {result?.ok && (
        <div className="mt-3 rounded-md bg-mint/10 px-3 py-2 text-xs text-[#0F766E]">
          <p>
            Regenerated {result.updated} title
            {result.updated === 1 ? "" : "s"} across{" "}
            {result.perRole.length} role
            {result.perRole.length === 1 ? "" : "s"}.
          </p>
          {result.perRole.length > 0 && (
            <ul className="mt-1 list-inside list-disc">
              {result.perRole.map((p) => (
                <li key={p.roleSlug}>
                  {p.roleName}: {p.count}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
