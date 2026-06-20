// SunnyHospitality — Hotels / hospitality / front office
// Warm amber sunrise header with photo and friendly rounded card sections. supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".18em", textTransform: "uppercase", color: "#E0682E", margin: "0 0 13px", ...s }}>{t}</h2>;

export default function SunnyHospitality({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const card = (t: string, children: React.ReactNode) => <div style={{ background: "#fff", border: "1px solid #FBE3C8", borderRadius: 16, padding: "16px 18px", marginBottom: 14, boxShadow: "0 4px 16px rgba(242,104,60,.08)" }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#C75A28", background: "#FFEFDD", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#FFF9EF", color: "#4A3320", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "linear-gradient(120deg,#FFB347 0%,#FF8C42 55%,#F2683C 100%)", color: "#fff", padding: "44px 54px", display: "flex", alignItems: "center", gap: 26, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -50, bottom: -70, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,.14)" }} />
        <div style={{ width: 108, height: 108, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(150deg,#FFD79A,#FF8C42)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 6px rgba(255,255,255,.4)", zIndex: 2, overflow: "hidden" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: fr, fontWeight: 500, fontSize: "38pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
        </div>
        <div style={{ zIndex: 2 }}>
          <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "34pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
          <p style={{ fontWeight: 600, fontSize: "12pt", color: "#FFEAD0", margin: "8px 0 10px" }}>{basics.role}</p>
          <div style={{ font: '500 9pt/1.6 "Inter",sans-serif', color: "#FFEAD0", display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        </div>
      </div>
      <div style={{ padding: "32px 54px 48px", display: "grid", gridTemplateColumns: "1fr 226px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#6B5037", lineHeight: 1.65, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#4A3320", margin: 0 }}>{e.role}</p>
            <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#E0682E", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="sh-b" style={{ color: "#6B5037", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#4A3320", margin: 0 }}>{e.degree}</p>
            <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#E0682E", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && card(getLabel(data, "skills", "Strengths"), chips(skills))}
          {certifications.length > 0 && card(getLabel(data, "certifications", "Systems"), chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name)))}
          {languages.length > 0 && card(getLabel(data, "languages"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#6B5037" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#4A3320", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.sh-b li{position:relative;padding-left:15px;margin-bottom:4px}.sh-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
