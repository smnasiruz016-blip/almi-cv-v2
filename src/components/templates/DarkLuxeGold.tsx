// DarkLuxeGold — Consulting / executive / premium
// Near-black with a gold hairline frame and centred serif — quietly premium. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t }: { t: string }) => <h2 style={{ font: '600 9pt/1 "Inter",sans-serif', letterSpacing: ".24em", textTransform: "uppercase", color: "#C9A24B", margin: "30px 0 14px", textAlign: "center" }}>{t}</h2>;

export default function DarkLuxeGold({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#13110D", color: "#D8D0C2", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "absolute", inset: 22, border: "1px solid rgba(201,162,75,.35)", pointerEvents: "none" }} />
      <div style={{ position: "relative", padding: "58px 64px 52px" }}>
        <div style={{ textAlign: "center", paddingBottom: 26, borderBottom: "1px solid rgba(201,162,75,.3)" }}>
          <p style={{ font: '600 9pt/1 "Inter",sans-serif', letterSpacing: ".35em", textTransform: "uppercase", color: "#C9A24B", margin: "0 0 16px" }}>Curriculum Vitae</p>
          <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "40pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
          <p style={{ fontFamily: fr, fontStyle: "italic", fontWeight: 500, fontSize: "14pt", color: "#D8B567", margin: "10px 0 0" }}>{basics.role}</p>
          <p style={{ margin: "16px 0 0", font: '400 9pt/1 "Inter",sans-serif', color: "#8C8576" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? "   ·   " : ""}</span>)}</p>
        </div>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#C2BAA9", lineHeight: 1.65, textAlign: "center", margin: "0 auto 4px", maxWidth: "90%" }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#fff", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 400, color: "#D8B567", fontSize: "10.5pt" }}> · {e.company}</span>}</p>
            <span style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#8C8576", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="dl-b" style={{ color: "#B8B0A0", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t={getLabel(data, "education")} />
        <div style={{ display: "grid", gridTemplateColumns: education.length > 1 ? "1fr 1fr" : "1fr", gap: 38 }}>
          {education.map((e, i) => (<div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#fff", margin: 0 }}>{e.degree}</p>
              <span style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#8C8576", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
            </div>
            <p style={{ color: "#B8B0A0", margin: "2px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} /><p style={{ color: "#B8B0A0", textAlign: "center", lineHeight: 1.7, margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
        {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Expertise")} /><p style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", justifyContent: "center", margin: 0 }}>{skills.map((s, i) => <span key={i} style={{ font: '500 9.5pt/1 "Inter",sans-serif', color: "#D8D0C2" }}>{s}{i < skills.length - 1 ? "  ·" : ""}</span>)}</p></>}
        {languages.length > 0 && <><Sec t={getLabel(data, "languages")} /><p style={{ color: "#B8B0A0", textAlign: "center", lineHeight: 1.7, margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
      </div>
      <style>{`.dl-b li{position:relative;padding-left:15px;margin-bottom:4px}.dl-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
