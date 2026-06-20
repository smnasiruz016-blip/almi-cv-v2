// OceanTealSales — Sales / Business Development
// Teal gradient header over a metrics stripe (from CV data) built to show numbers. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 800, fontSize: "10pt", letterSpacing: ".16em", textTransform: "uppercase", color: "#0E7490", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 10, ...s }}><span style={{ width: 20, height: 3, background: "#06B6D4", borderRadius: 3 }} />{t}</h2>;

export default function OceanTealSales({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const metrics = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, { n: education.length, l: "Education" }, certifications.length ? { n: certifications.length, l: "Certifications" } : { n: languages.length, l: "Languages" }].filter((m) => m.n > 0).slice(0, 4);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#15303A", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "linear-gradient(120deg,#0E7490 0%,#0891B2 55%,#06B6D4 100%)", color: "#E0F7FB", padding: "46px 56px 38px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: -60, width: 220, height: 220, borderRadius: "50%", border: "28px solid rgba(255,255,255,.1)" }} />
        <h1 style={{ fontWeight: 800, fontSize: "33pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", color: "#BAF0F8", margin: "8px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9pt/1 "Inter",sans-serif', color: "#D4F4F9", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      {metrics.length >= 2 && <div style={{ display: "grid", gridTemplateColumns: `repeat(${metrics.length},1fr)` }}>{metrics.map((m, i) => (
        <div key={i} style={{ background: "#0E7490", color: "#fff", padding: "16px 18px", textAlign: "center", borderRight: i < metrics.length - 1 ? "1px solid rgba(255,255,255,.14)" : "0" }}>
          <div style={{ fontWeight: 800, fontSize: "20pt", lineHeight: 1, letterSpacing: "-.02em" }}>{m.n}</div>
          <div style={{ font: '500 8pt/1.3 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".08em", color: "#BAF0F8", marginTop: 5 }}>{m.l}</div>
        </div>))}</div>}
      <div style={{ padding: "32px 56px 48px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3E5660", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#15303A", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#0891B2" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#7C949E", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="ot-b" style={{ color: "#3E5660", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
        </div>
        <div>
          {skills.length > 0 && <div style={{ background: "#ECFBFD", border: "1px solid #C4EEF4", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={getLabel(data, "skills")} s={{ marginBottom: 11 }} /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: '600 9pt/1 "Inter",sans-serif', color: "#0E7490", background: "#fff", border: "1px solid #C4EEF4", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div></div>}
          <div style={{ background: "#ECFBFD", border: "1px solid #C4EEF4", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={getLabel(data, "education")} s={{ marginBottom: 11 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3E5660" }}>{education.map((e, i) => <React.Fragment key={i}><b style={{ color: "#15303A", fontWeight: 600 }}>{e.degree}</b><br />{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}<br /></React.Fragment>)}</div></div>
          {certifications.length > 0 && <div style={{ background: "#ECFBFD", border: "1px solid #C4EEF4", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={getLabel(data, "certifications")} s={{ marginBottom: 11 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3E5660" }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#15303A", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></div>}
          {languages.length > 0 && <div style={{ background: "#ECFBFD", border: "1px solid #C4EEF4", borderRadius: 12, padding: "16px 18px" }}><Sec t={getLabel(data, "languages")} s={{ marginBottom: 11 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3E5660" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#15303A", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></div>}
        </div>
      </div>
      <style>{`.ot-b li{position:relative;padding-left:15px;margin-bottom:4px}.ot-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
