// FinanceElite — Investment Banker / Financial Analyst / PE / Hedge Fund
// Cream + deep teal + rose gold + wavy RIGHT side accent. Premium asymmetric.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel } from "./types";

export default function FinanceElite({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] relative print:shadow-none overflow-hidden"
      style={{ background: "#FBF7EE", color: "#1F3B3A", fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif', fontSize: "11pt", lineHeight: 1.55 }}>

      {/* WAVY RIGHT SIDE ACCENT */}
      <svg viewBox="0 0 200 1123" preserveAspectRatio="none" style={{ position: "absolute", right: 0, top: 0, width: 180, height: "100%", pointerEvents: "none" }}>
        <defs>
          <linearGradient id="fe-side" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1F4D4C" /><stop offset="50%" stopColor="#0F2E2D" /><stop offset="100%" stopColor="#1F4D4C" />
          </linearGradient>
        </defs>
        <path d="M 200 0 L 200 1123 L 40 1123 C 80 950 30 800 70 650 C 110 500 30 380 80 240 C 120 120 70 50 40 0 Z" fill="url(#fe-side)" />
        <path d="M 200 0 L 200 1123 L 80 1123 C 100 950 60 800 90 650 C 130 500 60 380 100 240 C 130 120 80 50 80 0 Z" fill="#C9956B" opacity="0.35" />
      </svg>

      <div style={{ padding: "48px 220px 48px 56px", position: "relative", zIndex: 1 }}>
        <header className="mb-6">
          <p className="m-0 mb-2 uppercase" style={{ fontFamily: "Inter, sans-serif", fontSize: "9pt", letterSpacing: "0.28em", color: "#C9956B", fontWeight: 700 }}>
            Investment Professional
          </p>
          <h1 className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: "44pt", lineHeight: 0.98, letterSpacing: "-0.02em", color: "#1F3B3A" }}>
            {basics.name}
          </h1>
          <p className="m-0 mt-2 italic" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "16pt", color: "#1F4D4C", fontWeight: 500 }}>
            {basics.role}
          </p>
          <div className="flex flex-wrap gap-y-1 gap-x-4 mt-4 text-[9.5pt]" style={{ fontFamily: "Inter, sans-serif", color: "#4A5A5A" }}>
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>· {basics.phone}</span>}
            {basics.location && <span>· {basics.location}</span>}
            {basics.linkedIn && <span>· {basics.linkedIn}</span>}
          </div>
        </header>

        {basics.summary && (
          <Section title={getLabel(data, "summary", "Profile")}>
            <RichTextRender html={basics.summary} style={{ fontSize: "11.5pt", color: "#2A4544", lineHeight: 1.65, textAlign: "justify" }} />
          </Section>
        )}

        {/* SELECTED METRICS (skills with numeric flair) */}
        {skills.length > 0 && (
          <Section title={getLabel(data, "achievements", "Selected Achievements")}>
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              {skills.slice(0, 3).map((s, i) => (
                <div key={i} style={{ padding: "14px 14px", borderTop: "2px solid #C9956B", background: "#FFFFFF" }}>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "20pt", fontWeight: 600, color: "#1F3B3A", lineHeight: 1, letterSpacing: "-0.01em" }}>
                    {s.name}
                  </div>
                  {s.level && <div className="text-[8.5pt] uppercase mt-1" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.16em", color: "#1F4D4C", fontWeight: 600 }}>{s.level}</div>}
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
                  <p className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "13pt", fontWeight: 600, color: "#1F3B3A" }}>
                    {e.title} <span className="italic" style={{ color: "#C9956B", fontWeight: 500 }}>— {e.company}</span>
                  </p>
                  <span className="whitespace-nowrap" style={{ fontFamily: "Inter, sans-serif", fontSize: "9pt", color: "#4A5A5A" }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <RichTextRender html={e.bullets} className="fee-bullets" style={{ marginTop: 4, color: "#2A4544", fontSize: "10.5pt" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education", "Education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "12pt", fontWeight: 600, color: "#1F3B3A" }}>
                    {e.degree}
                  </p>
                  <p className="m-0 italic text-[11pt]" style={{ color: "#C9956B" }}>{e.institution}</p>
                  <p className="m-0 text-[9pt]" style={{ fontFamily: "Inter, sans-serif", color: "#4A5A5A" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}
          {(certifications.length > 0 || awards.length > 0) && (
            <Section title={getLabel(data, "credentials", "Credentials")}>
              <ul className="m-0 p-0 list-none text-[10.5pt]" style={{ color: "#1F3B3A" }}>
                {certifications.map((c, i) => (
                  <li key={`c${i}`} className="mb-1 relative" style={{ paddingLeft: 16 }}>
                    <span className="absolute" style={{ left: 0, color: "#C9956B" }}>◆</span>
                    <b className="font-semibold">{c.name}</b>
                    {(c.issuer || c.date) && <span className="italic" style={{ color: "#C9956B" }}> · {[c.issuer, c.date].filter(Boolean).join(", ")}</span>}
                  </li>
                ))}
                {awards.map((a, i) => (
                  <li key={`a${i}`} className="mb-1 relative" style={{ paddingLeft: 16 }}>
                    <span className="absolute" style={{ left: 0, color: "#C9956B" }}>★</span>
                    <b className="font-semibold">{a.title}</b>
                    {(a.issuer || a.date) && <span className="italic" style={{ color: "#C9956B" }}> · {[a.issuer, a.date].filter(Boolean).join(", ")}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {languages.length > 0 && (
          <Section title={getLabel(data, "languages", "Languages")}>
            <p className="m-0 text-[10.5pt]" style={{ color: "#2A4544" }}>
              {languages.map((l, i) => (
                <React.Fragment key={i}>
                  <b className="font-semibold" style={{ color: "#1F3B3A" }}>{l.language}</b>
                  <span className="italic" style={{ color: "#C9956B" }}> {l.level}</span>
                  {i < languages.length - 1 && <span style={{ color: "#C9956B" }}>  ◆  </span>}
                </React.Fragment>
              ))}
            </p>
          </Section>
        )}
      </div>

      <style>{`.fee-bullets ul { margin: 0; padding-left: 18px; } .fee-bullets li { margin-bottom: 2px; }`}</style>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 last:mb-0">
      <h2 className="m-0 mb-3" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: "16pt", color: "#1F3B3A", letterSpacing: "0.02em" }}>
        <span style={{ color: "#C9956B", marginRight: 10 }}>◆</span>{title}
      </h2>
      {children}
    </section>
  );
}
