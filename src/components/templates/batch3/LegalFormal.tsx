// LegalFormal — Lawyer / Attorney / Paralegal / Judge
// Cream base + deep navy + gold wavy top bar. Scales of justice watermark.
// Authority through typography, NOT dark backgrounds.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, stripHtml } from "./types";

export default function LegalFormal({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] relative print:shadow-none"
      style={{ background: "#FBF7EE", color: "#1A2444", fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif', fontSize: "11pt", lineHeight: 1.5 }}>

      {/* GOLD WAVY TOP BAR */}
      <svg viewBox="0 0 794 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
        <defs>
          <linearGradient id="lf-wave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#C9A24E" /><stop offset="50%" stopColor="#E8C870" /><stop offset="100%" stopColor="#C9A24E" />
          </linearGradient>
        </defs>
        <path d="M 0 0 L 794 0 L 794 32 C 660 56 530 18 397 38 C 264 58 134 22 0 42 Z" fill="url(#lf-wave)" />
        <path d="M 0 36 C 134 16 264 52 397 32 C 530 12 660 50 794 26 L 794 38 C 660 60 530 22 397 42 C 264 62 134 26 0 46 Z" fill="#1A2444" opacity="0.85" />
      </svg>

      {/* Scales of justice watermark */}
      <svg viewBox="0 0 200 200" style={{ position: "absolute", right: 32, top: 220, width: 180, height: 180, opacity: 0.06, pointerEvents: "none" }}>
        <g fill="none" stroke="#1A2444" strokeWidth="3">
          <line x1="100" y1="20" x2="100" y2="170" />
          <circle cx="100" cy="20" r="6" fill="#1A2444" />
          <line x1="40" y1="60" x2="160" y2="60" />
          <line x1="55" y1="60" x2="40" y2="100" /><line x1="55" y1="60" x2="70" y2="100" />
          <line x1="145" y1="60" x2="130" y2="100" /><line x1="145" y1="60" x2="160" y2="100" />
          <path d="M 30 100 L 80 100 L 65 120 L 45 120 Z" />
          <path d="M 120 100 L 170 100 L 155 120 L 135 120 Z" />
          <rect x="75" y="170" width="50" height="8" fill="#1A2444" />
        </g>
      </svg>

      <div style={{ padding: "32px 64px 48px", position: "relative", zIndex: 1 }}>
        <header className="text-center mb-7">
          <h1 className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: "36pt", lineHeight: 1.05, letterSpacing: "0.02em", color: "#1A2444" }}>
            {basics.name}
          </h1>
          <p className="m-0 mt-2 italic" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "15pt", color: "#8C6B2F", fontWeight: 500 }}>
            {basics.role}
          </p>
          <Ornament />
          <ul className="m-0 p-0 list-none flex flex-wrap justify-center gap-y-1 gap-x-5" style={{ fontFamily: "Inter, sans-serif", fontSize: "9.5pt", color: "#5A6275", letterSpacing: "0.04em" }}>
            {basics.email && <li>{basics.email}</li>}
            {basics.phone && <li>· {basics.phone}</li>}
            {basics.location && <li>· {basics.location}</li>}
            {basics.linkedIn && <li>· {basics.linkedIn}</li>}
          </ul>
        </header>

        {basics.summary && (
          <Section title={getLabel(data, "summary", "Statement of Practice")}>
            <RichTextRender html={basics.summary} style={{ fontSize: "11.5pt", color: "#2A324A", textAlign: "justify", lineHeight: 1.65 }} />
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title={getLabel(data, "certifications", "Bar Admissions & Certifications")}>
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {certifications.map((c, i) => (
                <div key={i} style={{ padding: "8px 12px", borderLeft: "2px solid #C9A24E", background: "#FFFFFF" }}>
                  <div className="font-semibold text-[10.5pt]" style={{ color: "#1A2444" }}>{c.name}</div>
                  {(c.issuer || c.date) && (
                    <div className="text-[9pt] italic" style={{ color: "#8C6B2F" }}>
                      {[c.issuer, c.date].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Professional Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <p className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "13pt", fontWeight: 600, color: "#1A2444" }}>
                    {e.title} <span className="italic" style={{ color: "#8C6B2F", fontWeight: 500 }}>— {e.company}</span>
                  </p>
                  <span className="whitespace-nowrap" style={{ fontFamily: "Inter, sans-serif", fontSize: "9pt", color: "#5A6275" }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                {e.location && <p className="m-0 text-[9.5pt] italic" style={{ color: "#5A6275" }}>{e.location}</p>}
                <RichTextRender html={e.bullets} className="legal-bullets" style={{ marginTop: 4, color: "#2A324A", fontSize: "10.5pt" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education", "Education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-semibold text-[11.5pt]" style={{ color: "#1A2444" }}>{e.degree}</p>
                  <p className="m-0 italic text-[10.5pt]" style={{ color: "#8C6B2F" }}>{e.institution}</p>
                  <p className="m-0 text-[9pt]" style={{ fontFamily: "Inter, sans-serif", color: "#5A6275" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}
          {(skills.length > 0 || languages.length > 0) && (
            <Section title={getLabel(data, "skills", "Practice Areas & Languages")}>
              {skills.length > 0 && (
                <p className="m-0 text-[10.5pt]" style={{ color: "#2A324A" }}>
                  {skills.map((s, i) => (
                    <React.Fragment key={i}>
                      <span>{s.name}</span>
                      {i < skills.length - 1 && <span style={{ color: "#C9A24E" }}>  ◆  </span>}
                    </React.Fragment>
                  ))}
                </p>
              )}
              {languages.length > 0 && (
                <p className="m-0 mt-2.5 text-[10.5pt]" style={{ color: "#2A324A" }}>
                  {languages.map((l, i) => (
                    <React.Fragment key={i}>
                      <b className="font-semibold" style={{ color: "#1A2444" }}>{l.language}</b>
                      <span className="italic" style={{ color: "#8C6B2F" }}> {l.level}</span>
                      {i < languages.length - 1 && <span style={{ color: "#C9A24E" }}>  ◆  </span>}
                    </React.Fragment>
                  ))}
                </p>
              )}
            </Section>
          )}
        </div>
      </div>

      <style>{`.legal-bullets ul { margin: 0; padding-left: 18px; } .legal-bullets li { margin-bottom: 2px; }`}</style>
    </article>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-3" style={{ color: "#C9A24E" }}>
      <span style={{ width: 60, height: 1, background: "currentColor", opacity: 0.6 }} />
      <span style={{ fontSize: "12pt" }}>⚖</span>
      <span style={{ width: 60, height: 1, background: "currentColor", opacity: 0.6 }} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 text-center" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: "15pt", color: "#1A2444", letterSpacing: "0.04em" }}>
        <span style={{ color: "#C9A24E" }}>— </span>{title}<span style={{ color: "#C9A24E" }}> —</span>
      </h2>
      {children}
    </section>
  );
}
