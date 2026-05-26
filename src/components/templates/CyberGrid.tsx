// ============================================================================
// CyberGrid — IT / Cloud / DevOps. Dark navy + neon cyan.
// Glass cards, isometric server illustration, glowing skill bars.
// A4: 794 × 1123 px @ 96 DPI.
// ============================================================================
"use client";

import React from "react";
import {
  CVData,
  TemplateProps,
  dateRange,
  initials,
  getLabel,
  RichTextRender,
  isRichTextEmpty,
  stripRichText,
} from "./types";

export default function CyberGrid({ data }: TemplateProps) {
  const { basics, experience, education, skills } = data;
  const languages = data.languages ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const awards = data.awards ?? [];
  const interests = data.interests ?? [];

  return (
    <article
      className="relative w-[794px] min-h-[1123px] overflow-hidden text-slate-50 print:shadow-none"
      style={{
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        fontSize: "10.5pt",
        lineHeight: 1.55,
        background:
          "radial-gradient(circle at 88% 8%, rgba(94,234,212,0.18) 0%, transparent 38%), radial-gradient(circle at 8% 92%, rgba(103,232,249,0.12) 0%, transparent 40%), linear-gradient(160deg, #0A0E1F 0%, #06080F 70%)",
        padding: "44px 48px 40px",
      }}
    >
      {/* Tech grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 50% 35%, #000 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 35%, #000 0%, transparent 75%)",
        }}
      />

      {/* Corner crosshairs */}
      <CornerCrosshairs />

      {/* HEADER */}
      <header className="relative grid grid-cols-[1fr_156px] gap-7 items-center mb-6">
        <div className="min-w-0">
          <StatusBadge />
          <h1
            className="text-transparent bg-clip-text"
            style={{
              fontWeight: 700,
              fontSize: "44pt",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              margin: 0,
              backgroundImage:
                "linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)",
            }}
          >
            {basics.fullName}
          </h1>
          <p
            className="m-0 mt-3.5 uppercase"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 500,
              fontSize: "11pt",
              letterSpacing: "0.32em",
              color: "#5EEAD4",
              textShadow: "0 0 18px rgba(94,234,212,0.55)",
            }}
          >
            {basics.role}
          </p>
          <ContactRow basics={basics} />
        </div>
        <PhotoRing photoUrl={basics.photoUrl} initialsText={initials(basics.fullName)} />
      </header>

      {/* INFRA STRIP — summary + isometric server illustration */}
      {!isRichTextEmpty(basics.summary) && (
        <div
          className="relative grid grid-cols-[230px_1fr] gap-5 items-stretch rounded-xl mb-5 backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(125,211,252,0.18)",
            padding: "16px 20px",
          }}
        >
          <ServerIllustration />
          <p
            className="m-0 self-center text-[10pt] leading-snug text-slate-300"
            style={{ textWrap: "pretty" }}
          >
            {/* Strip rich text — the panel is too tight for bold/italic emphasis to land cleanly. */}
            {stripRichText(basics.summary ?? "")}
          </p>
        </div>
      )}

      {/* BODY GRID */}
      <div className="relative grid grid-cols-[1fr_270px] gap-6">
        <div>
          {experience.length > 0 && (
            <CardSection title={getLabel(data, "experience")} id="// 011 — present">
              {experience.map((w, i) => (
                <Entry key={i} item={w} />
              ))}
            </CardSection>
          )}

          {projects.length > 0 && (
            <CardSection title={getLabel(data, "projects")} id="// repos">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="py-1.5 border-b border-dashed last:border-b-0"
                  style={{ borderColor: "rgba(94,234,212,0.12)" }}
                >
                  <p className="m-0 font-semibold text-slate-50 text-[11pt]">
                    {p.name}
                  </p>
                  {p.url && (
                    <p
                      className="m-0 mt-0.5 text-[9pt]"
                      style={{ fontFamily: '"JetBrains Mono", monospace', color: "#5EEAD4" }}
                    >
                      {p.url}
                    </p>
                  )}
                  <p className="m-0 mt-0.5 text-[9.5pt] text-slate-300">{p.description}</p>
                </div>
              ))}
            </CardSection>
          )}

          {education.length > 0 && (
            <CardSection title={getLabel(data, "education")} id="// edu">
              {education.map((e, i) => (
                <div
                  key={i}
                  className="py-1.5 border-b border-dashed last:border-b-0"
                  style={{ borderColor: "rgba(94,234,212,0.12)" }}
                >
                  <p className="m-0 font-semibold text-slate-50 text-[11pt]">
                    {e.degree}
                  </p>
                  <p
                    className="m-0 mt-0.5 text-[9pt]"
                    style={{ fontFamily: '"JetBrains Mono", monospace', color: "#5EEAD4" }}
                  >
                    {e.school}
                  </p>
                  <p
                    className="m-0 mt-0.5 text-[8.5pt] text-slate-500"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {dateRange(e.startDate, e.endDate)}
                    {e.notes ? ` · ${e.notes}` : ""}
                  </p>
                </div>
              ))}
            </CardSection>
          )}
        </div>

        <div>
          {skills.length > 0 && (
            <CardSection title={getLabel(data, "skills")}>
              <SkillBars skills={skills} />
            </CardSection>
          )}

          {certifications.length > 0 && (
            <CardSection title={getLabel(data, "certifications")}>
              <ul className="m-0 p-0 list-none">
                {certifications.map((c, i) => (
                  <li
                    key={i}
                    className="py-1.5 border-b border-dashed last:border-b-0 text-[9.5pt] text-slate-300"
                    style={{ borderColor: "rgba(94,234,212,0.12)" }}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <b className="font-semibold text-slate-50">{c.name}</b>
                      <span
                        className="text-[8.5pt] whitespace-nowrap"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          color: "#5EEAD4",
                        }}
                      >
                        {c.year}
                      </span>
                    </div>
                    {c.issuer && (
                      <div
                        className="text-[8.5pt] text-slate-500 mt-px"
                        style={{ fontFamily: '"JetBrains Mono", monospace' }}
                      >
                        {c.issuer}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CardSection>
          )}

          {awards.length > 0 && (
            <CardSection title={getLabel(data, "awards")}>
              <ul className="m-0 p-0 list-none">
                {awards.map((a, i) => (
                  <li
                    key={i}
                    className="py-1.5 border-b border-dashed last:border-b-0 text-[9.5pt] text-slate-300"
                    style={{ borderColor: "rgba(94,234,212,0.12)" }}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <b className="font-semibold text-slate-50">{a.title}</b>
                      <span
                        className="text-[8.5pt] whitespace-nowrap"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          color: "#5EEAD4",
                        }}
                      >
                        {a.year}
                      </span>
                    </div>
                    {a.issuer && (
                      <div
                        className="text-[8.5pt] text-slate-500 mt-px"
                        style={{ fontFamily: '"JetBrains Mono", monospace' }}
                      >
                        {a.issuer}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CardSection>
          )}

          {languages.length > 0 && (
            <CardSection title={getLabel(data, "languages")}>
              <ul className="m-0 p-0 list-none">
                {languages.map((l, i) => (
                  <li
                    key={i}
                    className="py-1.5 border-b border-dashed last:border-b-0"
                    style={{ borderColor: "rgba(94,234,212,0.12)" }}
                  >
                    <div className="flex items-baseline justify-between gap-2 text-[9.5pt]">
                      <b className="font-semibold text-slate-50">{l.name}</b>
                      <span
                        className="text-[8.5pt] whitespace-nowrap"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          color: "#5EEAD4",
                        }}
                      >
                        {l.level}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardSection>
          )}

          {interests.length > 0 && (
            <CardSection title={getLabel(data, "interests")}>
              <p
                className="m-0 text-[9.5pt] text-slate-300"
                style={{ lineHeight: 1.6 }}
              >
                {interests.join(" · ")}
              </p>
            </CardSection>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function StatusBadge() {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-full uppercase"
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: "9pt",
        fontWeight: 500,
        letterSpacing: "0.12em",
        background: "rgba(94,234,212,0.08)",
        border: "1px solid rgba(94,234,212,0.3)",
        color: "#67E8F9",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: "#5EEAD4",
          boxShadow: "0 0 8px rgba(94,234,212,0.55)",
        }}
      />
      System · online · accepting requests
    </span>
  );
}

function ContactRow({ basics }: { basics: CVData["basics"] }) {
  const items = [
    basics.email && { icon: "mail", value: basics.email },
    basics.phone && { icon: "phone", value: basics.phone },
    basics.location && { icon: "pin", value: basics.location },
    basics.website && { icon: "globe", value: basics.website },
    basics.linkedIn && { icon: "globe", value: basics.linkedIn },
  ].filter(Boolean) as Array<{ icon: string; value: string }>;

  return (
    <div
      className="flex flex-wrap gap-y-1.5 gap-x-4 mt-4"
      style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "9pt", color: "#C7D2DE" }}
    >
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <Icon name={it.icon} />
          {it.value}
        </span>
      ))}
    </div>
  );
}

function PhotoRing({
  photoUrl,
  initialsText,
}: {
  photoUrl?: string;
  initialsText: string;
}) {
  return (
    <div
      className="relative w-[152px] h-[152px] rounded-full p-1.5"
      style={{
        background:
          "conic-gradient(from 140deg, #5EEAD4 0%, transparent 22%, #67E8F9 50%, transparent 78%, #5EEAD4 100%)",
        boxShadow:
          "0 0 0 1px rgba(94,234,212,0.6), 0 0 30px rgba(94,234,212,0.45), 0 0 80px rgba(94,234,212,0.18)",
      }}
    >
      <span
        className="absolute -inset-2 rounded-full pointer-events-none"
        style={{ border: "1px dashed rgba(94,234,212,0.3)" }}
      />
      {photoUrl ? (
        <img
          src={photoUrl}
          alt=""
          className="w-full h-full rounded-full object-cover"
          style={{ border: "2px solid rgba(255,255,255,0.04)" }}
        />
      ) : (
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 30% 25%, #2A3654 0%, #131A30 70%)",
            border: "2px solid rgba(255,255,255,0.04)",
            color: "#5EEAD4",
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: "40pt",
            letterSpacing: "-0.02em",
            textShadow: "0 0 24px rgba(94,234,212,0.55)",
          }}
        >
          {initialsText}
        </div>
      )}
    </div>
  );
}

