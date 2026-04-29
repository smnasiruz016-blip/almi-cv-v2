import { Globe, Link2, Mail, MapPin, Phone } from "lucide-react";
import type { CVData } from "@/lib/cv-types";

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

  const displayName = basics.fullName || "Untitled";

  const hasContact = Boolean(
    basics.email || basics.phone || basics.location || basics.website || basics.linkedIn,
  );

  return (
    <article className="mx-auto flex aspect-[210/297] w-full max-w-[800px] overflow-hidden rounded-lg bg-white shadow-warm-card-hover">
      <aside className="flex w-[35%] flex-col gap-5 overflow-hidden bg-mint/30 p-7">
        {basics.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={basics.photoUrl}
            alt={displayName}
            className="mx-auto h-28 w-28 rounded-full border-4 border-white object-cover shadow-sm"
          />
        ) : (
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white/70 font-display text-3xl font-medium text-plum shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h1 className="mt-1 text-center font-display text-xl font-medium leading-tight text-plum">
            {displayName}
          </h1>
          {basics.role && (
            <p className="text-center text-sm italic text-plum-soft">{basics.role}</p>
          )}
        </div>

        {hasContact && (
          <>
            <hr className="border-mint/60" />
            <div>
              <h2 className="mb-2.5 font-display text-[10px] tracking-[0.25em] text-plum">
                CONTACT
              </h2>
              <ul className="space-y-1.5">
                {basics.email && (
                  <li className="flex items-start gap-2 text-[11px] leading-tight text-plum">
                    <Mail className="mt-0.5 h-3 w-3 shrink-0 text-plum-soft" />
                    <span className="break-all">{basics.email}</span>
                  </li>
                )}
                {basics.phone && (
                  <li className="flex items-start gap-2 text-[11px] leading-tight text-plum">
                    <Phone className="mt-0.5 h-3 w-3 shrink-0 text-plum-soft" />
                    <span>{basics.phone}</span>
                  </li>
                )}
                {basics.location && (
                  <li className="flex items-start gap-2 text-[11px] leading-tight text-plum">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-plum-soft" />
                    <span>{basics.location}</span>
                  </li>
                )}
                {basics.website && (
                  <li className="flex items-start gap-2 text-[11px] leading-tight text-plum">
                    <Globe className="mt-0.5 h-3 w-3 shrink-0 text-plum-soft" />
                    <span className="break-all">{basics.website}</span>
                  </li>
                )}
                {basics.linkedIn && (
                  <li className="flex items-start gap-2 text-[11px] leading-tight text-plum">
                    <Link2 className="mt-0.5 h-3 w-3 shrink-0 text-plum-soft" />
                    <span className="break-all">{basics.linkedIn}</span>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}

        {skills.length > 0 && (
          <>
            <hr className="border-mint/60" />
            <div>
              <h2 className="mb-2.5 font-display text-[10px] tracking-[0.25em] text-plum">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <span
                    key={`${skill}-${i}`}
                    className="rounded-pill border border-mint/40 bg-white/80 px-2 py-0.5 text-[10px] text-plum"
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
            <hr className="border-mint/60" />
            <div>
              <h2 className="mb-2.5 font-display text-[10px] tracking-[0.25em] text-plum">
                LANGUAGES
              </h2>
              <ul className="space-y-1">
                {languages.map((lang, i) => (
                  <li key={`${lang.name}-${i}`} className="text-[11px] text-plum">
                    {lang.name} <span className="text-plum-soft">· {lang.level}</span>
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
            <h2 className="mb-2.5 font-display text-[10px] tracking-[0.25em] text-plum">
              PROFILE
            </h2>
            <p className="text-sm leading-relaxed text-plum-soft">{basics.summary}</p>
          </section>
        )}

        {basics.summary && experience.length > 0 && (
          <hr className="my-5 border-plum/15" />
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="mb-3 font-display text-[10px] tracking-[0.25em] text-plum">
              EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((job, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-sm font-medium text-plum">
                      {job.company}{" "}
                      <span className="font-normal text-plum-soft">— {job.role}</span>
                    </h3>
                    <span className="whitespace-nowrap text-xs text-plum-soft">
                      {job.startDate}{" "}
                      {job.endDate ? `— ${job.endDate}` : "— Present"}
                    </span>
                  </div>
                  {job.location && (
                    <p className="mt-0.5 text-xs italic text-plum-soft">{job.location}</p>
                  )}
                  {job.bullets && job.bullets.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {job.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="relative pl-3 text-xs leading-relaxed text-plum-soft before:absolute before:left-0 before:text-mint before:content-['•']"
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
        )}

        {(experience.length > 0 || basics.summary) && education.length > 0 && (
          <hr className="my-5 border-plum/15" />
        )}

        {education.length > 0 && (
          <section>
            <h2 className="mb-3 font-display text-[10px] tracking-[0.25em] text-plum">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-sm font-medium text-plum">
                      {edu.school}{" "}
                      <span className="font-normal text-plum-soft">— {edu.degree}</span>
                    </h3>
                    <span className="whitespace-nowrap text-xs text-plum-soft">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  {edu.location && (
                    <p className="mt-0.5 text-xs italic text-plum-soft">{edu.location}</p>
                  )}
                  {edu.notes && (
                    <p className="mt-1 text-xs leading-relaxed text-plum-soft">{edu.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && projects.length > 0 && (
          <hr className="my-5 border-plum/15" />
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="mb-3 font-display text-[10px] tracking-[0.25em] text-plum">
              PROJECTS
            </h2>
            <div className="space-y-2">
              {projects.map((p, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-medium text-plum">{p.name}</h3>
                  {p.description && (
                    <p className="text-xs leading-relaxed text-plum-soft">{p.description}</p>
                  )}
                  {p.url && <p className="mt-0.5 text-[10px] text-coral">{p.url}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && awards.length > 0 && (
          <hr className="my-5 border-plum/15" />
        )}

        {awards.length > 0 && (
          <section>
            <h2 className="mb-3 font-display text-[10px] tracking-[0.25em] text-plum">
              AWARDS
            </h2>
            <ul className="space-y-1">
              {awards.map((a, idx) => (
                <li key={idx} className="text-xs text-plum-soft">
                  <span className="font-medium text-plum">{a.title}</span>
                  {a.issuer && ` · ${a.issuer}`}
                  {a.year && ` · ${a.year}`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {awards.length > 0 && certifications.length > 0 && (
          <hr className="my-5 border-plum/15" />
        )}

        {certifications.length > 0 && (
          <section>
            <h2 className="mb-3 font-display text-[10px] tracking-[0.25em] text-plum">
              CERTIFICATIONS
            </h2>
            <ul className="space-y-1">
              {certifications.map((c, idx) => (
                <li key={idx} className="text-xs text-plum-soft">
                  <span className="font-medium text-plum">{c.name}</span>
                  {c.issuer && ` · ${c.issuer}`}
                  {c.year && ` · ${c.year}`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {certifications.length > 0 && interests.length > 0 && (
          <hr className="my-5 border-plum/15" />
        )}

        {interests.length > 0 && (
          <section>
            <h2 className="mb-3 font-display text-[10px] tracking-[0.25em] text-plum">
              INTERESTS
            </h2>
            <p className="text-xs leading-relaxed text-plum-soft">{interests.join(" · ")}</p>
          </section>
        )}
      </div>
    </article>
  );
}
