import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. CYBER DEV TERMINAL (Full-Stack / AI / DevOps - Code Terminal & Git Branch)
// ==========================================================================
export function CyberDevTerminalTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#07090E] text-[#E2E8F0] font-mono p-9 overflow-hidden shadow-2xl border-t-4 border-cyan-400 print:shadow-none print:m-0 print:w-full">
      {/* Background Matrix Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B0A_1px,transparent_1px),linear-gradient(to_bottom,#1E293B0A_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Terminal Bar */}
      <div className="relative z-10 flex items-center justify-between bg-[#0F172A] px-4 py-2 rounded-t-lg border border-slate-700/80 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]" />
          <span className="text-xs text-slate-400 ml-2">bash - resume.sh</span>
        </div>
        <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-widest">STATUS: PRODUCTION_READY</span>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-7 pb-6 border-b border-slate-800">
        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
          <div
            className="w-28 h-28 bg-gradient-to-tr from-cyan-400 via-violet-500 to-emerald-400 p-[3px] shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}
          >
            <div
              className="w-full h-full bg-[#0B132B] flex items-center justify-center overflow-hidden"
              style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}
            >
              {b.photoUrl ? (
                <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl text-cyan-400 font-extrabold">&lt;{(b.fullName || "D")[0]}/&gt;</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
            <span>●</span>
            <span className="tracking-widest uppercase text-[10px]">Senior Full-Stack & AI Systems</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-wide">{b.fullName || "Alex Rivera"}</h1>
          <p className="text-sm font-semibold text-cyan-400 mt-0.5">{b.role || "Principal Cloud & Software Architect"}</p>
          <p className="text-xs text-slate-300 font-sans mt-2 max-w-xl leading-relaxed">
            {b.summary || "High-performance distributed systems engineer specializing in cloud architecture, low-latency microservices, and AI workflow automation."}
          </p>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="relative z-10 grid grid-cols-3 gap-4 mb-7">
        <div className="bg-[#0F172A]/90 border border-cyan-500/30 p-3 rounded-lg text-center">
          <p className="text-[10px] text-slate-400 uppercase">System Uptime</p>
          <p className="text-lg font-black text-cyan-400">99.99%</p>
        </div>
        <div className="bg-[#0F172A]/90 border border-violet-500/30 p-3 rounded-lg text-center">
          <p className="text-[10px] text-slate-400 uppercase">Throughput Scale</p>
          <p className="text-lg font-black text-violet-400">12M+ RPS</p>
        </div>
        <div className="bg-[#0F172A]/90 border border-emerald-500/30 p-3 rounded-lg text-center">
          <p className="text-[10px] text-slate-400 uppercase">Microservices</p>
          <p className="text-lg font-black text-emerald-400">45+ Deployed</p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-7 font-sans">
        {/* Left Tech Stack & Endpoints */}
        <div className="col-span-5 bg-[#0F172A]/70 border border-slate-800 rounded-xl p-5 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2.5">
              // {labels?.contact || "ENDPOINTS"}
            </h3>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <p>⚡ {b.phone}</p>
              <p>📧 {b.email}</p>
              <p>📍 {b.location}</p>
              {b.linkedin && <p>🔗 {b.linkedin}</p>}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3">
              // {labels?.skills || "TECH_STACK"}
            </h3>
            <div className="space-y-2.5">
              {(skills.length > 0 ? skills : [
                "TypeScript / React / Next.js",
                "Node.js / Go / Rust",
                "Kubernetes & Docker (CI/CD)",
                "PostgreSQL / Redis / Prisma",
                "AI Agent Tooling / PyTorch"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between text-slate-200 font-mono mb-1">
                    <span>{typeof s === "string" ? s : s.name}</span>
                    <span className="text-emerald-400 text-[10px]">READY</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded" style={{ width: `${88 + (idx % 3) * 4}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Git Branch Experience */}
        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1 flex justify-between items-center">
              <span>// {labels?.experience || "DEPLOYMENT_HISTORY"}</span>
              <span className="text-[10px] text-emerald-400">branch: main</span>
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="relative border-l-2 border-cyan-500/40 pl-3.5">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06B6D4]" />
                  <h4 className="text-xs font-bold text-white uppercase">{item.role}</h4>
                  <p className="text-xs text-cyan-400 font-mono">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-slate-300">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>&gt; {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1">
              // {labels?.education || "ACADEMICS"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-white">{e.degree}</p>
                <p className="text-slate-400 font-mono">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. VOGUE CREATIVE ARCH (Creative Director / Fashion / UI - Roman Arch & Swatches)
// ==========================================================================
export function VogueCreativeArchTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FDFBF7] text-[#2C2725] font-serif p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Decorative Gold Leaf Accent Line */}
      <div className="w-full h-1 bg-gradient-to-r from-[#5A1A24] via-[#D4AF37] to-[#FDFBF7] mb-8" />

      {/* Header with Roman Arch Frame */}
      <div className="relative z-10 flex items-center gap-8 mb-8 pb-7 border-b border-[#D4AF37]/40">
        <div className="w-32 h-44 rounded-t-full border-2 border-[#D4AF37] p-1 bg-white shadow-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-t-full" />
          ) : (
            <div className="text-center font-sans">
              <span className="text-4xl text-[#5A1A24] font-serif font-bold">{(b.fullName || "V")[0]}</span>
              <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] mt-1">Atelier</p>
            </div>
          )}
        </div>

        <div>
          <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] block mb-1">
            STUDIO PORTFOLIO & DIRECTION
          </span>
          <h1 className="text-4xl font-normal tracking-wide text-[#1A1817] uppercase">{b.fullName || "Victoria Sinclair"}</h1>
          <p className="font-sans text-sm font-semibold tracking-wider text-[#5A1A24] mt-1">{b.role || "Executive Creative Director"}</p>
          <p className="text-xs text-[#554E4B] italic mt-2.5 max-w-xl leading-relaxed">
            "{b.summary || "Curating transformative visual identities, brand architecture, and multi-platform editorial campaigns with haute elegance."}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 font-sans">
        {/* Left Column: Swatches & Core Skills */}
        <div className="col-span-5 bg-[#F6F1EA] rounded-xl p-6 space-y-6">
          <div>
            <h3 className="font-serif text-sm font-bold text-[#5A1A24] uppercase tracking-wider mb-2 border-b border-[#D4AF37]/50 pb-1">
              {labels?.contact || "Private Office"}
            </h3>
            <div className="text-xs text-[#4A433F] space-y-1.5 font-light">
              <p>✦ {b.email}</p>
              <p>✦ {b.phone}</p>
              <p>✦ {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-sm font-bold text-[#5A1A24] uppercase tracking-wider mb-3 border-b border-[#D4AF37]/50 pb-1">
              {labels?.skills || "Creative Mastery"}
            </h3>
            <div className="space-y-2 text-xs">
              {(skills.length > 0 ? skills : [
                "Brand Architecture & Identity",
                "Editorial Art Direction",
                "Haute Couture Campaign Design",
                "Typography & Spatial Styling",
                "Creative Team Mentorship"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between border-b border-[#E2D9CE] pb-1">
                  <span className="text-[#332E2B]">{typeof s === "string" ? s : s.name}</span>
                  <span className="text-[#D4AF37]">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Direction History */}
        <div className="col-span-7 space-y-6 font-sans">
          <div>
            <h3 className="font-serif text-base font-bold text-[#1A1817] uppercase tracking-wider mb-3.5 border-b-2 border-[#5A1A24] pb-1 flex justify-between">
              <span>{labels?.experience || "Editorial & Brand Direction"}</span>
              <span className="text-[10px] text-[#D4AF37] font-sans font-bold">VOGUE / ATELIER</span>
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l border-[#D4AF37] pl-3.5">
                  <h4 className="font-bold text-[#1A1817] text-xs uppercase">{item.role}</h4>
                  <p className="text-[#5A1A24] font-medium">{item.company} • {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-[#554E4B]">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>— {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-base font-bold text-[#1A1817] uppercase tracking-wider mb-2 border-b-2 border-[#5A1A24] pb-1">
              {labels?.education || "Academic Foundations"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-[#1A1817]">{e.degree}</p>
                <p className="text-[#5A1A24]">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. AERO FLIGHT CAPTAIN (Aviation / Flight Commander - HUD Horizon & Wings)
// ==========================================================================
export function AeroFlightCaptainTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#0A1124] text-[#E2E8F0] font-sans p-9 overflow-hidden shadow-2xl border-t-4 border-[#F77F00]">
      {/* Top Cockpit HUD Altitude Horizon Overlay */}
      <div className="w-full h-8 bg-[#0F1D40] rounded flex items-center justify-between px-3 mb-6 border border-cyan-500/30">
        <span className="text-[10px] font-mono text-[#F77F00] font-bold">ALT: 38,000 FT • MACH 0.84</span>
        <svg className="w-36 h-4 stroke-cyan-400 fill-none stroke-[1.5]" viewBox="0 0 100 20">
          <line x1="10" y1="10" x2="40" y2="10" />
          <circle cx="50" cy="10" r="4" />
          <line x1="60" y1="10" x2="90" y2="10" />
        </svg>
        <span className="text-[10px] font-mono text-cyan-400 font-bold">HEADING: 285° NW</span>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-7 pb-6 border-b border-slate-700/80">
        <div className="relative w-28 h-28 rounded-full border-2 border-[#F77F00] bg-[#0F1D40] p-1 shadow-[0_0_20px_rgba(247,127,0,0.4)] flex items-center justify-center flex-shrink-0">
          <span className="absolute -top-3 -right-2 text-xl">✈️</span>
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="text-center font-mono">
              <span className="text-3xl text-[#F77F00] font-black">{(b.fullName || "C")[0]}</span>
              <p className="text-[8px] text-cyan-400">CAPTAIN</p>
            </div>
          )}
        </div>

        <div>
          <div className="inline-block px-2.5 py-0.5 rounded bg-[#F77F00]/20 border border-[#F77F00]/50 text-[#F77F00] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
            ATPL / COMMAND PILOT (B777 / A350)
          </div>
          <h1 className="text-3xl font-black text-white tracking-wide uppercase">{b.fullName || "Capt. Jonathan Sterling"}</h1>
          <p className="text-base font-bold text-cyan-400 mt-0.5">{b.role || "Commercial Airline Captain & Flight Examiner"}</p>
          <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
            {b.summary || "Senior Airline Transport Pilot (ATPL) with 12,000+ flawless flight hours across long-haul international routes and flight crew safety instruction."}
          </p>
        </div>
      </div>

      {/* Logbook Hours Counter */}
      <div className="grid grid-cols-3 gap-4 mb-7 font-mono">
        <div className="bg-[#0F1D40] border border-cyan-500/30 p-3 rounded text-center">
          <p className="text-[10px] text-slate-400 uppercase">Total Flight Time</p>
          <p className="text-lg font-black text-[#F77F00]">12,450 hrs</p>
        </div>
        <div className="bg-[#0F1D40] border border-cyan-500/30 p-3 rounded text-center">
          <p className="text-[10px] text-slate-400 uppercase">PIC Command</p>
          <p className="text-lg font-black text-cyan-400">8,200 hrs</p>
        </div>
        <div className="bg-[#0F1D40] border border-cyan-500/30 p-3 rounded text-center">
          <p className="text-[10px] text-slate-400 uppercase">ILS Cat III Ops</p>
          <p className="text-lg font-black text-emerald-400">100% Safety</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-7">
        <div className="col-span-5 bg-[#0F1D40]/80 border border-slate-700/80 rounded-xl p-5 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-[#F77F00] uppercase tracking-widest mb-2">
              [ {labels?.contact || "FLIGHT OPERATIONS"} ]
            </h3>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <p>🛫 {b.phone}</p>
              <p>✉️ {b.email}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-[#F77F00] uppercase tracking-widest mb-3">
              [ {labels?.skills || "TYPE RATINGS & SKILLS"} ]
            </h3>
            <div className="space-y-2.5">
              {(skills.length > 0 ? skills : [
                "Boeing 777 / 787 Type Rated",
                "Airbus A350 / A330 Type Rated",
                "ETOPS 330 Min Certified",
                "Crew Resource Management (CRM)",
                "Cat III All-Weather Precision ILS"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between text-slate-200 font-mono mb-1">
                    <span>{typeof s === "string" ? s : s.name}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F77F00] to-cyan-400 rounded" style={{ width: "95%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-[#F77F00] uppercase tracking-widest mb-3 border-b border-slate-700/80 pb-1">
              [ {labels?.experience || "AIRLINE COMMAND RECORD"} ]
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-[#F77F00] pl-3.5">
                  <h4 className="text-xs font-bold text-white uppercase">{item.role}</h4>
                  <p className="text-xs text-cyan-400 font-mono">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-slate-300">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>✈ {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-[#F77F00] uppercase tracking-widest mb-2 border-b border-slate-700/80 pb-1">
              [ {labels?.education || "LICENSES & ACADEMICS"} ]
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-white">{e.degree}</p>
                <p className="text-slate-400 font-mono">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. LUXE REAL ESTATE (Luxury Broker & Executive - Skyscraper Gold Badge)
// ==========================================================================
export function LuxeRealEstateTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#0E131F] text-[#F3F4F6] font-sans p-9 overflow-hidden shadow-2xl border-b-4 border-[#D4AF37]">
      {/* Top Gold Geometric Header Banner */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/40 pb-5 mb-7">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">PREMIER LUXURY REALTY</span>
        </div>
        <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFF1C5] px-2.5 py-0.5 rounded font-semibold uppercase">
          $150M+ CLOSED VOLUME
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-7 pb-6 border-b border-slate-800">
        <div className="w-28 h-28 rounded-xl border-2 border-[#D4AF37] bg-[#172033] p-1 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center flex-shrink-0">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-3xl font-serif font-black text-[#D4AF37]">{(b.fullName || "R")[0]}</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-black text-white tracking-wide uppercase font-serif">{b.fullName || "Sebastian Sterling"}</h1>
          <p className="text-base font-bold text-[#D4AF37] mt-0.5">{b.role || "Managing Principal & Luxury Real Estate Broker"}</p>
          <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
            {b.summary || "High-net-worth real estate advisor specializing in trophy penthouses, prime residential developments, and bespoke investor acquisitions."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-7">
        <div className="col-span-5 bg-[#172033]/70 border border-[#D4AF37]/30 rounded-xl p-5 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2.5">
              {labels?.contact || "Private Advisory Contact"}
            </h3>
            <div className="text-xs text-slate-200 space-y-1.5">
              <p>🏢 {b.location}</p>
              <p>📞 {b.phone}</p>
              <p>✉️ {b.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">
              {labels?.skills || "Deal Specialties"}
            </h3>
            <div className="space-y-2.5">
              {(skills.length > 0 ? skills : [
                "Ultra-Luxury Residential Sales",
                "High-End Contract Negotiation",
                "HNW Client Portfolio Advisory",
                "Off-Market Penthouse Sourcing",
                "Real Estate Private Equity"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs flex justify-between items-center text-slate-200 border-b border-slate-700/50 pb-1">
                  <span>{typeof s === "string" ? s : s.name}</span>
                  <span className="text-[#D4AF37]">★ ★ ★ ★ ★</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-3.5 border-b border-[#D4AF37]/30 pb-1">
              {labels?.experience || "Track Record & Brokerage History"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-[#D4AF37] pl-3.5">
                  <h4 className="text-xs font-bold text-white uppercase">{item.role}</h4>
                  <p className="text-xs text-[#D4AF37] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-slate-300">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-2 border-b border-[#D4AF37]/30 pb-1">
              {labels?.education || "Licenses & Credentials"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-white">{e.degree}</p>
                <p className="text-[#D4AF37]">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
