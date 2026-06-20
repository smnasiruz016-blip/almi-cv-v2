// MidnightCyan — DevOps / Platform / SRE engineers
// Dark navy canvas, cyan-violet glow, glowing skill bars, mono detailing. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel } from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const mono = '"JetBrains Mono","SFMono-Regular",monospace';
const display = '"Space Grotesk","Inter",sans-serif';
const Sec = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <section><h2 style={{ fontFamily: display, fontWeight: 600, fontSize: "11pt", letterSpacing: ".04em", color: "#fff", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 10 }}>
    <span style={{ width: 18, height: 2, background: "#22D3EE", borderRadius: 2 }} />{t}</h2>{children}</section>
);

export default function MidnightCyan({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const nameParts = (basics.fullName ?? "").trim().split(/\s+/);
  const first = nameParts.slice(0, -1).join(" ") || basics.fullName;
  const last = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background: "#0B1120", color: "#C7D2E5", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 40% at 82% 8%, rgba(34,211,238,.18), transparent 60%), radial-gradient(50% 38% at 6% 96%, rgba(124,109,242,.16), transparent 60%)" }} />
      <div style={{ position: "relative", padding: "54px 56px 48px" }}>
        <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: "44pt", lineHeight: .98, letterSpacing: "-.02em", color: "#fff", margin: 0 }}>{first} {last && <span style={{ color: "#22D3EE" }}>{last}</span>}</h1>
        <p style={{ fontFamily: mono, fontSize: "11pt", letterSpacing: ".18em", textTransform: "uppercase", color: "#7C6DF2", margin: "12px 0 0" }}>{basics.role}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", margin: "16px 0 0", font: `400 9.5pt/1 ${mono}`, color: "#8493AE" }}>
          {contact.map((c, i) => <span key={i}>{c}</span>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 244px", gap: 34, marginTop: 30 }}>
          <div>
            {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")}><RichTextRender html={basics.summary} style={{ color: "#9FB0CC", lineHeight: 1.6, margin: "0 0 26px" }} /></Sec></>}
            <Sec t={getLabel(data, "experience")}>
              {experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 17 }}>
                  <p style={{ fontFamily: display, fontWeight: 600, fontSize: "12pt", color: "#fff", margin: 0 }}>{e.role}</p>
                  <p style={{ font: `500 9.5pt/1.4 ${mono}`, color: "#22D3EE", margin: "3px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
                  <BulletsRender bullets={e.bullets} className="mc-b" style={{ color: "#9FB0CC", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
                </div>
              ))}
            </Sec>
            <div style={{ marginTop: 26 }}><Sec t={getLabel(data, "education")}>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <p style={{ fontFamily: display, fontWeight: 600, fontSize: "12pt", color: "#fff", margin: 0 }}>{e.degree}</p>
                  <p style={{ font: `500 9.5pt/1.4 ${mono}`, color: "#22D3EE", margin: "3px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}</p>
                  {e.notes && <p style={{ color: "#9FB0CC", fontSize: "9.5pt", margin: "3px 0 0" }}>{e.notes}</p>}
                </div>
              ))}
            </Sec></div>
          </div>
          <div>
            {skills.length > 0 && <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(124,109,242,.28)", borderRadius: 14, padding: "18px 18px 20px", marginBottom: 16 }}>
              <Sec t={getLabel(data, "skills")}>
                {skills.slice(0, 6).map((s, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ font: `500 9.5pt/1 "Inter",sans-serif`, color: "#DCE5F2", marginBottom: 6 }}>{s}</div>
                    <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,.08)" }}><i style={{ display: "block", height: "100%", borderRadius: 99, width: `${95 - i * 7}%`, background: "linear-gradient(90deg,#22D3EE,#7C6DF2)" }} /></div>
                  </div>
                ))}
              </Sec>
            </div>}
            {skills.length > 6 && <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(124,109,242,.28)", borderRadius: 14, padding: "18px 18px 20px", marginBottom: 16 }}>
              <Sec t="Toolbox"><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {skills.slice(6).map((s, i) => <span key={i} style={{ font: `500 8.5pt/1 ${mono}`, color: "#22D3EE", border: "1px solid rgba(34,211,238,.35)", borderRadius: 99, padding: "5px 10px" }}>{s}</span>)}
              </div></Sec>
            </div>}
            {certifications.length > 0 && <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(124,109,242,.28)", borderRadius: 14, padding: "18px 18px 20px", marginBottom: 16 }}>
              <Sec t={getLabel(data, "certifications")}><p style={{ font: `400 9.5pt/1.6 "Inter",sans-serif`, color: "#9FB0CC", margin: 0 }}>
                {certifications.map((c, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{c.name}</b>{c.issuer ? ` — ${c.issuer}` : ""}{c.year ? ` (${c.year})` : ""}<br /></React.Fragment>)}
              </p></Sec>
            </div>}
            {languages.length > 0 && <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(124,109,242,.28)", borderRadius: 14, padding: "18px 18px 20px" }}>
              <Sec t={getLabel(data, "languages")}><p style={{ font: `400 9.5pt/1.6 "Inter",sans-serif`, color: "#9FB0CC", margin: 0 }}>
                {languages.map((l, i) => <React.Fragment key={i}><b style={{ color: "#fff", fontWeight: 600 }}>{l.name}</b>{l.level ? ` — ${l.level}` : ""}<br /></React.Fragment>)}
              </p></Sec>
            </div>}
          </div>
        </div>
      </div>
      <style>{`.mc-b li{position:relative;padding-left:15px;margin-bottom:4px}.mc-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
