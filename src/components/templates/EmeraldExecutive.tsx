// EmeraldExecutive — Finance leaders / C-suite / executives
// Deep emerald header, gold rule, Fraunces display. Refined and ATS-safe.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => (
  <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".22em", textTransform: "uppercase", color: "#0E2A22", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 12, ...s }}>
    <i style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A24B", display: "inline-block" }} />{t}<span style={{ flex: 1, height: 1, background: "rgba(14,42,34,.18)" }} /></h2>
);

export default function EmeraldExecutive({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#14241D", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", lineHeight: 1.55 }}>
      <div style={{ background: "#0E2A22", color: "#fff", padding: "50px 64px 40px", position: "relative" }}>
        <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "40pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
        <p style={{ fontFamily: fr, fontStyle: "italic", fontWeight: 500, fontSize: "14pt", color: "#E7C878", margin: "10px 0 0" }}>{basics.role}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", margin: "20px 0 0", font: '400 9.5pt/1 "Inter",sans-serif', color: "#9FC4B4" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? " ·" : ""}</span>)}</div>
        <div style={{ position: "absolute", left: 0, bottom: 0, height: 4, width: "100%", background: "linear-gradient(90deg,#C9A24B 0%,#E7C878 50%,#C9A24B 100%)" }} />
      </div>
      <div style={{ padding: "36px 64px 48px" }}>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#43564E", margin: "0 0 28px" }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", margin: 0, color: "#14241D" }}>{e.role}{e.company && <span style={{ fontWeight: 400, color: "#4E7A6A", fontSize: "10.5pt" }}> · {e.company}</span>}</p>
              <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#6E8378", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="ee-b" style={{ color: "#43564E", marginTop: 5, fontSize: "10.5pt", padding: 0, listStyle: "none" }} />
          </div>
        ))}
        <hr style={{ border: 0, borderTop: "1px solid rgba(14,42,34,.12)", margin: "26px 0" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
          <div>
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", margin: 0, color: "#14241D" }}>{e.degree}</p>
                <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#6E8378", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
              </div>
              <p style={{ color: "#43564E", margin: "3px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
            {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} s={{ marginTop: 6 }} /><p style={{ color: "#43564E", margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#14241D", fontWeight: 600 }}>{c.name}</b>{c.issuer ? `, ${c.issuer}` : ""}{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Expertise")} /><div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px" }}>{skills.map((s, i) => <span key={i} style={{ font: '500 9.5pt/1 "Inter",sans-serif', color: "#0E2A22", background: "#EAF2EC", border: "1px solid #C9DFD0", borderRadius: 6, padding: "6px 11px" }}>{s}</span>)}</div></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 20 }} /><p style={{ color: "#43564E", margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#14241D", fontWeight: 600 }}>{l.name}</b>{l.level ? ` ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
        </div>
      </div>
      <style>{`.ee-b li{position:relative;padding-left:15px;margin-bottom:4px}.ee-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
