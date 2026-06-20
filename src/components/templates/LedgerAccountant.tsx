// LedgerAccountant — Accountants / finance / audit
// Double-rule ledger styling in forest green with tabular figures. ATS-safe.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".2em", textTransform: "uppercase", color: "#163A2C", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 12, ...s }}><i style={{ width: 7, height: 7, background: "#1F7A53", display: "inline-block", transform: "rotate(45deg)" }} />{t}<span style={{ flex: 1, height: 1, background: "#CBD8D0" }} /></h2>;

export default function LedgerAccountant({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1E2A24", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", lineHeight: 1.55 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "50px 60px 24px", borderBottom: "3px double #1F7A53" }}>
        <div>
          <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "36pt", letterSpacing: "-.02em", lineHeight: 1, margin: 0, color: "#163A2C" }}>{basics.fullName}</h1>
          <p style={{ fontWeight: 600, fontSize: "12pt", color: "#1F7A53", margin: "8px 0 0", letterSpacing: ".02em" }}>{basics.role}</p>
        </div>
        <div style={{ textAlign: "right", font: '400 9pt/1.7 "Inter",sans-serif', color: "#5C6B63" }}>{contact.map((c, i) => <React.Fragment key={i}>{i === 0 ? <b style={{ color: "#163A2C" }}>{c}</b> : c}<br /></React.Fragment>)}</div>
      </div>
      <div style={{ padding: "30px 60px 48px" }}>
        {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#44544B", margin: "0 0 26px" }} /></>}
        <Sec t={getLabel(data, "experience")} />
        {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12pt", color: "#1E2A24", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 400, color: "#1F7A53", fontSize: "10.5pt" }}> · {e.company}</span>}</p>
            <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#6E7D74", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
          </div>
          <BulletsRender bullets={e.bullets} className="le-b" style={{ color: "#44544B", marginTop: 5, padding: 0, listStyle: "none" }} />
        </div>))}
        <hr style={{ border: 0, borderTop: "1px solid #DDE6E0", margin: "24px 0" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <Sec t={getLabel(data, "education")} />
            {education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12pt", color: "#1E2A24", margin: 0 }}>{e.degree}</p>
                <span style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#6E7D74", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate)}</span>
              </div>
              <p style={{ color: "#44544B", margin: "2px 0 0" }}>{e.school}{e.notes ? ` · ${e.notes}` : ""}</p>
            </div>))}
            {certifications.length > 0 && <><Sec t={getLabel(data, "certifications")} s={{ marginTop: 6 }} /><p style={{ color: "#44544B", margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#1E2A24", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
          <div>
            {skills.length > 0 && <><Sec t={getLabel(data, "skills", "Expertise")} /><p style={{ display: "flex", flexWrap: "wrap", gap: "5px 14px", color: "#44544B", fontSize: "10pt", margin: 0 }}>{skills.map((s, i) => <span key={i}>{s}{i < skills.length - 1 ? " ·" : ""}</span>)}</p></>}
            {languages.length > 0 && <><Sec t={getLabel(data, "languages")} s={{ marginTop: 18 }} /><p style={{ color: "#44544B", margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#1E2A24", fontWeight: 600 }}>{l.name}</b>{l.level ? ` ${l.level}` : ""}{i < languages.length - 1 ? " · " : ""}</React.Fragment>)}</p></>}
          </div>
        </div>
      </div>
      <style>{`.le-b li{position:relative;padding-left:15px;margin-bottom:4px}.le-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
