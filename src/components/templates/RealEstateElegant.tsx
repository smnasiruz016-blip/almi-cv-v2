// ============================================================================
// RealEstateElegant — Real Estate Agents / Property Managers / Brokers.
// Navy + gold. Sales achievements as badges. Trust-signalling, premium feel.
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

export default function RealEstateElegant({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] bg-white print:shadow-none"
      style={{
        color: "#1A2238",
        fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
        fontSize: "11pt", lineHeight: 1.55,
      }}>
      {/* HEADER */}
      <header className="text-center relative" style={{
        padding: "52px 56px 28px",
        background: "linear-gradient(180deg, #FFFBF5 0%, #FFFFFF 100%)",
      }}>
        <div className="mx-auto" style={{
          width: 96, height: 96, borderRadius: "50%",
          padding: 3, marginBottom: 18,
          background: "linear-gradient(135deg, #C9A24E, #8C6B2F)",
        }}>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" className="rounded-full object-cover w-full h-full" />
          ) : (
            <div className="rounded-full flex items-center justify-center w-full h-full" style={{
              background: "#1A2238", color: "#C9A24E",
              fontFamily: "inherit", fontWeight: 600, fontSize: "32pt",
            }}>{initials(basics.fullName)}</div>
          )}
        </div>
        <Ornament gold />
        <h1 className="m-0" style={{
          fontWeight: 600, fontSize: "36pt", lineHeight: 1.05,
          letterSpacing: "0.02em", color: "#1A2238",
        }}>{basics.fullName}</h1>
        <p className="m-0 mt-2 uppercase" style={{
          fontFamily: "Inter, sans-serif", fontSize: "10pt",
          letterSpacing: "0.28em", color: "#8C6B2F", fontWeight: 600,
        }}>{basics.role}</p>
        <ul className="m-0 mt-4 p-0 list-none flex flex-wrap justify-center gap-y-1 gap-x-5" style={{
          fontFamily: "Inter, sans-serif", fontSize: "9.5pt", color: "#5A6275",
        }}>
          {basics.email && <li>{basics.email}</li>}
          {basics.phone && <li>· {basics.phone}</li>}
          {basics.location && <li>· {basics.location}</li>}
          {basics.website && <li>· {basics.website}</li>}
          {basics.linkedIn && <li>· {basics.linkedIn}</li>}
        </ul>
      </header>

      <div style={{ padding: "0 56px 44px" }}>
        {!isRichTextEmpty(basics.summary) && (
          <Section title="About">
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0"
              style={{
                fontSize: "11.5pt", color: "#2A324A", textAlign: "justify",
                lineHeight: 1.65, textWrap: "pretty",
              }}
            />
          </Section>
        )}

        {/* ACHIEVEMENT BADGES — first 3 skills surface as headline metrics */}
        {skills.length > 0 && (
          <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {skills.slice(0, 3).map((s, i) => (
              <Badge key={i} value={s} />
            ))}
          </div>
        )}

        {experience.length > 0 && (
          <Section title={`Professional ${getLabel(data, "experience")}`}>
            {experience.map((w, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[12.5pt]" style={{ color: "#1A2238" }}>{w.role}</p>
                    <p className="m-0 italic" style={{
                      fontSize: "11pt", color: "#8C6B2F", fontWeight: 500,
                    }}>{w.company}</p>
                  </div>
                  <span className="whitespace-nowrap" style={{
                    fontFamily: "Inter, sans-serif", fontSize: "9pt",
                    color: "#5A6275", letterSpacing: "0.04em",
                  }}>{dateRange(w.startDate, w.endDate)}</span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-0 list-none text-[11pt]" style={{ color: "#2A324A" }}>
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 18 }}>
                          <span className="absolute" style={{ left: 0, color: "#C9A24E", fontSize: "10pt" }}>◆</span>
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
              <div key={i} className="mb-2.5 last:mb-0">
                <p className="m-0 font-semibold text-[12pt]" style={{ color: "#1A2238" }}>
                  {p.name}
                  {p.url && (
                    <span className="italic ml-2" style={{ fontSize: "10pt", color: "#8C6B2F" }}>{p.url}</span>
                  )}
                </p>
                <p className="m-0 mt-px text-[11pt]" style={{ color: "#2A324A" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0 font-semibold text-[11.5pt]" style={{ color: "#1A2238" }}>{e.degree}</p>
                  <p className="m-0 italic" style={{ fontSize: "10.5pt", color: "#8C6B2F" }}>{e.school}</p>
                  <p className="m-0" style={{
                    fontFamily: "Inter, sans-serif", fontSize: "9pt", color: "#5A6275",
                  }}>{dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}</p>
                </div>
              ))}
            </Section>
          )}
          {certifications.length > 0 && (
            <Section title="Licenses & Designations">
              <ul className="m-0 p-0 list-none text-[10.5pt]" style={{ color: "#1A2238" }}>
                {certifications.map((c, i) => (
                  <li key={i} className="relative" style={{ paddingLeft: 16, padding: "3px 0 3px 16px" }}>
                    <span className="absolute" style={{ left: 0, top: 5, color: "#C9A24E" }}>◆</span>
                    <b className="font-semibold">{c.name}</b>
                    {c.issuer && <span style={{ color: "#5A6275" }}> · {c.issuer}</span>}
                    {c.year && <span style={{ color: "#5A6275" }}> · {c.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {awards.length > 0 && (
          <Section title={getLabel(data, "awards")}>
            <ul className="m-0 p-0 list-none text-[11pt]" style={{ color: "#1A2238" }}>
              {awards.map((a, i) => (
                <li key={i} className="relative" style={{ paddingLeft: 16, padding: "3px 0 3px 16px" }}>
                  <span className="absolute" style={{ left: 0, top: 5, color: "#C9A24E" }}>◆</span>
                  <b className="font-semibold">{a.title}</b>
                  {a.issuer && <span style={{ color: "#5A6275" }}> · {a.issuer}</span>}
                  {a.year && <span style={{ color: "#5A6275" }}> · {a.year}</span>}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {languages.length > 0 && (
          <Section title={getLabel(data, "languages")}>
            <p className="m-0 text-[11pt]" style={{ color: "#2A324A" }}>
              {languages.map((l, i) => (
                <React.Fragment key={i}>
                  <b className="font-semibold" style={{ color: "#1A2238" }}>{l.name}</b>
                  <span style={{ color: "#5A6275" }}> — {l.level}</span>
                  {i < languages.length - 1 && <span style={{ color: "#C9A24E" }}>  ◆  </span>}
                </React.Fragment>
              ))}
            </p>
          </Section>
        )}

        {interests.length > 0 && (
          <Section title={getLabel(data, "interests")}>
            <p className="m-0 text-[11pt] italic text-center" style={{ color: "#5A6275" }}>
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
    <section className="mb-6 last:mb-0">
      <h2 className="text-center m-0 mb-3.5" style={{
        fontWeight: 600, fontSize: "15pt", color: "#1A2238", letterSpacing: "0.04em",
      }}>
        <span style={{ color: "#C9A24E" }}>—— </span>{title}<span style={{ color: "#C9A24E" }}> ——</span>
      </h2>
      {children}
    </section>
  );
}

function Badge({ value }: { value: string }) {
  return (
    <div className="text-center" style={{
      background: "linear-gradient(180deg, #FFFBF5 0%, #F7F2E8 100%)",
      border: "1px solid #C9A24E", padding: "14px 12px",
      borderRadius: 4,
    }}>
      <div style={{
        fontWeight: 700, fontSize: "16pt", color: "#1A2238",
        fontFamily: '"Cormorant Garamond", serif', lineHeight: 1,
      }}>{value}</div>
    </div>
  );
}

function Ornament({ gold }: { gold?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-2" style={{ color: gold ? "#C9A24E" : "#1A2238" }}>
      <span style={{ width: 40, height: 1, background: "currentColor", opacity: 0.6 }} />
      <span style={{ fontSize: "12pt" }}>◆</span>
      <span style={{ width: 40, height: 1, background: "currentColor", opacity: 0.6 }} />
    </div>
  );
}
