// StructuralCivilEngineer — Civil / structural engineers
// Steel-grey sidebar with amber hazard rule, hex badge and technical bars. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const arch = '"Archivo","Inter",sans-serif';
const mono = '"JetBrains Mono","SFMono-Regular",monospace';
const Sec = ({ t }: { t: string }) => <h2 style={{ fontFamily: arch, fontWeight: 800, fontSize: "11pt", letterSpacing: ".1em", textTransform: "uppercase", color: "#2B3138", margin: "26px 0 12px", display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 18, height: 3, background: "#E8A23B" }} />{t}</h2>;

export default function StructuralCivilEngineer({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const sideH = (t: string) => <h2 style={{ font: `500 8.5pt/1 ${mono}`, letterSpacing: ".12em", textTransform: "uppercase", color: "#F0B45C", margin: "24px 0 11px", paddingBottom: 6, borderBottom: "1px solid rgba(232,162,59,.3)" }}>{t}</h2>;
  const barSkills = skills.slice(0, 4), chipSkills = skills.slice(4);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1F2329", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", display: "flex" }}>
      <aside style={{ width: 258, flexShrink: 0, background: "#2B3138", color: "#D5D9DE", padding: "46px 28px", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: "repeating-linear-gradient(180deg,#E8A23B 0 14px,#2B3138 14px 26px)" }} />
        <div style={{ width: 96, height: 96, margin: "0 auto 22px", background: "#353C44", border: "2px solid #E8A23B", display: "flex", alignItems: "center", justifyContent: "center", clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)", overflow: "hidden" }}>{basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: arch, fontWeight: 800, fontSize: "28pt", color: "#fff" }}>{initials(basics.fullName)}</span>}</div>
        {sideH("Contact")}
        <div style={{ font: `400 9pt/1.7 ${mono}`, color: "#AEB5BC", wordBreak: "break-word" }}>{[basics.email, basics.phone, basics.location, basics.website].filter(Boolean).map((c, i) => <div key={i} style={{ marginBottom: 6 }}>{c}</div>)}</div>
        {barSkills.length > 0 && <>{sideH("Skills")}{barSkills.map((s, i) => (<div key={i} style={{ marginBottom: 10 }}>
          <div style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#D5D9DE", marginBottom: 5 }}>{s}</div>
          <div style={{ height: 6, background: "rgba(255,255,255,.1)" }}><i style={{ display: "block", height: "100%", width: `${95 - i * 5}%`, background: "#E8A23B" }} /></div>
        </div>))}</>}
        {chipSkills.length > 0 && <>{sideH("Software")}<div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{chipSkills.map((s, i) => <span key={i} style={{ font: `500 8pt/1 ${mono}`, color: "#F3C886", border: "1px solid rgba(232,162,59,.4)", padding: "5px 8px" }}>{s}</span>)}</div></>}
        {languages.length > 0 && <>{sideH("Languages")}<div style={{ font: `400 9pt/1.7 ${mono}`, color: "#AEB5BC" }}>{languages.map((l, i) => <div key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}</div>)}</div></>}
      </aside>
      <div style={{ flex: 1, padding: "46px 40px" }}>
        <h1 style={{ fontFamily: arch, fontWeight: 800, fontSize: "29pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#2B3138" }}>{basics.fullName}</h1>
        <p style={{ fontFamily: mono, fontSize: "11pt", color: "#C77F1E", margin: "8px 0 0" }}>{basics.role}</p>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#4A525B", lineHeight: 1.6, margin: 0 }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1F2329", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#C77F1E" }}> · {e.company}</span>}</p>
            <span style={{ font: `500 8.5pt/1 ${mono}`, color: "#8A929B", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="sc-b" style={{ color: "#4A525B", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t={getLabel(data, "education")} />
        {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1F2329", margin: 0 }}>{e.degree}</p>
            <span style={{ font: `500 8.5pt/1 ${mono}`, color: "#8A929B", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
          </div>
          <p style={{ margin: "3px 0 0", color: "#4A525B" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
        </div>))}
        {certifications.length > 0 && <><Sec t={getLabel(data, "certifications", "Registration")} /><p style={{ margin: 0, color: "#4A525B", lineHeight: 1.7 }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
      </div>
      <style>{`.sc-b li{position:relative;padding-left:15px;margin-bottom:4px}.sc-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
