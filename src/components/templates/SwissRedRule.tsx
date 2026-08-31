// SwissRedRule — Swiss-grid family (5 of 6). Communications / brand / PR roles.
// Full-bleed red hero band carrying a square portrait and the summary, then a
// two-column body. Ported from 23-swiss-red-rule. atsSafe:false, supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const ACC = "#E1140A";
const INK = "#151515";
const F = '"Archivo","Helvetica Neue",Arial,sans-serif';

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const H3 = ({ t }: { t: string }) => (
  <h3 style={{ font: `600 10px/1 ${F}`, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14, color: ACC }}>
    {t}
  </h3>
);

export default function SwissRedRule({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];

  return (
    <article
      className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background: "#fff", color: INK, fontFamily: F }}
    >
      <div style={{ background: ACC, color: "#fff", padding: "53px 45px", display: "flex", gap: 34, alignItems: "center" }}>
        <div style={{ width: 140, height: 140, flex: "none", overflow: "hidden", boxShadow: "0 0 0 4px rgba(255,255,255,.28)", background: "rgba(255,255,255,.15)" }}>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", font: `700 38px ${F}`, color: "rgba(255,255,255,.75)" }}>
              {initials(basics.fullName)}
            </div>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ font: `700 31px/1 ${F}`, letterSpacing: "-.01em", textTransform: "uppercase", margin: 0 }}>
            {basics.fullName}
          </h1>
          {basics.role && (
            <p style={{ fontSize: 9, letterSpacing: ".24em", textTransform: "uppercase", marginTop: 11, opacity: 0.9 }}>
              {basics.role}
            </p>
          )}
          {basics.summary && (
            <RichTextRender
              html={basics.summary}
              as="div"
              style={{ fontSize: 9.2, lineHeight: 1.6, opacity: 0.92, marginTop: 13, maxWidth: 397 }}
            />
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 212px", gap: 42, padding: 45 }}>
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
                  <BulletsRender bullets={e.bullets} className="swr-b" style={{ margin: 0, padding: 0, listStyle: "none" }} />
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

        <aside style={{ borderLeft: "1px solid rgba(21,21,21,.14)", paddingLeft: 30 }}>
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {skills.map((s, i) => (
                  <span key={i} style={{ fontSize: 8.8, padding: "3px 8px", borderRadius: 0, background: "#F0F0F0" }}>
                    {s}
                  </span>
                ))}
              </div>
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

      <style>{`.swr-b li{font-size:9.4px;line-height:1.55;padding-left:9px;position:relative;margin-bottom:2px}.swr-b li:before{content:"";position:absolute;left:0;top:5.5px;width:3px;height:3px;border-radius:50%;background:${ACC}}`}</style>
    </article>
  );
}
