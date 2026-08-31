// SwissAxis — Swiss-grid family (3 of 6). Engineering / consulting roles.
// Horizontal masthead with a circular portrait and right-aligned contact block,
// then a timeline main column beside a 197px sidebar. Ported from 21-swiss-axis.
// atsSafe:false, supportsPhoto:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const ACC = "#0047FF";
const INK = "#151515";
const F = '"Archivo","Helvetica Neue",Arial,sans-serif';

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const H3 = ({ t }: { t: string }) => (
  <h3 style={{ font: `600 10px/1 ${F}`, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14, color: ACC }}>
    {t}
  </h3>
);

export default function SwissAxis({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(Boolean) as string[];

  return (
    <article
      className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background: "#fff", color: INK, fontFamily: F, padding: "57px 53px 49px" }}
    >
      <header
        style={{
          display: "flex",
          gap: 30,
          alignItems: "center",
          paddingBottom: 23,
          borderBottom: "1px solid rgba(21,21,21,.18)",
        }}
      >
        <div style={{ width: 113, height: 113, borderRadius: "50%", flex: "none", overflow: "hidden", background: "#EDEFF5" }}>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", font: `700 30px ${F}`, color: "#98a0b5" }}>
              {initials(basics.fullName)}
            </div>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ font: `700 30px/1 ${F}`, letterSpacing: "-.02em", margin: 0 }}>{basics.fullName}</h1>
          {basics.role && (
            <p style={{ fontSize: 8.8, letterSpacing: ".22em", textTransform: "uppercase", color: ACC, marginTop: 10 }}>
              {basics.role}
            </p>
          )}
        </div>
        {contact.length > 0 && (
          <div style={{ marginLeft: "auto", textAlign: "right", display: "grid", gap: 5, fontSize: 9.4 }}>
            {contact.map((c, i) => (
              <span key={i} style={{ wordBreak: "break-all" }}>
                {c}
              </span>
            ))}
          </div>
        )}
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 197px", gap: 42, marginTop: 30 }}>
        <div>
          {basics.summary && (
            <div style={{ marginBottom: 25 }}>
              <H3 t={getLabel(data, "summary", "Profile")} />
              <RichTextRender html={basics.summary} as="div" style={{ fontSize: 9.8, lineHeight: 1.65 }} />
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: 25 }}>
              <H3 t={getLabel(data, "experience")} />
              <div style={{ position: "relative", paddingLeft: 34 }}>
                <div style={{ position: "absolute", left: 6, top: 8, bottom: 8, width: 1, background: "rgba(0,71,255,.4)" }} />
                {experience.map((e, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: 19 }}>
                    <span style={{ position: "absolute", left: -32, top: 4, width: 7, height: 7, borderRadius: "50%", background: ACC }} />
                    <h4 style={{ fontSize: 12, lineHeight: 1.25, margin: 0 }}>{e.role}</h4>
                    <div style={{ fontSize: 9.2, opacity: 0.68, margin: "3px 0 6px" }}>
                      {e.company}
                      {e.company && (e.startDate || e.endDate) ? "  ·  " : ""}
                      {dateRange(e.startDate, e.endDate, e.current)}
                    </div>
                    <BulletsRender bullets={e.bullets} className="swa-b" style={{ margin: 0, padding: 0, listStyle: "none" }} />
                  </div>
                ))}
              </div>
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

        <aside>
          {skills.length > 0 && (
            <div style={{ marginBottom: 25 }}>
              <H3 t={getLabel(data, "skills")} />
              {/* The source drew these as meters filled to hardcoded 95% / 84% /
                  70% for every user. CVData has no skill level, so a partial
                  fill would be a fabricated competence claim. Uniform rule. */}
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

      <style>{`.swa-b li{font-size:9.4px;line-height:1.55;padding-left:9px;position:relative;margin-bottom:2px}.swa-b li:before{content:"";position:absolute;left:0;top:5.5px;width:3px;height:3px;border-radius:50%;background:${ACC}}`}</style>
    </article>
  );
}
