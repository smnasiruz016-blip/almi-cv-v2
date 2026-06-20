// LinguistTranslator — Translators / interpreters / linguists
// Type-driven and multilingual with elegant dot-scale language proficiency. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

function levelDots(level?: string): number {
  const l = (level ?? "").toLowerCase();
  if (/native|c2|mother/.test(l)) return 5;
  if (/fluent|c1|advanced|proficient/.test(l)) return 4;
  if (/upper|b2/.test(l)) return 3;
  if (/intermediate|b1|conversational/.test(l)) return 2;
  return 1;
}

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".2em", textTransform: "uppercase", color: "#4F46C4", margin: "0 0 14px", ...s }}>{t}</h2>;

export default function LinguistTranslator({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1E2024", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ padding: "56px 60px 28px", borderBottom: "1px solid #E4E2DD" }}>
        <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "38pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#14131A" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", color: "#4F46C4", margin: "8px 0 0" }}>{basics.role}</p>
        {languages.length > 0 && <p style={{ fontFamily: fr, fontWeight: 500, fontSize: "13pt", color: "#9A97A4", margin: "14px 0 0" }}>{languages.map((l, i) => <span key={i}>{l.name}{i < languages.length - 1 ? "   ·   " : ""}</span>)}</p>}
        <div style={{ margin: "12px 0 0", font: '400 9.5pt/1 "Inter",sans-serif', color: "#6B6873", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ padding: "30px 60px 48px", display: "grid", gridTemplateColumns: "1fr 232px", gap: 38 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#44434C", lineHeight: 1.65, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#1E2024", margin: 0 }}>{e.role}{e.company && <span style={{ fontFamily: '"Inter",sans-serif', fontWeight: 500, fontSize: "10pt", color: "#4F46C4" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#9A97A4", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="li-b" style={{ color: "#44434C", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#1E2024", margin: 0 }}>{e.degree}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#9A97A4", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
            </div>
            <p style={{ color: "#44434C", margin: "2px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {languages.length > 0 && <><Sec t={getLabel(data, "languages")} />{languages.map((l, i) => { const on = levelDots(l.level); return (<div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}><span style={{ fontFamily: fr, fontWeight: 600, fontSize: "13pt", color: "#14131A" }}>{l.name}</span><span style={{ font: '600 8.5pt/1 "Inter",sans-serif', letterSpacing: ".08em", textTransform: "uppercase", color: "#4F46C4" }}>{l.level}</span></div>
            <div style={{ display: "flex", gap: 5 }}>{[0, 1, 2, 3, 4].map((d) => <i key={d} style={{ width: 9, height: 9, borderRadius: "50%", background: d < on ? "#4F46C4" : "#E0DEEA" }} />)}</div>
          </div>); })}</>}
          {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Expertise")} s={{ marginTop: 8 }} /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#3A33A0", background: "#EEEDFA", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div></>}
          {certifications.length > 0 && <><Sec t={getLabel(data, "certifications", "Accreditation")} s={{ marginTop: 18 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#44434C" }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></>}
        </div>
      </div>
      <style>{`.li-b li{position:relative;padding-left:15px;margin-bottom:4px}.li-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
