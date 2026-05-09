"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle } from "@/lib/cv-themes";
import { RichTextRender, isRichTextEmpty } from "@/lib/rich-text";
import { PaginatedCV, type PaginatedSection } from "./PaginatedCV";

// ─── Fixed palette ────────────────────────────────────────────────────────────
const NAVY = "#1A2744";
const NAVY_DEEP = "#111C36";
const GOLD = "#C9A84C";
const GOLD_SOFT = "rgba(201,168,76,0.18)";
const WHITE = "#FFFFFF";
const OFF_WHITE = "#F7F8FA";
const BODY = "#2D3748";
const SOFT = "#718096";
const FAINT = "#CBD5E0";

// ─── Context ──────────────────────────────────────────────────────────────────
type VeronaCtx = {
  headingFont: ReturnType<typeof resolveStyle>["headingFont"];
  bodyFont: ReturnType<typeof resolveStyle>["bodyFont"];
  density: ReturnType<typeof resolveStyle>["density"];
  photoStyle: ReturnType<typeof resolveStyle>["photoStyle"];
  densityClass: string;
  showPhoto: boolean;
  headingFamily: string;
  bodyFamily: string;
};

function computeCtx(data: CVData): VeronaCtx {
  const { headingFont, bodyFont, density, photoStyle } = resolveStyle(
    data?.style,
  );
  return {
    headingFont,
    bodyFont,
    density,
    photoStyle,
    densityClass:
      density === "compact" ? "compact" : density === "spacious" ? "spacious" : "",
    showPhoto: photoStyle !== "none",
    headingFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
    bodyFamily: `${bodyFont.cssVar}, ${bodyFont.fallback}`,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  const parts = (name || "").trim().split(/\s+/);
  if (!parts[0]) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─── Sidebar section heading ──────────────────────────────────────────────────
function SidebarHeading({
  children,
  ctx,
}: {
  children: ReactNode;
  ctx: VeronaCtx;
}) {
  return (
    <div className="mb-3">
      <h2
        style={{
          fontFamily: ctx.headingFamily,
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: GOLD,
        }}
      >
        {children}
      </h2>
      <div
        style={{
          marginTop: 4,
          height: 1,
          width: 28,
          backgroundColor: GOLD,
          opacity: 0.6,
        }}
      />
    </div>
  );
}

// ─── Main section heading ─────────────────────────────────────────────────────
function MainHeading({
  children,
  ctx,
}: {
  children: ReactNode;
  ctx: VeronaCtx;
}) {
  return (
    <div className="mb-3">
      <h2
        style={{
          fontFamily: ctx.headingFamily,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: NAVY,
        }}
      >
        {children}
      </h2>
      <div
        style={{
          marginTop: 3,
          height: 2,
          width: 32,
          backgroundColor: GOLD,
        }}
      />
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function VeronaSidebar({ ctx, data }: { ctx: VeronaCtx; data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];
  const certifications = data?.certifications ?? [];

  const contactItems: { Icon: typeof Mail; label: string; key: string }[] = [
    basics.phone
      ? { key: "phone", Icon: Phone, label: basics.phone }
      : null,
    basics.email
      ? { key: "email", Icon: Mail, label: basics.email }
      : null,
    basics.location
      ? { key: "location", Icon: MapPin, label: basics.location }
      : null,
    basics.website
      ? { key: "website", Icon: Globe, label: basics.website }
      : null,
    basics.linkedIn
      ? { key: "linkedin", Icon: Link2, label: basics.linkedIn }
      : null,
  ].filter(Boolean) as { Icon: typeof Mail; label: string; key: string }[];

  return (
    <div
      style={{
        width: "37%",
        flexShrink: 0,
        backgroundColor: NAVY,
        padding: "40px 20px 40px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Photo */}
      {ctx.showPhoto && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          {basics.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={basics.fullName ?? ""}
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                objectFit: "cover",
                border: `3px solid ${GOLD}`,
              }}
            />
          ) : (
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                backgroundColor: NAVY_DEEP,
                border: `3px solid ${GOLD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: ctx.headingFamily,
                fontSize: 36,
                fontWeight: 700,
                color: GOLD,
              }}
            >
              {getInitials(basics.fullName ?? "")}
            </div>
          )}
        </div>
      )}

      {/* Contact */}
      {contactItems.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <SidebarHeading ctx={ctx}>Contacto</SidebarHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {contactItems.map(({ key, Icon, label }) => (
              <div
                key={key}
                style={{ display: "flex", alignItems: "flex-start", gap: 7 }}
              >
                <Icon
                  style={{
                    width: 11,
                    height: 11,
                    color: GOLD,
                    marginTop: 1,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: ctx.bodyFamily,
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.4,
                    wordBreak: "break-word",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {contactItems.length > 0 && (skills.length > 0 || languages.length > 0) && (
        <div
          style={{
            height: 1,
            backgroundColor: "rgba(255,255,255,0.1)",
            marginBottom: 20,
          }}
        />
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <SidebarHeading ctx={ctx}>Habilidades</SidebarHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {skills.map((skill, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: GOLD,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: ctx.bodyFamily,
                    fontSize: 9.5,
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.3,
                  }}
                >
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <SidebarHeading ctx={ctx}>Idiomas</SidebarHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {languages.map((lang, i) => (
              <div key={i}>
                <span
                  style={{
                    fontFamily: ctx.bodyFamily,
                    fontSize: 9.5,
                    fontWeight: 600,
                    color: WHITE,
                    display: "block",
                  }}
                >
                  {lang.name}
                </span>
                {lang.level && (
                  <span
                    style={{
                      fontFamily: ctx.bodyFamily,
                      fontSize: 8.5,
                      color: "rgba(255,255,255,0.55)",
                      fontStyle: "italic",
                    }}
                  >
                    {lang.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <SidebarHeading ctx={ctx}>Certificaciones</SidebarHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {certifications.map((cert, i) => (
              <div key={i}>
                <span
                  style={{
                    fontFamily: ctx.bodyFamily,
                    fontSize: 9.5,
                    fontWeight: 600,
                    color: WHITE,
                    display: "block",
                    lineHeight: 1.3,
                  }}
                >
                  {cert.name}
                </span>
                {(cert.issuer || cert.year) && (
                  <span
                    style={{
                      fontFamily: ctx.bodyFamily,
                      fontSize: 8.5,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {[cert.issuer, cert.year].filter(Boolean).join(" · ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────
function VeronaMain({ ctx, data }: { ctx: VeronaCtx; data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const awards = data?.awards ?? [];

  const displayName = basics.fullName?.trim() || "Untitled";

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: WHITE,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header band */}
      <div
        style={{
          backgroundColor: OFF_WHITE,
          padding: "32px 28px 24px 28px",
          borderBottom: `3px solid ${GOLD}`,
        }}
      >
        <h1
          style={{
            fontFamily: ctx.headingFamily,
            fontSize: 28,
            fontWeight: 700,
            color: NAVY,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {displayName}
        </h1>
        {basics.role && (
          <p
            style={{
              fontFamily: ctx.bodyFamily,
              fontSize: 11,
              fontWeight: 500,
              color: GOLD,
              marginTop: 5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {basics.role}
          </p>
        )}
        {!isRichTextEmpty(basics.summary) && (
          <RichTextRender
            html={basics.summary ?? ""}
            as="p"
            style={{
              fontFamily: ctx.bodyFamily,
              fontSize: 9.5,
              color: SOFT,
              lineHeight: 1.55,
              marginTop: 10,
            }}
          />
        )}
      </div>

      {/* Body sections */}
      <div style={{ padding: "22px 28px 28px 28px", flex: 1 }}>
        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <MainHeading ctx={ctx}>Experiencia</MainHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {experience.map((job, i) => (
                <div key={`${job.company}-${i}`}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: ctx.bodyFamily,
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: BODY,
                          margin: 0,
                        }}
                      >
                        {job.role || job.company}
                      </p>
                      {job.role && (
                        <p
                          style={{
                            fontFamily: ctx.bodyFamily,
                            fontSize: 9.5,
                            fontWeight: 600,
                            color: NAVY,
                            margin: "1px 0 0 0",
                          }}
                        >
                          {job.company}
                          {job.location ? ` · ${job.location}` : ""}
                        </p>
                      )}
                    </div>
                    <p
                      style={{
                        fontFamily: ctx.bodyFamily,
                        fontSize: 8.5,
                        color: SOFT,
                        whiteSpace: "nowrap",
                        margin: 0,
                        paddingTop: 1,
                      }}
                    >
                      {job.startDate} — {job.endDate ?? "Presente"}
                    </p>
                  </div>
                  {job.bullets?.some((b) => !isRichTextEmpty(b)) && (
                    <ul style={{ margin: "5px 0 0 0", padding: 0, listStyle: "none" }}>
                      {job.bullets
                        .filter((b) => !isRichTextEmpty(b))
                        .map((bullet, bi) => (
                          <li
                            key={bi}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 6,
                              marginBottom: 3,
                            }}
                          >
                            <span
                              style={{
                                width: 4,
                                height: 4,
                                borderRadius: "50%",
                                backgroundColor: GOLD,
                                marginTop: 4,
                                flexShrink: 0,
                              }}
                            />
                            <RichTextRender
                              html={bullet}
                              as="span"
                              style={{
                                fontFamily: ctx.bodyFamily,
                                fontSize: 9,
                                color: BODY,
                                lineHeight: 1.45,
                              }}
                            />
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <MainHeading ctx={ctx}>Formación</MainHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {education.map((entry, i) => (
                <div
                  key={`${entry.school}-${i}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: ctx.bodyFamily,
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: BODY,
                        margin: 0,
                      }}
                    >
                      {entry.degree}
                    </p>
                    <p
                      style={{
                        fontFamily: ctx.bodyFamily,
                        fontSize: 9.5,
                        color: NAVY,
                        fontWeight: 500,
                        margin: "2px 0 0 0",
                      }}
                    >
                      {entry.school}
                      {entry.location ? ` · ${entry.location}` : ""}
                    </p>
                    {entry.notes && (
                      <p
                        style={{
                          fontFamily: ctx.bodyFamily,
                          fontSize: 8.5,
                          color: SOFT,
                          margin: "2px 0 0 0",
                        }}
                      >
                        {entry.notes}
                      </p>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: ctx.bodyFamily,
                      fontSize: 8.5,
                      color: SOFT,
                      whiteSpace: "nowrap",
                      margin: 0,
                      paddingTop: 1,
                    }}
                  >
                    {entry.startDate} — {entry.endDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <section>
            <MainHeading ctx={ctx}>Logros</MainHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {awards.map((award, i) => (
                <div key={i}>
                  <p
                    style={{
                      fontFamily: ctx.bodyFamily,
                      fontSize: 10,
                      fontWeight: 700,
                      color: BODY,
                      margin: 0,
                    }}
                  >
                    {award.title}
                  </p>
                  {(award.issuer || award.year) && (
                    <p
                      style={{
                        fontFamily: ctx.bodyFamily,
                        fontSize: 8.5,
                        color: SOFT,
                        margin: "2px 0 0 0",
                      }}
                    >
                      {[award.issuer, award.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────
function VeronaPage({
  ctx,
  data,
  isFirstPage,
  paginated,
  children,
}: {
  ctx: VeronaCtx;
  data: CVData;
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  paginated: boolean;
  children?: ReactNode;
}) {
  const articleStyle: CSSProperties = paginated
    ? {
        fontFamily: ctx.bodyFamily,
        width: 794,
        minHeight: 1123,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        backgroundColor: WHITE,
      }
    : {
        fontFamily: ctx.bodyFamily,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        backgroundColor: WHITE,
      };

  const articleEl = (
    <article
      className={`cv-page ${paginated ? "" : "mx-auto aspect-[210/297] max-w-[800px]"} w-full overflow-hidden rounded-lg shadow-warm-card-hover ${ctx.densityClass}`.trim()}
      style={articleStyle}
    >
      {isFirstPage ? (
        <>
          <VeronaSidebar ctx={ctx} data={data} />
          <VeronaMain ctx={ctx} data={data} />
        </>
      ) : (
        // Continuation pages: sidebar strip + main content
        <>
          <div style={{ width: "37%", flexShrink: 0, backgroundColor: NAVY }} />
          <div style={{ flex: 1, backgroundColor: WHITE, padding: "28px 28px" }}>
            {children}
          </div>
        </>
      )}
    </article>
  );

  if (!paginated) return articleEl;

  return (
    <div
      className="cv-preview-wrapper mx-auto"
      style={{ width: 600, height: 849, overflow: "hidden" }}
    >
      <div
        style={{
          transform: "scale(0.7556)",
          transformOrigin: "top left",
          width: 794,
        }}
      >
        {articleEl}
      </div>
    </div>
  );
}

// ─── Sections for paginator ───────────────────────────────────────────────────
function buildVeronaSections(
  data: CVData,
  ctx: VeronaCtx,
): PaginatedSection[] {
  // For Verona the sidebar is always rendered by isFirstPage logic.
  // We only need to return the main-column sections so PaginatedCV can
  // flow overflow content onto continuation pages.
  return [
    {
      key: "main",
      node: <VeronaMain ctx={ctx} data={data} />,
    },
  ];
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function Verona({
  data,
  paginated = false,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const ctx = computeCtx(data);

  if (paginated) {
    const sections = buildVeronaSections(data, ctx);
    return (
      <PaginatedCV
        sections={sections}
        PageShell={(props) => (
          <VeronaPage ctx={ctx} data={data} paginated {...props} />
        )}
        contentWidth={490}
        pageHeight={950}
      />
    );
  }

  return (
    <VeronaPage
      ctx={ctx}
      data={data}
      pageIndex={0}
      pageCount={1}
      isFirstPage
      paginated={false}
    />
  );
}
