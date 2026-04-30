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

function wrapAsParagraph(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (/^<p[\s>]/i.test(trimmed)) return trimmed;
  return `<p>${trimmed}</p>`;
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
      onImproved(wrapAsParagraph(result.improved));
      setFlash(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(false), 800);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Couldn't improve right now — please try again in a moment";
      setError(msg);
      errorTimer.current = setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const baseClass =
    "relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors";
  const stateClass = flash
    ? "bg-mint/40 text-plum"
    : "text-coral hover:bg-cream-soft hover:text-coral-deep";
  const disabledClass = isDisabled ? "cursor-not-allowed opacity-50" : "";

  return (
    <div className="relative inline-flex shrink-0 flex-col items-end">
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
        <span className="mt-1 whitespace-nowrap text-xs text-coral-deep">
          {error}
        </span>
      )}
    </div>
  );
}
