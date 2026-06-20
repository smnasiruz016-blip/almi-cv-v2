// FitnessCoach — Fitness / strength coaching / personal training
// High-energy black with electric-lime accents, condensed type and a metrics stripe (from CV data). atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const bc = '"Barlow Condensed","Inter",sans-serif';
const Sec = ({ t, s, panel }: { t: string; s?: React.CSSProperties; panel?: boolean }) => <h2 style={{ fontFamily: bc, fontWeight: 700, fontSize: panel ? "13pt" : "16pt", letterSpacing: ".08em", textTransform: "uppercase", color: "#fff", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 10, ...s }}>{t}{!panel && <span style={{ flex: 1, height: 2, background: "#2B2E26" }} />}</h2>;

export default function FitnessCoach({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const np = (basics.fullName ?? "").trim().split(/\s+/);
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const pan = (t: string, children: React.ReactNode) => <div style={{ background: "#1B1D18", border: "1px solid #2B2E26", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} panel s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#C6F432", border: "1px solid #3C4030", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  const metrics = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, certifications.length ? { n: certifications.length, l: "Certs" } : { n: languages.length, l: "Languages" }].filter((m) => m.n > 0);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#121311", color: "#E8EAE0", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ padding: "46px 54px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,#C6F432,transparent 70%)", opacity: .18 }} />
        <h1 style={{ fontFamily: bc, fontWeight: 700, fontSize: "52pt", lineHeight: .9, letterSpacing: ".01em", textTransform: "uppercase", margin: 0, color: "#fff" }}>{np.slice(0, -1).join(" ") || basics.fullName} {np.length > 1 && <span style={{ color: "#C6F432" }}>{np[np.length - 1]}</span>}</h1>
        <p style={{ fontFamily: bc, fontWeight: 600, fontSize: "16pt", letterSpacing: ".18em", textTransform: "uppercase", color: "#C6F432", margin: "6px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9.5pt/1 "Inter",sans-serif', color: "#8A8F80", display: "flex", flexWrap: "wrap", gap: "6px 18px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      {metrics.length === 3 && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "#C6F432" }}>{metrics.map((m, i) => <div key={i} style={{ padding: 16, textAlign: "center", borderRight: i < 2 ? "2px solid #121311" : "0" }}><div style={{ fontFamily: bc, fontWeight: 700, fontSize: "26pt", lineHeight: 1, color: "#121311" }}>{m.n}</div><div style={{ font: '600 8pt/1.3 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".08em", color: "#3A4017", marginTop: 3 }}>{m.l}</div></div>)}</div>}
      <div style={{ padding: "30px 54px 46px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#B4B9AB", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.role}</p>
            <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#C6F432", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="fc-b" style={{ color: "#B4B9AB", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#fff", margin: 0 }}>{e.degree}</p>
            <p style={{ font: '500 9.5pt/1.4 "Inter",sans-serif', color: "#C6F432", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {certifications.length > 0 && pan(getLabel(data, "certifications", "Certs"), chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name)))}
          {skills.length > 0 && pan(getLabel(data, "skills", "Focus"), chips(skills))}
          {languages.length > 0 && pan(getLabel(data, "languages", "Languages"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#B4B9AB" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.fc-b li{position:relative;padding-left:15px;margin-bottom:4px}.fc-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
