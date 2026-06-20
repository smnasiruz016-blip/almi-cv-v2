// MonochromeMinimal — Universal / any role
// Pure black-on-white, generous whitespace and hairline rules. Timeless and ATS-safe.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Rule = () => <hr style={{ border: 0, borderTop: "1px solid #E0E0E0", margin: "30px 0" }} />;
const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 24, marginBottom: 30 }}>
    <p style={{ fontWeight: 600, fontSize: "9pt", letterSpacing: ".2em", textTransform: "uppercase", color: "#999", margin: 0, paddingTop: 2 }}>{label}</p>
    <div>{children}</div>
  </div>
);

export default function MonochromeMinimal({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#111", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt", lineHeight: 1.6 }}>
      <div style={{ padding: "72px 70px 56px" }}>
        <h1 style={{ fontWeight: 700, fontSize: "32pt", letterSpacing: "-.03em", lineHeight: 1, margin: 0, color: "#111" }}>{basics.fullName}</h1>
        <p style={{ fontWeight: 400, fontSize: "13pt", color: "#666", margin: "10px 0 0", letterSpacing: ".01em" }}>{basics.role}</p>
        <div style={{ margin: "22px 0 0", font: '400 9.5pt/1 "Inter",sans-serif', color: "#888", display: "flex", flexWrap: "wrap", gap: "6px 18px" }}>{contact.map((c, i) => <span key={i} style={{ color: "#444" }}>{c}</span>)}</div>
        <Rule />
        {basics.summary && <><Row label={getLabel(data, "summary", "Profile")}><RichTextRender html={basics.summary} style={{ color: "#333", margin: 0 }} /></Row><Rule /></>}
        <Row label={getLabel(data, "experience")}>
          <div>{experience.map((e, i) => (<div key={i} style={{ marginBottom: i < experience.length - 1 ? 18 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <p style={{ fontWeight: 600, fontSize: "11.5pt", color: "#111", margin: 0 }}>{e.role}{e.company && <span style={{ fontWeight: 400, color: "#666" }}> — {e.company}</span>}</p>
              <span style={{ font: '400 9pt/1 "Inter",sans-serif', color: "#999", whiteSpace: "nowrap" }}>{dateRange(e.startDate, e.endDate, e.current)}</span>
            </div>
            <BulletsRender bullets={e.bullets} className="mm-b" style={{ color: "#444", marginTop: 6, fontSize: "10pt", padding: 0, listStyle: "none" }} />
          </div>))}</div>
        </Row>
        <Rule />
        <Row label={getLabel(data, "education")}>
          <div>{education.map((e, i) => (<div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600, color: "#111" }}>{e.degree}</div>
            <div style={{ color: "#777", fontSize: "9.5pt" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</div>
          </div>))}</div>
        </Row>
        {skills.length > 0 && <><Rule /><Row label={getLabel(data, "skills")}><p style={{ color: "#333", margin: 0 }}>{skills.map((s, i) => <span key={i}>{s}{i < skills.length - 1 ? "  ·  " : ""}</span>)}</p></Row></>}
        {certifications.length > 0 && <><Rule /><Row label={getLabel(data, "certifications")}><p style={{ color: "#333", margin: 0 }}>{certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#111", fontWeight: 600 }}>{c.name}</b>{c.year ? ` (${c.year})` : ""}{i < certifications.length - 1 ? "  ·  " : ""}</React.Fragment>)}</p></Row></>}
        {languages.length > 0 && <><Rule /><Row label={getLabel(data, "languages")}><p style={{ color: "#333", margin: 0 }}>{languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#111", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}{i < languages.length - 1 ? "  ·  " : ""}</React.Fragment>)}</p></Row></>}
      </div>
      <style>{`.mm-b li{position:relative;padding-left:15px;margin-bottom:4px}.mm-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
