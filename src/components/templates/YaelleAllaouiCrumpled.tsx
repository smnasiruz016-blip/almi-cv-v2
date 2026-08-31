// YaelleAllaouiCrumpled — Graphic design / creative portfolio roles.
// Charcoal base, pink dotted-texture header with a tilted polaroid frame and an
// oval name plate, warm orange lower half with timeline entries and a dashed
// round stamp. French-first labels. atsSafe:false, supportsPhoto:true.
//
// Replaces the original YaelleAllaouiTemplate from batch-imported-canva.tsx,
// which shipped under this same slug but rendered no photo, no contact, no
// skills and no bullets, printed education as "()", and emitted the summary's
// HTML as escaped text.
"use client";
import React from "react";
import {
  TemplateProps,
  dateRange,
  BulletsRender,
  RichTextRender,
  getLabel,
  initials,
  isRichTextEmpty,
} from "./types";

// --- module-scope render helpers (hoisted to satisfy react-hooks/static-components) ---
const Rule = ({ t }: { t: string }) => (
  <div className="border-b-2 border-neutral-900 pb-1">
    <h3 className="text-sm font-black uppercase tracking-widest text-neutral-900">{t}</h3>
  </div>
);

const Entry = ({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children?: React.ReactNode;
}) => (
  <div className="space-y-0.5 relative pl-4 border-l-2 border-neutral-900/60">
    <h4 className="font-bold text-neutral-900 text-[13px]">{title}</h4>
    {meta && <p className="text-neutral-800 font-medium italic">{meta}</p>}
    {children}
  </div>
);

export default function YaelleAllaouiCrumpled({ data }: TemplateProps) {
  const {
    basics,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    interests = [],
  } = data;

  const contact = [basics.phone, basics.email, basics.website].filter(Boolean) as string[];

  return (
    <article className="relative w-[794px] min-h-[1123px] bg-[#2b2d31] text-neutral-900 overflow-hidden shadow-2xl print:shadow-none"
      style={{ fontFamily: '"Inter",sans-serif' }}>
      {/* Pink header ---------------------------------------------------- */}
      <div className="relative bg-[#f0a8c2] text-neutral-900 pt-10 px-10 pb-8 border-b-8 border-[#2b2d31]">
        {/* crumpled-paper texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="grid grid-cols-12 gap-6 items-start relative z-10">
          {/* Polaroid */}
          <div className="col-span-4">
            <div className="bg-neutral-900 p-2.5 pb-6 shadow-xl transform -rotate-2 border border-neutral-800">
              <div className="w-full aspect-[4/5] bg-neutral-200 overflow-hidden relative">
                {basics.photoUrl ? (
                  <img
                    src={basics.photoUrl}
                    alt=""
                    className="w-full h-full object-cover filter contrast-110"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-neutral-500"
                    style={{ fontFamily: "Georgia,serif", fontSize: "30pt" }}
                  >
                    {initials(basics.fullName)}
                  </div>
                )}
              </div>
              <div className="mt-2 text-center">
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                  Film Negative
                </span>
              </div>
            </div>
          </div>

          {/* Name plate + bio */}
          <div className="col-span-8 space-y-4 pt-2">
            <div className="text-center bg-white/40 border-2 border-neutral-900 rounded-[50%] py-4 px-6 shadow-inner">
              <h1 className="text-3xl font-black tracking-tight text-neutral-900 uppercase">
                {basics.fullName}
              </h1>
              {basics.role && (
                <div className="inline-block bg-[#fcd34d] px-3 py-0.5 mt-1 border border-neutral-900 transform -rotate-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-neutral-900">
                    {basics.role}
                  </p>
                </div>
              )}
            </div>

            {!isRichTextEmpty(basics.summary) && (
              <RichTextRender
                html={basics.summary as string}
                as="div"
                className="text-xs text-neutral-800 font-medium italic text-center px-4"
                style={{ lineHeight: 1.6 }}
              />
            )}
          </div>
        </div>

        {/* Contact strip */}
        {contact.length > 0 && (
          <div className="mt-8 pt-4 border-t border-neutral-900/20 flex flex-wrap justify-between items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-neutral-900 relative z-10">
            <span className="font-bold uppercase tracking-wider">
              {getLabel(data, "contact", "Contact")}:
            </span>
            {contact.map((c, i) => (
              <span key={i} className="break-all">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Orange body ---------------------------------------------------- */}
      <div className="relative bg-[#f5b35c] text-neutral-900 p-10 pt-8 min-h-[600px]">
        <div className="grid grid-cols-12 gap-8">
          {/* Left column */}
          <div className="col-span-6 space-y-6">
            {experience.length > 0 && (
              <>
                <Rule t={getLabel(data, "experience", "Expérience")} />
                <div className="space-y-4 text-xs">
                  {experience.map((e, i) => (
                    <Entry
                      key={i}
                      title={e.role}
                      meta={[e.company, dateRange(e.startDate, e.endDate, e.current)]
                        .filter(Boolean)
                        .join(" | ")}
                    >
                      <BulletsRender
                        bullets={e.bullets}
                        className="ya-b mt-1"
                        style={{ color: "#292524", fontSize: "11px", margin: 0, padding: 0, listStyle: "none" }}
                      />
                    </Entry>
                  ))}
                </div>
              </>
            )}

            {skills.length > 0 && (
              <div className="pt-4 space-y-3">
                <Rule t={getLabel(data, "skills", "Compétences")} />
                <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-neutral-900">
                  {skills.map((s, i) => (
                    <div key={i} className="flex items-start space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project cards — the design's software-box row, driven by real
                projects. Omitted entirely when the CV has none, rather than
                printing placeholder chrome onto someone's résumé. */}
            {projects.length > 0 && (
              <div className="grid grid-cols-3 gap-3 pt-4">
                {projects.slice(0, 3).map((p, i) => (
                  <div
                    key={i}
                    className="bg-white p-2 border-2 border-neutral-900 shadow-md text-center rounded-sm"
                  >
                    <div className="w-full h-10 bg-neutral-100 border border-neutral-300 mb-1 flex items-center justify-center px-1 overflow-hidden">
                      <span className="text-[8px] font-mono text-neutral-600 leading-tight line-clamp-3">
                        {p.description}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase text-neutral-900 break-words">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="col-span-6 space-y-6">
            {education.length > 0 && (
              <>
                <Rule t={getLabel(data, "education", "Formation")} />
                <div className="space-y-4 text-xs">
                  {education.map((e, i) => (
                    <Entry
                      key={i}
                      title={e.degree}
                      meta={[e.school, dateRange(e.startDate, e.endDate)]
                        .filter(Boolean)
                        .join(" | ")}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Round stamp — the design's "Mes services" badge, driven by the
                CV's own interests list. Omitted when empty. */}
            {interests.length > 0 && (
              <div className="pt-6 flex justify-center">
                <div className="w-44 h-44 bg-[#f0a8c2] border-2 border-dashed border-neutral-900 rounded-full flex flex-col items-center justify-center p-4 text-center shadow-xl transform rotate-6 relative">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-900">
                    {getLabel(data, "interests", "Mes services")}
                  </span>
                  <span className="text-[9px] font-medium text-neutral-800 mt-2 leading-tight">
                    {interests.join(" • ")}
                  </span>
                  <div className="absolute top-2 w-2 h-2 bg-neutral-900 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`.ya-b li{position:relative;padding-left:12px;margin-bottom:2px;line-height:1.45}.ya-b li:before{content:"";position:absolute;left:0;top:6px;width:3px;height:3px;border-radius:50%;background:#292524}`}</style>
    </article>
  );
}
