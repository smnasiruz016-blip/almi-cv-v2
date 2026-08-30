import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. MIND-MAP GRAPHISTE (Chloé Vallet Style - Radial Map with Pointer Arrows)
// ==========================================================================
export function MindMapGraphisteTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FAF8F5] text-[#8B3A2B] font-serif p-10 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      {/* Central Circular Avatar & Title */}
      <div className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
        <div className="w-40 h-40 rounded-full border-4 border-[#8B3A2B] overflow-hidden shadow-xl mx-auto bg-white">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#EADCC9] flex items-center justify-center text-3xl font-bold text-[#8B3A2B]">
              {(b.fullName || "C")[0]}
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-wider text-[#8B3A2B] mt-3 uppercase font-sans">
          {b.fullName || "Chloé Vallet"}
        </h1>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8B3A2B] font-sans mt-0.5">
          {b.role || "Graphiste"}
        </p>
      </div>

      {/* Radial Mind-Map Cards Layout */}
      <div className="relative z-10 grid grid-cols-2 gap-x-28 gap-y-36 pt-6 font-sans">
        {/* Coordonnées */}
        <div className="relative bg-white p-5 rounded-2xl border-2 border-[#8B3A2B]/30 shadow-md space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#8B3A2B] border-b border-[#8B3A2B]/20 pb-1">
            {labels?.contact || "Coordonnées"}
          </h3>
          <div className="text-xs text-gray-800 space-y-1">
            <p>📍 {b.location || "123 Anywhere St., Any City"}</p>
            <p>📞 {b.phone || "+123-456-7890"}</p>
            <p>✉️ {b.email || "hello@reallygreatsite.com"}</p>
          </div>
          <svg className="absolute -bottom-8 right-6 w-14 h-10 stroke-[#8B3A2B] fill-none stroke-[1.5]" viewBox="0 0 50 30"><path d="M5 5 C 20 5, 30 15, 45 25" /></svg>
        </div>

        {/* À propos de moi */}
        <div className="relative bg-white p-5 rounded-2xl border-2 border-[#8B3A2B]/30 shadow-md space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#8B3A2B] border-b border-[#8B3A2B]/20 pb-1">
            {labels?.summary || "À propos de moi"}
          </h3>
          <p className="text-xs text-gray-800 leading-relaxed font-medium">
            {b.summary || "Fraîchement diplômée, je recherche désormais un poste de graphiste en agence."}
          </p>
          <svg className="absolute -bottom-8 left-6 w-14 h-10 stroke-[#8B3A2B] fill-none stroke-[1.5]" viewBox="0 0 50 30"><path d="M45 5 C 30 5, 20 15, 5 25" /></svg>
        </div>

        {/* Expériences professionnelles */}
        <div className="relative bg-white p-5 rounded-2xl border-2 border-[#8B3A2B]/30 shadow-md space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#8B3A2B] border-b border-[#8B3A2B]/20 pb-1">
            {labels?.experience || "Expériences professionnelles"}
          </h3>
          <div className="text-xs text-gray-800 space-y-2">
            {exp.length > 0 ? exp.slice(0, 2).map((item: any, idx: number) => (
              <div key={idx}>
                <p className="font-bold text-gray-900">{item.role}</p>
                <p className="text-[#8B3A2B] font-semibold">{item.company} ({item.startDate})</p>
              </div>
            )) : (
              <p className="text-gray-500">Alternance Direction Artistique...</p>
            )}
          </div>
        </div>

        {/* Formation */}
        <div className="relative bg-white p-5 rounded-2xl border-2 border-[#8B3A2B]/30 shadow-md space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#8B3A2B] border-b border-[#8B3A2B]/20 pb-1">
            {labels?.education || "Formation"}
          </h3>
          <div className="text-xs text-gray-800 space-y-2">
            {edu.length > 0 ? edu.map((e: any, idx: number) => (
              <div key={idx}>
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-gray-600">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            )) : (
              <p className="text-gray-500">Mastère Direction Artistique...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. SACHA DUBOIS (Modern Event Manager - Red & White Split Wave)
// ==========================================================================
export function SachaDuboisEventTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-white text-[#1A1A1A] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Top Right Red Fluid Wave Banner */}
      <svg className="absolute top-0 right-0 w-[480px] h-[280px] pointer-events-none" viewBox="0 0 500 280" fill="none">
        <path d="M40 0 C 220 0, 380 140, 500 280 L 500 0 Z" fill="#C51E2E" />
      </svg>

      <div className="flex justify-between items-start mb-10 pt-4">
        <div className="space-y-1 max-w-[400px]">
          <h1 className="text-4xl font-black uppercase text-[#C51E2E] tracking-tight">{b.fullName || "Sacha Dubois"}</h1>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-800">{b.role || "Chargée de Projet"}</p>
        </div>
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 flex-shrink-0 bg-gray-200">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white font-bold text-xs">PHOTO</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 space-y-6 bg-red-50/70 p-5 rounded-xl border border-red-200">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#C51E2E] mb-2.5">
              {labels?.contact || "Contact"}
            </h3>
            <div className="text-xs text-gray-800 space-y-1.5 font-medium">
              <p>🏠 {b.location || "123 Anywhere St."}</p>
              <p>📞 {b.phone || "+123-456-7890"}</p>
              <p>✉️ {b.email || "hello@reallygreatsite.com"}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#C51E2E] mb-2.5">
              {labels?.skills || "Compétences"}
            </h3>
            <div className="text-xs text-gray-800 space-y-1.5 font-medium">
              {(skills.length > 0 ? skills : ["Gestion de projet", "Planification d'événements", "Communication efficace"]).map((s: any, idx: number) => (
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
              {exp.length > 0 ? exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#C51E2E] pl-3.5 space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm">{item.role}</h4>
                  <p className="text-[#C51E2E] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Présent"}</p>
                  <ul className="space-y-1 text-gray-700 leading-relaxed">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              )) : (
                <p className="text-xs text-gray-500">Chargée de Projet Événementiel...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. CLÉMENCE LAURENT (Clipboard & Handwritten Notepad)
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
            <p className="text-sm font-handwriting text-gray-800 leading-relaxed font-semibold">
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

        <div className="grid grid-cols-12 gap-8 text-sm">
          <div className="col-span-5 space-y-6 bg-gray-50 p-4 rounded border border-gray-200">
            <div>
              <h4 className="text-xs font-black uppercase text-gray-700 font-mono mb-2">Services :</h4>
              <ul className="text-xs text-gray-800 space-y-1 font-medium">
                {(skills.length > 0 ? skills : ["Logo", "Identité de marque", "Shooting photo"]).map((s: any, idx: number) => (
                  <li key={idx}>• {typeof s === "string" ? s : s.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-gray-700 font-mono mb-2">Coordonnées :</h4>
              <p className="text-xs text-gray-800">{b.phone || "+123-456-7890"}</p>
              <p className="text-xs text-gray-800">{b.email || "hello@reallygreatsite.com"}</p>
              <p className="text-xs text-gray-800">{b.location || "123 Anywhere St."}</p>
            </div>
          </div>

          <div className="col-span-7 space-y-6 font-sans">
            <div>
              <h4 className="text-xs font-black uppercase text-gray-700 font-mono mb-3 border-b border-gray-300 pb-1">
                {labels?.experience || "Expériences passées :"}
              </h4>
              <div className="space-y-4 text-xs">
                {exp.length > 0 ? exp.map((item: any, idx: number) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="font-bold text-gray-900">{item.role} chez {item.company}</p>
                    <p className="text-gray-500 font-mono text-[10px]">{item.startDate} - {item.endDate || "Present"}</p>
                    <p className="text-gray-600">{item.bullets?.[0]}</p>
                  </div>
                )) : (
                  <p className="text-gray-500">Designer graphique chez Tempo...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. JONATHAN MARTIN (Security ID Pass Badge & Minimal Grid)
// ==========================================================================
export function IdBadgeModernTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#EFECE6] text-[#111] font-sans p-10 overflow-hidden shadow-2xl border-4 border-gray-800 print:shadow-none">
      {/* Security ID Badge Pass Graphic */}
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
            <p>📞 {b.phone || "+123-456-7890"}</p>
            <p>📍 {b.location || "123 Anywhere St., Any City"}</p>
            <p>✉️ {b.email || "hello@reallygreatsite.com"}</p>
          </div>
        </div>

        <div className="border-b-2 border-gray-800 pb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3">{labels?.skills || "Compétences :"}</h3>
          <div className="flex gap-4 text-xs font-semibold text-gray-800 flex-wrap">
            {(skills.length > 0 ? skills : ["Relations publiques", "Communication interne", "Relations avec les médias"]).map((s: any, idx: number) => (
              <div key={idx} className="bg-white border border-gray-400 px-4 py-2 rounded shadow-sm">
                ✓ {typeof s === "string" ? s : s.name}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-400 pb-1">
              {labels?.experience || "Expériences :"}
            </h3>
            <div className="space-y-3">
              {exp.length > 0 ? exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold text-gray-900">{item.role}</p>
                  <p className="text-gray-500 font-mono text-[10px]">{item.startDate} - {item.endDate || "Present"}</p>
                  <p className="text-gray-600 mt-0.5">{item.bullets?.[0]}</p>
                </div>
              )) : (
                <p className="text-xs text-gray-500">Directeur des Relations Publiques...</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-400 pb-1">
              {labels?.education || "Diplôme :"}
            </h3>
            {edu.length > 0 ? edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-gray-500 font-mono text-[10px]">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            )) : (
              <p className="text-xs text-gray-500">Diplôme en Communication...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 5. ELSA BELVAUX (Dotted Notebook & Yellow Highlights)
// ==========================================================================
export function NotebookDottedGridTemplate({ data, labels }: TemplateProps) {
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
              {exp.length > 0 ? exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold text-black uppercase bg-[#FFEE56]/60 inline-block px-1">{item.role}</p>
                  <p className="text-gray-600 font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                </div>
              )) : (
                <p className="text-xs text-gray-500">Chargée de communication...</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-5 space-y-6">
          <div>
            <div className="inline-block px-3 py-0.5 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest bg-white mb-3">
              {labels?.skills || "Compétences"}
            </div>
            <div className="space-y-2 text-xs font-bold">
              {(skills.length > 0 ? skills : ["Gestion de projet", "Média sociaux", "Communication interne"]).map((s: any, idx: number) => (
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
