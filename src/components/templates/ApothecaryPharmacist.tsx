// ApothecaryPharmacist — Pharmacists / pharmacy
// Deep apothecary-green sidebar with a clinical, methodical two-column body. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t }: { t: string }) => <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".18em", textTransform: "uppercase", color: "#234E3A", margin: "26px 0 12px", display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 18, height: 3, background: "#3E8A5F", borderRadius: 3 }} />{t}</h2>;

export default function ApothecaryPharmacist({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const sideH = (t: string) => <h2 style={{ font: '700 8.5pt/1 "Inter",sans-serif', letterSpacing: ".16em", textTransform: "uppercase", color: "#9FD3B4", margin: "24px 0 12px" }}>{t}</h2>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#D7E6DC", border: "1px solid rgba(159,211,180,.4)", borderRadius: 99, padding: "5px 9px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1C2A22", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", display: "flex" }}>
      <aside style={{ width: 258, flexShrink: 0, background: "#234E3A", color: "#D7E6DC", padding: "46px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -30, bottom: -30, width: 120, height: 120, borderRadius: "60px 60px 60px 60px / 120px 120px 60px 60px", background: "rgba(168,213,186,.12)", transform: "rotate(45deg)" }} />
        <div style={{ width: 96, height: 96, borderRadius: "50%", margin: "0 auto 22px", background: "linear-gradient(150deg,#7FBF9A,#234E3A)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 5px rgba(255,255,255,.12)", overflow: "hidden" }}>{basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: fr, fontWeight: 500, fontSize: "34pt", color: "#fff" }}>{initials(basics.fullName)}</span>}</div>
        {sideH("Contact")}
        <div style={{ font: '400 9pt/1.7 "Inter",sans-serif', color: "#BCD3C5", wordBreak: "break-word" }}>{[basics.email, basics.phone, basics.location, basics.website].filter(Boolean).map((c, i) => <div key={i} style={{ marginBottom: 6 }}>{c}</div>)}</div>
        {skills.length > 0 && <>{sideH("Skills")}{chips(skills)}</>}
        {certifications.length > 0 && <>{sideH("Certifications")}{chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name))}</>}
        {languages.length > 0 && <>{sideH("Languages")}<div style={{ font: '400 9pt/1.7 "Inter",sans-serif', color: "#BCD3C5" }}>{languages.map((l, i) => <div key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}</div>)}</div></>}
      </aside>
      <div style={{ flex: 1, padding: "46px 40px" }}>
        <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "32pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#234E3A" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", color: "#3E8A5F", margin: "7px 0 0" }}>{basics.role}</p>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3E4F45", lineHeight: 1.6, margin: 0 }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
          <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12pt", color: "#1C2A22", margin: 0 }}>{e.role}</p>
          <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#3E8A5F", margin: "2px 0 5px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
          <BulletsRender bullets={e.bullets} className="ap-b" style={{ color: "#3E4F45", marginTop: 4, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t={getLabel(data, "education")} />
        {education.map((e, i) => (<div key={i} style={{ marginBottom: 10 }}>
          <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12pt", color: "#1C2A22", margin: 0 }}>{e.degree}</p>
          <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#3E8A5F", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
        </div>))}
      </div>
      <style>{`.ap-b li{position:relative;padding-left:15px;margin-bottom:4px}.ap-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
