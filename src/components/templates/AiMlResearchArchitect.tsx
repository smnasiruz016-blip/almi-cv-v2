"use client";

import React from "react";
import type { CVData } from "@/lib/cv-types";

export function AiMlResearchArchitect({
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

  const displayRole = basics.role?.trim() || "Staff AI & Machine Learning Systems Architect";
  const fullName = basics.fullName?.trim() || "Your Full Name";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((w: string) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "AI";

  return (
    <div
      className="w-full bg-[var(--almi-bg,#ffffff)] text-[var(--almi-text,#0f172a)] font-mono transition-colors duration-150 p-8 shadow-sm"
      style={{ minHeight: paginated ? "1120px" : "auto" }}
    >
      {/* Neural AI Architecture Header */}
      <div className="p-6 rounded-2xl border border-[var(--almi-primary,#6366f1)]/30 bg-[var(--almi-primary,#6366f1)]/5 mb-6">
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--almi-primary,#6366f1)]">
              <span className="h-2 w-2 rounded-full bg-[var(--almi-primary,#6366f1)] animate-ping" />
              <span>[MODEL_STATUS: TRAINED_&_OPTIMIZED]</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight">{fullName}</h1>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#6366f1)]">
              {displayRole}
            </p>

            <div className="flex flex-wrap gap-4 text-xs opacity-80 pt-1 font-sans">
              {basics.email && <span>✉️ {basics.email}</span>}
              {basics.phone && <span>📞 {basics.phone}</span>}
              {basics.location && <span>📍 {basics.location}</span>}
              {basics.website && <span>🌐 {basics.website}</span>}
              {basics.linkedin && <span>🔗 {basics.linkedin}</span>}
            </div>
          </div>

          {/* Photo Slot */}
          <div className="shrink-0">
            {basics.photoUrl ? (
              <img
                src={basics.photoUrl}
                alt={fullName}
                className="h-24 w-24 rounded-2xl object-cover border-2 border-[var(--almi-primary,#6366f1)] shadow-md"
              />
            ) : (
              <div className="h-24 w-24 rounded-2xl border-2 border-dashed border-[var(--almi-primary,#6366f1)]/60 bg-[var(--almi-primary,#6366f1)]/10 flex flex-col items-center justify-center text-center p-2">
                <span className="text-lg font-bold text-[var(--almi-primary,#6366f1)]">{initials}</span>
                <span className="text-[9px] uppercase tracking-tighter opacity-70 font-sans mt-0.5">+ Photo</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (8-Col): Research Scope & Model Architectures */}
        <div className="col-span-8 space-y-6">
          {basics.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#6366f1)] mb-2 flex items-center gap-1.5">
                <span>&gt;</span> RESEARCH_SUMMARY
              </h2>
              <p className="text-xs leading-relaxed opacity-90 font-sans">{basics.summary}</p>
            </section>
          )}

          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#6366f1)] mb-3 flex items-center gap-1.5">
              <span>&gt;</span> MODEL_DEPLOYMENTS_&_EXPERIENCE
            </h2>
            <div className="space-y-5">
              {experience.map((job: any, i: number) => (
                <div key={job.id || i} className="border-l-2 border-[var(--almi-primary,#6366f1)]/40 pl-3.5 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">{job.role || job.title || "Staff ML Engineer"}</h3>
                    <span className="text-[10px] opacity-70 font-mono">
                      {job.startDate || "2022"} – {job.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[var(--almi-primary,#6366f1)] font-sans">
                    {job.company || "AI Research Labs"}
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside opacity-85 pt-1 font-sans">
                    {(job.achievements || job.bullets || [
                      "Trained and fine-tuned 70B+ parameter transformer architectures reducing inference latency by 35%.",
                      "Engineered distributed training pipelines across clusters of 512+ H100 GPUs with DeepSpeed and Megatron."
                    ]).map((bullet: string, idx: number) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (4-Col): Frameworks, Publications & Compute */}
        <div className="col-span-4 space-y-5">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#6366f1)] mb-2 flex items-center gap-1.5">
              <span>&gt;</span> FRAMEWORKS_&_STACK
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {(skills.length > 0 ? skills : ["PyTorch", "vLLM", "CUDA", "Triton", "TensorRT-LLM", "HuggingFace", "LangGraph", "DeepSpeed"]).map(
                (skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-[11px] px-2 py-0.5 rounded-md border border-[var(--almi-primary,#6366f1)]/30 bg-[var(--almi-primary,#6366f1)]/10 text-[var(--almi-text,#0f172a)] font-mono"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#6366f1)] mb-2 flex items-center gap-1.5">
              <span>&gt;</span> PUBLICATIONS_&_CERTS
            </h2>
            <div className="space-y-1.5 text-xs font-sans">
              {(certifications.length > 0 ? certifications : [
                "NeurIPS / ICML Published Author",
                "NVIDIA Certified Deep Learning Specialist"
              ]).map((cert: any, index: number) => (
                <div
                  key={index}
                  className="p-2 rounded-lg bg-[var(--almi-primary,#6366f1)]/5 border border-[var(--almi-primary,#6366f1)]/20"
                >
                  📄 {typeof cert === "string" ? cert : cert?.title || cert?.name}
                </div>
              ))}
            </div>
          </section>

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#6366f1)] mb-2 flex items-center gap-1.5">
                <span>&gt;</span> EDUCATION
              </h2>
              <div className="space-y-2 text-xs font-sans">
                {education.map((edu: any, index: number) => (
                  <div key={edu.id || index}>
                    <div className="font-bold">{edu.degree || "M.S. in Artificial Intelligence"}</div>
                    <div className="opacity-75">{edu.institution || "Institute of Technology"}</div>
                    <div className="text-[10px] opacity-60 font-mono">{edu.year || edu.gradYear || "2021"}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--almi-primary,#6366f1)] mb-2 flex items-center gap-1.5">
                <span>&gt;</span> LANGUAGES
              </h2>
              <div className="space-y-1 text-xs opacity-85 font-sans">
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
