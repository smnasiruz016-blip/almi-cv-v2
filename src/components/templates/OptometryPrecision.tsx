// OptometryPrecision — Optometrists / eye care
// Deep navy with a concentric-lens motif and crisp teal accents. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 800, fontSize: "9.5pt", letterSpacing: ".16em", textTransform: "uppercase", color: "#0E2D3D", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 18, height: 3, background: "#1FA3A3", borderRadius: 3 }} />{t}</h2>;

export default function OptometryPrecision({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const panel = (t: string, children: React.ReactNode) => <div style={{ background: "#F1F8F8", border: "1px solid #D2E8E8", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#0C7A7A", background: "#DCF0F0", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#15232B", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#0E2D3D", color: "#DCEAF0", padding: "44px 54px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 44, top: "50%", transform: "translateY(-50%)", width: 96, height: 96, borderRadius: "50%", border: "2px solid rgba(58,196,196,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", border: "2px solid rgba(58,196,196,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 22, height: 22, borderRadius: "50%", background: "#3AC4C4" }} /></div>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "31pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", color: "#5FD4D4", margin: "8px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9pt/1 "Inter",sans-serif', color: "#8AA7B4", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ padding: "30px 54px 48px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3C4F58", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#15232B", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#1FA3A3" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#84969F", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="op-b" style={{ color: "#3C4F58", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#15232B", margin: 0 }}>{e.degree}</p>
            <p style={{ margin: "3px 0 0", color: "#3C4F58" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && panel(getLabel(data, "skills", "Clinical skills"), chips(skills))}
          {certifications.length > 0 && panel(getLabel(data, "certifications", "Credentials"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3C4F58" }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div>)}
          {languages.length > 0 && panel(getLabel(data, "languages"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3C4F58" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#15232B", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.op-b li{position:relative;padding-left:15px;margin-bottom:4px}.op-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
