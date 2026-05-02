"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Languages, Loader2, RefreshCw, Save } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { translateCv } from "@/lib/ai/translate-cv";
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
  type TranslatedCV,
} from "@/lib/ai/translate-cv-shared";
import { createTranslatedResume } from "@/lib/resume-actions";
import { stripRichText } from "@/lib/rich-text";

const FALLBACK_ERROR = "Couldn't translate your CV right now — try again";

type Props = {
  open: boolean;
  onClose: () => void;
  cvId: string;
};

type LoadedTranslation = {
  translated: TranslatedCV;
  languageCode: SupportedLanguage;
  languageName: string;
};

export function TranslateCvModal({ open, onClose, cvId }: Props) {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>("es");
  const [translating, setTranslating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LoadedTranslation | null>(null);

  const requestId = useRef(0);

  useEffect(() => {
    if (open) return;
    requestId.current++;
    setLanguage("es");
    setTranslating(false);
    setSaving(false);
    setError(null);
    setResult(null);
  }, [open]);

  const handleTranslate = async () => {
    if (translating) return;
    const myId = ++requestId.current;
    setTranslating(true);
    setError(null);
    try {
      const r = await translateCv({ cvId, targetLanguage: language });
      if (myId !== requestId.current) return;
      if (!r.ok) {
        setError(r.error || FALLBACK_ERROR);
        return;
      }
      setResult({
        translated: r.translated,
        languageCode: r.languageCode,
        languageName: r.languageName,
      });
    } catch (err) {
      if (myId !== requestId.current) return;
      console.error("[TranslateCvModal] translate failed:", err);
      setError(FALLBACK_ERROR);
    } finally {
      if (myId === requestId.current) setTranslating(false);
    }
  };

  const handleSave = async () => {
    if (saving || !result) return;
    setSaving(true);
    setError(null);
    try {
      const r = await createTranslatedResume({
        sourceId: cvId,
        translated: result.translated,
        languageCode: result.languageCode,
        languageName: result.languageName,
      });
      if (!r.ok) {
        setError(r.error || "Couldn't save translated CV — try again");
        setSaving(false);
        return;
      }
      router.push(`/cv/${r.id}/edit`);
      // Note: don't reset state here — the route change unmounts us.
    } catch (err) {
      console.error("[TranslateCvModal] save failed:", err);
      setError("Couldn't save translated CV — try again");
      setSaving(false);
    }
  };

  const summaryPreview = result
    ? stripRichText(result.translated.basics.summary ?? "").trim()
    : "";
  const bulletCount = result
    ? (result.translated.experience ?? []).reduce(
        (acc, e) => acc + (e.bullets?.length ?? 0),
        0,
      )
    : 0;
  const skillCount = result?.translated.skills?.length ?? 0;

  const inResult = !!result;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={inResult ? `Translation preview · ${result?.languageName}` : "Translate your CV"}
      size="lg"
    >
      {!inResult ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleTranslate();
          }}
          className="space-y-4"
        >
          <p className="text-sm text-plum-soft">
            We&apos;ll translate your CV into the language you pick — Summary,
            Experience bullets, Skills, and section labels — and save it as a
            new CV. Your original stays unchanged.
          </p>

          <div>
            <label
              htmlFor="tr-lang"
              className="mb-1 block text-xs font-medium text-plum-soft"
            >
              Target language
            </label>
            <select
              id="tr-lang"
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value as SupportedLanguage)
              }
              disabled={translating}
              className="w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name} · {l.nativeName}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
            >
              {error}
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              disabled={translating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {translating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Translating your CV...
                </>
              ) : (
                <>
                  <Languages className="h-4 w-4" />
                  Translate
                </>
              )}
            </button>
            {translating && (
              <p
                role="status"
                aria-live="polite"
                className="mt-2 text-center text-xs text-plum-faint"
              >
                This usually takes 10–20 seconds.
              </p>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-md border border-plum/10 bg-cream-soft px-4 py-3">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-plum-faint">
              Summary preview
            </p>
            <p className="text-sm leading-relaxed text-plum">
              {summaryPreview || (
                <span className="italic text-plum-faint">
                  (no summary in source CV)
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
            <Stat
              label="Bullets"
              value={bulletCount.toString()}
              hint="translated"
            />
            <Stat
              label="Skills"
              value={skillCount.toString()}
              hint="translated"
            />
            <Stat
              label="Section labels"
              value="9"
              hint="translated"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-coral/30 bg-cream-soft px-3 py-2 text-xs text-coral-deep"
            >
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2 border-t border-plum/10 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => void handleTranslate()}
              disabled={translating || saving}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-plum/15 px-4 py-2 text-sm font-medium text-plum transition-colors hover:bg-cream-soft focus:outline-none focus:ring-2 focus:ring-plum/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {translating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Re-translating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={translating || saving}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-deep focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save as New CV
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-md border border-plum/10 bg-white px-3 py-2.5">
      <div className="text-base font-semibold text-plum">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-plum-faint">
        {label}
      </div>
      <div className="text-[11px] text-plum-soft">{hint}</div>
    </div>
  );
}

