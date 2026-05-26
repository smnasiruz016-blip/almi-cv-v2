// ============================================================================
// SalesModern — Sales Reps / Account Executives / BDRs / Sales Engineers /
// Sales Managers. Achievement-forward — KPI tiles + revenue numbers prominent.
// Energetic orange→pink gradient + plum body. A4: 794 × 1123 px @ 96 DPI.
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

export default function SalesModern({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  // First 3 skills become headline KPIs.
  const kpis = skills.slice(0, 3);
  const restSkills = skills.slice(3);

  return (
    <article className="w-[794px] min-h-[1123px] bg-white print:shadow-none"
      style={{ color: "#1F2238", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* HERO with gradient */}
      <header className="relative overflow-hidden" style={{
        padding: "44px 48px 36px",
        background: "linear-gradient(135deg, #FF6A3D 0%, #E91E63 60%, #6B2A8C 100%)",
        color: "#FFFFFF",
      }}>
        <span className="absolute pointer-events-none" style={{
          right: -100, top: -80, width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.22), transparent 70%)",
        }} />
        <div className="relative grid items-end gap-7" style={{ gridTemplateColumns: "1fr 100px" }}>
          <div>
            <p className="m-0 mb-2 uppercase" style={{
              fontSize: "9pt", letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.78)", fontWeight: 700,
            }}>Top Performer</p>
            <h1 className="m-0" style={{
              fontWeight: 800, fontSize: "42pt", lineHeight: 1, letterSpacing: "-0.025em",
            }}>{basics.fullName}</h1>
            <p className="m-0 mt-3 uppercase" style={{
              fontSize: "12pt", color: "#FFE6B0", fontWeight: 700, letterSpacing: "0.18em",
            }}>{basics.role}</p>
            <div className="flex flex-wrap gap-y-1 gap-x-4 mt-4 text-[9.5pt]" style={{ color: "rgba(255,255,255,0.88)" }}>
              {basics.email && <span>{basics.email}</span>}
              {basics.phone && <span>· {basics.phone}</span>}
              {basics.location && <span>· {basics.location}</span>}
              {basics.website && <span>· {basics.website}</span>}
              {basics.linkedIn && <span>· {basics.linkedIn}</span>}
            </div>
          </div>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" className="rounded-full object-cover" style={{
              width: 100, height: 100, border: "3px solid #FFFFFF",
            }} />
          ) : (
            <div className="rounded-full flex items-center justify-center" style={{
              width: 100, height: 100, background: "rgba(255,255,255,0.18)",
              border: "3px solid #FFFFFF", color: "#FFFFFF",
              fontWeight: 800, fontSize: "30pt", letterSpacing: "-0.02em",
            }}>{initials(basics.fullName)}</div>
          )}
        </div>
      </header>

      {/* KPI TILES — overlap the hero bottom edge */}
      {kpis.length > 0 && (
        <div className="grid gap-3" style={{
          gridTemplateColumns: `repeat(${kpis.length}, 1fr)`,
          padding: "0 48px", marginTop: -22, position: "relative", zIndex: 1,
        }}>
          {kpis.map((k, i) => (
            <div key={i} className="bg-white text-center" style={{
              padding: "16px 12px", borderRadius: 12,
              boxShadow: "0 6px 16px rgba(31,34,56,0.10), 0 1px 2px rgba(31,34,56,0.06)",
              borderTop: "3px solid #FF6A3D",
            }}>
              <div className="font-extrabold" style={{
                fontSize: "20pt", color: "#1F2238", lineHeight: 1, letterSpacing: "-0.02em",
              }}>{k}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "30px 48px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Section title={getLabel(data, "profile")}>
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[10.5pt]"
              style={{ color: "#1F2238", textWrap: "pretty" }}
            />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience")}>
            {experience.map((w, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-bold text-[12pt]" style={{ color: "#1F2238" }}>{w.role}</p>
                    <p className="m-0 font-semibold text-[10pt]" style={{ color: "#E91E63" }}>{w.company}</p>
                  </div>
                  <span className="text-[9pt] font-semibold whitespace-nowrap" style={{
                    color: "#FFFFFF", background: "#1F2238",
                    padding: "3px 10px", borderRadius: 9999,
                  }}>{dateRange(w.startDate, w.endDate)}</span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-0 list-none text-[10pt]" style={{ color: "#3B3F5A" }}>
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 18 }}>
                          <span className="absolute" style={{ left: 0, color: "#FF6A3D", fontWeight: 800 }}>▲</span>
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
          <Section title={`Notable ${getLabel(data, "projects")}`}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#1F2238" }}>
                  {p.name}
                  {p.url && <span className="ml-2 font-normal text-[9.5pt]" style={{ color: "#E91E63" }}>{p.url}</span>}
                </p>
                <p className="m-0 text-[10pt]" style={{ color: "#3B3F5A" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        {awards.length > 0 && (
          <Section title={`Top ${getLabel(data, "awards")}`}>
            <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {awards.map((a, i) => (
                <div key={i} className="flex items-start gap-2" style={{
                  background: "linear-gradient(95deg, rgba(255,106,61,0.08) 0%, rgba(233,30,99,0.08) 100%)",
                  border: "1px solid rgba(255,106,61,0.25)",
                  padding: "8px 10px", borderRadius: 8,
                }}>
                  <span style={{ color: "#FF6A3D", fontSize: "14pt", lineHeight: 1, fontWeight: 800 }}>▲</span>
                  <div>
                    <div className="font-bold text-[10pt]" style={{ color: "#1F2238" }}>{a.title}</div>
                    {(a.issuer || a.year) && (
                      <div className="text-[9pt]" style={{ color: "#5A5F78" }}>
                        {[a.issuer, a.year].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {restSkills.length > 0 && (
            <Section title="Strengths">
              <div className="flex flex-wrap gap-1.5">
                {restSkills.map((s, i) => (
                  <span key={i} style={{
                    padding: "4px 11px", fontSize: "9.5pt", fontWeight: 600,
                    color: "#FFFFFF",
                    background: "linear-gradient(95deg, #FF6A3D 0%, #E91E63 100%)",
                    borderRadius: 9999,
                  }}>{s}</span>
                ))}
              </div>
            </Section>
          )}

          {certifications.length > 0 && (
            <Section title={getLabel(data, "certifications")}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F2238" }}>
                {certifications.map((c, i) => (
                  <li key={i} className="mb-1">
                    <b className="font-bold">{c.name}</b>
                    {c.issuer && <span style={{ color: "#5A5F78" }}> · {c.issuer}</span>}
                    {c.year && <span style={{ color: "#5A5F78" }}> · {c.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-bold text-[10.5pt]" style={{ color: "#1F2238" }}>{e.degree}</p>
                  <p className="m-0 font-semibold text-[10pt]" style={{ color: "#E91E63" }}>{e.school}</p>
                  <p className="m-0 text-[9pt]" style={{ color: "#5A5F78" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}
          {languages.length > 0 && (
            <Section title={getLabel(data, "languages")}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#1F2238" }}>
                {languages.map((l, i) => (
                  <li key={i}>
                    <b className="font-bold">{l.name}</b>
                    <span style={{ color: "#5A5F78" }}> — {l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {interests.length > 0 && (
          <Section title={getLabel(data, "interests")}>
            <p className="m-0 text-[10pt]" style={{ color: "#3B3F5A" }}>
              {interests.join(" · ")}
            </p>
          </Section>
        )}
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 uppercase" style={{
        fontSize: "10.5pt", fontWeight: 800, letterSpacing: "0.18em",
        color: "#1F2238", paddingBottom: 5,
        backgroundImage: "linear-gradient(90deg, #FF6A3D 0%, #E91E63 100%)",
        backgroundSize: "44px 3px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 100%",
      }}>{title}</h2>
      {children}
    </section>
  );
}
