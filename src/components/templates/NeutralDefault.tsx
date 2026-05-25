// PR #53 — sole CV template after the Recipe-system purge.
//
// Design intent (per founder): clean, ATS-friendly, A4-print-safe, no
// branding, no color theming, no fancy graphics. Just typography +
// good whitespace. The builder uses this same component for both the
// live preview pane and the print pipeline, so we keep the layout
// pure-CSS and avoid any client-only hooks — server-rendering must be
// indistinguishable from the print fallback.
//
// Sections are conditionally rendered: a section is omitted when its
// data array is empty / its required text is missing. The user clicks
// a TemplateImage, the parsed seed flows in via Resume.data, and only
// the sections the PNG actually surfaced get drawn.

import { Fragment } from "react";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import type { CVData, SectionLabels } from "@/lib/cv-types";

const DEFAULT_LABELS: Required<SectionLabels> = {
  profile: "Profile",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  languages: "Languages",
  awards: "Awards",
  certifications: "Certifications",
  interests: "Interests",
};

function label(data: CVData, key: keyof SectionLabels): string {
  return data.sectionLabels?.[key]?.trim() || DEFAULT_LABELS[key];
}

function dateRange(start: string | undefined, end: string | undefined): string {
  const s = start?.trim() ?? "";
  const e = end?.trim() ?? "";
  if (s && e) return `${s} — ${e}`;
  if (s) return `${s} — Present`;
  if (e) return e;
  return "";
}

