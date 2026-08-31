// SwissHairline — Swiss-grid family (1 of 6). Design-systems / product roles.
// Label-column rows separated by hairlines, square portrait, red accent.
// Ported from the 45-template A4 HTML library (19-swiss-hairline). mm converted
// to px at 96dpi so the A4 proportions survive the house 794x1123 sheet.
// atsSafe:true, supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const ACC = "#E1140A";
const INK = "#151515";
const F = '"Archivo","Helvetica Neue",Arial,sans-serif';

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Row = ({ t, children, last }: { t: string; children: React.ReactNode; last?: boolean }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "121px 1fr",
      gap: 30,
      padding: "19px 0",
      borderBottom: last ? "none" : "1px solid rgba(21,21,21,.15)",
    }}
  >
    <h3 style={{ font: `600 9.4px/1.3 ${F}`, letterSpacing: ".16em", textTransform: "uppercase", color: ACC, margin: 0 }}>
      {t}
    </h3>
    <div>{children}</div>
  </div>
);

export default function SwissHairline({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];

  return (
    <article
      className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background: "#fff", color: INK, fontFamily: F, padding: "57px 53px 49px" }}
    >
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 117px",
          gap: 30,
          alignItems: "end",
          borderBottom: `2.5px solid ${INK}`,
          paddingBottom: 19,
        }}
      >
        <div>
          <h1 style={{ font: `700 33px/.96 ${F}`, letterSpacing: "-.025em", margin: 0 }}>{basics.fullName}</h1>
          {basics.role && (
            <p style={{ fontSize: 8.8, letterSpacing: ".24em", textTransform: "uppercase", marginTop: 11, color: ACC }}>
              {basics.role}
            </p>
          )}
        </div>
        <div style={{ width: 117, height: 147, background: "#EFEFEF", overflow: "hidden" }}>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", font: `700 30px ${F}`, color: "#9a9a9a" }}>
              {initials(basics.fullName)}
            </div>
          )}
        </div>
      </header>

      {basics.summary && (
        <Row t={getLabel(data, "summary", "Profile")}>
          <RichTextRender html={basics.summary} as="div" style={{ fontSize: 9.8, lineHeight: 1.65 }} />
        </Row>
      )}

      {experience.length > 0 && (
        <Row t={getLabel(data, "experience")}>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: i === experience.length - 1 ? 0 : 16 }}>
              <h4 style={{ fontSize: 12, lineHeight: 1.25, margin: 0 }}>{e.role}</h4>
              <div style={{ fontSize: 9.2, opacity: 0.68, margin: "3px 0 6px", letterSpacing: ".02em" }}>
                {e.company}
                {e.company && (e.startDate || e.endDate) ? "  ·  " : ""}
                {dateRange(e.startDate, e.endDate, e.current)}
              </div>
              <BulletsRender bullets={e.bullets} className="swh-b" style={{ margin: 0, padding: 0, listStyle: "none" }} />
            </div>
          ))}
        </Row>
      )}

      {education.length > 0 && (
        <Row t={getLabel(data, "education")}>
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: i === education.length - 1 ? 0 : 16 }}>
              <h4 style={{ fontSize: 12, lineHeight: 1.25, margin: 0 }}>{e.degree}</h4>
              <div style={{ fontSize: 9.2, opacity: 0.68, marginTop: 3, letterSpacing: ".02em" }}>
                {e.school}
                {e.school && (e.startDate || e.endDate) ? "  ·  " : ""}
                {dateRange(e.startDate, e.endDate)}
                {e.notes ? `  ·  ${e.notes}` : ""}
              </div>
            </div>
          ))}
        </Row>
      )}

      {skills.length > 0 && (
        <Row t={getLabel(data, "skills")}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {skills.map((s, i) => (
              <span key={i} style={{ fontSize: 8.8, padding: "3px 8px", borderRadius: 2, background: "#EFEFEF" }}>
                {s}
              </span>
            ))}
          </div>
        </Row>
      )}

      {(contact.length > 0 || languages.length > 0) && (
        <Row t={getLabel(data, "contact", "Details")} last>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px 30px" }}>
            <div style={{ display: "grid", gap: 7.5, fontSize: 9.4 }}>
              {contact.map((c, i) => (
                <span key={i} style={{ wordBreak: "break-all" }}>
                  {c}
                </span>
              ))}
            </div>
            {languages.length > 0 && (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {languages.map((l, i) => (
                  <li key={i} style={{ fontSize: 9.4, lineHeight: 1.7 }}>
                    <strong>{l.name}</strong>
                    {l.level ? ` — ${l.level}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Row>
      )}

      <style>{`.swh-b li{font-size:9.4px;line-height:1.55;padding-left:9px;position:relative;margin-bottom:2px}.swh-b li:before{content:"";position:absolute;left:0;top:5.5px;width:3px;height:3px;border-radius:50%;background:${ACC}}`}</style>
    </article>
  );
}
