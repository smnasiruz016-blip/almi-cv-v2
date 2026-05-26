// ============================================================================
// ManufacturingPrecise — Production Supervisors / Quality / Six Sigma /
// Plant Managers / Process Engineers. Industrial blue, metric tiles,
// ISO/Lean certifications prominent. A4: 794 × 1123 px @ 96 DPI.
// ============================================================================
"use client";

import React from "react";
import {
  TemplateProps,
  dateRange,
  initials,
  getLabel,
  RichTextRender,
  isRichTextEmpty,
} from "./types";

export default function ManufacturingPrecise({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  // Treat first 3 skills as headline metrics if they look numeric (heuristic).
  const isMetric = (s: string) => /[0-9%$x]/i.test(s);
  const metrics = skills.filter(isMetric).slice(0, 3);
  const otherSkills = skills.filter((s) => !metrics.includes(s));

  return (
    <article className="w-[794px] min-h-[1123px] bg-white print:shadow-none"
      style={{ color: "#0F1E33", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.5 }}>

      {/* HEADER */}
      <header className="grid items-center gap-7" style={{
        gridTemplateColumns: "1fr 110px",
        padding: "38px 48px 28px",
        background: "linear-gradient(135deg, #0F1E33 0%, #1F3B5F 100%)",
        color: "#FFFFFF",
        position: "relative", overflow: "hidden",
      }}>
        {/* schematic grid backdrop */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(180,210,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,210,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(180deg, #000 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 100%)",
        }} />
        <div className="relative">
          <p className="m-0 mb-2 uppercase" style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "9pt", letterSpacing: "0.18em", color: "#5BB4F2",
          }}>// PRODUCTION_PROFILE</p>
          <h1 className="m-0" style={{
            fontWeight: 800, fontSize: "34pt", lineHeight: 1, letterSpacing: "-0.02em",
          }}>{basics.fullName}</h1>
          <p className="m-0 mt-2 uppercase" style={{
            fontSize: "11pt", color: "#5BB4F2", fontWeight: 700, letterSpacing: "0.16em",
          }}>{basics.role}</p>
          <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3.5 text-[9.5pt]" style={{
            color: "rgba(255,255,255,0.78)", fontFamily: '"JetBrains Mono", monospace',
          }}>
            {basics.email && <span>{basics.email}</span>}
            {basics.phone && <span>· {basics.phone}</span>}
            {basics.location && <span>· {basics.location}</span>}
            {basics.website && <span>· {basics.website}</span>}
            {basics.linkedIn && <span>· {basics.linkedIn}</span>}
          </div>
        </div>
        <div className="relative flex items-center justify-center" style={{
          width: 110, height: 110, borderRadius: "50%",
          background: "rgba(91,180,242,0.18)", border: "2px solid #5BB4F2",
          color: "#FFFFFF", fontWeight: 800, fontSize: "32pt", letterSpacing: "-0.02em",
        }}>{initials(basics.fullName)}</div>
      </header>

      {/* METRIC TILES */}
      {metrics.length > 0 && (
        <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}>
          {metrics.map((m, i) => {
            const parts = m.split(/[—:·-]/);
            const top = parts[0]?.trim() ?? m;
            const bot = parts.slice(1).join(" ").trim();
            return (
              <div key={i} style={{
                padding: "16px 18px",
                background: i % 2 === 0 ? "#F2F5F9" : "#E6ECF3",
                borderRight: i < metrics.length - 1 ? "1px solid #D5DDE7" : "0",
              }}>
                <div style={{ fontWeight: 800, fontSize: "20pt", color: "#0F1E33", lineHeight: 1 }}>{top}</div>
                {bot && <div className="mt-1 uppercase" style={{
                  fontSize: "8.5pt", letterSpacing: "0.16em",
                  color: "#1F3B5F", fontWeight: 600,
                }}>{bot}</div>}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ padding: "28px 48px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Section title={getLabel(data, "profile")}>
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[10.5pt]"
              style={{ color: "#0F1E33", textWrap: "pretty" }}
            />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience")}>
            {experience.map((w, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[11.5pt]" style={{ color: "#0F1E33" }}>{w.role}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#1F3B5F" }}>{w.company}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt]" style={{
                    fontFamily: '"JetBrains Mono", monospace', color: "#5A6B82",
                  }}>{dateRange(w.startDate, w.endDate)}</span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-0 list-none text-[10pt]" style={{ color: "#2A3D55" }}>
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 18 }}>
                          <span className="absolute font-bold" style={{ left: 0, color: "#5BB4F2" }}>›</span>
                          <RichTextRender html={b} as="span" />
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title={`Key ${getLabel(data, "projects")}`}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#0F1E33" }}>
                  {p.name}
                  {p.url && (
                    <span className="ml-2 font-normal text-[9.5pt]" style={{ color: "#5A6B82", fontFamily: '"JetBrains Mono", monospace' }}>
                      {p.url}
                    </span>
                  )}
                </p>
                <p className="m-0 text-[10pt]" style={{ color: "#2A3D55" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {certifications.length > 0 && (
            <Section title={`${getLabel(data, "certifications")} & Standards`}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#0F1E33" }}>
                {certifications.map((c, i) => (
                  <li key={i} className="flex items-baseline gap-2" style={{ padding: "3px 0" }}>
                    <span style={{
                      flexShrink: 0, padding: "1px 8px", borderRadius: 3,
                      fontSize: "8.5pt", fontWeight: 700, letterSpacing: "0.06em",
                      background: "#0F1E33", color: "#5BB4F2",
                      fontFamily: '"JetBrains Mono", monospace',
                    }}>{c.year || "—"}</span>
                    <span>
                      <b className="font-bold">{c.name}</b>
                      {c.issuer && <span style={{ color: "#5A6B82" }}> · {c.issuer}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {otherSkills.length > 0 && (
            <Section title={`Technical ${getLabel(data, "skills")}`}>
              <div className="flex flex-wrap gap-1.5">
                {otherSkills.map((s, i) => (
                  <span key={i} style={{
                    padding: "3px 10px", fontSize: "9.5pt", fontWeight: 600,
                    color: "#0F1E33", background: "#F2F5F9",
                    border: "1px solid #D5DDE7", borderRadius: 3,
                  }}>{s}</span>
                ))}
              </div>
            </Section>
          )}
        </div>

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#0F1E33" }}>{e.degree}</p>
                  <p className="m-0 text-[10pt] font-semibold" style={{ color: "#1F3B5F" }}>{e.school}</p>
                  <p className="m-0 text-[9pt]" style={{ color: "#5A6B82", fontFamily: '"JetBrains Mono", monospace' }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}
          {languages.length > 0 && (
            <Section title={getLabel(data, "languages")}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#0F1E33" }}>
                {languages.map((l, i) => (
                  <li key={i}>
                    <b className="font-bold">{l.name}</b>
                    <span style={{ color: "#5A6B82" }}> — {l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {awards.length > 0 && (
            <Section title={getLabel(data, "awards")}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#0F1E33" }}>
                {awards.map((a, i) => (
                  <li key={i} className="flex items-baseline gap-2" style={{ padding: "3px 0" }}>
                    <span style={{
                      flexShrink: 0, padding: "1px 8px", borderRadius: 3,
                      fontSize: "8.5pt", fontWeight: 700, letterSpacing: "0.06em",
                      background: "#0F1E33", color: "#5BB4F2",
                      fontFamily: '"JetBrains Mono", monospace',
                    }}>{a.year || "—"}</span>
                    <span>
                      <b className="font-bold">{a.title}</b>
                      {a.issuer && <span style={{ color: "#5A6B82" }}> · {a.issuer}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {interests.length > 0 && (
            <Section title={getLabel(data, "interests")}>
              <p className="m-0 text-[10pt]" style={{ color: "#2A3D55" }}>
                {interests.join(" · ")}
              </p>
            </Section>
          )}
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 uppercase" style={{
        fontSize: "10.5pt", fontWeight: 800, letterSpacing: "0.18em",
        color: "#0F1E33", paddingBottom: 6,
        borderBottom: "2px solid #5BB4F2",
      }}>{title}</h2>
      {children}
    </section>
  );
}
