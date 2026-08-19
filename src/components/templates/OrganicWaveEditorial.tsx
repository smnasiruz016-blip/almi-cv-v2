"use client";

import React from "react";
import type { TemplateProps } from "./types";

export function OrganicWaveEditorial({ data, paginated }: TemplateProps) {
  const basics: any = data?.basics || {};
  const experience: any[] = (data?.experience as any[]) || [];
  const education: any[] = (data?.education as any[]) || [];
  const rawSkills: any[] = (data?.skills as any[]) || [];
  const skills: string[] = rawSkills
    .map((s: any) => (typeof s === "string" ? s : s?.name || ""))
    .filter(Boolean);
  const certifications: any[] = (data as any)?.certifications || [];
  const languages: any[] = (data as any)?.languages || [];

  // Dynamic Section Labels with English Fallbacks
  const labels: any = (data as any)?.labels || {};
  const lblExperience = labels.experience || labels.workExperience || "Professional Experience";
  const lblSkills = labels.skills || labels.competencies || "Core Skills";
  const lblEducation = labels.education || "Education";
  const lblContact = labels.contact || "Contact";
  const lblCertifications = labels.certifications || "Certifications & Honors";
  const lblLanguages = labels.languages || "Languages";

  const displayRole = basics.role?.trim() || "Creative Director & Project Lead";
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
      className="w-full bg-[#fcf9f9] text-[#1f2937] font-sans relative overflow-hidden shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      {/* Top Asymmetrical Fluid Header Ribbon */}
      <div className="relative bg-gradient-to-r from-[#f7d6d9] via-[#fce7e9] to-[#f5c6cb] pt-8 pb-14 px-8">
        <div className="flex items-center gap-7 relative z-10">
          {/* Circular Photo with Soft Drop Shadow & Rose Ring */}
          <div className="shrink-0">
            {basics.photoUrl ? (
              <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={basics.photoUrl}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-28 w-28 rounded-full border-4 border-white bg-[#991b1b] flex flex-col items-center justify-center text-white shadow-xl">
                <span className="text-2xl font-black">{initials}</span>
                <span className="text-[9px] uppercase tracking-wider opacity-80 mt-0.5">
                  + Photo
                </span>
              </div>
            )}
          </div>

          {/* Name & Title Header */}
          <div className="flex-1 space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#991b1b]">
              {fullName}
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b91c1c]">
              {displayRole}
            </p>
          </div>
        </div>

        {/* Dynamic Curved Wave Separator */}
        <div className="absolute -bottom-1 left-0 right-0 h-8 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="h-full w-full fill-[#fcf9f9]"
          >
            <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" />
          </svg>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-8 pt-4 grid grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Summary, Skills Pills & Info */}
        <div className="col-span-5 space-y-6">
          {basics.summary && (
            <section className="space-y-1.5">
              <p className="text-xs leading-relaxed text-[#4b5563] text-justify font-serif italic">
                "{basics.summary}"
              </p>
            </section>
          )}

          {/* Skills Section */}
          <section className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#991b1b] border-b-2 border-[#991b1b]/20 pb-1">
              {lblSkills}
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(skills.length > 0
                ? skills
                : ["Art Direction", "UI/UX Design", "Brand Identity", "Motion", "Typography"]
              ).map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    idx % 2 === 0
                      ? "bg-[#991b1b] text-white"
                      : "bg-white text-[#991b1b] border border-[#991b1b]/40 shadow-xs"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education Section */}
          {education.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#991b1b] border-b-2 border-[#991b1b]/20 pb-1">
                {lblEducation}
              </h2>
              <div className="space-y-2 text-xs">
                {education.map((edu: any, index: number) => (
                  <div key={edu.id || index} className="space-y-0.5">
                    <div className="font-bold text-[#1f2937]">{edu.degree}</div>
                    <div className="text-[11px] text-[#6b7280]">{edu.institution}</div>
                    <div className="text-[10px] font-mono text-[#991b1b]">
                      {edu.year || edu.gradYear}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#991b1b] border-b-2 border-[#991b1b]/20 pb-1">
                {lblLanguages}
              </h2>
              <div className="space-y-1 text-xs text-[#4b5563]">
                {languages.map((l: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>{typeof l === "string" ? l : l.language || l.name}</span>
                    <span className="text-[#991b1b] font-medium">
                      {l.fluency || l.level || "Fluent"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact Details */}
          <section className="space-y-1.5 pt-2 border-t border-slate-200 text-xs text-[#4b5563]">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#991b1b] mb-1.5">
              {lblContact}
            </h2>
            {basics.email && <div>✉️ {basics.email}</div>}
            {basics.phone && <div>📞 {basics.phone}</div>}
            {basics.location && <div>📍 {basics.location}</div>}
            {basics.website && <div>🌐 {basics.website}</div>}
            {basics.linkedin && <div>🔗 {basics.linkedin}</div>}
          </section>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="col-span-7 space-y-6">
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#991b1b] border-b-2 border-[#991b1b]/20 pb-1">
              {lblExperience}
            </h2>
            <div className="space-y-5">
              {experience.map((job: any, i: number) => (
                <div key={job.id || i} className="space-y-1 relative pl-3.5 border-l-2 border-[#991b1b]/30">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#991b1b]" />
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-black uppercase tracking-tight text-[#111827]">
                      {job.role || job.title || "Senior Lead"}
                    </h3>
                    <span className="text-[10px] font-bold text-[#991b1b]">
                      {job.startDate || "2022"} – {job.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#b91c1c] uppercase tracking-wide">
                    {job.company || "Company Name"}
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside text-[#4b5563] pt-1 leading-relaxed">
                    {(
                      job.achievements ||
                      job.bullets || [
                        "Led cross-functional teams to deliver key organizational milestones.",
                        "Streamlined internal processes and managed critical project deliverables.",
                      ]
                    ).map((bullet: string, idx: number) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications & Honors Section */}
          {certifications.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#991b1b] border-b-2 border-[#991b1b]/20 pb-1">
                {lblCertifications}
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {certifications.map((cert: any, index: number) => (
                  <div
                    key={index}
                    className="p-2 rounded-xl bg-white border border-[#991b1b]/20 text-[#991b1b] font-medium shadow-xs"
                  >
                    ✦ {typeof cert === "string" ? cert : cert?.title || cert?.name}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Decorative Bottom Organic Crimson Swirl */}
      <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-[#991b1b] rounded-full blur-2xl opacity-15 pointer-events-none" />
    </div>
  );
}
