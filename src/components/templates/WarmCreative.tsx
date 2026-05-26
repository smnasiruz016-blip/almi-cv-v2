// ============================================================================
// WarmCreative — Hospitality / Restaurants / Events / Tourism.
// Warm terracotta + cream palette. Friendly, photo-forward, soft curves.
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

export default function WarmCreative({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none"
      style={{
        background: "#FFFBF5", color: "#3B2A1F",
        fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55,
      }}>
      {/* HERO STRIP — warm sunset gradient with photo */}
      <header className="relative overflow-hidden"
        style={{
          padding: "44px 56px 76px",
          background:
            "linear-gradient(135deg, #FFE8D6 0%, #FFB497 55%, #E08868 100%)",
          color: "#3B2A1F",
        }}>
        <span className="absolute rounded-full pointer-events-none"
          style={{
            right: -80, top: -80, width: 240, height: 240,
            background: "radial-gradient(circle, rgba(255,251,245,0.55), transparent 70%)",
          }} />
        <div className="relative grid items-center gap-7" style={{ gridTemplateColumns: "140px 1fr" }}>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt=""
              className="rounded-full object-cover"
              style={{ width: 140, height: 140, border: "4px solid #FFFBF5", boxShadow: "0 8px 24px rgba(45,27,31,0.20)" }} />
          ) : (
            <div className="rounded-full flex items-center justify-center"
              style={{
                width: 140, height: 140,
                background: "linear-gradient(160deg, #D85A4D 0%, #7A2E1E 100%)",
                border: "4px solid #FFFBF5",
                boxShadow: "0 8px 24px rgba(45,27,31,0.20)",
                color: "#FFFBF5",
                fontFamily: "Fraunces, serif", fontWeight: 500,
                fontSize: "50pt", letterSpacing: "-0.02em",
              }}>
              {initials(basics.fullName)}
            </div>
          )}
          <div>
            <h1 className="m-0"
              style={{
                fontFamily: "Fraunces, serif", fontWeight: 500,
                fontSize: "40pt", lineHeight: 1, letterSpacing: "-0.02em",
                color: "#3B2A1F",
              }}>
              {basics.fullName}
            </h1>
            <p className="m-0 mt-2.5 italic"
              style={{
                fontFamily: "Fraunces, serif", fontWeight: 500,
                fontSize: "15pt", color: "#7A2E1E",
              }}>
              {basics.role}
            </p>
            <div className="flex flex-wrap gap-y-1 gap-x-3.5 mt-3.5 text-[9.5pt]"
              style={{ color: "#5C3D2E" }}>
              {basics.email && <span>{basics.email}</span>}
              {basics.phone && <span>·  {basics.phone}</span>}
              {basics.location && <span>·  {basics.location}</span>}
              {basics.website && <span>·  {basics.website}</span>}
              {basics.linkedIn && <span>·  {basics.linkedIn}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="relative" style={{ padding: "0 56px 44px", marginTop: -40 }}>

        {!isRichTextEmpty(basics.summary) && (
          <Card>
            <h2 className="m-0 mb-2 uppercase"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10pt", fontWeight: 700,
                letterSpacing: "0.2em", color: "#D85A4D",
              }}>
              About Me
            </h2>
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[10.5pt] text-[#3B2A1F]"
              style={{ lineHeight: 1.6, textWrap: "pretty" }}
            />
          </Card>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience")}>
            {experience.map((w, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0"
                      style={{
                        fontFamily: "Fraunces, serif", fontSize: "12.5pt",
                        fontWeight: 500, color: "#3B2A1F",
                      }}>
                      {w.role}
                    </p>
                    <p className="m-0 mt-px italic text-[10pt]"
                      style={{ color: "#7A2E1E", fontWeight: 500 }}>
                      {w.company}
                    </p>
                  </div>
                  <span className="text-[9pt] whitespace-nowrap"
                    style={{ color: "#7A6045" }}>
                    {dateRange(w.startDate, w.endDate)}
                  </span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-4 list-none text-[#5C3D2E] text-[10pt]">
                    {w.bullets.map((b, j) =>
                      isRichTextEmpty(b) ? null : (
                        <li key={j} className="mb-0.5 relative"
                          style={{ paddingLeft: 16 }}>
                          <span className="absolute" style={{ left: 0, color: "#D85A4D" }}>❋</span>
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
          <Section title={getLabel(data, "projects")}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2.5 last:mb-0">
                <p className="m-0"
                  style={{ fontFamily: "Fraunces, serif", fontSize: "11.5pt", fontWeight: 500, color: "#3B2A1F" }}>
                  {p.name}
                  {p.url && (
                    <span className="italic text-[10pt] ml-2" style={{ color: "#7A2E1E" }}>{p.url}</span>
                  )}
                </p>
                <p className="m-0 mt-px text-[10pt]" style={{ color: "#5C3D2E" }}>{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {education.length > 0 && (
            <Section title={getLabel(data, "education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="m-0"
                    style={{ fontFamily: "Fraunces, serif", fontSize: "11.5pt", fontWeight: 500, color: "#3B2A1F" }}>
                    {e.degree}
                  </p>
                  <p className="m-0 italic text-[10pt]" style={{ color: "#7A2E1E" }}>{e.school}</p>
                  <p className="m-0 text-[9pt]" style={{ color: "#7A6045" }}>
                    {dateRange(e.startDate, e.endDate)}{e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {skills.length > 0 && (
            <Section title={getLabel(data, "skills")}>
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 12).map((s, i) => (
                  <span key={i} className="rounded-full"
                    style={{
                      padding: "4px 12px", fontSize: "9.5pt",
                      background: "#FFE8D6", color: "#7A2E1E", fontWeight: 500,
                    }}>
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {certifications.length > 0 && (
            <Section title={getLabel(data, "certifications")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B2A1F]">
                {certifications.map((c, i) => (
                  <li key={i} className="mb-1">
                    <b className="font-semibold">{c.name}</b>
                    {c.issuer && <span style={{ color: "#7A6045" }}> · {c.issuer}</span>}
                    {c.year && <span style={{ color: "#7A6045" }}> · {c.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {languages.length > 0 && (
            <Section title={getLabel(data, "languages")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B2A1F]">
                {languages.map((l, i) => (
                  <li key={i} className="mb-1">
                    <b className="font-semibold">{l.name}</b>
                    <span style={{ color: "#7A6045" }}> · {l.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {awards.length > 0 && (
            <Section title={getLabel(data, "awards")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B2A1F]">
                {awards.map((a, i) => (
                  <li key={i} className="mb-1">
                    <b className="font-semibold">{a.title}</b>
                    {a.issuer && <span style={{ color: "#7A6045" }}> · {a.issuer}</span>}
                    {a.year && <span style={{ color: "#7A6045" }}> · {a.year}</span>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {interests.length > 0 && (
            <Section title={getLabel(data, "interests")}>
              <p className="m-0 text-[10pt]" style={{ color: "#5C3D2E" }}>
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
    <div className="bg-white rounded-2xl mb-6"
      style={{
        padding: "22px 26px",
        border: "1px solid rgba(45,27,31,0.06)",
        boxShadow: "0 1px 2px rgba(45,27,31,0.04), 0 12px 32px rgba(216,90,77,0.10)",
      }}>
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-2.5 uppercase"
        style={{
          fontSize: "10pt", fontWeight: 700,
          letterSpacing: "0.2em", color: "#D85A4D",
          paddingBottom: 4, borderBottom: "1px solid rgba(216,90,77,0.3)",
        }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
