import React from "react";
import type { CVData } from "@/lib/cv-types";

interface TemplateProps {
  data: CVData;
  theme?: string;
  labels?: Record<string, string>;
}

// ==========================================================================
// 1. BEAUTY & MAKEUP ARTIST (Cosmetic Brushes, Lipsticks, Nude Rose Gold)
// ==========================================================================
export function BeautyMakeupArtistTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#FFF8F6] text-[#2D2327] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none print:m-0 print:w-full">
      {/* Background Nude Rose Gold Organic Waves */}
      <svg className="absolute top-0 right-0 w-[450px] h-[350px] pointer-events-none opacity-80" viewBox="0 0 500 400" fill="none">
        <path d="M150 0 C 300 120, 400 40, 500 200 L 500 0 Z" fill="#E8C5BD" />
        <path d="M80 0 C 250 180, 350 90, 500 280 L 500 0 Z" fill="#D4A39B" opacity="0.5" />
      </svg>

      {/* Floating Makeup & Beauty Prop Badges */}
      <div className="absolute top-28 right-12 text-3xl opacity-70 animate-bounce pointer-events-none">💄</div>
      <div className="absolute top-48 right-32 text-2xl opacity-60 pointer-events-none">✨</div>
      <div className="absolute bottom-24 left-8 text-3xl opacity-50 pointer-events-none">💅</div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-8 pb-6 border-b-2 border-[#E8C5BD]">
        <div className="w-32 h-32 rounded-full ring-4 ring-[#D4A39B] p-1 bg-white shadow-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="text-center">
              <span className="text-3xl font-bold text-[#A36B63]">{(b.fullName || "B")[0]}</span>
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#D4A39B]">MUA</p>
            </div>
          )}
        </div>

        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E8C5BD]/40 text-[#8C4F46] text-[10px] font-bold tracking-widest uppercase mb-1">
            Professional Makeup Artist & Stylist
          </div>
          <h1 className="text-3xl font-extrabold text-[#4A2E2B] uppercase tracking-wide">{b.fullName || "Chloe Moreau"}</h1>
          <p className="text-lg font-semibold text-[#A36B63] mt-0.5">{b.role || "Lead Bridal & Editorial Makeup Artist"}</p>
          <p className="text-xs text-gray-600 mt-2 max-w-xl leading-relaxed">
            {b.summary || "Award-winning beauty specialist skilled in high-fashion editorial looks, luxury bridal styling, and skin-prep mastery."}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8">
        <div className="col-span-5 bg-[#F4EBE8] rounded-2xl p-5 border border-[#E8C5BD] space-y-6 shadow-sm">
          <div>
            <h3 className="text-xs font-bold text-[#A36B63] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>🎨</span> {labels?.contact || "Studio Booking"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1.5">
              <p>📞 {b.phone}</p>
              <p>✉️ {b.email}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#A36B63] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>💋</span> {labels?.skills || "Cosmetic Toolkit"}
            </h3>
            <div className="space-y-2.5">
              {(skills.length > 0 ? skills : [
                "Bridal & Airbrush Makeup",
                "Editorial & Runway Styling",
                "Skin Prep & Dermatology Care",
                "Color Theory & Palette Matching",
                "Client Consultations"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-semibold text-gray-800 mb-1">
                    <span>{typeof s === "string" ? s : s.name}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-[#A36B63] rounded-full" style={{ width: "92%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#4A2E2B] uppercase tracking-wider mb-3.5 border-b border-[#E8C5BD] pb-1">
              {labels?.experience || "Portfolio Experience"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#A36B63] pl-3 py-0.5">
                  <h4 className="font-bold text-gray-900 text-xs uppercase">{item.role}</h4>
                  <p className="text-[#A36B63] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
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
            <h3 className="text-sm font-bold text-[#4A2E2B] uppercase tracking-wider mb-2 border-b border-[#E8C5BD] pb-1">
              {labels?.education || "Certifications"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-[#A36B63]">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 2. MOTHERCARE & CHILDCARE (Soft Curved Waves, Rattle & Nanny Elements)
// ==========================================================================
export function MothercareChildcareTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#F2F9F9] text-[#2C3E50] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Top Soft Aqua / Peach Curved Wave Banner */}
      <svg className="absolute top-0 left-0 w-full h-48 pointer-events-none opacity-90" viewBox="0 0 1000 200" fill="none">
        <path d="M0 0 L1000 0 L1000 100 C 700 180, 400 30, 0 130 Z" fill="#D8F3DC" />
        <path d="M0 0 L1000 0 L1000 60 C 600 150, 300 10, 0 90 Z" fill="#B7E4C7" opacity="0.6" />
      </svg>

      {/* Floating Childcare Icons */}
      <div className="absolute top-8 right-12 text-3xl opacity-80 pointer-events-none">🧸</div>
      <div className="absolute top-24 right-28 text-2xl opacity-70 pointer-events-none">🍼</div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-8 pb-6 border-b-2 border-[#B7E4C7]">
        <div className="w-28 h-28 rounded-full ring-4 ring-[#52B788] p-1 bg-white shadow-md overflow-hidden flex-shrink-0 flex items-center justify-center">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="text-center">
              <span className="text-3xl font-extrabold text-[#2D6A4F]">{(b.fullName || "M")[0]}</span>
              <p className="text-[8px] font-bold text-[#52B788] uppercase">Nanny</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">👶</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F]">Early Childhood & Nanny Care</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1B4332] uppercase tracking-wide">{b.fullName || "Sarah Jenkins"}</h1>
          <p className="text-lg font-bold text-[#2D6A4F]">{b.role || "Professional Nanny & Childcare Specialist"}</p>
          <p className="text-xs text-gray-600 mt-1.5 max-w-xl leading-relaxed">
            {b.summary || "Nurturing, CPR-certified childcare provider dedicated to early developmental milestones, engaging play, and safe home environments."}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8">
        <div className="col-span-5 bg-white rounded-2xl p-5 border border-[#B7E4C7] space-y-6 shadow-sm">
          <div>
            <h3 className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>📞</span> {labels?.contact || "Family Contact"}
            </h3>
            <div className="text-xs text-gray-700 space-y-1.5">
              <p>📱 {b.phone}</p>
              <p>✉️ {b.email}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>🧩</span> {labels?.skills || "Childcare Expertise"}
            </h3>
            <div className="space-y-2.5">
              {(skills.length > 0 ? skills : [
                "Infant & Toddler Development",
                "Pediatric First Aid & CPR Certified",
                "Montessori & Play-Based Learning",
                "Meal Prep & Sleep Training",
                "Bilingual Communication"
              ]).map((s: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-semibold text-gray-800 mb-1">
                    <span>{typeof s === "string" ? s : s.name}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#52B788] rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-extrabold text-[#1B4332] uppercase tracking-wider mb-3.5 border-b border-[#B7E4C7] pb-1">
              {labels?.experience || "Nanny & Care History"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#52B788] pl-3 py-0.5">
                  <h4 className="font-bold text-gray-900 text-xs uppercase">{item.role}</h4>
                  <p className="text-[#2D6A4F] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
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
            <h3 className="text-sm font-extrabold text-[#1B4332] uppercase tracking-wider mb-2 border-b border-[#B7E4C7] pb-1">
              {labels?.education || "Credentials & Education"}
            </h3>
            {edu.map((e: any, idx: number) => (
              <div key={idx} className="text-xs mb-2">
                <p className="font-bold text-gray-900">{e.degree}</p>
                <p className="text-[#2D6A4F]">{e.institution} ({e.year || e.gradYear})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 3. FLORAL BOTANICAL WELLNESS (Sage Leaves, Nature Styling, Elegant Serif)
// ==========================================================================
export function FloralBotanicalTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#F4F7F4] text-[#2F3E33] font-serif p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Botanical Leaf Watermark */}
      <div className="absolute top-6 right-6 text-6xl opacity-20 pointer-events-none">🌿</div>
      <div className="absolute bottom-8 left-6 text-6xl opacity-15 pointer-events-none">🍃</div>

      {/* Header */}
      <div className="text-center pb-8 mb-8 border-b-2 border-[#D8E2DC]">
        <div className="w-24 h-24 rounded-full border-2 border-[#52796F] p-1 bg-white shadow-md mx-auto mb-4 flex items-center justify-center overflow-hidden">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-3xl font-bold text-[#354F52]">{(b.fullName || "F")[0]}</span>
          )}
        </div>

        <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-[#52796F] block mb-1">
          BOTANICAL & HOLISTIC WELLNESS
        </span>
        <h1 className="text-4xl font-normal tracking-wide uppercase text-[#2F3E33]">{b.fullName || "Lily Greenwood"}</h1>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#52796F] mt-1.5">{b.role || "Holistic Botanist & Floral Designer"}</p>

        <div className="flex justify-center items-center gap-6 font-sans text-xs text-gray-600 mt-3 pt-3 border-t border-[#D8E2DC]">
          <span>🌿 {b.location}</span>
          <span>✉️ {b.email}</span>
          <span>📞 {b.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 font-sans">
        <div className="col-span-4 space-y-6">
          <div className="bg-[#EAEFF0] p-5 rounded-2xl border border-[#D8E2DC]">
            <h3 className="font-serif text-sm font-bold text-[#2F3E33] uppercase tracking-wider mb-2.5">
              {labels?.contact || "Philosophy"}
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed italic">
              {b.summary || "Integrating nature's harmony, floral aesthetics, and holistic wellness practices to create healing sensory environments."}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm font-bold text-[#2F3E33] uppercase tracking-wider mb-3 border-b border-[#D8E2DC] pb-1">
              {labels?.skills || "Botanical Skills"}
            </h3>
            <div className="space-y-2 text-xs text-gray-700">
              {skills.map((s: any, idx: number) => (
                <p key={idx}>🌿 {typeof s === "string" ? s : s.name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-8 space-y-6">
          <div>
            <h3 className="font-serif text-base font-bold text-[#2F3E33] uppercase tracking-wider mb-4 border-b-2 border-[#52796F] pb-1">
              {labels?.experience || "Professional Experience"}
            </h3>
            <div className="space-y-5">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="text-xs border-l-2 border-[#52796F] pl-3.5">
                  <h4 className="font-serif font-bold text-sm text-[#2F3E33]">{item.role}</h4>
                  <p className="text-xs text-[#52796F] font-semibold">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-gray-600">
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
// 4. CURVY WAVE MODERN AGENCY (Asymmetrical Liquid Waves, Floating Cards)
// ==========================================================================
export function CurvyWaveModernTemplate({ data, labels }: TemplateProps) {
  const b = data.basics || {};
  const exp = Array.isArray(data.experience) ? data.experience : [];
  const edu = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="relative w-full max-w-[850px] mx-auto min-h-[1120px] bg-[#0F172A] text-[#F8FAFC] font-sans p-10 overflow-hidden shadow-2xl print:shadow-none">
      {/* Asymmetrical Liquid Gradient Blob Background */}
      <svg className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none opacity-80" viewBox="0 0 500 400" fill="none">
        <path d="M100 0 C 350 200, 200 400, 500 300 L 500 0 Z" fill="url(#cyanVioletGrad)" />
        <defs>
          <linearGradient id="cyanVioletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-7 mb-8 pb-6 border-b border-slate-700">
        <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-sky-400 to-pink-500 p-1 shadow-xl flex items-center justify-center flex-shrink-0">
          {b.photoUrl ? (
            <img src={b.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span className="text-3xl font-black text-white">{(b.fullName || "C")[0]}</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-black text-white tracking-wide uppercase">{b.fullName || "Logan Vance"}</h1>
          <p className="text-sm font-bold text-sky-400 mt-1 uppercase tracking-wider">{b.role || "Growth Marketer & Brand Strategist"}</p>
          <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
            {b.summary || "Driving exponential user acquisition, viral marketing campaigns, and performance funnel optimization for tech startups."}
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-7">
        <div className="col-span-5 bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2">
              {labels?.contact || "Direct Connect"}
            </h3>
            <div className="text-xs text-slate-300 space-y-1.5 font-mono">
              <p>⚡ {b.phone}</p>
              <p>✉️ {b.email}</p>
              <p>📍 {b.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">
              {labels?.skills || "Core Stack"}
            </h3>
            <div className="space-y-2.5">
              {skills.map((s: any, idx: number) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between text-slate-200 mb-1">
                    <span>{typeof s === "string" ? s : s.name}</span>
                    <span className="text-pink-400">PRO</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-pink-500 rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-3.5 border-b border-slate-700 pb-1">
              {labels?.experience || "Growth Track Record"}
            </h3>
            <div className="space-y-4">
              {exp.map((item: any, idx: number) => (
                <div key={idx} className="border-l-2 border-pink-500 pl-3.5">
                  <h4 className="text-xs font-bold text-white uppercase">{item.role}</h4>
                  <p className="text-xs text-sky-400">{item.company} | {item.startDate} - {item.endDate || "Present"}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-slate-300">
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
