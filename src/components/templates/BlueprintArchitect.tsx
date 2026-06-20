// BlueprintArchitect — Architects / design professionals
// Navy blueprint grid header with mono numbering and a technical two-column body. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const mono = '"JetBrains Mono","SFMono-Regular",monospace';
const Sec = ({ t, s, num }: { t: string; s?: React.CSSProperties; num?: string }) => <h2 style={{ fontFamily: mono, fontWeight: 500, fontSize: "9.5pt", letterSpacing: ".12em", textTransform: "uppercase", color: "#0F2742", margin: "0 0 14px", paddingBottom: 7, borderBottom: "1px solid #C9D6E4", display: "flex", justifyContent: "space-between", ...s }}>{t}{num && <span style={{ color: "#6FB1E0" }}>{num}</span>}</h2>;

export default function BlueprintArchitect({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#16263A", fontFamily: '"Archivo","Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "relative", background: "#0F2742", color: "#DCE6F2", padding: "46px 54px 40px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(120,170,220,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(120,170,220,.16) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontWeight: 700, fontSize: "32pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
          <p style={{ fontFamily: mono, fontSize: "11pt", letterSpacing: ".1em", color: "#6FB1E0", margin: "10px 0 0" }}>{basics.role}</p>
          <div style={{ margin: "16px 0 0", font: `400 8.5pt/1 ${mono}`, color: "#9FB6CE", display: "flex", flexWrap: "wrap", gap: "5px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        </div>
      </div>
      <div style={{ padding: "32px 54px 48px" }}>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} num="01" /><RichTextRender html={basics.summary} style={{ color: "#3C5066", lineHeight: 1.6, margin: "0 0 26px" }} /></>}
        <Sec t={getLabel(data, "experience")} num="02" />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#16263A", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#2E78B5" }}> · {e.company}</span>}</p>
            <span style={{ font: `400 8.5pt/1 ${mono}`, color: "#8597A9", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="ba-b" style={{ color: "#3C5066", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
        </div>))}
        <Sec t={`${getLabel(data, "education")} & registration`} num="03" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#16263A", margin: 0 }}>{e.degree}</p>
              <p style={{ font: `400 8.5pt/1 ${mono}`, color: "#8597A9", margin: "3px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
            {certifications.length > 0 && <p style={{ color: "#3C5066", lineHeight: 1.7, margin: "4px 0 0" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#16263A", fontWeight: 600 }}>{c.name}</b>{c.issuer ? ` ${c.issuer}` : ""}{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p>}
          </div>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Software")} s={{ marginBottom: 11 }} num="04" /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: `500 8.5pt/1 ${mono}`, color: "#0F2742", border: "1px solid #C9D6E4", borderRadius: 3, padding: "6px 10px" }}>{s}</span>)}</div></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ margin: "18px 0 11px" }} num="05" /><p style={{ color: "#3C5066", margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#16263A", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
        </div>
      </div>
      <style>{`.ba-b li{position:relative;padding-left:15px;margin-bottom:4px}.ba-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
