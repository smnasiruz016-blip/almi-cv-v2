// ============================================================================
// LogisticsDirect — Truck Drivers / Logistics Coordinators / Warehouse.
// Single-column, ATS-clean. Yellow + black "road" header. License/endorsement
// fields prominent. Built for parsing — every field surfaces cleanly.
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

export default function LogisticsDirect({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] bg-white print:shadow-none"
      style={{ color: "#1A1A1A", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.5 }}>

      {/* HEADER — bold black band with yellow road stripe */}
      <header style={{ background: "#1A1A1A", color: "#FFFFFF", padding: "36px 48px 28px" }}>
        <h1 className="m-0 uppercase" style={{
          fontWeight: 900, fontSize: "38pt", lineHeight: 1, letterSpacing: "-0.01em",
        }}>{basics.fullName}</h1>
        <p className="m-0 mt-2 uppercase" style={{
          fontSize: "12pt", color: "#F4C026", fontWeight: 800, letterSpacing: "0.22em",
        }}>{basics.role}</p>
      </header>
      <div style={{
        height: 8,
        background: "repeating-linear-gradient(90deg, #F4C026 0 28px, #1A1A1A 28px 36px)",
      }} />

      {/* CONTACT BAR */}
      <div style={{
        background: "#F4F4F4", padding: "10px 48px",
        display: "flex", flexWrap: "wrap", gap: "4px 24px",
        fontSize: "9.5pt", color: "#3B3B3B", fontWeight: 500,
      }}>
        {basics.email && <span>EMAIL — {basics.email}</span>}
        {basics.phone && <span>PHONE — {basics.phone}</span>}
        {basics.location && <span>LOCATION — {basics.location}</span>}
        {basics.website && <span>WEB — {basics.website}</span>}
        {basics.linkedIn && <span>LINKEDIN — {basics.linkedIn}</span>}
      </div>

      <div style={{ padding: "30px 48px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Section title={`PROFESSIONAL ${getLabel(data, "profile").toUpperCase()}`}>
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[10.5pt]"
              style={{ color: "#1A1A1A", textWrap: "pretty" }}
            />
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="LICENSES & ENDORSEMENTS">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
              <thead>
                <tr style={{ background: "#1A1A1A", color: "#F4C026" }}>
                  <th style={{ textAlign: "left", padding: "6px 10px", fontWeight: 700, fontSize: "9pt", letterSpacing: "0.12em" }}>CREDENTIAL</th>
                  <th style={{ textAlign: "left", padding: "6px 10px", fontWeight: 700, fontSize: "9pt", letterSpacing: "0.12em" }}>ISSUER</th>
                  <th style={{ textAlign: "right", padding: "6px 10px", fontWeight: 700, fontSize: "9pt", letterSpacing: "0.12em" }}>YEAR</th>
                </tr>
              </thead>
              <tbody>
                {certifications.map((c, i) => (
                  <tr key={i} style={{
                    borderBottom: "1px solid #E5E5E5",
                    background: i % 2 === 0 ? "#FFFFFF" : "#FBFBFB",
                  }}>
                    <td style={{ padding: "8px 10px", fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: "8px 10px", color: "#5A5A5A" }}>{c.issuer || "—"}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: "#5A5A5A", fontVariantNumeric: "tabular-nums" }}>{c.year || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={`WORK ${getLabel(data, "experience").toUpperCase()}`}>
            {experience.map((w, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[11.5pt] uppercase" style={{ color: "#1A1A1A", letterSpacing: "0.01em" }}>{w.role}</p>
                    <p className="m-0 text-[10pt]" style={{ color: "#3B3B3B", fontWeight: 600 }}>{w.company}</p>
                  </div>
                  <span className="whitespace-nowrap font-semibold text-[9.5pt]" style={{
                    color: "#1A1A1A", background: "#F4C026",
                    padding: "3px 9px", letterSpacing: "0.04em",
                  }}>{dateRange(w.startDate, w.endDate)}</span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-5 list-disc text-[10pt]" style={{ color: "#1A1A1A" }}>
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
          <Section title={`KEY ${getLabel(data, "projects").toUpperCase()}`}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#1A1A1A" }}>
                  {p.name}
                  {p.url && (
                    <span className="ml-2 text-[9.5pt] font-normal" style={{ color: "#5A5A5A" }}>{p.url}</span>
                  )}
                </p>
                <p className="m-0 text-[10pt]" style={{ color: "#3B3B3B" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title={`${getLabel(data, "skills").toUpperCase()} & EQUIPMENT`}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1A1A1A" }}>
                {skills.map((s, i) => (
                  <li key={i} className="relative" style={{ paddingLeft: 16, marginBottom: 2 }}>
                    <span className="absolute" style={{ left: 0, color: "#F4C026", fontWeight: 900 }}>■</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <div>
            {education.length > 0 && (
              <Section title={getLabel(data, "education").toUpperCase()}>
                {education.map((e, i) => (
                  <div key={i} className="mb-2 last:mb-0">
                    <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#1A1A1A" }}>{e.degree}</p>
                    <p className="m-0 text-[10pt]" style={{ color: "#3B3B3B" }}>{e.school}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#5A5A5A" }}>
                      {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                    </p>
                  </div>
                ))}
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages").toUpperCase()}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1A1A1A" }}>
                  {languages.map((l, i) => (
                    <li key={i}>
                      <b className="font-bold">{l.name}</b>
                      <span style={{ color: "#5A5A5A" }}> — {l.level}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {awards.length > 0 && (
              <Section title={getLabel(data, "awards").toUpperCase()}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1A1A1A" }}>
                  {awards.map((a, i) => (
                    <li key={i}>
                      <b className="font-bold">{a.title}</b>
                      {a.issuer && <span style={{ color: "#5A5A5A" }}> — {a.issuer}</span>}
                      {a.year && <span style={{ color: "#5A5A5A" }}>, {a.year}</span>}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {interests.length > 0 && (
              <Section title={getLabel(data, "interests").toUpperCase()}>
                <p className="m-0 text-[10pt]" style={{ color: "#3B3B3B" }}>
                  {interests.join(" · ")}
                </p>
              </Section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-2.5" style={{
        fontWeight: 900, fontSize: "11pt", letterSpacing: "0.22em",
        color: "#1A1A1A", paddingBottom: 4,
        borderBottom: "3px solid #F4C026",
      }}>{title}</h2>
      {children}
    </section>
  );
}
