// CharcoalTimeline — Project / programme managers
// Charcoal header with an amber vertical timeline tracing the career path. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 800, fontSize: "10pt", letterSpacing: ".16em", textTransform: "uppercase", color: "#20242B", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 10, ...s }}><span style={{ width: 22, height: 3, background: "#F2A93B", borderRadius: 3 }} />{t}</h2>;

export default function CharcoalTimeline({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#2B2F36", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#20242B", color: "#E6E9EE", padding: "44px 56px 38px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: "32pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
          <p style={{ fontWeight: 600, fontSize: "12pt", color: "#F2A93B", margin: "8px 0 0" }}>{basics.role}</p>
        </div>
        <div style={{ textAlign: "right", font: '500 9pt/1.7 "Inter",sans-serif', color: "#A4ACB8" }}>{contact.map((c, i) => <React.Fragment key={i}>{i === 0 ? <b style={{ color: "#fff", display: "block" }}>{c}</b> : <>{c}<br /></>}</React.Fragment>)}</div>
      </div>
      <div style={{ padding: "36px 56px 48px" }}>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#545B66", lineHeight: 1.6, margin: "0 0 28px" }} /></>}
        <Sec t={getLabel(data, "experience")} />
        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: "#E4E7EC" }} />
          {experience.map((e, i) => (<div key={i} style={{ position: "relative", marginBottom: 20 }}>
            <div style={{ position: "absolute", left: -28, top: 4, width: 14, height: 14, borderRadius: "50%", background: "#fff", border: "3px solid #F2A93B" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#20242B", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#C0791A", fontSize: "10pt" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#8A929E", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="ct-b" style={{ color: "#545B66", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32, marginTop: 6 }}>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills")} /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: '600 9pt/1 "Inter",sans-serif', color: "#20242B", background: "#F3F4F6", border: "1px solid #E4E7EC", borderRadius: 6, padding: "6px 11px" }}>{s}</span>)}</div></>}
            {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} s={{ marginTop: 20 }} /><p style={{ color: "#545B66", lineHeight: 1.7, margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
          <div>
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => <p key={i} style={{ color: "#545B66", lineHeight: 1.7, margin: "0 0 8px" }}><b style={{ color: "#2B2F36", fontWeight: 600 }}>{e.degree}</b><br />{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>)}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 20 }} /><p style={{ color: "#545B66", lineHeight: 1.7, margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#2B2F36", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
        </div>
      </div>
      <style>{`.ct-b li{position:relative;padding-left:15px;margin-bottom:4px}.ct-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
