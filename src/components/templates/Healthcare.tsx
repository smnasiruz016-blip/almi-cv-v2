// ============================================================================
// Healthcare — Nursing / Doctors / Allied Health. ATS-safe.
// Forest + sage palette, credential pills, balanced two-column body.
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

export default function Healthcare({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  // The first 3 certs surface as credential pills next to the name.
  const headerCreds = certifications.slice(0, 3);
  const otherCerts = certifications.slice(3);

  return (
    <article className="w-[794px] min-h-[1123px] bg-white text-[#2D3D2E] print:shadow-none"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "10.5pt", lineHeight: 1.55 }}>

      {/* HEADER */}
      <header className="grid items-start gap-7"
        style={{
          padding: "40px 48px",
          background: "#F0F8F3",
          borderBottom: "3px solid #A8D5BA",
          gridTemplateColumns: "130px 1fr",
        }}>
        {basics.photoUrl ? (
          <img src={basics.photoUrl} alt=""
            className="rounded-full object-cover"
            style={{ width: 130, height: 130 }} />
        ) : (
          <div className="rounded-full flex items-center justify-center"
            style={{
              width: 130, height: 130,
              background: "linear-gradient(135deg, #C7E4D2 0%, #5C8C6F 100%)",
              color: "#fff", fontFamily: "Lora, serif", fontWeight: 600,
              fontSize: "46pt", letterSpacing: "-0.02em",
            }}>
            {initials(basics.fullName)}
          </div>
        )}
        <div>
          {headerCreds.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {headerCreds.map((c, i) => (
                <span key={i}
                  className="rounded-full bg-white font-semibold whitespace-nowrap"
                  style={{
                    border: "1px solid #A8D5BA", color: "#1F4A2E",
                    padding: "3px 11px", fontSize: "8.5pt",
                  }}>
                  {c.name}
                </span>
              ))}
            </div>
          )}
          <h1 className="m-0 mt-1"
            style={{
              fontFamily: "Lora, serif", fontWeight: 600,
              fontSize: "30pt", lineHeight: 1.1,
              letterSpacing: "-0.01em", color: "#1F4A2E",
            }}>
            {basics.fullName}
          </h1>
          <p className="m-0 mt-2 mb-3 uppercase"
            style={{
              fontSize: "11pt", color: "#5C8C6F",
              fontWeight: 600, letterSpacing: "0.16em",
            }}>
            {basics.role}
          </p>
          <div className="grid gap-y-1 gap-x-5 text-[9.5pt] text-[#5A6F5C]"
            style={{ gridTemplateColumns: "1fr 1fr", marginTop: 14 }}>
            {basics.email && <ContactItem label="Email" value={basics.email} />}
            {basics.phone && <ContactItem label="Phone" value={basics.phone} />}
            {basics.location && <ContactItem label="Location" value={basics.location} />}
            {basics.website && <ContactItem label="Web" value={basics.website} />}
            {basics.linkedIn && <ContactItem label="LinkedIn" value={basics.linkedIn} />}
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="grid gap-9"
        style={{ padding: "36px 48px 44px", gridTemplateColumns: "1fr 1fr" }}>

        {!isRichTextEmpty(basics.summary) && (
          <Section title={getLabel(data, "profile")} className="col-span-2"
            style={{ gridColumn: "1 / -1" }}>
            <RichTextRender
              html={basics.summary ?? ""}
              as="div"
              className="m-0 text-[#2D3D2E] text-[10.5pt]"
              style={{ textWrap: "pretty" }}
            />
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience")} style={{ gridColumn: "1 / -1" }}>
            {experience.map((w, i) => (
              <div key={i} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[#1F4A2E] text-[11pt]">{w.role}</p>
                    <p className="m-0 mt-px italic text-[10pt]"
                      style={{ color: "#5C8C6F", fontWeight: 500 }}>
                      {w.company}
                    </p>
                  </div>
                  <span className="text-[9pt] text-[#5A6F5C] whitespace-nowrap">
                    {dateRange(w.startDate, w.endDate)}
                  </span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="m-0 mt-1.5 pl-4 list-disc text-[#5A6F5C] text-[10pt]">
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
          <Section title={getLabel(data, "projects")} style={{ gridColumn: "1 / -1" }}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2.5 last:mb-0">
                <p className="m-0 font-semibold text-[#1F4A2E] text-[11pt]">
                  {p.name}
                  {p.url && (
                    <span className="italic font-medium text-[10pt]" style={{ color: "#5C8C6F" }}>
                      {" · "}{p.url}
                    </span>
                  )}
                </p>
                <p className="m-0 mt-0.5 text-[10pt] text-[#5A6F5C]">{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section title={getLabel(data, "education")}>
            {education.map((e, i) => (
              <div key={i} className="mb-2.5 last:mb-0">
                <p className="m-0 font-semibold text-[#1F4A2E] text-[11pt]">{e.degree}</p>
                <p className="m-0 mt-px italic text-[10pt]"
                  style={{ color: "#5C8C6F", fontWeight: 500 }}>{e.school}</p>
                <p className="m-0 mt-px text-[9pt] text-[#5A6F5C]">
                  {dateRange(e.startDate, e.endDate)}
                  {e.notes ? ` · ${e.notes}` : ""}
                </p>
              </div>
            ))}
          </Section>
        )}

        {skills.length > 0 && (
          <Section title={getLabel(data, "skills")}>
            <div className="grid gap-y-0.5 gap-x-4 text-[10pt] text-[#2D3D2E]"
              style={{ gridTemplateColumns: "1fr 1fr" }}>
              {skills.map((s, i) => (
                <div key={i}>
                  <span style={{ color: "#5C8C6F", fontWeight: 700, marginRight: 6 }}>•</span>
                  {s}
                </div>
              ))}
            </div>
          </Section>
        )}

        {otherCerts.length > 0 && (
          <Section title={getLabel(data, "certifications")}>
            <ul className="m-0 p-0 list-none text-[10pt] text-[#2D3D2E]">
              {otherCerts.map((c, i) => (
                <li key={i} style={{
                  padding: "4px 0",
                  borderBottom: i < otherCerts.length - 1 ? "1px solid rgba(31,74,46,0.18)" : "0",
                }}>
                  {c.name}{c.issuer ? ` — ${c.issuer}` : ""}{c.year ? `, ${c.year}` : ""}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {languages.length > 0 && (
          <Section title={getLabel(data, "languages")}>
            <ul className="m-0 p-0 list-none text-[10pt] text-[#2D3D2E]">
              {languages.map((l, i) => (
                <li key={i} style={{
                  padding: "4px 0",
                  borderBottom: i < languages.length - 1 ? "1px solid rgba(31,74,46,0.18)" : "0",
                }}>
                  <b className="font-semibold text-[#1F4A2E]">{l.name}</b>
                  <span className="float-right text-[9pt] text-[#5A6F5C]">{l.level}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {awards.length > 0 && (
          <Section title={getLabel(data, "awards")}>
            <ul className="m-0 p-0 list-none text-[10pt] text-[#2D3D2E]">
              {awards.map((a, i) => (
                <li key={i} style={{
                  padding: "4px 0",
                  borderBottom: i < awards.length - 1 ? "1px solid rgba(31,74,46,0.18)" : "0",
                }}>
                  <b className="font-semibold text-[#1F4A2E]">{a.title}</b>
                  {a.issuer ? ` — ${a.issuer}` : ""}
                  {a.year ? `, ${a.year}` : ""}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {interests.length > 0 && (
          <Section title={getLabel(data, "interests")} style={{ gridColumn: "1 / -1" }}>
            <p className="m-0 text-[10pt] text-[#2D3D2E]">{interests.join(" · ")}</p>
          </Section>
        )}
      </div>
    </article>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <b className="text-[#1F4A2E] font-semibold mr-1.5">{label}</b>{value}
    </div>
  );
}

function Section({
  title, children, style, className,
}: { title: string; children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <section className={className} style={style}>
      <h2 className="m-0 mb-3 flex items-center gap-2"
        style={{
          fontFamily: "Lora, serif", fontWeight: 600, fontSize: "13pt",
          color: "#1F4A2E", paddingBottom: 6,
          borderBottom: "1px solid rgba(31,74,46,0.18)",
        }}>
        <span className="rounded-full"
          style={{ width: 8, height: 8, background: "#A8D5BA" }} />
        {title}
      </h2>
      {children}
    </section>
  );
}
