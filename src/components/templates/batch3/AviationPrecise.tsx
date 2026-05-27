// AviationPrecise — Pilot / Flight Attendant / ATC / Aviation Mechanic
// Sky blue gradient + silver + white. Wings emblem + altitude-line dividers.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function AviationPrecise({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] relative print:shadow-none overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EAF3FB 0%, #FFFFFF 35%, #FFFFFF 100%)", color: "#0F2E4A", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.5 }}>

      {/* Top horizon strip with wings */}
      <header className="relative" style={{ padding: "44px 56px 28px" }}>
        <svg viewBox="0 0 220 60" style={{ width: 220, height: 56, marginBottom: 10 }}>
          <defs>
            <linearGradient id="ap-wing" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#C8D5E2" /><stop offset="50%" stopColor="#5A8AB0" /><stop offset="100%" stopColor="#C8D5E2" />
            </linearGradient>
          </defs>
          {/* Left wing */}
          <path d="M 10 30 C 30 22 60 22 95 28 L 95 32 C 60 38 30 38 10 30 Z" fill="url(#ap-wing)" />
          <path d="M 25 30 L 75 30" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" />
          <path d="M 35 30 L 80 30" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.5" />
          {/* Center star/badge */}
          <circle cx="110" cy="30" r="14" fill="#5A8AB0" stroke="#C8D5E2" strokeWidth="2" />
          <polygon points="110,18 113,28 124,28 115,34 118,44 110,38 102,44 105,34 96,28 107,28" fill="#FFFFFF" />
          {/* Right wing */}
          <path d="M 210 30 C 190 22 160 22 125 28 L 125 32 C 160 38 190 38 210 30 Z" fill="url(#ap-wing)" />
          <path d="M 145 30 L 195 30" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" />
          <path d="M 140 30 L 185 30" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.5" />
        </svg>

        <h1 className="m-0" style={{ fontWeight: 800, fontSize: "36pt", lineHeight: 1, letterSpacing: "-0.025em", color: "#0F2E4A" }}>
          {basics.name}
        </h1>
        <p className="m-0 mt-1.5 uppercase" style={{ fontSize: "12pt", color: "#5A8AB0", fontWeight: 700, letterSpacing: "0.22em" }}>
          {basics.role}
        </p>

        <AltitudeBar />

        <div className="grid gap-2.5" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr", marginTop: 4 }}>
          {basics.email && <ContactCell label="Email" value={basics.email} />}
          {basics.phone && <ContactCell label="Phone" value={basics.phone} />}
          {basics.location && <ContactCell label="Base" value={basics.location} />}
          {basics.linkedIn && <ContactCell label="In" value={basics.linkedIn} />}
        </div>
      </header>

      <div style={{ padding: "10px 56px 40px" }}>
        {basics.summary && (
          <Section title={getLabel(data, "summary", "Flight Profile")}>
            <RichTextRender html={basics.summary} style={{ color: "#0F2E4A", fontSize: "10.5pt" }} />
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title={getLabel(data, "certifications", "Certifications & Ratings")}>
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {certifications.map((c, i) => (
                <div key={i} className="flex items-center gap-3" style={{ padding: "10px 12px", background: "#F4F9FD", border: "1px solid #C8D5E2", borderLeft: "3px solid #5A8AB0" }}>
                  <span style={{ color: "#5A8AB0", fontSize: "16pt", fontWeight: 700, lineHeight: 1, flexShrink: 0, fontFamily: '"JetBrains Mono", monospace' }}>✈</span>
                  <div>
                    <div className="font-bold text-[10pt]" style={{ color: "#0F2E4A" }}>{c.name}</div>
                    {(c.issuer || c.date) && <div className="text-[9pt]" style={{ color: "#4A6B82", fontFamily: '"JetBrains Mono", monospace' }}>{[c.issuer, c.date].filter(Boolean).join(" · ")}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Flight Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[11.5pt]" style={{ color: "#0F2E4A" }}>{e.title}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#5A8AB0" }}>{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt]" style={{ color: "#0F2E4A", fontFamily: '"JetBrains Mono", monospace', background: "#C8D5E2", padding: "3px 10px" }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <RichTextRender html={e.bullets} className="ap-bullets" style={{ marginTop: 5, fontSize: "10pt", color: "#2A4D6A" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title={getLabel(data, "skills", "Aircraft & Skills")}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} style={{ padding: "3px 10px", fontSize: "9.5pt", fontWeight: 600, color: "#0F2E4A", background: "#FFFFFF", border: "1px solid #5A8AB0", borderRadius: 3, fontFamily: '"JetBrains Mono", monospace' }}>{s.name}</span>
                ))}
              </div>
            </Section>
          )}
          <div>
            {education.length > 0 && (
              <Section title={getLabel(data, "education", "Training")}>
                {education.map((e, i) => (
                  <div key={i} className="mb-1.5 last:mb-0">
                    <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#0F2E4A" }}>{e.degree}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#5A8AB0" }}>{e.institution}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#4A6B82", fontFamily: '"JetBrains Mono", monospace' }}>{dateRange(e.startDate, e.endDate)}</p>
                  </div>
                ))}
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages", "Languages")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#0F2E4A" }}>
                  {languages.map((l, i) => (<li key={i}><b className="font-bold">{l.language}</b><span style={{ color: "#4A6B82" }}> — {l.level}</span></li>))}
                </ul>
              </Section>
            )}
          </div>
        </div>
      </div>

      <style>{`.ap-bullets ul { margin: 0; padding-left: 0; list-style: none; } .ap-bullets li { padding-left: 18px; position: relative; margin-bottom: 2px; } .ap-bullets li:before { content: "›"; position: absolute; left: 0; color: #5A8AB0; font-weight: 800; }`}</style>
    </article>
  );
}

function ContactCell({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderTop: "1px solid #C8D5E2", paddingTop: 6 }}>
      <div className="uppercase" style={{ fontSize: "7.5pt", letterSpacing: "0.18em", color: "#5A8AB0", fontWeight: 700, fontFamily: '"JetBrains Mono", monospace' }}>{label}</div>
      <div className="text-[9.5pt] mt-px" style={{ color: "#0F2E4A", wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

function AltitudeBar() {
  return (
    <div className="flex items-center gap-2 my-3.5">
      <span style={{ flex: 1, height: 1, background: "#5A8AB0", opacity: 0.4 }} />
      <span style={{ flex: 1, height: 2, background: "#5A8AB0", opacity: 0.7 }} />
      <span style={{ flex: 1, height: 1, background: "#5A8AB0", opacity: 0.4 }} />
      <span style={{ flex: 1, height: 3, background: "#5A8AB0" }} />
      <span style={{ flex: 1, height: 1, background: "#5A8AB0", opacity: 0.4 }} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0 mt-5">
      <h2 className="m-0 mb-3 uppercase" style={{ fontSize: "10.5pt", fontWeight: 800, letterSpacing: "0.22em", color: "#0F2E4A", paddingBottom: 5, borderBottom: "2px solid #5A8AB0", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#5A8AB0" }}>◆</span>{title}
      </h2>
      {children}
    </section>
  );
}
