"use client";

import { useState, useTransition } from "react";
import { regenerateTitlesForRole, type RegenResult } from "../actions";

// Per-role regen button (BONUS from the spec). Shown next to each
// role-group header so a single bad batch can be fixed without
// touching unrelated rows.
export function RegenRoleButton({
  roleSlug,
  roleName,
  numericCount,
}: {
  roleSlug: string;
  roleName: string;
  numericCount: number;
}) {
  const [result, setResult] = useState<RegenResult | null>(null);
  const [isPending, startTransition] = useTransition();

  if (numericCount === 0 && (!result || !result.ok)) return null;

  function run() {
    if (
      !confirm(
        `Regenerate ${numericCount} numeric title${numericCount === 1 ? "" : "s"} in ${roleName}?`,
      )
    )
      return;
    startTransition(async () => {
      const r = await regenerateTitlesForRole(roleSlug);
      setResult(r);
    });
  }

  return (
    <span className="ml-3 inline-flex items-center gap-2">
      <button
        type="button"
        onClick={run}
        disabled={isPending}
        className="rounded-pill bg-plum/10 px-2 py-0.5 text-xs text-plum hover:bg-plum/20 disabled:opacity-50"
      >
        {isPending ? "Regen…" : `Regen ${numericCount}`}
      </button>
      {result && !result.ok && (
        <span className="text-xs text-coral-deep">{result.error}</span>
      )}
      {result?.ok && (
        <span className="text-xs text-[#0F766E]">
          Updated {result.updated}
        </span>
      )}
    </span>
  );
}
