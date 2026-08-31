// FuturisticTechHUD — AI / systems / platform engineering roles.
// Deep navy console with cyan and indigo bloom, a grid underlay, a status chip
// masthead, glowing-node experience timeline and glass sidebar cards.
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
const Rule = ({ t, c }: { t: string; c?: string }) => (
  <h3
    className={`text-xs font-mono font-black uppercase tracking-widest flex items-center gap-2 ${c ?? "text-cyan-400"}`}
  >
    <span className="text-slate-600">{"//"}</span> {t}
  </h3>
);

const Card = ({
  title,
  titleColor,
  children,
}: {
  title: string;
  titleColor?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[#111827]/80 p-4 rounded-xl border border-[#1f2937] backdrop-blur-md space-y-2">
    <h3
      className={`text-[10px] font-mono font-black uppercase tracking-widest ${titleColor ?? "text-cyan-400"}`}
    >
      {"// "}{title}
    </h3>
    {children}
  </div>
);

export default function FuturisticTechHUD({ data }: TemplateProps) {
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
    <article className="relative w-[794px] min-h-[1123px] bg-[#0a0f1d] text-[#e2e8f0] font-sans p-12 overflow-hidden shadow-2xl print:shadow-none border border-[#1e293b]">
      {/* Bloom + grid underlay */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Masthead ------------------------------------------------------- */}
      <div className="relative z-10 flex justify-between items-start gap-6 border-b border-[#1e293b] pb-8 mb-8">
        <div className="space-y-2 min-w-0">
          {/* Ornamental status chip: theming only, asserts nothing about the
              person, so it is safe to keep fixed. */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono tracking-widest uppercase"
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            System Online
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase font-mono break-words">
            {basics.fullName}
          </h1>
          {basics.role && (
            <p className="text-sm font-mono text-cyan-400 tracking-wide uppercase">
              {basics.role}
            </p>
          )}
        </div>

        {contact.length > 0 && (
          <div className="text-right text-[11px] font-mono text-slate-400 space-y-1 bg-[#111827]/80 p-4 rounded-xl border border-[#1f2937] backdrop-blur-md shrink-0 max-w-[280px]">
            {contact.map((c, i) => (
              <p key={i} className={`break-all ${i === 0 ? "text-white font-bold" : ""}`}>
                {c}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Body ----------------------------------------------------------- */}
      <div className="relative z-10 grid grid-cols-12 gap-8">
        {/* Left column */}
        <div className="col-span-8 space-y-8">
          {experience.length > 0 && (
            <div className="space-y-4">
              <Rule t={getLabel(data, "experience", "Experience Matrix")} />
              <div className="space-y-6">
                {experience.map((e, i) => (
                  <div
                    key={i}
                    className="relative pl-4 border-l-2 border-cyan-500/30 space-y-1.5"
                  >
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    <h4 className="font-bold text-white text-sm">{e.role}</h4>
                    <p className="text-xs font-mono text-indigo-400">
                      {e.company}{" "}
                      <span className="text-slate-500">
                        [{dateRange(e.startDate, e.endDate, e.current)}]
                      </span>
                    </p>
                    <BulletsRender
                      bullets={e.bullets}
                      className="ft-b pt-1"
                      style={{ margin: 0, padding: 0, listStyle: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="space-y-4">
              <Rule t={getLabel(data, "education", "Academic Nodes")} />
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div key={i} className="bg-[#111827]/50 p-3 rounded-lg border border-[#1f2937]">
                    <h4 className="font-bold text-white text-xs">{e.degree}</h4>
                    <p className="text-[11px] font-mono text-slate-400">
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
            <Card title={getLabel(data, "summary", "Profile Summary")} titleColor="text-indigo-400">
              <RichTextRender
                html={basics.summary as string}
                as="div"
                className="text-xs text-slate-300 font-light"
                style={{ lineHeight: 1.6 }}
              />
            </Card>
          )}

          {skills.length > 0 && (
            <Card title={getLabel(data, "skills", "Core Protocols")}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono bg-cyan-950/40 text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-800/40"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* The source put a "99.8% OPTIMAL — Efficiency Benchmark" gauge here:
              an invented performance score, identical for every user, that no
              CVData field can supply. Replaced with the certifications and
              languages the CV actually carries — which the original design had
              nowhere to put, and would otherwise have dropped silently. */}
          {certifications.length > 0 && (
            <Card title={getLabel(data, "certifications", "Certifications")}>
              <div className="space-y-1.5">
                {certifications.map((c, i) => (
                  <p key={i} className="text-[11px] font-mono text-slate-300">
                    <span className="text-white font-bold">{c.name}</span>
                    {c.issuer ? ` · ${c.issuer}` : ""}
                    {c.year ? ` · ${c.year}` : ""}
                  </p>
                ))}
              </div>
            </Card>
          )}

          {languages.length > 0 && (
            <Card title={getLabel(data, "languages", "Languages")} titleColor="text-indigo-400">
              <div className="space-y-1">
                {languages.map((l, i) => (
                  <p key={i} className="text-[11px] font-mono text-slate-300">
                    <span className="text-white font-bold">{l.name}</span>
                    {l.level ? ` — ${l.level}` : ""}
                  </p>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <style>{`.ft-b li{position:relative;padding-left:14px;margin-bottom:4px;font-size:12px;line-height:1.5;color:#cbd5e1}.ft-b li:before{content:"\\203A";position:absolute;left:0;top:-1px;color:#06b6d4;font-weight:700}`}</style>
    </article>
  );
}
