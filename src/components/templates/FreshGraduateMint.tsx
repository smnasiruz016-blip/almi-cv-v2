// FreshGraduateMint — Students / entry-level / new graduates
// Bright mint, education-first layout. Built for first jobs. atsSafe:false, supportsPhoto:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s, panel }: { t: string; s?: React.CSSProperties; panel?: boolean }) => <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".18em", textTransform: "uppercase", color: "#0E7C68", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 10, ...s }}>{t}{!panel && <span style={{ flex: 1, height: 1, background: "#CDEAE2" }} />}</h2>;

export default function FreshGraduateMint({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1B3330", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "#E7FAF4", padding: "44px 56px 34px", borderBottom: "2px solid #B8EBDC" }}>
        <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "38pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#0E5A4A" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 600, fontSize: "12.5pt", color: "#14B8A6", margin: "8px 0 0" }}>{basics.role}</p>
        <div style={{ margin: "16px 0 0", font: '500 9.5pt/1 "Inter",sans-serif', color: "#4A6B64", display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>{contact.map((c, i) => <span key={i}>{c}{i < contact.length - 1 ? "  ·" : ""}</span>)}</div>
      </div>
      <div style={{ padding: "30px 56px 46px" }}>
        {basics.summary && <RichTextRender html={basics.summary} style={{ color: "#3E5651", lineHeight: 1.6, margin: "0 0 26px", fontSize: "11pt" }} />}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 230px", gap: 34 }}>
          <div>
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12pt", color: "#1B3330", margin: 0 }}>{e.degree}</p>
                <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#8AA29C", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
              </div>
              <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#14B8A6", margin: "1px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
            <Sec t={getLabel(data, "experience")} s={{ marginTop: 22 }} />
            {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12pt", color: "#1B3330", margin: 0 }}>{e.role}{e.company && <span style={{ fontFamily: '"Inter",sans-serif', fontWeight: 500, fontSize: "10pt", color: "#14B8A6" }}> · {e.company}</span>}</p>
                <span style={{ font: '600 8.5pt/1 "Inter",sans-serif', color: "#8AA29C", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              <BulletsRender bullets={e.bullets} className="fg-b" style={{ color: "#3E5651", marginTop: 5, fontSize: "10pt", lineHeight: 1.5, padding: 0, listStyle: "none" }} />
            </div>))}
          </div>
          <div>
            {skills.length > 0 && <div style={{ background: "#F2FBF8", border: "1px solid #D4EFE7", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={getLabel(data, "skills")} panel s={{ marginBottom: 11 }} /><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#0E7C68", background: "#DCF5EE", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div></div>}
            {awards && awards.length > 0 && <div style={{ background: "#F2FBF8", border: "1px solid #D4EFE7", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={getLabel(data, "awards")} panel s={{ marginBottom: 11 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3E5651" }}>{awards.map((a, i) => <React.Fragment key={i}>{a.title}{a.year ? ` (${a.year})` : ""}<br /></React.Fragment>)}</div></div>}
            {certifications.length > 0 && <div style={{ background: "#F2FBF8", border: "1px solid #D4EFE7", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}><Sec t={getLabel(data, "certifications")} panel s={{ marginBottom: 11 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3E5651" }}>{certifications.map((c, i) => <React.Fragment key={i}>{c.name}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}</div></div>}
            {languages.length > 0 && <div style={{ background: "#F2FBF8", border: "1px solid #D4EFE7", borderRadius: 12, padding: "16px 18px" }}><Sec t={getLabel(data, "languages")} panel s={{ marginBottom: 11 }} /><div style={{ font: '400 9.5pt/1.7 "Inter",sans-serif', color: "#3E5651" }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#1B3330", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}</div></div>}
          </div>
        </div>
      </div>
      <style>{`.fg-b li{position:relative;padding-left:15px;margin-bottom:4px}.fg-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
