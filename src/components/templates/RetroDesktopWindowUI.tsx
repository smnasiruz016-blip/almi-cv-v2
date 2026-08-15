"use client";

import React from "react";
import type { TemplateProps } from "./types";

export function RetroDesktopWindowUI({ data, paginated }: TemplateProps) {
  const basics: any = data?.basics || {};
  const experience: any[] = (data?.experience as any[]) || [];
  const education: any[] = (data?.education as any[]) || [];
  const rawSkills: any[] = (data?.skills as any[]) || [];
  const skills: string[] = rawSkills
    .map((s: any) => (typeof s === "string" ? s : s?.name || ""))
    .filter(Boolean);
  const certifications: any[] = (data as any)?.certifications || [];
  const languages: any[] = (data as any)?.languages || [];

  const displayRole = basics.role?.trim() || "Graphic Designer & Art Director";
  const fullName = basics.fullName?.trim() || "Teana Wilson";

  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .map((w: string) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "TW";

  return (
    <div
      className="w-full bg-[#fbf6db] text-[#1e1b2e] font-sans p-7 relative shadow-sm selection:bg-[#a78bfa] selection:text-white"
      style={{
        minHeight: paginated ? "1120px" : "auto",
        backgroundImage: `radial-gradient(#d1cbb0 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }}
    >
      {/* Top Main Hero Window */}
      <div className="border-3 border-[#1e1b2e] rounded-xl bg-[#fdfaf0] shadow-[6px_6px_0px_#1e1b2e] overflow-hidden mb-6">
        {/* Window Top Bar */}
        <div className="bg-[#a78bfa] border-b-3 border-[#1e1b2e] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#f87171] border border-[#1e1b2e]" />
            <span className="h-3 w-3 rounded-full bg-[#fbbf24] border border-[#1e1b2e]" />
            <span className="h-3 w-3 rounded-full bg-[#34d399] border border-[#1e1b2e]" />
            <span className="text-[11px] font-black uppercase tracking-wider font-mono ml-2 text-[#1e1b2e]">
              USER_PROFILE.EXE
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
            <span className="px-1.5 bg-[#fdfaf0] border border-[#1e1b2e] rounded">_</span>
            <span className="px-1.5 bg-[#fdfaf0] border border-[#1e1b2e] rounded">□</span>
            <span className="px-1.5 bg-[#f87171] text-white border border-[#1e1b2e] rounded">✕</span>
          </div>
        </div>

        {/* Hero Body */}
        <div className="p-6 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-4 flex justify-center">
            {basics.photoUrl ? (
              <div className="h-32 w-32 rounded-xl border-3 border-[#1e1b2e] shadow-[4px_4px_0px_#1e1b2e] overflow-hidden bg-[#fde047]">
                <img
                  src={basics.photoUrl}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-32 w-32 rounded-xl border-3 border-[#1e1b2e] shadow-[4px_4px_0px_#1e1b2e] bg-[#fde047] flex flex-col items-center justify-center text-center p-2">
                <span className="text-3xl font-black text-[#1e1b2e] font-mono">
                  {initials}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest font-mono mt-1 text-[#1e1b2e]">
                  + PHOTO
                </span>
              </div>
            )}
          </div>

          <div className="col-span-8 space-y-2">
            <div className="inline-block px-2.5 py-0.5 bg-[#fde047] border-2 border-[#1e1b2e] rounded-md text-[10px] font-black tracking-widest uppercase font-mono">
              ★ Portfolio Edition 1998
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1e1b2e] uppercase font-mono">
              {fullName}
            </h1>
            <p className="text-xs font-black uppercase tracking-widest text-[#7c3aed] font-mono">
              // {displayRole}
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono font-medium text-[#1e1b2e]">
              {basics.email && (
                <span className="px-2 py-0.5 bg-white border border-[#1e1b2e] rounded shadow-[2px_2px_0px_#1e1b2e]">
                  ✉ {basics.email}
                </span>
              )}
              {basics.phone && (
                <span className="px-2 py-0.5 bg-white border border-[#1e1b2e] rounded shadow-[2px_2px_0px_#1e1b2e]">
                  ☎ {basics.phone}
                </span>
              )}
              {basics.location && (
                <span className="px-2 py-0.5 bg-white border border-[#1e1b2e] rounded shadow-[2px_2px_0px_#1e1b2e]">
                  ⌖ {basics.location}
                </span>
              )}
              {basics.website && (
                <span className="px-2 py-0.5 bg-white border border-[#1e1b2e] rounded shadow-[2px_2px_0px_#1e1b2e]">
                  🌐 {basics.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Gauge Panel Window */}
      <div className="border-3 border-[#1e1b2e] rounded-xl bg-[#fdfaf0] shadow-[5px_5px_0px_#1e1b2e] overflow-hidden mb-6">
        <div className="bg-[#ddd6fe] border-b-3 border-[#1e1b2e] px-4 py-1.5 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider font-mono text-[#1e1b2e]">
            ● CORE_GAUGES & SKILLS.SYS
          </span>
          <span className="text-[10px] font-mono font-bold bg-[#fdfaf0] px-1 border border-[#1e1b2e] rounded">
            99.4%
          </span>
        </div>

        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(skills.length > 0
            ? skills.slice(0, 4)
            : ["Graphic Design", "Art Direction", "Public Relations", "3D Motion"]
          ).map((skill: string, index: number) => {
            const dialPercentages = [95, 88, 92, 85];
            const pct = dialPercentages[index % dialPercentages.length];
            return (
              <div
                key={index}
                className="bg-white border-2 border-[#1e1b2e] rounded-lg p-3 flex flex-col items-center text-center shadow-[3px_3px_0px_#1e1b2e]"
              >
                {/* Semi-Circular SVG Dial */}
                <div className="relative w-16 h-9 overflow-hidden mb-1">
                  <div className="w-16 h-16 rounded-full border-4 border-[#e9d5ff] border-t-[#7c3aed] border-r-[#7c3aed] transform -rotate-45" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#7c3aed]">
                  {pct}%
                </span>
                <span className="text-xs font-black uppercase text-[#1e1b2e] mt-0.5">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>

        {/* Extra Skill Badges if more than 4 */}
        {skills.length > 4 && (
          <div className="px-4 pb-4 flex flex-wrap gap-1.5">
            {skills.slice(4).map((skill: string, idx: number) => (
              <span
                key={idx}
                className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#fde047] border border-[#1e1b2e] rounded shadow-[1.5px_1.5px_0px_#1e1b2e]"
              >
                #{skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Two Column Layout: Experience & Education */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Profile & Experience Window */}
        <div className="col-span-7 space-y-6">
          {basics.summary && (
            <div className="border-3 border-[#1e1b2e] rounded-xl bg-[#fdfaf0] shadow-[5px_5px_0px_#1e1b2e] overflow-hidden">
              <div className="bg-[#fde047] border-b-3 border-[#1e1b2e] px-4 py-1.5 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider font-mono text-[#1e1b2e]">
                  ● PROFILE_STATEMENT.TXT
                </span>
              </div>
              <div className="p-4 text-xs font-mono leading-relaxed text-[#374151]">
                {basics.summary}
              </div>
            </div>
          )}

          <div className="border-3 border-[#1e1b2e] rounded-xl bg-[#fdfaf0] shadow-[5px_5px_0px_#1e1b2e] overflow-hidden">
            <div className="bg-[#a78bfa] border-b-3 border-[#1e1b2e] px-4 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider font-mono text-[#1e1b2e]">
                ● WORK_HISTORY_DATABASE.LOG
              </span>
            </div>
            <div className="p-5 space-y-5">
              {experience.map((job: any, i: number) => (
                <div
                  key={job.id || i}
                  className="bg-white border-2 border-[#1e1b2e] rounded-lg p-4 shadow-[3px_3px_0px_#1e1b2e] space-y-2"
                >
                  <div className="flex justify-between items-baseline border-b-2 border-dashed border-[#1e1b2e]/30 pb-1.5">
                    <h3 className="text-xs font-black uppercase font-mono text-[#1e1b2e]">
                      {job.role || job.title || "Senior Designer"}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#ddd6fe] border border-[#1e1b2e] rounded">
                      {job.startDate || "2022"} – {job.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#7c3aed] font-mono">
                    @{job.company || "Creative Studio Inc."}
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside text-[#374151] pt-1">
                    {(
                      job.achievements ||
                      job.bullets || [
                        "Designed comprehensive digital campaigns and identity suites.",
                        "Collaborated with developers and project managers on creative delivery.",
                      ]
                    ).map((bullet: string, idx: number) => (
                      <li key={idx} className="leading-tight">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Education, Certifications & Languages */}
        <div className="col-span-5 space-y-6">
          {education.length > 0 && (
            <div className="border-3 border-[#1e1b2e] rounded-xl bg-[#fdfaf0] shadow-[5px_5px_0px_#1e1b2e] overflow-hidden">
              <div className="bg-[#6ee7b7] border-b-3 border-[#1e1b2e] px-4 py-1.5 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider font-mono text-[#1e1b2e]">
                  ● ACADEMIC_RECORDS.DAT
                </span>
              </div>
              <div className="p-4 space-y-3">
                {education.map((edu: any, index: number) => (
                  <div
                    key={edu.id || index}
                    className="bg-white border-2 border-[#1e1b2e] rounded-lg p-3 shadow-[2.5px_2.5px_0px_#1e1b2e]"
                  >
                    <div className="font-black text-xs font-mono uppercase text-[#1e1b2e]">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-[#4b5563] font-mono mt-0.5">
                      {edu.institution}
                    </div>
                    <div className="text-[10px] font-mono text-[#7c3aed] font-bold mt-1">
                      {edu.year || edu.gradYear}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="border-3 border-[#1e1b2e] rounded-xl bg-[#fdfaf0] shadow-[5px_5px_0px_#1e1b2e] overflow-hidden">
              <div className="bg-[#fde047] border-b-3 border-[#1e1b2e] px-4 py-1.5 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider font-mono text-[#1e1b2e]">
                  ● CERTIFICATES_&_HONORS
                </span>
              </div>
              <div className="p-4 space-y-2">
                {certifications.map((cert: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-[#1e1b2e] rounded-lg p-2 text-xs font-mono font-bold shadow-[2px_2px_0px_#1e1b2e]"
                  >
                    ★ {typeof cert === "string" ? cert : cert?.title || cert?.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="border-3 border-[#1e1b2e] rounded-xl bg-[#fdfaf0] shadow-[5px_5px_0px_#1e1b2e] overflow-hidden">
              <div className="bg-[#fbcfe8] border-b-3 border-[#1e1b2e] px-4 py-1.5 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider font-mono text-[#1e1b2e]">
                  ● LOCALE_LANGUAGES
                </span>
              </div>
              <div className="p-4 space-y-2 text-xs font-mono">
                {languages.map((l: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white border border-[#1e1b2e] p-2 rounded"
                  >
                    <span className="font-bold">
                      {typeof l === "string" ? l : l.language || l.name}
                    </span>
                    <span className="text-[10px] px-1.5 bg-[#ddd6fe] border border-[#1e1b2e] rounded">
                      {l.fluency || l.level || "Fluent"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
