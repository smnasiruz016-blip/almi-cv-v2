// ============================================================================
// BeautyPortfolio — Hair Stylists / Makeup Artists / Barbers / Nail Techs /
// Estheticians. Rose + cream. Visual swatch panel, social handles, soft curves.
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

export default function BeautyPortfolio({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none"
      style={{
        background: "#FFF8F4", color: "#3B2A30",
        fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55,
      }}>
      {/* HERO — soft rose blush with portrait */}
      <header className="relative overflow-hidden" style={{
        padding: "44px 56px 28px",
        background: "linear-gradient(135deg, #FBE3E4 0%, #F4B8B0 100%)",
      }}>
        <span className="absolute rounded-full pointer-events-none" style={{
          left: -80, top: -80, width: 240, height: 240,
          background: "radial-gradient(circle, rgba(255,255,255,0.55), transparent 70%)",
        }} />
        <div className="relative grid items-center gap-7" style={{ gridTemplateColumns: "1fr 150px" }}>
          <div>
            <p className="m-0 mb-2 uppercase" style={{
              fontSize: "9pt", letterSpacing: "0.32em",
              color: "#9C3B47", fontWeight: 600,
            }}>Beauty Professional</p>
            <h1 className="m-0" style={{
              fontFamily: '"Playfair Display", "Cormorant Garamond", serif',
              fontWeight: 500, fontSize: "44pt", lineHeight: 0.98,
              letterSpacing: "-0.015em", color: "#3B2A30",
            }}>{basics.fullName}</h1>
            <p className="m-0 mt-2 italic" style={{
              fontFamily: '"Playfair Display", serif', fontSize: "16pt",
              color: "#9C3B47", fontWeight: 500,
            }}>{basics.role}</p>
          </div>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" className="object-cover" style={{
              width: 150, height: 200, borderRadius: 150,
              border: "4px solid #FFF8F4",
              boxShadow: "0 8px 24px rgba(59,42,48,0.20)",
            }} />
          ) : (
            <div className="flex items-center justify-center" style={{
              width: 150, height: 200, borderRadius: 150,
              background: "linear-gradient(160deg, #9C3B47 0%, #5C1F2E 100%)",
              border: "4px solid #FFF8F4",
              boxShadow: "0 8px 24px rgba(59,42,48,0.20)",
              color: "#FFF8F4",
              fontFamily: '"Playfair Display", serif', fontWeight: 500,
              fontSize: "50pt",
            }}>{initials(basics.fullName)}</div>
          )}
        </div>
      </header>

      {/* CONTACT + SOCIAL STRIP */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1" style={{
        padding: "12px 56px", background: "#3B2A30", color: "#FBE3E4",
        fontSize: "9.5pt", letterSpacing: "0.04em",
      }}>
        {basics.email && <span>✉ {basics.email}</span>}
        {basics.phone && <span>☎ {basics.phone}</span>}
        {basics.location && <span>⌖ {basics.location}</span>}
        {basics.website && <span>@{basics.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>}
        {basics.linkedIn && <span>in/{basics.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")}</span>}
      </div>

      <div style={{ padding: "30px 56px 40px" }}>
        {!isRichTextEmpty(basics.summary) && (
          // Pull-quote treatment — emphasis tags would compete with the quote marks; strip to plain.
          <p className="m-0 mb-6 text-[11pt]" style={{
            color: "#3B2A30", lineHeight: 1.65, textAlign: "center", fontStyle: "italic",
            textWrap: "pretty", fontFamily: '"Playfair Display", serif',
          }}>"{stripRichText(basics.summary ?? "")}"</p>
        )}

        {/* COLOR SWATCH PANEL — services / specialties */}
        {skills.length > 0 && (
          <Section title="Specialties">
            <div className="grid gap-2.5" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              {skills.slice(0, 9).map((s, i) => {
                const swatches = ["#F4B8B0", "#E48F8F", "#C97180", "#9C3B47", "#D4A24C", "#A87C5F", "#8C5A6B", "#E8A78F", "#B8867A"];
                return (
                  <div key={i} className="flex items-center gap-2.5" style={{
                    padding: "8px 10px", background: "#FFFFFF",
                    border: "1px solid rgba(156,59,71,0.15)", borderRadius: 6,
                  }}>
                    <span className="rounded-full flex-shrink-0" style={{
                      width: 18, height: 18, background: swatches[i % swatches.length],
                      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                    }} />
                    <span className="text-[9.5pt] font-semibold" style={{ color: "#3B2A30" }}>{s}</span>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience")}>
            {experience.map((w, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[12pt]" style={{
                      fontFamily: '"Playfair Display", serif', color: "#3B2A30",
                    }}>{w.role}</p>
                    <p className="m-0 italic text-[10.5pt]" style={{ color: "#9C3B47", fontWeight: 500 }}>{w.company}</p>
                  </div>
                  <span className="text-[9pt] whitespace-nowrap" style={{ color: "#7A5A60" }}>
                    {dateRange(w.startDate, w.endDate)}
                  </span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-0 list-none text-[10pt]" style={{ color: "#5C4248" }}>
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 16 }}>
                          <span className="absolute" style={{ left: 0, color: "#C97180" }}>✿</span>
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
          <Section title={`Featured ${getLabel(data, "projects")}`}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <p className="m-0 font-semibold text-[11.5pt]" style={{
                  fontFamily: '"Playfair Display", serif', color: "#3B2A30",
                }}>
                  {p.name}
                  {p.url && <span className="italic text-[10pt] ml-2" style={{ color: "#9C3B47" }}>{p.url}</span>}
                </p>
                <p className="m-0 mt-px text-[10pt]" style={{ color: "#5C4248" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={`${getLabel(data, "education")} & Training`}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-semibold text-[11pt]" style={{
                    fontFamily: '"Playfair Display", serif', color: "#3B2A30",
                  }}>{e.degree}</p>
                  <p className="m-0 italic text-[10pt]" style={{ color: "#9C3B47" }}>{e.school}</p>
                  <p className="m-0 text-[9pt]" style={{ color: "#7A5A60" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}
          {certifications.length > 0 && (
            <Section title={getLabel(data, "certifications")}>
              <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#3B2A30" }}>
                {certifications.map((c, i) => (
                  <li key={i} className="relative" style={{ padding: "3px 0 3px 16px" }}>
                    <span className="absolute" style={{ left: 0, top: 5, color: "#C97180" }}>✿</span>
                    <b className="font-semibold">{c.name}</b>
                    {c.issuer && <span style={{ color: "#7A5A60" }}> · {c.issuer}</span>}
                    {c.year && <span style={{ color: "#7A5A60" }}> · {c.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {(awards.length > 0 || languages.length > 0 || interests.length > 0) && (
          <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {awards.length > 0 && (
              <Section title={getLabel(data, "awards")}>
                <ul className="m-0 p-0 list-none text-[10pt]" style={{ color: "#3B2A30" }}>
                  {awards.map((a, i) => (
                    <li key={i} className="relative" style={{ padding: "3px 0 3px 16px" }}>
                      <span className="absolute" style={{ left: 0, top: 5, color: "#C97180" }}>✿</span>
                      <b className="font-semibold">{a.title}</b>
                      {a.issuer && <span style={{ color: "#7A5A60" }}> · {a.issuer}</span>}
                      {a.year && <span style={{ color: "#7A5A60" }}> · {a.year}</span>}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {(languages.length > 0 || interests.length > 0) && (
              <Section title={`${getLabel(data, "languages")} & ${getLabel(data, "interests")}`}>
                {languages.length > 0 && (
                  <p className="m-0 text-[10.5pt]" style={{ color: "#3B2A30" }}>
                    {languages.map((l, i) => (
                      <React.Fragment key={i}>
                        <b className="font-semibold">{l.name}</b>
                        <span style={{ color: "#7A5A60" }}> {l.level}</span>
                        {i < languages.length - 1 && <span style={{ color: "#C97180" }}>  ✿  </span>}
                      </React.Fragment>
                    ))}
                  </p>
                )}
                {interests.length > 0 && (
                  <p className="m-0 mt-2 italic text-[10pt]" style={{ color: "#7A5A60" }}>
                    {interests.join(" · ")}
                  </p>
                )}
              </Section>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 last:mb-0">
      <h2 className="m-0 mb-3 text-center" style={{
        fontFamily: '"Playfair Display", serif',
        fontWeight: 500, fontSize: "16pt", color: "#3B2A30", letterSpacing: "0.04em",
      }}>
        <span style={{ color: "#C97180" }}>· · ·  </span>{title}<span style={{ color: "#C97180" }}>  · · ·</span>
      </h2>
      {children}
    </section>
  );
}
