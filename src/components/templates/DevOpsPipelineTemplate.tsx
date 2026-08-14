"use client";

import React from "react";
import type { CVData } from "@/lib/cv-types";

export function DevOpsPipelineTemplate({
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

  return (
    <div
      className="w-full bg-[var(--almi-bg,#ffffff)] text-[var(--almi-text,#0f172a)] font-mono transition-colors duration-150 p-8 shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      {/* Top Terminal Header */}
      <div className="rounded-xl border border-[var(--almi-primary,#10b981)]/30 bg-[var(--almi-primary,#10b981)]/5 p-6 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[var(--almi-primary,#10b981)] font-semibold">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--almi-primary,#10b981)] animate-pulse" />
              $ almicv --build --role=&quot;{basics.role || "DevOps & Cloud Engineer"}&quot;
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {basics.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm font-medium text-[var(--almi-primary,#10b981)]">
              {basics.role || "Infrastructure & Reliability Engineer"}
            </p>
          </div>

          {basics.photoUrl && (
            <img
              src={basics.photoUrl}
              alt={basics.fullName || "Avatar"}
              className="h-20 w-20 rounded-xl object-cover border-2 border-[var(--almi-primary,#10b981)] shadow-sm"
            />
          )}
        </div>

        {/* Contact Links Bar */}
        <div className="mt-4 pt-3 border-t border-[var(--almi-primary,#10b981)]/20 flex flex-wrap gap-4 text-xs opacity-80">
          {basics.email && <span>📧 {basics.email}</span>}
          {basics.phone && <span>📱 {basics.phone}</span>}
          {basics.location && <span>📍 {basics.location}</span>}
          {basics.linkedin && <span>🔗 {basics.linkedin}</span>}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left 8-Col: System Overview & Experience Pipeline */}
        <div className="col-span-8 space-y-6">
          {basics.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#10b981)] mb-2 flex items-center gap-1.5">
                <span>//</span> System Overview
              </h2>
              <p className="text-xs leading-relaxed opacity-90">{basics.summary}</p>
            </section>
          )}

          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#10b981)] mb-3 flex items-center gap-1.5">
              <span>//</span> CI/CD Deployment History
            </h2>
            <div className="relative pl-5 space-y-5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--almi-primary,#10b981)]/30">
              {experience.map((job: any, i: number) => (
                <div key={job.id || i} className="relative">
                  <div className="absolute -left-[1.45rem] top-1 h-2.5 w-2.5 rounded-full border-2 border-[var(--almi-primary,#10b981)] bg-[var(--almi-bg,#ffffff)]" />
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold">{job.role || job.title}</h3>
                    <span className="text-[10px] opacity-70">
                      {job.startDate} – {job.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[var(--almi-primary,#10b981)] mb-1">
                    {job.company}
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside opacity-85">
                    {(job.achievements || job.bullets || []).map(
                      (bullet: string, idx: number) => (
                        <li key={idx}>{bullet}</li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 4-Col: Tech Stack, Certs & Education */}
        <div className="col-span-4 space-y-5">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#10b981)] mb-2 flex items-center gap-1.5">
                <span>//</span> Stack & Tools
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-[11px] px-2 py-0.5 rounded border border-[var(--almi-primary,#10b981)]/30 bg-[var(--almi-primary,#10b981)]/10 text-[var(--almi-text,#0f172a)] font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#10b981)] mb-2 flex items-center gap-1.5">
                <span>//</span> Certifications
              </h2>
              <div className="space-y-1.5 text-xs opacity-90">
                {certifications.map((cert: any, index: number) => (
                  <div
                    key={index}
                    className="p-2 rounded bg-[var(--almi-primary,#10b981)]/5 border border-[var(--almi-primary,#10b981)]/15"
                  >
                    {typeof cert === "string" ? cert : cert.title}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#10b981)] mb-2 flex items-center gap-1.5">
                <span>//</span> Education
              </h2>
              <div className="space-y-2">
                {education.map((edu: any, index: number) => (
                  <div key={edu.id || index} className="text-xs">
                    <div className="font-bold">{edu.degree || edu.institution}</div>
                    <div className="opacity-75">{edu.institution || edu.field}</div>
                    <div className="text-[10px] opacity-60">
                      {edu.year || edu.gradYear}
                    </div>
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
