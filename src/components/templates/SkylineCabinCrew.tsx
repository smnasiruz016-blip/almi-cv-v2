// SkylineCabinCrew — Cabin crew / aviation / airline service
// Sky-blue gradient with gold accents, photo and language proficiency bars. supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

function levelWidth(level?: string): number {
  const l = (level ?? "").toLowerCase();
  if (/native|c2|mother/.test(l)) return 100;
  if (/fluent|c1|advanced|proficient/.test(l)) return 92;
  if (/upper|b2/.test(l)) return 78;
  if (/intermediate|b1|conversational/.test(l)) return 64;
  if (/basic|a1|a2|beginner|elementary/.test(l)) return 45;
  return 70;
}

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const fr = '"Fraunces",Georgia,serif';
const Sec = ({ t, s }: { t: string; s?: React.CSSProperties }) => <h2 style={{ fontWeight: 700, fontSize: "9.5pt", letterSpacing: ".18em", textTransform: "uppercase", color: "#2E6FB0", margin: "0 0 13px", display: "flex", alignItems: "center", gap: 9, ...s }}><span style={{ width: 18, height: 3, background: "#D4A24C", borderRadius: 3 }} />{t}</h2>;

export default function SkylineCabinCrew({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean);
  const panel = (t: string, children: React.ReactNode) => <div style={{ background: "#F1F7FC", border: "1px solid #D7E7F4", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}><Sec t={t} s={{ marginBottom: 11 }} />{children}</div>;
  const chips = (arr: string[]) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{arr.map((s, i) => <span key={i} style={{ font: '500 9pt/1 "Inter",sans-serif', color: "#2E6FB0", background: "#E2EEF8", borderRadius: 99, padding: "6px 11px" }}>{s}</span>)}</div>;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none" style={{ background: "#fff", color: "#1B2A3A", fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}>
      <div style={{ background: "linear-gradient(120deg,#2E6FB0 0%,#4A92D4 55%,#86C5F0 100%)", color: "#fff", padding: "44px 54px", display: "flex", alignItems: "center", gap: 26, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 40, top: 30, width: 130, height: 2, background: "rgba(255,255,255,.4)", boxShadow: "0 14px 0 rgba(255,255,255,.25), 0 28px 0 rgba(255,255,255,.15)" }} />
        <div style={{ width: 110, height: 110, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(150deg,#BFE0F7,#2E6FB0)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 6px rgba(255,255,255,.4)", zIndex: 2, overflow: "hidden" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: fr, fontWeight: 500, fontSize: "38pt", color: "#fff" }}>{initials(basics.fullName)}</span>}
        </div>
        <div style={{ zIndex: 2, position: "relative" }}>
          <h1 style={{ fontFamily: fr, fontWeight: 500, fontSize: "33pt", letterSpacing: "-.01em", lineHeight: 1, margin: 0, color: "#fff" }}>{basics.fullName}</h1>
          <p style={{ fontWeight: 600, fontSize: "11.5pt", letterSpacing: ".04em", color: "#E2C887", margin: "8px 0 10px", textTransform: "uppercase" }}>{basics.role}</p>
          <div style={{ font: '500 9pt/1.6 "Inter",sans-serif', color: "#DCEBF8", display: "flex", flexWrap: "wrap", gap: "4px 14px" }}>{contact.map((c, i) => <span key={i}>{c}</span>)}</div>
        </div>
      </div>
      <div style={{ padding: "32px 54px 48px", display: "grid", gridTemplateColumns: "1fr 224px", gap: 34 }}>
        <div>
          {basics.summary && <><Sec t={getLabel(data, "summary", "Profile")} /><RichTextRender html={basics.summary} style={{ color: "#3E4F60", lineHeight: 1.65, margin: "0 0 24px" }} /></>}
          <Sec t={getLabel(data, "experience")} />
          {experience.map((e, i) => (<div key={i} style={{ marginBottom: 15 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#1B2A3A", margin: 0 }}>{e.role}</p>
            <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#2E6FB0", margin: "2px 0 6px" }}>{e.company}{e.company && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate, e.current)}</p>
            <BulletsRender bullets={e.bullets} className="sk-b" style={{ color: "#3E4F60", fontSize: "10pt", lineHeight: 1.5, margin: 0, padding: 0, listStyle: "none" }} />
          </div>))}
          <Sec t={`${getLabel(data, "education")} & training`} />
          {education.map((e, i) => (<div key={i} style={{ marginBottom: 8 }}>
            <p style={{ fontFamily: fr, fontWeight: 600, fontSize: "12.5pt", color: "#1B2A3A", margin: 0 }}>{e.degree}</p>
            <p style={{ font: '500 10pt/1.4 "Inter",sans-serif', color: "#2E6FB0", margin: "2px 0 0" }}>{e.school}{e.school && (e.startDate || e.endDate) ? " · " : ""}{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
          </div>))}
        </div>
        <div>
          {certifications.length > 0 && panel(getLabel(data, "certifications"), chips(certifications.map((c) => c.year ? `${c.name} ${c.year}` : c.name)))}
          {skills.length > 0 && panel(getLabel(data, "skills", "Service skills"), chips(skills))}
          {languages.length > 0 && panel(getLabel(data, "languages"), <div>{languages.map((l, i) => (<div key={i} style={{ marginBottom: 9 }}>
            <div style={{ display: "flex", justifyContent: "space-between", font: '600 9pt/1 "Inter",sans-serif', color: "#2A3B4C", marginBottom: 5 }}><span>{l.name}</span><span>{l.level}</span></div>
            <div style={{ height: 6, borderRadius: 99, background: "#DCEAF5" }}><i style={{ display: "block", height: "100%", borderRadius: 99, width: `${levelWidth(l.level)}%`, background: "#D4A24C" }} /></div>
          </div>))}</div>)}
        </div>
      </div>
      <style>{`.sk-b li{position:relative;padding-left:15px;margin-bottom:4px}.sk-b li:before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:currentColor;opacity:.65}`}</style>
    </article>
  );
}
