// CulinaryMenu — Chefs / culinary / kitchen leadership
// Dark menu-card styling with ember red, dotted leaders and a gold frame. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ font: '600 9pt/1 "Inter",sans-serif', letterSpacing: ".24em", textTransform: "uppercase", color: "#C14434", margin: "28px 0 16px", textAlign: "center", position: "relative", zIndex: 2, ...s }}>{t}</h2>;

export default function CulinaryMenu({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#181311", color: "#E7DED2", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "absolute", inset: 20, border: "1px solid rgba(193,68,52,.4)", pointerEvents: "none" }} />
      <div style={{ padding: "52px 60px 50px", position: "relative" }}>
        <div style={{ textAlign: "center", paddingBottom: 24, borderBottom: "1px solid rgba(193,68,52,.4)", position: "relative", zIndex: 2 }}>
          <p style={{ font: '600 9pt/1 "Inter",sans-serif', letterSpacing: ".35em", textTransform: "uppercase", color: "#C14434", margin: "0 0 14px" }}>Curriculum Vitae</p>
          <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "40pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
          <p style={{ fontFamily: fr, fontStyle: "italic", fontWeight: 500, fontSize: "14pt", color: "#E0A04A", margin: "8px 0 0" }}>{basics.role}</p>
          <p style={{ margin: "14px 0 0", font: '400 9pt/1 "Inter",sans-serif', color: "#998E7E" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? "   ·   " : ""}</span>)}</p>
        </div>
        {basics.summary && <><Sec t="— The Story —" /><RichTextRender html={basics.summary} style={{ color: "#C8BEAF", lineHeight: 1.65, textAlign: "center", maxWidth: "92%", margin: "0 auto", position: "relative", zIndex: 2 }} /></>}
        <Sec t={`— ${getLabel(data, "experience")} —`} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14, position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#fff", whiteSpace: "nowrap", margin: 0 }}>{e.role}</p>
            <div style={{ flex: 1, borderBottom: "1px dotted rgba(224,160,74,.5)", transform: "translateY(-3px)" }} />
            <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#E0A04A", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          {e.company && <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#B07A3A", margin: "2px 0 5px" }}>{e.company}</p>}
          <BulletsRender bullets={e.bullets} className="cm-b" style={{ color: "#C8BEAF", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t="— Craft & Training —" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 38, position: "relative", zIndex: 2 }}>
          <div>
            <Sec t={getLabel(data, "skills", "Specialities")} s={{ margin: "0 0 14px" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>{skills.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#E7DED2", border: "1px solid rgba(193,68,52,.5)", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>
          </div>
          <div>
            <Sec t="Training" s={{ margin: "0 0 14px" }} />
            <p style={{ color: "#C8BEAF", textAlign: "center", lineHeight: 1.7, margin: 0 }}>
              {education.map((e, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{e.degree}</b><br />{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}<br /></React.Fragment>)}
              {certifications.length > 0 && <>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</>}
              {languages.length > 0 && <><br />{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</>}
            </p>
          </div>
        </div>
      </div>
      <style>{`.cm-b li{position:relative;padding-left:15px;margin-bottom:4px}.cm-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
