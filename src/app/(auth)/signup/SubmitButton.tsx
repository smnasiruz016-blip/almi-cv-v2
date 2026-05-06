"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  idleLabel,
  pendingLabel,
}: {
  idleLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        aria-busy={pending}
        className="inline-flex w-full min-w-[180px] min-h-[44px] items-center justify-center gap-2 rounded-pill bg-coral px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:bg-coral-soft disabled:cursor-not-allowed disabled:hover:bg-coral-soft"
      >
        {pending ? pendingLabel : idleLabel}
      </button>
      <span className="sr-only" aria-live="polite">
        {pending ? pendingLabel : ""}
      </span>
    </>
  );
}
