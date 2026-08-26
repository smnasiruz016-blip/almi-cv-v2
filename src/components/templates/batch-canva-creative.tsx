import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. STUDIO OCHRE EDITORIAL (Warm Coffee/Ochre, Arch Frame, Big Serif Masthead)
// ==========================================================================
export function StudioOchreEditorialTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#F9F6F0] text-[#2B2623] font-serif p-10 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      {/* Top Ochre Color Block */}
      <div className="absolute top-0 right-0 w-[340px] h-[340px] bg-[#E8DCC4] rounded-bl-[160px] pointer-events-none opacity-80" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-9 pb-8 border-b-2 border-[#D3C5AB]">
        <div className="max-w-[480px]">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-[#8C6D46] block mb-1">
            CREATIVE PORTFOLIO & RESUME
          </span>
          <h1 className="text-4xl font-normal tracking-tight text-[#1E1A17] uppercase">{b.fullName || "Elena Vance"}</h1>
          <p className="font-sans text-sm font-semibold tracking-wider text-[#8C6D46] mt-1">{b.role || "Senior Art Director & Brand Strategist"}</p>
          <p className="text-xs text-[#5C534D] italic mt-3 leading-relaxed">
            "{b.summary || "Harmonizing classical aesthetics with cutting-edge digital experiences, leading cross-functional teams to build globally recognized brand narratives."}"
          </p>
        </div>

        {/* Roman Arch Photo Frame */}
        <div className="w-36 h-48 rounded-t-full border-4 border-white bg-[#D3C5AB] shadow-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-t-full" />
          ) : (
            <span className="text-4xl text-white font-sans font-bold">{(b.fullName || "E")[0]}</span>
          )}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8 font-sans">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          <div className="bg-[#EFE9DC] p-5 rounded-2xl border border-[#D3C5AB]/60">
            <h3 className="font-serif text-sm font-bold text-[#1E1A17] uppercase tracking-wider mb-2.5">
              {labels?.contact || "Contact Details"}
            </h3>
            <div className="text-xs text-[#5C534D] space-y-2">
              <p>📍 {b.location}</p>
              <p>📞 {b.phone}</p>
              <p>✉️ {b.email}</p>
              {b.linkedin && <p>🔗 {b.linkedin}</p>}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-sm font-bold text-[#1E1A17] uppercase tracking-wider mb-3 border-b border-[#D3C5AB] pb-1">
              {labels?.skills || "Core Expertise"}
            </h3>
            <div className="space-y-2">
              {(skills.length > 0 ? skills : [
                "Brand Architecture",
                "Editorial Direction",
                "Creative Campaign Strategy",
                "Typography & Layout",
                "Team Leadership"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-xs text-[#3D3530]">
                  <span>{typeof s === "string" ? s : s.name}</span>
                  <span className="text-[#8C6D46] text-[10px]">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-6">
          <div>
            <h3 className="font-serif text-base font-bold text-[#1E1A17] uppercase tracking-wider mb-4 border-b-2 border-[#8C6D46] pb-1 flex justify-between">
              <span>{labels?.experience || "Career Milestones"}</span>
              <span className="text-xs font-sans text-[#8C6D46] font-normal">2018 - Present</span>
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-[#D3C5AB] pl-3.5">
                  <h4 className="font-serif font-bold text-[#1E1A17] text-sm">{item.role}</h4>
                  <p className="text-xs text-[#8C6D46] font-semibold">{item.company} • {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-[#5C534D] leading-relaxed">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>— {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-base font-bold text-[#1E1A17] uppercase tracking-wider mb-2 border-b-2 border-[#8C6D46] pb-1">
              {labels?.education || "Education & Honors"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-[#1E1A17]">{e.degree}</p>
                <p className="text-[#8C6D46]">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. POP CREATIVE COLLAGE (Neo-Brutalist, Color Blocks, Sticker Badges)
// ==========================================================================
export function PopCreativeCollageTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FFFBEA] text-[#111] font-sans p-9 overflow-hidden shadow-2xl border-4 border-black print:shadow-none">
      {/* Decorative Sticker Badge */}
      <div className="absolute top-6 right-6 rotate-12 bg-[#FF5E7E] text-white border-2 border-black px-4 py-1.5 rounded-full font-black text-xs shadow-[3px_3px_0px_#000] z-20">
        ★ PRO CREATIVE 2026
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-6 mb-7 pb-6 border-b-4 border-black">
        <div className="w-28 h-28 border-4 border-black bg-[#A0E7E5] rounded-2xl p-1 shadow-[4px_4px_0px_#000] flex items-center justify-center flex-shrink-0">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-4xl font-black">{(b.fullName || "P")[0]}</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight bg-[#FFAEBC] inline-block px-2 border-2 border-black shadow-[2px_2px_0px_#000]">
            {b.fullName || "Jordan Sparks"}
          </h1>
          <p className="text-sm font-bold text-black mt-1.5 uppercase tracking-wider">{b.role || "UI/UX & Visual Designer"}</p>
          <p className="text-xs text-gray-800 mt-2 font-medium max-w-xl">
            {b.summary || "Crafting bold, delightful, and boundary-pushing visual identities with viral engagement and user-centered design systems."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-5 space-y-5">
          <div className="bg-[#B4F8C8] border-3 border-black p-4 rounded-xl shadow-[3px_3px_0px_#000]">
            <h3 className="text-xs font-black uppercase tracking-widest mb-2">⚡ {labels?.contact || "PING ME"}</h3>
            <div className="text-xs font-semibold space-y-1">
              <p>{b.phone}</p>
              <p>{b.email}</p>
              <p>{b.location}</p>
            </div>
          </div>

          <div className="bg-white border-3 border-black p-4 rounded-xl shadow-[3px_3px_0px_#000]">
            <h3 className="text-xs font-black uppercase tracking-widest mb-2.5">🛠️ {labels?.skills || "SUPERPOWERS"}</h3>
            <div className="flex flex-wrap gap-1.5">
              {(skills.length > 0 ? skills : [
                "UI/UX Design",
                "Figma Systems",
                "Motion Graphics",
                "Brand Identity",
                "3D Illustrations"
              ]).map((s: any, idx: number) => (
                <span key={idx} className="text-[11px] font-bold bg-[#FBE7C6] border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_#000]">
                  {typeof s === "string" ? s : s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-7 space-y-5">
          <div className="bg-white border-3 border-black p-5 rounded-xl shadow-[4px_4px_0px_#000]">
            <h3 className="text-xs font-black uppercase tracking-widest mb-3 border-b-2 border-black pb-1">
              🚀 {labels?.experience || "EXPERIENCE & IMPACT"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-black pl-3">
                  <h4 className="text-xs font-black uppercase">{item.role}</h4>
                  <p className="text-[11px] font-bold text-[#FF5E7E]">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1 space-y-1 text-xs text-gray-800">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>➔ {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#A0E7E5] border-3 border-black p-4 rounded-xl shadow-[3px_3px_0px_#000]">
            <h3 className="text-xs font-black uppercase tracking-widest mb-2">🎓 {labels?.education || "STUDIES"}</h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs">
                <p className="font-black">{e.degree}</p>
                <p className="font-semibold text-gray-700">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. NORDIC SAGE MINIMAL (Multi-Column Grid, Clean Metadata, High White Space)
// ==========================================================================
export function NordicSageMinimalTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-white text-[#2C3E35] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#E2EBE6]">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-[#1C2C24]">{b.fullName || "Marcus Lindqvist"}</h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#52796F] mt-1">{b.role || "Strategic Product Lead"}</p>
          <div className="flex items-center gap-4 text-xs text-[#84A98C] mt-2 font-medium">
            <span>📍 {b.location}</span>
            <span>✉️ {b.email}</span>
            <span>📞 {b.phone}</span>
          </div>
        </div>
        <div className="w-20 h-20 rounded-full bg-[#EBF2EE] border border-[#CCDCD2] flex items-center justify-center text-xl font-bold text-[#52796F]">
          {(b.fullName || "M")[0]}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-7">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#52796F] mb-4 border-b border-[#E2EBE6] pb-1">
              {labels?.experience || "Experience"}
            </h3>
            <div className="space-y-5">
              {exp.map((item: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-semibold text-[#1C2C24]">{item.role}</h4>
                    <span className="text-[11px] text-[#84A98C] font-mono">{item.startDate} – {item.endDate || "Present"}</span>
                  </div>
                  <p className="text-xs font-medium text-[#52796F]">{item.company}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-[#4A5D54] leading-relaxed">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-6 bg-[#F6F9F7] p-5 rounded-xl border border-[#E2EBE6]">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#52796F] mb-2.5">
              {labels?.skills || "Competencies"}
            </h3>
            <div className="space-y-1.5 text-xs text-[#3D5247]">
              {skills.map((s: any, idx: number) => (
                <p key={idx}>— {typeof s === "string" ? s : s.name}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#52796F] mb-2.5">
              {labels?.education || "Education"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-semibold text-[#1C2C24]">{e.degree}</p>
                <p className="text-[#84A98C]">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. DARK LUXE HOLOGRAPHIC (Deep Navy, Iridescent Gold & Radial Gauges)
// ==========================================================================
export function DarkLuxeHolographicTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#0B0F19] text-[#E5E9F0] font-sans p-9 overflow-hidden shadow-2xl border border-amber-500/30 print:shadow-none">
      {/* Metallic Gold Fluid Ribbon */}
      <svg className="absolute top-0 right-0 w-[420px] h-[300px] pointer-events-none opacity-70" viewBox="0 0 500 350" fill="none">
        <path d="M50 0 C 250 140, 350 40, 500 180 L 500 0 Z" fill="url(#goldLuxeGrad)" />
        <defs>
          <linearGradient id="goldLuxeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#E6AF2E" />
            <stop offset="100%" stopColor="#664600" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-7 pb-6 border-b border-amber-500/30">
        <div className="w-28 h-28 rounded-2xl border-2 border-[#F5D061] bg-[#111827] p-1 shadow-[0_0_20px_rgba(245,208,97,0.3)] flex items-center justify-center flex-shrink-0">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-3xl font-bold text-[#F5D061]">{(b.fullName || "L")[0]}</span>
          )}
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5D061] block mb-1">
            EXECUTIVE PROFILE
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase">{b.fullName || "Damian Sterling"}</h1>
          <p className="text-base font-medium text-amber-200/90 mt-0.5">{b.role || "VP of Global Strategy & Operations"}</p>
          <p className="text-xs text-gray-300 mt-2 max-w-xl leading-relaxed">
            {b.summary || "Driving international market expansion, operational efficiency, and high-impact revenue growth across Fortune 500 enterprises."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-7">
        <div className="col-span-5 bg-[#111827]/80 border border-amber-500/20 rounded-2xl p-5 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-[#F5D061] uppercase tracking-widest mb-2">
              {labels?.contact || "Direct Comms"}
            </h3>
            <div className="text-xs text-gray-300 space-y-1.5 font-light">
              <p>📍 {b.location}</p>
              <p>📞 {b.phone}</p>
              <p>✉️ {b.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#F5D061] uppercase tracking-widest mb-3">
              {labels?.skills || "Leadership Arsenal"}
            </h3>
            <div className="space-y-2.5">
              {skills.map((s: any, idx: number) => (
                <div key={idx} className="text-xs flex justify-between items-center text-gray-200 border-b border-gray-800 pb-1">
                  <span>{typeof s === "string" ? s : s.name}</span>
                  <span className="text-[#F5D061]">★ ★ ★ ★ ★</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#F5D061] uppercase tracking-widest mb-3.5 border-b border-amber-500/30 pb-1">
              {labels?.experience || "Executive Track Record"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-[#F5D061]/60 pl-3.5">
                  <h4 className="text-xs font-bold text-white uppercase">{item.role}</h4>
                  <p className="text-xs text-[#F5D061]">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-gray-300">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#F5D061] uppercase tracking-widest mb-2 border-b border-amber-500/30 pb-1">
              {labels?.education || "Degrees & Fellowships"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-white">{e.degree}</p>
                <p className="text-[#F5D061]">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
