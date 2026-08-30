import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  labels?: Record<string, string>;
}

// ==========================================================================
// FUTURISTIC CYBER-NURSE HUD & HOLO-VITAL TEMPLATE
// ==========================================================================
export function CyberNurseFuturisticTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#020617] text-[#38BDF8] font-mono p-10 overflow-hidden shadow-2xl border-t-4 border-cyan-500 print:shadow-none">
      {/* Background Holographic Grid & Neon Pulse */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e90A_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90A_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header HUD Unit */}
      <div className="relative z-10 flex justify-between items-center bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] tracking-widest text-cyan-400 uppercase font-bold">BIO-METRIC CLINICAL UNIT // ACTIVE</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-wider">{b.fullName || "Nurse Alex Mercer, RN"}</h1>
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{b.role || "Critical Care & Cyber-Triage Specialist"}</p>
          <div className="flex gap-4 text-[11px] text-slate-400 pt-1">
            <span>LOC: {b.location || "Neo-Tokyo General / ICU Sector 7"}</span>
            <span>NET: {b.email || "alex.mercer@med-nexus.io"}</span>
          </div>
        </div>
        <div className="w-24 h-24 rounded-xl border-2 border-cyan-500/50 p-1 bg-slate-950 flex items-center justify-center relative overflow-hidden group">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Nurse Avatar" className="w-full h-full object-cover rounded-lg filter saturate-150 contrast-125" />
          ) : (
            <div className="text-cyan-400 font-black text-2xl">RN</div>
          )}
          {/* Holographic Scanline Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.2)_50%)] bg-[size:100%_4px] pointer-events-none" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-12 gap-6 font-sans">
        {/* Left Telemetry Column */}
        <div className="col-span-5 space-y-6">
          <div className="bg-slate-900/60 backdrop-blur border border-cyan-500/20 rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 border-b border-cyan-500/20 pb-1">
              // {labels?.skills || "CLINICAL_PROTOCOLS"}
            </h3>
            <div className="space-y-3 font-mono text-xs">
              {(skills.length > 0 ? skills : ["Advanced Life Support (ALS)", "Trauma Triage", "ECG Monitoring", "Critical Care Management"]).map((s: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>{typeof s === "string" ? s : s.name}</span>
                    <span className="text-cyan-400">99.9%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded" style={{ width: "95%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur border border-cyan-500/20 rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 border-b border-cyan-500/20 pb-1">
              // VITAL_SIGN_METRICS
            </h3>
            <div className="grid grid-cols-2 gap-3 text-center font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-cyan-500/20">
                <p className="text-[10px] text-slate-400">PATIENT RECOVERY</p>
                <p className="text-lg font-bold text-emerald-400">+98.4%</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-cyan-500/20">
                <p className="text-[10px] text-slate-400">SHIFT EFFICIENCY</p>
                <p className="text-lg font-bold text-cyan-400">OPTIMAL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Career Timeline */}
        <div className="col-span-7 space-y-6">
          <div className="bg-slate-900/60 backdrop-blur border border-cyan-500/20 rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4 border-b border-cyan-500/20 pb-1">
              // {labels?.experience || "ACTIVE_DUTY_RECORD"}
            </h3>
            <div className="space-y-5">
              {exp.length > 0 ? exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-cyan-500/60 pl-4 space-y-1.5 text-xs">
                  <h4 className="font-bold text-white text-sm">{item.role}</h4>
                  <p className="text-cyan-400 font-mono text-[11px]">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="space-y-1 text-slate-300 leading-relaxed">
                    {(item.bullets || ["Managed high-acuity patient caseloads in fast-paced ICU environment.", "Implemented advanced telemetry monitoring protocols."]).map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-mono">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )) : (
                <p className="text-xs text-slate-500 font-mono">No active service logs found...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
