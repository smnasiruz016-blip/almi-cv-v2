// CloudEngineerStack — Cloud / DevOps / SRE roles.
// Deep slate ground with two wide teal-and-indigo washes, a cyan-edged hero
// card and squared glass panels. Sidebar leads with a dedicated credentials
// panel, which is what separates it from the other dark-tech layouts.
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
  <h3 className="text-xs font-mono font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2 border-b border-slate-800/80 pb-3">
    <span className="w-2 h-2 bg-cyan-400 rounded-sm" /> {t}
  </h3>
);

const SideCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md space-y-2.5">
    <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-400">
      {"// "}
      {title}
    </h3>
    {children}
  </div>
);

export default function CloudEngineerStack({ data }: TemplateProps) {
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
    <article className="relative w-[794px] min-h-[1123px] bg-[#0b0f19] text-slate-100 font-sans p-10 overflow-hidden shadow-2xl print:shadow-none border border-cyan-500/20">
      {/* Washes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Hero card ------------------------------------------------------ */}
      <div className="relative z-10 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 p-8 rounded-2xl border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] mb-8 flex justify-between items-center gap-6">
        <div className="space-y-2 min-w-0">
          {/* Ornamental chip. The source put "Cloud Infrastructure Specialist"
              here -- a job title asserted about whoever used the template, and
              already covered truthfully by basics.role below. Reduced to a
              neutral marker. */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono tracking-widest uppercase"
            aria-hidden="true"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Online
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase font-sans break-words">
            {basics.fullName}
          </h1>
          {basics.role && (
            <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">
              {basics.role}
            </p>
          )}
        </div>

        {contact.length > 0 && (
          <div className="text-right text-[11px] font-mono text-slate-300 space-y-1 bg-slate-950/80 p-4 rounded-xl border border-slate-800 shrink-0 max-w-[260px]">
            {contact.map((c, i) => (
              <p
                key={i}
                className={`break-all ${i === 0 ? "text-white font-bold" : i === 1 ? "text-cyan-400" : "text-slate-400"}`}
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
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md space-y-5">
              <CardRule t={getLabel(data, "experience", "Professional Experience")} />
              <div className="space-y-6">
                {experience.map((e, i) => (
                  <div key={i} className="relative pl-5 border-l-2 border-cyan-500/40 space-y-1.5">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    <h4 className="font-bold text-white text-sm">{e.role}</h4>
                    <p className="text-[11px] font-mono text-cyan-300/80">
                      {e.company}{" "}
                      <span className="text-slate-500">
                        [{dateRange(e.startDate, e.endDate, e.current)}]
                      </span>
                    </p>
                    <BulletsRender
                      bullets={e.bullets}
                      className="ces-b pt-1"
                      style={{ margin: 0, padding: 0, listStyle: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md space-y-4">
              <CardRule t={getLabel(data, "education", "Education & Credentials")} />
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div key={i} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
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
            <SideCard title={getLabel(data, "summary", "Profile Summary")}>
              <RichTextRender
                html={basics.summary as string}
                as="div"
                className="text-xs text-slate-300 font-light"
                style={{ lineHeight: 1.6 }}
              />
            </SideCard>
          )}

          {skills.length > 0 && (
            <SideCard title={getLabel(data, "skills", "Cloud Expertise & Stack")}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-cyan-950/50 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-800/40 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </SideCard>
          )}

          {/* Credentials panel. The source HARDCODED two real-world
              certifications here -- "AWS Certified Solutions Architect,
              Professional Level, 2024" and "Certified Kubernetes Administrator,
              CKA, 2023" -- on every CV rendered with this template, whether or
              not the person held them. CVData.certifications exists and was
              ignored. It now drives this panel, and the panel disappears when
              the CV lists none. */}
          {certifications.length > 0 && (
            <div className="bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-indigo-950/40 p-5 rounded-2xl border border-cyan-500/30 backdrop-blur-md space-y-3">
              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                {getLabel(data, "certifications", "Certifications")}
              </p>
              <div className="space-y-2 text-xs text-slate-300 font-mono">
                {certifications.map((c, i) => (
                  <div key={i} className="p-2 bg-slate-950/60 rounded border border-slate-800">
                    <p className="text-white font-bold text-[11px]">{c.name}</p>
                    {(c.issuer || c.year) && (
                      <p className="text-[10px] text-slate-400">
                        {[c.issuer, c.year].filter(Boolean).join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <SideCard title={getLabel(data, "languages", "Languages")}>
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

      <style>{`.ces-b li{position:relative;padding-left:15px;margin-bottom:4px;font-size:12px;line-height:1.55;color:#cbd5e1;font-weight:300}.ces-b li:before{content:"\\203A";position:absolute;left:0;top:-1px;color:#22d3ee;font-weight:700}`}</style>
    </article>
  );
}
