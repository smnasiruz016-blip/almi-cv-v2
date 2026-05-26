// ============================================================================
// CreativePortfolio — Graphic Designers / Illustrators / 3D Artists / Motion.
// Portfolio-variant of CreativeDirector — more space for visual work samples,
// less hero, asymmetric grid. Mustard + cream + plum. Distinct personality.
// A4: 794 × 1123 px @ 96 DPI.
// ============================================================================
"use client";

import React from "react";
import {
  TemplateProps,
  dateRange,
  getLabel,
  RichTextRender,
  isRichTextEmpty,
  stripRichText,
} from "./types";

export default function CreativePortfolio({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none relative"
      style={{ background: "#FBF6EB", color: "#2A2018", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* big number watermark */}
      <span aria-hidden style={{
        position: "absolute", top: 28, right: 32,
        fontFamily: '"Fraunces", "DM Serif Display", serif',
        fontSize: "180pt", fontWeight: 500, lineHeight: 0.85,
        color: "rgba(212, 162, 76, 0.18)", letterSpacing: "-0.04em",
        pointerEvents: "none", userSelect: "none",
      }}>01</span>

      {/* HEADER block */}
      <header className="relative" style={{ padding: "56px 56px 22px" }}>
        <p className="m-0 mb-2 uppercase" style={{
          fontSize: "9pt", letterSpacing: "0.32em", color: "#D4A24C", fontWeight: 700,
        }}>● Portfolio · 2026 ●</p>
        <h1 className="m-0" style={{
          fontFamily: '"Fraunces", "DM Serif Display", serif', fontWeight: 500,
          fontSize: "56pt", lineHeight: 0.94, letterSpacing: "-0.025em", color: "#2A2018",
        }}>{basics.fullName}</h1>
        <div className="flex items-baseline gap-3 mt-3">
          <span style={{ width: 32, height: 2, background: "#2A2018", marginBottom: 6 }} />
          <p className="m-0 italic" style={{
            fontFamily: '"Fraunces", serif', fontSize: "18pt", color: "#D4A24C", fontWeight: 500,
          }}>{basics.role}</p>
        </div>
      </header>

      {/* contact bar */}
      <div className="grid grid-cols-4 gap-0 relative" style={{
        margin: "10px 56px 0", borderTop: "1px solid #2A2018",
      }}>
        <ContactCell label="Email" value={basics.email} />
        <ContactCell label="Phone" value={basics.phone} />
        <ContactCell label="Location" value={basics.location} />
        <ContactCell label="Portfolio" value={basics.website || basics.linkedIn} />
      </div>

      <div style={{ padding: "30px 56px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          // Pull-quote treatment — strip RichText so quote marks don't compete with HTML emphasis.
          <p className="m-0 mb-7" style={{
            fontSize: "13pt", color: "#2A2018", lineHeight: 1.55, maxWidth: 540,
            fontFamily: '"Fraunces", serif', fontStyle: "italic", textWrap: "pretty",
          }}>"{stripRichText(basics.summary ?? "")}"</p>
        )}

        {/* WORK SAMPLES grid — asymmetric tiles. Prefers projects, falls back to skills. */}
        {(projects.length > 0 || skills.length > 0) && (
          <Section title={projects.length > 0 ? getLabel(data, "projects") : "Work"} number="02">
            {projects.length > 0 ? (
              <div className="grid gap-2" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
                {projects.slice(0, 6).map((p, i) => {
                  const palette = ["#2A2018", "#D4A24C", "#A8442E", "#FBF6EB", "#6B4E2E", "#E6C77F"];
                  const fg = i === 3 ? "#2A2018" : "#FBF6EB";
                  return (
                    <div key={i} style={{
                      aspectRatio: i === 0 ? "2.1 / 1" : "1 / 1",
                      background: palette[i % palette.length],
                      color: fg, padding: "16px 18px",
                      display: "flex", alignItems: "flex-end",
                      gridColumn: i === 0 ? "1 / 3" : undefined,
                      gridRow: i === 0 ? "1 / span 2" : undefined,
                      border: i === 3 ? "1px solid rgba(42,32,24,0.15)" : "0",
                    }}>
                      <div>
                        <div style={{
                          fontFamily: '"Fraunces", serif',
                          fontWeight: 600, fontSize: i === 0 ? "20pt" : "13pt",
                          lineHeight: 1.1, letterSpacing: "-0.01em",
                        }}>{p.name}</div>
                        {p.description && (
                          <div className="mt-1" style={{
                            fontSize: i === 0 ? "10pt" : "8.5pt",
                            lineHeight: 1.3, opacity: 0.85,
                            fontFamily: "Inter, sans-serif",
                          }}>{p.description}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-2" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
                {skills.slice(0, 6).map((s, i) => {
                  const palette = ["#2A2018", "#D4A24C", "#A8442E", "#FBF6EB", "#6B4E2E", "#E6C77F"];
                  const fg = i === 3 ? "#2A2018" : "#FBF6EB";
                  return (
                    <div key={i} style={{
                      aspectRatio: i === 0 ? "2.1 / 1" : "1 / 1",
                      background: palette[i % palette.length],
                      color: fg, padding: "16px 18px",
                      display: "flex", alignItems: "flex-end",
                      gridColumn: i === 0 ? "1 / 3" : undefined,
                      gridRow: i === 0 ? "1 / span 2" : undefined,
                      border: i === 3 ? "1px solid rgba(42,32,24,0.15)" : "0",
                    }}>
                      <div>
                        <div style={{
                          fontFamily: '"Fraunces", serif',
                          fontWeight: 600, fontSize: i === 0 ? "20pt" : "13pt",
                          lineHeight: 1.1, letterSpacing: "-0.01em",
                        }}>{s}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience")} number="03">
            {experience.map((w, i) => (
              <div key={i} className="mb-3.5 last:mb-0 grid items-baseline"
                style={{ gridTemplateColumns: "100px 1fr", gap: 18 }}>
                <span className="text-[9pt] font-semibold uppercase" style={{
                  color: "#D4A24C", letterSpacing: "0.06em", paddingTop: 2,
                }}>{dateRange(w.startDate, w.endDate)}</span>
                <div>
                  <p className="m-0 font-semibold text-[12pt]" style={{
                    fontFamily: '"Fraunces", serif', color: "#2A2018",
                  }}>
                    {w.role}
                    <span className="font-normal italic" style={{ color: "#6B4E2E" }}>
                      {" — "}{w.company}
                    </span>
                  </p>
                  {w.bullets.length > 0 && (
                    <ul className="m-0 mt-1 pl-0 list-none text-[10pt]" style={{ color: "#3B2F22" }}>
                      {w.bullets.map((b, j) =>
                        isRichTextEmpty(b) ? null : (
                          <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 14 }}>
                            <span className="absolute" style={{ left: 0, color: "#D4A24C" }}>—</span>
                            <RichTextRender html={b} as="span" />
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && skills.length > 0 && (
          <Section title={getLabel(data, "skills")} number="04">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span key={i} className="text-[9.5pt] font-semibold"
                  style={{
                    padding: "3px 10px",
                    color: "#2A2018",
                    border: "1px solid rgba(42,32,24,0.18)",
                  }}>{s}</span>
              ))}
            </div>
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education")} number="05">
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-semibold text-[10.5pt]" style={{
                    fontFamily: '"Fraunces", serif', color: "#2A2018",
                  }}>{e.degree}</p>
                  <p className="m-0 italic text-[9.5pt]" style={{ color: "#6B4E2E" }}>{e.school}</p>
                  <p className="m-0 text-[8.5pt]" style={{ color: "#8A7456" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}
          {(awards.length > 0 || certifications.length > 0) && (
            <Section title={awards.length > 0 ? getLabel(data, "awards") : getLabel(data, "certifications")} number="06">
              <ul className="m-0 p-0 list-none text-[9.5pt]" style={{ color: "#2A2018" }}>
                {awards.slice(0, 5).map((a, i) => (
                  <li key={`a-${i}`} className="mb-1">
                    <b className="font-semibold">{a.title}</b>
                    {a.year && <span style={{ color: "#8A7456" }}> · {a.year}</span>}
                  </li>
                ))}
                {certifications.slice(0, 5 - awards.slice(0, 5).length).map((c, i) => (
                  <li key={`c-${i}`} className="mb-1">
                    <b className="font-semibold">{c.name}</b>
                    {c.year && <span style={{ color: "#8A7456" }}> · {c.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {(languages.length > 0 || interests.length > 0) && (
            <Section title={languages.length > 0 ? getLabel(data, "languages") : getLabel(data, "interests")} number="07">
              {languages.length > 0 && (
                <ul className="m-0 p-0 list-none text-[9.5pt]" style={{ color: "#2A2018" }}>
                  {languages.map((l, i) => (
                    <li key={i} className="mb-0.5">
                      <b className="font-semibold">{l.name}</b>
                      <span style={{ color: "#8A7456" }}> — {l.level}</span>
                    </li>
                  ))}
                </ul>
              )}
              {interests.length > 0 && (
                <p className="m-0 mt-1 text-[9.5pt] italic" style={{ color: "#6B4E2E" }}>
                  {interests.join(" · ")}
                </p>
              )}
            </Section>
          )}
        </div>
      </div>
    </article>
  );
}

function ContactCell({ label, value }: { label: string; value?: string }) {
  if (!value) return <div />;
  return (
    <div style={{ padding: "10px 12px 10px 0", borderRight: "1px solid rgba(42,32,24,0.12)" }}>
      <div className="uppercase" style={{
        fontSize: "7.5pt", letterSpacing: "0.18em",
        color: "#D4A24C", fontWeight: 700,
      }}>{label}</div>
      <div className="mt-0.5 text-[9.5pt]" style={{ color: "#2A2018", wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

function Section({ title, number, children }: {
  title: string; number: string; children: React.ReactNode;
}) {
  return (
    <section className="mb-7 last:mb-0">
      <h2 className="m-0 mb-4 flex items-baseline gap-3" style={{
        fontFamily: '"Fraunces", serif',
        fontWeight: 500, fontSize: "22pt", color: "#2A2018", letterSpacing: "-0.015em",
      }}>
        <span style={{
          fontFamily: '"Fraunces", serif', fontSize: "11pt",
          color: "#D4A24C", fontWeight: 600, letterSpacing: "0.1em",
        }}>{number} ·</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
