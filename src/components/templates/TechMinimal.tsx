// ============================================================================
// TechMinimal — Software Engineers / DevOps / Backend. ATS-safe.
// Inter + JetBrains Mono. Charcoal + mint accent. Single-column, hash headings.
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

export default function TechMinimal({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article
      className="w-[794px] min-h-[1123px] bg-white text-[#1F2329] print:shadow-none"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.6,
        padding: "64px 72px 56px",
      }}
    >
      <header className="flex items-end justify-between gap-8 mb-2">
        <div>
          <h1 className="m-0 font-semibold text-[#1F2329]"
            style={{ fontSize: "26pt", letterSpacing: "-0.025em", lineHeight: 1 }}>
            {basics.fullName}
          </h1>
          <p className="m-0 mt-1 text-[#5A6470] text-[11pt]">{basics.role}</p>
        </div>
        <div className="text-right text-[9.5pt] text-[#5A6470] whitespace-nowrap"
          style={{ fontFamily: '"JetBrains Mono", monospace', lineHeight: 1.7 }}>
          {basics.email && <div>{basics.email}</div>}
          {basics.website && <div>{basics.website}</div>}
          {basics.phone && <div>{basics.phone}</div>}
          {basics.location && <div>{basics.location}</div>}
          {basics.linkedIn && <div>{basics.linkedIn}</div>}
        </div>
      </header>
      <div className="rounded mt-5" style={{ width: 56, height: 3, background: "#5EEAD4" }} />

      {!isRichTextEmpty(basics.summary) && (
        <RichTextRender
          html={basics.summary ?? ""}
          as="div"
          className="text-[#5A6470] text-[11pt] mt-7"
          style={{ lineHeight: 1.65, maxWidth: 600, textWrap: "pretty" }}
        />
      )}

      {experience.length > 0 && (
        <Section title={getLabel(data, "experience").toLowerCase()}>
          {experience.map((w, i) => (
            <div key={i} className="mb-4 last:mb-0 grid items-baseline"
              style={{ gridTemplateColumns: "120px 1fr", gap: 22 }}>
              <span className="text-[9pt] text-[#94A3B8]" style={{
                fontFamily: '"JetBrains Mono", monospace', paddingTop: 2,
              }}>
                {dateRange(w.startDate, w.endDate)}
              </span>
              <div>
                <p className="m-0 font-semibold text-[#1F2329] text-[11pt]">
                  {w.role}
                  <span className="font-normal text-[#5A6470]">
                    <span className="text-[#94A3B8]"> @ </span>{w.company}
                  </span>
                </p>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-4 list-disc text-[#5A6470] text-[10pt]">
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
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title={getLabel(data, "projects").toLowerCase()}>
          {projects.map((p, i) => (
            <div key={i} className="mb-3 last:mb-0 grid items-baseline"
              style={{ gridTemplateColumns: "120px 1fr", gap: 22 }}>
              <span className="text-[9pt] text-[#94A3B8]" style={{
                fontFamily: '"JetBrains Mono", monospace', paddingTop: 2,
              }}>
                {p.url ? "link" : "—"}
              </span>
              <div>
                <p className="m-0 font-semibold text-[#1F2329] text-[11pt]">
                  {p.name}
                  {p.url && (
                    <span className="font-normal text-[#5A6470]">
                      <span className="text-[#94A3B8]"> → </span>{p.url}
                    </span>
                  )}
                </p>
                <p className="m-0 mt-0.5 text-[10pt] text-[#5A6470]">{p.description}</p>
              </div>
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title={getLabel(data, "education").toLowerCase()}>
          {education.map((e, i) => (
            <div key={i} className="grid items-baseline mb-2.5 last:mb-0"
              style={{ gridTemplateColumns: "120px 1fr", gap: 22 }}>
              <span className="text-[9pt] text-[#94A3B8]"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                {dateRange(e.startDate, e.endDate)}
              </span>
              <div>
                <p className="m-0 font-semibold text-[#1F2329] text-[11pt]">
                  {e.degree}
                  <span className="font-normal text-[#5A6470]">
                    <span className="text-[#94A3B8]"> @ </span>{e.school}
                  </span>
                </p>
                {e.notes && (
                  <p className="m-0 mt-0.5 text-[10pt] text-[#5A6470]">{e.notes}</p>
                )}
              </div>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="stack">
          <div className="grid items-baseline" style={{ gridTemplateColumns: "120px 1fr", gap: 22 }}>
            <span className="text-[9pt] text-[#94A3B8]"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              all
            </span>
            <div className="flex flex-wrap gap-x-1.5 gap-y-1.5">
              {skills.map((s, i) => (
                <code key={i} className="text-[#1F2329]"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    background: "#F4F5F7", padding: "1px 7px",
                    borderRadius: 4, fontSize: "9.5pt",
                  }}>
                  {s}
                </code>
              ))}
            </div>
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title={getLabel(data, "certifications").toLowerCase()}>
          {certifications.map((c, i) => (
            <div key={i} className="grid items-baseline mb-1.5 last:mb-0"
              style={{ gridTemplateColumns: "120px 1fr", gap: 22 }}>
              <span className="text-[9pt] text-[#94A3B8]"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                {c.year || "—"}
              </span>
              <span className="text-[10.5pt] text-[#1F2329]">
                <b className="font-semibold">{c.name}</b>
                {c.issuer && <span className="text-[#5A6470]"> · {c.issuer}</span>}
              </span>
            </div>
          ))}
        </Section>
      )}

      {awards.length > 0 && (
        <Section title={getLabel(data, "awards").toLowerCase()}>
          {awards.map((a, i) => (
            <div key={i} className="grid items-baseline mb-1.5 last:mb-0"
              style={{ gridTemplateColumns: "120px 1fr", gap: 22 }}>
              <span className="text-[9pt] text-[#94A3B8]"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                {a.year || "—"}
              </span>
              <span className="text-[10.5pt] text-[#1F2329]">
                <b className="font-semibold">{a.title}</b>
                {a.issuer && <span className="text-[#5A6470]"> · {a.issuer}</span>}
              </span>
            </div>
          ))}
        </Section>
      )}

      {languages.length > 0 && (
        <Section title={getLabel(data, "languages").toLowerCase()}>
          <div className="grid items-baseline"
            style={{ gridTemplateColumns: "120px 1fr", gap: 22 }}>
            <span className="text-[9pt] text-[#94A3B8]"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}>spoken</span>
            <p className="m-0 text-[10pt] text-[#5A6470]">
              {languages.map((l, i) => (
                <React.Fragment key={i}>
                  <b className="font-semibold text-[#1F2329]">{l.name}</b> {l.level}
                  {i < languages.length - 1 && " · "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </Section>
      )}

      {interests.length > 0 && (
        <Section title={getLabel(data, "interests").toLowerCase()}>
          <div className="grid items-baseline"
            style={{ gridTemplateColumns: "120px 1fr", gap: 22 }}>
            <span className="text-[9pt] text-[#94A3B8]"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}>off</span>
            <p className="m-0 text-[10pt] text-[#5A6470]">{interests.join(" · ")}</p>
          </div>
        </Section>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="m-0 mb-3.5 lowercase" style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: "9pt", fontWeight: 500, color: "#5A6470",
      }}>
        <span style={{ color: "#5EEAD4" }}>#</span> {title}
      </h2>
      {children}
    </section>
  );
}
