// GeometricAbstract — Graphic / visual designers
// Angular teal, yellow and coral shapes frame a crisp two-column layout. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const sg = '"Space Grotesk","Inter",sans-serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: sg, fontWeight: 700, fontSize: "10.5pt", letterSpacing: ".12em", textTransform: "uppercase", color: "#0F172A", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 10, height: 10, background: "#FACC15", transform: "rotate(45deg)" }} />{t}</h2>;

export default function GeometricAbstract({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1F2933", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 260, height: 260, background: "#14B8A6", clipPath: "polygon(100% 0,100% 100%,0 0)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 150, height: 150, background: "#FACC15", clipPath: "polygon(100% 0,100% 100%,0 0)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 200, height: 200, background: "#F97362", clipPath: "polygon(0 100%,100% 100%,0 0)", opacity: .9 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 110, height: 110, background: "#1F2933", clipPath: "polygon(0 100%,100% 100%,0 0)" }} />
      <div style={{ position: "relative", zIndex: 2, padding: "56px 56px 50px" }}>
        <h1 style={{ fontFamily: sg, fontWeight: 700, fontSize: "40pt", lineHeight: .98, letterSpacing: "-.03em", margin: 0, color: "#0F172A" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", color: "#14B8A6", margin: "8px 0 0", letterSpacing: ".02em" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 26px", font: '500 9.5pt/1 "Inter",sans-serif', color: "#64748B", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 226px", gap: 34 }}>
          <div>
            {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#475569", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
            <Sec t={getLabel(data, "experience")} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
              <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "12pt", color: "#0F172A", margin: 0 }}>{e.role}</p>
              <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#14B8A6", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ga-b" style={{ color: "#475569", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
            </div>))}
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
              <p style={{ fontFamily: sg, fontWeight: 600, fontSize: "12pt", color: "#0F172A", margin: 0 }}>{e.degree}</p>
              <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#14B8A6", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
          </div>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills")} />{skills.slice(0, 6).map((s, i) => (<div key={i} style={{ marginBottom: 11 }}>
              <div style={{ font: '600 9.5pt/1 "Inter",sans-serif', color: "#1F2933", marginBottom: 5 }}>{s}</div>
              <div style={{ height: 6, background: "#E2E8F0" }}><i style={{ display: "block", height: "100%", width: `${95 - i * 6}%`, background: "#14B8A6" }} /></div>
            </div>))}</>}
            {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} s={{ marginTop: 22 }} /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{certifications.map((c, i) => <span key={i} style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#0F766E", background: "#CCFBF1", padding: "6px 10px" }}>{c.year ? `${c.name} (${c.year})` : c.name}</span>)}</div></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 22 }} /><div style={{ font: '500 9.5pt/1.7 "Inter",sans-serif', color: "#475569" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#0F172A", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></>}
          </div>
        </div>
      </div>
      <style>{`.ga-b li{position:relative;padding-left:15px;margin-bottom:4px}.ga-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
