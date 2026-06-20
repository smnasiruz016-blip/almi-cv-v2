// RetroModern — Brand / Art Direction / creative leads
// Bold retro blocks in burnt orange, gold and ink with chunky Archivo display. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const ar = '"Archivo","Inter",sans-serif';
const Sec = ({ t, s, dark }: { t: string; s?: React.CSSProperties; dark?: boolean }) => <h2 style={{ fontFamily: ar, fontWeight: 800, fontSize: "11pt", letterSpacing: ".04em", textTransform: "uppercase", color: dark ? "#F4B73E" : "#E8552E", margin: "0 0 14px", display: "inline-block", borderBottom: `3px solid ${dark ? "#F4B73E" : "#2A2118"}`, paddingBottom: 3, ...s }}>{t}</h2>;

export default function RetroModern({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const np = (basics.fullName ?? "").trim().split(/\s+/);
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const block = (t: string, children: React.ReactNode) => <div style={{ background: "#2A2118", color: "#FBF3E4", borderRadius: 4, padding: "18px 20px", marginBottom: 16 }}><Sec t={t} dark />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '700 8.5pt/1 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".04em", color: "#2A2118", background: "#F4B73E", borderRadius: 3, padding: "6px 10px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#FBF3E4", color: "#2A2118", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#E8552E", padding: "48px 54px 40px", position: "relative" }}>
        <div style={{ position: "absolute", right: 54, top: 44, width: 70, height: 70, borderRadius: "50%", background: "#F4B73E", boxShadow: "-22px 0 0 #2A2118" }} />
        <h1 style={{ fontFamily: ar, fontWeight: 900, fontSize: "42pt", lineHeight: .92, letterSpacing: "-.02em", textTransform: "uppercase", color: "#FBF3E4", margin: 0 }}>{np.slice(0, -1).join(" ") || basics.fullName}{np.length > 1 && <><br />{np[np.length - 1]}</>}</h1>
        <span style={{ fontFamily: ar, fontWeight: 700, fontSize: "12pt", letterSpacing: ".14em", textTransform: "uppercase", color: "#2A2118", background: "#F4B73E", display: "inline-block", padding: "5px 12px", margin: "16px 0 0" }}>{basics.role}</span>
        <div style={{ margin: "18px 0 0", font: '600 9.5pt/1 "Inter",sans-serif', color: "#FBF3E4", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ padding: "36px 54px 48px", display: "grid", gridTemplateColumns: "1fr 230px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#564A3A", lineHeight: 1.6, margin: "0 0 26px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: ar, fontWeight: 700, fontSize: "12pt", color: "#2A2118", margin: 0 }}>{e.role}</p>
            <p style={{ font: '600 10pt/1.4 "Inter",sans-serif', color: "#E8552E", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="rm-b" style={{ color: "#564A3A", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <div style={{ fontFamily: ar, fontWeight: 700, fontSize: "11pt", color: "#2A2118" }}>{e.degree}</div>
            <div style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#8A7B63" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</div>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && block(getLabel(data, "skills", "Toolkit"), chips(skills))}
          {certifications.length > 0 && block(getLabel(data, "certifications"), <div style={{ font: '500 9.5pt/1.7 "Inter",sans-serif', color: "#FBF3E4" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#F4B73E", fontWeight: 700 }}>{c.name}</b>{c.issuer ? ` — ${c.issuer}` : ""}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div>)}
          {languages.length > 0 && block(getLabel(data, "languages"), <div style={{ font: '500 9.5pt/1.7 "Inter",sans-serif', color: "#FBF3E4" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#F4B73E", fontWeight: 700 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.rm-b li{position:relative;padding-left:15px;margin-bottom:4px}.rm-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
