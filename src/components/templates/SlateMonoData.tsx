// SlateMonoData — Data analysts / BI / analytics
// Monospace terminal styling, teal accents, metric tiles (from CV data) and a mini bar chart. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const mono = '"JetBrains Mono","SFMono-Regular",monospace';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontFamily: mono, fontWeight: 700, fontSize: "10pt", letterSpacing: ".04em", color: "#0F172A", margin: "0 0 13px", ...s }}><span style={{ color: "#0D9488" }}># </span>{t}</h2>;

export default function SlateMonoData({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const stats = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, { n: education.length, l: "Education" }, certifications.length ? { n: certifications.length, l: "Certifications" } : { n: languages.length, l: "Languages" }].filter((s) => s.n > 0).slice(0, 4);
  const chartBars = [40, 62, 55, 80, 70, 95, 85];
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#F1F5F9", color: "#1E293B", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#0F172A", color: "#E2E8F0", padding: "44px 52px 36px" }}>
        <h1 style={{ fontFamily: mono, fontWeight: 700, fontSize: "30pt", letterSpacing: "-.02em", margin: 0, color: "#fff" }}><span style={{ color: "#2DD4BF" }}>$ </span>{basics.fullName}</h1>
        <p style={{ fontFamily: mono, fontSize: "11pt", color: "#2DD4BF", margin: "10px 0 0", letterSpacing: ".04em" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: `400 9pt/1 ${mono}`, color: "#94A3B8", display: "flex", flexWrap: "wrap", gap: "5px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ padding: "30px 52px 46px" }}>
        {stats.length >= 2 && <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length},1fr)`, gap: 12, marginBottom: 28 }}>{stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderLeft: "3px solid #0D9488", borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: "19pt", color: "#0F172A", lineHeight: 1 }}>{s.n}</div>
            <div style={{ font: '500 8pt/1.3 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".08em", color: "#64748B", marginTop: 6 }}>{s.l}</div>
          </div>))}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 224px", gap: 32 }}>
          <div>
            {basics.summary && <><Sec t={getLabel(data, "summary", "summary")} /><RichTextRender html={basics.summary} style={{ color: "#475569", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
            <Sec t={getLabel(data, "experience", "experience")} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#0F172A", margin: 0 }}>{e.role}</p>
              <p style={{ font: `500 9.5pt/1.4 ${mono}`, color: "#0D9488", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
              <BulletsRender bullets={e.bullets} className="sm-b" style={{ color: "#475569", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
            </div>))}
            <Sec t={getLabel(data, "education", "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#0F172A", margin: 0 }}>{e.degree}</p>
              <p style={{ font: `500 9.5pt/1.4 ${mono}`, color: "#0D9488", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
          </div>
          <div>
            {skills.length > 0 && <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: "16px 18px", marginBottom: 14 }}>
              <Sec t={getLabel(data, "skills", "stack")} s={{ marginBottom: 12 }} />
              {skills.slice(0, 6).map((s, i) => (<div key={i} style={{ marginBottom: 10 }}>
                <div style={{ font: `500 9pt/1 ${mono}`, color: "#1E293B", marginBottom: 5 }}>{s}</div>
                <div style={{ height: 6, background: "#E2E8F0", borderRadius: 99 }}><i style={{ display: "block", height: "100%", borderRadius: 99, width: `${96 - i * 6}%`, background: "#14B8A6" }} /></div>
              </div>))}
            </div>}
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: "16px 18px", marginBottom: 14 }}>
              <Sec t="output" s={{ marginBottom: 12 }} />
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 52, marginTop: 4 }}>{chartBars.map((h, i) => <i key={i} style={{ flex: 1, height: `${h}%`, background: "linear-gradient(#2DD4BF,#0D9488)", borderRadius: "2px 2px 0 0" }} />)}</div>
            </div>
            {languages.length > 0 && <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: "16px 18px" }}>
              <Sec t={getLabel(data, "languages", "languages")} s={{ marginBottom: 12 }} />
              <div style={{ font: `400 9pt/1.7 ${mono}`, color: "#475569" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#0F172A", fontWeight: 700 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>
            </div>}
          </div>
        </div>
      </div>
      <style>{`.sm-b li{position:relative;padding-left:15px;margin-bottom:4px}.sm-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
