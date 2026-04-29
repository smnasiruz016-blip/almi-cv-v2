import type { CSSProperties } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import {
  formatSectionTitle,
  resolveStyle,
  sectionVariantStyle,
  withAlpha,
} from "@/lib/cv-themes";

export function ClassicSerif({ data }: { data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];
  const certifications = data?.certifications ?? [];
  const interests = data?.interests ?? [];

  const {
    theme,
    themeCategory,
    headingFont,
    bodyFont,
    density,
    sectionStyle,
    photoStyle,
  } = resolveStyle(data?.style);
  const densityClass =
    density === "compact" ? "compact" : density === "spacious" ? "spacious" : "";

  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";

  const articleStyle: CSSProperties = {
    fontFamily: `${bodyFont.cssVar}, ${bodyFont.fallback}`,
    color: theme.text,
  };
  const headingStyle: CSSProperties = {
    fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
    color: theme.text,
  };
  const dividerStyle: CSSProperties = {
    borderColor: withAlpha(theme.text, 0.15),
  };
  const onPrimary = theme.primaryText;
  const showPhoto = photoStyle !== "none";
  const photoRadiusClass = photoStyle === "square" ? "rounded-md" : "rounded-full";

  const renderSectionTitle = (title: string) => (
    <SectionHeading
      style={{ ...headingStyle, ...sectionVariantStyle(sectionStyle, theme) }}
    >
      {formatSectionTitle(title, sectionStyle)}
    </SectionHeading>
  );

  const headerStyle: CSSProperties = {
    backgroundColor: theme.primary,
    ...(themeCategory === "light"
      ? { borderBottom: `1px solid ${withAlpha(theme.text, 0.15)}` }
      : {}),
  };

  return (
    <article
      className={`mx-auto aspect-[210/297] w-full max-w-[800px] overflow-hidden rounded-lg bg-white p-12 shadow-warm-card-hover ${densityClass}`.trim()}
      style={articleStyle}
    >
      <header
        className="-mx-12 -mt-12 mb-8 px-12 pb-8 pt-10"
        style={headerStyle}
      >
        <div className="flex items-center gap-6">
          {showPhoto && basics.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={displayName}
              className={`h-20 w-20 shrink-0 border-2 object-cover ${photoRadiusClass}`}
              style={{ borderColor: onPrimary }}
            />
          )}
          <div className="min-w-0">
            <h1
              className="text-4xl font-medium tracking-wide"
              style={{
                fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
                color: onPrimary,
              }}
            >
              {displayName.toUpperCase()}
            </h1>
            {basics.role && (
              <p
                className="mt-1 text-lg italic"
                style={{ color: withAlpha(onPrimary, 0.8) }}
              >
                {basics.role}
              </p>
            )}
            <div
              className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs"
              style={{ color: withAlpha(onPrimary, 0.9) }}
            >
              {basics.email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                  {basics.email}
                </span>
              )}
              {basics.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                  {basics.phone}
                </span>
              )}
              {basics.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                  {basics.location}
                </span>
              )}
              {basics.website && (
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                  {basics.website}
                </span>
              )}
              {basics.linkedIn && (
                <span className="inline-flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5" style={{ color: withAlpha(onPrimary, 0.7) }} />
                  {basics.linkedIn}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {basics.summary && (
        <section>
          {renderSectionTitle("PROFILE")}
          <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
            {basics.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <>
          {basics.summary && <Divider style={dividerStyle} />}
          <section>
            {renderSectionTitle("EXPERIENCE")}
            <div className="space-y-5">
              {experience.map((job, i) => (
                <div key={`${job.company}-${job.startDate}-${i}`}>
                  <div className="mb-1 flex items-baseline justify-between gap-4">
                    <p className="text-base font-medium" style={{ color: theme.text }}>
                      {job.company}
                      {job.role ? ` — ${job.role}` : ""}
                    </p>
                    <p className="shrink-0 text-sm" style={{ color: theme.textSoft }}>
                      {job.startDate} — {job.endDate ?? "Present"}
                    </p>
                  </div>
                  {job.location && (
                    <p
                      className="mb-2 text-xs italic"
                      style={{ color: theme.textSoft }}
                    >
                      {job.location}
                    </p>
                  )}
                  {job.bullets && job.bullets.length > 0 && (
                    <ul
                      className="space-y-1 text-sm leading-relaxed"
                      style={{ color: theme.textSoft }}
                    >
                      {job.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex gap-2">
                          <span aria-hidden>•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {education.length > 0 && (
        <>
          <Divider style={dividerStyle} />
          <section>
            {renderSectionTitle("EDUCATION")}
            <div className="space-y-3">
              {education.map((entry, i) => (
                <div key={`${entry.school}-${entry.startDate}-${i}`}>
                  <div className="mb-1 flex items-baseline justify-between gap-4">
                    <p className="text-base font-medium" style={{ color: theme.text }}>
                      {entry.school}
                      {entry.degree ? ` — ${entry.degree}` : ""}
                    </p>
                    <p className="shrink-0 text-sm" style={{ color: theme.textSoft }}>
                      {entry.startDate} — {entry.endDate}
                    </p>
                  </div>
                  {entry.location && (
                    <p className="text-xs italic" style={{ color: theme.textSoft }}>
                      {entry.location}
                    </p>
                  )}
                  {entry.notes && (
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: theme.textSoft }}
                    >
                      {entry.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {skills.length > 0 && (
        <>
          <Divider style={dividerStyle} />
          <section>
            {renderSectionTitle("SKILLS")}
            <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
              {skills.join(" · ")}
            </p>
          </section>
        </>
      )}

      {projects.length > 0 && (
        <>
          <Divider style={dividerStyle} />
          <section>
            {renderSectionTitle("PROJECTS")}
            <div className="space-y-3">
              {projects.map((project, i) => (
                <div key={`${project.name}-${i}`}>
                  <p className="text-base font-medium" style={{ color: theme.text }}>
                    {project.name}
                  </p>
                  {project.description && (
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: theme.textSoft }}
                    >
                      {project.description}
                    </p>
                  )}
                  {project.url && (
                    <a
                      href={`https://${project.url}`}
                      className="text-xs underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.accent }}
                    >
                      {project.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {languages.length > 0 && (
        <>
          <Divider style={dividerStyle} />
          <section>
            {renderSectionTitle("LANGUAGES")}
            <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
              {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </section>
        </>
      )}

      {awards.length > 0 && (
        <>
          <Divider style={dividerStyle} />
          <section>
            {renderSectionTitle("AWARDS")}
            <ul
              className="space-y-1 text-sm leading-relaxed"
              style={{ color: theme.textSoft }}
            >
              {awards.map((award, i) => (
                <li key={i}>
                  {award.title}
                  {award.issuer ? ` · ${award.issuer}` : ""}
                  {award.year ? ` · ${award.year}` : ""}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {certifications.length > 0 && (
        <>
          <Divider style={dividerStyle} />
          <section>
            {renderSectionTitle("CERTIFICATIONS")}
            <ul
              className="space-y-1 text-sm leading-relaxed"
              style={{ color: theme.textSoft }}
            >
              {certifications.map((cert, i) => (
                <li key={i}>
                  {cert.name}
                  {cert.issuer ? ` · ${cert.issuer}` : ""}
                  {cert.year ? ` · ${cert.year}` : ""}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {interests.length > 0 && (
        <>
          <Divider style={dividerStyle} />
          <section>
            {renderSectionTitle("INTERESTS")}
            <p className="text-sm leading-relaxed" style={{ color: theme.textSoft }}>
              {interests.join(" · ")}
            </p>
          </section>
        </>
      )}
    </article>
  );
}

function SectionHeading({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <h2 className="mb-2 text-xs tracking-[0.25em]" style={style}>
      {children}
    </h2>
  );
}

function Divider({ style }: { style?: CSSProperties }) {
  return <div className="my-6 border-b" style={style} />;
}
