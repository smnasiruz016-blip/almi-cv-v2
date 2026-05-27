// FinancePrecise — Accountant / CPA / Bookkeeper / Auditor
// White + forest green + amber + middle ledger-line divider. Clean grid.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function FinancePrecise({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] bg-white print:shadow-none"
      style={{ color: "#1F2D24", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.5 }}>

      {/* HEADER — minimal, type-led */}
      <header style={{ padding: "40px 56px 24px", borderBottom: "1px solid #E2E6E0", position: "relative" }}>
        <div className="flex items-baseline justify-between gap-8">
          <div className="min-w-0">
            <h1 className="m-0" style={{ fontWeight: 700, fontSize: "32pt", lineHeight: 1.05, letterSpacing: "-0.015em", color: "#1F2D24" }}>
              {basics.name}
            </h1>
            <p className="m-0 mt-1.5 uppercase" style={{ fontSize: "11pt", color: "#2C5642", fontWeight: 700, letterSpacing: "0.18em" }}>
              {basics.role}
            </p>
          </div>
          <div className="text-right" style={{ fontSize: "9.5pt", color: "#4A5A4E", lineHeight: 1.7 }}>
            {basics.email && <div>{basics.email}</div>}
            {basics.phone && <div>{basics.phone}</div>}
            {basics.location && <div>{basics.location}</div>}
            {basics.linkedIn && <div>{basics.linkedIn}</div>}
          </div>
        </div>
        <div style={{ width: 44, height: 3, background: "#C28A2C", marginTop: 18 }} />
      </header>

      {/* MIDDLE LEDGER STRIP */}
      <div style={{ background: "#FBFAF6", padding: "12px 56px", borderBottom: "1px solid #E2E6E0", display: "flex", alignItems: "center", gap: 14, fontSize: "9pt", color: "#2C5642", fontFamily: '"JetBrains Mono", monospace', letterSpacing: "0.08em" }}>
        <span style={{ flex: 1, height: 8, background: "repeating-linear-gradient(90deg, transparent 0 6px, #C28A2C 6px 7px)", opacity: 0.4 }} />
        <span style={{ fontWeight: 600, color: "#1F2D24" }}>FINANCIAL · STATEMENT · OF · QUALIFICATION</span>
        <span style={{ flex: 1, height: 8, background: "repeating-linear-gradient(90deg, transparent 0 6px, #C28A2C 6px 7px)", opacity: 0.4 }} />
      </div>

      <div style={{ padding: "28px 56px 40px" }}>
        {basics.summary && (
          <Section title={getLabel(data, "summary", "Profile")}>
            <RichTextRender html={basics.summary} style={{ color: "#1F2D24", fontSize: "10.5pt" }} />
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title={getLabel(data, "certifications", "Certifications")}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
              <tbody>
                {certifications.map((c, i) => (
                  <tr key={i} style={{ borderBottom: i < certifications.length - 1 ? "1px dotted #C28A2C" : "0" }}>
                    <td style={{ padding: "6px 8px 6px 0", fontWeight: 700, color: "#1F2D24" }}>{c.name}</td>
                    <td style={{ padding: "6px 8px", color: "#4A5A4E" }}>{c.issuer || "—"}</td>
                    <td style={{ padding: "6px 0 6px 8px", textAlign: "right", color: "#C28A2C", fontFamily: '"JetBrains Mono", monospace', fontVariantNumeric: "tabular-nums", fontSize: "9pt" }}>{c.date || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[11.5pt]" style={{ color: "#1F2D24" }}>{e.title}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#2C5642" }}>{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  </div>
                  <span className="whitespace-nowrap font-semibold text-[9pt]" style={{ color: "#C28A2C", fontFamily: '"JetBrains Mono", monospace' }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <RichTextRender html={e.bullets} className="fp-bullets" style={{ marginTop: 4, fontSize: "10pt", color: "#3B4A40" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title={getLabel(data, "skills", "Skills")}>
              <div className="grid gap-y-1 gap-x-3" style={{ gridTemplateColumns: "1fr 1fr", fontSize: "10pt", color: "#1F2D24" }}>
                {skills.map((s, i) => (
                  <div key={i}><span style={{ color: "#C28A2C", marginRight: 6, fontWeight: 700 }}>›</span>{s.name}</div>
                ))}
              </div>
            </Section>
          )}
          <div>
            {education.length > 0 && (
              <Section title={getLabel(data, "education", "Education")}>
                {education.map((e, i) => (
                  <div key={i} className="mb-1.5 last:mb-0">
                    <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#1F2D24" }}>{e.degree}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#2C5642" }}>{e.institution}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#4A5A4E", fontFamily: '"JetBrains Mono", monospace' }}>
                      {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                    </p>
                  </div>
                ))}
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages", "Languages")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F2D24" }}>
                  {languages.map((l, i) => (
                    <li key={i}><b className="font-bold">{l.language}</b><span style={{ color: "#4A5A4E" }}> — {l.level}</span></li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        </div>
      </div>

      <style>{`.fp-bullets ul { margin: 0; padding-left: 18px; } .fp-bullets li { margin-bottom: 2px; }`}</style>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 uppercase" style={{ fontSize: "10pt", fontWeight: 700, letterSpacing: "0.22em", color: "#1F2D24", paddingBottom: 4, borderBottom: "1px solid #C28A2C" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
