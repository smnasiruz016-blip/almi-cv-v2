// ============================================================================
// CorporateBlue — Project / Product / Operations / Business Management.
// ATS-safe. Navy hero band + clean white body. Conservative, executive.
// A4: 794 × 1123 px @ 96 DPI.
// ============================================================================
"use client";

import React from "react";
import {
  TemplateProps,
  dateRange,
  initials,
  getLabel,
  RichTextRender,
  isRichTextEmpty,
} from "./types";

export default function CorporateBlue({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] bg-white text-[#1F2329] print:shadow-none"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>
      {/* HERO BAND */}
      <header className="relative"
        style={{
          background: "linear-gradient(135deg, #0F1B3D 0%, #1E3A5F 100%)",
          color: "#F8FAFC", padding: "44px 56px 36px",
        }}>
        <div className="grid items-center gap-7" style={{ gridTemplateColumns: "1fr 112px" }}>
          <div>
            <h1 className="m-0"
              style={{
                fontWeight: 700, fontSize: "36pt",
                lineHeight: 1, letterSpacing: "-0.025em",
              }}>
              {basics.fullName}
            </h1>
            <p className="m-0 mt-2.5 uppercase"
              style={{
                fontSize: "11.5pt", color: "#7DB3D8",
                fontWeight: 600, letterSpacing: "0.18em",
              }}>
              {basics.role}
            </p>
          </div>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt=""
              className="rounded-full object-cover"
              style={{ width: 112, height: 112, border: "3px solid #7DB3D8" }} />
          ) : (
            <div className="rounded-full flex items-center justify-center"
              style={{
                width: 112, height: 112,
                background: "rgba(125,179,216,0.20)",
                border: "3px solid #7DB3D8",
                color: "#F8FAFC",
                fontFamily: "Inter, sans-serif", fontWeight: 700,
                fontSize: "32pt", letterSpacing: "-0.02em",
              }}>
              {initials(basics.fullName)}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-y-1 gap-x-5 mt-5 text-[9.5pt]"
          style={{ color: "rgba(248,250,252,0.78)" }}>
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>·  {basics.phone}</span>}
          {basics.location && <span>·  {basics.location}</span>}
          {basics.website && <span>·  {basics.website}</span>}
          {basics.linkedIn && <span>·  {basics.linkedIn}</span>}
        </div>
      </header>

      {/* BODY */}
      <div style={{ padding: "36px 56px 44px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Section title={`Executive ${getLabel(data, "profile")}`}>
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[10.5pt] text-[#3B4252]"
              style={{ textWrap: "pretty" }}
            />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={`Professional ${getLabel(data, "experience")}`}>
            {experience.map((w, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[#0F1B3D] text-[11.5pt]">{w.role}</p>
                    <p className="m-0 mt-px text-[10pt] font-semibold" style={{ color: "#1E3A5F" }}>
                      {w.company}
                    </p>
                  </div>
                  <span className="text-[9pt] whitespace-nowrap font-medium"
                    style={{ color: "#5A6677" }}>
                    {dateRange(w.startDate, w.endDate)}
                  </span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-4 list-disc text-[#3B4252] text-[10pt]">
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

        {projects.length > 0 && (
          <Section title={`Key ${getLabel(data, "projects")}`}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2.5 last:mb-0">
                <p className="m-0 font-semibold text-[#0F1B3D] text-[11pt]">
                  {p.name}
                  {p.url && (
                    <span className="font-normal text-[10pt]" style={{ color: "#5A6677" }}>
                      {" · "}{p.url}
                    </span>
                  )}
                </p>
                <p className="m-0 mt-0.5 text-[10pt] text-[#3B4252]">{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2.5 last:mb-0">
                  <p className="m-0 font-semibold text-[#0F1B3D] text-[11pt]">{e.degree}</p>
                  <p className="m-0 mt-px text-[10pt] font-semibold" style={{ color: "#1E3A5F" }}>{e.school}</p>
                  <p className="m-0 mt-px text-[9pt]" style={{ color: "#5A6677" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {skills.length > 0 && (
            <Section title="Core Competencies">
              <div className="grid gap-y-1 gap-x-3 text-[10pt] text-[#3B4252]"
                style={{ gridTemplateColumns: "1fr 1fr" }}>
                {skills.map((s, i) => (
                  <div key={i}>
                    <span style={{ color: "#1E3A5F", fontWeight: 700, marginRight: 6 }}>›</span>
                    {s}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {certifications.length > 0 && (
            <Section title={getLabel(data, "certifications")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B4252]">
                {certifications.map((c, i) => (
                  <li key={i} className="mb-1">
                    <b className="font-semibold text-[#0F1B3D]">{c.name}</b>
                    {c.issuer && <span style={{ color: "#5A6677" }}> · {c.issuer}</span>}
                    {c.year && <span style={{ color: "#5A6677" }}> · {c.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {languages.length > 0 && (
            <Section title={getLabel(data, "languages")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B4252]">
                {languages.map((l, i) => (
                  <li key={i} className="mb-1">
                    <b className="font-semibold text-[#0F1B3D]">{l.name}</b>
                    <span style={{ color: "#5A6677" }}> · {l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {awards.length > 0 && (
            <Section title={getLabel(data, "awards")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B4252]">
                {awards.map((a, i) => (
                  <li key={i} className="mb-1">
                    <b className="font-semibold text-[#0F1B3D]">{a.title}</b>
                    {a.issuer && <span style={{ color: "#5A6677" }}> · {a.issuer}</span>}
                    {a.year && <span style={{ color: "#5A6677" }}> · {a.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {interests.length > 0 && (
            <Section title={getLabel(data, "interests")}>
              <p className="m-0 text-[10pt] text-[#3B4252]">{interests.join(" · ")}</p>
            </Section>
          )}
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 last:mb-0">
      <h2 className="m-0 mb-3 uppercase"
        style={{
          fontSize: "10.5pt", fontWeight: 700,
          letterSpacing: "0.18em", color: "#0F1B3D",
          paddingBottom: 6, borderBottom: "2px solid #1E3A5F",
        }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
