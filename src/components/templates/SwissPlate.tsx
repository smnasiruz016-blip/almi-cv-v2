// SwissPlate — Swiss-grid family (4 of 6). Architecture / editorial / studio roles.
// Black 234px photo band with a bordered plate card overlapping it, then a two
// column body on warm off-white. Ported from 22-swiss-plate.
// atsSafe:false, supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const INK = "#151515";
const PAPER = "#F5F5F3";
const F = '"Archivo","Helvetica Neue",Arial,sans-serif';

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const H3 = ({ t }: { t: string }) => (
  <h3 style={{ font: `600 10px/1 ${F}`, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14, color: "#111" }}>
    {t}
  </h3>
);

export default function SwissPlate({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];

  return (
    <article
      className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background: PAPER, color: INK, fontFamily: F }}
    >
      <div style={{ position: "relative", height: 234, background: "#111" }}>
        {basics.photoUrl ? (
          <img src={basics.photoUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", font: `700 56px ${F}`, color: "rgba(255,255,255,.35)" }}>
            {initials(basics.fullName)}
          </div>
        )}
      </div>

      <div
        style={{
          position: "relative",
          margin: "-57px 49px 0",
          background: PAPER,
          padding: "26px 30px 23px",
          border: "1px solid rgba(0,0,0,.14)",
          borderTop: "4px solid #111",
        }}
      >
        <h1 style={{ font: `700 29px/1 ${F}`, letterSpacing: "-.015em", textTransform: "uppercase", margin: 0 }}>
          {basics.fullName}
        </h1>
        {basics.role && (
          <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "#111", marginTop: 10 }}>
            {basics.role}
          </p>
        )}
        {basics.summary && (
          <RichTextRender html={basics.summary} as="div" style={{ fontSize: 9.4, lineHeight: 1.6, marginTop: 13, opacity: 0.85 }} />
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 212px", gap: 38, padding: "34px 49px 45px" }}>
        <div>
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
                  <BulletsRender bullets={e.bullets} className="swp-b" style={{ margin: 0, padding: 0, listStyle: "none" }} />
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

        <aside style={{ borderLeft: "1px solid rgba(21,21,21,.13)", paddingLeft: 26 }}>
          {contact.length > 0 && (
            <div style={{ marginBottom: 25 }}>
              <H3 t={getLabel(data, "contact", "Details")} />
              <div style={{ display: "grid", gap: 6, fontSize: 9.4 }}>
                {contact.map((c, i) => (
                  <span key={i} style={{ wordBreak: "break-all" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: 25 }}>
              <H3 t={getLabel(data, "skills")} />
              {/* Source filled these meters to a fixed 95% / 84% / 70% for every
                  user. CVData carries no skill level — uniform rule instead. */}
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 11 }}>
                  <span style={{ fontSize: 9.2, display: "block", marginBottom: 5 }}>{s}</span>
                  <i style={{ display: "block", height: 4, background: "#111", borderRadius: 0 }} />
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <H3 t={getLabel(data, "languages")} />
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {languages.map((l, i) => (
                  <li key={i} style={{ fontSize: 9.4, lineHeight: 1.7 }}>
                    <strong>{l.name}</strong>
                    {l.level ? ` — ${l.level}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <style>{`.swp-b li{font-size:9.4px;line-height:1.55;padding-left:9px;position:relative;margin-bottom:2px}.swp-b li:before{content:"";position:absolute;left:0;top:5.5px;width:3px;height:3px;background:#111}`}</style>
    </article>
  );
}
