// ============================================================================
// PublicServiceHonor — Police / Firefighters / Paramedics / Military /
// Federal Agents / Correctional Officers. Deep navy + service red accent.
// Service awards & medals as honored entries. Dignified, ATS-clean.
// A4: 794 × 1123 px @ 96 DPI.
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

export default function PublicServiceHonor({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] bg-white print:shadow-none"
      style={{ color: "#0F1B33", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* HEADER — flag-inspired band */}
      <header className="relative" style={{
        background: "#0F1B33", color: "#F5F7FB", padding: "40px 48px 32px",
      }}>
        <span className="absolute" style={{ top: 0, left: 0, right: 0, height: 4, background: "#B7273A" }} />
        <span className="absolute" style={{ bottom: 0, left: 0, right: 0, height: 2, background: "#B7273A" }} />
        <div className="grid items-center gap-7" style={{ gridTemplateColumns: "104px 1fr" }}>
          {/* shield emblem */}
          <div className="flex items-center justify-center relative" style={{
            width: 104, height: 120,
          }}>
            <svg viewBox="0 0 100 116" xmlns="http://www.w3.org/2000/svg" style={{ width: 104, height: 120 }}>
              <defs>
                <linearGradient id="psh-shield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F2F4F" /><stop offset="100%" stopColor="#0F1B33" />
                </linearGradient>
              </defs>
              <path d="M 50 4 L 94 18 L 94 60 C 94 84 76 102 50 112 C 24 102 6 84 6 60 L 6 18 Z"
                fill="url(#psh-shield)" stroke="#B7273A" strokeWidth="2" />
              <text x="50" y="68" textAnchor="middle" fill="#F5F7FB" fontWeight="800"
                fontSize="32" fontFamily="Inter, sans-serif" letterSpacing="-0.02em">
                {initials(basics.fullName)}
              </text>
              <line x1="22" y1="82" x2="78" y2="82" stroke="#B7273A" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <p className="m-0 mb-2 uppercase" style={{
              fontSize: "9pt", letterSpacing: "0.32em",
              color: "#E9B4BB", fontWeight: 700,
            }}>★ Sworn Service ★</p>
            <h1 className="m-0" style={{
              fontWeight: 800, fontSize: "36pt", lineHeight: 1,
              letterSpacing: "-0.02em", textTransform: "uppercase",
            }}>{basics.fullName}</h1>
            <p className="m-0 mt-2" style={{
              fontSize: "12pt", color: "#E9B4BB",
              fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
            }}>{basics.role}</p>
            <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3 text-[9.5pt]" style={{
              color: "rgba(245,247,251,0.82)",
            }}>
              {basics.email && <span>{basics.email}</span>}
              {basics.phone && <span>· {basics.phone}</span>}
              {basics.location && <span>· {basics.location}</span>}
              {basics.website && <span>· {basics.website}</span>}
              {basics.linkedIn && <span>· {basics.linkedIn}</span>}
            </div>
          </div>
        </div>
      </header>

      <div style={{ padding: "30px 48px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Section title="Statement of Service">
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[10.5pt]"
              style={{ color: "#0F1B33", textAlign: "justify", lineHeight: 1.6, textWrap: "pretty" }}
            />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={`Service ${getLabel(data, "experience")}`}>
            {experience.map((w, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[11.5pt] uppercase" style={{ color: "#0F1B33", letterSpacing: "0.02em" }}>{w.role}</p>
                    <p className="m-0 text-[10pt] font-semibold" style={{ color: "#B7273A" }}>{w.company}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt] font-semibold" style={{ color: "#3B475D" }}>
                    {dateRange(w.startDate, w.endDate)}
                  </span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-0 list-none text-[10pt]" style={{ color: "#2A3754" }}>
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 18 }}>
                          <span className="absolute" style={{ left: 0, color: "#B7273A" }}>★</span>
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

        {(awards.length > 0 || certifications.length > 0) && (
          <Section title={`Honors, ${getLabel(data, "awards")} & ${getLabel(data, "certifications")}`}>
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {awards.map((a, i) => (
                <div key={`a-${i}`} className="flex items-start gap-3" style={{
                  padding: "10px 12px",
                  background: "#F4F6FB",
                  border: "1px solid #D5DDE9",
                  borderLeft: "3px solid #B7273A",
                }}>
                  <span style={{ color: "#B7273A", fontSize: "16pt", lineHeight: 1, flexShrink: 0 }}>★</span>
                  <div>
                    <div className="font-bold text-[10pt] uppercase" style={{ color: "#0F1B33", letterSpacing: "0.04em" }}>{a.title}</div>
                    {(a.issuer || a.year) && (
                      <div className="text-[9pt] mt-px" style={{ color: "#3B475D" }}>
                        {[a.issuer, a.year].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {certifications.map((c, i) => (
                <div key={`c-${i}`} className="flex items-start gap-3" style={{
                  padding: "10px 12px",
                  background: "#F4F6FB",
                  border: "1px solid #D5DDE9",
                  borderLeft: "3px solid #B7273A",
                }}>
                  <span style={{ color: "#B7273A", fontSize: "16pt", lineHeight: 1, flexShrink: 0 }}>★</span>
                  <div>
                    <div className="font-bold text-[10pt] uppercase" style={{ color: "#0F1B33", letterSpacing: "0.04em" }}>{c.name}</div>
                    {(c.issuer || c.year) && (
                      <div className="text-[9pt] mt-px" style={{ color: "#3B475D" }}>
                        {[c.issuer, c.year].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title={`Special ${getLabel(data, "projects")}`}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-bold text-[10.5pt] uppercase" style={{ color: "#0F1B33", letterSpacing: "0.02em" }}>
                  {p.name}
                  {p.url && <span className="ml-2 text-[9pt] font-normal normal-case" style={{ color: "#3B475D" }}>{p.url}</span>}
                </p>
                <p className="m-0 text-[10pt]" style={{ color: "#2A3754" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={`Training & ${getLabel(data, "education")}`}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-bold text-[10.5pt] uppercase" style={{ color: "#0F1B33" }}>{e.degree}</p>
                  <p className="m-0 text-[10pt] font-semibold" style={{ color: "#B7273A" }}>{e.school}</p>
                  <p className="m-0 text-[9pt]" style={{ color: "#3B475D" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}

          <div>
            {skills.length > 0 && (
              <Section title="Competencies">
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#0F1B33" }}>
                  {skills.slice(0, 10).map((s, i) => (
                    <li key={i} className="relative" style={{ paddingLeft: 16, marginBottom: 2 }}>
                      <span className="absolute" style={{ left: 0, color: "#B7273A" }}>★</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#0F1B33" }}>
                  {languages.map((l, i) => (
                    <li key={i}>
                      <b className="font-bold">{l.name}</b>
                      <span style={{ color: "#3B475D" }}> — {l.level}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {interests.length > 0 && (
              <Section title={getLabel(data, "interests")}>
                <p className="m-0 text-[10pt]" style={{ color: "#2A3754" }}>
                  {interests.join(" · ")}
                </p>
              </Section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 uppercase text-center" style={{
        fontSize: "11pt", fontWeight: 800, letterSpacing: "0.22em",
        color: "#0F1B33", paddingBottom: 8, position: "relative",
      }}>
        <span style={{ color: "#B7273A", marginRight: 12 }}>★</span>
        {title}
        <span style={{ color: "#B7273A", marginLeft: 12 }}>★</span>
        <span style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: 80, height: 2, background: "#B7273A",
        }} />
      </h2>
      {children}
    </section>
  );
}
