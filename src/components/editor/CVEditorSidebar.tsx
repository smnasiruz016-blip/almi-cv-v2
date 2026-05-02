"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  WandSparkles,
} from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { uploadPhoto } from "@/lib/photo-upload";
import type {
  AccentKey,
  BodyFontKey,
  CVData,
  DensityKey,
  HeadingFontKey,
  PhotoStyleKey,
  RichText,
  SectionStyleKey,
  ThemeKey,
} from "@/lib/cv-types";
import { ACCENTS, BODY_FONTS, HEADING_FONTS, THEMES } from "@/lib/cv-themes";
import { isRichTextEmpty, stripRichText } from "@/lib/rich-text";
import { RichTextEditor } from "./RichTextEditor";
import { ImproveButton } from "./ImproveButton";
import { GenerateSummaryModal } from "./GenerateSummaryModal";
import { GenerateLinkedInAboutModal } from "./GenerateLinkedInAboutModal";
import { GenerateBulletsModal } from "./GenerateBulletsModal";
import { ExtractSkillsModal } from "./ExtractSkillsModal";

const UNDO_TIMEOUT_MS = 10000;

function BulletRow({
  value,
  onChange,
  onRemove,
  role,
  company,
  ariaLabel,
}: {
  value: string;
  onChange: (html: string) => void;
  onRemove: () => void;
  role?: string;
  company?: string;
  ariaLabel: string;
}) {
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const improvedRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (
      previousValue !== null &&
      improvedRef.current !== null &&
      value !== improvedRef.current
    ) {
      setPreviousValue(null);
      improvedRef.current = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [value, previousValue]);

  const handleImproved = (newHtml: string) => {
    setPreviousValue(value);
    improvedRef.current = newHtml;
    onChange(newHtml);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPreviousValue(null);
      improvedRef.current = null;
    }, UNDO_TIMEOUT_MS);
  };

  const handleUndo = () => {
    if (previousValue === null) return;
    onChange(previousValue);
    setPreviousValue(null);
    improvedRef.current = null;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <RichTextEditor
            value={value}
            onChange={onChange}
            placeholder="Describe your impact..."
            minHeight={60}
            ariaLabel={ariaLabel}
          />
        </div>
        <div className="mt-1 flex items-start gap-1">
          <ImproveButton
            bulletText={value}
            onImproved={handleImproved}
            role={role}
            company={company}
          />
          <button
            type="button"
            aria-label={`Remove ${ariaLabel}`}
            onClick={onRemove}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-plum-soft transition-colors hover:bg-coral/10 hover:text-coral"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {previousValue !== null && (
        <button
          type="button"
          onClick={handleUndo}
          className="ml-1 text-xs text-coral underline-offset-2 hover:text-coral-deep hover:underline"
        >
          Undo improvement
        </button>
      )}
    </div>
  );
}

