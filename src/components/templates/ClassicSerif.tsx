import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";

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

  const displayName = basics.fullName?.trim() ? basics.fullName : "Untitled";

  return (
    <article className="mx-auto aspect-[210/297] w-full max-w-[800px] overflow-hidden rounded-lg bg-white p-12 shadow-warm-card-hover">
      <header className="-mx-12 -mt-12 mb-8 bg-plum px-12 pb-8 pt-10">
        <div className="flex items-center gap-6">
          {basics.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={basics.photoUrl}
              alt={displayName}
              className="h-20 w-20 shrink-0 rounded-full border-2 border-cream object-cover"
            />
          )}
          <div className="min-w-0">
            <h1 className="font-display text-4xl font-medium tracking-wide text-cream">
              {displayName.toUpperCase()}
            </h1>
            {basics.role && (
              <p className="mt-1 text-lg italic text-cream/80">{basics.role}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cream/90">
              {basics.email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-cream/70" />
                  {basics.email}
                </span>
              )}
              {basics.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-cream/70" />
                  {basics.phone}
                </span>
              )}
              {basics.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-cream/70" />
                  {basics.location}
                </span>
              )}
              {basics.website && (
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-cream/70" />
                  {basics.website}
                </span>
              )}
              {basics.linkedIn && (
                <span className="inline-flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5 text-cream/70" />
                  {basics.linkedIn}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {basics.summary && (
        <section>
          <SectionHeading>PROFILE</SectionHeading>
          <p className="text-sm leading-relaxed text-plum-soft">{basics.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <>
          {basics.summary && <Divider />}
          <section>
            <SectionHeading>EXPERIENCE</SectionHeading>
            <div className="space-y-5">
              {experience.map((job, i) => (
                <div key={`${job.company}-${job.startDate}-${i}`}>
                  <div className="mb-1 flex items-baseline justify-between gap-4">
                    <p className="text-base font-medium text-plum">
                      {job.company}
                      {job.role ? ` — ${job.role}` : ""}
                    </p>
                    <p className="shrink-0 text-sm text-plum-soft">
                      {job.startDate} — {job.endDate ?? "Present"}
                    </p>
                  </div>
                  {job.location && (
                    <p className="mb-2 text-xs italic text-plum-soft">{job.location}</p>
                  )}
                  {job.bullets && job.bullets.length > 0 && (
                    <ul className="space-y-1 text-sm leading-relaxed text-plum-soft">
                      {job.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="relative pl-4 before:absolute before:left-0 before:content-['•']"
                        >
                          {bullet}
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
          <Divider />
          <section>
            <SectionHeading>EDUCATION</SectionHeading>
            <div className="space-y-3">
              {education.map((entry, i) => (
                <div key={`${entry.school}-${entry.startDate}-${i}`}>
                  <div className="mb-1 flex items-baseline justify-between gap-4">
                    <p className="text-base font-medium text-plum">
                      {entry.school}
                      {entry.degree ? ` — ${entry.degree}` : ""}
                    </p>
                    <p className="shrink-0 text-sm text-plum-soft">
                      {entry.startDate} — {entry.endDate}
                    </p>
                  </div>
                  {entry.location && (
                    <p className="text-xs italic text-plum-soft">{entry.location}</p>
                  )}
                  {entry.notes && (
                    <p className="mt-1 text-sm leading-relaxed text-plum-soft">{entry.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {skills.length > 0 && (
        <>
          <Divider />
          <section>
            <SectionHeading>SKILLS</SectionHeading>
            <p className="text-sm leading-relaxed text-plum-soft">{skills.join(" · ")}</p>
          </section>
        </>
      )}

      {projects.length > 0 && (
        <>
          <Divider />
          <section>
            <SectionHeading>PROJECTS</SectionHeading>
            <div className="space-y-3">
              {projects.map((project, i) => (
                <div key={`${project.name}-${i}`}>
                  <p className="text-base font-medium text-plum">{project.name}</p>
                  {project.description && (
                    <p className="text-sm leading-relaxed text-plum-soft">{project.description}</p>
                  )}
                  {project.url && (
                    <a
                      href={`https://${project.url}`}
                      className="text-xs text-coral underline"
                      target="_blank"
                      rel="noopener noreferrer"
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
          <Divider />
          <section>
            <SectionHeading>LANGUAGES</SectionHeading>
            <p className="text-sm leading-relaxed text-plum-soft">
              {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </section>
        </>
      )}

      {awards.length > 0 && (
        <>
          <Divider />
          <section>
            <SectionHeading>AWARDS &amp; RECOGNITION</SectionHeading>
            <ul className="space-y-1 text-sm leading-relaxed text-plum-soft">
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
          <Divider />
          <section>
            <SectionHeading>CERTIFICATIONS</SectionHeading>
            <ul className="space-y-1 text-sm leading-relaxed text-plum-soft">
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
          <Divider />
          <section>
            <SectionHeading>INTERESTS</SectionHeading>
            <p className="text-sm leading-relaxed text-plum-soft">{interests.join(" · ")}</p>
          </section>
        </>
      )}
    </article>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 font-display text-xs tracking-[0.25em] text-plum">{children}</h2>
  );
}

function Divider() {
  return <div className="my-6 border-b border-plum/15" />;
}
