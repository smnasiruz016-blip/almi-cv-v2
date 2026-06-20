// ForestTrades — Construction / site management / trades
// Sturdy forest-green and safety-amber with hazard stripe and condensed type. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const bc = '"Barlow Condensed","Inter",sans-serif';
const Sec = ({ t, s, panel }: { t: string; s?: React.CSSProperties; panel?: boolean }) => <h2 style={{ fontFamily: bc, fontWeight: 700, fontSize: "15pt", letterSpacing: ".08em", textTransform: "uppercase", color: "#1F3328", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 10, ...s }}>{t}{!panel && <span style={{ flex: 1, height: 3, background: "#F0A92B" }} />}</h2>;

export default function ForestTrades({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '600 9pt/1 "Inter",sans-serif', color: "#1F3328", background: "#DDE6DD", borderRadius: 4, padding: "6px 10px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#232A24", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#1F3328", color: "#E8EFE9", padding: "42px 54px", position: "relative", borderBottom: "6px solid #F0A92B" }}>
        <div style={{ position: "absolute", left: 0, bottom: -6, height: 6, width: "100%", background: "repeating-linear-gradient(45deg,#F0A92B 0 16px,#1F3328 16px 32px)" }} />
        <h1 style={{ fontFamily: bc, fontWeight: 700, fontSize: "44pt", lineHeight: .92, letterSpacing: ".01em", textTransform: "uppercase", margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontFamily: bc, fontWeight: 600, fontSize: "15pt", letterSpacing: ".12em", textTransform: "uppercase", color: "#F0A92B", margin: "6px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9.5pt/1 "Inter",sans-serif', color: "#A9BCAE", display: "flex", flexWrap: "wrap", gap: "6px 18px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ padding: "34px 54px 48px", display: "grid", gridTemplateColumns: "1fr 232px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#45503F", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#232A24", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#3E7A55" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#8A968B", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="ft-b" style={{ color: "#45503F", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
        </div>
        <div>
          {certifications.length > 0 && <div style={{ background: "#F3F5F1", borderLeft: "4px solid #F0A92B", borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 14 }}><Sec t={getLabel(data, "certifications", "Tickets")} panel s={{ marginBottom: 10 }} />{chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name))}</div>}
          {skills.length > 0 && <div style={{ background: "#F3F5F1", borderLeft: "4px solid #F0A92B", borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 14 }}><Sec t={getLabel(data, "skills", "Strengths")} panel s={{ marginBottom: 10 }} />{chips(skills)}</div>}
          <div style={{ background: "#F3F5F1", borderLeft: "4px solid #F0A92B", borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 14 }}><Sec t={getLabel(data, "education")} panel s={{ marginBottom: 10 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#45503F" }}>{education.map((e, i) => <React.Fragment key={i}><b style={{ color: "#232A24", fontWeight: 600 }}>{e.degree}</b><br />{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}<br /></React.Fragment>)}</div></div>
          {languages.length > 0 && <div style={{ background: "#F3F5F1", borderLeft: "4px solid #F0A92B", borderRadius: "0 8px 8px 0", padding: "14px 16px" }}><Sec t={getLabel(data, "languages")} panel s={{ marginBottom: 10 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#45503F" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#232A24", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></div>}
        </div>
      </div>
      <style>{`.ft-b li{position:relative;padding-left:15px;margin-bottom:4px}.ft-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