function SummaryRow({
  value,
  onChange,
  role,
}: {
  value: string;
  onChange: (html: string) => void;
  role?: string;
}) {
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const improvedRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [linkedInOpen, setLinkedInOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (
      previousValue !== null &&
      improvedRef.current !== null &&
      value !== improvedRef.current
    ) {
      setPreviousValue(null);
      improvedRef.current = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [value, previousValue]);

  const handleImproved = (newHtml: string) => {
    setPreviousValue(value);
    improvedRef.current = newHtml;
    onChange(newHtml);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPreviousValue(null);
      improvedRef.current = null;
    }, UNDO_TIMEOUT_MS);
  };

  const handleUndo = () => {
    if (previousValue === null) return;
    onChange(previousValue);
    setPreviousValue(null);
    improvedRef.current = null;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleGenerated = (summary: string) => {
    const trimmed = summary.trim();
    if (!trimmed) return;
    const escaped = trimmed
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    onChange(`<p>${escaped}</p>`);
  };

  const isEmpty = isRichTextEmpty(value);

  return (
    <div className="space-y-1">
      {isEmpty && (
        <button
          type="button"
          onClick={() => setGenerateOpen(true)}
          className="flex w-full flex-col items-start gap-0.5 rounded-md border border-coral/30 bg-coral/10 px-3 py-2.5 text-left transition-colors hover:bg-coral/15 focus:outline-none focus:ring-2 focus:ring-coral/30"
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-coral-deep">
            <Sparkles className="h-3.5 w-3.5" />
            Generate your Summary with AI
          </span>
          <span className="text-xs text-plum-soft">
            Answer a few quick questions and we&apos;ll write it for you.
          </span>
        </button>
      )}
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <RichTextEditor
            value={value}
            onChange={onChange}
            placeholder="A short professional summary..."
            minHeight={120}
            ariaLabel="Professional summary"
          />
        </div>
        <div className="mt-1 flex items-start gap-1">
          <button
            type="button"
            onClick={() => setGenerateOpen(true)}
            aria-label="Generate Summary with AI"
            title="Generate Summary with AI"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-coral transition-colors hover:bg-cream-soft hover:text-coral-deep"
          >
            <WandSparkles className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setLinkedInOpen(true)}
            aria-label="Generate LinkedIn About with AI"
            title="Generate LinkedIn About with AI"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-coral transition-colors hover:bg-cream-soft hover:text-coral-deep"
          >
            <LinkedInIcon className="h-4 w-4" />
          </button>
          <ImproveButton
            bulletText={value}
            onImproved={handleImproved}
            role={role}
          />
        </div>
      </div>
      {previousValue !== null && (
        <button
          type="button"
          onClick={handleUndo}
          className="ml-1 text-xs text-coral underline-offset-2 hover:text-coral-deep hover:underline"
        >
          Undo improvement
        </button>
      )}
      <GenerateSummaryModal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        defaultRole={role}
        onAccept={handleGenerated}
      />
      <GenerateLinkedInAboutModal
        open={linkedInOpen}
        onClose={() => setLinkedInOpen(false)}
        defaultRole={role}
      />
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-plum/15 bg-cream-soft px-3 py-2 text-sm text-plum focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20";
const textareaClass = inputClass + " resize-vertical min-h-[80px]";
const addButtonClass =
  "inline-flex w-full items-center justify-center gap-1 rounded-md border border-coral/30 px-3 py-2 text-sm font-medium text-coral transition-colors hover:bg-coral/10";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-plum-soft">{label}</label>
      {children}
    </div>
  );
}

