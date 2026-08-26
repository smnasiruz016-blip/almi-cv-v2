import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. AVERY DAVIS (Minimal Charcoal Editorial - Centered Portrait & Fine Rules)
// ==========================================================================
export function AveryDavisEditorialTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-white text-[#222] font-serif p-12 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      {/* Centered Editorial Header */}
      <div className="text-center pb-8 mb-8 border-b-2 border-black">
        {b.photoUrl ? (
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border border-gray-300">
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#F3F3F3] text-black font-sans font-bold flex items-center justify-center text-2xl mx-auto mb-4 border border-black">
            {(b.fullName || "A")[0]}
          </div>
        )}

        <h1 className="text-4xl font-normal tracking-wide uppercase text-black">{b.fullName || "Avery Davis"}</h1>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-gray-600 mt-1.5">{b.role || "Senior Marketing & Brand Strategist"}</p>
        
        <div className="flex justify-center items-center gap-6 font-sans text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
          <span>📍 {b.location || "City, Country"}</span>
          <span>✉️ {b.email || "hello@reallygreatsite.com"}</span>
          <span>📞 {b.phone || "+123-456-7890"}</span>
        </div>
      </div>

      {/* Two Column Balanced Editorial Grid */}
      <div className="grid grid-cols-12 gap-10 font-sans">
        {/* Left Column */}
        <div className="col-span-4 space-y-7 border-r border-gray-200 pr-6">
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              {labels?.contact || "Profile"}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              {b.summary || "Results-driven strategist experienced in high-impact creative campaigns, market research, and multi-channel storytelling."}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              {labels?.skills || "Skills & Expertise"}
            </h3>
            <div className="space-y-2 text-xs text-gray-700">
              {skills.map((s: any, idx: number) => (
                <p key={idx} className="border-b border-gray-100 pb-1">• {typeof s === "string" ? s : s.name}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-black border-b border-black pb-1 mb-3">
              {labels?.education || "Education"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-3">
                <p className="font-bold text-black">{e.degree}</p>
                <p className="text-gray-500">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Experience */}
        <div className="col-span-8 space-y-6">
          <div>
            <h3 className="font-serif text-base font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-4">
              {labels?.experience || "Professional Experience"}
            </h3>
            <div className="space-y-5">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-serif font-bold text-sm text-black">{item.role}</h4>
                    <span className="text-gray-500 font-mono text-[11px]">{item.startDate} – {item.endDate || "Present"}</span>
                  </div>
                  <p className="font-semibold text-gray-600 mb-1.5">{item.company}</p>
                  <ul className="space-y-1 text-gray-600 leading-relaxed">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>— {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. OLIVIA WILSON (Warm Terracotta & Sand Split Sidebar)
// ==========================================================================
export function OliviaWilsonTerracottaTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-white text-[#2B2D42] font-sans overflow-hidden shadow-2xl print:shadow-none flex">
      {/* Left Terracotta Sidebar */}
      <div className="w-[38%] bg-[#C97A63] text-white p-8 flex flex-col justify-between">
        <div className="space-y-7">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto">
            {b.photoUrl ? (
              <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#B2644E] flex items-center justify-center text-4xl font-bold">
                {(b.fullName || "O")[0]}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/40 pb-1 mb-2.5">
              {labels?.contact || "Contact"}
            </h3>
            <div className="text-xs space-y-1.5 text-white/90">
              <p>📞 {b.phone}</p>
              <p>✉️ {b.email}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/40 pb-1 mb-2.5">
              {labels?.skills || "Skills"}
            </h3>
            <div className="space-y-2 text-xs text-white/90">
              {skills.map((s: any, idx: number) => (
                <div key={idx}>
                  <p>{typeof s === "string" ? s : s.name}</p>
                  <div className="w-full h-1 bg-white/30 rounded-full mt-1">
                    <div className="h-full bg-white rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-white/40 pb-1 mb-2.5">
              {labels?.education || "Education"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-white">{e.degree}</p>
                <p className="text-white/80">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Main Body */}
      <div className="w-[62%] p-9 space-y-7">
        <div>
          <h1 className="text-3xl font-extrabold tracking-wide uppercase text-[#C97A63]">{b.fullName || "Olivia Wilson"}</h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-600 mt-0.5">{b.role || "Graphic & UI Designer"}</p>
          <p className="text-xs text-gray-600 mt-3 leading-relaxed">
            {b.summary || "Creative designer passionate about user-focused visual branding, layout elegance, and interactive mobile prototypes."}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C97A63] border-b-2 border-[#C97A63] pb-1 mb-4">
            {labels?.experience || "Work Experience"}
          </h3>
          <div className="space-y-5">
            {exp.map((item: any, idx: number) => (
              <div key={idx} className="text-xs border-l-2 border-[#C97A63]/30 pl-3">
                <h4 className="font-bold text-gray-900 text-xs uppercase">{item.role}</h4>
                <p className="text-[#C97A63] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                <ul className="mt-1 space-y-1 text-gray-600 leading-relaxed">
                  {(item.bullets || []).map((bullet: string, bIdx: number) => (
                    <li key={bIdx}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. PEDRO FERNANDES (Dark Executive Sidebar / Clean Monochrome)
// ==========================================================================
export function PedroFernandesDarkTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-white text-[#111] font-sans flex shadow-2xl print:shadow-none">
      {/* Dark Sidebar */}
      <div className="w-[35%] bg-[#1E2022] text-white p-8 space-y-7">
        <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-600 mx-auto">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-3xl font-bold text-gray-300">
              {(b.fullName || "P")[0]}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-700 pb-1 mb-2.5">
            {labels?.contact || "Contact"}
          </h3>
          <div className="text-xs space-y-1.5 text-gray-300">
            <p>{b.phone}</p>
            <p>{b.email}</p>
            <p>{b.location}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-700 pb-1 mb-2.5">
            {labels?.skills || "Expertise"}
          </h3>
          <div className="space-y-1.5 text-xs text-gray-300">
            {skills.map((s: any, idx: number) => (
              <p key={idx}>▪ {typeof s === "string" ? s : s.name}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-700 pb-1 mb-2.5">
            {labels?.education || "Education"}
          </h3>
          {edu.map((e: any, idx: number) => (
            <div key={idx} className="text-xs mb-2">
              <p className="font-bold text-white">{e.degree}</p>
              <p className="text-gray-400">{e.institution} ({e.year || e.gradYear})</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main White Content */}
      <div className="w-[65%] p-9 space-y-7">
        <div className="border-b-2 border-black pb-5">
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">{b.fullName || "Pedro Fernandes"}</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{b.role || "Executive Project Director"}</p>
          <p className="text-xs text-gray-700 mt-3 leading-relaxed font-normal">
            {b.summary || "Accomplished director with 10+ years delivering cross-functional enterprise programs, operational excellence, and measurable growth."}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-4">
            {labels?.experience || "Experience Record"}
          </h3>
          <div className="space-y-5">
            {exp.map((item: any, idx: number) => (
              <div key={idx} className="text-xs border-l-2 border-black pl-3">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{item.role}</span>
                  <span className="text-gray-500 font-normal">{item.startDate} - {item.endDate || "Present"}</span>
                </div>
                <p className="text-gray-600 font-semibold mb-1">{item.company}</p>
                <ul className="space-y-1 text-gray-600 leading-relaxed">
                  {(item.bullets || []).map((bullet: string, bIdx: number) => (
                    <li key={bIdx}>- {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. HELENA MORALES (Soft Blush & Lavender Organic Fluid Wave)
// ==========================================================================
export function HelenaMoralesBlushTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FFFBFB] text-[#333] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Soft Pastel Fluid Wave Graphic */}
      <svg className="absolute top-0 right-0 w-[450px] h-[300px] pointer-events-none opacity-60" viewBox="0 0 500 300" fill="none">
        <path d="M100 0 C 300 160, 400 30, 500 150 L 500 0 Z" fill="#F8D7DA" />
        <path d="M0 0 C 200 180, 350 50, 500 240 L 500 0 Z" fill="#E2D9F3" opacity="0.6" />
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-8 pb-6 border-b-2 border-[#E2D9F3]">
        <div className="w-28 h-28 rounded-full ring-4 ring-[#E2D9F3] p-1 bg-white shadow-md overflow-hidden flex-shrink-0 flex items-center justify-center">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-3xl font-bold text-[#6F42C1]">{(b.fullName || "H")[0]}</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[#2A1B4E] uppercase tracking-wide">{b.fullName || "Helena Morales"}</h1>
          <p className="text-sm font-semibold text-[#8E44AD] mt-0.5">{b.role || "Content Strategist & Copy Lead"}</p>
          <p className="text-xs text-gray-600 mt-2 max-w-xl leading-relaxed">
            {b.summary || "Creative wordsmith crafting viral digital narratives, high-converting social campaigns, and memorable brand voices."}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8">
        <div className="col-span-5 bg-[#FBF7FF] border border-[#E2D9F3] rounded-2xl p-5 space-y-6 shadow-sm">
          <div>
            <h3 className="text-xs font-bold text-[#8E44AD] uppercase tracking-wider mb-2">
              {labels?.contact || "Contact"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1.5">
              <p>📍 {b.location}</p>
              <p>✉️ {b.email}</p>
              <p>📞 {b.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#8E44AD] uppercase tracking-wider mb-3">
              {labels?.skills || "Skills"}
            </h3>
            <div className="space-y-2">
              {skills.map((s: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <span className="text-gray-800 font-medium">{typeof s === "string" ? s : s.name}</span>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8E44AD] to-[#F8D7DA] rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#8E44AD] uppercase tracking-wider mb-2">
              {labels?.education || "Education"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-1.5">
                <p className="font-bold text-gray-800">{e.degree}</p>
                <p className="text-gray-500">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#2A1B4E] uppercase tracking-wider mb-4 border-b border-[#E2D9F3] pb-1">
              {labels?.experience || "Experience"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#8E44AD]/40 pl-3">
                  <h4 className="font-bold text-gray-900">{item.role}</h4>
                  <p className="text-[#8E44AD] font-medium">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1 space-y-1 text-gray-600">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
