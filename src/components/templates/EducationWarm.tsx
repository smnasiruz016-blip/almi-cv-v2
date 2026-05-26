// ============================================================================
// EducationWarm — Elementary / Preschool / Kindergarten / Daycare / SEN.
// Warmer than Academic — classroom-friendly mustard + sage, gentle curves.
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
  stripRichText,
} from "./types";

export default function EducationWarm({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none"
      style={{ background: "#FFF8EC", color: "#3A2E1F", fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* HERO — soft yellow with crayon-like curve */}
      <header className="relative overflow-hidden" style={{
        padding: "44px 56px 32px",
        background: "linear-gradient(150deg, #FFE9A8 0%, #F4C45C 100%)",
        color: "#3A2E1F",
      }}>
        {/* playful blobs */}
        <span className="absolute rounded-full pointer-events-none" style={{
          right: -50, top: -50, width: 180, height: 180,
          background: "radial-gradient(circle, rgba(255,255,255,0.55), transparent 70%)",
        }} />
        <span className="absolute rounded-full pointer-events-none" style={{
          left: -30, bottom: -50, width: 160, height: 160,
          background: "radial-gradient(circle, rgba(149,180,128,0.35), transparent 70%)",
        }} />
        <div className="relative grid items-center gap-7" style={{ gridTemplateColumns: "1fr 130px" }}>
          <div>
            <p className="m-0 mb-2 uppercase" style={{
              fontSize: "9.5pt", letterSpacing: "0.22em", color: "#A36A1F", fontWeight: 700,
            }}>✿ Educator ✿</p>
            <h1 className="m-0" style={{
              fontFamily: '"Fraunces", "Lora", serif', fontWeight: 500, fontSize: "40pt",
              lineHeight: 1, letterSpacing: "-0.015em", color: "#3A2E1F",
            }}>{basics.fullName}</h1>
            <p className="m-0 mt-2 italic" style={{
              fontFamily: '"Fraunces", serif', fontSize: "15pt", fontWeight: 500, color: "#7A4A1A",
            }}>{basics.role}</p>
            <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3.5 text-[9.5pt]" style={{ color: "#5C4828" }}>
              {basics.email && <span>✉ {basics.email}</span>}
              {basics.phone && <span>☎ {basics.phone}</span>}
              {basics.location && <span>⌖ {basics.location}</span>}
              {basics.website && <span>⌘ {basics.website}</span>}
              {basics.linkedIn && <span>⌘ {basics.linkedIn}</span>}
            </div>
          </div>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" className="rounded-full object-cover" style={{
              width: 130, height: 130, border: "4px solid #FFF8EC",
              boxShadow: "0 6px 18px rgba(58,46,31,0.20)",
            }} />
          ) : (
            <div className="rounded-full flex items-center justify-center" style={{
              width: 130, height: 130,
              background: "linear-gradient(160deg, #95B480 0%, #5C7849 100%)",
              border: "4px solid #FFF8EC",
              boxShadow: "0 6px 18px rgba(58,46,31,0.20)",
              color: "#FFF8EC",
              fontFamily: '"Fraunces", serif', fontWeight: 500, fontSize: "46pt",
            }}>{initials(basics.fullName)}</div>
          )}
        </div>
      </header>

      <div style={{ padding: "30px 56px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Card>
            {/* Pull-quote treatment — quote marks would compete with HTML emphasis; strip to plain. */}
            <p className="m-0 text-[11pt]" style={{
              color: "#3A2E1F", lineHeight: 1.65, fontStyle: "italic",
              textWrap: "pretty",
            }}>"{stripRichText(basics.summary ?? "")}"</p>
          </Card>
        )}

        {experience.length > 0 && (
          <Section title={`Teaching ${getLabel(data, "experience")}`} icon="✿">
            {experience.map((w, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[12pt]" style={{
                      fontFamily: '"Fraunces", serif', color: "#3A2E1F",
                    }}>{w.role}</p>
                    <p className="m-0 italic text-[10.5pt]" style={{ color: "#7A4A1A", fontWeight: 500 }}>{w.company}</p>
                  </div>
                  <span className="text-[9pt] whitespace-nowrap font-medium" style={{
                    color: "#3A2E1F", background: "#FFE9A8",
                    padding: "3px 9px", borderRadius: 9999,
                  }}>{dateRange(w.startDate, w.endDate)}</span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-0 list-none text-[10pt]" style={{ color: "#5C4828" }}>
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 18 }}>
                          <span className="absolute" style={{ left: 0, color: "#95B480", fontWeight: 700 }}>✿</span>
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
          <Section title={`Classroom ${getLabel(data, "projects")}`} icon="✿">
            {projects.map((p, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-semibold text-[11pt]" style={{
                  fontFamily: '"Fraunces", serif', color: "#3A2E1F",
                }}>
                  {p.name}
                  {p.url && <span className="italic text-[10pt] ml-2" style={{ color: "#7A4A1A" }}>{p.url}</span>}
                </p>
                <p className="m-0 text-[10pt]" style={{ color: "#5C4828" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education")} icon="✿">
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-semibold text-[11pt]" style={{
                    fontFamily: '"Fraunces", serif', color: "#3A2E1F",
                  }}>{e.degree}</p>
                  <p className="m-0 italic text-[10pt]" style={{ color: "#7A4A1A" }}>{e.school}</p>
                  <p className="m-0 text-[9pt]" style={{ color: "#5C4828" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {skills.length > 0 && (
            <Section title="Specialties" icon="✿">
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 12).map((s, i) => {
                  const colors = ["#FFE9A8", "#D5EAC4", "#FFD9C2", "#E8D5F0", "#FFE9A8", "#D5EAC4"];
                  return (
                    <span key={i} className="rounded-full font-semibold" style={{
                      padding: "4px 12px", fontSize: "9.5pt",
                      background: colors[i % colors.length], color: "#3A2E1F",
                    }}>{s}</span>
                  );
                })}
              </div>
            </Section>
          )}
        </div>

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {certifications.length > 0 && (
            <Section title={getLabel(data, "certifications")} icon="✿">
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#3A2E1F" }}>
                {certifications.map((c, i) => (
                  <li key={i} className="relative" style={{ padding: "3px 0 3px 16px" }}>
                    <span className="absolute" style={{ left: 0, top: 5, color: "#95B480" }}>✿</span>
                    <b className="font-semibold">{c.name}</b>
                    {c.issuer && <span style={{ color: "#7A4A1A" }}> · {c.issuer}</span>}
                    {c.year && <span style={{ color: "#7A4A1A" }}> · {c.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {languages.length > 0 && (
            <Section title={getLabel(data, "languages")} icon="✿">
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#3A2E1F" }}>
                {languages.map((l, i) => (
                  <li key={i} className="mb-0.5">
                    <b className="font-semibold">{l.name}</b>
                    <span style={{ color: "#7A4A1A" }}> — {l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {awards.length > 0 && (
            <Section title={getLabel(data, "awards")} icon="✿">
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#3A2E1F" }}>
                {awards.map((a, i) => (
                  <li key={i} className="relative" style={{ padding: "3px 0 3px 16px" }}>
                    <span className="absolute" style={{ left: 0, top: 5, color: "#95B480" }}>✿</span>
                    <b className="font-semibold">{a.title}</b>
                    {a.issuer && <span style={{ color: "#7A4A1A" }}> · {a.issuer}</span>}
                    {a.year && <span style={{ color: "#7A4A1A" }}> · {a.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {interests.length > 0 && (
            <Section title={getLabel(data, "interests")} icon="✿">
              <p className="m-0 text-[10pt]" style={{ color: "#5C4828" }}>
                {interests.join(" · ")}
              </p>
            </Section>
          )}
        </div>
      </div>
    </article>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white mb-6" style={{
      padding: "20px 24px", borderRadius: 18,
      border: "1px solid rgba(58,46,31,0.06)",
      boxShadow: "0 1px 2px rgba(58,46,31,0.04), 0 12px 28px rgba(244,196,92,0.18)",
    }}>{children}</div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-3 inline-block" style={{
        fontFamily: '"Fraunces", serif',
        fontSize: "15pt", fontWeight: 500, color: "#3A2E1F",
        paddingBottom: 4, borderBottom: "2px dotted #F4C45C",
      }}>
        <span style={{ color: "#95B480" }}>{icon} </span>{title}
      </h2>
      {children}
    </section>
  );
}
