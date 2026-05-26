// ============================================================================
// ClassicSerif — Corporate / Finance / Law. ATS-safe single column.
// Plum + gold accent. Fraunces display + Inter body.
// A4: 794 × 1123 px @ 96 DPI.
// ============================================================================
"use client";

import React from "react";
import {
  TemplateProps,
  dateRange,
  getLabel,
  RichTextRender,
  isRichTextEmpty,
} from "./types";

export default function ClassicSerif({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article
      className="w-[794px] min-h-[1123px] bg-white text-[#2D1B3D] print:shadow-none"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.55,
        padding: "56px 64px 48px",
      }}
    >
      {/* HEADER */}
      <header>
        <h1
          className="m-0"
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontWeight: 500,
            fontSize: "40pt",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {basics.fullName}
        </h1>
        <p
          className="mt-2 mb-0 italic"
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontWeight: 500,
            fontSize: "14pt",
            color: "#D4A24C",
            letterSpacing: "0.01em",
          }}
        >
          {basics.role}
        </p>
        <ContactLine basics={basics} />
      </header>

      <hr className="my-6 border-0" style={{ borderTop: "1px solid rgba(45,27,61,0.18)" }} />

      {!isRichTextEmpty(basics.summary) && (
        <Section title={getLabel(data, "profile")}>
          <RichTextRender
            html={basics.summary ?? ""}
            as="p"
            className="m-0 text-[#6B5B7A] text-[10.5pt]"
            style={{ textWrap: "pretty" }}
          />
        </Section>
      )}

      {experience.length > 0 && (
        <Section title={getLabel(data, "experience")}>
          {experience.map((w, i) => (
            <div key={i} className="mb-3.5 last:mb-0">
              <div className="flex justify-between items-baseline gap-3">
                <p className="m-0" style={{ fontFamily: "Fraunces, serif", fontSize: "12pt", fontWeight: 600 }}>
                  {w.role}
                  <span className="text-[#6B5B7A]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "10.5pt" }}>
                    {" · "}{w.company}
                  </span>
                </p>
                <span className="text-[9pt] text-[#6B5B7A] whitespace-nowrap tabular-nums">
                  {dateRange(w.startDate, w.endDate)}
                </span>
              </div>
              {w.bullets.length > 0 && (
                <ul className="mt-1.5 mb-0 pl-4 list-disc text-[#6B5B7A] text-[10.5pt]">
                  {w.bullets.map((b, j) =>
                    isRichTextEmpty(b) ? null : (
                      <li key={j} className="mb-0.5">
                        <RichTextRender html={b} as="span" />
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title={getLabel(data, "education")}>
          {education.map((e, i) => (
            <div key={i} className="mb-2.5 last:mb-0">
              <div className="flex justify-between items-baseline gap-3">
                <p className="m-0" style={{ fontFamily: "Fraunces, serif", fontSize: "12pt", fontWeight: 600 }}>
                  {e.degree}
                  <span className="text-[#6B5B7A]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "10.5pt" }}>
                    {" · "}{e.school}
                  </span>
                </p>
                <span className="text-[9pt] text-[#6B5B7A] whitespace-nowrap tabular-nums">
                  {dateRange(e.startDate, e.endDate)}
                </span>
              </div>
              {e.notes && <p className="m-0 mt-0.5 text-[10pt] text-[#9D8FAB]">{e.notes}</p>}
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title={getLabel(data, "skills")}>
          <p className="m-0 flex flex-wrap gap-y-1 text-[10pt] text-[#6B5B7A]">
            {skills.map((s, i) => (
              <React.Fragment key={i}>
                <span>{s}</span>
                {i < skills.length - 1 && <span className="mx-2.5 text-[#9D8FAB]">·</span>}
              </React.Fragment>
            ))}
          </p>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title={getLabel(data, "projects")}>
          {projects.map((p, i) => (
            <div key={i} className="mb-2.5 last:mb-0">
              <p className="m-0" style={{ fontFamily: "Fraunces, serif", fontSize: "11.5pt", fontWeight: 600 }}>
                {p.name}
                {p.url && (
                  <span className="text-[#6B5B7A]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "10pt" }}>
                    {" · "}{p.url}
                  </span>
                )}
              </p>
              <p className="m-0 mt-0.5 text-[10.5pt] text-[#6B5B7A]">{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
        <Section title={`${getLabel(data, "languages")} & ${getLabel(data, "certifications")}`}>
          {languages.length > 0 && (
            <p className="m-0 mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[10pt] text-[#6B5B7A]">
              {languages.map((l, i) => (
                <span key={i}>
                  <b className="text-[#2D1B3D] font-semibold">{l.name}</b> {l.level}
                </span>
              ))}
            </p>
          )}
          {certifications.length > 0 && (
            <p className="m-0 flex flex-wrap gap-y-1 text-[10pt] text-[#6B5B7A]">
              {certifications.map((c, i) => (
                <React.Fragment key={i}>
                  <span>
                    {c.name}
                    {c.issuer ? `, ${c.issuer}` : ""}
                    {c.year ? ` (${c.year})` : ""}
                  </span>
                  {i < certifications.length - 1 && <span className="mx-2.5 text-[#9D8FAB]">·</span>}
                </React.Fragment>
              ))}
            </p>
          )}
        </Section>
      )}

      {awards.length > 0 && (
        <Section title={getLabel(data, "awards")}>
          <p className="m-0 flex flex-wrap gap-y-1 text-[10pt] text-[#6B5B7A]">
            {awards.map((a, i) => (
              <React.Fragment key={i}>
                <span>
                  <b className="text-[#2D1B3D] font-semibold">{a.title}</b>
                  {a.issuer ? `, ${a.issuer}` : ""}
                  {a.year ? ` (${a.year})` : ""}
                </span>
                {i < awards.length - 1 && <span className="mx-2.5 text-[#9D8FAB]">·</span>}
              </React.Fragment>
            ))}
          </p>
        </Section>
      )}

      {interests.length > 0 && (
        <Section title={getLabel(data, "interests")}>
          <p className="m-0 text-[10pt] text-[#6B5B7A]">{interests.join(" · ")}</p>
        </Section>
      )}
    </article>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function ContactLine({ basics }: { basics: TemplateProps["data"]["basics"] }) {
  const items = [basics.email, basics.phone, basics.location, basics.website, basics.linkedIn].filter(
    (v): v is string => Boolean(v && v.trim()),
  );
  if (items.length === 0) return null;
  return (
    <ul className="mt-4 p-0 list-none flex flex-wrap gap-y-1 gap-x-3.5 text-[9.5pt] text-[#6B5B7A]">
      {items.map((it, i) => (
        <li key={i} className="inline-flex items-center">
          {it}
          {i < items.length - 1 && <span className="ml-3.5 text-[#9D8FAB]">·</span>}
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2
        className="m-0 mb-3 flex items-center gap-3 uppercase"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "9.5pt",
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "#2D1B3D",
        }}
      >
        {title}
        <span className="flex-1" style={{ borderTop: "1px solid rgba(45,27,61,0.18)" }} />
      </h2>
      <div>{children}</div>
    </section>
  );
}
