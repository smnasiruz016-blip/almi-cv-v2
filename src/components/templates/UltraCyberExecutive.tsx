// UltraCyberExecutive — Senior product / strategy / executive tech roles.
// Near-black ground under three coloured bloom orbs, everything held in
// rounded glass cards, gradient-clipped masthead. Softer and more "suite" than
// the console-styled FuturisticTechHUD.
// No photo slot by design. atsSafe:false, supportsPhoto:false.
"use client";
import React from "react";
import {
  TemplateProps,
  dateRange,
  BulletsRender,
  RichTextRender,
  getLabel,
  isRichTextEmpty,
} from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const CardRule = ({ t }: { t: string }) => (
  <h3 className="text-xs font-mono font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2 border-b border-slate-800 pb-3">
    <span className="w-2 h-2 rounded-full bg-indigo-500" /> {t}
  </h3>
);

const SideCard = ({
  title,
  titleColor,
  children,
}: {
  title: string;
  titleColor?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-slate-900/60 p-5 rounded-3xl border border-slate-800/80 backdrop-blur-xl space-y-2.5">
    <h3
      className={`text-[10px] font-mono font-black uppercase tracking-widest ${titleColor ?? "text-cyan-400"}`}
    >
      {"// "}
      {title}
    </h3>
    {children}
  </div>
);

export default function UltraCyberExecutive({ data }: TemplateProps) {
  const {
    basics,
    experience = [],
    education = [],
    skills = [],
    certifications = [],
    languages = [],
  } = data;

  const contact = [basics.email, basics.phone, basics.location, basics.website].filter(
    Boolean,
  ) as string[];

  return (
    <article className="relative w-[794px] min-h-[1123px] bg-[#07090e] text-slate-100 font-sans p-10 overflow-hidden shadow-2xl print:shadow-none border border-slate-800">
      {/* Bloom orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-600/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-gradient-to-br from-fuchsia-600/20 to-pink-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero card ------------------------------------------------------ */}
      <div className="relative z-10 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-indigo-950/80 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-2xl mb-8 flex justify-between items-center gap-6">
        <div className="space-y-3 min-w-0">
          {/* Ornamental chip: theming only, asserts nothing about the person. */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-mono tracking-widest uppercase"
            aria-hidden="true"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            Profile
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent break-words">
            {basics.fullName}
          </h1>
          {basics.role && (
            <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
              {basics.role}
            </p>
          )}
        </div>

        {contact.length > 0 && (
          <div className="text-right text-[11px] font-mono text-slate-300 space-y-1.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 shrink-0 max-w-[260px]">
            {contact.map((c, i) => (
              <p
                key={i}
                className={`break-all ${i === 0 ? "text-white font-bold" : "text-slate-400"}`}
              >
                {c}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Body ----------------------------------------------------------- */}
      <div className="relative z-10 grid grid-cols-12 gap-6">
        {/* Left column */}
        <div className="col-span-8 space-y-6">
          {experience.length > 0 && (
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-xl space-y-5">
              <CardRule t={getLabel(data, "experience", "Experience Deployment")} />
              <div className="space-y-6">
                {experience.map((e, i) => (
                  <div
                    key={i}
                    className="relative pl-5 border-l-2 border-indigo-500/40 space-y-1.5"
                  >
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    <h4 className="font-bold text-white text-sm">{e.role}</h4>
                    <p className="text-[11px] font-mono text-indigo-300">
                      {e.company}{" "}
                      <span className="text-slate-500">
                        [{dateRange(e.startDate, e.endDate, e.current)}]
                      </span>
                    </p>
                    <BulletsRender
                      bullets={e.bullets}
                      className="uce-b pt-1"
                      style={{ margin: 0, padding: 0, listStyle: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 backdrop-blur-xl space-y-4">
              <CardRule t={getLabel(data, "education", "Academy & Roots")} />
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div
                    key={i}
                    className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60"
                  >
                    <h4 className="font-bold text-white text-xs">{e.degree}</h4>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {e.school}
                      {e.school && (e.startDate || e.endDate) ? " | " : ""}
                      {dateRange(e.startDate, e.endDate)}
                      {e.notes ? ` · ${e.notes}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="col-span-4 space-y-6">
          {!isRichTextEmpty(basics.summary) && (
            <SideCard title={getLabel(data, "summary", "Core Manifesto")}>
              <RichTextRender
                html={basics.summary as string}
                as="div"
                className="text-xs text-slate-300 font-light"
                style={{ lineHeight: 1.6 }}
              />
            </SideCard>
          )}

          {skills.length > 0 && (
            <SideCard title={getLabel(data, "skills", "Core Arsenal")} titleColor="text-indigo-400">
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-indigo-950/50 text-indigo-300 px-3 py-1.5 rounded-xl border border-indigo-800/40 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SideCard>
          )}

          {/* The source put an "IMPACT INDEX / 99.4% / Top Tier Performance
              Metric" gauge here: an invented score, identical for every user,
              that no CVData field can supply. Replaced with the certifications
              and languages the CV actually carries, which the source design had
              nowhere to put and would have dropped silently. */}
          {certifications.length > 0 && (
            <SideCard title={getLabel(data, "certifications", "Certifications")}>
              <div className="space-y-1.5">
                {certifications.map((c, i) => (
                  <p key={i} className="text-[11px] font-mono text-slate-300">
                    <span className="text-white font-bold">{c.name}</span>
                    {c.issuer ? ` · ${c.issuer}` : ""}
                    {c.year ? ` · ${c.year}` : ""}
                  </p>
                ))}
              </div>
            </SideCard>
          )}

          {languages.length > 0 && (
            <SideCard title={getLabel(data, "languages", "Languages")} titleColor="text-indigo-400">
              <div className="space-y-1">
                {languages.map((l, i) => (
                  <p key={i} className="text-[11px] font-mono text-slate-300">
                    <span className="text-white font-bold">{l.name}</span>
                    {l.level ? ` — ${l.level}` : ""}
                  </p>
                ))}
              </div>
            </SideCard>
          )}
        </div>
      </div>

      <style>{`.uce-b li{position:relative;padding-left:15px;margin-bottom:4px;font-size:12px;line-height:1.55;color:#cbd5e1;font-weight:300}.uce-b li:before{content:"\\203A";position:absolute;left:0;top:-1px;color:#22d3ee;font-weight:700}`}</style>
    </article>
  );
}
