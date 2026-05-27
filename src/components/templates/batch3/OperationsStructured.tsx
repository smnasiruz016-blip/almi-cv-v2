// OperationsStructured — Operations Manager / COO / Supply Chain Lead
// White + slate blue + amber. Diagonal accent bars (futuristic), KPI callouts.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function OperationsStructured({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color: "#1F2A3D", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.5 }}>

      {/* DIAGONAL ACCENT TOP-LEFT (slate) */}
      <svg viewBox="0 0 794 200" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 200, pointerEvents: "none" }}>
        <polygon points="0,0 460,0 360,200 0,200" fill="#3B5475" />
        <polygon points="380,0 540,0 440,200 280,200" fill="#5278A6" opacity="0.85" />
        <polygon points="540,0 620,0 520,200 440,200" fill="#E2B647" opacity="0.95" />
      </svg>

      {/* DIAGONAL ACCENT BOTTOM-RIGHT */}
      <svg viewBox="0 0 200 200" style={{ position: "absolute", bottom: 0, right: 0, width: 180, height: 180, pointerEvents: "none", opacity: 0.18 }}>
        <polygon points="200,0 200,200 0,200" fill="#3B5475" />
        <polygon points="200,40 200,200 60,200" fill="#E2B647" />
      </svg>

      <div style={{ position: "relative", zIndex: 1, padding: "44px 48px 40px" }}>
        <header className="mb-7 grid items-center gap-6" style={{ gridTemplateColumns: "1fr 100px" }}>
          <div className="min-w-0">
            <p className="m-0 mb-1.5 uppercase" style={{ fontSize: "9pt", color: "#FFFFFF", letterSpacing: "0.24em", fontWeight: 700, opacity: 0.85 }}>
              Operations Leadership
            </p>
            <h1 className="m-0" style={{ fontWeight: 800, fontSize: "38pt", lineHeight: 1, letterSpacing: "-0.025em", color: "#FFFFFF" }}>
              {basics.name}
            </h1>
            <p className="m-0 mt-2 uppercase" style={{ fontSize: "12pt", color: "#FFE0A0", fontWeight: 700, letterSpacing: "0.16em" }}>
              {basics.role}
            </p>
          </div>
          {basics.photo ? (
            <img src={basics.photo} alt="" className="rounded-full object-cover" style={{ width: 100, height: 100, border: "3px solid #FFFFFF" }} />
          ) : (
            <div className="rounded-full flex items-center justify-center" style={{ width: 100, height: 100, background: "rgba(255,255,255,0.15)", border: "3px solid #FFFFFF", color: "#FFFFFF", fontWeight: 800, fontSize: "30pt" }}>
              {initials(basics.name)}
            </div>
          )}
        </header>

        {/* CONTACT STRIP — sits between header and body */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-7" style={{ fontSize: "9.5pt", color: "#1F2A3D", padding: "10px 14px", background: "#F4F6FA", borderLeft: "3px solid #E2B647" }}>
          {basics.email && <span><b style={{ color: "#3B5475" }}>EMAIL</b> {basics.email}</span>}
          {basics.phone && <span><b style={{ color: "#3B5475" }}>PHONE</b> {basics.phone}</span>}
          {basics.location && <span><b style={{ color: "#3B5475" }}>BASED</b> {basics.location}</span>}
          {basics.linkedIn && <span><b style={{ color: "#3B5475" }}>IN</b> /{basics.linkedIn}</span>}
        </div>

        {basics.summary && (
          <Section title={getLabel(data, "summary", "Operating Profile")}>
            <RichTextRender html={basics.summary} style={{ color: "#1F2A3D", fontSize: "10.5pt" }} />
          </Section>
        )}

        {/* KPI ROW (first 3 skills) */}
        {skills.length > 0 && (
          <div className="grid gap-2 mb-6" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {skills.slice(0, 3).map((s, i) => (
              <div key={i} className="relative" style={{ padding: "14px 16px", background: "#F4F6FA", borderTop: "3px solid #E2B647" }}>
                <div style={{ fontWeight: 800, fontSize: "18pt", color: "#1F2A3D", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.name}</div>
                {s.level && <div className="mt-1 uppercase" style={{ fontSize: "8.5pt", letterSpacing: "0.16em", color: "#3B5475", fontWeight: 600 }}>{s.level}</div>}
              </div>
            ))}
          </div>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[11.5pt]" style={{ color: "#1F2A3D" }}>{e.title}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#3B5475" }}>{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt] font-semibold uppercase" style={{ color: "#1F2A3D", letterSpacing: "0.06em", background: "#FFE0A0", padding: "3px 10px" }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <RichTextRender html={e.bullets} className="os-bullets" style={{ marginTop: 5, fontSize: "10pt", color: "#2A3854" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {certifications.length > 0 && (
            <Section title={getLabel(data, "certifications", "Certifications")}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F2A3D" }}>
                {certifications.map((c, i) => (
                  <li key={i} className="flex items-baseline gap-2 mb-1">
                    <span style={{ flexShrink: 0, padding: "1px 7px", borderRadius: 2, fontSize: "8.5pt", fontWeight: 700, background: "#3B5475", color: "#FFE0A0", fontFamily: '"JetBrains Mono", monospace' }}>{c.date || "—"}</span>
                    <span><b className="font-bold">{c.name}</b>{c.issuer && <span style={{ color: "#5A6B82" }}> · {c.issuer}</span>}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          <div>
            {education.length > 0 && (
              <Section title={getLabel(data, "education", "Education")}>
                {education.map((e, i) => (
                  <div key={i} className="mb-1.5 last:mb-0">
                    <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#1F2A3D" }}>{e.degree}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#3B5475" }}>{e.institution}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#5A6B82" }}>{dateRange(e.startDate, e.endDate)}</p>
                  </div>
                ))}
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages", "Languages")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F2A3D" }}>
                  {languages.map((l, i) => (<li key={i}><b className="font-bold">{l.language}</b><span style={{ color: "#5A6B82" }}> — {l.level}</span></li>))}
                </ul>
              </Section>
            )}
          </div>
        </div>

        {/* Additional skills as tags below KPIs */}
        {skills.length > 3 && (
          <Section title={getLabel(data, "skills", "Capabilities")}>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(3).map((s, i) => (
                <span key={i} style={{ padding: "3px 10px", fontSize: "9.5pt", fontWeight: 600, color: "#1F2A3D", background: "#F4F6FA", border: "1px solid #D5DDE9" }}>{s.name}</span>
              ))}
            </div>
          </Section>
        )}
      </div>

      <style>{`.os-bullets ul { margin: 0; padding-left: 0; list-style: none; } .os-bullets li { padding-left: 16px; position: relative; margin-bottom: 2px; } .os-bullets li:before { content: "›"; position: absolute; left: 0; color: #E2B647; font-weight: 800; }`}</style>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 uppercase" style={{ fontSize: "10.5pt", fontWeight: 800, letterSpacing: "0.18em", color: "#1F2A3D", paddingBottom: 5, position: "relative" }}>
        {title}
        <span style={{ position: "absolute", left: 0, bottom: 0, width: 36, height: 3, background: "#E2B647" }} />
        <span style={{ position: "absolute", left: 40, bottom: 1, width: 80, height: 1, background: "#3B5475", opacity: 0.4 }} />
      </h2>
      {children}
    </section>
  );
}