function ExperienceBulletsField({
  bullets,
  setBullets,
  role,
  company,
}: {
  bullets: RichText[];
  setBullets: (next: RichText[]) => void;
  role: string;
  company: string;
}) {
  const [generateOpen, setGenerateOpen] = useState(false);

  const handleAccept = (selected: string[]) => {
    const wrapped = selected
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => {
        const escaped = s
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<p>${escaped}</p>`;
      });
    if (wrapped.length === 0) return;
    setBullets([...bullets, ...wrapped]);
  };

  const isEmpty = bullets.length === 0;

  return (
    <div className="space-y-2">
      {isEmpty && (
        <button
          type="button"
          onClick={() => setGenerateOpen(true)}
          className="flex w-full flex-col items-start gap-0.5 rounded-md border border-coral/30 bg-coral/10 px-3 py-2.5 text-left transition-colors hover:bg-coral/15 focus:outline-none focus:ring-2 focus:ring-coral/30"
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-coral-deep">
            <Sparkles className="h-3.5 w-3.5" />
            Let AI suggest 5 strong bullets for this role
          </span>
          <span className="text-xs text-plum-soft">
            Answer a few quick questions and we&apos;ll generate them.
          </span>
        </button>
      )}
      {bullets.map((bullet, bi) => (
        <BulletRow
          key={bi}
          value={bullet}
          onChange={(html) => {
            const next = [...bullets];
            next[bi] = html;
            setBullets(next);
          }}
          onRemove={() => {
            const next = bullets.filter((_, i) => i !== bi);
            setBullets(next);
          }}
          role={role}
          company={company}
          ariaLabel={`Bullet ${bi + 1}`}
        />
      ))}
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={() => setBullets([...bullets, ""])}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-coral/30 px-3 py-2 text-sm font-medium text-coral transition-colors hover:bg-coral/10"
        >
          <Plus className="h-3.5 w-3.5" /> Add bullet
        </button>
        <button
          type="button"
          onClick={() => setGenerateOpen(true)}
          aria-label="Generate Bullets with AI"
          title="Generate Bullets with AI"
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-coral/30 px-3 py-2 text-sm font-medium text-coral-deep transition-colors hover:bg-coral/10"
        >
          <WandSparkles className="h-3.5 w-3.5" />
          Generate
        </button>
      </div>
      <GenerateBulletsModal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        defaultJobTitle={role}
        defaultCompany={company}
        onAccept={handleAccept}
      />
    </div>
  );
}

function SectionAccordion({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  return (
    <div className="border-b border-plum/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-plum">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-plum-soft transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={open ? "space-y-3 pb-4" : "hidden"}>{children}</div>
    </div>
  );
}

function ArrayEntry({
  onRemove,
  children,
}: {
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mb-3 space-y-2 rounded-md bg-cream-soft p-3">
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-2 top-2 text-plum-faint transition-colors hover:text-coral-deep"
        aria-label="Remove entry"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
      {children}
    </div>
  );
}

function PhotoUploadField({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const result = await uploadPhoto(fd);
      if ("error" in result) {
        setError(result.error);
      } else {
        onChange(result.url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
      {uploading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-plum/15 p-4 text-sm text-plum-soft">
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading…
        </div>
      ) : value ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Photo preview"
            className="h-16 w-16 shrink-0 rounded-full border-2 border-cream object-cover shadow-sm"
          />
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-left text-sm text-coral hover:underline"
            >
              Replace photo
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-left text-sm text-plum-faint transition-colors hover:text-coral-deep"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-plum/15 p-4 text-center transition-colors hover:border-coral/40 hover:bg-cream-soft"
        >
          <Upload className="mx-auto mb-2 h-5 w-5 text-plum-soft" />
          <p className="text-sm text-plum-soft">Click to upload photo</p>
          <p className="text-xs text-plum-faint">JPG, PNG up to 5MB</p>
        </button>
      )}
      {error && (
        <p className="mt-1 text-xs text-coral-deep">{error}</p>
      )}
    </>
  );
}

// Multi-line textarea that preserves the user's empty lines.
// Local raw string is the source of truth for what the textarea displays.
// Parent receives the filtered array (no empty lines) for rendering.
// External updates (e.g. parent loads new data) sync into local via the effect.
function MultilineList({
  value,
  onChange,
  rows,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  rows?: number;
}) {
  const [local, setLocal] = useState(value.join("\n"));
  useEffect(() => {
    const filtered = local.split("\n").filter((l) => l.trim().length > 0);
    const same =
      filtered.length === value.length && filtered.every((s, i) => s === value[i]);
    if (!same) setLocal(value.join("\n"));
  }, [value, local]);
  return (
    <textarea
      className={textareaClass}
      value={local}
      rows={rows}
      onChange={(e) => {
        setLocal(e.target.value);
        onChange(e.target.value.split("\n").filter((l) => l.trim().length > 0));
      }}
    />
  );
}

export function CVEditorSidebar({
  data,
  onChange,
}: {
  data: CVData;
  onChange: (data: CVData) => void;
}) {
  const updateBasics = (key: keyof CVData["basics"], value: string) => {
    onChange({ ...data, basics: { ...data.basics, [key]: value } });
  };

  const updateStyle = <K extends keyof NonNullable<CVData["style"]>>(
    key: K,
    value: NonNullable<CVData["style"]>[K] | undefined,
  ) => {
    if (value === undefined) {
      const next = { ...(data.style ?? {}) };
      delete next[key];
      onChange({ ...data, style: next });
    } else {
      onChange({ ...data, style: { ...(data.style ?? {}), [key]: value } });
    }
  };

  const [skillsModalOpen, setSkillsModalOpen] = useState(false);

  const skillsExperienceText = useMemo(() => {
    const entries = data.experience ?? [];
    if (entries.length === 0) return "";
    return entries
      .map((e) => {
        const dates = `${e.startDate ?? ""}${
          e.endDate ? ` – ${e.endDate}` : " – present"
        }`;
        const bullets = (e.bullets ?? [])
          .map((b) => `- ${stripRichText(b ?? "").trim()}`)
          .filter((line) => line.length > 2)
          .join("\n");
        const head = `${e.role || "(role)"} at ${
          e.company || "(company)"
        } (${dates}):`;
        return bullets ? `${head}\n${bullets}` : head;
      })
      .join("\n\n");
  }, [data.experience]);

  const currentThemeKey = (data.style?.themeKey ?? "plum") as ThemeKey;
  const currentHeadingFont = (data.style?.headingFont ?? "fraunces") as HeadingFontKey;
  const currentBodyFont = (data.style?.bodyFont ?? "inter") as BodyFontKey;
  const currentSectionStyle = (data.style?.sectionStyle ?? "uppercase") as SectionStyleKey;
  const currentPhotoStyle = (data.style?.photoStyle ?? "round") as PhotoStyleKey;
  const currentDensity = (data.style?.density ?? "comfortable") as DensityKey;
  const currentAccent = data.style?.accent;

  const sectionStyleOptions: { key: SectionStyleKey; label: string }[] = [
    { key: "uppercase", label: "UPPERCASE" },
    { key: "titlecase", label: "Title Case" },
    { key: "underlined", label: "Underlined" },
    { key: "boxed", label: "Boxed" },
  ];
  const photoStyleOptions: { key: PhotoStyleKey; label: string }[] = [
    { key: "round", label: "Round" },
    { key: "square", label: "Square" },
    { key: "none", label: "Hide" },
  ];
  const densityOptions: { key: DensityKey; label: string }[] = [
    { key: "spacious", label: "Spacious" },
    { key: "comfortable", label: "Comfortable" },
    { key: "compact", label: "Compact" },
  ];

  const darkThemes = (Object.entries(THEMES) as [ThemeKey, (typeof THEMES)[ThemeKey]][])
    .filter(([, t]) => t.category === "dark");
  const lightThemes = (Object.entries(THEMES) as [ThemeKey, (typeof THEMES)[ThemeKey]][])
    .filter(([, t]) => t.category === "light");

  const swatchClass = "h-7 w-7 rounded-full transition-transform hover:scale-110";
  const ringSelected = "0 0 0 2px #FF7A6B66";

  const segmentBtnClass = (active: boolean) =>
    `rounded-md border px-3 py-2 text-xs font-medium transition-colors ${
      active
        ? "border-coral/40 bg-coral/15 text-coral"
        : "border-plum/15 bg-cream-soft text-plum-soft hover:border-plum/30"
    }`;

  return (
    <div className="space-y-1">
      {/* STYLE */}
      <SectionAccordion title="Style">
        <div className="mb-5">
          <Field label="Theme">
            <div className="mb-2">
              <p className="mb-1.5 text-[10px] uppercase tracking-widest text-plum-faint">
                Dark
              </p>
              <div className="grid grid-cols-7 gap-1.5">
                {darkThemes.map(([key, t]) => {
                  const isSelected = currentThemeKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-label={t.name}
                      title={t.name}
                      onClick={() => updateStyle("themeKey", key)}
                      className={swatchClass}
                      style={{
                        backgroundColor: t.colors.primary,
                        border: isSelected
                          ? `2px solid ${t.colors.accent}`
                          : "2px solid rgba(15,27,61,0.1)",
                        boxShadow: isSelected ? ringSelected : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[10px] uppercase tracking-widest text-plum-faint">
                Light
              </p>
              <div className="grid grid-cols-7 gap-1.5">
                {lightThemes.map(([key, t]) => {
                  const isSelected = currentThemeKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-label={t.name}
                      title={t.name}
                      onClick={() => updateStyle("themeKey", key)}
                      className={swatchClass}
                      style={{
                        backgroundColor: t.colors.primary,
                        border: isSelected
                          ? `2px solid ${t.colors.accent}`
                          : "2px solid rgba(15,27,61,0.15)",
                        boxShadow: isSelected ? ringSelected : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </Field>
        </div>

        <div className="mb-5">
          <Field label="Accent (overrides theme)">
            <div className="grid grid-cols-7 gap-1.5">
              <button
                type="button"
                aria-label="Default"
                title="Use theme's built-in accent"
                onClick={() => updateStyle("accent", undefined)}
                className={`${swatchClass} flex items-center justify-center`}
                style={{
                  background:
                    "conic-gradient(from 0deg, #5EEAD4, #D4A24C, #FF7A6B, #C9B8E8, #A8D5BA, #7DB3D8, #5EEAD4)",
                  border: !currentAccent
                    ? "2px solid #2D1B3D"
                    : "2px solid rgba(15,27,61,0.15)",
                  boxShadow: !currentAccent ? ringSelected : "none",
                }}
              />
              {(Object.entries(ACCENTS) as [AccentKey, (typeof ACCENTS)[AccentKey]][]).map(
                ([key, a]) => {
                  const isSelected = currentAccent === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-label={a.name}
                      title={a.name}
                      onClick={() => updateStyle("accent", key)}
                      className={swatchClass}
                      style={{
                        backgroundColor: a.color,
                        border: isSelected
                          ? "2px solid #2D1B3D"
                          : "2px solid rgba(15,27,61,0.15)",
                        boxShadow: isSelected ? ringSelected : "none",
                      }}
                    />
                  );
                },
              )}
            </div>
          </Field>
        </div>

        <div className="mb-5">
          <Field label="Heading font">
            <select
              className={inputClass}
              value={currentHeadingFont}
              onChange={(e) =>
                updateStyle("headingFont", e.target.value as HeadingFontKey)
              }
            >
              {(Object.entries(HEADING_FONTS) as [
                HeadingFontKey,
                (typeof HEADING_FONTS)[HeadingFontKey],
              ][]).map(([key, f]) => (
                <option key={key} value={key}>
                  {f.name}
                </option>
              ))}
            </select>
            <p
              className="mt-2 text-2xl text-plum"
              style={{
                fontFamily: `${HEADING_FONTS[currentHeadingFont].cssVar}, ${HEADING_FONTS[currentHeadingFont].fallback}`,
              }}
            >
              Aa — Sample heading
            </p>
          </Field>
        </div>

        <div className="mb-5">
          <Field label="Body font">
            <select
              className={inputClass}
              value={currentBodyFont}
              onChange={(e) => updateStyle("bodyFont", e.target.value as BodyFontKey)}
            >
              {(Object.entries(BODY_FONTS) as [
                BodyFontKey,
                (typeof BODY_FONTS)[BodyFontKey],
              ][]).map(([key, f]) => (
                <option key={key} value={key}>
                  {f.name}
                </option>
              ))}
            </select>
            <p
              className="mt-2 text-sm text-plum-soft"
              style={{
                fontFamily: `${BODY_FONTS[currentBodyFont].cssVar}, ${BODY_FONTS[currentBodyFont].fallback}`,
              }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </Field>
        </div>

        <div className="mb-5">
          <Field label="Section titles">
            <div className="grid grid-cols-2 gap-1.5">
              {sectionStyleOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => updateStyle("sectionStyle", opt.key)}
                  className={segmentBtnClass(currentSectionStyle === opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="mb-5">
          <Field label="Photo style">
            <div className="grid grid-cols-3 gap-1.5">
              {photoStyleOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => updateStyle("photoStyle", opt.key)}
                  className={segmentBtnClass(currentPhotoStyle === opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div>
          <Field label="Density">
            <div className="grid grid-cols-3 gap-1.5">
              {densityOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => updateStyle("density", opt.key)}
                  className={segmentBtnClass(currentDensity === opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </SectionAccordion>

      {/* BASICS */}
      <SectionAccordion title="Basics" defaultOpen>
        <Field label="Full name">
          <input
            className={inputClass}
            value={data.basics.fullName}
            onChange={(e) => updateBasics("fullName", e.target.value)}
          />
        </Field>
        <Field label="Role">
          <input
            className={inputClass}
            value={data.basics.role}
            onChange={(e) => updateBasics("role", e.target.value)}
          />
        </Field>
        <Field label="Email">
          <input
            className={inputClass}
            type="email"
            value={data.basics.email}
            onChange={(e) => updateBasics("email", e.target.value)}
          />
        </Field>
        <Field label="Phone">
          <input
            className={inputClass}
            value={data.basics.phone ?? ""}
            onChange={(e) => updateBasics("phone", e.target.value)}
          />
        </Field>
        <Field label="Location">
          <input
            className={inputClass}
            value={data.basics.location ?? ""}
            onChange={(e) => updateBasics("location", e.target.value)}
          />
        </Field>
        <Field label="Website">
          <input
            className={inputClass}
            value={data.basics.website ?? ""}
            onChange={(e) => updateBasics("website", e.target.value)}
          />
        </Field>
        <Field label="LinkedIn">
          <input
            className={inputClass}
            value={data.basics.linkedIn ?? ""}
            onChange={(e) => updateBasics("linkedIn", e.target.value)}
          />
        </Field>
        <Field label="Photo">
          <PhotoUploadField
            value={data.basics.photoUrl}
            onChange={(url) => updateBasics("photoUrl", url)}
          />
        </Field>
        <Field label="Summary">
          <SummaryRow
            value={data.basics.summary ?? ""}
            onChange={(html) => updateBasics("summary", html)}
            role={data.basics.role}
          />
        </Field>
      </SectionAccordion>

      {/* EXPERIENCE */}
      <SectionAccordion title="Experience">
        {(data.experience ?? []).map((job, idx) => {
          const update = <K extends keyof CVData["experience"][number]>(
            key: K,
            value: CVData["experience"][number][K],
          ) => {
            const next = [...data.experience];
            next[idx] = { ...next[idx], [key]: value };
            onChange({ ...data, experience: next });
          };
          const remove = () =>
            onChange({
              ...data,
              experience: data.experience.filter((_, i) => i !== idx),
            });
          return (
            <ArrayEntry key={idx} onRemove={remove}>
              <Field label="Company">
                <input
                  className={inputClass}
                  value={job.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </Field>
              <Field label="Role">
                <input
                  className={inputClass}
                  value={job.role}
                  onChange={(e) => update("role", e.target.value)}
                />
              </Field>
              <Field label="Location">
                <input
                  className={inputClass}
                  value={job.location ?? ""}
                  onChange={(e) => update("location", e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Start">
                  <input
                    className={inputClass}
                    value={job.startDate}
                    onChange={(e) => update("startDate", e.target.value)}
                    placeholder="2021"
                  />
                </Field>
                <Field label="End">
                  <input
                    className={inputClass}
                    value={job.endDate ?? ""}
                    onChange={(e) => update("endDate", e.target.value)}
                    placeholder="Present"
                  />
                </Field>
              </div>
              <Field label="Bullets">
                <ExperienceBulletsField
                  bullets={job.bullets ?? []}
                  setBullets={(next) => update("bullets", next)}
                  role={job.role}
                  company={job.company}
                />
              </Field>
            </ArrayEntry>
          );
        })}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              experience: [
                ...(data.experience ?? []),
                { company: "", role: "", startDate: "", endDate: "", bullets: [] },
              ],
            })
          }
          className={addButtonClass}
        >
          <Plus className="h-3.5 w-3.5" /> Add experience
        </button>
      </SectionAccordion>

      {/* EDUCATION */}
      <SectionAccordion title="Education">
        {(data.education ?? []).map((entry, idx) => {
          const update = <K extends keyof CVData["education"][number]>(
            key: K,
            value: CVData["education"][number][K],
          ) => {
            const next = [...data.education];
            next[idx] = { ...next[idx], [key]: value };
            onChange({ ...data, education: next });
          };
          const remove = () =>
            onChange({
              ...data,
              education: data.education.filter((_, i) => i !== idx),
            });
          return (
            <ArrayEntry key={idx} onRemove={remove}>
              <Field label="School">
                <input
                  className={inputClass}
                  value={entry.school}
                  onChange={(e) => update("school", e.target.value)}
                />
              </Field>
              <Field label="Degree">
                <input
                  className={inputClass}
                  value={entry.degree}
                  onChange={(e) => update("degree", e.target.value)}
                />
              </Field>
              <Field label="Location">
                <input
                  className={inputClass}
                  value={entry.location ?? ""}
                  onChange={(e) => update("location", e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Start">
                  <input
                    className={inputClass}
                    value={entry.startDate}
                    onChange={(e) => update("startDate", e.target.value)}
                  />
                </Field>
                <Field label="End">
                  <input
                    className={inputClass}
                    value={entry.endDate}
                    onChange={(e) => update("endDate", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Notes">
                <textarea
                  className={textareaClass}
                  value={entry.notes ?? ""}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={2}
                />
              </Field>
            </ArrayEntry>
          );
        })}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              education: [
                ...(data.education ?? []),
                { school: "", degree: "", startDate: "", endDate: "" },
              ],
            })
          }
          className={addButtonClass}
        >
          <Plus className="h-3.5 w-3.5" /> Add education
        </button>
      </SectionAccordion>

      {/* SKILLS */}
      <SectionAccordion title="Skills">
        {(data.skills ?? []).length === 0 && (
          <button
            type="button"
            onClick={() => setSkillsModalOpen(true)}
            disabled={skillsExperienceText.trim().length < 50}
            className="flex w-full flex-col items-start gap-0.5 rounded-md border border-coral/30 bg-coral/10 px-3 py-2.5 text-left transition-colors hover:bg-coral/15 focus:outline-none focus:ring-2 focus:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-coral-deep">
              <Sparkles className="h-3.5 w-3.5" />
              Let AI suggest skills you might have missed
            </span>
            <span className="text-xs text-plum-soft">
              {skillsExperienceText.trim().length < 50
                ? "Add some Experience details first — we need something to read"
                : "We'll read your Experience and suggest skills based on what you've done"}
            </span>
          </button>
        )}

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-plum-soft">
            Skills (one per line)
          </span>
          <button
            type="button"
            onClick={() => setSkillsModalOpen(true)}
            disabled={skillsExperienceText.trim().length < 50}
            aria-label="Suggest skills with AI"
            title="Suggest skills with AI"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-coral transition-colors hover:bg-cream-soft hover:text-coral-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
          </button>
        </div>
        <MultilineList
          value={data.skills ?? []}
          onChange={(next) => onChange({ ...data, skills: next })}
          rows={6}
        />
      </SectionAccordion>

      {/* PROJECTS */}
      <SectionAccordion title="Projects">
        {(data.projects ?? []).map((project, idx) => {
          const list = data.projects ?? [];
          const update = <K extends keyof NonNullable<CVData["projects"]>[number]>(
            key: K,
            value: NonNullable<CVData["projects"]>[number][K],
          ) => {
            const next = [...list];
            next[idx] = { ...next[idx], [key]: value };
            onChange({ ...data, projects: next });
          };
          const remove = () =>
            onChange({ ...data, projects: list.filter((_, i) => i !== idx) });
          return (
            <ArrayEntry key={idx} onRemove={remove}>
              <Field label="Name">
                <input
                  className={inputClass}
                  value={project.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className={textareaClass}
                  value={project.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={2}
                />
              </Field>
              <Field label="URL">
                <input
                  className={inputClass}
                  value={project.url ?? ""}
                  onChange={(e) => update("url", e.target.value)}
                />
              </Field>
            </ArrayEntry>
          );
        })}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              projects: [...(data.projects ?? []), { name: "", description: "" }],
            })
          }
          className={addButtonClass}
        >
          <Plus className="h-3.5 w-3.5" /> Add project
        </button>
      </SectionAccordion>

      {/* LANGUAGES */}
      <SectionAccordion title="Languages">
        {(data.languages ?? []).map((lang, idx) => {
          const list = data.languages ?? [];
          const update = <K extends keyof NonNullable<CVData["languages"]>[number]>(
            key: K,
            value: NonNullable<CVData["languages"]>[number][K],
          ) => {
            const next = [...list];
            next[idx] = { ...next[idx], [key]: value };
            onChange({ ...data, languages: next });
          };
          const remove = () =>
            onChange({ ...data, languages: list.filter((_, i) => i !== idx) });
          return (
            <ArrayEntry key={idx} onRemove={remove}>
              <Field label="Language">
                <input
                  className={inputClass}
                  value={lang.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </Field>
              <Field label="Level">
                <select
                  className={inputClass}
                  value={lang.level}
                  onChange={(e) => update("level", e.target.value)}
                >
                  <option>Native</option>
                  <option>Professional</option>
                  <option>Conversational</option>
                  <option>Basic</option>
                </select>
              </Field>
            </ArrayEntry>
          );
        })}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              languages: [
                ...(data.languages ?? []),
                { name: "", level: "Professional" },
              ],
            })
          }
          className={addButtonClass}
        >
          <Plus className="h-3.5 w-3.5" /> Add language
        </button>
      </SectionAccordion>

      {/* AWARDS */}
      <SectionAccordion title="Awards">
        {(data.awards ?? []).map((award, idx) => {
          const list = data.awards ?? [];
          const update = <K extends keyof NonNullable<CVData["awards"]>[number]>(
            key: K,
            value: NonNullable<CVData["awards"]>[number][K],
          ) => {
            const next = [...list];
            next[idx] = { ...next[idx], [key]: value };
            onChange({ ...data, awards: next });
          };
          const remove = () =>
            onChange({ ...data, awards: list.filter((_, i) => i !== idx) });
          return (
            <ArrayEntry key={idx} onRemove={remove}>
              <Field label="Title">
                <input
                  className={inputClass}
                  value={award.title}
                  onChange={(e) => update("title", e.target.value)}
                />
              </Field>
              <Field label="Issuer">
                <input
                  className={inputClass}
                  value={award.issuer ?? ""}
                  onChange={(e) => update("issuer", e.target.value)}
                />
              </Field>
              <Field label="Year">
                <input
                  className={inputClass}
                  value={award.year}
                  onChange={(e) => update("year", e.target.value)}
                />
              </Field>
            </ArrayEntry>
          );
        })}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              awards: [...(data.awards ?? []), { title: "", year: "" }],
            })
          }
          className={addButtonClass}
        >
          <Plus className="h-3.5 w-3.5" /> Add award
        </button>
      </SectionAccordion>

      {/* CERTIFICATIONS */}
      <SectionAccordion title="Certifications">
        {(data.certifications ?? []).map((cert, idx) => {
          const list = data.certifications ?? [];
          const update = <K extends keyof NonNullable<CVData["certifications"]>[number]>(
            key: K,
            value: NonNullable<CVData["certifications"]>[number][K],
          ) => {
            const next = [...list];
            next[idx] = { ...next[idx], [key]: value };
            onChange({ ...data, certifications: next });
          };
          const remove = () =>
            onChange({ ...data, certifications: list.filter((_, i) => i !== idx) });
          return (
            <ArrayEntry key={idx} onRemove={remove}>
              <Field label="Name">
                <input
                  className={inputClass}
                  value={cert.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </Field>
              <Field label="Issuer">
                <input
                  className={inputClass}
                  value={cert.issuer ?? ""}
                  onChange={(e) => update("issuer", e.target.value)}
                />
              </Field>
              <Field label="Year">
                <input
                  className={inputClass}
                  value={cert.year ?? ""}
                  onChange={(e) => update("year", e.target.value)}
                />
              </Field>
            </ArrayEntry>
          );
        })}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              certifications: [...(data.certifications ?? []), { name: "" }],
            })
          }
          className={addButtonClass}
        >
          <Plus className="h-3.5 w-3.5" /> Add certification
        </button>
      </SectionAccordion>

      {/* INTERESTS */}
      <SectionAccordion title="Interests">
        <Field label="Interests (one per line)">
          <MultilineList
            value={data.interests ?? []}
            onChange={(next) => onChange({ ...data, interests: next })}
            rows={4}
          />
        </Field>
      </SectionAccordion>

      <ExtractSkillsModal
        open={skillsModalOpen}
        onClose={() => setSkillsModalOpen(false)}
        summary={data.basics?.summary}
        experienceText={skillsExperienceText}
        existingSkills={data.skills ?? []}
        onAccept={(picked) => {
          const existing = data.skills ?? [];
          const existingLower = new Set(
            existing.map((s) => s.trim().toLowerCase()),
          );
          const additions: string[] = [];
          for (const raw of picked) {
            const trimmed = raw.trim();
            if (!trimmed) continue;
            const key = trimmed.toLowerCase();
            if (existingLower.has(key)) continue;
            existingLower.add(key);
            additions.push(trimmed);
          }
          if (additions.length === 0) return;
          onChange({ ...data, skills: [...existing, ...additions] });
        }}
      />
    </div>
  );
}
