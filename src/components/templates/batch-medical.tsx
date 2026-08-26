import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// 1. ASTRID EMERALD (Occupational Therapist / Luxury Dark Emerald & Rose Gold)
export function AstridEmeraldTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const certs = Array.isArray(data.certifications) ? data.certifications : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1100px] bg-[#071714] text-[#EAEAEA] font-sans p-8 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      <svg className="absolute top-0 right-0 w-[450px] h-[350px] pointer-events-none opacity-80" viewBox="0 0 500 400" fill="none">
        <path d="M100 0 C 250 120, 350 50, 500 180 L 500 0 Z" fill="url(#roseGoldGrad1)" />
        <path d="M50 0 C 200 160, 300 80, 500 240 L 500 0 Z" fill="url(#roseGoldGrad2)" opacity="0.6" />
        <defs>
          <linearGradient id="roseGoldGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E6A88B" />
            <stop offset="100%" stopColor="#C5856C" />
          </linearGradient>
          <linearGradient id="roseGoldGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B36851" />
            <stop offset="100%" stopColor="#D99B82" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="absolute bottom-0 left-0 w-full h-[220px] pointer-events-none opacity-85" viewBox="0 0 1000 300" fill="none">
        <path d="M0 150 C 300 320, 700 80, 1000 250 L 1000 300 L 0 300 Z" fill="url(#roseGoldGrad1)" />
        <path d="M0 190 C 250 100, 600 280, 1000 160 L 1000 300 L 0 300 Z" fill="url(#roseGoldGrad2)" opacity="0.5" />
      </svg>

      <div className="relative z-10 flex items-center gap-8 mb-8 pb-6 border-b border-[#E6A88B]/20">
        <div className="relative w-32 h-36 flex-shrink-0 flex items-center justify-center">
          <div
            className="w-32 h-36 bg-gradient-to-tr from-[#E6A88B] via-[#F4D0C2] to-[#B36851] p-[3px] shadow-[0_0_20px_rgba(230,168,139,0.3)]"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <div
              className="w-full h-full bg-[#0B231E] flex items-center justify-center overflow-hidden"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              {b.photoUrl ? (
                <img src={b.photoUrl} alt={b.fullName || "Avatar"} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-[#E6A88B] font-bold">{(b.fullName || "A")[0]}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold tracking-wider text-white uppercase">{b.fullName || "Astrid Vance"}</h1>
          <p className="text-xl font-medium text-[#E6A88B] mt-1">{b.role || "Occupational Therapist"}</p>
          {b.summary && <p className="text-xs text-gray-300 mt-2 leading-relaxed max-w-xl">{b.summary}</p>}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-6">
        <div className="col-span-5 bg-[#0B231E]/60 backdrop-blur-md rounded-2xl p-5 border border-[#E6A88B]/30 shadow-lg space-y-6">
          <div>
            <h2 className="text-xs font-bold tracking-widest text-[#E6A88B] uppercase mb-3">{labels?.contact || "Contact"}</h2>
            <div className="space-y-1.5 text-xs text-gray-200">
              {b.phone && <p>📞 {b.phone}</p>}
              {b.email && <p>✉️ {b.email}</p>}
              {b.location && <p>📍 {b.location}</p>}
              {b.linkedin && <p>🔗 {b.linkedin}</p>}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-widest text-[#E6A88B] uppercase mb-3">{labels?.skills || "Skills"}</h2>
            <div className="space-y-3">
              {skills.map((s: any, idx: number) => {
                const name = typeof s === "string" ? s : s.name || "";
                return (
                  <div key={idx}>
                    <div className="flex justify-between text-xs text-gray-200 mb-1">
                      <span>{name}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#061411] rounded-full overflow-hidden border border-[#E6A88B]/20">
                      <div className="h-full bg-gradient-to-r from-[#E6A88B] to-[#F4D0C2] rounded-full shadow-[0_0_8px_rgba(230,168,139,0.8)]" style={{ width: "88%" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {certs.length > 0 && (
            <div>
              <h2 className="text-xs font-bold tracking-widest text-[#E6A88B] uppercase mb-2">{labels?.certifications || "Certifications"}</h2>
              <ul className="space-y-1 text-xs text-gray-200">
                {certs.map((c: any, idx: number) => (
                  <li key={idx}>• {typeof c === "string" ? c : c.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-span-7 space-y-6 pl-2">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-[#E6A88B] uppercase mb-4">{labels?.experience || "Experience"}</h2>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-[#E6A88B]/40 pl-4 py-0.5">
                  <h3 className="text-sm font-bold text-white">{item.role}</h3>
                  <p className="text-xs text-[#E6A88B] font-medium">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-gray-300">
                    {(item.bullets || []).map((bText: string, bIdx: number) => (
                      <li key={bIdx}>• {bText}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-widest text-[#E6A88B] uppercase mb-3">{labels?.education || "Education"}</h2>
            <div className="space-y-3">
              {edu.map((item: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <h3 className="font-bold text-white">{item.degree}</h3>
                  <p className="text-[#E6A88B]">{item.institution} | {item.year || item.gradYear}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. AURA MIDWIFE (Soft Pastel Organic / Maternity & Clinical)
export function AuraMidwifeTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1100px] bg-[#FFFBF7] text-[#333] font-sans p-8 overflow-hidden shadow-2xl print:shadow-none">
      <div className="flex items-center gap-6 mb-8 border-b-2 border-[#F6C6BA] pb-6">
        <div className="w-28 h-28 rounded-full ring-4 ring-[#F6C6BA] p-1 overflow-hidden bg-white shadow-md">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="w-full h-full bg-[#FFEAE5] flex items-center justify-center text-3xl font-bold text-[#D96B54]">
              {(b.fullName || "M")[0]}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#1B365D] tracking-wide uppercase">{b.fullName || "Emily Clarke"}</h1>
          <p className="text-lg font-semibold text-[#D96B54]">{b.role || "Certified Midwife"}</p>
          <p className="text-xs text-gray-600 mt-1 max-w-lg">{b.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-5 bg-[#FFEFEA] rounded-2xl p-5 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-[#D96B54] uppercase tracking-wider mb-2">{labels?.contact || "Contact"}</h3>
            <p className="text-xs text-gray-700">{b.email}</p>
            <p className="text-xs text-gray-700">{b.phone}</p>
            <p className="text-xs text-gray-700">{b.location}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#D96B54] uppercase tracking-wider mb-2">{labels?.skills || "Skills"}</h3>
            <div className="space-y-2">
              {skills.map((s: any, idx: number) => (
                <div key={idx} className="text-xs text-gray-800">
                  <span>{typeof s === "string" ? s : s.name}</span>
                  <div className="w-full h-1.5 bg-white rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-[#D96B54] rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wider mb-3">{labels?.experience || "Experience"}</h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <h4 className="font-bold text-gray-900">{item.role}</h4>
                  <p className="text-[#D96B54] font-medium">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1 space-y-1 text-gray-600">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1B365D] uppercase tracking-wider mb-2">{labels?.education || "Education"}</h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-gray-600">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. CYBER PARAMEDIC (Dark Mode Neon / Emergency HUD)
export function CyberParamedicTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1100px] bg-[#0A0D14] text-[#E0E6ED] font-mono p-8 overflow-hidden shadow-2xl border border-cyan-500/30">
      <div className="flex items-center gap-6 mb-8 pb-6 border-b border-cyan-500/40">
        <div className="w-28 h-28 border-2 border-cyan-400 bg-cyan-950/40 rounded-lg p-1 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded" />
          ) : (
            <span className="text-3xl text-cyan-400 font-bold">{(b.fullName || "P")[0]}</span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-black text-cyan-400 tracking-wider uppercase">{b.fullName || "Harold Vance"}</h1>
          <p className="text-sm font-bold text-rose-500 tracking-widest mt-1">{b.role || "PARAMEDIC / EMERGENCY SPECIALIST"}</p>
          <p className="text-xs text-gray-400 mt-2 font-sans max-w-xl">{b.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 font-sans">
        <div className="col-span-5 bg-[#0F1420] border border-cyan-500/20 rounded-lg p-4 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">[ {labels?.contact || "COMMS"} ]</h3>
            <div className="text-xs text-gray-300 space-y-1">
              <p>{b.phone}</p>
              <p>{b.email}</p>
              <p>{b.location}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3">[ {labels?.skills || "METRICS"} ]</h3>
            <div className="space-y-3">
              {skills.map((s: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>{typeof s === "string" ? s : s.name}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-rose-500 rounded shadow-[0_0_8px_rgba(6,182,212,0.8)]" style={{ width: "90%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3">[ {labels?.experience || "SERVICE RECORD"} ]</h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l border-cyan-500/40 pl-3">
                  <h4 className="text-xs font-bold text-white uppercase">{item.role}</h4>
                  <p className="text-xs text-cyan-400">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1 space-y-1 text-xs text-gray-300">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>&gt; {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">[ {labels?.education || "ACADEMICS"} ]</h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-white">{e.degree}</p>
                <p className="text-gray-400">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. ROYAL DENTAL (Deep Violet & Liquid Gold Ribbon)
export function RoyalDentalTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1100px] bg-[#160B24] text-[#F3EDFB] font-sans p-8 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-6 mb-8 pb-6 border-b border-[#E5B54F]/30">
        <div className="w-28 h-28 rotate-45 border-2 border-[#E5B54F] bg-[#2A1447] p-1 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(229,181,79,0.4)]">
          <div className="-rotate-45 w-full h-full flex items-center justify-center">
            {b.photoUrl ? (
              <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-[#E5B54F]">{(b.fullName || "D")[0]}</span>
            )}
          </div>
        </div>
        <div className="pl-4">
          <h1 className="text-3xl font-extrabold text-[#E5B54F] tracking-wide uppercase">{b.fullName || "Dr. Sarah Johnson"}</h1>
          <p className="text-lg font-medium text-purple-200">{b.role || "Lead Dental Surgeon"}</p>
          <p className="text-xs text-purple-300/80 mt-1 max-w-lg">{b.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5 bg-[#25123D]/80 rounded-xl p-5 border border-[#E5B54F]/20 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-[#E5B54F] uppercase tracking-widest mb-2">{labels?.contact || "Contact"}</h3>
            <div className="text-xs text-purple-200 space-y-1">
              <p>{b.email}</p>
              <p>{b.phone}</p>
              <p>{b.location}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#E5B54F] uppercase tracking-widest mb-3">{labels?.skills || "Clinical Skills"}</h3>
            <div className="space-y-2">
              {skills.map((s: any, idx: number) => (
                <div key={idx} className="text-xs flex justify-between items-center text-purple-100">
                  <span>{typeof s === "string" ? s : s.name}</span>
                  <span className="text-[#E5B54F]">●●●●○</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#E5B54F] uppercase tracking-widest mb-3">{labels?.experience || "Practice Experience"}</h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-[#E5B54F]/40 pl-3">
                  <h4 className="text-xs font-bold text-white">{item.role}</h4>
                  <p className="text-xs text-[#E5B54F]">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1 space-y-1 text-xs text-purple-200/80">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#E5B54F] uppercase tracking-widest mb-2">{labels?.education || "Education"}</h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-white">{e.degree}</p>
                <p className="text-[#E5B54F]">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
