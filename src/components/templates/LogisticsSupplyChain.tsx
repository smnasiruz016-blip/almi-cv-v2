// LogisticsSupplyChain — Supply chain / logistics / procurement
// Industrial navy-and-orange with a route motif and a KPI stripe (from CV data). atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 800, fontSize: "10pt", letterSpacing: ".14em", textTransform: "uppercase", color: "#1B3A57", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 18, height: 3, background: "#F2792B", borderRadius: 3 }} />{t}</h2>;

export default function LogisticsSupplyChain({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const panel = (t: string, children: React.ReactNode) => <div style={{ background: "#F4F7FA", border: "1px solid #DEE6ED", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const metrics = [{ n: experience.length, l: "Positions" }, { n: skills.length, l: "Skills" }, { n: education.length, l: "Education" }, certifications.length ? { n: certifications.length, l: "Certs" } : { n: languages.length, l: "Languages" }].filter((m) => m.n > 0).slice(0, 4);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#16222E", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#1B3A57", color: "#DCE7F0", padding: "44px 54px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 26, height: 2, background: "repeating-linear-gradient(90deg,#F2792B 0 18px,transparent 18px 34px)", opacity: .6 }} />
        <h1 style={{ fontWeight: 800, fontSize: "32pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12pt", color: "#F2A05B", margin: "8px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9pt/1 "Inter",sans-serif', color: "#9DB4C8", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      {metrics.length >= 2 && <div style={{ display: "grid", gridTemplateColumns: `repeat(${metrics.length},1fr)` }}>{metrics.map((m, i) => <div key={i} style={{ background: "#F2792B", color: "#16222E", padding: 16, textAlign: "center", borderRight: i < metrics.length - 1 ? "1px solid rgba(22,34,46,.18)" : "0" }}><div style={{ fontWeight: 800, fontSize: "19pt", lineHeight: 1 }}>{m.n}</div><div style={{ font: '600 7.5pt/1.3 "Inter",sans-serif', textTransform: "uppercase", letterSpacing: ".06em", color: "#5A3415", marginTop: 5 }}>{m.l}</div></div>)}</div>}
      <div style={{ padding: "30px 54px 48px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3E4F5C", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#16222E", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#1B3A57" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#8595A2", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="ls-b" style={{ color: "#3E4F5C", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#16222E", margin: 0 }}>{e.degree}</p>
            <p style={{ margin: "3px 0 0", color: "#3E4F5C" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {skills.length > 0 && panel(getLabel(data, "skills"), <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: '600 9pt/1 "Inter",sans-serif', color: "#1B3A57", background: "#E6EDF3", borderRadius: 6, padding: "6px 10px" }}>{s}</span>)}</div>)}
          {certifications.length > 0 && panel(getLabel(data, "certifications"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3E4F5C" }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div>)}
          {languages.length > 0 && panel(getLabel(data, "languages"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3E4F5C" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#16222E", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.ls-b li{position:relative;padding-left:15px;margin-bottom:4px}.ls-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
