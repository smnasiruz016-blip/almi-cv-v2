// HospitalityElegant — Hotel Manager / Hospitality Director / Resort Manager
// Champagne base + burgundy + gold. Top wave divider, elegant flourish accents.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function HospitalityElegant({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] relative print:shadow-none overflow-hidden"
      style={{ background: "#FAF3E2", color: "#3A1D24", fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif', fontSize: "11pt", lineHeight: 1.55 }}>

      {/* BURGUNDY WAVE TOP */}
      <svg viewBox="0 0 794 140" preserveAspectRatio="none" style={{ width: "100%", height: 140, display: "block" }}>
        <defs>
          <linearGradient id="he-wave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#6B1E2C" /><stop offset="50%" stopColor="#8A2D3F" /><stop offset="100%" stopColor="#6B1E2C" />
          </linearGradient>
        </defs>
        <path d="M 0 0 L 794 0 L 794 76 C 660 110 530 50 397 86 C 264 122 134 60 0 96 Z" fill="url(#he-wave)" />
        <path d="M 0 86 C 134 50 264 112 397 76 C 530 40 660 100 794 66 L 794 106 C 660 140 530 80 397 116 C 264 152 134 90 0 126 Z" fill="#D4A24C" opacity="0.85" />
        {/* center monogram circle */}
        <circle cx="397" cy="60" r="46" fill="#FAF3E2" stroke="#D4A24C" strokeWidth="2" />
        <text x="397" y="75" textAnchor="middle" fill="#6B1E2C" fontWeight="600" fontSize="32" fontFamily='"Cormorant Garamond", serif' letterSpacing="-0.02em">{initials(basics.name)}</text>
      </svg>

      <div style={{ padding: "10px 64px 44px", position: "relative", zIndex: 1 }}>
        <header className="text-center mb-6">
          <h1 className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: "40pt", lineHeight: 1.05, letterSpacing: "0.01em", color: "#3A1D24" }}>
            {basics.name}
          </h1>
          <Flourish />
          <p className="m-0 italic" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "15pt", color: "#8A6B2E", fontWeight: 500, letterSpacing: "0.04em" }}>
            {basics.role}
          </p>
          <ul className="m-0 mt-4 p-0 list-none flex flex-wrap justify-center gap-y-1 gap-x-5" style={{ fontFamily: "Inter, sans-serif", fontSize: "9.5pt", color: "#5C4044", letterSpacing: "0.04em" }}>
            {basics.email && <li>{basics.email}</li>}
            {basics.phone && <li>· {basics.phone}</li>}
            {basics.location && <li>· {basics.location}</li>}
            {basics.linkedIn && <li>· {basics.linkedIn}</li>}
          </ul>
        </header>

        {basics.summary && (
          <Section title={getLabel(data, "summary", "Hospitality Profile")}>
            <RichTextRender html={basics.summary} style={{ fontSize: "11.5pt", color: "#3A1D24", textAlign: "justify", lineHeight: 1.65, fontStyle: "italic" }} />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Properties & Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <p className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "13pt", fontWeight: 600, color: "#3A1D24" }}>
                    {e.title} <span className="italic" style={{ color: "#8A6B2E", fontWeight: 500 }}>— {e.company}</span>
                  </p>
                  <span className="whitespace-nowrap" style={{ fontFamily: "Inter, sans-serif", fontSize: "9pt", color: "#7A4A56", letterSpacing: "0.04em" }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                {e.location && <p className="m-0 text-[9.5pt] italic" style={{ color: "#7A4A56" }}>{e.location}</p>}
                <RichTextRender html={e.bullets} className="he-bullets" style={{ marginTop: 4, color: "#3A2D32", fontSize: "10.5pt" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education", "Education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "12pt", fontWeight: 600, color: "#3A1D24" }}>{e.degree}</p>
                  <p className="m-0 italic text-[10.5pt]" style={{ color: "#8A6B2E" }}>{e.institution}</p>
                  <p className="m-0 text-[9pt]" style={{ fontFamily: "Inter, sans-serif", color: "#7A4A56" }}>{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
                </div>
              ))}
            </Section>
          )}
          {(skills.length > 0 || certifications.length > 0) && (
            <Section title={getLabel(data, "expertise", "Expertise")}>
              {skills.length > 0 && (
                <p className="m-0 text-[10.5pt]" style={{ color: "#3A1D24" }}>
                  {skills.map((s, i) => (
                    <React.Fragment key={i}>
                      <span>{s.name}</span>
                      {i < skills.length - 1 && <span style={{ color: "#D4A24C" }}>  ❦  </span>}
                    </React.Fragment>
                  ))}
                </p>
              )}
              {certifications.length > 0 && (
                <ul className="m-0 mt-2.5 p-0 list-none text-[10pt]" style={{ color: "#3A1D24" }}>
                  {certifications.map((c, i) => (
                    <li key={i} className="relative" style={{ paddingLeft: 18 }}>
                      <span className="absolute" style={{ left: 0, color: "#D4A24C" }}>❦</span>
                      <b className="font-semibold">{c.name}</b>
                      {c.issuer && <span className="italic" style={{ color: "#8A6B2E" }}> · {c.issuer}</span>}
                      {c.date && <span className="italic" style={{ color: "#8A6B2E" }}>, {c.date}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          )}
        </div>

        {languages.length > 0 && (
          <Section title={getLabel(data, "languages", "Languages")}>
            <p className="m-0 text-[11pt]" style={{ color: "#3A2D32" }}>
              {languages.map((l, i) => (
                <React.Fragment key={i}>
                  <b className="font-semibold" style={{ color: "#3A1D24" }}>{l.language}</b>
                  <span className="italic" style={{ color: "#8A6B2E" }}> {l.level}</span>
                  {i < languages.length - 1 && <span style={{ color: "#D4A24C" }}>  ❦  </span>}
                </React.Fragment>
              ))}
            </p>
          </Section>
        )}
      </div>

      <style>{`.he-bullets ul { margin: 0; padding-left: 0; list-style: none; } .he-bullets li { padding-left: 18px; position: relative; margin-bottom: 2px; } .he-bullets li:before { content: "❦"; position: absolute; left: 0; color: #D4A24C; }`}</style>
    </article>
  );
}

function Flourish() {
  return (
    <div className="flex items-center justify-center gap-3 my-2" style={{ color: "#D4A24C" }}>
      <span style={{ width: 50, height: 1, background: "currentColor", opacity: 0.6 }} />
      <span style={{ fontSize: "14pt" }}>❦</span>
      <span style={{ width: 50, height: 1, background: "currentColor", opacity: 0.6 }} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 last:mb-0">
      <h2 className="m-0 mb-3 text-center" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: "16pt", color: "#3A1D24", letterSpacing: "0.04em" }}>
        <span style={{ color: "#D4A24C" }}>— </span>{title}<span style={{ color: "#D4A24C" }}> —</span>
      </h2>
      {children}
    </section>
  );
}
