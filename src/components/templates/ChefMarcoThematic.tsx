// ChefMarcoThematic — Culinary / kitchen roles.
// The dressed sibling of ChefMarcoBoard: a gilded serving tray with a handle
// rather than a plain board, gold masthead rule, herb-and-tomato garnish in the
// corners, and utensil marks on the section headings.
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
const Rule = ({ t, icon, s }: { t: string; icon?: string; s?: string }) => (
  <h3
    className={`font-black tracking-widest uppercase text-[#5a3818] border-b-2 border-[#5a3818]/20 pb-1 font-sans flex items-center gap-1.5 ${s ?? "text-xs"}`}
  >
    {icon && <span aria-hidden="true">{icon}</span>} {t}
  </h3>
);

const ChefHat = () => (
  <svg className="w-12 h-12 text-[#e6d5b8] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2c-1.7 0-3 1.3-3 3 0 .4.1.8.3 1.1C7.8 6.5 6.5 8 6.5 9.8c0 1.2.6 2.3 1.5 3-.9.7-1.5 1.8-1.5 3 0 1.9 1.4 3.5 3.3 3.9-.3.6-.5 1.3-.5 2.3 0 1.1.9 2 2 2s2-.9 2-2c0-1-.2-1.7-.5-2.3 1.9-.4 3.3-2 3.3-3.9 0-1.2-.6-2.3-1.5-3 .9-.7 1.5-1.8 1.5-3 0-1.8-1.3-3.3-3.2-3.7.2-.3.3-.7.3-1.1 0-1.7-1.3-3-3-3z" />
  </svg>
);

/** Decorative garnish. Purely ornamental theming — it asserts nothing about
 *  the person, so it is safe to hardcode, unlike the skill meters below. */
const Garnish = () => (
  <>
    <div className="absolute top-6 left-6 text-emerald-700/80 transform -rotate-12 pointer-events-none" aria-hidden="true">
      🌿 <span className="text-[10px] font-sans tracking-widest text-emerald-600">Fresh Basil</span>
    </div>
    <div className="absolute top-6 right-6 text-emerald-700/80 transform rotate-12 pointer-events-none" aria-hidden="true">
      🌿 <span className="text-[10px] font-sans tracking-widest text-emerald-600">Rosemary</span>
    </div>
    <div className="absolute bottom-6 left-10 text-red-600/80 pointer-events-none" aria-hidden="true">
      🍅 <span className="text-[10px] font-sans text-red-500">Vine Tomatoes</span>
    </div>
  </>
);

export default function ChefMarcoThematic({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [] } = data;
  const contact = [basics.phone, basics.email, basics.location, basics.website].filter(
    Boolean,
  ) as string[];

  return (
    <article className="relative w-[794px] min-h-[1123px] bg-[#1c1c1c] text-[#2d1b0d] font-serif p-10 flex flex-col items-center justify-between shadow-2xl overflow-hidden print:shadow-none border-8 border-[#111]">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <Garnish />

      {/* Masthead ------------------------------------------------------- */}
      <div className="text-center relative z-10 pt-4">
        <div className="flex justify-center mb-1">
          <ChefHat />
        </div>
        <h1 className="text-4xl font-black tracking-[0.25em] text-[#f4ebd0] uppercase font-sans drop-shadow-lg">
          {basics.fullName}
        </h1>
        {basics.role && (
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#e6d5b8]/80 uppercase font-sans mt-1.5">
            {basics.role}
          </p>
        )}
        <div className="w-36 h-0.5 bg-[#d4af37] mx-auto mt-2 shadow-sm" />
      </div>

      {/* Serving tray --------------------------------------------------- */}
      <div className="relative w-full max-w-[690px] bg-gradient-to-br from-[#85522b] via-[#6e4221] to-[#513017] p-6 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border-[6px] border-[#3a200e] my-4 z-10">
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-[#3a200e] rounded-full" />

        {/* Parchment */}
        <div className="bg-[#fbf9f5] text-[#2d1b0d] p-8 rounded-lg shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] min-h-[750px] border border-[#e2d9c5] relative">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

          <div className="grid grid-cols-12 gap-8 relative z-10">
            {/* Left column */}
            <div className="col-span-7 space-y-6">
              {experience.length > 0 && (
                <div className="space-y-2">
                  <Rule t={getLabel(data, "experience", "Experience")} icon="🔪" />
                  <div className="space-y-4 text-xs">
                    {experience.map((e, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="font-bold text-[#1a1007] text-[13px]">{e.role}</h4>
                        <p className="text-[#85522b] font-semibold text-[11px] italic">
                          {e.company}
                          {e.company && (e.startDate || e.endDate) ? " | " : ""}
                          {dateRange(e.startDate, e.endDate, e.current)}
                        </p>
                        <BulletsRender
                          bullets={e.bullets}
                          className="cmt-b pl-1"
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
                  <Rule t={getLabel(data, "summary", "Specialties")} icon="✨" />
                  <RichTextRender
                    html={basics.summary as string}
                    as="div"
                    className="text-[11px] text-neutral-700 font-sans"
                    style={{ lineHeight: 1.6 }}
                  />
                </div>
              )}

              {education.length > 0 && (
                <div className="space-y-2">
                  <Rule t={getLabel(data, "education", "Education")} icon="🎓" />
                  <div className="space-y-2 text-xs">
                    {education.map((e, i) => (
                      <div key={i}>
                        <h4 className="font-bold text-[#1a1007]">{e.degree}</h4>
                        <p className="text-[#85522b] font-semibold text-[11px] italic">
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
            <div className="col-span-5 space-y-6 border-l-2 border-[#e2d9c5] pl-6">
              {skills.length > 0 && (
                <div className="space-y-3">
                  <Rule t={getLabel(data, "skills", "Kitchen Skills")} s="text-[11px]" />
                  {skills.map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-neutral-800 font-sans">
                        <span>{s}</span>
                      </div>
                      {/* A solid copper rule, deliberately NOT a meter. The
                          source filled these to hardcoded percentages (98%,
                          95%, 92%, 90%, 99%) identical for every user. CVData
                          has no skill level, so a partial fill would be a
                          fabricated competence claim on a job application. */}
                      <div className="w-full h-2 rounded-full bg-gradient-to-r from-[#85522b] to-[#b87333] shadow-inner" />
                    </div>
                  ))}
                </div>
              )}

              {contact.length > 0 && (
                <div className="pt-4 border-t-2 border-[#e2d9c5] space-y-1.5 text-[11px] text-neutral-700 font-sans">
                  <p className="font-black text-[#5a3818] uppercase tracking-wider text-[10px]">
                    {getLabel(data, "contact", "Contact")}:
                  </p>
                  {contact.map((c, i) => (
                    <p key={i} className="break-all font-medium">
                      {c}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer rule — the source printed vendor copy here ("A la carte
          culinary presentation • Crafted with thematic precision"), which would
          have appeared on every user's CV. Replaced with a plain gold rule. */}
      <div className="w-36 h-0.5 bg-[#d4af37]/50 mx-auto mb-2 relative z-10" />

      <style>{`.cmt-b li{position:relative;padding-left:11px;margin-bottom:2px;line-height:1.45}.cmt-b li:before{content:"";position:absolute;left:0;top:5px;width:3px;height:3px;border-radius:50%;background:#85522b}`}</style>
    </article>
  );
}
