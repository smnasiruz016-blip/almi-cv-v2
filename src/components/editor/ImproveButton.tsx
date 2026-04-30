"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { improveBullet } from "@/lib/ai/improve-bullet";

type ImproveButtonProps = {
  bulletText: string;
  onImproved: (newHtml: string) => void;
  role?: string;
  company?: string;
  disabled?: boolean;
};

const FALLBACK_ERROR = "Couldn't improve right now — try again";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function wrapAsParagraph(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return `<p>${escapeHtml(trimmed)}</p>`;
}

export function ImproveButton({
  bulletText,
  onImproved,
  role,
  company,
  disabled,
}: ImproveButtonProps) {
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, []);

  const showError = (msg: string) => {
    setError(msg);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setError(null), 3000);
  };

  const isDisabled = disabled || loading;

  const handleClick = async () => {
    if (loading) return;
    setError(null);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    setLoading(true);
    try {
      const result = await improveBullet({
        bullet: bulletText,
        role,
        company,
      });

      if (!result || typeof result !== "object" || !("ok" in result)) {
        showError(FALLBACK_ERROR);
        return;
      }

      if (!result.ok) {
        const msg =
          typeof result.error === "string" && result.error.trim()
            ? result.error
            : FALLBACK_ERROR;
        showError(msg);
        return;
      }

      const improved = result.improved;
      if (typeof improved !== "string" || !improved.trim()) {
        showError(FALLBACK_ERROR);
        return;
      }

      onImproved(wrapAsParagraph(improved));
      setFlash(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(false), 800);
    } catch (err) {
      console.error("[ImproveButton] failed:", err);
      showError(FALLBACK_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const baseClass =
    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors";
  const stateClass = flash
    ? "bg-mint/40 text-plum"
    : "text-coral hover:bg-cream-soft hover:text-coral-deep";
  const disabledClass = isDisabled ? "cursor-not-allowed opacity-50" : "";

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        aria-label="Improve with AI"
        title="Improve with AI"
        className={`${baseClass} ${stateClass} ${disabledClass}`.trim()}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
      </button>
      {error && (
        <div
          role="alert"
          className="pointer-events-none absolute right-0 top-full z-20 mt-1 max-w-[220px] whitespace-normal break-words rounded-md border border-coral/30 bg-cream-soft px-2 py-1 text-xs text-coral-deep shadow-md"
          style={{ width: "max-content" }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
