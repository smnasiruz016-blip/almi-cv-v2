// GradientMeshGrowth — Growth marketers / performance / demand gen
// Vibrant multi-colour mesh-gradient hero with a growth-metrics stripe (from CV data). atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 800, fontSize: "9.5pt", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, background: "linear-gradient(90deg,#DB2777,#7C3AED)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", ...s }}><span style={{ width: 14, height: 14, borderRadius: 4, background: "linear-gradient(135deg,#FF6FB5,#7C3AED)" }} />{t}</h2>;

export default function GradientMeshGrowth({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const panel = (t: string, children: React.ReactNode) => <div style={{ background: "#FBF6FE", border: "1px solid #EEE0FA", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '600 8.5pt/1 "Plus Jakarta Sans",sans-serif', color: "#9333EA", background: "#F3E8FF", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  const metrics = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, certifications.length ? { n: certifications.length, l: "Certs" } : { n: languages.length, l: "Languages" }].filter((m) => m.n > 0);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1E1B2E", fontFamily: '"Plus Jakarta Sans","Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "relative", padding: "50px 54px 40px", color: "#fff", overflow: "hidden", background: "radial-gradient(110% 130% at 0% 0%, #FF6FB5 0%, transparent 45%), radial-gradient(110% 120% at 100% 0%, #FFB84D 0%, transparent 45%), radial-gradient(120% 130% at 80% 120%, #6C5CE7 0%, transparent 50%), radial-gradient(120% 130% at 10% 120%, #2DD4BF 0%, transparent 50%), linear-gradient(120deg, #7C3AED, #DB2777)" }}>
        <h1 style={{ fontWeight: 800, fontSize: "36pt", letterSpacing: "-.03em", lineHeight: 1, margin: 0 }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", color: "#FBEAF6", margin: "8px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '600 9pt/1 "Plus Jakarta Sans",sans-serif', color: "#F6E3F2", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      {metrics.length === 3 && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>{metrics.map((m, i) => <div key={i} style={{ padding: 16, textAlign: "center", borderRight: i < 2 ? "1px solid #EEE9F7" : "0" }}><div style={{ fontWeight: 800, fontSize: "21pt", lineHeight: 1, background: "linear-gradient(90deg,#DB2777,#7C3AED)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{m.n}</div><div style={{ font: '600 7.5pt/1.3 "Plus Jakarta Sans",sans-serif', textTransform: "uppercase", letterSpacing: ".06em", color: "#7A7090", marginTop: 5 }}>{m.l}</div></div>)}</div>}
      <div style={{ padding: "30px 54px 48px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#4A445E", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1E1B2E", margin: 0 }}>{e.role}</p>
            <p style={{ fontWeight: 600, fontSize: "10pt", color: "#9333EA", margin: "2px 0 5px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="gm-b" style={{ color: "#4A445E", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1E1B2E", margin: 0 }}>{e.degree}</p>
            <p style={{ fontWeight: 600, fontSize: "10pt", color: "#9333EA", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && panel(getLabel(data, "skills"), chips(skills))}
          {certifications.length > 0 && panel(getLabel(data, "certifications", "Stack"), chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name)))}
          {languages.length > 0 && panel(getLabel(data, "languages"), <div style={{ font: '500 9.5pt/1.7 "Plus Jakarta Sans",sans-serif', color: "#4A445E" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#1E1B2E", fontWeight: 700 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.gm-b li{position:relative;padding-left:15px;margin-bottom:4px}.gm-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
