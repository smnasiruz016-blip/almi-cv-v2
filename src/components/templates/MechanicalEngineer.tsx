// MechanicalEngineer — Mechanical / design engineers
// Steel-blue sidebar with orange accents, mono labels and technical skill bars. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const mono = '"JetBrains Mono","SFMono-Regular",monospace';
const Sec = ({ t }: { t: string }) => <h2 style={{ fontWeight: 800, fontSize: "10pt", letterSpacing: ".14em", textTransform: "uppercase", color: "#243B4A", margin: "26px 0 12px", display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 18, height: 3, background: "#E8743B" }} />{t}</h2>;

export default function MechanicalEngineer({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const sideH = (t: string) => <h2 style={{ font: `500 8.5pt/1 ${mono}`, letterSpacing: ".14em", textTransform: "uppercase", color: "#E8743B", margin: "24px 0 12px", paddingBottom: 7, borderBottom: "1px solid rgba(232,116,59,.3)" }}>{t}</h2>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1E2933", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", display: "flex" }}>
      <aside style={{ width: 262, flexShrink: 0, background: "#243B4A", color: "#CFDAE2", padding: "44px 28px" }}>
        <div style={{ width: 100, height: 100, margin: "0 auto 22px", borderRadius: 12, background: "#2E4B5E", border: "2px solid #E8743B", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>{basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontWeight: 800, fontSize: "34pt", color: "#fff" }}>{initials(basics.fullName)}</span>}</div>
        {sideH("Contact")}
        <div style={{ font: `400 9pt/1.7 ${mono}`, color: "#AEBECA", wordBreak: "break-word" }}>{[basics.email, basics.phone, basics.location, basics.website].filter(Boolean).map((c, i) => <div key={i} style={{ marginBottom: 6 }}>{c}</div>)}</div>
        {skills.length > 0 && <>{sideH("Skills")}{skills.slice(0, 6).map((s, i) => (<div key={i} style={{ marginBottom: 10 }}>
          <div style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#DCE5EC", marginBottom: 5 }}>{s}</div>
          <div style={{ height: 6, borderRadius: 2, background: "rgba(255,255,255,.1)" }}><i style={{ display: "block", height: "100%", borderRadius: 2, width: `${95 - i * 5}%`, background: "#E8743B" }} /></div>
        </div>))}</>}
        {certifications.length > 0 && <>{sideH("Certifications")}<div style={{ font: `400 9pt/1.7 ${mono}`, color: "#AEBECA" }}>{certifications.map((c, i) => <div key={i} style={{ marginBottom: 6 }}><b style={{ color: "#fff", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}</div>)}</div></>}
        {languages.length > 0 && <>{sideH("Languages")}<div style={{ font: `400 9pt/1.7 ${mono}`, color: "#AEBECA" }}>{languages.map((l, i) => <div key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}</div>)}</div></>}
      </aside>
      <div style={{ flex: 1, padding: "44px 40px" }}>
        <h1 style={{ fontWeight: 800, fontSize: "30pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#243B4A" }}>{basics.fullName}</h1>
        <p style={{ fontFamily: mono, fontSize: "11pt", color: "#D55F28", margin: "8px 0 0", letterSpacing: ".04em" }}>{basics.role}</p>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#4A5A66", lineHeight: 1.6, margin: 0 }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1E2933", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#D55F28" }}> · {e.company}</span>}</p>
            <span style={{ font: `500 8.5pt/1 ${mono}`, color: "#8A98A2", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="me-b" style={{ color: "#4A5A66", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t={getLabel(data, "education")} />
        {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1E2933", margin: 0 }}>{e.degree}</p>
            <span style={{ font: `500 8.5pt/1 ${mono}`, color: "#8A98A2", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
          </div>
          <p style={{ margin: "3px 0 0", color: "#4A5A66" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
        </div>))}
      </div>
      <style>{`.me-b li{position:relative;padding-left:15px;margin-bottom:4px}.me-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
