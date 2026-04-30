"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { uploadPhoto } from "@/lib/photo-upload";
import type {
  AccentKey,
  BodyFontKey,
  CVData,
  DensityKey,
  HeadingFontKey,
  PhotoStyleKey,
  SectionStyleKey,
  ThemeKey,
} from "@/lib/cv-types";
import { ACCENTS, BODY_FONTS, HEADING_FONTS, THEMES } from "@/lib/cv-themes";
import { RichTextEditor } from "./RichTextEditor";

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
          <RichTextEditor
            value={data.basics.summary ?? ""}
            onChange={(html) => updateBasics("summary", html)}
            placeholder="A short professional summary..."
            minHeight={120}
            ariaLabel="Professional summary"
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
                <div className="space-y-2">
                  {(job.bullets ?? []).map((bullet, bi) => (
                    <div key={bi} className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <RichTextEditor
                          value={bullet}
                          onChange={(html) => {
                            const next = [...(job.bullets ?? [])];
                            next[bi] = html;
                            update("bullets", next);
                          }}
                          placeholder="Describe your impact..."
                          minHeight={60}
                          ariaLabel={`Bullet ${bi + 1}`}
                        />
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove bullet ${bi + 1}`}
                        onClick={() => {
                          const next = (job.bullets ?? []).filter(
                            (_, i) => i !== bi,
                          );
                          update("bullets", next);
                        }}
                        className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-plum-soft transition-colors hover:bg-coral/10 hover:text-coral"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      update("bullets", [...(job.bullets ?? []), ""])
                    }
                    className={addButtonClass}
                  >
                    <Plus className="h-3.5 w-3.5" /> Add bullet
                  </button>
                </div>
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
        <Field label="Skills (one per line)">
          <MultilineList
            value={data.skills ?? []}
            onChange={(next) => onChange({ ...data, skills: next })}
            rows={6}
          />
        </Field>
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
    </div>
  );
}
