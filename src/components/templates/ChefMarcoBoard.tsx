// ChefMarcoBoard — Culinary / kitchen roles.
// A cream parchment sheet laid on a wooden cutting board against charcoal, with
// a chef-hat mark and cream masthead. No photo slot by design.
// atsSafe:false, supportsPhoto:false.
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
const Rule = ({ t, s }: { t: string; s?: string }) => (
  <h3
    className={`font-black tracking-widest uppercase text-[#5c3a21] border-b border-[#5c3a21]/30 pb-1 font-sans ${s ?? "text-xs"}`}
  >
    {t}
  </h3>
);

const ChefHat = () => (
  <svg className="w-10 h-10 text-[#f5ebd6]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2c-1.7 0-3 1.3-3 3 0 .4.1.8.3 1.1C7.8 6.5 6.5 8 6.5 9.8c0 1.2.6 2.3 1.5 3-.9.7-1.5 1.8-1.5 3 0 1.9 1.4 3.5 3.3 3.9-.3.6-.5 1.3-.5 2.3 0 1.1.9 2 2 2s2-.9 2-2c0-1-.2-1.7-.5-2.3 1.9-.4 3.3-2 3.3-3.9 0-1.2-.6-2.3-1.5-3 .9-.7 1.5-1.8 1.5-3 0-1.8-1.3-3.3-3.2-3.7.2-.3.3-.7.3-1.1 0-1.7-1.3-3-3-3z" />
  </svg>
);

export default function ChefMarcoBoard({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [] } = data;
  const contact = [basics.phone, basics.email, basics.location, basics.website].filter(
    Boolean,
  ) as string[];

  return (
    <article className="relative w-[794px] min-h-[1123px] bg-[#1a1a1a] text-[#3d2314] font-serif p-10 flex flex-col items-center justify-center shadow-2xl overflow-hidden print:shadow-none">
      {/* Masthead ------------------------------------------------------- */}
      <div className="text-center mb-6 z-10">
        <div className="flex justify-center mb-2">
          <ChefHat />
        </div>
        <h1 className="text-4xl font-black tracking-widest text-[#f5ebd6] uppercase font-sans">
          {basics.fullName}
        </h1>
        {basics.role && (
          <p className="text-xs font-semibold tracking-[0.3em] text-[#f5ebd6]/70 uppercase font-sans mt-1">
            {basics.role}
          </p>
        )}
        <div className="w-48 h-0.5 bg-[#f5ebd6]/40 mx-auto mt-2" />
      </div>

      {/* Cutting board -------------------------------------------------- */}
      <div className="relative w-full max-w-[680px] bg-[#8B5A2B] p-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-[#5c3a21]">
        {/* Parchment */}
        <div className="bg-[#fbf9f1] text-[#3d2314] p-8 rounded-sm shadow-inner min-h-[850px] border border-[#dcd6c5]">
          <div className="grid grid-cols-12 gap-8">
            {/* Left column */}
            <div className="col-span-7 space-y-6">
              {experience.length > 0 && (
                <div className="space-y-2">
                  <Rule t={getLabel(data, "experience", "Experience")} />
                  <div className="space-y-3 text-xs">
                    {experience.map((e, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="font-bold text-neutral-900">{e.role}</h4>
                        <p className="text-[#8B5A2B] font-semibold text-[11px] italic">
                          {e.company}
                          {e.company && (e.startDate || e.endDate) ? " | " : ""}
                          {dateRange(e.startDate, e.endDate, e.current)}
                        </p>
                        <BulletsRender
                          bullets={e.bullets}
                          className="cm-b"
                          style={{
                            color: "#404040",
                            fontSize: "10px",
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isRichTextEmpty(basics.summary) && (
                <div className="space-y-2">
                  <Rule t={getLabel(data, "summary", "Specialties")} />
                  <RichTextRender
                    html={basics.summary as string}
                    as="div"
                    className="text-xs text-neutral-700 font-sans"
                    style={{ lineHeight: 1.6 }}
                  />
                </div>
              )}

              {education.length > 0 && (
                <div className="space-y-2">
                  <Rule t={getLabel(data, "education", "Education")} />
                  <div className="space-y-2 text-xs">
                    {education.map((e, i) => (
                      <div key={i}>
                        <h4 className="font-bold text-neutral-900">{e.degree}</h4>
                        <p className="text-[#8B5A2B] font-semibold text-[11px] italic">
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
            <div className="col-span-5 space-y-6 border-l border-[#dcd6c5] pl-6">
              {skills.length > 0 && (
                <div className="space-y-4">
                  <Rule t={getLabel(data, "skills", "Skills")} s="text-[11px]" />
                  {skills.map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-neutral-800 font-sans">
                        <span>{s}</span>
                      </div>
                      {/* A solid rule, deliberately NOT a meter. The source
                          design filled these bars to hardcoded percentages
                          (95%, 90%, 85%, 88%) that were identical for every
                          user. CVData has no skill level, so any partial fill
                          would be a fabricated competence claim on someone's
                          job application. */}
                      <div className="w-full h-2 bg-[#8B5A2B] rounded-full" />
                    </div>
                  ))}
                </div>
              )}

              {contact.length > 0 && (
                <div className="pt-4 border-t border-[#dcd6c5] space-y-1 text-[11px] text-neutral-700 font-sans">
                  <p className="font-bold text-[#5c3a21]">
                    {getLabel(data, "contact", "Contact")}:
                  </p>
                  {contact.map((c, i) => (
                    <p key={i} className="break-all">
                      {c}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`.cm-b li{position:relative;padding-left:11px;margin-bottom:2px;line-height:1.45}.cm-b li:before{content:"";position:absolute;left:0;top:5px;width:3px;height:3px;border-radius:50%;background:#8B5A2B}`}</style>
    </article>
  );
}
