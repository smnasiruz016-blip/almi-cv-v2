"use client";

import React from "react";
import type { TemplateProps } from "./types";

export function WarmCreativeMagazine({ data, paginated }: TemplateProps) {
  const basics = data?.basics || ({} as any);
  const experience = data?.experience || [];
  const education = data?.education || [];
  const rawSkills: any[] = (data?.skills as any[]) || [];
  const skills: string[] = rawSkills.map((s: any) =>
    typeof s === "string" ? s : s?.name || ""
  ).filter(Boolean);
  const certifications = (data as any)?.certifications || [];
  const languages = (data as any)?.languages || [];

  const displayRole = basics.role?.trim() || "Creative Director & Visual Stylist";
  const fullName = basics.fullName?.trim() || "Your Name";

  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .map((w: string) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "YN";

  return (
    <div
      className="w-full bg-[#fdfbf7] text-[#292524] font-serif transition-colors duration-150 grid grid-cols-12 shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      <div className="col-span-8 p-8 space-y-6">
        <div className="border-b border-[#78350f]/30 pb-5">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9a3412] font-sans font-bold">
            Curated Portfolio
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#431407] mt-1">
            {fullName}
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#9a3412] font-sans font-semibold mt-1">
            {displayRole}
          </p>
        </div>

        {basics.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9a3412] font-sans mb-1.5">
              // Editorial Statement
            </h2>
            <p className="text-xs leading-relaxed text-[#44403c] text-justify font-sans">
              {basics.summary}
            </p>
          </section>
        )}

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#9a3412] font-sans mb-3">
            // Selected Client Work & Experience
          </h2>
          <div className="space-y-4 font-sans">
            {experience.map((job: any, i: number) => (
              <div key={job.id || i} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold font-serif text-[#431407]">
                    {job.role || job.title || "Senior Lead"}
                  </h3>
                  <span className="text-[10px] text-[#78716c]">
                    {job.startDate || "2022"} – {job.endDate || "Present"}
                  </span>
                </div>
                <div className="text-xs font-medium text-[#9a3412]">
                  {job.company || "Studio Collective"}
                </div>
                <ul className="text-xs space-y-1 list-disc list-inside text-[#57534e] pt-1">
                  {(
                    job.achievements ||
                    job.bullets || [
                      "Directed 40+ brand identity packages with award-winning visual executions.",
                      "Collaborated with international fashion and lifestyle publications.",
                    ]
                  ).map((bullet: string, idx: number) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {education.length > 0 && (
          <section className="pt-2 border-t border-[#78350f]/20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9a3412] font-sans mb-2">
              // Academic Background
            </h2>
            <div className="space-y-2 text-xs font-sans">
              {education.map((edu: any, index: number) => (
                <div key={edu.id || index}>
                  <div className="font-bold text-[#431407] font-serif">
                    {edu.degree}
                  </div>
                  <div className="text-[#78716c]">{edu.institution}</div>
                  <div className="text-[10px] text-[#a8a29e]">
                    {edu.year || edu.gradYear}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="col-span-4 bg-[#7c2d12] text-[#ffedd5] p-6 space-y-6 font-sans flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            {basics.photoUrl ? (
              <img
                src={basics.photoUrl}
                alt={fullName}
                className="h-28 w-28 rounded-full object-cover border-2 border-[#fdba74] shadow-md"
              />
            ) : (
              <div className="h-28 w-28 rounded-full border-2 border-dashed border-[#fdba74]/60 bg-[#9a3412] flex flex-col items-center justify-center p-2">
                <span className="text-2xl font-black text-[#fdba74] font-serif">
                  {initials}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#fed7aa] mt-1">
                  + Photo
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#9a3412] text-xs">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#fdba74]">
              Contact
            </div>
            {basics.email && <div className="break-all">✉️ {basics.email}</div>}
            {basics.phone && <div>📞 {basics.phone}</div>}
            {basics.location && <div>📍 {basics.location}</div>}
            {basics.website && <div>🌐 {basics.website}</div>}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#9a3412]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#fdba74]">
              Skills & Tools
            </div>
            <div className="space-y-1.5 text-xs">
              {(skills.length > 0
                ? skills
                : ["Art Direction", "Typography", "Editorial Layout", "Color Theory", "Photography"]
              ).map((skill: string, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-[11px]"
                >
                  <span>{skill}</span>
                  <span className="text-[#fdba74] text-[9px]">⬤⬤⬤⬤◯</span>
                </div>
              ))}
            </div>
          </div>

          {certifications.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#9a3412] text-xs">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#fdba74]">
                Awards & Honors
              </div>
              {certifications.map((cert: any, index: number) => (
                <div key={index} className="text-[11px] text-[#fed7aa]">
                  ★ {typeof cert === "string" ? cert : cert?.title || cert?.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {languages.length > 0 && (
          <div className="pt-2 border-t border-[#9a3412] text-xs">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#fdba74] mb-1">
              Languages
            </div>
            {languages.map((l: any, i: number) => (
              <div key={i} className="flex justify-between text-[11px]">
                <span>{typeof l === "string" ? l : l.language || l.name}</span>
                <span className="text-[#fed7aa]">
                  {l.fluency || l.level || "Fluent"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
