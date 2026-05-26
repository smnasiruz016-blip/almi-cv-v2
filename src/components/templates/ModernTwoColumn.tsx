// ============================================================================
// ModernTwoColumn — Marketing / Sales / Operations / Product. ATS-safe.
// Two-column with peach sidebar (contact + skills) + coral accent.
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

export default function ModernTwoColumn({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article
      className="grid w-[794px] min-h-[1123px] bg-white text-[#2D1B3D] print:shadow-none"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "10.5pt",
        lineHeight: 1.55,
        gridTemplateColumns: "268px 1fr",
      }}
    >
      {/* SIDEBAR */}
      <aside style={{ background: "#FFF1E3", padding: "40px 28px", color: "#2D1B3D" }}>
        {basics.photoUrl ? (
          <img src={basics.photoUrl} alt=""
            className="mx-auto rounded-full object-cover"
            style={{ width: 132, height: 132, marginBottom: 22, border: "3px solid #fff" }} />
        ) : (
          <div className="mx-auto rounded-full flex items-center justify-center"
            style={{
              width: 132, height: 132, marginBottom: 22,
              background: "linear-gradient(135deg, #FF7A6B 0%, #D85A4D 100%)",
              color: "#fff", fontFamily: "Fraunces, serif", fontWeight: 500,
              fontSize: "44pt", letterSpacing: "-0.02em",
            }}>
            {initials(basics.fullName)}
          </div>
        )}

        <SidebarHeading>Contact</SidebarHeading>
        <ul className="m-0 p-0 list-none text-[10pt] text-[#6B5B7A]">
          {basics.email && <SidebarRow label="Email" value={basics.email} />}
          {basics.phone && <SidebarRow label="Phone" value={basics.phone} />}
          {basics.location && <SidebarRow label="Location" value={basics.location} />}
          {basics.website && <SidebarRow label="Web" value={basics.website} />}
          {basics.linkedIn && <SidebarRow label="LinkedIn" value={basics.linkedIn} />}
        </ul>

        {skills.length > 0 && (
          <>
            <SidebarHeading>{getLabel(data, "skills")}</SidebarHeading>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 12).map((s, i) => (
                <span key={i}
                  className="rounded-full bg-white text-[#2D1B3D] font-medium"
                  style={{
                    padding: "4px 10px", fontSize: "9pt",
                    border: "1px solid rgba(45,27,61,0.08)",
                  }}>
                  {s}
                </span>
              ))}
            </div>
          </>
        )}

        {languages.length > 0 && (
          <>
            <SidebarHeading>{getLabel(data, "languages")}</SidebarHeading>
            <ul className="m-0 p-0 list-none text-[10pt] text-[#6B5B7A]">
              {languages.map((l, i) => (
                <li key={i} className="mb-1">
                  <b className="text-[#2D1B3D] font-semibold block text-[9pt] uppercase tracking-wider mb-px">
                    {l.name}
                  </b>
                  {l.level}
                </li>
              ))}
            </ul>
          </>
        )}

        {certifications.length > 0 && (
          <>
            <SidebarHeading>{getLabel(data, "certifications")}</SidebarHeading>
            <ul className="m-0 p-0 list-none text-[10pt] text-[#6B5B7A]">
              {certifications.map((c, i) => (
                <li key={i} className="mb-1.5">
                  {c.name}{c.year ? ` (${c.year})` : ""}
                </li>
              ))}
            </ul>
          </>
        )}

        {interests.length > 0 && (
          <>
            <SidebarHeading>{getLabel(data, "interests")}</SidebarHeading>
            <p className="m-0 text-[10pt] text-[#6B5B7A]">{interests.join(" · ")}</p>
          </>
        )}
      </aside>

      {/* MAIN */}
      <div style={{ padding: "40px 44px" }}>
        <h1 className="m-0" style={{
          fontFamily: "Fraunces, serif", fontWeight: 500,
          fontSize: "36pt", lineHeight: 1, letterSpacing: "-0.02em",
        }}>
          {basics.fullName}
        </h1>
        <p className="m-0 mt-2.5 uppercase" style={{
          fontSize: "11pt", color: "#FF7A6B", fontWeight: 600,
          letterSpacing: "0.16em",
        }}>
          {basics.role}
        </p>

        {!isRichTextEmpty(basics.summary) && (
          <RichTextRender
            html={basics.summary ?? ""}
            as="div"
            className="text-[#6B5B7A] text-[10.5pt]"
            style={{ margin: "18px 0 28px", textWrap: "pretty" }}
          />
        )}

        {experience.length > 0 && (
          <Section title={getLabel(data, "experience")}>
            {experience.map((w, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline gap-3">
                  <div>
                    <p className="m-0 font-semibold text-[#2D1B3D] text-[11pt]">{w.role}</p>
                    <p className="m-0 mt-px text-[10pt] font-medium" style={{ color: "#D85A4D" }}>
                      {w.company}
                    </p>
                  </div>
                  <span className="text-[9pt] text-[#6B5B7A] whitespace-nowrap">
                    {dateRange(w.startDate, w.endDate)}
                  </span>
                </div>
                {w.bullets.length > 0 && (
                  <ul className="mt-1.5 mb-0 pl-4 list-disc text-[#6B5B7A] text-[10pt]">
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
                  <div>
                    <p className="m-0 font-semibold text-[#2D1B3D] text-[11pt]">{e.degree}</p>
                    <p className="m-0 mt-px text-[10pt] font-medium" style={{ color: "#D85A4D" }}>
                      {e.school}
                    </p>
                  </div>
                  <span className="text-[9pt] text-[#6B5B7A] whitespace-nowrap">
                    {dateRange(e.startDate, e.endDate)}
                  </span>
                </div>
                {e.notes && <p className="m-0 mt-0.5 text-[10pt] text-[#9D8FAB]">{e.notes}</p>}
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title={getLabel(data, "projects")}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2.5 last:mb-0">
                <p className="m-0 font-semibold text-[#2D1B3D] text-[11pt]">
                  {p.name}
                  {p.url && (
                    <span className="font-normal text-[10pt]" style={{ color: "#D85A4D" }}>
                      {" · "}{p.url}
                    </span>
                  )}
                </p>
                <p className="m-0 mt-0.5 text-[10pt] text-[#6B5B7A]">{p.description}</p>
              </div>
            ))}
          </Section>
        )}

        {awards.length > 0 && (
          <Section title={getLabel(data, "awards")}>
            <ul className="m-0 p-0 list-none text-[10pt] text-[#6B5B7A]">
              {awards.map((a, i) => (
                <li key={i} className="mb-1">
                  <b className="text-[#2D1B3D] font-semibold">{a.title}</b>
                  {a.issuer ? ` · ${a.issuer}` : ""}
                  {a.year ? ` · ${a.year}` : ""}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </article>
  );
}

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 uppercase" style={{
      marginTop: 22, fontSize: "9pt", fontWeight: 700,
      letterSpacing: "0.2em", color: "#D85A4D",
    }}>
      {children}
    </h2>
  );
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="mb-1.5">
      <b className="text-[#2D1B3D] font-semibold block text-[9pt] uppercase tracking-wider mb-px">
        {label}
      </b>
      <span style={{ wordBreak: "break-word" }}>{value}</span>
    </li>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 last:mb-0">
      <h2 className="m-0 mb-3.5 inline-block uppercase" style={{
        fontSize: "10pt", fontWeight: 700, letterSpacing: "0.2em",
        color: "#2D1B3D", paddingBottom: 6,
        borderBottom: "2px solid #FF7A6B",
      }}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
