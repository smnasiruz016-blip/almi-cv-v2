// SwissGrotesk — Swiss-grid family (2 of 6). Design / product / marketing roles.
// Black 265px rail carrying a circular portrait and the sidebar sections, white
// main column. Ported from 20-swiss-grotesk. atsSafe:false, supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const INK = "#151515";
const F = '"Archivo","Helvetica Neue",Arial,sans-serif';

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const H3 = ({ t, light }: { t: string; light?: boolean }) => (
  <h3
    style={{
      font: `600 10px/1 ${F}`,
      letterSpacing: ".18em",
      textTransform: "uppercase",
      marginBottom: 14,
      color: light ? "#fff" : INK,
      opacity: light ? 0.75 : 1,
    }}
  >
    {t}
  </h3>
);

export default function SwissGrotesk({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];

  return (
    <article
      className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background: "#fff", color: INK, fontFamily: F, display: "grid", gridTemplateColumns: "265px 1fr" }}
    >
      {/* Rail */}
      <div style={{ background: "#111", color: "#fff", padding: "49px 30px" }}>
        <div
          style={{
            width: 166,
            height: 166,
            borderRadius: "50%",
            margin: "0 auto 26px",
            overflow: "hidden",
            boxShadow: "0 0 0 3px rgba(255,255,255,.5)",
            background: "#2a2a2a",
          }}
        >
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", font: `700 42px ${F}`, color: "rgba(255,255,255,.6)" }}>
              {initials(basics.fullName)}
            </div>
          )}
        </div>
        <h1 style={{ font: `700 23px/1.06 ${F}`, letterSpacing: "-.01em", textAlign: "center", margin: 0 }}>
          {basics.fullName}
        </h1>
        {basics.role && (
          <p style={{ fontSize: 8.6, letterSpacing: ".2em", textTransform: "uppercase", marginTop: 10, textAlign: "center", opacity: 0.9 }}>
            {basics.role}
          </p>
        )}

        {contact.length > 0 && (
          <>
            <div style={{ height: 1, background: "rgba(255,255,255,.3)", margin: "26px 0" }} />
            <H3 t={getLabel(data, "contact", "Contact")} light />
            <div style={{ display: "grid", gap: 6, fontSize: 9.4 }}>
              {contact.map((c, i) => (
                <span key={i} style={{ wordBreak: "break-all", opacity: 0.9 }}>
                  {c}
                </span>
              ))}
            </div>
          </>
        )}

        {skills.length > 0 && (
          <>
            <div style={{ height: 1, background: "rgba(255,255,255,.3)", margin: "26px 0" }} />
            <H3 t={getLabel(data, "skills")} light />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: 8.8, padding: "3px 8px", borderRadius: 999, background: "rgba(255,255,255,.16)", color: "#fff" }}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}

        {languages.length > 0 && (
          <>
            <div style={{ height: 1, background: "rgba(255,255,255,.3)", margin: "26px 0" }} />
            <H3 t={getLabel(data, "languages")} light />
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {languages.map((l, i) => (
                <li key={i} style={{ fontSize: 9.4, lineHeight: 1.7, opacity: 0.9 }}>
                  <strong>{l.name}</strong>
                  {l.level ? ` — ${l.level}` : ""}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Main */}
      <div style={{ padding: "53px 45px" }}>
        {basics.summary && (
          <div style={{ marginBottom: 25 }}>
            <H3 t={getLabel(data, "summary", "Profile")} />
            <RichTextRender html={basics.summary} as="div" style={{ fontSize: 9.8, lineHeight: 1.65 }} />
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: 25 }}>
            <H3 t={getLabel(data, "experience")} />
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: 12, lineHeight: 1.25, margin: 0 }}>{e.role}</h4>
                <div style={{ fontSize: 9.2, opacity: 0.68, margin: "3px 0 6px" }}>
                  {e.company}
                  {e.company && (e.startDate || e.endDate) ? "  ·  " : ""}
                  {dateRange(e.startDate, e.endDate, e.current)}
                </div>
                <BulletsRender bullets={e.bullets} className="swg-b" style={{ margin: 0, padding: 0, listStyle: "none" }} />
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <H3 t={getLabel(data, "education")} />
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <h4 style={{ fontSize: 12, lineHeight: 1.25, margin: 0 }}>{e.degree}</h4>
                <div style={{ fontSize: 9.2, opacity: 0.68, marginTop: 3 }}>
                  {e.school}
                  {e.school && (e.startDate || e.endDate) ? "  ·  " : ""}
                  {dateRange(e.startDate, e.endDate)}
                  {e.notes ? `  ·  ${e.notes}` : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`.swg-b li{font-size:9.4px;line-height:1.55;padding-left:9px;position:relative;margin-bottom:2px}.swg-b li:before{content:"";position:absolute;left:0;top:5.5px;width:3px;height:3px;border-radius:50%;background:#111}`}</style>
    </article>
  );
}
