"use client";

import React from "react";
import type { CVData } from "@/lib/cv-types";

export function NurseICUPro({
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

  const displayRole = basics.role?.trim() || "Critical Care Registered Nurse (ICU / ER)";
  const fullName = basics.fullName?.trim() || "Your Name";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((w: string) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "RN";

  return (
    <div
      className="w-full bg-[var(--almi-bg,#ffffff)] text-[var(--almi-text,#0f172a)] font-sans transition-colors duration-150 p-8 shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      {/* Top Clinical Header */}
      <div className="border-b-2 border-[var(--almi-primary,#0ea5e9)] pb-6 mb-6">
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--almi-primary,#0ea5e9)]/10 text-[var(--almi-primary,#0ea5e9)] text-[11px] font-bold tracking-wide uppercase">
              <span className="h-2 w-2 rounded-full bg-[var(--almi-primary,#0ea5e9)] animate-pulse" />
              <span>Licensed Healthcare Professional</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight">
              {fullName}
            </h1>
            <p className="text-sm font-semibold tracking-wide text-[var(--almi-primary,#0ea5e9)]">
              {displayRole}
            </p>

            {/* Contact Strip */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs opacity-80">
              {basics.email && <span>✉️ {basics.email}</span>}
              {basics.phone && <span>📞 {basics.phone}</span>}
              {basics.location && <span>📍 {basics.location}</span>}
              {basics.website && <span>🌐 {basics.website}</span>}
            </div>
          </div>

          {/* Photo / Monogram Badge */}
          <div className="shrink-0">
            {basics.photoUrl ? (
              <img
                src={basics.photoUrl}
                alt={fullName}
                className="h-24 w-24 rounded-full object-cover border-2 border-[var(--almi-primary,#0ea5e9)] shadow-md"
              />
            ) : (
              <div className="h-24 w-24 rounded-full border-2 border-dashed border-[var(--almi-primary,#0ea5e9)]/60 bg-[var(--almi-primary,#0ea5e9)]/10 flex flex-col items-center justify-center text-center p-2">
                <span className="text-lg font-bold text-[var(--almi-primary,#0ea5e9)]">{initials}</span>
                <span className="text-[9px] uppercase tracking-tighter opacity-70 mt-0.5">+ Photo</span>
              </div>
            )}
          </div>
        </div>

        {/* ECG Rhythm Waveform Visual Accent */}
        <div className="mt-4 flex items-center gap-2 opacity-30 text-[var(--almi-primary,#0ea5e9)]">
          <svg className="w-full h-3" viewBox="0 0 500 20" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M0 10 L150 10 L160 2 L170 18 L180 5 L190 15 L200 10 L500 10" />
          </svg>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-7">
        {/* Left Column (8-Col): Clinical Profile & Clinical Experience */}
        <div className="col-span-8 space-y-6">
          {basics.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#0ea5e9)] mb-2 border-b border-[var(--almi-primary,#0ea5e9)]/20 pb-1">
                Clinical Profile
              </h2>
              <p className="text-xs leading-relaxed opacity-90">{basics.summary}</p>
            </section>
          )}

          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#0ea5e9)] mb-3 border-b border-[var(--almi-primary,#0ea5e9)]/20 pb-1">
              Clinical & Hospital Experience
            </h2>
            <div className="space-y-5">
              {experience.map((job: any, i: number) => (
                <div key={job.id || i} className="border-l-2 border-[var(--almi-primary,#0ea5e9)]/40 pl-3.5 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">{job.role || job.title || "Staff RN"}</h3>
                    <span className="text-[10px] opacity-70 font-mono">
                      {job.startDate || "2022"} – {job.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[var(--almi-primary,#0ea5e9)]">
                    {job.company || "University Medical Center"}
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside opacity-85 pt-1">
                    {(job.achievements || job.bullets || [
                      "Managed critical patient care workflows with 100% adherence to patient safety protocols.",
                      "Administered IV medications, continuous titrations, and monitored life support systems."
                    ]).map((bullet: string, idx: number) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (4-Col): Licenses, Competencies & Education */}
        <div className="col-span-4 space-y-5">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#0ea5e9)] mb-2 border-b border-[var(--almi-primary,#0ea5e9)]/20 pb-1">
              Licenses & Certs
            </h2>
            <div className="space-y-1.5 text-xs">
              {(certifications.length > 0 ? certifications : [
                "Registered Nurse (RN) License",
                "Basic Life Support (BLS - AHA)",
                "Advanced Cardiac Life Support (ACLS)"
              ]).map((cert: any, index: number) => (
                <div
                  key={index}
                  className="p-2 rounded bg-[var(--almi-primary,#0ea5e9)]/5 border border-[var(--almi-primary,#0ea5e9)]/20 font-medium"
                >
                  ✓ {typeof cert === "string" ? cert : cert?.title || cert?.name}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#0ea5e9)] mb-2 border-b border-[var(--almi-primary,#0ea5e9)]/20 pb-1">
              Clinical Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {(skills.length > 0 ? skills : [
                "Critical Care", "Ventilator Mgmt", "Patient Triage", "IV Infusion", "Electronic Health Records", "Cardiac Monitoring"
              ]).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--almi-primary,#0ea5e9)]/10 text-[var(--almi-text,#0f172a)] font-medium border border-[var(--almi-primary,#0ea5e9)]/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#0ea5e9)] mb-2 border-b border-[var(--almi-primary,#0ea5e9)]/20 pb-1">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {education.map((edu: any, index: number) => (
                  <div key={edu.id || index}>
                    <div className="font-bold">{edu.degree || "Bachelor of Science in Nursing (BSN)"}</div>
                    <div className="opacity-75">{edu.institution || "College of Nursing"}</div>
                    <div className="text-[10px] opacity-60 font-mono">{edu.year || edu.gradYear || "2020"}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#0ea5e9)] mb-2 border-b border-[var(--almi-primary,#0ea5e9)]/20 pb-1">
                Languages
              </h2>
              <div className="space-y-1 text-xs opacity-85">
                {languages.map((lang: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{typeof lang === "string" ? lang : lang.language || lang.name}</span>
                    <span className="opacity-60">{lang.fluency || lang.level || "Fluent"}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
