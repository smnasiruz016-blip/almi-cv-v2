// PeopleWarm — HR Manager / Recruiter / Talent Acquisition
// Cream + coral + sage + top wave divider. Connected nodes motif.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function PeopleWarm({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] relative print:shadow-none overflow-hidden"
      style={{ background: "#FFFBF5", color: "#3B2A45", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* CORAL WAVE TOP */}
      <svg viewBox="0 0 794 160" preserveAspectRatio="none" style={{ width: "100%", height: 160, display: "block" }}>
        <defs>
          <linearGradient id="pw-wave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#FFB5A8" /><stop offset="100%" stopColor="#FF7A6B" />
          </linearGradient>
          <linearGradient id="pw-wave2" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#A8D5BA" /><stop offset="100%" stopColor="#86C09D" />
          </linearGradient>
        </defs>
        <path d="M 0 0 L 794 0 L 794 90 C 660 130 530 60 397 100 C 264 140 134 70 0 110 Z" fill="url(#pw-wave)" />
        <path d="M 0 100 C 134 60 264 130 397 90 C 530 50 660 120 794 80 L 794 120 C 660 160 530 90 397 130 C 264 170 134 100 0 140 Z" fill="url(#pw-wave2)" opacity="0.75" />
      </svg>

      {/* Network nodes top-right */}
      <svg viewBox="0 0 120 80" style={{ position: "absolute", top: 18, right: 32, width: 110, height: 70, opacity: 0.85 }}>
        <g stroke="#FFFFFF" strokeWidth="1" fill="#FFFFFF" opacity="0.9">
          <line x1="20" y1="20" x2="60" y2="40" /><line x1="60" y1="40" x2="100" y2="20" />
          <line x1="20" y1="20" x2="40" y2="60" /><line x1="60" y1="40" x2="40" y2="60" />
          <line x1="60" y1="40" x2="80" y2="60" /><line x1="100" y1="20" x2="80" y2="60" />
          <circle cx="20" cy="20" r="4" /><circle cx="60" cy="40" r="5" />
          <circle cx="100" cy="20" r="4" /><circle cx="40" cy="60" r="3.5" /><circle cx="80" cy="60" r="3.5" />
        </g>
      </svg>

      <div style={{ padding: "0 56px 44px", position: "relative", zIndex: 1, marginTop: -56 }}>
        {/* PHOTO + NAME */}
        <header className="flex items-end gap-5 mb-6">
          {basics.photo ? (
            <img src={basics.photo} alt="" className="rounded-full object-cover" style={{ width: 110, height: 110, border: "5px solid #FFFBF5", boxShadow: "0 6px 18px rgba(59,42,69,0.2)" }} />
          ) : (
            <div className="rounded-full flex items-center justify-center" style={{ width: 110, height: 110, background: "#FFFFFF", border: "5px solid #FFFBF5", boxShadow: "0 6px 18px rgba(59,42,69,0.2)", color: "#FF7A6B", fontFamily: '"Fraunces", serif', fontWeight: 500, fontSize: "40pt" }}>
              {initials(basics.name)}
            </div>
          )}
          <div className="pb-2 flex-1 min-w-0">
            <h1 className="m-0" style={{ fontFamily: '"Fraunces", serif', fontWeight: 500, fontSize: "36pt", lineHeight: 1, letterSpacing: "-0.02em", color: "#3B2A45" }}>
              {basics.name}
            </h1>
            <p className="m-0 mt-1.5 uppercase" style={{ fontSize: "11pt", color: "#D85A4D", fontWeight: 700, letterSpacing: "0.18em" }}>
              {basics.role}
            </p>
            <div className="flex flex-wrap gap-y-1 gap-x-4 mt-2.5 text-[9.5pt]" style={{ color: "#6B5B7A" }}>
              {basics.email && <span>✉ {basics.email}</span>}
              {basics.phone && <span>☎ {basics.phone}</span>}
              {basics.location && <span>⌖ {basics.location}</span>}
              {basics.linkedIn && <span>in/{basics.linkedIn}</span>}
            </div>
          </div>
        </header>

        {basics.summary && (
          <div className="bg-white mb-5" style={{ padding: "18px 22px", borderRadius: 16, border: "1px solid rgba(255,122,107,0.18)", boxShadow: "0 1px 2px rgba(59,42,69,0.04), 0 10px 24px rgba(255,122,107,0.10)" }}>
            <RichTextRender html={basics.summary} style={{ color: "#3B2A45", fontSize: "11pt", lineHeight: 1.6 }} />
          </div>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[12pt]" style={{ fontFamily: '"Fraunces", serif', color: "#3B2A45" }}>{e.title}</p>
                    <p className="m-0 italic text-[10.5pt]" style={{ color: "#D85A4D", fontWeight: 500 }}>{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt] font-medium" style={{ color: "#3B2A45", background: "#FFE8E0", padding: "3px 11px", borderRadius: 9999 }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <RichTextRender html={e.bullets} className="pw-bullets" style={{ marginTop: 5, fontSize: "10pt", color: "#5C4756" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title={getLabel(data, "skills", "People Skills")}>
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 14).map((s, i) => {
                  const c = ["#FFE8E0", "#E5F2EA", "#FFF1E5", "#F0E8F5", "#FFE8E0", "#E5F2EA"];
                  return (<span key={i} className="font-medium" style={{ padding: "4px 11px", fontSize: "9.5pt", color: "#3B2A45", background: c[i % c.length], borderRadius: 9999 }}>{s.name}</span>);
                })}
              </div>
            </Section>
          )}
          <div>
            {education.length > 0 && (
              <Section title={getLabel(data, "education", "Education")}>
                {education.map((e, i) => (
                  <div key={i} className="mb-2 last:mb-0">
                    <p className="m-0 font-semibold text-[11pt]" style={{ fontFamily: '"Fraunces", serif', color: "#3B2A45" }}>{e.degree}</p>
                    <p className="m-0 italic text-[10pt]" style={{ color: "#D85A4D" }}>{e.institution}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#6B5B7A" }}>{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
                  </div>
                ))}
              </Section>
            )}
            {certifications.length > 0 && (
              <Section title={getLabel(data, "certifications", "Certifications")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#3B2A45" }}>
                  {certifications.map((c, i) => (
                    <li key={i} className="mb-1"><b className="font-semibold">{c.name}</b>{c.issuer && <span style={{ color: "#6B5B7A" }}> · {c.issuer}</span>}{c.date && <span style={{ color: "#6B5B7A" }}> · {c.date}</span>}</li>
                  ))}
                </ul>
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages", "Languages")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#3B2A45" }}>
                  {languages.map((l, i) => (<li key={i}><b className="font-semibold">{l.language}</b><span style={{ color: "#6B5B7A" }}> — {l.level}</span></li>))}
                </ul>
              </Section>
            )}
          </div>
        </div>
      </div>

      <style>{`.pw-bullets ul { margin: 0; padding-left: 0; list-style: none; } .pw-bullets li { padding-left: 16px; position: relative; margin-bottom: 2px; } .pw-bullets li:before { content: "❋"; position: absolute; left: 0; color: #FF7A6B; }`}</style>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 inline-block" style={{ fontFamily: '"Fraunces", serif', fontSize: "16pt", fontWeight: 500, color: "#3B2A45", paddingBottom: 4, borderBottom: "2px solid #FF7A6B" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
