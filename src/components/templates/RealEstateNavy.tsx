// RealEstateNavy — Real estate agents / property
// Polished navy-and-gold with photo and a metrics stripe (from CV data). supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".18em", textTransform: "uppercase", color: "#14213D", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 10, ...s }}><span style={{ width: 20, height: 2, background: "#B8924A" }} />{t}</h2>;

export default function RealEstateNavy({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const panel = (t: string, children: React.ReactNode) => <div style={{ background: "#F6F8FB", border: "1px solid #E1E7F0", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const metrics = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, certifications.length ? { n: certifications.length, l: "Credentials" } : { n: languages.length, l: "Languages" }].filter((m) => m.n > 0);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1C2638", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#14213D", color: "#E6ECF5", padding: "44px 54px", display: "flex", alignItems: "center", gap: 26, position: "relative", borderBottom: "4px solid #B8924A" }}>
        <div style={{ width: 116, height: 116, borderRadius: 8, flexShrink: 0, background: "linear-gradient(150deg,#3A5378,#14213D)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #B8924A", overflow: "hidden" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: fr, fontWeight: 500, fontSize: "40pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
        </div>
        <div>
          <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "34pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
          <p style={{ fontWeight: 600, fontSize: "11.5pt", letterSpacing: ".04em", color: "#C9A35E", margin: "8px 0 12px", textTransform: "uppercase" }}>{basics.role}</p>
          <div style={{ font: '500 9pt/1.6 "Inter",sans-serif', color: "#A8B4C8", display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        </div>
      </div>
      {metrics.length === 3 && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", background: "#B8924A", color: "#14213D" }}>{metrics.map((m, i) => <div key={i} style={{ padding: 16, textAlign: "center", borderRight: i < 2 ? "1px solid rgba(20,33,61,.2)" : "0" }}><div style={{ fontFamily: fr, fontWeight: 600, fontSize: "22pt", lineHeight: 1 }}>{m.n}</div><div style={{ font: '600 8pt/1.3 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".08em", marginTop: 5 }}>{m.l}</div></div>)}</div>}
      <div style={{ padding: "32px 54px 48px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#44506A", lineHeight: 1.65, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#1C2638", margin: 0 }}>{e.role}</p>
            <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#B8924A", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="rn-b" style={{ color: "#44506A", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#1C2638", margin: 0 }}>{e.degree}</p>
            <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#B8924A", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && panel(getLabel(data, "skills", "Expertise"), <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#14213D", background: "#EAEFF6", borderRadius: 6, padding: "6px 10px" }}>{s}</span>)}</div>)}
          {certifications.length > 0 && panel(getLabel(data, "certifications", "Credentials"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#44506A" }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div>)}
          {languages.length > 0 && panel(getLabel(data, "languages"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#44506A" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#1C2638", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.rn-b li{position:relative;padding-left:15px;margin-bottom:4px}.rn-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
