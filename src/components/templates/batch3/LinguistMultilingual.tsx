// LinguistMultilingual — Translator / Interpreter / Linguist / Localization
// White + lavender + rose gold. Multi-script header motif. Languages as HERO.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function LinguistMultilingual({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative print:shadow-none overflow-hidden"
      style={{ color: "#2D2640", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* MULTI-SCRIPT TOP BAND — decorative typography from scripts */}
      <div className="relative" style={{ padding: "30px 56px 0", background: "linear-gradient(135deg, #F5F1FA 0%, #FBF7F2 100%)" }}>
        <div className="flex items-center justify-between gap-3 mb-4" aria-hidden style={{ fontSize: "14pt", color: "#9F86C9", letterSpacing: "0.08em", opacity: 0.75 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Hello</span>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}>Bonjour</span>
          <span style={{ fontFamily: '"Amiri", serif' }}>مرحبا</span>
          <span style={{ fontFamily: "serif" }}>你好</span>
          <span style={{ fontFamily: '"Cormorant Garamond", serif' }}>Hola</span>
          <span style={{ fontFamily: '"Amiri", serif' }}>नमस्ते</span>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}>Olá</span>
          <span style={{ fontFamily: "serif" }}>Здравствуйте</span>
        </div>

        {/* Geometric globe top-right */}
        <svg viewBox="0 0 100 100" style={{ position: "absolute", top: 14, right: 36, width: 70, height: 70, opacity: 0.85 }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#9F86C9" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="20" ry="38" fill="none" stroke="#9F86C9" strokeWidth="1" />
          <ellipse cx="50" cy="50" rx="38" ry="20" fill="none" stroke="#9F86C9" strokeWidth="1" />
          <line x1="50" y1="12" x2="50" y2="88" stroke="#C9956B" strokeWidth="1" opacity="0.6" />
          <line x1="12" y1="50" x2="88" y2="50" stroke="#C9956B" strokeWidth="1" opacity="0.6" />
          <circle cx="50" cy="50" r="3" fill="#C9956B" />
        </svg>

        <header style={{ paddingBottom: 28 }}>
          <p className="m-0 mb-1.5 uppercase" style={{ fontSize: "9pt", letterSpacing: "0.28em", color: "#C9956B", fontWeight: 700 }}>
            Linguist · Translator · Interpreter
          </p>
          <h1 className="m-0" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: "44pt", lineHeight: 1, letterSpacing: "-0.015em", color: "#2D2640" }}>
            {basics.name}
          </h1>
          <p className="m-0 mt-2 italic" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "15pt", color: "#7E66A8", fontWeight: 500 }}>
            {basics.role}
          </p>
          <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3.5 text-[9.5pt]" style={{ color: "#5C5273" }}>
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>· {basics.phone}</span>}
            {basics.location && <span>· {basics.location}</span>}
            {basics.linkedIn && <span>· {basics.linkedIn}</span>}
          </div>
        </header>
      </div>

      <div style={{ padding: "30px 56px 40px" }}>

        {/* HERO LANGUAGES SECTION — the headline */}
        {languages.length > 0 && (
          <section className="mb-7">
            <h2 className="m-0 mb-4" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "22pt", fontWeight: 500, color: "#2D2640", letterSpacing: "-0.01em" }}>
              <span style={{ color: "#C9956B" }}>◆ </span>{getLabel(data, "languages", "Languages")}
            </h2>
            <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${Math.min(languages.length, 4)}, 1fr)` }}>
              {languages.map((l, i) => (
                <div key={i} style={{ padding: "14px 14px", background: "#F5F1FA", borderTop: "3px solid #9F86C9", textAlign: "center" }}>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "16pt", fontWeight: 600, color: "#2D2640", lineHeight: 1.1 }}>
                    {l.language}
                  </div>
                  <div className="mt-1.5 uppercase text-[8.5pt]" style={{ letterSpacing: "0.16em", color: "#C9956B", fontWeight: 700 }}>
                    {l.level}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {basics.summary && (
          <Section title={getLabel(data, "summary", "Profile")}>
            <RichTextRender html={basics.summary} style={{ color: "#2D2640", fontSize: "11pt", lineHeight: 1.65, fontStyle: "italic" }} />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[12pt]" style={{ fontFamily: '"Cormorant Garamond", serif', color: "#2D2640" }}>{e.title}</p>
                    <p className="m-0 italic text-[10.5pt]" style={{ color: "#7E66A8", fontWeight: 500 }}>{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt]" style={{ color: "#C9956B", fontWeight: 600 }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <RichTextRender html={e.bullets} className="lm-bullets" style={{ marginTop: 5, fontSize: "10pt", color: "#3F3855" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title={getLabel(data, "skills", "Specializations")}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} style={{ padding: "3px 11px", fontSize: "9.5pt", color: "#2D2640", background: "#F5F1FA", border: "1px solid #C8B6E0", borderRadius: 9999, fontWeight: 600 }}>{s.name}</span>
                ))}
              </div>
            </Section>
          )}
          <div>
            {education.length > 0 && (
              <Section title={getLabel(data, "education", "Education")}>
                {education.map((e, i) => (
                  <div key={i} className="mb-1.5 last:mb-0">
                    <p className="m-0 font-semibold text-[10.5pt]" style={{ fontFamily: '"Cormorant Garamond", serif', color: "#2D2640" }}>{e.degree}</p>
                    <p className="m-0 italic text-[10pt]" style={{ color: "#7E66A8" }}>{e.institution}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#5C5273" }}>{dateRange(e.startDate, e.endDate)}</p>
                  </div>
                ))}
              </Section>
            )}
            {certifications.length > 0 && (
              <Section title={getLabel(data, "certifications", "Certifications")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#2D2640" }}>
                  {certifications.map((c, i) => (
                    <li key={i} className="relative mb-1" style={{ paddingLeft: 14 }}>
                      <span className="absolute" style={{ left: 0, color: "#C9956B" }}>◆</span>
                      <b className="font-semibold">{c.name}</b>
                      {c.issuer && <span style={{ color: "#7E66A8" }}> · {c.issuer}</span>}
                      {c.date && <span style={{ color: "#7E66A8" }}> · {c.date}</span>}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        </div>
      </div>

      <style>{`.lm-bullets ul { margin: 0; padding-left: 0; list-style: none; } .lm-bullets li { padding-left: 16px; position: relative; margin-bottom: 2px; } .lm-bullets li:before { content: "◆"; position: absolute; left: 0; color: #C9956B; font-size: 8pt; top: 4px; }`}</style>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 inline-block" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "16pt", fontWeight: 500, color: "#2D2640", paddingBottom: 4, borderBottom: "2px solid #9F86C9" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
