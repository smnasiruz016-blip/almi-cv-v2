"use client";

import React from "react";
import type { CVData } from "@/lib/cv-types";

export function LegalPartnerLuxe({
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

  const displayRole = basics.role?.trim() || "Partner • Corporate & Commercial Litigation";
  const fullName = basics.fullName?.trim() || "Your Full Name";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((w: string) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "LP";

  return (
    <div
      className="w-full bg-[var(--almi-bg,#ffffff)] text-[var(--almi-text,#0f172a)] font-serif transition-colors duration-150 p-9 shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      {/* Classical Chambers Header */}
      <div className="border-b border-t border-[var(--almi-primary,#7f1d1d)] py-5 mb-7 text-center relative">
        <div className="flex items-center justify-between gap-6">
          <div className="text-left space-y-1 flex-1">
            <span className="text-[10px] uppercase tracking-widest text-[var(--almi-primary,#7f1d1d)] font-sans font-bold">
              Attorney at Law • Chambers Profile
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight font-serif text-[var(--almi-text,#0f172a)]">
              {fullName}
            </h1>
            <p className="text-xs uppercase tracking-widest text-[var(--almi-primary,#7f1d1d)] font-sans font-semibold">
              {displayRole}
            </p>
          </div>

          {/* Photo Slot */}
          <div className="shrink-0">
            {basics.photoUrl ? (
              <img
                src={basics.photoUrl}
                alt={fullName}
                className="h-20 w-20 rounded-md object-cover border border-[var(--almi-primary,#7f1d1d)] shadow-sm"
              />
            ) : (
              <div className="h-20 w-20 rounded-md border border-dashed border-[var(--almi-primary,#7f1d1d)]/50 bg-[var(--almi-primary,#7f1d1d)]/5 flex flex-col items-center justify-center text-center p-2">
                <span className="text-base font-bold text-[var(--almi-primary,#7f1d1d)] font-serif">{initials}</span>
                <span className="text-[8px] uppercase tracking-wider opacity-60 font-sans">+ Photo</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-4 pt-3 border-t border-[var(--almi-primary,#7f1d1d)]/15 flex justify-center flex-wrap gap-5 text-xs opacity-80 font-sans">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>• {basics.phone}</span>}
          {basics.location && <span>• {basics.location}</span>}
          {basics.linkedin && <span>• {basics.linkedin}</span>}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="space-y-6">
        {basics.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#7f1d1d)] font-sans border-b border-[var(--almi-primary,#7f1d1d)]/30 pb-1 mb-2">
              Executive Summary & Counsel Scope
            </h2>
            <p className="text-xs leading-relaxed opacity-90 text-justify">{basics.summary}</p>
          </section>
        )}

        {/* Legal Experience */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#7f1d1d)] font-sans border-b border-[var(--almi-primary,#7f1d1d)]/30 pb-1 mb-3">
            Legal Practice & Notable Matters
          </h2>
          <div className="space-y-5">
            {experience.map((job: any, i: number) => (
              <div key={job.id || i} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold font-serif">{job.role || job.title || "Senior Associate"}</h3>
                  <span className="text-[11px] opacity-70 font-sans">
                    {job.startDate || "2021"} – {job.endDate || "Present"}
                  </span>
                </div>
                <div className="text-xs font-medium text-[var(--almi-primary,#7f1d1d)] font-sans">
                  {job.company || "Premier Legal Associates LLP"}
                </div>
                <ul className="text-xs space-y-1 list-disc list-inside opacity-85 pt-1">
                  {(job.achievements || job.bullets || [
                    "Represented Fortune 500 corporate clients in multi-jurisdictional commercial disputes.",
                    "Drafted and negotiated high-value M&A contracts exceeding $50M in enterprise valuation."
                  ]).map((bullet: string, idx: number) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 2-Column Split: Admissions & Academic Qualifications */}
        <div className="grid grid-cols-2 gap-6 pt-2 border-t border-[var(--almi-primary,#7f1d1d)]/15">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#7f1d1d)] font-sans border-b border-[var(--almi-primary,#7f1d1d)]/30 pb-1 mb-2">
              Bar Admissions & Certifications
            </h2>
            <div className="space-y-1 text-xs opacity-90 font-sans">
              {(certifications.length > 0 ? certifications : [
                "State Bar Association (Active Standing)",
                "Certified International Commercial Arbitrator"
              ]).map((cert: any, index: number) => (
                <div key={index}>§ {typeof cert === "string" ? cert : cert?.title || cert?.name}</div>
              ))}
            </div>

            {skills.length > 0 && (
              <div className="mt-3">
                <div className="text-[11px] font-bold text-[var(--almi-primary,#7f1d1d)] font-sans uppercase mb-1">Practice Areas</div>
                <div className="flex flex-wrap gap-1 text-[11px] opacity-85 font-sans">
                  {skills.join(" • ")}
                </div>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#7f1d1d)] font-sans border-b border-[var(--almi-primary,#7f1d1d)]/30 pb-1 mb-2">
              Education & Honors
            </h2>
            <div className="space-y-2 text-xs font-sans">
              {(education.length > 0 ? education : [
                { degree: "Juris Doctor (J.D.), Magna Cum Laude", institution: "Law School", year: "2018" }
              ]).map((edu: any, index: number) => (
                <div key={edu.id || index}>
                  <div className="font-bold font-serif">{edu.degree}</div>
                  <div className="opacity-75">{edu.institution}</div>
                  <div className="text-[10px] opacity-60 font-mono">{edu.year || edu.gradYear}</div>
                </div>
              ))}
            </div>

            {languages.length > 0 && (
              <div className="mt-3">
                <div className="text-[11px] font-bold text-[var(--almi-primary,#7f1d1d)] font-sans uppercase mb-1">Languages</div>
                <div className="text-xs opacity-85 font-sans">
                  {languages.map((l: any) => (typeof l === "string" ? l : l.language || l.name)).join(", ")}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