function CardSection({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mb-4 last:mb-0 rounded-xl backdrop-blur-md"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(125,211,252,0.18)",
        padding: "20px 22px",
      }}
    >
      <h2
        className="m-0 mb-3.5 flex items-center gap-2.5 uppercase"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 600,
          fontSize: "10pt",
          letterSpacing: "0.22em",
          color: "#5EEAD4",
        }}
      >
        <span
          className="w-4 h-0.5"
          style={{ background: "#5EEAD4", boxShadow: "0 0 8px rgba(94,234,212,0.55)" }}
        />
        {title}
        {id && (
          <span
            className="ml-auto text-[8.5pt]"
            style={{ color: "#6E7B95", letterSpacing: "0.12em" }}
          >
            {id}
          </span>
        )}
      </h2>
      {children}
    </section>
  );
}

function Entry({ item }: { item: CVData["experience"][number] }) {
  return (
    <div
      className="relative pl-4 mb-3.5 last:mb-0"
      style={{ borderLeft: "1px solid rgba(94,234,212,0.18)" }}
    >
      <span
        className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full"
        style={{ background: "#5EEAD4", boxShadow: "0 0 10px rgba(94,234,212,0.55)" }}
      />
      <div className="flex justify-between items-baseline gap-2.5">
        <div>
          <p className="m-0 font-semibold text-slate-50 text-[12pt]">{item.role}</p>
          <p
            className="m-0 mt-0.5 text-[9pt]"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: "#5EEAD4" }}
          >
            {item.company}
          </p>
        </div>
        <span
          className="text-[8.5pt] whitespace-nowrap"
          style={{ fontFamily: '"JetBrains Mono", monospace', color: "#6E7B95", letterSpacing: "0.05em" }}
        >
          {dateRange(item.startDate, item.endDate)}
        </span>
      </div>
      {item.bullets.length > 0 && (
        <ul className="m-0 mt-2 p-0 list-none text-[10pt] text-slate-300">
          {item.bullets.map((b, i) =>
            isRichTextEmpty(b) ? null : (
              <li key={i} className="relative pl-4 mb-1">
                <span
                  className="absolute left-0 top-1 text-[8pt]"
                  style={{ color: "#5EEAD4" }}
                >
                  ▸
                </span>
                <RichTextRender html={b} as="span" />
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

function SkillBars({ skills }: { skills: string[] }) {
  // Deterministic per-skill levels so the bars look intentional, not random.
  const levelFor = (s: string, i: number) => {
    const seed = (s ?? "").length + i * 7;
    return 78 + ((seed * 13) % 22); // 78..99
  };
  return (
    <div>
      {skills.slice(0, 8).map((s, i) => {
        const lvl = levelFor(s, i);
        return (
          <div key={i} className="mb-2.5 last:mb-0">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[9.5pt] text-slate-50 font-medium">{s}</span>
              <span
                className="text-[8.5pt]"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: "#5EEAD4" }}
              >
                {lvl}
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${lvl}%`,
                  background: "linear-gradient(90deg, #5EEAD4 0%, #67E8F9 100%)",
                  boxShadow:
                    "0 0 8px rgba(94,234,212,0.55), 0 0 2px rgba(255,255,255,0.4) inset",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    mail: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="M4 6l8 7 8-7" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    pin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width={11}
      height={11}
      stroke="#5EEAD4"
      fill="none"
      strokeWidth={2}
    >
      {paths[name]}
    </svg>
  );
}

function CornerCrosshairs() {
  const base = {
    position: "absolute" as const,
    width: 18,
    height: 18,
    border: "1px solid #5EEAD4",
    opacity: 0.6,
  };
  return (
    <>
      <span style={{ ...base, top: 16, left: 16, borderRight: 0, borderBottom: 0 }} />
      <span style={{ ...base, top: 16, right: 16, borderLeft: 0, borderBottom: 0 }} />
      <span style={{ ...base, bottom: 16, left: 16, borderRight: 0, borderTop: 0 }} />
      <span style={{ ...base, bottom: 16, right: 16, borderLeft: 0, borderTop: 0 }} />
    </>
  );
}

function ServerIllustration() {
  return (
    <div className="h-[110px] relative">
      <svg
        viewBox="0 0 240 130"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="cg-rack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2A48" />
            <stop offset="100%" stopColor="#0A0E1F" />
          </linearGradient>
          <linearGradient id="cg-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0" />
            <stop offset="50%" stopColor="#5EEAD4" stopOpacity="1" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
          </linearGradient>
          <filter id="cg-glow">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <g stroke="#5EEAD4" strokeOpacity="0.18" strokeWidth="0.5" fill="none">
          <path d="M10 110 L130 60 M40 122 L160 70 M70 134 L190 80 M100 146 L220 90" />
          <path d="M10 110 L100 146 M40 98 L130 134 M70 86 L160 122 M100 74 L190 110 M130 60 L220 90" />
        </g>
        <g transform="translate(160 12)">
          <path
            d="M10 28 C 2 28 2 18 10 18 C 10 8 26 8 30 16 C 38 8 52 18 46 26 C 54 30 50 38 42 36 L 14 36 C 6 38 4 30 10 28 Z"
            fill="#0A0E1F"
            stroke="#5EEAD4"
            strokeWidth="1.4"
          />
          <circle cx="22" cy="22" r="1.8" fill="#5EEAD4" filter="url(#cg-glow)" />
          <circle cx="30" cy="26" r="1.2" fill="#67E8F9" />
          <circle cx="40" cy="22" r="1.2" fill="#67E8F9" />
        </g>
        <g transform="translate(40 30)">
          <path
            d="M 0 22 L 60 0 L 105 12 L 105 70 L 60 86 L 0 70 Z"
            fill="url(#cg-rack)"
            stroke="#5EEAD4"
            strokeWidth="1.2"
          />
          <path d="M 0 22 L 60 0 L 105 12 L 45 36 Z" fill="#131A30" stroke="#5EEAD4" strokeWidth="1" />
          <path d="M 45 36 L 45 90 L 105 70 L 105 12 Z" fill="#0A0E1F" stroke="#5EEAD4" strokeWidth="1" />
          <path d="M 0 22 L 0 70 L 45 90 L 45 36 Z" fill="#10172A" stroke="#5EEAD4" strokeWidth="1" />
          <g stroke="#5EEAD4" strokeWidth="0.6" opacity="0.9">
            <line x1="3" y1="34" x2="42" y2="50" />
            <line x1="3" y1="42" x2="42" y2="58" />
            <line x1="3" y1="50" x2="42" y2="66" />
            <line x1="3" y1="58" x2="42" y2="74" />
            <line x1="3" y1="66" x2="42" y2="82" />
          </g>
          <circle cx="38" cy="52" r="1.4" fill="#5EEAD4" filter="url(#cg-glow)" />
          <circle cx="38" cy="60" r="1.4" fill="#67E8F9" filter="url(#cg-glow)" />
          <circle cx="38" cy="68" r="1.4" fill="#5EEAD4" />
          <circle cx="38" cy="76" r="1.2" fill="#5EEAD4" />
        </g>
        <path
          d="M 120 50 Q 150 30 170 30"
          stroke="url(#cg-beam)"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="3 2"
        />
        <g stroke="#5EEAD4" strokeWidth="0.8" fill="none" opacity="0.9">
          <circle cx="20" cy="116" r="3" fill="#0A0E1F" />
          <circle cx="100" cy="120" r="3" fill="#0A0E1F" />
          <circle cx="190" cy="106" r="3" fill="#0A0E1F" />
          <path d="M 20 116 L 100 120 L 190 106" strokeDasharray="2 2" />
        </g>
      </svg>
    </div>
  );
}
