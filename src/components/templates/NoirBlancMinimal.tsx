// NoirBlancMinimal — Communication / content-creation roles.
// The unframed sibling of NoirBlancCommunication: same editorial bones, but a
// hairline border and soft shadow instead of the heavy black frame, tighter
// padding and smaller, heavier section rules. French-first labels.
// atsSafe:false, supportsPhoto:true.
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
  <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-900 pb-1">
    {t}
  </h3>
);

export default function NoirBlancMinimal({ data }: TemplateProps) {
  const {
    basics,
    experience = [],
    education = [],
    skills = [],
    languages = [],
    interests = [],
  } = data;

  return (
    <article
      className="relative w-[794px] min-h-[1123px] bg-[#fcfbf9] text-neutral-900 p-10 box-border border border-neutral-200 shadow-xl print:shadow-none print:border-none"
      style={{ fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}
    >
      {/* Masthead ------------------------------------------------------- */}
      <div className="grid grid-cols-12 gap-8 items-center border-b-2 border-neutral-900 pb-8 mb-8">
        <div className="col-span-4">
          <div className="w-full aspect-[4/5] bg-neutral-200 border-2 border-neutral-900 rounded-sm overflow-hidden shadow-[4px_4px_0px_0px_#171717]">
            {basics.photoUrl ? (
              <img
                src={basics.photoUrl}
                alt=""
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-neutral-500 uppercase tracking-widest"
                style={{ fontFamily: "Georgia,serif", fontSize: "30pt" }}
              >
                {initials(basics.fullName)}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-8 space-y-3">
          <div>
            <h1
              className="text-3xl font-black tracking-wider text-neutral-900 uppercase"
              style={{ fontFamily: "Georgia,serif" }}
            >
              {basics.fullName}
            </h1>
            <p className="text-sm font-bold text-neutral-700 tracking-wide mt-0.5 uppercase">
              {basics.role}
            </p>
          </div>
          {!isRichTextEmpty(basics.summary) && (
            <RichTextRender
              html={basics.summary as string}
              as="div"
              className="text-xs text-neutral-600 font-light"
              style={{ lineHeight: 1.6 }}
            />
          )}
        </div>
      </div>

      {/* Body ----------------------------------------------------------- */}
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-4 space-y-6 border-r border-neutral-300 pr-5">
          <div className="space-y-2">
            <Rule t={getLabel(data, "contact", "Contact")} />
            <div className="text-[11px] space-y-1 text-neutral-700 font-medium">
              {basics.phone && <p>{basics.phone}</p>}
              {basics.email && <p className="break-all">{basics.email}</p>}
              {basics.location && <p>{basics.location}</p>}
              {basics.website && <p className="break-all">{basics.website}</p>}
              {basics.linkedIn && <p className="break-all">{basics.linkedIn}</p>}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="space-y-2">
              <Rule t={getLabel(data, "skills", "Compétences")} />
              <div className="space-y-2.5 text-[11px]">
                {skills.map((s, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-semibold text-neutral-800">{s}</p>
                    {/* Uniform rule, not a proficiency meter: CVData carries no
                        skill level, so every bar is identical by design and
                        makes no comparative claim. */}
                    <div className="w-full h-1.5 bg-neutral-900" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="space-y-2">
              <Rule t={getLabel(data, "languages", "Langues")} />
              <div className="text-[11px] space-y-1 text-neutral-700">
                {languages.map((lang, i) => (
                  <p key={i} className="font-medium">
                    {lang.name}
                    {lang.level ? ` (${lang.level})` : ""}
                  </p>
                ))}
              </div>
            </div>
          )}

          {interests.length > 0 && (
            <div className="space-y-1.5">
              <Rule t={getLabel(data, "interests", "Qualités")} />
              <p className="text-[11px] text-neutral-700 font-medium leading-relaxed">
                {interests.join(" • ")}
              </p>
            </div>
          )}
        </div>

        {/* Main column */}
        <div className="col-span-8 space-y-6">
          {experience.length > 0 && (
            <div className="space-y-3">
              <Rule t={getLabel(data, "experience", "Expériences professionnelles")} />
              <div className="space-y-4 text-xs">
                {experience.map((e, i) => (
                  <div key={i} className="space-y-1">
                    <h4 className="font-bold text-neutral-900">{e.role}</h4>
                    <p className="text-neutral-500 font-semibold italic text-[11px]">
                      {e.company}
                      {e.company && (e.startDate || e.endDate) ? " | " : ""}
                      {dateRange(e.startDate, e.endDate, e.current)}
                    </p>
                    <BulletsRender
                      bullets={e.bullets}
                      className="nbm-b pt-0.5"
                      style={{ color: "#404040", margin: 0, padding: 0, listStyle: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="space-y-3">
              <Rule t={getLabel(data, "education", "Formations")} />
              <div className="space-y-3 text-xs">
                {education.map((e, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-neutral-900">
                      {e.degree}
                      {e.degree && e.school ? " – " : ""}
                      {e.school}
                    </h4>
                    <p className="text-neutral-500 text-[11px]">
                      {dateRange(e.startDate, e.endDate)}
                      {e.notes ? ` · ${e.notes}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`.nbm-b li{position:relative;padding-left:13px;margin-bottom:2px;line-height:1.45}.nbm-b li:before{content:"";position:absolute;left:0;top:6px;width:3.5px;height:3.5px;border-radius:50%;background:#171717}`}</style>
    </article>
  );
}
