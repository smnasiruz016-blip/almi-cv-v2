// OxbloodLitigation — Litigators / barristers / legal
// Formal oxblood sidebar with gold crest and serif body — chambers-ready. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ font: '600 9pt/1 "Inter",sans-serif', letterSpacing: ".22em", textTransform: "uppercase", color: "#5A1B28", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 12, ...s }}>{t}<span style={{ flex: 1, height: 1, background: "#E0CBD0" }} /></h2>;

export default function OxbloodLitigation({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const sideH = (t: string) => <h2 style={{ font: '600 8pt/1 "Inter",sans-serif', letterSpacing: ".18em", textTransform: "uppercase", color: "#D8A24C", margin: "22px 0 11px", paddingBottom: 6, borderBottom: "1px solid rgba(216,162,76,.3)" }}>{t}</h2>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#241419", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", display: "flex" }}>
      <aside style={{ width: 250, flexShrink: 0, background: "#5A1B28", color: "#E9D6DA", padding: "48px 28px" }}>
        <div style={{ width: 70, height: 70, margin: "0 auto 20px", border: "2px solid #C9A24B", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>{basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: fr, fontWeight: 600, fontSize: "26pt", color: "#C9A24B" }}>{(basics.fullName ?? "").trim().charAt(0).toUpperCase() || "•"}</span>}</div>
        <p style={{ fontFamily: fr, fontWeight: 500, fontSize: "21pt", lineHeight: 1.05, textAlign: "center", color: "#fff", margin: "0 0 4px" }}>{basics.fullName}</p>
        <p style={{ font: '500 8.5pt/1.4 "Inter",sans-serif', letterSpacing: ".16em", textTransform: "uppercase", textAlign: "center", color: "#D8A24C", marginBottom: 22 }}>{basics.role}</p>
        {sideH("Contact")}
        <div style={{ font: '400 9pt/1.7 "Inter",sans-serif', color: "#D6C0C5", wordBreak: "break-word" }}>{[basics.email, basics.phone, basics.location, basics.website].filter(Boolean).map((c, i) => <div key={i} style={{ marginBottom: 5 }}>{c}</div>)}</div>
        {skills.length > 0 && <>{sideH("Practice areas")}<div>{skills.map((s, i) => <span key={i} style={{ display: "block", font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#D6C0C5" }}>{s}</span>)}</div></>}
        {languages.length > 0 && <>{sideH("Languages")}<div style={{ font: '400 9pt/1.7 "Inter",sans-serif', color: "#D6C0C5" }}>{languages.map((l, i) => <div key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}</div>)}</div></>}
      </aside>
      <div style={{ flex: 1, padding: "50px 42px" }}>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#4A3A40", lineHeight: 1.65, margin: "0 0 8px", textAlign: "justify" }} /></>}
        <Sec t={getLabel(data, "experience")} s={{ marginTop: 26 }} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#241419", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 400, color: "#97485C", fontSize: "10.5pt" }}> · {e.company}</span>}</p>
            <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#8A727B", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="ox-b" style={{ color: "#4A3A40", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t={getLabel(data, "education")} s={{ marginTop: 26 }} />
        {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#241419", margin: 0 }}>{e.degree}</p>
            <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#8A727B", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
          </div>
          <p style={{ color: "#4A3A40", margin: "2px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
        </div>))}
        {certifications.length > 0 && <><Sec t={getLabel(data, "certifications", "Appointments")} s={{ marginTop: 26 }} /><p style={{ color: "#4A3A40", margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
      </div>
      <style>{`.ox-b li{position:relative;padding-left:15px;margin-bottom:4px}.ox-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
