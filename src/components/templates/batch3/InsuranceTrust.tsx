// InsuranceTrust — Insurance Agent / Underwriter / Claims Adjuster / Broker
// Ivory + teal + warm bronze. Shield-shape accent. Middle horizontal trust-bar.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function InsuranceTrust({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] relative print:shadow-none overflow-hidden"
      style={{ background: "#FBF8F0", color: "#1A363A", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* HEADER */}
      <header className="relative" style={{ padding: "44px 56px 28px", background: "linear-gradient(180deg, #F5F1E2 0%, #FBF8F0 100%)" }}>
        {/* Shield watermark left */}
        <svg viewBox="0 0 100 116" style={{ position: "absolute", left: 48, top: 32, width: 80, height: 92, opacity: 0.95 }}>
          <defs>
            <linearGradient id="it-shield" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2C6C70" /><stop offset="100%" stopColor="#1A4D50" />
            </linearGradient>
          </defs>
          <path d="M 50 4 L 94 18 L 94 60 C 94 84 76 102 50 112 C 24 102 6 84 6 60 L 6 18 Z"
            fill="url(#it-shield)" stroke="#B8884E" strokeWidth="2" />
          <text x="50" y="68" textAnchor="middle" fill="#FBF8F0" fontWeight="800" fontSize="32" fontFamily="Inter, sans-serif" letterSpacing="-0.02em">
            {initials(basics.name)}
          </text>
          <line x1="22" y1="82" x2="78" y2="82" stroke="#B8884E" strokeWidth="1.4" />
        </svg>

        <div style={{ marginLeft: 100 }}>
          <p className="m-0 mb-1.5 uppercase" style={{ fontSize: "9pt", letterSpacing: "0.26em", color: "#B8884E", fontWeight: 700 }}>
            Licensed Insurance Professional
          </p>
          <h1 className="m-0" style={{ fontWeight: 700, fontSize: "32pt", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#1A363A" }}>
            {basics.name}
          </h1>
          <p className="m-0 mt-1.5 uppercase" style={{ fontSize: "11pt", color: "#2C6C70", fontWeight: 700, letterSpacing: "0.18em" }}>
            {basics.role}
          </p>
          <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3 text-[9.5pt]" style={{ color: "#4A5F62" }}>
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>· {basics.phone}</span>}
            {basics.location && <span>· {basics.location}</span>}
            {basics.linkedIn && <span>· {basics.linkedIn}</span>}
          </div>
        </div>
      </header>

      {/* MIDDLE TRUST BAR */}
      <div className="flex items-center justify-between gap-4" style={{ background: "#2C6C70", color: "#FBF8F0", padding: "11px 56px", fontSize: "9pt", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        <span>● Licensed</span>
        <span>● Bonded</span>
        <span>● E&amp;O Insured</span>
        <span>● Fiduciary</span>
        <span>● Compliant</span>
      </div>

      <div style={{ padding: "32px 56px 40px" }}>
        {basics.summary && (
          <Section title={getLabel(data, "summary", "Professional Profile")}>
            <RichTextRender html={basics.summary} style={{ color: "#1A363A", fontSize: "10.5pt" }} />
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title={getLabel(data, "certifications", "Licenses & Certifications")}>
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {certifications.map((c, i) => (
                <div key={i} className="flex items-center gap-3" style={{ padding: "10px 14px", background: "#FFFFFF", borderLeft: "3px solid #B8884E" }}>
                  <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, color: "#2C6C70", flexShrink: 0 }} fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V5l-9-4zm-1 16l-4-4 1.4-1.4L11 14.2l5.6-5.6L18 10l-7 7z" />
                  </svg>
                  <div>
                    <div className="font-bold text-[10pt]" style={{ color: "#1A363A" }}>{c.name}</div>
                    {(c.issuer || c.date) && <div className="text-[9pt]" style={{ color: "#4A5F62" }}>{[c.issuer, c.date].filter(Boolean).join(" · ")}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[11.5pt]" style={{ color: "#1A363A" }}>{e.title}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#2C6C70" }}>{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt]" style={{ color: "#B8884E", fontWeight: 600 }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <RichTextRender html={e.bullets} className="it-bullets" style={{ marginTop: 5, fontSize: "10pt", color: "#2A4D50" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title={getLabel(data, "skills", "Expertise")}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} style={{ padding: "3px 10px", fontSize: "9.5pt", color: "#1A363A", background: "#F5F1E2", border: "1px solid #B8884E", borderRadius: 3, fontWeight: 600 }}>{s.name}</span>
                ))}
              </div>
            </Section>
          )}
          <div>
            {education.length > 0 && (
              <Section title={getLabel(data, "education", "Education")}>
                {education.map((e, i) => (
                  <div key={i} className="mb-1.5 last:mb-0">
                    <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#1A363A" }}>{e.degree}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#2C6C70" }}>{e.institution}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#4A5F62" }}>{dateRange(e.startDate, e.endDate)}</p>
                  </div>
                ))}
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages", "Languages")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1A363A" }}>
                  {languages.map((l, i) => (<li key={i}><b className="font-bold">{l.language}</b><span style={{ color: "#4A5F62" }}> — {l.level}</span></li>))}
                </ul>
              </Section>
            )}
          </div>
        </div>
      </div>

      <style>{`.it-bullets ul { margin: 0; padding-left: 0; list-style: none; } .it-bullets li { padding-left: 18px; position: relative; margin-bottom: 2px; } .it-bullets li:before { content: "◆"; position: absolute; left: 0; color: #B8884E; }`}</style>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 uppercase" style={{ fontSize: "10.5pt", fontWeight: 700, letterSpacing: "0.22em", color: "#1A363A", paddingBottom: 5, borderBottom: "2px solid #2C6C70" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
