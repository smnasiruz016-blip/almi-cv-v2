import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. NEO-GLASSMORPHISM EXECUTIVE (Frosted Glass Cards & Deep Obsidian)
// ==========================================================================
export function NeoGlassmorphismTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#0A0F1D] text-[#F1F5F9] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/20 to-purple-500/0 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/20 to-blue-500/0 rounded-full blur-3xl pointer-events-none" />

      {/* Header Card */}
      <div className="relative z-10 bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 mb-8 shadow-2xl flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold tracking-widest uppercase">
            Verified Professional
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">{b.fullName || "Alexander Wright"}</h1>
          <p className="text-sm font-bold text-indigo-400 uppercase tracking-wider">{b.role || "Chief Technology Officer"}</p>
          <div className="flex gap-4 text-xs text-slate-400 pt-1 font-mono">
            <span>📍 {b.location || "San Francisco, CA"}</span>
            <span>✉️ {b.email || "alex@enterprise.io"}</span>
            <span>📞 {b.phone || "+1 (555) 019-2834"}</span>
          </div>
        </div>
        <div className="w-28 h-28 rounded-2xl p-1 bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-xl flex-shrink-0">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-2xl font-black text-indigo-400">
              {(b.fullName || "A")[0]}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-12 gap-8">
        {/* Left Sidebar Card */}
        <div className="col-span-4 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div>
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1">
              {labels?.skills || "Core Competencies"}
            </h3>
            <div className="space-y-2.5">
              {(skills.length > 0 ? skills : ["Cloud Architecture", "Executive Leadership", "AI Strategy", "DevOps Scale"]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>{typeof s === "string" ? s : s.name}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Card */}
        <div className="col-span-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div>
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-1">
              {labels?.experience || "Professional Experience"}
            </h3>
            <div className="space-y-5">
              {exp.length > 0 ? exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-indigo-500 pl-4 space-y-1">
                  <h4 className="font-bold text-white text-sm">{item.role}</h4>
                  <p className="text-indigo-400 font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="space-y-1 text-slate-300 leading-relaxed">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              )) : (
                <p className="text-xs text-slate-500">Leading global engineering teams...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. ASYMMETRIC SPLIT EDITORIAL (Champagne & Burnt Wine Masthead)
// ==========================================================================
export function AsymmetricEditorialTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#F7F5F0] text-[#2C2421] font-serif p-12 overflow-hidden shadow-2xl print:shadow-none">
      {/* Editorial Header */}
      <div className="border-b-4 border-[#581825] pb-8 mb-8 flex justify-between items-end">
        <div>
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-[#8C6D46] block mb-2">
            FEATURED PROFILE • 2026 EDITION
          </span>
          <h1 className="text-5xl font-normal tracking-tight text-[#1E1A17]">{b.fullName || "Madeleine Vianney"}</h1>
          <p className="font-sans text-sm font-semibold tracking-wider text-[#581825] mt-1.5">{b.role || "Editor-in-Chief & Brand Consultant"}</p>
        </div>
        <div className="text-right font-sans text-xs text-gray-600 space-y-0.5 font-light">
          <p>{b.location || "Paris, France"}</p>
          <p>{b.email || "m.vianney@editorial.com"}</p>
          <p>{b.phone || "+33 1 42 68 55 00"}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10 font-sans">
        <div className="col-span-4 space-y-6 border-r border-[#E3DDD1] pr-6">
          <div>
            <h3 className="font-serif text-sm font-bold text-[#581825] uppercase tracking-wider mb-2 border-b border-[#581825] pb-1">
              {labels?.summary || "Synopsis"}
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed font-light">
              {b.summary || "Award-winning editorial director with a passion for narrative craftsmanship, luxury branding, and visual storytelling."}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm font-bold text-[#581825] uppercase tracking-wider mb-2 border-b border-[#581825] pb-1">
              {labels?.skills || "Expertise"}
            </h3>
            <ul className="text-xs text-gray-700 space-y-1">
              {(skills.length > 0 ? skills : ["Editorial Direction", "Copywriting", "Brand Strategy", "Publishing"]).map((s: any, idx: number) => (
                <li key={idx}>— {typeof s === "string" ? s : s.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-8 space-y-6">
          <div>
            <h3 className="font-serif text-base font-bold text-[#1E1A17] uppercase tracking-wider mb-4 border-b-2 border-[#581825] pb-1">
              {labels?.experience || "Career History"}
            </h3>
            <div className="space-y-5">
              {exp.length > 0 ? exp.map((item: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-gray-900">
                    <span>{item.role} • <span className="text-[#581825]">{item.company}</span></span>
                    <span className="font-mono text-[11px] text-gray-500">{item.startDate} - {item.endDate || "Present"}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.bullets?.[0]}</p>
                </div>
              )) : (
                <p className="text-xs text-gray-500">Managing literary publications...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. CYBER-GEOMETRIC MATRIX (Midnight Ink & Electric Cyan Data Hub)
// ==========================================================================
export function CyberGeometricTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#050B14] text-[#E2E8F0] font-mono p-10 overflow-hidden shadow-2xl border-l-8 border-cyan-400 print:shadow-none">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06B6D40A_1px,transparent_1px),linear-gradient(to_bottom,#06B6D40A_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-8 pb-6 border-b border-cyan-500/40">
        <div>
          <span className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">SYSTEM_ID: 0x89F2C</span>
          <h1 className="text-4xl font-black text-white tracking-wider">{b.fullName || "Marcus Vane"}</h1>
          <p className="text-xs font-bold text-cyan-400 mt-1 uppercase tracking-widest">{b.role || "Principal Cybersecurity Architect"}</p>
        </div>
        <div className="text-right text-xs text-slate-400 space-y-0.5">
          <p>LOC: {b.location || "Cyber-District, Neo-City"}</p>
          <p>NET: {b.email || "vane@sec-ops.net"}</p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8 font-sans">
        <div className="col-span-5 bg-slate-900/80 border border-cyan-500/30 rounded-xl p-5 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3">
              // {labels?.skills || "SECURITY_PROTOCOLS"}
            </h3>
            <div className="space-y-3">
              {(skills.length > 0 ? skills : ["Penetration Testing", "Zero Trust Architecture", "Cryptographic Systems"]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs font-mono">
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{typeof s === "string" ? s : s.name}</span>
                    <span className="text-cyan-400">100%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded">
                    <div className="h-full bg-cyan-400 shadow-[0_0_8px_#06B6D4]" style={{ width: "95%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-1">
              // {labels?.experience || "OPERATIONAL_HISTORY"}
            </h3>
            <div className="space-y-4">
              {exp.length > 0 ? exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-cyan-400 pl-4 text-xs font-mono space-y-1">
                  <h4 className="font-bold text-white text-sm">{item.role}</h4>
                  <p className="text-cyan-400">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <p className="text-slate-300 font-sans">{item.bullets?.[0]}</p>
                </div>
              )) : (
                <p className="text-xs text-slate-500">Defending enterprise infrastructure...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. BOHO ORGANIC TERRACOTTA (Warm Sand & Soft Clay Curves)
// ==========================================================================
export function BohoTerracottaTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#F7F2EE] text-[#4A3B32] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Organic Curved Blob Header Accent */}
      <svg className="absolute top-0 right-0 w-[420px] h-[300px] pointer-events-none opacity-90" viewBox="0 0 500 350" fill="none">
        <path d="M100 0 C 250 100, 350 20, 500 150 L 500 0 Z" fill="#D5896F" />
        <path d="M50 0 C 200 180, 300 80, 500 240 L 500 0 Z" fill="#B05B3B" opacity="0.4" />
      </svg>

      <div className="relative z-10 flex items-center gap-7 mb-9 pb-6 border-b border-[#D5896F]/40">
        <div className="w-32 h-32 rounded-full ring-4 ring-[#D5896F] p-1 bg-white shadow-md overflow-hidden flex-shrink-0 flex items-center justify-center">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-3xl font-bold text-[#B05B3B]">{(b.fullName || "B")[0]}</span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#2C211B] uppercase tracking-wide">{b.fullName || "Maya Lin"}</h1>
          <p className="text-base font-semibold text-[#B05B3B] mt-0.5">{b.role || "Holistic Product Designer & Writer"}</p>
          <p className="text-xs text-gray-700 mt-2 max-w-xl leading-relaxed">
            {b.summary || "Designing mindful digital products, human-centered systems, and sustainable brand experiences."}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8">
        <div className="col-span-4 space-y-6 bg-[#EFE6DF] p-5 rounded-2xl border border-[#D5896F]/30">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#B05B3B] border-b border-[#D5896F]/40 pb-1 mb-2">
              {labels?.contact || "Get in touch"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1">
              <p>📍 {b.location || "Portland, OR"}</p>
              <p>✉️ {b.email || "maya@lin-design.co"}</p>
              <p>📞 {b.phone || "+1 (555) 392-1094"}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#B05B3B] border-b border-[#D5896F]/40 pb-1 mb-2">
              {labels?.skills || "Mindful Skills"}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {(skills.length > 0 ? skills : ["UX Research", "Design Systems", "Content Strategy", "Accessibility"]).map((s: any, idx: number) => (
                <span key={idx} className="text-xs font-medium bg-white px-2.5 py-1 rounded-full border border-[#D5896F]/30 text-[#4A3B32]">
                  {typeof s === "string" ? s : s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-8 space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2C211B] border-b-2 border-[#D5896F] pb-1 mb-4">
              {labels?.experience || "Experience"}
            </h3>
            <div className="space-y-4">
              {exp.length > 0 ? exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#D5896F] pl-3.5 space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm">{item.role}</h4>
                  <p className="text-[#B05B3B] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <p className="text-gray-700 leading-relaxed">{item.bullets?.[0]}</p>
                </div>
              )) : (
                <p className="text-xs text-gray-500">Designing calm digital spaces...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
