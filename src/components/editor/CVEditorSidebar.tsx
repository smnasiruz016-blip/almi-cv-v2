"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import type { CVData } from "@/lib/cv-types";

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

  return (
    <div className="space-y-1">
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
        <Field label="Photo URL">
          <input
            className={inputClass}
            value={data.basics.photoUrl ?? ""}
            onChange={(e) => updateBasics("photoUrl", e.target.value)}
            placeholder="https://..."
          />
        </Field>
        <Field label="Summary">
          <textarea
            className={textareaClass}
            value={data.basics.summary ?? ""}
            onChange={(e) => updateBasics("summary", e.target.value)}
            rows={4}
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
              <Field label="Bullets (one per line)">
                <MultilineList
                  value={job.bullets ?? []}
                  onChange={(next) => update("bullets", next)}
                  rows={4}
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
