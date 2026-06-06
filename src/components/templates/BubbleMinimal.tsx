// BubbleMinimal — Marketing, Admin, General professional (soft minimal)
// White + soft grey blob shapes + circle photo + elegant serif + center divider. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function BubbleMinimal({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#33404A", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <path d="M0 0 H300 Q260 90 300 170 Q340 250 250 300 Q150 340 120 250 Q90 150 0 180 Z" fill="#E4EAF0"/>
        <circle cx="250" cy="60" r="36" fill="#EDF1F5"/>
        <path d="M794 1123 H520 Q560 1030 520 960 Q480 890 580 850 Q690 820 720 910 Q750 1010 794 980 Z" fill="#E4EAF0"/>
        <circle cx="560" cy="1060" r="30" fill="#EDF1F5"/>
      </svg>
      <header className="relative" style={{ padding:"44px 52px 22px", display:"grid", gridTemplateColumns:"190px 1fr", gap:24, alignItems:"center" }}>
        <div style={{ width:172, height:172, borderRadius:"50%", overflow:"hidden", background:"#DCE3EA", border:"5px solid #fff", boxShadow:"0 0 0 1px #D2DAE2", justifySelf:"center" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#7C8B99",fontWeight:600,fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"46pt", lineHeight:0.98, color:"#37474F" }}>{basics.fullName}</h1>
          <div style={{ height:1, width:200, background:"#5A6B78", margin:"8px 0 6px" }} />
          <p className="m-0 italic" style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:"17pt", color:"#5A6B78" }}>{basics.role}</p>
        </div>
      </header>
      <div className="relative grid" style={{ padding:"18px 52px 46px", gridTemplateColumns:"1fr 1px 1.55fr", columnGap:30 }}>
        <div>
          <SecC t={getLabel(data,"contact","Contacto")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",lineHeight:1.9,color:"#46545F"}}>{[basics.phone,basics.email,basics.location,basics.website].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </SecC>
          <SecC t={getLabel(data,"skills","Habilidades")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",lineHeight:1.7,color:"#46545F",textAlign:"center"}}>{skills.map((s,i)=>(<li key={i}>{s}</li>))}</ul>
          </SecC>
          {languages.length>0 && <SecC t={getLabel(data,"languages","Idiomas")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",lineHeight:1.7,color:"#46545F",textAlign:"center"}}>{languages.map((l,i)=>(<li key={i}>{l.name}{l.level?`: ${l.level}`:""}</li>))}</ul>
          </SecC>}
        </div>
        <div style={{ background:"#33404A", width:1 }} />
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Sobre mí")}><RichTextRender html={basics.summary} style={{color:"#46545F",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Historia laboral")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]">{e.company}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#6B7A86"}}>{dateRange(e.startDate,e.endDate,e.current)}{e.role?` · ${e.role}`:""}</p>
              <BulletsRender bullets={e.bullets} className="bm-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46545F"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Formación académica")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.school}</p><p className="m-0 text-[9.5pt]" style={{color:"#6B7A86"}}>{e.degree}{e.endDate?` | ${e.startDate?e.startDate+"–":""}${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
      </div>
      <style>{`.bm-b li{position:relative;padding-left:14px;margin-bottom:1px}.bm-b li:before{content:"•";position:absolute;left:0;color:#7C8B99}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2" style={{fontFamily:'"Cormorant Garamond",serif',fontSize:"19pt",fontWeight:600,color:"#37474F",borderBottom:"1px solid #C7D0D8",paddingBottom:3}}>{t}</h2>{children}</section>; }
function SecC({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0 text-center"><h2 className="m-0 mb-2" style={{fontFamily:'"Cormorant Garamond",serif',fontSize:"17pt",fontWeight:600,color:"#37474F"}}>{t}</h2>{children}</section>; }
