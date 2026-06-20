// SwissClinicalDentist — Dentists / dental
// Strict Swiss grid in clean sky-blue with a left rule — precise and ATS-friendly.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 800, fontSize: "9pt", letterSpacing: ".14em", textTransform: "uppercase", color: "#0C2027", margin: "0 0 12px", ...s }}>{t}</h2>;

export default function SwissClinicalDentist({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#16242B", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", padding: "54px 56px 22px", borderBottom: "4px solid #0EA5C7" }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: "33pt", letterSpacing: "-.03em", lineHeight: .98, margin: 0, color: "#0C2027" }}>{basics.fullName}</h1>
          <p style={{ fontWeight: 600, fontSize: "12pt", color: "#0EA5C7", margin: "8px 0 0" }}>{basics.role}</p>
        </div>
        <div style={{ textAlign: "right", font: '400 9pt/1.7 "Inter",sans-serif', color: "#5A6B72" }}>{contact.map((c, i) => <React.Fragment key={i}>{i === 0 ? <b style={{ color: "#16242B" }}>{c}</b> : c}<br /></React.Fragment>)}</div>
      </div>
      <div style={{ padding: "28px 56px 48px", display: "grid", gridTemplateColumns: "168px 1fr", gap: "0 34px" }}>
        <div style={{ borderRight: "1px solid #E2E8EA", paddingRight: 30 }}>
          {skills.length > 0 && <div style={{ marginBottom: 22 }}><Sec t={getLabel(data, "skills", "Clinical skills")} /><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{skills.map((s, i) => <span key={i} style={{ font: '500 8.5pt/1 "Inter",sans-serif', color: "#0A7A92", background: "#E2F6FA", borderRadius: 4, padding: "5px 9px" }}>{s}</span>)}</div></div>}
          {certifications.length > 0 && <div style={{ marginBottom: 22 }}><Sec t={getLabel(data, "certifications", "Credentials")} /><p style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3D4D54", margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</p></div>}
          {languages.length > 0 && <div style={{ marginBottom: 22 }}><Sec t={getLabel(data, "languages")} /><p style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3D4D54", margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#16242B", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</p></div>}
        </div>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3D4D54", lineHeight: 1.6, margin: "0 0 22px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#16242B", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#0EA5C7" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#8696A0", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="sd-b" style={{ color: "#3D4D54", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#16242B", margin: 0 }}>{e.degree}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#8696A0", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
            </div>
            <p style={{ margin: "3px 0 0", color: "#3D4D54" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
      </div>
      <style>{`.sd-b li{position:relative;padding-left:15px;margin-bottom:4px}.sd-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
