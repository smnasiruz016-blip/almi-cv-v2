// ============================================================================
// ReligiousTraditional — Faith-based roles: Imam, Hafiz, Pastor, Rabbi,
// Pandit, Bhikkhu, Granthi, religious teachers across faiths.
// Cormorant Garamond + Amiri (Arabic-safe). Deep green + gold. Dignified.
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

export default function ReligiousTraditional({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none relative"
      style={{
        background: "#FBF7EE", color: "#1F2E25",
        fontFamily: '"Cormorant Garamond", "Amiri", Georgia, serif',
        fontSize: "11.5pt", lineHeight: 1.55,
        padding: "64px 72px 56px",
      }}>
      {/* Decorative ornamental frame */}
      <OrnamentFrame />

      {/* HEADER — centred, classical */}
      <header className="text-center mb-7 relative z-10">
        <Ornament />
        <h1 className="m-0 mt-2"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500, fontSize: "34pt",
            lineHeight: 1.05, letterSpacing: "0.01em",
            color: "#1F4A2E",
          }}>
          {basics.fullName}
        </h1>
        <p className="m-0 mt-2 italic"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500, fontSize: "15pt",
            color: "#806239", letterSpacing: "0.04em",
          }}>
          {basics.role}
        </p>
        <ul className="m-0 mt-4 p-0 list-none flex flex-wrap justify-center gap-y-1 gap-x-5"
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "9.5pt",
            color: "#5A6F5C", letterSpacing: "0.05em",
          }}>
          {basics.email && <li>{basics.email}</li>}
          {basics.phone && <li>· {basics.phone}</li>}
          {basics.location && <li>· {basics.location}</li>}
          {basics.website && <li>· {basics.website}</li>}
          {basics.linkedIn && <li>· {basics.linkedIn}</li>}
        </ul>
        <Ornament reverse />
      </header>

      {!isRichTextEmpty(basics.summary) && (
        <Section title={getLabel(data, "profile")}>
          <RichTextRender
            html={basics.summary ?? ""}
            as="div"
            className="m-0 text-[11.5pt]"
            style={{
              color: "#1F2E25", lineHeight: 1.65,
              textAlign: "justify", textWrap: "pretty",
              fontStyle: "italic",
            }}
          />
        </Section>
      )}

      {experience.length > 0 && (
        <Section title={`Service & ${getLabel(data, "experience")}`}>
          {experience.map((w, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline gap-3">
                <p className="m-0"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "13pt", fontWeight: 600,
                    color: "#1F4A2E",
                  }}>
                  {w.role}
                </p>
                <span className="text-[9pt] whitespace-nowrap"
                  style={{ fontFamily: "Inter, sans-serif", color: "#806239", fontStyle: "italic" }}>
                  {dateRange(w.startDate, w.endDate)}
                </span>
              </div>
              <p className="m-0 italic"
                style={{ color: "#5A6F5C", fontSize: "11.5pt", fontWeight: 500 }}>
                {w.company}
              </p>
              {w.bullets.length > 0 && (
                <ul className="m-0 mt-1.5 pl-0 list-none text-[11pt]"
                  style={{ color: "#1F2E25" }}>
                  {w.bullets.map((b, j) =>
                    isRichTextEmpty(b) ? null : (
                      <li key={j} className="mb-0.5 relative" style={{ paddingLeft: 18 }}>
                        <span className="absolute"
                          style={{ left: 0, color: "#C99E3F", fontSize: "9pt" }}>✦</span>
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
        <Section title={`Religious ${getLabel(data, "education")} & Training`}>
          {education.map((e, i) => (
            <div key={i} className="mb-2.5 last:mb-0">
              <div className="flex justify-between items-baseline gap-3">
                <p className="m-0"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "12.5pt", fontWeight: 600,
                    color: "#1F4A2E",
                  }}>
                  {e.degree}
                </p>
                <span className="text-[9pt] whitespace-nowrap"
                  style={{ fontFamily: "Inter, sans-serif", color: "#806239", fontStyle: "italic" }}>
                  {dateRange(e.startDate, e.endDate)}
                </span>
              </div>
              <p className="m-0 italic"
                style={{ color: "#5A6F5C", fontSize: "11pt", fontWeight: 500 }}>
                {e.school}
              </p>
              {e.notes && (
                <p className="m-0 mt-px text-[10.5pt]" style={{ color: "#5A6F5C" }}>
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
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "12pt", fontWeight: 600, color: "#1F4A2E",
                }}>
                {p.name}
                {p.url && (
                  <span className="italic ml-2"
                    style={{ color: "#806239", fontSize: "10pt", fontFamily: "Inter, sans-serif" }}>
                    {p.url}
                  </span>
                )}
              </p>
              <p className="m-0 mt-px text-[11pt]" style={{ color: "#1F2E25" }}>{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      <div className="grid gap-7" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {(skills.length > 0 || certifications.length > 0 || awards.length > 0) && (
          <Section title="Areas of Knowledge">
            {skills.length > 0 && (
              <ul className="m-0 p-0 list-none text-[11pt]"
                style={{ color: "#1F2E25", lineHeight: 1.7 }}>
                {skills.slice(0, 8).map((s, i) => (
                  <li key={i} className="relative" style={{ paddingLeft: 18 }}>
                    <span className="absolute"
                      style={{ left: 0, color: "#C99E3F", fontSize: "9pt" }}>✦</span>
                    {s}
                  </li>
                ))}
              </ul>
            )}
            {certifications.length > 0 && (
              <ul className="m-0 mt-3 p-0 list-none text-[10.5pt]"
                style={{ color: "#1F2E25" }}>
                {certifications.map((c, i) => (
                  <li key={i} style={{ padding: "2px 0" }}>
                    <b className="font-semibold" style={{ color: "#1F4A2E" }}>{c.name}</b>
                    {c.issuer && <span className="italic" style={{ color: "#806239" }}> — {c.issuer}</span>}
                    {c.year && <span className="italic" style={{ color: "#806239" }}>, {c.year}</span>}
                  </li>
                ))}
              </ul>
            )}
            {awards.length > 0 && (
              <ul className="m-0 mt-3 p-0 list-none text-[10.5pt]"
                style={{ color: "#1F2E25" }}>
                {awards.map((a, i) => (
                  <li key={i} style={{ padding: "2px 0" }}>
                    <b className="font-semibold" style={{ color: "#1F4A2E" }}>{a.title}</b>
                    {a.issuer && <span className="italic" style={{ color: "#806239" }}> — {a.issuer}</span>}
                    {a.year && <span className="italic" style={{ color: "#806239" }}>, {a.year}</span>}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {(languages.length > 0 || interests.length > 0) && (
          <Section title={`${getLabel(data, "languages")} & Recitation`}>
            {languages.length > 0 && (
              <ul className="m-0 p-0 list-none text-[11pt]"
                style={{ color: "#1F2E25", lineHeight: 1.7 }}>
                {languages.map((l, i) => (
                  <li key={i} className="relative" style={{ paddingLeft: 18 }}>
                    <span className="absolute"
                      style={{ left: 0, color: "#C99E3F", fontSize: "9pt" }}>✦</span>
                    <b className="font-semibold" style={{ color: "#1F4A2E" }}>{l.name}</b>
                    <span className="italic" style={{ color: "#806239" }}> — {l.level}</span>
                  </li>
                ))}
              </ul>
            )}
            {interests.length > 0 && (
              <p className="m-0 mt-3 italic text-[10.5pt]" style={{ color: "#5A6F5C" }}>
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
    <section className="mb-6 last:mb-0 relative z-10">
      <h2 className="m-0 mb-3 text-center"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 600, fontSize: "16pt",
          color: "#1F4A2E", letterSpacing: "0.08em",
        }}>
        <span style={{ color: "#C99E3F" }}>❦ </span>
        {title}
        <span style={{ color: "#C99E3F" }}> ❦</span>
      </h2>
      <div style={{ borderTop: "1px solid rgba(31,74,46,0.18)", marginBottom: 12 }} />
      {children}
    </section>
  );
}

function Ornament({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2 my-2"
      style={{ color: "#C99E3F" }}>
      <span style={{ flex: 1, maxWidth: 80, height: 1, background: "#C99E3F", opacity: 0.5 }} />
      <span style={{ fontSize: "14pt", transform: reverse ? "rotate(180deg)" : undefined }}>❖</span>
      <span style={{ flex: 1, maxWidth: 80, height: 1, background: "#C99E3F", opacity: 0.5 }} />
    </div>
  );
}

function OrnamentFrame() {
  // Subtle corner ornaments — geometric, faith-neutral.
  const corner = (style: React.CSSProperties) => (
    <svg width="48" height="48" viewBox="0 0 48 48" style={style} fill="none">
      <path d="M 8 8 L 8 24 M 8 8 L 24 8" stroke="#C99E3F" strokeWidth="0.8" opacity="0.6" />
      <path d="M 12 12 L 12 22 M 12 12 L 22 12" stroke="#C99E3F" strokeWidth="0.5" opacity="0.4" />
      <circle cx="8" cy="8" r="2" fill="#C99E3F" opacity="0.6" />
    </svg>
  );
  return (
    <>
      {corner({ position: "absolute", top: 24, left: 24 })}
      <span style={{ position: "absolute", top: 24, right: 24, transform: "scaleX(-1)" }}>
        {corner({})}
      </span>
      <span style={{ position: "absolute", bottom: 24, left: 24, transform: "scaleY(-1)" }}>
        {corner({})}
      </span>
      <span style={{ position: "absolute", bottom: 24, right: 24, transform: "scale(-1,-1)" }}>
        {corner({})}
      </span>
    </>
  );
}
