// ============================================================================
// ServiceFriendly — Waiters / Bartenders / Servers / Hosts / Baristas /
// Retail Associates. Distinct from chef-variant (WarmCreative) — front-of-
// house focused with customer-service signals. Mint + cream, approachable.
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

export default function ServiceFriendly({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none"
      style={{ background: "#F7FBF8", color: "#1F3A2E", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* HEADER — soft mint band */}
      <header className="grid items-center gap-7" style={{
        gridTemplateColumns: "120px 1fr",
        padding: "40px 48px 32px",
        background: "linear-gradient(135deg, #C8EBDA 0%, #6EBFA0 100%)",
        color: "#1F3A2E",
      }}>
        {basics.photoUrl ? (
          <img src={basics.photoUrl} alt="" className="rounded-full object-cover" style={{
            width: 120, height: 120, border: "4px solid #F7FBF8",
            boxShadow: "0 6px 16px rgba(31,58,46,0.18)",
          }} />
        ) : (
          <div className="rounded-full flex items-center justify-center" style={{
            width: 120, height: 120,
            background: "#F7FBF8", color: "#1F3A2E",
            border: "4px solid #F7FBF8",
            boxShadow: "0 6px 16px rgba(31,58,46,0.18)",
            fontFamily: '"Fraunces", serif', fontWeight: 500, fontSize: "44pt", letterSpacing: "-0.02em",
          }}>{initials(basics.fullName)}</div>
        )}
        <div>
          <p className="m-0 mb-1.5 uppercase" style={{
            fontSize: "9pt", letterSpacing: "0.24em",
            color: "#1F3A2E", opacity: 0.7, fontWeight: 700,
          }}>Hospitality & Service</p>
          <h1 className="m-0" style={{
            fontFamily: '"Fraunces", serif', fontWeight: 500, fontSize: "38pt",
            lineHeight: 1, letterSpacing: "-0.015em", color: "#1F3A2E",
          }}>{basics.fullName}</h1>
          <p className="m-0 mt-1.5 italic" style={{
            fontFamily: '"Fraunces", serif', fontSize: "14pt", fontWeight: 500, color: "#2D5F4D",
          }}>{basics.role}</p>
        </div>
      </header>

      {/* CONTACT BAND */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1" style={{
        background: "#1F3A2E", color: "#C8EBDA",
        padding: "10px 48px", fontSize: "9.5pt", fontWeight: 500,
      }}>
        {basics.email && <span>✉ {basics.email}</span>}
        {basics.phone && <span>☎ {basics.phone}</span>}
        {basics.location && <span>⌖ {basics.location}</span>}
        {basics.website && <span>⌘ {basics.website}</span>}
        {basics.linkedIn && <span>⌘ {basics.linkedIn}</span>}
      </div>

      <div style={{ padding: "30px 48px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Section title="About Me" icon="❋">
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[10.5pt]"
              style={{ color: "#1F3A2E", textWrap: "pretty" }}
            />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={`Service ${getLabel(data, "experience")}`} icon="❋">
            {experience.map((w, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[12pt]" style={{
                      fontFamily: '"Fraunces", serif', color: "#1F3A2E",
                    }}>{w.role}</p>
                    <p className="m-0 italic text-[10.5pt]" style={{ color: "#2D5F4D", fontWeight: 500 }}>{w.company}</p>
                  </div>
                  <span className="whitespace-nowrap text-[9pt]" style={{
                    color: "#1F3A2E", background: "#C8EBDA",
                    padding: "3px 10px", borderRadius: 9999, fontWeight: 600,
                  }}>{dateRange(w.startDate, w.endDate)}</span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-0 list-none text-[10pt]" style={{ color: "#3D5C50" }}>
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 18 }}>
                          <span className="absolute" style={{ left: 0, color: "#6EBFA0", fontWeight: 700 }}>❋</span>
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
          <Section title={getLabel(data, "projects")} icon="❋">
            {projects.map((p, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-semibold text-[11pt]" style={{
                  fontFamily: '"Fraunces", serif', color: "#1F3A2E",
                }}>
                  {p.name}
                  {p.url && <span className="italic text-[10pt] ml-2" style={{ color: "#2D5F4D" }}>{p.url}</span>}
                </p>
                <p className="m-0 text-[10pt]" style={{ color: "#3D5C50" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {skills.length > 0 && (
            <Section title="Service Skills" icon="❋">
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F3A2E", lineHeight: 1.7 }}>
                {skills.slice(0, 12).map((s, i) => (
                  <li key={i} className="relative" style={{ paddingLeft: 18 }}>
                    <span className="absolute" style={{ left: 0, color: "#6EBFA0" }}>✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <div>
            {certifications.length > 0 && (
              <Section title={getLabel(data, "certifications")} icon="❋">
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F3A2E" }}>
                  {certifications.map((c, i) => (
                    <li key={i} className="mb-1">
                      <b className="font-semibold">{c.name}</b>
                      {c.issuer && <span style={{ color: "#5C7A6E" }}> · {c.issuer}</span>}
                      {c.year && <span style={{ color: "#5C7A6E" }}> · {c.year}</span>}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {languages.length > 0 && (
              <Section title={getLabel(data, "languages")} icon="❋">
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F3A2E" }}>
                  {languages.map((l, i) => (
                    <li key={i} className="mb-0.5">
                      <b className="font-semibold">{l.name}</b>
                      <span style={{ color: "#5C7A6E" }}> — {l.level}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {education.length > 0 && (
              <Section title={getLabel(data, "education")} icon="❋">
                {education.map((e, i) => (
                  <div key={i} className="mb-1.5 last:mb-0">
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#1F3A2E" }}>{e.degree}</p>
                    <p className="m-0 text-[9.5pt]" style={{ color: "#2D5F4D" }}>{e.school}</p>
                    <p className="m-0 text-[9pt]" style={{ color: "#5C7A6E" }}>
                      {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                    </p>
                  </div>
                ))}
              </Section>
            )}
          </div>
        </div>

        {(awards.length > 0 || interests.length > 0) && (
          <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {awards.length > 0 && (
              <Section title={getLabel(data, "awards")} icon="❋">
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F3A2E" }}>
                  {awards.map((a, i) => (
                    <li key={i} className="mb-1">
                      <b className="font-semibold">{a.title}</b>
                      {a.issuer && <span style={{ color: "#5C7A6E" }}> · {a.issuer}</span>}
                      {a.year && <span style={{ color: "#5C7A6E" }}> · {a.year}</span>}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {interests.length > 0 && (
              <Section title={getLabel(data, "interests")} icon="❋">
                <p className="m-0 text-[10pt]" style={{ color: "#3D5C50" }}>
                  {interests.join(" · ")}
                </p>
              </Section>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 inline-block" style={{
        fontFamily: '"Fraunces", serif',
        fontSize: "15pt", fontWeight: 500, color: "#1F3A2E",
        paddingBottom: 4, borderBottom: "2px solid #6EBFA0",
      }}>
        <span style={{ color: "#6EBFA0", marginRight: 6 }}>{icon}</span>{title}
      </h2>
      {children}
    </section>
  );
}
