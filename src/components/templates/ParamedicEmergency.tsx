// ParamedicEmergency — Paramedics / EMS / emergency care
// Bold red-and-charcoal with an ECG pulse line and condensed display type. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const bc = '"Barlow Condensed","Inter",sans-serif';
const Sec = ({ t, s, panel }: { t: string; s?: React.CSSProperties; panel?: boolean }) => <h2 style={{ fontFamily: bc, fontWeight: 700, fontSize: panel ? "13pt" : "15pt", letterSpacing: ".08em", textTransform: "uppercase", color: "#111418", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 10, ...s }}>{t}{!panel && <span style={{ flex: 1, height: 3, background: "#D62F35" }} />}</h2>;

export default function ParamedicEmergency({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const pan = (t: string, children: React.ReactNode) => <div style={{ background: "#FBF3F3", borderLeft: "4px solid #D62F35", borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 14 }}><Sec t={t} panel s={{ marginBottom: 10 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '600 9pt/1 "Inter",sans-serif', color: "#B81E25", background: "#FBE3E4", borderRadius: 4, padding: "6px 10px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1C1F24", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#111418", color: "#E9ECEF", padding: "42px 54px", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, height: 6, width: "100%", background: "#D62F35" }} />
        <h1 style={{ fontFamily: bc, fontWeight: 700, fontSize: "44pt", lineHeight: .92, letterSpacing: ".01em", textTransform: "uppercase", margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontFamily: bc, fontWeight: 600, fontSize: "15pt", letterSpacing: ".14em", textTransform: "uppercase", color: "#FF5A5F", margin: "6px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9.5pt/1 "Inter",sans-serif', color: "#9AA1A9", display: "flex", flexWrap: "wrap", gap: "6px 18px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        <div style={{ position: "absolute", right: 54, top: "50%", transform: "translateY(-50%)", color: "#D62F35" }}>
          <svg viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: 120, height: 40 }}><path d="M0 20 H30 L38 6 L50 34 L60 14 L66 20 H120" /></svg>
        </div>
      </div>
      <div style={{ padding: "34px 54px 48px", display: "grid", gridTemplateColumns: "1fr 226px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#44494F", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1C1F24", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#C42229" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#8A9099", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="pm-b" style={{ color: "#44494F", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={getLabel(data, "education")} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1C1F24", margin: 0 }}>{e.degree}</p>
            <p style={{ margin: "3px 0 0", color: "#44494F" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {certifications.length > 0 && pan(getLabel(data, "certifications"), chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name)))}
          {skills.length > 0 && pan(getLabel(data, "skills"), chips(skills))}
          {languages.length > 0 && pan(getLabel(data, "languages"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#44494F" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#1C1F24", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.pm-b li{position:relative;padding-left:15px;margin-bottom:4px}.pm-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
