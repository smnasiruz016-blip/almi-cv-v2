// SustainMeshESG — Sustainability / ESG / environmental
// Green-and-teal mesh-gradient header with an impact-metrics stripe (from CV data). atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 800, fontSize: "9.5pt", letterSpacing: ".12em", textTransform: "uppercase", color: "#0F766E", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 14, height: 14, borderRadius: 4, background: "linear-gradient(135deg,#34D399,#38BDF8)" }} />{t}</h2>;

export default function SustainMeshESG({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const panel = (t: string, children: React.ReactNode) => <div style={{ background: "#F2FBF7", border: "1px solid #D6F0E5", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '600 8.5pt/1 "Plus Jakarta Sans",sans-serif', color: "#0B6157", background: "#DCFCE7", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  const metrics = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, certifications.length ? { n: certifications.length, l: "Certs" } : { n: languages.length, l: "Languages" }].filter((m) => m.n > 0);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#16261C", fontFamily: '"Plus Jakarta Sans","Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "relative", padding: "48px 54px 38px", color: "#fff", overflow: "hidden", background: "radial-gradient(120% 130% at 0% 0%, #34D399 0%, transparent 45%), radial-gradient(120% 130% at 100% 20%, #38BDF8 0%, transparent 50%), radial-gradient(130% 120% at 60% 120%, #A7F3D0 0%, transparent 55%), linear-gradient(120deg, #0F766E, #065F46)" }}>
        <h1 style={{ fontWeight: 800, fontSize: "34pt", letterSpacing: "-.03em", lineHeight: 1, margin: 0 }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", color: "#D1FAE5", margin: "8px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '600 9pt/1 "Plus Jakarta Sans",sans-serif', color: "#E0F7EF", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      {metrics.length === 3 && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>{metrics.map((m, i) => <div key={i} style={{ background: "#ECFDF5", padding: 16, textAlign: "center", borderRight: i < 2 ? "1px solid #D1F0E2" : "0" }}><div style={{ fontWeight: 800, fontSize: "20pt", color: "#0F766E", lineHeight: 1 }}>{m.n}</div><div style={{ font: '600 7.5pt/1.3 "Plus Jakarta Sans",sans-serif', textTransform: "uppercase", letterSpacing: ".06em", color: "#4B7A6B", marginTop: 5 }}>{m.l}</div></div>)}</div>}
      <div style={{ padding: "30px 54px 48px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3A4F44", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#16261C", margin: 0 }}>{e.role}</p>
            <p style={{ fontWeight: 600, fontSize: "10pt", color: "#0F766E", margin: "2px 0 5px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="se-b" style={{ color: "#3A4F44", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#16261C", margin: 0 }}>{e.degree}</p>
            <p style={{ fontWeight: 600, fontSize: "10pt", color: "#0F766E", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && panel(getLabel(data, "skills", "Expertise"), chips(skills))}
          {certifications.length > 0 && panel(getLabel(data, "certifications", "Frameworks"), chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name)))}
          {languages.length > 0 && panel(getLabel(data, "languages"), <div style={{ font: '500 9.5pt/1.7 "Plus Jakarta Sans",sans-serif', color: "#3A4F44" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#16261C", fontWeight: 700 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.se-b li{position:relative;padding-left:15px;margin-bottom:4px}.se-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
