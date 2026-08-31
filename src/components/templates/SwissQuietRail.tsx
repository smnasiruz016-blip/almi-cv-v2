// SwissQuietRail — Swiss-grid family (6 of 6). Research / healthcare / public-sector roles.
// Main column beside a 234px tinted rail in muted green, square portrait inline
// with the name. Ported from 24-swiss-quiet-rail. atsSafe:true, supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const ACC = "#1A6B5A";
const INK = "#151515";
const SOFT = "#E9F0ED";
const F = '"Archivo","Helvetica Neue",Arial,sans-serif';

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const H3 = ({ t, ruled }: { t: string; ruled?: boolean }) => (
  <h3
    style={{
      font: `600 10px/1 ${F}`,
      letterSpacing: ".18em",
      textTransform: "uppercase",
      marginBottom: 14,
      color: ACC,
      borderBottom: ruled ? `1.5px solid ${ACC}` : "none",
      paddingBottom: ruled ? 8 : 0,
    }}
  >
    {t}
  </h3>
);

export default function SwissQuietRail({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];

  return (
    <article
      className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background: "#FCFCFB", color: INK, fontFamily: F, display: "grid", gridTemplateColumns: "1fr 234px" }}
    >
      <div style={{ padding: "57px 34px 53px 53px" }}>
        <div style={{ display: "flex", gap: 23, alignItems: "center", marginBottom: 34 }}>
          <div style={{ width: 110, height: 110, flex: "none", overflow: "hidden", background: SOFT }}>
            {basics.photoUrl ? (
              <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", font: `700 28px ${F}`, color: ACC }}>
                {initials(basics.fullName)}
              </div>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ font: `700 27px/1.02 ${F}`, letterSpacing: "-.015em", margin: 0 }}>{basics.fullName}</h1>
            {basics.role && (
              <p style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: ACC, marginTop: 9 }}>
                {basics.role}
              </p>
            )}
          </div>
        </div>

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
                <BulletsRender bullets={e.bullets} className="swq-b" style={{ margin: 0, padding: 0, listStyle: "none" }} />
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

      <div style={{ background: SOFT, padding: "57px 30px" }}>
        {contact.length > 0 && (
          <div style={{ marginBottom: 25 }}>
            <H3 t={getLabel(data, "contact", "Contact")} ruled />
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
            <H3 t={getLabel(data, "skills")} ruled />
            {/* Source filled these meters to a fixed 95% / 84% / 70% for every
                user. CVData carries no skill level — uniform rule instead. */}
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: 11 }}>
                <span style={{ fontSize: 9.2, display: "block", marginBottom: 5 }}>{s}</span>
                <i style={{ display: "block", height: 4, background: ACC, borderRadius: 2 }} />
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <H3 t={getLabel(data, "languages")} ruled />
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
      </div>

      <style>{`.swq-b li{font-size:9.4px;line-height:1.55;padding-left:9px;position:relative;margin-bottom:2px}.swq-b li:before{content:"";position:absolute;left:0;top:5.5px;width:3px;height:3px;border-radius:50%;background:${ACC}}`}</style>
    </article>
  );
}
