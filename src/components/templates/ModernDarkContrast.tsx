"use client";

import React from "react";
import type { TemplateProps } from "./types";

export function ModernDarkContrast({ data, paginated }: TemplateProps) {
  const basics = data?.basics || ({} as any);
  const experience = data?.experience || [];
  const education = data?.education || [];
  const rawSkills: any[] = (data?.skills as any[]) || [];
  const skills: string[] = rawSkills.map((s: any) =>
    typeof s === "string" ? s : s?.name || ""
  ).filter(Boolean);
  const certifications = (data as any)?.certifications || [];
  const languages = (data as any)?.languages || [];

  const displayRole = basics.role?.trim() || "Chief Technology Officer / VP Eng";
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
      className="w-full bg-[var(--almi-bg,#ffffff)] text-[var(--almi-text,#0f172a)] font-sans grid grid-cols-12 shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      <div className="col-span-4 bg-[#1e293b] text-slate-100 p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center">
            {basics.photoUrl ? (
              <img
                src={basics.photoUrl}
                alt={fullName}
                className="h-28 w-28 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg"
              />
            ) : (
              <div className="h-28 w-28 rounded-2xl border-2 border-dashed border-emerald-400/60 bg-slate-800 flex flex-col items-center justify-center p-2 shadow-inner">
                <span className="text-2xl font-black text-emerald-400">
                  {initials}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">
                  + Photo
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-700/70 text-xs text-slate-300">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Contact
            </div>
            {basics.email && <div className="break-all">✉️ {basics.email}</div>}
            {basics.phone && <div>📞 {basics.phone}</div>}
            {basics.location && <div>📍 {basics.location}</div>}
            {basics.website && <div>🌐 {basics.website}</div>}
            {basics.linkedin && <div>🔗 {basics.linkedin}</div>}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-700/70">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Expertise
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(skills.length > 0
                ? skills
                : ["Cloud Architecture", "Distributed Systems", "Team Leadership", "Strategic Planning", "DevSecOps"]
              ).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {education.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-700/70 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                Education
              </div>
              {education.map((edu: any, index: number) => (
                <div key={edu.id || index} className="space-y-0.5">
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-slate-400 text-[11px]">{edu.institution}</div>
                  <div className="text-slate-500 text-[10px]">{edu.year || edu.gradYear}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {languages.length > 0 && (
          <div className="pt-4 border-t border-slate-700/70 text-xs text-slate-300">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">
              Languages
            </div>
            {languages.map((l: any, i: number) => (
              <div key={i} className="flex justify-between text-[11px]">
                <span>{typeof l === "string" ? l : l.language || l.name}</span>
                <span className="text-slate-400">{l.fluency || l.level || "Fluent"}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="col-span-8 p-8 space-y-6">
        <div className="border-b-2 border-slate-900 pb-4">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            {fullName}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mt-1">
            {displayRole}
          </p>
        </div>

        {basics.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
              <span className="h-2 w-2 bg-emerald-500 rounded-sm" /> Executive Profile
            </h2>
            <p className="text-xs leading-relaxed text-slate-700">{basics.summary}</p>
          </section>
        )}

        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
            <span className="h-2 w-2 bg-emerald-500 rounded-sm" /> Leadership & Career History
          </h2>
          <div className="space-y-4">
            {experience.map((job: any, i: number) => (
              <div key={job.id || i} className="border-l-2 border-slate-200 pl-3.5 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-slate-900">
                    {job.role || job.title || "Executive Role"}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {job.startDate || "2021"} – {job.endDate || "Present"}
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-700">
                  {job.company || "Enterprise Solutions"}
                </div>
                <ul className="text-xs space-y-1 list-disc list-inside text-slate-600 pt-1">
                  {(
                    job.achievements ||
                    job.bullets || [
                      "Orchestrated global engineering transformation impacting 100+ engineers.",
                      "Improved release frequency by 4x while maintaining 99.99% system availability.",
                    ]
                  ).map((bullet: string, idx: number) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 bg-emerald-500 rounded-sm" /> Credentials & Governance
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {certifications.map((cert: any, index: number) => (
                <div
                  key={index}
                  className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-800"
                >
                  🛡️ {typeof cert === "string" ? cert : cert?.title || cert?.name}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