export function NeutralDefault({
  data,
  paginated: _paginated,
  printSafe: _printSafe,
}: {
  data: CVData;
  paginated?: boolean;
  printSafe?: boolean;
}) {
  const b = data.basics;
  const fullName = b.fullName?.trim();
  const role = b.role?.trim();
  const contactBits = [b.email, b.phone, b.location, b.website, b.linkedIn]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));

  const hasSummary = !isRichTextEmpty(b.summary);
  const experience = (data.experience ?? []).filter(
    (e) => e.company?.trim() && e.role?.trim(),
  );
  const education = (data.education ?? []).filter(
    (e) => e.school?.trim() && e.degree?.trim(),
  );
  const skills = (data.skills ?? []).filter((s) => s.trim());
  const projects = (data.projects ?? []).filter(
    (p) => p.name?.trim() && p.description?.trim(),
  );
  const languages = (data.languages ?? []).filter(
    (l) => l.name?.trim() && l.level?.trim(),
  );
  const certifications = (data.certifications ?? []).filter(
    (c) => c.name?.trim(),
  );
  const awards = (data.awards ?? []).filter((a) => a.title?.trim());
  const interests = (data.interests ?? []).filter((i) => i.trim());

  return (
    <div
      // A4 width ≈ 794px @ 96dpi. Templates render at this fixed width
      // and the preview pane scales them via CSS transform.
      style={{
        width: 794,
        minHeight: 1123,
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        fontFamily:
          'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: 11,
        lineHeight: 1.5,
        padding: "48px 56px",
        boxSizing: "border-box",
      }}
    >
      {/* Header — name, role, contact */}
      <header style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {b.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={b.photoUrl}
              alt={fullName ?? ""}
              width={88}
              height={88}
              style={{
                width: 88,
                height: 88,
                objectFit: "cover",
                borderRadius: 6,
                flexShrink: 0,
              }}
            />
          ) : null}
          <div style={{ flex: 1, minWidth: 0 }}>
            {fullName ? (
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  color: "#0f0f0f",
                }}
              >
                {fullName}
              </h1>
            ) : null}
            {role ? (
              <p
                style={{
                  fontSize: 13,
                  color: "#444",
                  margin: "4px 0 0",
                }}
              >
                {role}
              </p>
            ) : null}
            {contactBits.length > 0 ? (
              <p
                style={{
                  fontSize: 10.5,
                  color: "#555",
                  margin: "10px 0 0",
                  lineHeight: 1.6,
                }}
              >
                {contactBits.map((bit, i) => (
                  <Fragment key={i}>
                    {i > 0 ? <span style={{ margin: "0 8px" }}>·</span> : null}
                    {bit}
                  </Fragment>
                ))}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      {hasSummary ? (
        <Section title={label(data, "profile")}>
          <RichTextRender html={b.summary ?? ""} as="div" />
        </Section>
      ) : null}

      {experience.length > 0 ? (
        <Section title={label(data, "experience")}>
          {experience.map((e, i) => {
            const range = dateRange(e.startDate, e.endDate);
            const bullets = (e.bullets ?? []).filter((bt) => !isRichTextEmpty(bt));
            return (
              <div key={i} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "baseline",
                  }}
                >
                  <p style={{ fontWeight: 600, margin: 0 }}>
                    {e.role}
                    <span style={{ fontWeight: 400, color: "#555" }}>
                      {" · "}
                      {e.company}
                    </span>
                  </p>
                  {range ? (
                    <p
                      style={{
                        fontSize: 10,
                        color: "#666",
                        margin: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {range}
                    </p>
                  ) : null}
                </div>
                {e.location?.trim() ? (
                  <p
                    style={{
                      fontSize: 10,
                      color: "#666",
                      margin: "2px 0 0",
                    }}
                  >
                    {e.location}
                  </p>
                ) : null}
                {bullets.length > 0 ? (
                  <ul
                    style={{
                      margin: "6px 0 0",
                      paddingLeft: 18,
                      listStyleType: "disc",
                    }}
                  >
                    {bullets.map((bt, bi) => (
                      <li key={bi} style={{ marginBottom: 2 }}>
                        <RichTextRender html={bt} as="span" />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </Section>
      ) : null}

      {education.length > 0 ? (
        <Section title={label(data, "education")}>
          {education.map((e, i) => {
            const range = dateRange(e.startDate, e.endDate);
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "baseline",
                  }}
                >
                  <p style={{ fontWeight: 600, margin: 0 }}>
                    {e.degree}
                    <span style={{ fontWeight: 400, color: "#555" }}>
                      {" · "}
                      {e.school}
                    </span>
                  </p>
                  {range ? (
                    <p
                      style={{
                        fontSize: 10,
                        color: "#666",
                        margin: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {range}
                    </p>
                  ) : null}
                </div>
                {e.location?.trim() ? (
                  <p
                    style={{ fontSize: 10, color: "#666", margin: "2px 0 0" }}
                  >
                    {e.location}
                  </p>
                ) : null}
                {e.notes?.trim() ? (
                  <p style={{ fontSize: 10.5, margin: "4px 0 0" }}>{e.notes}</p>
                ) : null}
              </div>
            );
          })}
        </Section>
      ) : null}

      {skills.length > 0 ? (
        <Section title={label(data, "skills")}>
          <p style={{ margin: 0 }}>{skills.join(" · ")}</p>
        </Section>
      ) : null}

      {projects.length > 0 ? (
        <Section title={label(data, "projects")}>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <p style={{ fontWeight: 600, margin: 0 }}>
                {p.name}
                {p.url ? (
                  <span style={{ fontWeight: 400, color: "#555" }}>
                    {" · "}
                    {p.url}
                  </span>
                ) : null}
              </p>
              <p style={{ margin: "2px 0 0" }}>{p.description}</p>
            </div>
          ))}
        </Section>
      ) : null}

      {languages.length > 0 ? (
        <Section title={label(data, "languages")}>
          <p style={{ margin: 0 }}>
            {languages.map((l, i) => (
              <Fragment key={i}>
                {i > 0 ? <span style={{ margin: "0 8px" }}>·</span> : null}
                <span style={{ fontWeight: 500 }}>{l.name}</span>{" "}
                <span style={{ color: "#666" }}>({l.level})</span>
              </Fragment>
            ))}
          </p>
        </Section>
      ) : null}

      {certifications.length > 0 ? (
        <Section title={label(data, "certifications")}>
          {certifications.map((c, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <span style={{ fontWeight: 600 }}>{c.name}</span>
              {c.issuer ? (
                <span style={{ color: "#555" }}>{" · " + c.issuer}</span>
              ) : null}
              {c.year ? (
                <span style={{ color: "#666" }}>{" · " + c.year}</span>
              ) : null}
            </div>
          ))}
        </Section>
      ) : null}

      {awards.length > 0 ? (
        <Section title={label(data, "awards")}>
          {awards.map((a, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <span style={{ fontWeight: 600 }}>{a.title}</span>
              {a.issuer ? (
                <span style={{ color: "#555" }}>{" · " + a.issuer}</span>
              ) : null}
              {a.year ? (
                <span style={{ color: "#666" }}>{" · " + a.year}</span>
              ) : null}
            </div>
          ))}
        </Section>
      ) : null}

      {interests.length > 0 ? (
        <Section title={label(data, "interests")}>
          <p style={{ margin: 0 }}>{interests.join(" · ")}</p>
        </Section>
      ) : null}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 18 }}>
      <h2
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#0f0f0f",
          borderBottom: "1px solid #d0d0d0",
          paddingBottom: 4,
          margin: "0 0 8px",
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
