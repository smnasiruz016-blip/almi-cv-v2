// VoltageElectrician — Electricians / electrical trades
// Bold black-and-yellow hazard styling with condensed type and ticket chips. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const bc = '"Barlow Condensed","Inter",sans-serif';
const Sec = ({ t, s, panel }: { t: string; s?: React.CSSProperties; panel?: boolean }) => <h2 style={{ fontFamily: bc, fontWeight: 700, fontSize: panel ? "14pt" : "16pt", letterSpacing: ".08em", textTransform: "uppercase", color: "#161616", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 10, ...s }}>{t}{!panel && <span style={{ flex: 1, height: 3, background: "#F2C200" }} />}</h2>;

export default function VoltageElectrician({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const np = (basics.fullName ?? "").trim().split(/\s+/);
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const pan = (t: string, children: React.ReactNode) => <div style={{ background: "#FBFBF6", borderLeft: "4px solid #F2C200", borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 14 }}><Sec t={t} panel s={{ marginBottom: 10 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '600 9pt/1 "Inter",sans-serif', color: "#1A1A1A", background: "#F4EFD6", borderRadius: 4, padding: "6px 10px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1A1A1A", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#161616", color: "#fff", padding: "40px 54px", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, height: 6, width: "100%", background: "repeating-linear-gradient(45deg,#F2C200 0 18px,#161616 18px 36px)" }} />
        <h1 style={{ fontFamily: bc, fontWeight: 700, fontSize: "46pt", lineHeight: .92, letterSpacing: ".01em", textTransform: "uppercase", margin: 0, color: "#fff" }}>{np.slice(0, -1).join(" ") || basics.fullName} {np.length > 1 && <span style={{ color: "#F2C200" }}>{np[np.length - 1]}</span>}</h1>
        <span style={{ fontFamily: bc, fontWeight: 600, fontSize: "16pt", letterSpacing: ".14em", textTransform: "uppercase", color: "#161616", background: "#F2C200", display: "inline-block", padding: "4px 12px", margin: "12px 0 0" }}>{basics.role}</span>
        <div style={{ margin: "16px 0 0", font: '500 9.5pt/1 "Inter",sans-serif', color: "#BBB", display: "flex", flexWrap: "wrap", gap: "6px 18px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>
      <div style={{ padding: "36px 54px 48px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#444", lineHeight: 1.6, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1A1A1A", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 500, color: "#B89000" }}> · {e.company}</span>}</p>
              <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#999", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="ve-b" style={{ color: "#444", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
          </div>))}
          {education.length > 0 && <><Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 700, fontSize: "11.5pt", color: "#1A1A1A", margin: 0 }}>{e.degree}</p>
              <p style={{ color: "#666", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}</>}
        </div>
        <div>
          {certifications.length > 0 && pan(getLabel(data, "certifications", "Qualifications"), chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name)))}
          {skills.length > 0 && pan(getLabel(data, "skills"), chips(skills))}
          {languages.length > 0 && pan(getLabel(data, "languages", "Extras"), <div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#444" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#1A1A1A", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div>)}
        </div>
      </div>
      <style>{`.ve-b li{position:relative;padding-left:15px;margin-bottom:4px}.ve-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
