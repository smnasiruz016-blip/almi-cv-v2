// InteriorAtelier — Interior designers / spatial design
// Warm taupe and terracotta with a photo and a material-palette swatch row. supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: fr, fontWeight: 600, fontSize: "13pt", color: "#4A3B2C", margin: "0 0 13px", ...s }}>{t}</h2>;

export default function InteriorAtelier({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#8A5E34", background: "#ECE0CE", borderRadius: 2, padding: "6px 11px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#F6F0E7", color: "#34291F", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28, padding: "52px 58px 30px" }}>
        <div style={{ width: 116, height: 116, borderRadius: 4, flexShrink: 0, background: "linear-gradient(150deg,#C9A98A,#9C7B5C)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 22px rgba(156,123,92,.35)", overflow: "hidden" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: fr, fontWeight: 500, fontSize: "40pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
        </div>
        <div>
          <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "38pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#4A3B2C" }}>{basics.fullName}</h1>
          <p style={{ fontFamily: fr, fontStyle: "italic", fontWeight: 500, fontSize: "14pt", color: "#B07B4E", margin: "8px 0 0" }}>{basics.role}</p>
          <p style={{ margin: "12px 0 0", font: '400 9.5pt/1 "Inter",sans-serif', color: "#75634F", display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? "  ·" : ""}</span>)}</p>
        </div>
      </div>
      <hr style={{ border: 0, borderTop: "1px solid #DDCDB6", margin: "0 58px" }} />
      <div style={{ padding: "28px 58px 50px", display: "grid", gridTemplateColumns: "1fr 220px", gap: 36 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#5A4A39", lineHeight: 1.65, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <p style={{ fontWeight: 600, fontSize: "11.5pt", color: "#34291F", margin: 0 }}>{e.role}</p>
            {e.company && <p style={{ fontStyle: "italic", color: "#B07B4E", fontSize: "10.5pt", margin: "1px 0 0" }}>{e.company}</p>}
            <p style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#9C8A73", margin: "2px 0 5px" }}>{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="ia-b" style={{ color: "#5A4A39", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} s={{ marginTop: 24 }} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 600, fontSize: "11.5pt", color: "#34291F", margin: 0 }}>{e.degree}</p>
            <p style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#9C8A73", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          <Sec t="Palette" />
          <div style={{ display: "flex", gap: 6, marginTop: 4, marginBottom: 8 }}>{["#B07B4E", "#C9A98A", "#7D8B6A", "#34291F", "#F6F0E7"].map((c, i) => <i key={i} style={{ width: 26, height: 26, borderRadius: "50%", background: c, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)" }} />)}</div>
          {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Expertise")} s={{ marginTop: 24 }} />{chips(skills)}</>}
          {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} s={{ marginTop: 24 }} /><div style={{ font: '400 9.5pt/1.8 "Inter",sans-serif', color: "#5A4A39" }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></>}
          {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 24 }} /><div style={{ font: '400 9.5pt/1.8 "Inter",sans-serif', color: "#5A4A39" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#34291F", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></>}
        </div>
      </div>
      <style>{`.ia-b li{position:relative;padding-left:15px;margin-bottom:4px}.ia-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
