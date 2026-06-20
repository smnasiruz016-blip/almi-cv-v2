// MemphisUXResearcher — UX researchers / product research
// Playful Memphis shapes in coral, yellow and teal with bright pastel cards. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t, s, pink }: { t: string; s?: React.CSSProperties; pink?: boolean }) => <h2 style={{ fontWeight: 800, fontSize: "10pt", letterSpacing: ".04em", color: "#2A2438", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 14, height: 14, borderRadius: 4, background: pink ? "#FF6F91" : "#FFC94D", transform: "rotate(12deg)" }} />{t}</h2>;

export default function MemphisUXResearcher({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const card = (bg: string, t: string, children: React.ReactNode) => <div style={{ borderRadius: 18, padding: "16px 18px", marginBottom: 14, background: bg }}><Sec t={t} pink s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '600 8.5pt/1 "Plus Jakarta Sans",sans-serif', color: "#2A2438", background: "rgba(255,255,255,.75)", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#FFFDF7", color: "#2A2438", fontFamily: '"Plus Jakarta Sans","Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "relative", padding: "48px 54px 30px", overflow: "hidden" }}>
        <span style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", background: "#FF6F91", top: 30, right: 60 }} />
        <span style={{ position: "absolute", width: 0, height: 0, borderLeft: "34px solid transparent", borderRight: "34px solid transparent", borderBottom: "58px solid #FFC94D", top: 48, right: 150, transform: "rotate(18deg)" }} />
        <span style={{ position: "absolute", width: 54, height: 54, background: "#36CFC9", top: 100, right: 110, borderRadius: 12, transform: "rotate(12deg)" }} />
        <span style={{ position: "absolute", width: 60, height: 60, border: "7px solid #7C5CFF", borderRadius: "50%", top: 16, right: 220 }} />
        <h1 style={{ fontWeight: 800, fontSize: "38pt", letterSpacing: "-.03em", lineHeight: 1, margin: 0, color: "#2A2438", position: "relative", zIndex: 2 }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 700, fontSize: "12pt", color: "#FF6F91", margin: "8px 0 0", position: "relative", zIndex: 2 }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '600 9pt/1 "Plus Jakarta Sans",sans-serif', color: "#6B6280", display: "flex", flexWrap: "wrap", gap: "6px 16px", position: "relative", zIndex: 2 }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ padding: "14px 54px 46px", display: "grid", gridTemplateColumns: "1fr 226px", gap: 32 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#564E6B", lineHeight: 1.6, margin: "0 0 22px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#2A2438", margin: 0 }}>{e.role}</p>
            <p style={{ fontWeight: 600, fontSize: "10pt", color: "#7C5CFF", margin: "2px 0 5px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="mx-b" style={{ color: "#564E6B", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#2A2438", margin: 0 }}>{e.degree}</p>
            <p style={{ fontWeight: 600, fontSize: "10pt", color: "#7C5CFF", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && card("#FFE9EE", getLabel(data, "skills", "Methods"), chips(skills))}
          {certifications.length > 0 && card("#E0F7F6", getLabel(data, "certifications"), <div style={{ font: '500 9.5pt/1.7 "Plus Jakarta Sans",sans-serif', color: "#564E6B" }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div>)}
          {languages.length > 0 && card("#FFF4D6", getLabel(data, "languages"), <div style={{ font: '500 9.5pt/1.7 "Plus Jakarta Sans",sans-serif', color: "#564E6B" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#2A2438", fontWeight: 700 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.mx-b li{position:relative;padding-left:15px;margin-bottom:4px}.mx-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
