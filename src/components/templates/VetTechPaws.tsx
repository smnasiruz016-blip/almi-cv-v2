// VetTechPaws — Vet Techs, Vet Nurses, Animal Care (warm graphical)
// Soft cream + teal + paw-print trail + rounded photo + care chips. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Paw = ({ s=22, c="#2E9B8F", o=1 }: { s?:number; c?:string; o?:number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill={c} opacity={o}><ellipse cx="12" cy="15.5" rx="5" ry="4.2"/><ellipse cx="5.5" cy="10" rx="2.2" ry="3"/><ellipse cx="18.5" cy="10" rx="2.2" ry="3"/><ellipse cx="9" cy="6.5" rx="2.2" ry="3"/><ellipse cx="15" cy="6.5" rx="2.2" ry="3"/></svg>
);

export default function VetTechPaws({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const T = "#2E9B8F", O = "#E8895C";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FBF8F2", color:"#3A4540", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <div aria-hidden>
        {[[700,60,0.25],[660,130,0.18],[715,200,0.12],[40,980,0.2],[100,1040,0.14]].map(([x,y,o],i)=>(<span key={i} style={{position:"absolute",left:x,top:y,transform:`rotate(${i*24}deg)`}}><Paw s={30} o={o as number}/></span>))}
      </div>
      <header className="relative" style={{ padding:"44px 50px 22px", display:"grid", gridTemplateColumns: basics.photoUrl?"130px 1fr":"1fr", gap:22, alignItems:"center" }}>
        {basics.photoUrl && <div style={{ width:126, height:126, borderRadius:"38% 62% 60% 40% / 45% 40% 60% 55%", overflow:"hidden", border:`4px solid ${T}` }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em", color:"#23433C" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"12pt", color:O, fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9pt]" style={{ color:"#6E7E78" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
      </header>
      <div className="relative grid gap-9" style={{ padding:"16px 50px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About Me")} c={T}><RichTextRender html={basics.summary} style={{color:"#4E5C56",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Clinical Experience")} c={T}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#23433C"}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:T,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="vtp-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4E5C56"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={T}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#23433C"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6E7E78"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Animal Care Skills")} c={T}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 12px",fontSize:"9.5pt",fontWeight:700,color:i%2?T:"#B4623A",background:i%2?"#E2F2EF":"#FAE8DC",borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licenses & Certs")} c={T}>
            <ul className="vtp-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4E5C56"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={T}>
            <div className="text-[9.5pt]" style={{color:"#4E5C56"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.vtp-b li{position:relative;padding-left:16px;margin-bottom:2px}.vtp-b li:before{content:"🐾";position:absolute;left:0;font-size:7.5pt;top:2px}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:800,letterSpacing:"0.1em",color:"#23433C",borderBottom:`2px solid ${c}`,paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
