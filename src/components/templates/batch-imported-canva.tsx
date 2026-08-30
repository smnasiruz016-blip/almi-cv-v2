import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. CHLOE VALLET STYLE (Mind-Map Radial Graphiste Layout)
// ==========================================================================
export function MindMapGraphisteTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FAF8F5] text-[#2C221E] font-serif p-10 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      {/* Central Circular Avatar & Name */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
        <div className="w-40 h-40 rounded-full border-4 border-[#8B3A2B] overflow-hidden shadow-xl mx-auto bg-white">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#EADCC9] flex items-center justify-center text-3xl font-bold text-[#8B3A2B]">
              {(b.fullName || "C")[0]}
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold text-[#8B3A2B] mt-3 uppercase font-sans tracking-wide">
          {b.fullName || "Chloé Vallet"}
        </h1>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-600 font-sans mt-0.5">
          {b.role || "Graphiste"}
        </p>
      </div>

      {/* Radial Mind Map Grid Content */}
      <div className="relative z-10 grid grid-cols-2 gap-x-32 gap-y-32 pt-6 font-sans">
        <div className="bg-white/90 p-4 rounded-xl border border-[#D9C3B0] shadow-sm space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.contact || "Coordonnées"}
          </h3>
          <div className="text-xs text-gray-700 space-y-0.5">
            <p>📍 {b.location}</p>
            <p>📞 {b.phone}</p>
            <p>✉️ {b.email}</p>
          </div>
        </div>

        <div className="bg-white/90 p-4 rounded-xl border border-[#D9C3B0] shadow-sm space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.summary || "À propos de moi"}
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            {b.summary || "Fraîchement diplômée, je recherche un poste de graphiste en agence de communication."}
          </p>
        </div>

        <div className="bg-white/90 p-4 rounded-xl border border-[#D9C3B0] shadow-sm space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.skills || "Compétences principales"}
          </h3>
          <div className="text-xs text-gray-700 space-y-1">
            {skills.map((s: any, idx: number) => (
              <p key={idx}>• {typeof s === "string" ? s : s.name}</p>
            ))}
          </div>
        </div>

        <div className="bg-white/90 p-4 rounded-xl border border-[#D9C3B0] shadow-sm space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.education || "Formation"}
          </h3>
          <div className="text-xs text-gray-700 space-y-1">
            {edu.map((e: any, idx: number) => (
              <div key={idx}>
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-gray-500">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. SACHA DUBOIS STYLE (Modern Red & White Event Manager)
// ==========================================================================
export function SachaDuboisEventTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-white text-[#1A1A1A] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Top Right Red Wave Banner */}
      <svg className="absolute top-0 right-0 w-[400px] h-[220px] pointer-events-none" viewBox="0 0 500 250" fill="none">
        <path d="M100 0 C 300 0, 450 150, 500 250 L 500 0 Z" fill="#C51E2E" />
      </svg>

      {/* Header & Circular Photo */}
      <div className="flex justify-between items-start mb-10 pt-4">
        <div className="space-y-2 max-w-[400px]">
          <h1 className="text-4xl font-black uppercase text-[#C51E2E] tracking-tight">{b.fullName || "Sacha Dubois"}</h1>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-700">{b.role || "Chargée de Projet"}</p>
        </div>
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 flex-shrink-0">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center font-bold">PHOTO</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 space-y-6 bg-red-50/50 p-5 rounded-xl border border-red-100">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C51E2E] mb-2">
              {labels?.contact || "Contact"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1">
              <p>🏠 {b.location}</p>
              <p>📞 {b.phone}</p>
              <p>✉️ {b.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C51E2E] mb-2">
              {labels?.skills || "Compétences"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1.5">
              {skills.map((s: any, idx: number) => (
                <p key={idx}>• {typeof s === "string" ? s : s.name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-8 space-y-6">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-[#C51E2E] border-b-2 border-[#C51E2E] pb-1 mb-4">
              {labels?.experience || "Expérience professionnelle"}
            </h3>
            <div className="space-y-5">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#C51E2E] pl-3">
                  <h4 className="font-bold text-gray-900 text-sm">{item.role}</h4>
                  <p className="text-[#C51E2E] font-semibold">{item.company} • {item.startDate} - {item.endDate || "Present"}</p>
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

// ==========================================================================
// 3. CLÉMENCE LAURENT STYLE (Clipboard & Handwritten Notepad)
// ==========================================================================
export function ClipboardNotepadTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#1E293B] p-8 flex items-center justify-center font-sans shadow-2xl">
      <div className="w-full max-w-[785px] min-h-[1065px] bg-[#FFF] text-[#111] p-10 shadow-2xl relative border border-gray-400">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 border border-gray-500 rounded shadow flex items-center justify-center">
          <div className="w-28 h-2.5 bg-gray-600 rounded-sm" />
        </div>

        <div className="flex justify-between items-start mb-8 pt-4 border-b border-gray-300 pb-6">
          <div className="space-y-2 max-w-[420px]">
            <h3 className="text-xs font-black uppercase text-gray-500 font-mono">Résumé :</h3>
            <p className="text-sm font-handwriting text-gray-800 leading-relaxed">
              {b.summary || "Je suis designer graphique freelance depuis 3 ans, spécialisée dans la photo et le branding."}
            </p>
          </div>
          <div className="bg-white p-2 pb-6 shadow-md border border-gray-300 rotate-2 w-36">
            {b.photoUrl ? (
              <img src={b.photoUrl} alt="Polaroid" className="w-full h-28 object-cover" />
            ) : (
              <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">PHOTO</div>
            )}
            <p className="text-[10px] text-center font-handwriting mt-2 text-gray-600">{b.fullName || "Clémence Laurent"}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 font-handwriting text-base">
          <div className="col-span-5 space-y-6 bg-gray-50 p-4 rounded border border-gray-200">
            <div>
              <h4 className="text-xs font-black uppercase text-gray-700 font-mono mb-2">Services :</h4>
              <ul className="text-sm text-gray-800 space-y-1">
                {skills.map((s: any, idx: number) => (
                  <li key={idx}>• {typeof s === "string" ? s : s.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-gray-700 font-mono mb-2">Coordonnées :</h4>
              <p className="text-sm text-gray-800">{b.phone}</p>
              <p className="text-sm text-gray-800">{b.email}</p>
              <p className="text-sm text-gray-800">{b.location}</p>
            </div>
          </div>

          <div className="col-span-7 space-y-6 font-sans">
            <div>
              <h4 className="text-xs font-black uppercase text-gray-700 font-mono mb-3 border-b border-gray-300 pb-1">
                {labels?.experience || "Expériences passées :"}
              </h4>
              <div className="space-y-4 text-xs">
                {exp.map((item: any, idx: number) => (
                  <div key={idx}>
                    <p className="font-bold text-gray-900">{item.role} chez {item.company}</p>
                    <p className="text-gray-500 font-mono text-[10px]">{item.startDate} - {item.endDate || "Present"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. JONATHAN MARTIN STYLE (Security ID Badge & Minimal Grid)
// ==========================================================================
export function SecurityBadgeTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#EFECE6] text-[#111] font-sans p-10 overflow-hidden shadow-2xl border-4 border-gray-800 print:shadow-none">
      <div className="absolute top-6 right-10 w-72 bg-white border-2 border-gray-400 p-3 shadow-lg rounded rotate-1">
        <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
          <span className="text-[10px] font-mono font-bold text-gray-500">n° 0123456</span>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-14 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
            {b.photoUrl ? (
              <img src={b.photoUrl} alt="Badge" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-gray-600 flex items-center justify-center h-full">ID</span>
            )}
          </div>
          <div>
            <h4 className="text-xs font-black uppercase text-gray-900">{b.fullName || "Jonathan Martin"}</h4>
            <div className="w-28 h-6 bg-gray-900 mt-2 rounded flex items-center justify-center text-[8px] font-mono text-white tracking-widest">
              ||| |||| || |||
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-12">
        <div className="border-b-2 border-gray-800 pb-6 max-w-[450px]">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900">Me contacter :</h1>
          <div className="text-xs text-gray-700 mt-3 space-y-1 font-mono">
            <p>📞 {b.phone}</p>
            <p>📍 {b.location}</p>
            <p>✉️ {b.email}</p>
          </div>
        </div>

        <div className="border-b-2 border-gray-800 pb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3">{labels?.skills || "Compétences :"}</h3>
          <div className="flex gap-4 text-xs font-semibold text-gray-800 flex-wrap">
            {skills.map((s: any, idx: number) => (
              <div key={idx} className="bg-white border border-gray-400 px-4 py-2 rounded shadow-sm">
                ✓ {typeof s === "string" ? s : s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 5. ELSA BELVAUX STYLE (Dotted Grid Notebook & Yellow Highlights)
// ==========================================================================
export function DottedNotebookTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#F7F3E9] text-[#1D1D1D] font-sans p-12 overflow-hidden shadow-2xl border-l-[32px] border-l-[#3E2723] print:shadow-none">
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:20px_20px] opacity-60 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-8 pb-6 border-b border-gray-400">
        <div className="space-y-3 max-w-[420px]">
          <h1 className="text-3xl font-bold tracking-tight text-black font-serif italic">{b.fullName || "Elsa Belvaux"}</h1>
          <div className="inline-block px-3 py-1 border border-black rounded-full text-[11px] font-bold uppercase tracking-wider bg-white">
            {b.role || "CHARGÉE DE COMMUNICATION"}
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            {b.summary || "Passionnée et créative, je cherche à mettre en œuvre mes compétences en communication stratégique."}
          </p>
        </div>
        <div className="bg-white p-2 pb-5 shadow-md border border-gray-300 rotate-3 w-40">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-32 object-cover" />
          ) : (
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">PHOTO</div>
          )}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8">
        <div className="col-span-7 space-y-6">
          <div>
            <div className="inline-block px-3 py-0.5 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest bg-white mb-3">
              {labels?.experience || "Expériences professionnelles"}
            </div>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold text-black uppercase bg-[#FFEE56]/60 inline-block px-1">{item.role}</p>
                  <p className="text-gray-600 font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-5 space-y-6">
          <div>
            <div className="inline-block px-3 py-0.5 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest bg-white mb-3">
              {labels?.skills || "Compétences"}
            </div>
            <div className="space-y-2 text-xs font-bold">
              {skills.map((s: any, idx: number) => (
                <div key={idx} className="bg-[#FFEE56]/70 border border-black px-3 py-1.5 rounded shadow-sm inline-block mr-1.5 mb-1.5">
                  {typeof s === "string" ? s : s.name}
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
// 6. HÉLÈNE ROUX STYLE (Floral & Botanical Florist Layout)
// ==========================================================================
export function FloralBotanistTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FFFBF9] text-[#3A2E2B] font-serif p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Top Left/Right Floral Decorative Accents */}
      <div className="absolute top-4 left-4 text-4xl opacity-80 pointer-events-none">🌸</div>
      <div className="absolute top-4 right-4 text-4xl opacity-80 pointer-events-none">🌺</div>

      <div className="flex items-center gap-8 mb-8 pb-6 border-b border-[#E8D3C7]">
        <div className="w-36 h-44 rounded-2xl overflow-hidden border-2 border-[#C97A63] shadow-lg flex-shrink-0">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#E8D3C7] flex items-center justify-center font-bold">PHOTO</div>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-normal text-[#8B3A2B] tracking-wide">{b.fullName || "Hélène Roux"}</h1>
          <p className="text-lg font-semibold text-[#C97A63] tracking-wider mt-0.5">{b.role || "Fleuriste & Botaniste"}</p>
          <p className="text-xs text-gray-700 font-sans mt-2 max-w-lg leading-relaxed">
            {b.summary || "Passionnée par l'art floral depuis plusieurs années, je mets ma créativité au service de compositions uniques."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 font-sans">
        <div className="col-span-5 space-y-6 bg-[#FDF6F0] p-5 rounded-2xl border border-[#E8D3C7]">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B3A2B] border-b border-[#E8D3C7] pb-1 mb-2">
              {labels?.contact || "Contact"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1">
              <p>📞 {b.phone}</p>
              <p>✉️ {b.email}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#8B3A2B] border-b border-[#E8D3C7] pb-1 mb-2">
              {labels?.skills || "Compétences"}
            </h3>
            <ul className="text-xs text-gray-700 space-y-1">
              {skills.map((s: any, idx: number) => (
                <li key={idx}>• {typeof s === "string" ? s : s.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8B3A2B] border-b-2 border-[#8B3A2B] pb-1 mb-4">
              {labels?.experience || "Expériences professionnelles"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#C97A63] pl-3">
                  <h4 className="font-bold text-gray-900">{item.role}</h4>
                  <p className="text-[#C97A63] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <p className="text-gray-600 mt-1">{item.bullets?.[0]}</p>
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
// 7. LOU GARNIER STYLE (Cheerful Botanical & Community Manager)
// ==========================================================================
export function LouGarnierCommunityTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-white text-[#222] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      <div className="flex items-center gap-8 mb-8 pb-6 border-b border-gray-200">
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#A3B18A] shadow-lg flex-shrink-0">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#D8F3DC] flex items-center justify-center text-3xl font-bold text-[#2D6A4F]">
              {(b.fullName || "L")[0]}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-black text-[#1B4332] uppercase tracking-wide">{b.fullName || "Lou Garnier"}</h1>
          <p className="text-sm font-bold text-[#52B788] tracking-widest mt-1 uppercase">{b.role || "Community Manager"}</p>
          <p className="text-xs text-gray-600 mt-2 max-w-lg leading-relaxed">
            {b.summary || "Spécialisée en stratégie digitale, engagement de communauté et création de contenu social media."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 space-y-6 bg-[#F1FAEE] p-5 rounded-2xl border border-[#A3B18A]/50">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F] border-b border-[#A3B18A] pb-1 mb-2">
              {labels?.contact || "Coordonnées"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1 font-mono">
              <p>📞 {b.phone}</p>
              <p>✉️ {b.email}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F] border-b border-[#A3B18A] pb-1 mb-2">
              {labels?.skills || "Compétences"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1">
              {skills.map((s: any, idx: number) => (
                <p key={idx}>• {typeof s === "string" ? s : s.name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-8 space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1B4332] border-b-2 border-[#52B788] pb-1 mb-4">
              {labels?.experience || "Expériences professionnelles"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#52B788] pl-3">
                  <h4 className="font-bold text-gray-900 text-sm">{item.role}</h4>
                  <p className="text-[#52B788] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <p className="text-gray-600 mt-1">{item.bullets?.[0]}</p>
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
// 8. LOU HUET STYLE (Creative Graphic Designer & Illustrator - Pink & Yellow Pop)
// ==========================================================================
export function LouHuetIllustratorTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FFF5EE] text-[#111] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      <div className="flex justify-between items-center mb-8 pb-6 border-b-4 border-[#FF5E7E]">
        <div>
          <h1 className="text-4xl font-black uppercase text-[#FF5E7E] tracking-tight">{b.fullName || "Lou Huet"}</h1>
          <p className="text-sm font-extrabold uppercase tracking-widest text-amber-500 mt-1">{b.role || "Graphiste & Illustratrice"}</p>
          <p className="text-xs text-gray-800 mt-2 max-w-md leading-relaxed">
            {b.summary || "Créative et passionnée de design visuel. Je forge des identités visuelles captivantes."}
          </p>
        </div>
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-black shadow-xl">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-amber-300 flex items-center justify-center font-bold">AVATAR</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-6 space-y-6">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-[#FF5E7E] border-b-2 border-black pb-1 mb-3">
              {labels?.experience || "Expériences"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs bg-white p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]">
                  <p className="font-bold text-black uppercase">{item.role}</p>
                  <p className="text-[#FF5E7E] font-semibold">{item.company} ({item.startDate} - {item.endDate || "Present"})</p>
                  <p className="text-gray-700 mt-1">{item.bullets?.[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-6 space-y-6">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-[#FF5E7E] border-b-2 border-black pb-1 mb-3">
              {labels?.skills || "Compétences"}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s: any, idx: number) => (
                <span key={idx} className="text-xs font-bold bg-[#FFD166] border-2 border-black px-2.5 py-1 rounded shadow-[2px_2px_0px_#000]">
                  {typeof s === "string" ? s : s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 9. YAELLE ALLAOUI STYLE (Pink Crumpled Paper & Creative Portfolio)
// ==========================================================================
export function YaelleAllaouiTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#22252A] text-[#F1F5F9] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Pink Top Fold Area */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-[#F472B6] text-[#1E293B] p-8 clip-path-slant shadow-md">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-center font-serif">
          {b.fullName || "Yaelle Allaoui"}
        </h1>
        <p className="text-center font-mono text-xs font-bold uppercase tracking-widest mt-1 text-gray-900">
          {b.role || "designer graphique"}
        </p>
        <p className="text-xs text-center italic mt-3 max-w-md mx-auto">
          "{b.summary || "Je crée des identités visuelles qui marquent les esprits et des images qui captent l'attention."}"
        </p>
      </div>

      <div className="relative z-10 pt-80 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#FB923C] text-black p-6 rounded-xl shadow-lg space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest border-b border-black pb-1">
              {labels?.experience || "Expérience"}
            </h3>
            <div className="space-y-3 text-xs">
              {exp.map((item: any, idx: number) => (
                <div key={idx}>
                  <p className="font-bold">{item.role} chez {item.company}</p>
                  <p className="text-[10px] font-mono">{item.startDate} - {item.endDate || "Present"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FB923C] text-black p-6 rounded-xl shadow-lg space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest border-b border-black pb-1">
              {labels?.education || "Formation"}
            </h3>
            <div className="space-y-3 text-xs">
              {edu.map((e: any, idx: number) => (
                <div key={idx}>
                  <p className="font-bold">{e.degree}</p>
                  <p className="text-[10px] font-mono">{e.institution} ({e.year || e.gradYear})</p>
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
// 10. THOMAS GARCIA STYLE (Dark Sound Technician & Media Grid)
// ==========================================================================
export function ThomasGarciaSoundTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#0F172A] text-[#F8FAFC] font-sans p-8 overflow-hidden shadow-2xl flex gap-6 print:shadow-none">
      {/* Dark Sidebar */}
      <div className="w-[35%] bg-[#1E293B] p-6 rounded-2xl space-y-6 border border-slate-700">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-1 mb-2">
            {labels?.contact || "Contact"}
          </h3>
          <div className="text-xs text-slate-300 space-y-1 font-mono">
            <p>{b.phone}</p>
            <p>{b.email}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-600 pb-1 mb-2">
            {labels?.skills || "Compétences"}
          </h3>
          <div className="text-xs text-slate-300 space-y-1">
            {skills.map((s: any, idx: number) => (
              <p key={idx}>• {typeof s === "string" ? s : s.name}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-[65%] space-y-6">
        <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">{b.fullName || "Thomas Garcia"}</h1>
            <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest mt-1">{b.role || "Technicien son Junior"}</p>
          </div>
          <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-600">
            {b.photoUrl ? (
              <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-slate-700 flex items-center justify-center font-bold">AUDIO</div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-1 mb-3">
            {labels?.experience || "Expérience"}
          </h3>
          <div className="space-y-3">
            {exp.map((item: any, idx: number) => (
              <div key={idx} className="bg-[#1E293B] p-4 rounded-xl border border-slate-700 text-xs">
                <p className="font-bold text-white text-sm">{item.role}</p>
                <p className="text-sky-400 font-mono text-[11px]">{item.company} ({item.startDate})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
