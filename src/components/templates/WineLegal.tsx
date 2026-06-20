// WineLegal — Lawyers / counsel / legal
// Refined wine-and-serif classic with centred headings. Quietly authoritative, ATS-safe.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Rule = () => <div style={{ borderTop: "1.5px solid #5A1A2E", margin: "24px 0", position: "relative" }}><span style={{ position: "absolute", left: "50%", top: -4, transform: "translateX(-50%) rotate(45deg)", width: 7, height: 7, background: "#97485C" }} /></div>;
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 600, fontSize: "9.5pt", letterSpacing: ".24em", textTransform: "uppercase", color: "#5A1A2E", margin: "0 0 14px", textAlign: "center", ...s }}>{t}</h2>;

export default function WineLegal({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#2A1820", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", lineHeight: 1.55 }}>
      <div style={{ padding: "56px 66px 50px" }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "38pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#5A1A2E" }}>{basics.fullName}</h1>
          <p style={{ fontFamily: fr, fontStyle: "italic", fontWeight: 500, fontSize: "13.5pt", color: "#97485C", margin: "8px 0 0" }}>{basics.role}</p>
          <p style={{ margin: "14px 0 0", font: '400 9.5pt/1 "Inter",sans-serif', color: "#6B5560" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? "   ·   " : ""}</span>)}</p>
        </div>
        {basics.summary && <><Rule /><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#4A3A41", textAlign: "justify", margin: "0 0 8px" }} /></>}
        <Rule />
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#2A1820", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 400, color: "#97485C", fontSize: "10.5pt" }}> · {e.company}</span>}</p>
            <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#8A727B", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="wl-b" style={{ color: "#4A3A41", marginTop: 5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Rule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 34 }}>
          <div>
            <Sec t={getLabel(data, "education")} s={{ textAlign: "left" }} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#2A1820", margin: 0 }}>{e.degree}</p>
                <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#8A727B", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
              </div>
              <p style={{ color: "#4A3A41", margin: "2px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
          </div>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Expertise")} s={{ textAlign: "left" }} /><p style={{ display: "flex", flexWrap: "wrap", gap: "5px 14px", color: "#4A3A41", fontSize: "10pt", margin: 0 }}>{skills.map((s, i) => <span key={i}>{s}{i < skills.length - 1 ? " ·" : ""}</span>)}</p></>}
            {certifications.length > 0 && <><Sec t={getLabel(data, "certifications", "Admissions")} s={{ marginTop: 18, textAlign: "left" }} /><p style={{ color: "#4A3A41", margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#2A1820", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 18, textAlign: "left" }} /><p style={{ color: "#4A3A41", margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#2A1820", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
        </div>
      </div>
      <style>{`.wl-b li{position:relative;padding-left:15px;margin-bottom:4px}.wl-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
