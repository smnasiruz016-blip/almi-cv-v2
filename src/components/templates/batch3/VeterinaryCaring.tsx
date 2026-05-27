// VeterinaryCaring — Veterinarian / Vet Tech / Animal Hospital Staff
// Cream + sage green + dusty rose. Wavy LEFT side bar with paw silhouettes.
"use client";

import React from "react";
import { TemplateProps, dateRange, RichTextRender, getLabel, initials } from "./types";

export default function VeterinaryCaring({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;

  return (
    <article className="w-[794px] min-h-[1123px] relative print:shadow-none overflow-hidden"
      style={{ background: "#FBF7EE", color: "#2B3D2E", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* WAVY LEFT SIDE BAR with paw silhouettes */}
      <svg viewBox="0 0 220 1123" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: 0, width: 200, height: "100%", pointerEvents: "none" }}>
        <defs>
          <linearGradient id="vc-side" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#A8C29A" /><stop offset="50%" stopColor="#86A875" /><stop offset="100%" stopColor="#9CB890" />
          </linearGradient>
        </defs>
        <path d="M 0 0 L 0 1123 L 140 1123 C 100 950 170 800 130 650 C 90 500 170 380 120 240 C 90 120 140 50 140 0 Z" fill="url(#vc-side)" />
        <path d="M 0 0 L 0 1123 L 100 1123 C 70 950 120 800 90 650 C 60 500 130 380 80 240 C 60 120 100 50 100 0 Z" fill="#D7B5B0" opacity="0.4" />
        {/* paw silhouettes scattered */}
        <Paw cx={60}  cy={140} s={1.0} />
        <Paw cx={100} cy={340} s={0.85} />
        <Paw cx={50}  cy={560} s={1.1} />
        <Paw cx={90}  cy={780} s={0.9} />
        <Paw cx={55}  cy={980} s={1.0} />
      </svg>

      {/* leaf accent top-right */}
      <svg viewBox="0 0 100 100" style={{ position: "absolute", right: 38, top: 40, width: 70, height: 70, opacity: 0.55 }}>
        <path d="M 20 80 C 20 40 50 10 80 20 C 78 60 50 88 20 80 Z" fill="#A8C29A" />
        <path d="M 30 70 C 50 50 70 30 78 22" stroke="#86A875" strokeWidth="1.5" fill="none" />
      </svg>

      <div style={{ padding: "44px 56px 44px 240px", position: "relative", zIndex: 1 }}>
        <header className="mb-6">
          <p className="m-0 mb-1.5 uppercase" style={{ fontSize: "9pt", letterSpacing: "0.28em", color: "#7A4F58", fontWeight: 700 }}>
            Veterinary Professional
          </p>
          <h1 className="m-0" style={{ fontFamily: '"Fraunces", "Lora", serif', fontWeight: 500, fontSize: "38pt", lineHeight: 1, letterSpacing: "-0.02em", color: "#2B3D2E" }}>
            {basics.name}
          </h1>
          <p className="m-0 mt-2 italic" style={{ fontFamily: '"Fraunces", serif', fontSize: "15pt", color: "#5C7849", fontWeight: 500 }}>
            {basics.role}
          </p>
          <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3.5 text-[9.5pt]" style={{ color: "#4F5C50" }}>
            {basics.email && <span>✉ {basics.email}</span>}
            {basics.phone && <span>☎ {basics.phone}</span>}
            {basics.location && <span>⌖ {basics.location}</span>}
            {basics.linkedIn && <span>in/{basics.linkedIn}</span>}
          </div>
        </header>

        {basics.summary && (
          <Section title={getLabel(data, "summary", "Profile")}>
            <RichTextRender html={basics.summary} style={{ color: "#2B3D2E", fontSize: "11pt", fontStyle: "italic" }} />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience", "Clinical Experience")}>
            {experience.map((e, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[12pt]" style={{ fontFamily: '"Fraunces", serif', color: "#2B3D2E" }}>{e.title}</p>
                    <p className="m-0 italic text-[10.5pt]" style={{ color: "#5C7849", fontWeight: 500 }}>{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt]" style={{ color: "#7A4F58", background: "#F0E3DF", padding: "3px 11px", borderRadius: 9999, fontWeight: 600 }}>
                    {dateRange(e.startDate, e.endDate, e.current)}
                  </span>
                </div>
                <RichTextRender html={e.bullets} className="vc-bullets" style={{ marginTop: 5, fontSize: "10pt", color: "#3F4F40" }} />
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education", "Education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-semibold text-[11pt]" style={{ fontFamily: '"Fraunces", serif', color: "#2B3D2E" }}>{e.degree}</p>
                  <p className="m-0 italic text-[10pt]" style={{ color: "#5C7849" }}>{e.institution}</p>
                  <p className="m-0 text-[9pt]" style={{ color: "#4F5C50" }}>{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
                </div>
              ))}
            </Section>
          )}
          {certifications.length > 0 && (
            <Section title={getLabel(data, "certifications", "Credentials")}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#2B3D2E" }}>
                {certifications.map((c, i) => (
                  <li key={i} className="relative mb-1" style={{ paddingLeft: 18 }}>
                    <span className="absolute" style={{ left: 0, color: "#86A875" }}>❀</span>
                    <b className="font-semibold">{c.name}</b>
                    {c.issuer && <span style={{ color: "#5C7849" }}> · {c.issuer}</span>}
                    {c.date && <span style={{ color: "#5C7849" }}> · {c.date}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title={getLabel(data, "skills", "Clinical Skills")}>
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 14).map((s, i) => (
                  <span key={i} className="font-medium" style={{ padding: "4px 11px", fontSize: "9.5pt", color: "#2B3D2E", background: i % 2 ? "#E8EFE0" : "#F0E3DF", borderRadius: 9999 }}>{s.name}</span>
                ))}
              </div>
            </Section>
          )}
          {languages.length > 0 && (
            <Section title={getLabel(data, "languages", "Languages")}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#2B3D2E" }}>
                {languages.map((l, i) => (<li key={i}><b className="font-semibold">{l.language}</b><span style={{ color: "#4F5C50" }}> — {l.level}</span></li>))}
              </ul>
            </Section>
          )}
        </div>
      </div>

      <style>{`.vc-bullets ul { margin: 0; padding-left: 0; list-style: none; } .vc-bullets li { padding-left: 18px; position: relative; margin-bottom: 2px; } .vc-bullets li:before { content: "❀"; position: absolute; left: 0; color: #86A875; }`}</style>
    </article>
  );
}

function Paw({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`} fill="#FBF7EE" opacity="0.45">
      <ellipse cx="0" cy="6" rx="9" ry="7" />
      <ellipse cx="-9" cy="-6" rx="3.5" ry="4.5" /><ellipse cx="-3" cy="-10" rx="3.5" ry="4.5" />
      <ellipse cx="3" cy="-10" rx="3.5" ry="4.5" /><ellipse cx="9" cy="-6" rx="3.5" ry="4.5" />
    </g>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 inline-block" style={{ fontFamily: '"Fraunces", serif', fontSize: "16pt", fontWeight: 500, color: "#2B3D2E", paddingBottom: 4, borderBottom: "2px dotted #86A875" }}>
        <span style={{ color: "#86A875", marginRight: 8 }}>❀</span>{title}
      </h2>
      {children}
    </section>
  );
}
