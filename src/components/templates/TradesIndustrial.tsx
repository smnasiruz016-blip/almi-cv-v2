// ============================================================================
// TradesIndustrial — Electricians / Plumbers / Carpenters / Welders / HVAC.
// Warm orange + steel grey. Tool motifs, certifications prominent (licenses
// matter more than education for trades). A4: 794 × 1123 px @ 96 DPI.
// ============================================================================
"use client";

import React from "react";
import {
  TemplateProps,
  dateRange,
  getLabel,
  RichTextRender,
  isRichTextEmpty,
} from "./types";

export default function TradesIndustrial({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none"
      style={{
        background: "#F4F1ED", color: "#1F242B",
        fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55,
      }}>
      {/* HEADER — steel band with orange accent stripe */}
      <header className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2C333D 0%, #1A1F26 100%)",
          color: "#F4F1ED", padding: "40px 48px 36px",
        }}>
        <span className="absolute" style={{ top: 0, left: 0, width: 6, height: "100%", background: "#E8651F" }} />
        <span className="absolute pointer-events-none" style={{
          right: -60, top: -60, width: 220, height: 220,
          background: "radial-gradient(circle, rgba(232,101,31,0.28), transparent 70%)",
        }} />
        <div className="relative">
          <p className="m-0 mb-3 uppercase" style={{
            fontSize: "9pt", fontWeight: 700, letterSpacing: "0.28em",
            color: "#E8651F",
          }}>Licensed Tradesperson</p>
          <h1 className="m-0" style={{
            fontWeight: 800, fontSize: "40pt", lineHeight: 1,
            letterSpacing: "-0.025em", textTransform: "uppercase",
          }}>
            {basics.fullName}
          </h1>
          <p className="m-0 mt-3" style={{
            fontSize: "14pt", color: "#E8651F",
            fontWeight: 600, letterSpacing: "0.06em",
          }}>
            {basics.role}
          </p>
          <div className="flex flex-wrap gap-y-1 gap-x-5 mt-5 text-[9.5pt]"
            style={{ color: "rgba(244,241,237,0.85)" }}>
            {basics.email && <span>✉  {basics.email}</span>}
            {basics.phone && <span>☎  {basics.phone}</span>}
            {basics.location && <span>⚲  {basics.location}</span>}
            {basics.website && <span>⌘  {basics.website}</span>}
            {basics.linkedIn && <span>⌘  {basics.linkedIn}</span>}
          </div>
        </div>
      </header>

      {/* TOOL STRIP */}
      <div className="flex items-center justify-between" style={{
        background: "#E8651F", color: "#F4F1ED",
        padding: "8px 48px", fontSize: "9pt",
        fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase",
      }}>
        <span>● Insured</span>
        <span>● Background-Checked</span>
        <span>● Drug-Tested</span>
        <span>● OSHA 30</span>
      </div>

      <div style={{ padding: "32px 48px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Section title={getLabel(data, "profile")} accent="#E8651F">
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[10.5pt]"
              style={{ color: "#1F242B", textWrap: "pretty" }}
            />
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title={`Licenses & ${getLabel(data, "certifications")}`} accent="#E8651F">
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {certifications.map((c, i) => (
                <div key={i} className="bg-white" style={{
                  border: "1px solid rgba(31,36,43,0.12)",
                  borderLeft: "3px solid #E8651F",
                  padding: "10px 14px",
                }}>
                  <div className="font-bold text-[10.5pt]" style={{ color: "#1F242B" }}>{c.name}</div>
                  <div className="text-[9pt] mt-px" style={{ color: "#5A6573" }}>
                    {[c.issuer, c.year].filter(Boolean).join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={`Work ${getLabel(data, "experience")}`} accent="#E8651F">
            {experience.map((w, i) => (
              <div key={i} className="mb-4 last:mb-0 relative" style={{
                paddingLeft: 18, borderLeft: "2px solid rgba(232,101,31,0.3)",
              }}>
                <span className="absolute" style={{
                  left: -7, top: 8, width: 12, height: 12,
                  background: "#E8651F", borderRadius: 2,
                  transform: "rotate(45deg)",
                }} />
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[11.5pt]" style={{ color: "#1F242B" }}>{w.role}</p>
                    <p className="m-0 text-[10pt] font-semibold" style={{ color: "#E8651F" }}>{w.company}</p>
                  </div>
                  <span className="text-[9pt] font-semibold whitespace-nowrap" style={{ color: "#5A6573" }}>
                    {dateRange(w.startDate, w.endDate)}
                  </span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-0 list-none text-[10pt]" style={{ color: "#3B424A" }}>
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 16 }}>
                          <span className="absolute" style={{ left: 0, color: "#E8651F", fontWeight: 700 }}>▸</span>
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
          <Section title={`Notable ${getLabel(data, "projects")}`} accent="#E8651F">
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {projects.map((p, i) => (
                <div key={i} className="bg-white" style={{
                  border: "1px solid rgba(31,36,43,0.12)",
                  borderLeft: "3px solid #E8651F",
                  padding: "10px 14px",
                }}>
                  <div className="font-bold text-[10.5pt]" style={{ color: "#1F242B" }}>{p.name}</div>
                  <div className="text-[9pt] mt-px" style={{ color: "#3B424A" }}>{p.description}</div>
                  {p.url && (
                    <div className="text-[9pt] mt-px italic" style={{ color: "#5A6573" }}>{p.url}</div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title={`${getLabel(data, "skills")} & Equipment`} accent="#E8651F">
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 14).map((s, i) => (
                  <span key={i} className="bg-white" style={{
                    padding: "4px 11px", fontSize: "9.5pt", fontWeight: 600,
                    color: "#1F242B",
                    border: "1px solid rgba(31,36,43,0.18)",
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          <div>
            {education.length > 0 && (
              <Section title={`Training & ${getLabel(data, "education")}`} accent="#E8651F">
                {education.map((e, i) => (
                  <div key={i} className="mb-2 last:mb-0">
                    <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#1F242B" }}>{e.degree}</p>
                    <p className="m-0 text-[10pt]" style={{ color: "#E8651F", fontWeight: 600 }}>{e.school}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#5A6573" }}>
                      {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                    </p>
                  </div>
                ))}
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages")} accent="#E8651F">
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F242B" }}>
                  {languages.map((l, i) => (
                    <li key={i} className="mb-0.5">
                      <b className="font-bold">{l.name}</b>
                      <span style={{ color: "#5A6573" }}> — {l.level}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {awards.length > 0 && (
              <Section title={getLabel(data, "awards")} accent="#E8651F">
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F242B" }}>
                  {awards.map((a, i) => (
                    <li key={i} className="mb-0.5">
                      <b className="font-bold">{a.title}</b>
                      {a.issuer && <span style={{ color: "#5A6573" }}> — {a.issuer}</span>}
                      {a.year && <span style={{ color: "#5A6573" }}>, {a.year}</span>}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {interests.length > 0 && (
              <Section title={getLabel(data, "interests")} accent="#E8651F">
                <p className="m-0 text-[10pt]" style={{ color: "#3B424A" }}>
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

function Section({ title, children, accent }: {
  title: string; children: React.ReactNode; accent: string;
}) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 uppercase" style={{
        fontSize: "10.5pt", fontWeight: 800, letterSpacing: "0.18em",
        color: "#1F242B", paddingBottom: 6,
        borderBottom: `3px solid ${accent}`,
      }}>{title}</h2>
      {children}
    </section>
  );
}
