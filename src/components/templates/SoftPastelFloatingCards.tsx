"use client";

import React from "react";
import type { CVData } from "@/lib/cv-types";

export function SoftPastelFloatingCards({
  data,
  paginated,
}: {
  data: CVData;
  paginated?: boolean;
}) {
  const basics: any = (data as any)?.basics || {};
  const experience: any[] = (data as any)?.experience || [];
  const education: any[] = (data as any)?.education || [];
  const skills: string[] = Array.isArray((data as any)?.skills)
    ? (data as any).skills.map((s: any) => (typeof s === "string" ? s : s?.name || ""))
    : [];
  const certifications: any[] = (data as any)?.certifications || [];
  const languages: any[] = (data as any)?.languages || [];

  const displayRole = basics.role?.trim() || "People & Operations Partner";
  const fullName = basics.fullName?.trim() || "Your Name";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((w: string) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "YN";

  return (
    <div
      className="w-full bg-[#f1f5f9] text-[#1e293b] font-sans p-6 space-y-4 shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      {/* Floating Card: Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex items-center justify-between gap-5">
        <div className="space-y-1 flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold tracking-wide">
            ✦ Human Resources & People Lead
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {fullName}
          </h1>
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider">
            {displayRole}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500">
            {basics.email && <span>✉️ {basics.email}</span>}
            {basics.phone && <span>📞 {basics.phone}</span>}
            {basics.location && <span>📍 {basics.location}</span>}
          </div>
        </div>

        {/* Photo Slot */}
        <div className="shrink-0">
          {basics.photoUrl ? (
            <img
              src={basics.photoUrl}
              alt={fullName}
              className="h-22 w-22 rounded-2xl object-cover border-2 border-violet-400 shadow-md"
            />
          ) : (
            <div className="h-22 w-22 rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 flex flex-col items-center justify-center text-center p-2">
              <span className="text-xl font-bold text-violet-600">{initials}</span>
              <span className="text-[8px] uppercase tracking-tight text-violet-400 mt-0.5">+ Photo</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Card: Summary & Skills Split */}
      <div className="grid grid-cols-12 gap-4">
        {basics.summary && (
          <div className="col-span-7 bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2 flex items-center gap-1">
              ✦ Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-600">{basics.summary}</p>
          </div>
        )}

        <div className={`${basics.summary ? "col-span-5" : "col-span-12"} bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80`}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2 flex items-center gap-1">
            ✦ Core Competencies
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {(skills.length > 0 ? skills : ["Talent Strategy", "Employee Relations", "Culture", "Retention", "Onboarding", "Conflict Resolution"]).map(
              (skill: string, index: number) => (
                <span
                  key={index}
                  className="text-[11px] px-2.5 py-1 rounded-xl bg-violet-50 text-violet-700 font-medium border border-violet-100"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Floating Card: Experience */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 flex items-center gap-1">
          ✦ Career Journey & Experience
        </h2>
        <div className="space-y-4">
          {experience.map((job: any, i: number) => (
            <div key={job.id || i} className="border-l-2 border-violet-200 pl-3.5 space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-slate-900">{job.role || job.title || "Senior Partner"}</h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {job.startDate || "2022"} – {job.endDate || "Present"}
                </span>
              </div>
              <div className="text-xs font-semibold text-violet-600">
                {job.company || "Global Enterprises"}
              </div>
              <ul className="text-xs space-y-1 list-disc list-inside text-slate-600 pt-1">
                {(job.achievements || job.bullets || [
                  "Spearheaded remote culture transformation increasing employee retention by 28%.",
                  "Managed end-to-end recruitment cycle for 80+ strategic positions globally."
                ]).map((bullet: string, idx: number) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Card: Bottom Split (Education & Certifications) */}
      <div className="grid grid-cols-2 gap-4">
        {education.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2 flex items-center gap-1">
              ✦ Education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu: any, index: number) => (
                <div key={edu.id || index}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-500">{edu.institution}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{edu.year || edu.gradYear}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2 flex items-center gap-1">
              ✦ Certifications
            </h2>
            <div className="space-y-1.5 text-xs">
              {certifications.map((cert: any, index: number) => (
                <div
                  key={index}
                  className="p-2 rounded-xl bg-violet-50 text-violet-800 text-[11px] font-medium"
                >
                  ✓ {typeof cert === "string" ? cert : cert?.title || cert?.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
