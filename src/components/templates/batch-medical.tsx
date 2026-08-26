import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. ASTRID EMERALD (Occupational Therapist - 3D Wireframe Hand, Brain & Spheres)
// ==========================================================================
export function AstridEmeraldTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const certs = Array.isArray(data.certifications) ? data.certifications : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#071612] text-[#F3ECE7] font-sans p-9 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      {/* Background SVG Fluid Ribbons */}
      <svg className="absolute top-0 right-0 w-[500px] h-[380px] pointer-events-none opacity-85" viewBox="0 0 500 400" fill="none">
        <path d="M60 0 C 220 140, 360 40, 500 190 L 500 0 Z" fill="url(#roseGoldRibbon1)" />
        <path d="M20 0 C 180 180, 320 70, 500 260 L 500 0 Z" fill="url(#roseGoldRibbon2)" opacity="0.65" />
        <defs>
          <linearGradient id="roseGoldRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5CBA7" />
            <stop offset="50%" stopColor="#E6A88B" />
            <stop offset="100%" stopColor="#9C5A44" />
          </linearGradient>
          <linearGradient id="roseGoldRibbon2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5856C" />
            <stop offset="100%" stopColor="#FBEAE0" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D Wireframe Prop: Floating Sphere (Top Right) */}
      <svg className="absolute top-44 right-10 w-24 h-24 opacity-60 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="#E6A88B" strokeWidth="1">
        <circle cx="50" cy="50" r="45" strokeDasharray="3 3" opacity="0.4" />
        <ellipse cx="50" cy="50" rx="45" ry="18" />
        <ellipse cx="50" cy="50" rx="18" ry="45" />
        <ellipse cx="50" cy="50" rx="35" ry="35" strokeDasharray="2 2" />
        <line x1="5" y1="50" x2="95" y2="50" />
        <line x1="50" y1="5" x2="50" y2="95" />
      </svg>

      {/* 3D Wireframe Prop: Low-Poly Brain (Bottom Right) */}
      <svg className="absolute bottom-6 right-6 w-52 h-44 opacity-40 pointer-events-none" viewBox="0 0 200 160" fill="none" stroke="#E6A88B" strokeWidth="1.2">
        <polygon points="100,20 130,30 160,55 175,90 160,130 120,150 100,140 80,150 40,130 25,90 40,55 70,30" fill="rgba(230,168,139,0.06)" />
        <polygon points="100,20 100,140 70,110 55,80 70,45" />
        <polygon points="100,20 100,140 130,110 145,80 130,45" />
        <line x1="70" y1="45" x2="130" y2="45" />
        <line x1="55" y1="80" x2="145" y2="80" />
        <line x1="70" y1="110" x2="130" y2="110" />
        <circle cx="100" cy="20" r="3" fill="#F5CBA7" />
        <circle cx="160" cy="55" r="3" fill="#F5CBA7" />
        <circle cx="175" cy="90" r="3" fill="#F5CBA7" />
        <circle cx="40" cy="55" r="3" fill="#F5CBA7" />
        <circle cx="25" cy="90" r="3" fill="#F5CBA7" />
        <circle cx="100" cy="140" r="3" fill="#F5CBA7" />
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-7 pb-5 border-b border-[#E6A88B]/30">
        <div className="relative w-32 h-36 flex-shrink-0 flex items-center justify-center">
          <div
            className="w-32 h-36 bg-gradient-to-tr from-[#E6A88B] via-[#FFE6DC] to-[#9C5A44] p-[3.5px] shadow-[0_0_25px_rgba(230,168,139,0.4)]"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <div
              className="w-full h-full bg-[#0A221C] flex items-center justify-center overflow-hidden"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              {b.photoUrl ? (
                <img src={b.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <span className="text-4xl text-[#F5CBA7] font-extrabold">{(b.fullName || "A")[0]}</span>
                  <p className="text-[9px] uppercase tracking-widest text-[#E6A88B] mt-0.5">Therapy</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E6A88B]/15 border border-[#E6A88B]/40 text-[#F5CBA7] text-[10px] font-semibold tracking-wider uppercase mb-1">
            Clinical Practitioner
          </div>
          <h1 className="text-3xl font-black tracking-wide text-white uppercase">{b.fullName || "Astrid Vance"}</h1>
          <p className="text-lg font-bold text-[#E6A88B] mt-0.5">{b.role || "Occupational Therapist"}</p>
          <p className="text-xs text-[#D1DDD7] mt-2 leading-relaxed max-w-xl">
            {b.summary || "Empowering patients to regain independence through evidence-based neurological and motor rehabilitation protocols."}
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-12 gap-7">
        {/* Left Translucent Glass Column with Wireframe Hand */}
        <div className="col-span-5 relative bg-[#0B251F]/70 backdrop-blur-md rounded-2xl p-5 border border-[#E6A88B]/35 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-6">
          {/* Wireframe Hand Accent */}
          <div className="absolute -top-7 -right-4 w-14 h-14 bg-[#143B32] border border-[#E6A88B] rounded-full flex items-center justify-center shadow-lg pointer-events-none">
            <span className="text-2xl">🖐️</span>
          </div>

          <div>
            <h2 className="text-xs font-extrabold tracking-widest text-[#F5CBA7] uppercase border-b border-[#E6A88B]/30 pb-1 mb-3">
              {labels?.contact || "Contact Info"}
            </h2>
            <div className="space-y-2 text-xs text-[#E1EAE5]">
              {b.phone && <p className="flex items-center gap-2"><span className="text-[#E6A88B]">📞</span> {b.phone}</p>}
              {b.email && <p className="flex items-center gap-2"><span className="text-[#E6A88B]">✉️</span> {b.email}</p>}
              {b.location && <p className="flex items-center gap-2"><span className="text-[#E6A88B]">📍</span> {b.location}</p>}
              {b.linkedin && <p className="flex items-center gap-2"><span className="text-[#E6A88B]">🔗</span> {b.linkedin}</p>}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-extrabold tracking-widest text-[#F5CBA7] uppercase border-b border-[#E6A88B]/30 pb-1 mb-3">
              {labels?.skills || "Clinical Competencies"}
            </h2>
            <div className="space-y-3">
              {(skills.length > 0 ? skills : [
                { name: "Motor Rehabilitation" },
                { name: "Neurological Assessment" },
                { name: "Sensory Integration" },
                { name: "Adaptive Equipment Design" },
                { name: "Pediatric OT" }
              ]).map((s: any, idx: number) => {
                const name = typeof s === "string" ? s : s.name || "";
                return (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-[#F3ECE7] mb-1">
                      <span>{name}</span>
                      <span className="text-[10px] text-[#E6A88B]">95%</span>
                    </div>
                    <div className="w-full h-2 bg-[#04100D] rounded-full overflow-hidden border border-[#E6A88B]/25">
                      <div
                        className="h-full bg-gradient-to-r from-[#9C5A44] via-[#E6A88B] to-[#FFE6DC] rounded-full shadow-[0_0_10px_rgba(230,168,139,0.9)]"
                        style={{ width: `${85 + (idx % 3) * 5}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-extrabold tracking-widest text-[#F5CBA7] uppercase border-b border-[#E6A88B]/30 pb-1 mb-2">
              {labels?.certifications || "Licenses & Credentials"}
            </h2>
            <ul className="space-y-1.5 text-xs text-[#E1EAE5]">
              {(certs.length > 0 ? certs : [
                "NDT Certified (Neuro-Developmental)",
                "Certified Hand Therapist (CHT)",
                "Sensory Integration Certified (SIPT)"
              ]).map((c: any, idx: number) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#E6A88B]">◆</span>
                  <span>{typeof c === "string" ? c : c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Clinical Experience & Education */}
        <div className="col-span-7 space-y-6">
          <div>
            <h2 className="text-sm font-extrabold tracking-widest text-[#F5CBA7] uppercase border-b-2 border-[#E6A88B]/40 pb-1 mb-4 flex items-center justify-between">
              <span>{labels?.experience || "Clinical Experience"}</span>
              <span className="text-[10px] font-normal text-[#E6A88B]">Hospital & Outpatient</span>
            </h2>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="relative border-l-2 border-[#E6A88B]/50 pl-4 py-1">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#FFE6DC] shadow-[0_0_8px_#E6A88B]" />
                  <h3 className="text-sm font-bold text-white">{item.role}</h3>
                  <p className="text-xs font-semibold text-[#E6A88B]">{item.company} • <span className="text-gray-300 font-normal">{item.startDate} - {item.endDate || "Present"}</span></p>
                  <ul className="mt-1.5 space-y-1 text-xs text-[#D5E1DC]">
                    {(item.bullets || []).map((bText: string, bIdx: number) => (
                      <li key={bIdx} className="leading-relaxed">• {bText}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-extrabold tracking-widest text-[#F5CBA7] uppercase border-b-2 border-[#E6A88B]/40 pb-1 mb-3">
              {labels?.education || "Education & Degrees"}
            </h2>
            <div className="space-y-3">
              {edu.map((item: any, idx: number) => (
                <div key={idx} className="text-xs bg-[#0B251F]/40 p-3 rounded-lg border border-[#E6A88B]/20">
                  <h3 className="font-bold text-white text-xs">{item.degree}</h3>
                  <p className="text-[#E6A88B] font-medium">{item.institution} <span className="text-gray-400">({item.year || item.gradYear})</span></p>
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
// 2. AURA MIDWIFE (Soft Pastel Maternity - Watermark Silhouette & ECG Wave)
// ==========================================================================
export function AuraMidwifeTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FFF8F5] text-[#2D3748] font-sans p-9 overflow-hidden shadow-2xl print:shadow-none">
      {/* Top Flow Wave */}
      <svg className="absolute top-0 left-0 w-full h-44 pointer-events-none opacity-90" viewBox="0 0 1000 200" fill="none">
        <path d="M0 0 L1000 0 L1000 90 C 750 160, 450 40, 0 130 Z" fill="#FDE2D9" />
        <path d="M0 0 L1000 0 L1000 60 C 650 140, 300 20, 0 90 Z" fill="#F8BCAC" opacity="0.6" />
      </svg>

      {/* Maternity Silhouette Watermark */}
      <svg className="absolute right-8 bottom-12 w-64 h-64 opacity-15 pointer-events-none" viewBox="0 0 200 200" fill="#E07A5F">
        <circle cx="100" cy="60" r="28" />
        <path d="M60 180 C 60 120, 80 95, 110 95 C 130 95, 150 110, 150 150 C 150 175, 130 185, 100 185 Z" />
        <circle cx="135" cy="115" r="14" fill="#F8BCAC" />
        <path d="M120 160 C 120 135, 135 125, 150 135 C 160 145, 160 165, 140 170 Z" fill="#F8BCAC" />
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-8 pb-6 border-b-2 border-[#F8BCAC]/60">
        <div className="w-28 h-28 rounded-full ring-4 ring-[#E07A5F] p-1 bg-white shadow-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="text-center">
              <span className="text-3xl font-extrabold text-[#E07A5F]">{(b.fullName || "M")[0]}</span>
              <p className="text-[8px] font-bold text-[#81B29A] uppercase">Midwife</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">🌸</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E07A5F]">Maternity & Neonatal Care</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1D3557] uppercase tracking-wide">{b.fullName || "Emily Clarke, CNM"}</h1>
          <p className="text-lg font-bold text-[#E07A5F]">{b.role || "Certified Nurse Midwife"}</p>
          <p className="text-xs text-[#4A5568] mt-1.5 max-w-xl leading-relaxed">
            {b.summary || "Compassionate midwifery specialist dedicated to empowering mothers with natural childbirth, high-risk triage, and gentle postpartum neonatal guidance."}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-7">
        <div className="col-span-5 bg-[#FFF0EB] rounded-2xl p-5 border border-[#F8BCAC] space-y-6 shadow-sm">
          <div>
            <h3 className="text-xs font-extrabold text-[#E07A5F] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>🩺</span> {labels?.contact || "Clinical Contact"}
            </h3>
            <div className="space-y-1.5 text-xs text-gray-700">
              <p>📧 {b.email}</p>
              <p>📱 {b.phone}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold text-[#E07A5F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>🌿</span> {labels?.skills || "Midwifery Skills"}
            </h3>
            <div className="space-y-2.5">
              {(skills.length > 0 ? skills : [
                "Labor & Delivery Management",
                "Fetal Heart Monitoring (EFM)",
                "Neonatal Resuscitation (NRP)",
                "Water Birth Protocols",
                "Lactation Consultation"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-semibold text-gray-800 mb-1">
                    <span>{typeof s === "string" ? s : s.name}</span>
                  </div>
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#F8BCAC]">
                    <div className="h-full bg-gradient-to-r from-[#F8BCAC] to-[#E07A5F] rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-extrabold text-[#1D3557] uppercase tracking-wider mb-3.5 border-b border-[#F8BCAC] pb-1 flex items-center justify-between">
              <span>{labels?.experience || "Clinical Practice"}</span>
              <span className="text-[10px] text-[#E07A5F] font-semibold">L&D Ward</span>
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#E07A5F] pl-3 py-0.5">
                  <h4 className="font-bold text-gray-900 text-xs">{item.role}</h4>
                  <p className="text-[#E07A5F] font-semibold">{item.company} • {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-gray-600">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-[#1D3557] uppercase tracking-wider mb-2 border-b border-[#F8BCAC] pb-1">
              {labels?.education || "Education & Degrees"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-[#E07A5F]">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Heartbeat ECG Divider Prop */}
      <div className="relative z-10 mt-8 pt-4 border-t border-[#F8BCAC]/60 flex items-center gap-3">
        <svg className="w-full h-8 stroke-[#E07A5F] fill-none stroke-[2]" viewBox="0 0 600 40">
          <path d="M0 20 L200 20 L210 5 L220 35 L230 10 L240 25 L250 20 L600 20" />
        </svg>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. CYBER PARAMEDIC (Emergency Trauma - Siren Bar, Star of Life & ECG Pulse)
// ==========================================================================
export function CyberParamedicTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#090D14] text-[#E0E6ED] font-mono p-9 overflow-hidden shadow-2xl border-2 border-cyan-500/40">
      {/* Top Emergency Light Bar / Siren Graphic Prop */}
      <div className="w-full h-3 bg-gradient-to-r from-red-600 via-yellow-400 to-cyan-500 rounded-t shadow-[0_0_15px_rgba(6,182,212,0.8)] mb-6 animate-pulse" />

      {/* Header */}
      <div className="flex items-center gap-6 mb-7 pb-5 border-b border-cyan-500/30">
        <div className="relative w-28 h-28 border-2 border-cyan-400 bg-cyan-950/40 rounded-xl p-1 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center flex-shrink-0">
          {/* Paramedic Cross Badge */}
          <span className="absolute -top-3 -right-3 text-xl bg-red-600 text-white rounded-full p-1 shadow-[0_0_10px_#EF4444]">🚑</span>
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-center">
              <span className="text-3xl text-cyan-400 font-black">{(b.fullName || "P")[0]}</span>
              <p className="text-[8px] text-red-400 font-bold">MEDIC</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 tracking-widest uppercase">
            <span>⚠️ CRITICAL CARE & TRAUMA RESPONSE</span>
          </div>
          <h1 className="text-3xl font-black text-cyan-400 tracking-wider uppercase">{b.fullName || "Harold Vance, FP-C"}</h1>
          <p className="text-sm font-bold text-red-500 tracking-widest mt-0.5">{b.role || "FLIGHT PARAMEDIC / TRAUMA SPECIALIST"}</p>
          <p className="text-xs text-gray-300 mt-2 font-sans max-w-xl">
            {b.summary || "High-intensity aeromedical critical care paramedic with 8+ years managing advanced airway stabilization and mass-casualty triage."}
          </p>
        </div>
      </div>

      {/* ECG Monitor Pulse Rail */}
      <div className="w-full h-7 bg-[#05080E] border border-cyan-500/30 rounded px-2 flex items-center mb-6 shadow-inner">
        <span className="text-[10px] text-cyan-400 font-bold mr-2">ECG LEAD II: 78 BPM</span>
        <svg className="w-full h-5 stroke-emerald-400 fill-none stroke-2" viewBox="0 0 500 30">
          <path d="M0 15 L140 15 L150 5 L160 25 L170 2 L180 20 L190 15 L500 15" />
        </svg>
      </div>

      <div className="grid grid-cols-12 gap-6 font-sans">
        <div className="col-span-5 bg-[#0F1626] border border-cyan-500/30 rounded-xl p-5 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">[ {labels?.contact || "DISPATCH & COMMS"} ]</h3>
            <div className="text-xs text-gray-300 space-y-1.5 font-mono">
              <p>📡 {b.phone}</p>
              <p>📟 {b.email}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3">[ {labels?.skills || "TRAUMA GAUGES"} ]</h3>
            <div className="space-y-3">
              {(skills.length > 0 ? skills : [
                "Advanced Airway (RSI)",
                "Ventilator Management",
                "Flight Trauma Transport",
                "ACLS / PALS / ITLS Protocol",
                "Critical Pharmacology"
              ]).map((s: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs text-gray-200 mb-1 font-mono">
                    <span>{typeof s === "string" ? s : s.name}</span>
                    <span className="text-cyan-400">100%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-900 rounded border border-cyan-500/30">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-red-500 rounded shadow-[0_0_8px_rgba(6,182,212,0.9)]" style={{ width: "95%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3 border-b border-cyan-500/30 pb-1">
              [ {labels?.experience || "INCIDENT & FLIGHT RECORD"} ]
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-cyan-500 pl-3">
                  <h4 className="text-xs font-bold text-white uppercase">{item.role}</h4>
                  <p className="text-xs text-cyan-400 font-mono">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-gray-300 font-sans">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>&gt; {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2 border-b border-cyan-500/30 pb-1">
              [ {labels?.education || "LICENSES & BOARD CERT"} ]
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-white">{e.degree}</p>
                <p className="text-gray-400 font-mono">{e.institution} | {e.year || e.gradYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. ROYAL DENTAL (3D Dental Tooth, Mirror Prop & Liquid Gold Ribbons)
// ==========================================================================
export function RoyalDentalTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#140821] text-[#F3EDFB] font-sans p-9 overflow-hidden shadow-2xl">
      {/* 3D Gold Ribbon Background Wave */}
      <svg className="absolute top-0 right-0 w-[550px] h-[350px] pointer-events-none opacity-80" viewBox="0 0 500 350" fill="none">
        <path d="M0 80 C 200 200, 350 20, 500 160 L 500 0 L 0 0 Z" fill="url(#liquidGoldRibbon)" />
        <defs>
          <linearGradient id="liquidGoldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1C5" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6D1C" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D Dental Tooth Graphic Prop (Top Right) */}
      <div className="absolute top-6 right-8 w-24 h-28 pointer-events-none flex flex-col items-center">
        <span className="text-6xl drop-shadow-[0_0_15px_rgba(255,241,197,0.6)]">🦷</span>
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#D4AF37] mt-1">Cosmetic DDS</span>
      </div>

      {/* Header with Diamond Cut Frame */}
      <div className="relative z-10 flex items-center gap-7 mb-8 pb-6 border-b border-[#D4AF37]/40">
        <div className="w-28 h-28 rotate-45 border-2 border-[#D4AF37] bg-[#291345] p-1 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)] flex-shrink-0">
          <div className="-rotate-45 w-full h-full flex items-center justify-center">
            {b.photoUrl ? (
              <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <span className="text-3xl font-extrabold text-[#D4AF37]">{(b.fullName || "D")[0]}</span>
                <p className="text-[8px] text-purple-200">SURGEON</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="inline-block px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFF1C5] text-[10px] font-bold tracking-widest uppercase mb-1">
            Certified Dental Surgeon
          </div>
          <h1 className="text-3xl font-black text-[#FFF1C5] tracking-wide uppercase">{b.fullName || "Dr. Sarah Johnson, DDS"}</h1>
          <p className="text-lg font-bold text-[#D4AF37] mt-0.5">{b.role || "Lead Cosmetic & Surgical Dentist"}</p>
          <p className="text-xs text-purple-200/90 mt-2 max-w-lg leading-relaxed">
            {b.summary || "Specializing in advanced aesthetic veneers, full-mouth implant rehabilitation, and precision restorative dental surgery."}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-7">
        <div className="col-span-5 bg-[#25103E]/80 rounded-2xl p-5 border border-[#D4AF37]/30 space-y-6 shadow-xl">
          <div>
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
              <span>📍</span> {labels?.contact || "Clinic Contact"}
            </h3>
            <div className="text-xs text-purple-200 space-y-1.5">
              <p>✉️ {b.email}</p>
              <p>📞 {b.phone}</p>
              <p>🏢 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <span>⭐</span> {labels?.skills || "Clinical Procedures"}
            </h3>
            <div className="space-y-2.5">
              {(skills.length > 0 ? skills : [
                "Porcelain Veneers & Smile Design",
                "Dental Implantology (CBCT 3D)",
                "Invisalign Clear Aligners",
                "Surgical Extractions",
                "Rotary Endodontics"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs flex justify-between items-center text-purple-100">
                  <span className="font-medium">{typeof s === "string" ? s : s.name}</span>
                  <span className="text-[#D4AF37] tracking-widest">★★★★★</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-3.5 border-b border-[#D4AF37]/30 pb-1">
              {labels?.experience || "Practice & Surgical Experience"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-[#D4AF37]/60 pl-3">
                  <h4 className="text-xs font-bold text-white">{item.role}</h4>
                  <p className="text-xs text-[#D4AF37] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-purple-200/85">
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
              {labels?.education || "Fellowships & Education"}
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
