// ============================================================================
// Academic — Researchers / Professors / PhD / Teachers. ATS-safe.
// Crimson Pro, centred header, dedicated publications section.
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
} from "./types";

export default function Academic({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none"
      style={{
        background: "#FFFBF5", color: "#2D1A20",
        fontFamily: '"Crimson Pro", Georgia, serif',
        fontSize: "11pt", lineHeight: 1.55,
        padding: "64px 72px 56px",
      }}>
      {/* HEADER */}
      <header className="text-center pb-6 mb-7 relative"
        style={{ borderBottom: "1px solid rgba(59,22,32,0.18)" }}>
        <span className="absolute"
          style={{ bottom: -1, left: "50%", transform: "translateX(-50%)",
            width: 60, height: 2, background: "#D4A24C" }} />
        <h1 className="m-0"
          style={{
            fontFamily: '"Crimson Pro", serif', fontWeight: 600,
            fontSize: "30pt", lineHeight: 1,
            letterSpacing: "-0.01em", color: "#3B1620",
          }}>
          {basics.fullName}
        </h1>
        <p className="m-0 italic mt-1.5"
          style={{ color: "#5C1F2E", fontSize: "12pt", fontWeight: 500 }}>
          {basics.role}
        </p>
        <p className="m-0 mt-3.5 uppercase"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9.5pt", color: "#7A4555",
            letterSpacing: "0.22em", fontWeight: 500,
          }}>
          {[basics.location, basics.email].filter(Boolean).join(" · ")}
        </p>
        <ul className="m-0 mt-3 p-0 list-none flex flex-wrap justify-center gap-y-1 gap-x-5"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "9.5pt", color: "#7A4555" }}>
          {basics.phone && <li>{basics.phone}</li>}
          {basics.website && <li>{basics.website}</li>}
          {basics.linkedIn && <li>{basics.linkedIn}</li>}
        </ul>
      </header>

      {!isRichTextEmpty(basics.summary) && (
        <Section title={`Research ${getLabel(data, "profile")}`}>
          <RichTextRender
            html={basics.summary ?? ""}
            as="div"
            className="m-0 text-[11pt]"
            style={{ color: "#2D1A20", lineHeight: 1.6, textAlign: "justify", textWrap: "pretty" }}
          />
        </Section>
      )}

      {experience.length > 0 && (
        <Section title={`Academic ${getLabel(data, "experience")}`}>
          {experience.map((w, i) => (
            <div key={i} className="mb-3.5 last:mb-0">
              <div className="flex justify-between items-baseline gap-3">
                <p className="m-0"
                  style={{ fontFamily: '"Crimson Pro", serif', fontSize: "12pt", fontWeight: 600, color: "#3B1620" }}>
                  {w.role} <span className="italic" style={{ color: "#5C1F2E", fontWeight: 500 }}>— {w.company}</span>
                </p>
                <span className="text-[9pt] whitespace-nowrap"
                  style={{ fontFamily: "Inter, sans-serif", color: "#7A4555" }}>
                  {dateRange(w.startDate, w.endDate)}
                </span>
              </div>
              {w.bullets.length > 0 && (
                <ul className="m-0 mt-1 pl-5 list-disc text-[10.5pt]" style={{ color: "#2D1A20" }}>
                  {w.bullets.map((b, j) =>
                    isRichTextEmpty(b) ? null : (
                      <li key={j} className="mb-0.5">
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

      {education.length > 0 && (
        <Section title={getLabel(data, "education")}>
          {education.map((e, i) => (
            <div key={i} className="mb-2.5 last:mb-0">
              <div className="flex justify-between items-baseline gap-3">
                <p className="m-0"
                  style={{ fontFamily: '"Crimson Pro", serif', fontSize: "12pt", fontWeight: 600, color: "#3B1620" }}>
                  {e.degree} <span className="italic" style={{ color: "#5C1F2E", fontWeight: 500 }}>— {e.school}</span>
                </p>
                <span className="text-[9pt] whitespace-nowrap"
                  style={{ fontFamily: "Inter, sans-serif", color: "#7A4555" }}>
                  {dateRange(e.startDate, e.endDate)}
                </span>
              </div>
              {e.notes && (
                <p className="m-0 mt-px text-[10.5pt]" style={{ color: "#7A4555" }}>
                  {e.notes}
                </p>
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
                style={{ fontFamily: '"Crimson Pro", serif', fontSize: "11.5pt", fontWeight: 600, color: "#3B1620" }}>
                {p.name}
                {p.url && (
                  <span className="italic ml-2" style={{ color: "#7A4555", fontSize: "10pt", fontFamily: "Inter, sans-serif" }}>
                    {p.url}
                  </span>
                )}
              </p>
              <p className="m-0 mt-px text-[10.5pt]" style={{ color: "#2D1A20" }}>{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {(certifications.length > 0 || awards.length > 0) && (
          <Section title={`${getLabel(data, "awards")} & ${getLabel(data, "certifications")}`}>
            <ul className="m-0 p-0 list-none text-[10.5pt]" style={{ color: "#2D1A20" }}>
              {awards.map((a, i) => (
                <li key={`a-${i}`} className="py-1">
                  <b className="font-semibold" style={{ color: "#3B1620" }}>{a.title}</b>
                  {a.issuer && (
                    <span className="text-[9pt] ml-1.5"
                      style={{ fontFamily: "Inter, sans-serif", color: "#7A4555" }}>{a.issuer}</span>
                  )}
                  {a.year && (
                    <span className="text-[9pt] ml-1.5"
                      style={{ fontFamily: "Inter, sans-serif", color: "#7A4555" }}>· {a.year}</span>
                  )}
                </li>
              ))}
              {certifications.map((c, i) => (
                <li key={`c-${i}`} className="py-1">
                  <b className="font-semibold" style={{ color: "#3B1620" }}>{c.name}</b>
                  {c.issuer && (
                    <span className="text-[9pt] ml-1.5"
                      style={{ fontFamily: "Inter, sans-serif", color: "#7A4555" }}>{c.issuer}</span>
                  )}
                  {c.year && (
                    <span className="text-[9pt] ml-1.5"
                      style={{ fontFamily: "Inter, sans-serif", color: "#7A4555" }}>· {c.year}</span>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {(skills.length > 0 || languages.length > 0 || interests.length > 0) && (
          <Section title={`Service & ${getLabel(data, "languages")}`}>
            {skills.length > 0 && (
              <ul className="m-0 p-0 list-none text-[10.5pt]" style={{ color: "#2D1A20" }}>
                {skills.slice(0, 5).map((s, i) => (<li key={i} className="py-1">{s}</li>))}
              </ul>
            )}
            {languages.length > 0 && (
              <ul className="m-0 p-0 list-none text-[10.5pt] mt-2.5" style={{ color: "#2D1A20" }}>
                {languages.map((l, i) => (
                  <li key={i} className="py-1">
                    <b className="font-semibold" style={{ color: "#3B1620" }}>{l.name}</b>
                    <span className="text-[9pt] ml-1.5"
                      style={{ fontFamily: "Inter, sans-serif", color: "#7A4555" }}>{l.level}</span>
                  </li>
                ))}
              </ul>
            )}
            {interests.length > 0 && (
              <p className="m-0 mt-2.5 text-[10.5pt] italic" style={{ color: "#7A4555" }}>
                {interests.join(" · ")}
              </p>
            )}
          </Section>
        )}
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="m-0 mb-2.5 uppercase"
        style={{
          fontFamily: '"Crimson Pro", serif',
          fontWeight: 600, fontSize: "13pt", color: "#3B1620",
          letterSpacing: "0.18em", paddingBottom: 4,
          borderBottom: "1px solid rgba(59,22,32,0.18)",
        }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
