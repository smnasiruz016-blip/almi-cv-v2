// NoirBlancCommunication — Communication / content-creation roles.
// Cream editorial ground inside a heavy black frame, offset-shadow portrait box,
// uppercase tracked rules. French-first labels. atsSafe:false, supportsPhoto:true.
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
  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-900 pb-1">
    {t}
  </h3>
);

export default function NoirBlancCommunication({ data }: TemplateProps) {
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
      className="w-[794px] min-h-[1123px] relative bg-[#f8f5f0] text-neutral-900 p-12 border-[16px] border-neutral-900 overflow-hidden print:shadow-none"
      style={{ fontFamily: '"Inter",sans-serif', fontSize: "10.5pt" }}
    >
      {/* Masthead ------------------------------------------------------- */}
      <div className="grid grid-cols-12 gap-8 items-start border-b-2 border-neutral-300 pb-10 mb-8">
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
                className="w-full h-full flex items-center justify-center text-neutral-500"
                style={{ fontFamily: "Georgia,serif", fontSize: "34pt" }}
              >
                {initials(basics.fullName)}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-8 space-y-4 pt-2">
          <div>
            <h1
              className="text-4xl font-black tracking-wider text-neutral-900 uppercase"
              style={{ fontFamily: "Georgia,serif" }}
            >
              {basics.fullName}
            </h1>
            <p className="text-base font-medium text-neutral-700 tracking-wide mt-1">
              {basics.role}
            </p>
          </div>
          {!isRichTextEmpty(basics.summary) && (
            <RichTextRender
              html={basics.summary as string}
              as="div"
              className="text-xs text-neutral-600 font-light"
              style={{ lineHeight: 1.65 }}
            />
          )}
        </div>
      </div>

      {/* Body ----------------------------------------------------------- */}
      <div className="grid grid-cols-12 gap-10">
        {/* Sidebar */}
        <div className="col-span-4 space-y-8 border-r border-neutral-300 pr-6">
          <div className="space-y-3">
            <Rule t={getLabel(data, "contact", "Contact")} />
            <div className="text-[11px] space-y-1.5 text-neutral-700">
              {basics.phone && <p>{basics.phone}</p>}
              {basics.email && <p className="break-all">{basics.email}</p>}
              {basics.location && <p>{basics.location}</p>}
              {basics.website && <p className="break-all">{basics.website}</p>}
              {basics.linkedIn && <p className="break-all">{basics.linkedIn}</p>}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="space-y-3">
              <Rule t={getLabel(data, "skills", "Compétences")} />
              <div className="space-y-3 text-[11px]">
                {skills.map((s, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-medium text-neutral-800">{s}</p>
                    {/* Uniform rule, not a proficiency meter: CVData carries no
                        skill level, so every bar is identical by design and
                        makes no comparative claim. */}
                    <div className="w-full h-2 bg-neutral-900" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="space-y-3">
              <Rule t={getLabel(data, "languages", "Langues")} />
              <div className="text-[11px] space-y-1 text-neutral-700">
                {languages.map((l, i) => (
                  <p key={i}>
                    <span className="font-semibold text-neutral-900">{l.name}</span>
                    {l.level ? ` — ${l.level}` : ""}
                  </p>
                ))}
              </div>
            </div>
          )}

          {interests.length > 0 && (
            <div className="space-y-2">
              <Rule t={getLabel(data, "interests", "Qualités")} />
              <p className="text-[11px] text-neutral-700 leading-relaxed font-medium">
                {interests.join(" • ")}
              </p>
            </div>
          )}
        </div>

        {/* Main column */}
        <div className="col-span-8 space-y-8">
          {experience.length > 0 && (
            <div className="space-y-4">
              <Rule t={getLabel(data, "experience", "Expériences professionnelles")} />
              <div className="space-y-5 text-xs">
                {experience.map((e, i) => (
                  <div key={i} className="space-y-1.5">
                    <h4 className="font-bold text-neutral-900 text-sm">{e.role}</h4>
                    <p className="text-neutral-500 font-semibold italic">
                      {e.company}
                      {e.company && (e.startDate || e.endDate) ? " · " : ""}
                      {dateRange(e.startDate, e.endDate, e.current)}
                    </p>
                    <BulletsRender
                      bullets={e.bullets}
                      className="nbc-b"
                      style={{ color: "#404040", margin: 0, padding: 0, listStyle: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="space-y-4">
              <Rule t={getLabel(data, "education", "Formations")} />
              <div className="space-y-3 text-xs">
                {education.map((e, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-neutral-900">
                      {e.degree}
                      {e.degree && e.school ? " – " : ""}
                      {e.school}
                    </h4>
                    <p className="text-neutral-500">
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

      <style>{`.nbc-b li{position:relative;padding-left:14px;margin-bottom:4px;line-height:1.5}.nbc-b li:before{content:"";position:absolute;left:0;top:7px;width:4px;height:4px;border-radius:50%;background:#171717}`}</style>
    </article>
  );
}
