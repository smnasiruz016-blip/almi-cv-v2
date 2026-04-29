import type { CSSProperties } from "react";
import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";
import { resolveStyle, withAlpha } from "@/lib/cv-themes";

export function ModernMono({ data }: { data: CVData }) {
  const basics = data?.basics ?? { fullName: "", role: "", email: "" };
  const experience = data?.experience ?? [];
  const education = data?.education ?? [];
  const skills = data?.skills ?? [];
  const projects = data?.projects ?? [];
  const languages = data?.languages ?? [];
  const awards = data?.awards ?? [];
  const certifications = data?.certifications ?? [];
  const interests = data?.interests ?? [];

  const { theme, headingFont, bodyFont, density } = resolveStyle(data?.style);
  const densityClass = density === "compact" ? "compact" : "";

  const displayName = basics.fullName || "Untitled";

  const hasContact = Boolean(
    basics.email || basics.phone || basics.location || basics.website || basics.linkedIn,
  );

  const articleStyle: CSSProperties = {
    fontFamily: `${bodyFont.cssVar}, ${bodyFont.fallback}`,
    color: theme.text,
  };
  const headingStyle: CSSProperties = {
    fontFamily: `${headingFont.cssVar}, ${headingFont.fallback}`,
    color: theme.text,
  };
  const sidebarDividerStyle: CSSProperties = {
    borderColor: withAlpha(theme.accent, 0.5),
  };
  const contentDividerStyle: CSSProperties = {
    borderColor: withAlpha(theme.text, 0.15),
  };
  const iconStyle: CSSProperties = { color: theme.textSoft };

  return (
    <article
      className={`mx-auto flex aspect-[210/297] w-full max-w-[800px] overflow-hidden rounded-lg bg-white shadow-warm-card-hover ${densityClass}`.trim()}
      style={articleStyle}
    >
      <aside
        className="flex w-[35%] flex-col gap-5 overflow-hidden p-7"
        style={{ backgroundColor: theme.primarySoft }}
      >
        {basics.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={displayName}
            className="mx-auto h-28 w-28 rounded-full border-4 border-white object-cover shadow-sm"
          />
        ) : (
          <div
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white/70 text-3xl font-medium shadow-sm"
            style={headingStyle}
          >
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h1
            className="mt-1 text-center text-xl font-medium leading-tight"
            style={headingStyle}
          >
            {displayName}
          </h1>
          {basics.role && (
            <p
              className="text-center text-sm italic"
              style={{ color: theme.textSoft }}
            >
              {basics.role}
            </p>
          )}
        </div>

        {hasContact && (
          <>
            <hr style={sidebarDividerStyle} />
            <div>
              <h2
                className="mb-2.5 text-[10px] tracking-[0.25em]"
                style={headingStyle}
              >
                CONTACT
              </h2>
              <ul className="space-y-1.5">
                {basics.email && (
                  <li
                    className="flex items-start gap-2 text-[11px] leading-tight"
                    style={{ color: theme.text }}
                  >
                    <Mail className="mt-0.5 h-3 w-3 shrink-0" style={iconStyle} />
                    <span className="break-all">{basics.email}</span>
                  </li>
                )}
                {basics.phone && (
                  <li
                    className="flex items-start gap-2 text-[11px] leading-tight"
                    style={{ color: theme.text }}
                  >
                    <Phone className="mt-0.5 h-3 w-3 shrink-0" style={iconStyle} />
                    <span>{basics.phone}</span>
                  </li>
                )}
                {basics.location && (
                  <li
                    className="flex items-start gap-2 text-[11px] leading-tight"
                    style={{ color: theme.text }}
                  >
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0" style={iconStyle} />
                    <span>{basics.location}</span>
                  </li>
                )}
                {basics.website && (
                  <li
                    className="flex items-start gap-2 text-[11px] leading-tight"
                    style={{ color: theme.text }}
                  >
                    <Globe className="mt-0.5 h-3 w-3 shrink-0" style={iconStyle} />
                    <span className="break-all">{basics.website}</span>
                  </li>
                )}
                {basics.linkedIn && (
                  <li
                    className="flex items-start gap-2 text-[11px] leading-tight"
                    style={{ color: theme.text }}
                  >
                    <Link2 className="mt-0.5 h-3 w-3 shrink-0" style={iconStyle} />
                    <span className="break-all">{basics.linkedIn}</span>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}

        {skills.length > 0 && (
          <>
            <hr style={sidebarDividerStyle} />
            <div>
              <h2
                className="mb-2.5 text-[10px] tracking-[0.25em]"
                style={headingStyle}
              >
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <span
                    key={`${skill}-${i}`}
                    className="rounded-pill border bg-white/80 px-2 py-0.5 text-[10px]"
                    style={{
                      borderColor: withAlpha(theme.text, 0.25),
                      color: theme.text,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {languages.length > 0 && (
          <>
            <hr style={sidebarDividerStyle} />
            <div>
              <h2
                className="mb-2.5 text-[10px] tracking-[0.25em]"
                style={headingStyle}
              >
                LANGUAGES
              </h2>
              <ul className="space-y-1">
                {languages.map((lang, i) => (
                  <li
                    key={`${lang.name}-${i}`}
                    className="text-[11px]"
                    style={{ color: theme.text }}
                  >
                    {lang.name}{" "}
                    <span style={{ color: theme.textSoft }}>· {lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>

      <div className="flex-1 overflow-hidden p-9">
        {basics.summary && (
          <section>
            <h2
              className="mb-2.5 text-[10px] tracking-[0.25em]"
              style={headingStyle}
            >
              PROFILE
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: theme.textSoft }}
            >
              {basics.summary}
            </p>
          </section>
        )}

        {basics.summary && experience.length > 0 && (
          <hr className="my-5" style={contentDividerStyle} />
        )}

        {experience.length > 0 && (
          <section>
            <h2
              className="mb-3 text-[10px] tracking-[0.25em]"
              style={headingStyle}
            >
              EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((job, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3
                      className="text-sm font-medium"
                      style={{ color: theme.text }}
                    >
                      {job.company}{" "}
                      <span className="font-normal" style={{ color: theme.textSoft }}>
                        — {job.role}
                      </span>
                    </h3>
                    <span
                      className="whitespace-nowrap text-xs"
                      style={{ color: theme.textSoft }}
                    >
                      {job.startDate}{" "}
                      {job.endDate ? `— ${job.endDate}` : "— Present"}
                    </span>
                  </div>
                  {job.location && (
                    <p
                      className="mt-0.5 text-xs italic"
                      style={{ color: theme.textSoft }}
                    >
                      {job.location}
                    </p>
                  )}
                  {job.bullets && job.bullets.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {job.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="flex gap-2 text-xs leading-relaxed"
                        >
                          <span style={{ color: theme.accent }}>•</span>
                          <span style={{ color: theme.textSoft }}>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {(experience.length > 0 || basics.summary) && education.length > 0 && (
          <hr className="my-5" style={contentDividerStyle} />
        )}

        {education.length > 0 && (
          <section>
            <h2
              className="mb-3 text-[10px] tracking-[0.25em]"
              style={headingStyle}
            >
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3
                      className="text-sm font-medium"
                      style={{ color: theme.text }}
                    >
                      {edu.school}{" "}
                      <span className="font-normal" style={{ color: theme.textSoft }}>
                        — {edu.degree}
                      </span>
                    </h3>
                    <span
                      className="whitespace-nowrap text-xs"
                      style={{ color: theme.textSoft }}
                    >
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  {edu.location && (
                    <p
                      className="mt-0.5 text-xs italic"
                      style={{ color: theme.textSoft }}
                    >
                      {edu.location}
                    </p>
                  )}
                  {edu.notes && (
                    <p
                      className="mt-1 text-xs leading-relaxed"
                      style={{ color: theme.textSoft }}
                    >
                      {edu.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && projects.length > 0 && (
          <hr className="my-5" style={contentDividerStyle} />
        )}

        {projects.length > 0 && (
          <section>
            <h2
              className="mb-3 text-[10px] tracking-[0.25em]"
              style={headingStyle}
            >
              PROJECTS
            </h2>
            <div className="space-y-2">
              {projects.map((p, idx) => (
                <div key={idx}>
                  <h3
                    className="text-sm font-medium"
                    style={{ color: theme.text }}
                  >
                    {p.name}
                  </h3>
                  {p.description && (
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: theme.textSoft }}
                    >
                      {p.description}
                    </p>
                  )}
                  {p.url && (
                    <p
                      className="mt-0.5 text-[10px]"
                      style={{ color: theme.accent }}
                    >
                      {p.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && awards.length > 0 && (
          <hr className="my-5" style={contentDividerStyle} />
        )}

        {awards.length > 0 && (
          <section>
            <h2
              className="mb-3 text-[10px] tracking-[0.25em]"
              style={headingStyle}
            >
              AWARDS
            </h2>
            <ul className="space-y-1">
              {awards.map((a, idx) => (
                <li key={idx} className="text-xs" style={{ color: theme.textSoft }}>
                  <span className="font-medium" style={{ color: theme.text }}>
                    {a.title}
                  </span>
                  {a.issuer && ` · ${a.issuer}`}
                  {a.year && ` · ${a.year}`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {awards.length > 0 && certifications.length > 0 && (
          <hr className="my-5" style={contentDividerStyle} />
        )}

        {certifications.length > 0 && (
          <section>
            <h2
              className="mb-3 text-[10px] tracking-[0.25em]"
              style={headingStyle}
            >
              CERTIFICATIONS
            </h2>
            <ul className="space-y-1">
              {certifications.map((c, idx) => (
                <li key={idx} className="text-xs" style={{ color: theme.textSoft }}>
                  <span className="font-medium" style={{ color: theme.text }}>
                    {c.name}
                  </span>
                  {c.issuer && ` · ${c.issuer}`}
                  {c.year && ` · ${c.year}`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {certifications.length > 0 && interests.length > 0 && (
          <hr className="my-5" style={contentDividerStyle} />
        )}

        {interests.length > 0 && (
          <section>
            <h2
              className="mb-3 text-[10px] tracking-[0.25em]"
              style={headingStyle}
            >
              INTERESTS
            </h2>
            <p
              className="text-xs leading-relaxed"
              style={{ color: theme.textSoft }}
            >
              {interests.join(" · ")}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
