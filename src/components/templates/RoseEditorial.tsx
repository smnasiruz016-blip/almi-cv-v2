// RoseEditorial — Marketing managers / brand
// Elegant blush palette, DM Serif Display and a centred editorial masthead. atsSafe:false, supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const ds = '"DM Serif Display",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: ds, fontSize: "14pt", color: "#6E2A3C", margin: "0 0 12px", ...s }}>{t}</h2>;

export default function RoseEditorial({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#FDF6F4", color: "#3D2630", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ padding: "56px 60px 50px", position: "relative" }}>
        <div style={{ textAlign: "center", borderBottom: "1px solid #E8C9C4", paddingBottom: 28, marginBottom: 30 }}>
          <div style={{ width: 92, height: 92, borderRadius: "50%", margin: "0 auto 16px", background: "linear-gradient(150deg,#E9A6A0,#C9707A)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 5px #fff, 0 6px 18px rgba(201,112,122,.35)", overflow: "hidden" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: ds, fontSize: "32pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
          </div>
          <h1 style={{ fontFamily: ds, fontSize: "38pt", lineHeight: 1, letterSpacing: ".01em", margin: 0, color: "#6E2A3C" }}>{basics.fullName}</h1>
          <p style={{ fontFamily: ds, fontStyle: "italic", fontSize: "14pt", color: "#C9707A", margin: "8px 0 0" }}>{basics.role}</p>
          <p style={{ margin: "14px 0 0", font: '400 9.5pt/1 "Inter",sans-serif', color: "#8A6770" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? "  ·  " : ""}</span>)}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 218px", gap: 38 }}>
          <div>
            {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#5C4049", lineHeight: 1.65, margin: "0 0 24px", textAlign: "justify" }} /></>}
            <Sec t={getLabel(data, "experience")} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 16 }}>
              <p style={{ fontWeight: 600, fontSize: "11.5pt", color: "#3D2630", margin: 0 }}>{e.role}</p>
              {e.company && <p style={{ fontStyle: "italic", fontSize: "10.5pt", color: "#C9707A", margin: "1px 0 0" }}>{e.company}</p>}
              <p style={{ font: '400 9pt/1 "Inter",sans-serif', color: "#A98D95", margin: "2px 0 6px" }}>{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="re-b" style={{ color: "#5C4049", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
            </div>))}
            <Sec t={getLabel(data, "education")} s={{ marginTop: 26 }} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 10 }}>
              <p style={{ fontWeight: 600, fontSize: "11.5pt", color: "#3D2630", margin: 0 }}>{e.degree}</p>
              <p style={{ font: '400 9pt/1 "Inter",sans-serif', color: "#A98D95", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
          </div>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Expertise")} /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#6E2A3C", background: "#F6E1DD", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div></>}
            {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} s={{ marginTop: 26 }} /><div style={{ font: '400 9.5pt/1.8 "Inter",sans-serif', color: "#5C4049" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#3D2630", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 26 }} /><div style={{ font: '400 9.5pt/1.8 "Inter",sans-serif', color: "#5C4049" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#3D2630", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></>}
          </div>
        </div>
      </div>
      <style>{`.re-b li{position:relative;padding-left:15px;margin-bottom:4px}.re-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
