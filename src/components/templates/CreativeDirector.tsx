// ============================================================================
// CreativeDirector — Design / Brand / Studio / Art Direction.
// Dark plum hero with coral glow, DM Serif Display H1, white sidebar card.
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

export default function CreativeDirector({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];
  const summaryPlain = stripRichText(basics.summary ?? "");

  return (
    <article className="w-[794px] min-h-[1123px] print:shadow-none"
      style={{
        background: "#FFFBF5", color: "#3B2A45",
        fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55,
      }}>
      {/* HERO */}
      <header className="relative overflow-hidden grid items-end gap-8"
        style={{
          background: "#2D1B3D", color: "#FFFBF5",
          padding: "56px 56px 44px",
          gridTemplateColumns: "1fr auto",
        }}>
        <span className="absolute pointer-events-none"
          style={{
            right: -120, bottom: -120, width: 380, height: 380,
            background: "radial-gradient(circle, rgba(255,122,107,0.5) 0%, transparent 65%)",
          }} />
        <span className="absolute rounded-full pointer-events-none"
          style={{
            left: -80, top: -80, width: 260, height: 260,
            background: "radial-gradient(circle, rgba(212,162,76,0.28), transparent 70%)",
          }} />
        <div className="relative z-10">
          <p className="m-0 mb-3.5 uppercase"
            style={{
              fontSize: "9.5pt", color: "#FF7A6B",
              fontWeight: 600, letterSpacing: "0.28em",
            }}>
            Portfolio · {basics.website ?? basics.email}
          </p>
          <h1 className="m-0"
            style={{
              fontFamily: '"DM Serif Display", serif', fontWeight: 400,
              fontSize: "58pt", lineHeight: 0.95, letterSpacing: "-0.02em",
              color: "#FFFBF5",
            }}>
            {nameWithAccent(basics.fullName)}
          </h1>
          <p className="m-0 mt-4 text-[11pt]"
            style={{ color: "rgba(255,251,245,0.78)", maxWidth: 380, lineHeight: 1.5 }}>
            {basics.role}{summaryPlain ? ` — ${truncate(summaryPlain, 70)}` : ""}
          </p>
        </div>
        <div className="relative z-10 rounded-xl flex items-center justify-center"
          style={{
            width: 150, height: 200,
            background: "linear-gradient(160deg, #FF7A6B 0%, #D85A4D 60%, #5C1F2E 100%)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25), 0 0 0 4px rgba(212,162,76,0.4)",
            color: "#FFFBF5",
            fontFamily: '"DM Serif Display", serif', fontSize: "48pt",
          }}>
          {basics.photoUrl ? (
            <img src={basics.photoUrl} alt="" className="w-full h-full rounded-xl object-cover" />
          ) : initials(basics.fullName)}
        </div>
      </header>

      {/* BODY */}
      <div className="grid gap-10" style={{ padding: "36px 56px 48px", gridTemplateColumns: "1fr 240px" }}>
        <div>
          {!isRichTextEmpty(basics.summary) && (
            <Section title={getLabel(data, "profile")}>
              <RichTextRender
                html={basics.summary ?? ""}
                as="div"
                className="m-0 text-[10.5pt]"
                style={{ color: "#3B2A45", lineHeight: 1.6, textWrap: "pretty" }}
              />
            </Section>
          )}

          {experience.length > 0 && (
            <Section title={`Selected ${getLabel(data, "experience").toLowerCase()}`}>
              {experience.map((w, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline gap-3">
                    <div>
                      <p className="m-0"
                        style={{
                          fontFamily: '"DM Serif Display", serif',
                          fontWeight: 400, fontSize: "13pt", color: "#2D1B3D",
                          letterSpacing: "-0.01em",
                        }}>
                        {w.role}
                      </p>
                      <p className="m-0 mt-px text-[10pt] font-semibold" style={{ color: "#D85A4D" }}>
                        {w.company}
                      </p>
                    </div>
                    <span className="text-[9pt] text-[#6B5B7A] whitespace-nowrap">
                      {dateRange(w.startDate, w.endDate)}
                    </span>
                  </div>
                  {w.bullets.length > 0 && (
                    <ul className="m-0 mt-1.5 pl-4 list-disc text-[#6B5B7A] text-[10pt]">
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

          {projects.length > 0 && (
            <Section title={getLabel(data, "projects")}>
              {projects.map((p, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <p className="m-0"
                    style={{
                      fontFamily: '"DM Serif Display", serif',
                      fontWeight: 400, fontSize: "13pt", color: "#2D1B3D",
                    }}>
                    {p.name}
                  </p>
                  {p.url && (
                    <p className="m-0 mt-px text-[10pt] font-semibold" style={{ color: "#D85A4D" }}>
                      {p.url}
                    </p>
                  )}
                  <p className="m-0 mt-1 text-[10pt] text-[#6B5B7A]">{p.description}</p>
                </div>
              ))}
            </Section>
          )}

          {education.length > 0 && (
            <Section title={getLabel(data, "education")}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <div className="flex justify-between items-baseline gap-3">
                    <p className="m-0"
                      style={{
                        fontFamily: '"DM Serif Display", serif',
                        fontWeight: 400, fontSize: "13pt", color: "#2D1B3D",
                      }}>
                      {e.degree}
                    </p>
                    <span className="text-[9pt] text-[#6B5B7A] whitespace-nowrap">
                      {dateRange(e.startDate, e.endDate)}
                    </span>
                  </div>
                  <p className="m-0 mt-px text-[10pt] font-semibold" style={{ color: "#D85A4D" }}>{e.school}</p>
                  {e.notes && <p className="m-0 mt-px text-[10pt] text-[#6B5B7A]">{e.notes}</p>}
                </div>
              ))}
            </Section>
          )}

          {awards.length > 0 && (
            <Section title={getLabel(data, "awards")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B2A45]" style={{ lineHeight: 1.6 }}>
                {awards.map((a, i) => (
                  <li key={i} style={{ padding: "3px 0" }}>
                    <b className="text-[#2D1B3D] font-semibold">{a.title}</b>
                    {a.issuer ? ` · ${a.issuer}` : ""}
                    {a.year ? ` · ${a.year}` : ""}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <aside className="bg-white"
          style={{
            border: "1px solid rgba(45,27,61,0.12)",
            borderRadius: 14, padding: "24px 22px",
          }}>
          <div style={{
            fontSize: "9.5pt", color: "#6B5B7A",
            lineHeight: 1.65, borderLeft: "2px solid #FF7A6B",
            paddingLeft: 14, marginBottom: 22,
          }}>
            <b className="block text-[#2D1B3D] font-semibold">{basics.fullName}</b>
            {basics.email}<br />
            {basics.phone}<br />
            {basics.location}<br />
            {basics.website}
            {basics.linkedIn && <><br />{basics.linkedIn}</>}
          </div>

          {skills.length > 0 && (
            <AsideSection title="Capabilities">
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B2A45]" style={{ lineHeight: 1.6 }}>
                {skills.slice(0, 8).map((s, i) => (<li key={i} style={{ padding: "2px 0" }}>{s}</li>))}
              </ul>
            </AsideSection>
          )}

          {certifications.length > 0 && (
            <AsideSection title={getLabel(data, "certifications")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B2A45]" style={{ lineHeight: 1.6 }}>
                {certifications.map((c, i) => (
                  <li key={i} style={{ padding: "2px 0" }}>
                    {c.name}{c.year ? ` · ${c.year}` : ""}
                  </li>
                ))}
              </ul>
            </AsideSection>
          )}

          {languages.length > 0 && (
            <AsideSection title={getLabel(data, "languages")}>
              <ul className="m-0 p-0 list-none text-[10pt] text-[#3B2A45]" style={{ lineHeight: 1.6 }}>
                {languages.map((l, i) => (
                  <li key={i} style={{ padding: "2px 0" }}>
                    <b className="text-[#2D1B3D] font-semibold">{l.name}</b> {l.level}
                  </li>
                ))}
              </ul>
            </AsideSection>
          )}

          {interests.length > 0 && (
            <AsideSection title={getLabel(data, "interests")}>
              <p className="m-0 text-[10pt] text-[#3B2A45]" style={{ lineHeight: 1.6 }}>
                {interests.join(" · ")}
              </p>
            </AsideSection>
          )}
        </aside>
      </div>
    </article>
  );
}

// Render the last name in coral italic — the signature "Jordan Kane" treatment.
function nameWithAccent(fullName: string) {
  const parts = (fullName ?? "").trim().split(/\s+/);
  if (parts.length === 0) return null;
  if (parts.length === 1) return <>{parts[0]}</>;
  return (
    <>
      {parts.slice(0, -1).join(" ")}{" "}
      <em style={{ fontStyle: "italic", color: "#FF7A6B" }}>{parts[parts.length - 1]}</em>
    </>
  );
}

function truncate(s: string, max: number) {
  return s.length <= max ? s : s.slice(0, max).trimEnd() + "…";
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 last:mb-0">
      <h2 className="m-0 mb-3.5 relative"
        style={{
          fontFamily: '"DM Serif Display", serif',
          fontWeight: 400, fontSize: "16pt", color: "#2D1B3D",
          letterSpacing: "-0.01em", paddingLeft: 18,
        }}>
        <span className="absolute rounded-full"
          style={{ left: 0, top: "50%", transform: "translateY(-50%)",
            width: 10, height: 10, background: "#FF7A6B" }} />
        {title}
      </h2>
      {children}
    </section>
  );
}

function AsideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <h3 className="m-0 mb-2.5 uppercase"
        style={{
          fontSize: "9pt", fontWeight: 700,
          letterSpacing: "0.22em", color: "#D85A4D",
        }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
