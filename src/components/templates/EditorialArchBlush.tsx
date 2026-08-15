"use client";

import React from "react";
import type { CVData } from "@/lib/cv-types";

export function EditorialArchBlush({
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

  const displayRole = basics.role?.trim() || "Brand & Creative Strategist";
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
      className="w-full bg-[var(--almi-bg,#faf8f5)] text-[var(--almi-text,#1e293b)] font-sans transition-colors duration-150 p-8 shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      {/* Top Header with Arch Photo Frame */}
      <div className="flex items-center gap-6 pb-6 border-b border-[var(--almi-primary,#d97706)]/25 mb-6">
        {/* Canva-Style Arch Photo */}
        <div className="shrink-0">
          {basics.photoUrl ? (
            <div className="h-28 w-24 rounded-t-full rounded-b-xl overflow-hidden border-2 border-[var(--almi-primary,#d97706)] shadow-md">
              <img
                src={basics.photoUrl}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-28 w-24 rounded-t-full rounded-b-xl border-2 border-dashed border-[var(--almi-primary,#d97706)]/60 bg-[var(--almi-primary,#d97706)]/10 flex flex-col items-center justify-center text-center p-2 shadow-inner">
              <span className="text-xl font-serif font-bold text-[var(--almi-primary,#d97706)]">{initials}</span>
              <span className="text-[9px] uppercase tracking-tighter opacity-70 mt-1">+ Photo</span>
            </div>
          )}
        </div>

        {/* Title & Social Header */}
        <div className="flex-1 space-y-1.5">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--almi-primary,#d97706)] font-bold">
            Curated Resume
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-[var(--almi-text,#1e293b)]">
            {fullName}
          </h1>
          <p className="text-xs uppercase tracking-widest text-[var(--almi-primary,#d97706)] font-medium">
            {displayRole}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs opacity-80 border-t border-slate-200/60">
            {basics.email && <span>✉️ {basics.email}</span>}
            {basics.phone && <span>📞 {basics.phone}</span>}
            {basics.location && <span>📍 {basics.location}</span>}
            {basics.website && <span>🌐 {basics.website}</span>}
          </div>
        </div>
      </div>

      {/* 2-Column Asymmetric Layout */}
      <div className="grid grid-cols-12 gap-7">
        {/* Left Column (4-Col): Summary & Skills */}
        <div className="col-span-4 space-y-6 border-r border-[var(--almi-primary,#d97706)]/15 pr-5">
          {basics.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#d97706)] mb-2 font-serif">
                About Me
              </h2>
              <p className="text-xs leading-relaxed opacity-90">{basics.summary}</p>
            </section>
          )}

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#d97706)] mb-2 font-serif">
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {(skills.length > 0 ? skills : ["Brand Strategy", "Visual Design", "Copywriting", "Art Direction", "Campaigns"]).map(
                (skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--almi-primary,#d97706)]/10 text-[var(--almi-text,#1e293b)] border border-[var(--almi-primary,#d97706)]/20"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </section>

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#d97706)] mb-2 font-serif">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {education.map((edu: any, index: number) => (
                  <div key={edu.id || index}>
                    <div className="font-bold font-serif">{edu.degree || "Bachelor of Arts"}</div>
                    <div className="opacity-75">{edu.institution}</div>
                    <div className="text-[10px] opacity-60">{edu.year || edu.gradYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#d97706)] mb-2 font-serif">
                Languages
              </h2>
              <div className="space-y-1 text-xs opacity-85">
                {languages.map((l: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{typeof l === "string" ? l : l.language || l.name}</span>
                    <span className="opacity-60">{l.fluency || l.level || "Fluent"}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (8-Col): Experience & Achievements */}
        <div className="col-span-8 space-y-6">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#d97706)] mb-3 font-serif">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {experience.map((job: any, i: number) => (
                <div key={job.id || i} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold font-serif">{job.role || job.title || "Senior Lead"}</h3>
                    <span className="text-[10px] opacity-70">
                      {job.startDate || "2022"} – {job.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[var(--almi-primary,#d97706)]">
                    {job.company || "Creative Studio"}
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside opacity-85 pt-1">
                    {(job.achievements || job.bullets || [
                      "Led cross-functional creative development producing 35% higher campaign conversions.",
                      "Spearheaded multi-channel brand launch across digital and retail touchpoints."
                    ]).map((bullet: string, idx: number) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--almi-primary,#d97706)] mb-2 font-serif">
                Accolades & Certs
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {certifications.map((cert: any, index: number) => (
                  <div
                    key={index}
                    className="p-2 rounded-lg bg-[var(--almi-primary,#d97706)]/5 border border-[var(--almi-primary,#d97706)]/15"
                  >
                    ★ {typeof cert === "string" ? cert : cert?.title || cert?.name}
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
