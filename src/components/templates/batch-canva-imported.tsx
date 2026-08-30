import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. MIND-MAP CREATIVE DESIGNER (Chloé Vallet Style - Radial Pointer Arrows)
// ==========================================================================
export function MindMapDesignerTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FAF8F5] text-[#2C221E] font-serif p-10 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      {/* Central Circular Avatar with Name Overlay */}
      <div className="absolute top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
        <div className="w-44 h-44 rounded-full border-4 border-[#8B3A2B] overflow-hidden shadow-2xl mx-auto bg-white">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#EADCC9] flex items-center justify-center text-4xl font-bold text-[#8B3A2B]">
              {(b.fullName || "C")[0]}
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-wider text-[#8B3A2B] mt-3 uppercase font-sans drop-shadow-sm">
          {b.fullName || "Chloé Vallet"}
        </h1>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 font-sans">
          {b.role || "Graphiste & Designer"}
        </p>
      </div>

      {/* Radial Mind-Map Grid Layout */}
      <div className="relative z-10 grid grid-cols-2 gap-x-32 gap-y-28 pt-8 font-sans">
        {/* Top Left: Contact */}
        <div className="space-y-2 bg-white/80 p-5 rounded-2xl border border-[#D9C3B0] shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.contact || "Coordonnées"}
          </h3>
          <div className="text-xs text-gray-700 space-y-1">
            <p>📍 {b.location}</p>
            <p>📞 {b.phone}</p>
            <p>✉️ {b.email}</p>
            {b.linkedin && <p>🔗 {b.linkedin}</p>}
          </div>
        </div>

        {/* Top Right: Summary */}
        <div className="space-y-2 bg-white/80 p-5 rounded-2xl border border-[#D9C3B0] shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.summary || "À propos de moi"}
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            {b.summary || "Fraîchement diplômée, je recherche un poste de graphiste en agence pour exprimer ma créativité."}
          </p>
        </div>

        {/* Middle Left: Soft Skills */}
        <div className="space-y-2 bg-white/80 p-5 rounded-2xl border border-[#D9C3B0] shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.skills || "Qualités professionnelles"}
          </h3>
          <div className="text-xs text-gray-700 space-y-1">
            <p>• Créative & Autonome</p>
            <p>• Curieuse & Passionnée</p>
          </div>
        </div>

        {/* Middle Right: Core Skills */}
        <div className="space-y-2 bg-white/80 p-5 rounded-2xl border border-[#D9C3B0] shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.competencies || "Compétences principales"}
          </h3>
          <div className="text-xs text-gray-700 space-y-1">
            {skills.map((s: any, idx: number) => (
              <p key={idx}>• {typeof s === "string" ? s : s.name}</p>
            ))}
          </div>
        </div>

        {/* Bottom Left: Experience */}
        <div className="space-y-3 bg-white/80 p-5 rounded-2xl border border-[#D9C3B0] shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.experience || "Expériences professionnelles"}
          </h3>
          <div className="space-y-3 text-xs">
            {exp.map((item: any, idx: number) => (
              <div key={idx}>
                <p className="font-bold text-gray-900">{item.role}</p>
                <p className="text-[#8B3A2B] font-medium">{item.company} ({item.startDate} - {item.endDate || "Présent"})</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Right: Education */}
        <div className="space-y-3 bg-white/80 p-5 rounded-2xl border border-[#D9C3B0] shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B3A2B] border-b border-[#D9C3B0] pb-1">
            {labels?.education || "Formation"}
          </h3>
          <div className="space-y-2 text-xs">
            {edu.map((e: any, idx: number) => (
              <div key={idx}>
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-gray-600">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. CLIPBOARD NOTE-PAPER DESIGNER (Clémence Laurent - Realistic Clipboard)
// ==========================================================================
export function ClipboardNoteTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#2E3B4E] p-8 flex items-center justify-center font-sans shadow-2xl">
      {/* Clipboard White Paper Sheet */}
      <div className="w-full max-w-[780px] min-h-[1060px] bg-[#FFFDF9] text-[#1A202C] p-10 shadow-2xl relative border border-gray-300">
        {/* Metal Clip Graphic (Top Center) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 border border-gray-500 rounded-md shadow-md flex items-center justify-center">
          <div className="w-28 h-3 bg-gray-500 rounded-sm" />
        </div>

        {/* Header Name & Photo */}
        <div className="flex justify-between items-start mb-8 pt-4 border-b-2 border-dashed border-gray-300 pb-6">
          <div className="space-y-3 max-w-[400px]">
            <h1 className="text-2xl font-black uppercase text-gray-800 tracking-wider font-mono">
              {b.fullName || "Clémence Laurent"}
            </h1>
            <p className="text-xs text-gray-700 italic leading-relaxed">
              "{b.summary || "Je suis designer graphique freelance depuis 3 ans, spécialisée dans la photo et le branding."}"
            </p>
          </div>
          {/* Polaroid Photo Frame */}
          <div className="bg-white p-2.5 pb-6 shadow-md border border-gray-300 rotate-2 w-36">
            {b.photoUrl ? (
              <img src={b.photoUrl} alt="Polaroid" className="w-full h-28 object-cover" />
            ) : (
              <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">PHOTO</div>
            )}
            <p className="text-[10px] text-center font-handwriting mt-2 text-gray-600">Atelier Paris</p>
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5 space-y-6 bg-yellow-50/60 p-5 rounded border border-yellow-200 shadow-sm">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-800 mb-2 font-mono">
                {labels?.services || "Services :"}
              </h3>
              <ul className="text-xs text-gray-700 space-y-1 font-medium">
                {skills.map((s: any, idx: number) => (
                  <li key={idx}>• {typeof s === "string" ? s : s.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-800 mb-2 font-mono">
                {labels?.contact || "Coordonnées :"}
              </h3>
              <div className="text-xs text-gray-700 space-y-1">
                <p>{b.phone}</p>
                <p>{b.email}</p>
                <p>{b.location}</p>
              </div>
            </div>
          </div>

          <div className="col-span-7 space-y-6">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-800 mb-3 font-mono border-b border-gray-300 pb-1">
                {labels?.experience || "Expériences Passées :"}
              </h3>
              <div className="space-y-4">
                {exp.map((item: any, idx: number) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-gray-900">{item.role} chez {item.company}</p>
                    <p className="text-gray-500 font-mono text-[10px]">{item.startDate} - {item.endDate || "Present"}</p>
                    <p className="text-gray-700 mt-0.5">{item.bullets?.[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-800 mb-2 font-mono border-b border-gray-300 pb-1">
                {labels?.education || "Formation :"}
              </h3>
              {edu.map((e: any, idx: number) => (
                <div key={idx} className="text-xs mb-2">
                  <p className="font-bold text-gray-900">{e.degree}</p>
                  <p className="text-gray-500 font-mono text-[10px]">{e.institution} ({e.year || e.gradYear})</p>
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
// 3. ID BADGE MODERN PR (Jonathan Martin - Security ID Pass & Grid Lines)
// ==========================================================================
export function IdBadgeModernTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#F4F4F0] text-[#1E1E1E] font-sans p-10 overflow-hidden shadow-2xl border-4 border-gray-800 print:shadow-none">
      {/* Top ID Pass Window Graphic */}
      <div className="absolute top-6 right-10 w-72 bg-white border-2 border-gray-400 p-3 shadow-lg rounded rotate-1">
        <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
          <span className="text-[10px] font-mono font-bold text-gray-500">n° 0123456</span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
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

      {/* Grid Layout Sections */}
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
          <div className="flex gap-8 text-xs font-semibold text-gray-800">
            {(skills.length > 0 ? skills : ["Relations publiques", "Communication interne", "Relations médias"]).map((s: any, idx: number) => (
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
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold text-gray-900">{item.role}</p>
                  <p className="text-gray-500 font-mono text-[10px]">{item.startDate} - {item.endDate || "Present"}</p>
                  <p className="text-gray-600 mt-0.5">{item.bullets?.[0]}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-400 pb-1">
              {labels?.education || "Diplôme :"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-gray-500 font-mono text-[10px]">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. NOTEBOOK DOTTED GRID (Elsa Belvaux - Spiral Notebook & Yellow Highlights)
// ==========================================================================
export function NotebookDottedGridTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#F7F3E9] text-[#1D1D1D] font-sans p-12 overflow-hidden shadow-2xl border-l-[32px] border-l-[#3E2723] print:shadow-none">
      {/* Notebook Dotted Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:20px_20px] opacity-60 pointer-events-none" />

      {/* Header & Photo */}
      <div className="relative z-10 flex justify-between items-start mb-8 pb-6 border-b border-gray-400">
        <div className="space-y-3 max-w-[420px]">
          <h1 className="text-3xl font-bold tracking-tight text-black font-serif italic">{b.fullName || "Elsa Belvaux"}</h1>
          <div className="inline-block px-3 py-1 border border-black rounded-full text-[11px] font-bold uppercase tracking-wider bg-white">
            {b.role || "CHARGÉE DE COMMUNICATION"}
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            {b.summary || "Passionnée et créative, je cherche à mettre en œuvre mes compétences en communication stratégique."}
          </p>
          <div className="text-xs text-gray-700 space-y-1 font-mono pt-1">
            <p>✉️ {b.email}</p>
            <p>📱 {b.phone}</p>
            <p>📍 {b.location}</p>
          </div>
        </div>

        {/* Polaroid Photo Frame */}
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
                  <ul className="mt-1 space-y-1 text-gray-700">
                    {(item.bullets || []).map((bullet: string, bIdx: number) => (
                      <li key={bIdx}>• {bullet}</li>
                    ))}
                  </ul>
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
              {(skills.length > 0 ? skills : ["Gestion de projet", "Média sociaux", "Communication interne"]).map((s: any, idx: number) => (
                <div key={idx} className="bg-[#FFEE56]/70 border border-black px-3 py-1.5 rounded shadow-sm inline-block mr-1.5 mb-1.5">
                  {typeof s === "string" ? s : s.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="inline-block px-3 py-0.5 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest bg-white mb-3">
              {labels?.education || "Formation"}
            </div>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-black bg-[#FFEE56]/50 px-1 inline-block">{e.degree}</p>
                <p className="text-gray-600">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
