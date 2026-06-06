// RetailVibrant — bright friendly orange/teal, bold rounded, energetic
// For retail, sales associates, customer service, hospitality front-line. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const ORANGE="#FF7A33", TEAL="#149E97", INK="#23272A", CREAM="#FFF8F1";
export default function RetailVibrant({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:CREAM, color:INK, fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"40px 48px 30px", background:`linear-gradient(110deg,${ORANGE} 0%,#FF9B5C 100%)`, color:"#fff", borderBottomLeftRadius:60 }}>
        <div className="grid items-center" style={{ gridTemplateColumns:"1fr 150px", gap:22 }}>
          <div>
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"40pt", lineHeight:0.96, letterSpacing:"-0.02em" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1.5 uppercase font-bold" style={{ fontSize:"13pt", letterSpacing:"0.1em", color:"rgba(255,255,255,0.95)" }}>{basics.role}</p>
            <p className="m-0 mt-3 text-[9.5pt]" style={{ color:"rgba(255,255,255,0.92)" }}>{[basics.phone,basics.email,basics.location].filter(Boolean).join("   ·   ")}</p>
          </div>
          <div style={{ width:142, height:142, borderRadius:"50%", overflow:"hidden", border:"5px solid #fff", background:"#E5B393", justifySelf:"end" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"42pt",fontWeight:800}}>{initials(basics.fullName)}</div>}
          </div>
        </div>
      </header>
      <div className="grid gap-8" style={{ padding:"26px 48px 44px", gridTemplateColumns:"1.4fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About Me")} c={TEAL}><RichTextRender html={basics.summary} style={{color:"#3A3E42",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} c={TEAL}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-extrabold text-[11.5pt]" style={{color:INK}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:ORANGE,fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="rv-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3A3E42"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={TEAL}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:INK}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6A6E72"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")} c={ORANGE}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 12px",fontSize:"9.5pt",fontWeight:700,color:"#fff",background:i%2?TEAL:ORANGE,borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c={ORANGE}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3A3E42"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1" style={{display:"flex",gap:7}}><span style={{color:TEAL}}>★</span><span><b style={{color:INK}}>{c.name}</b>{c.year?` · ${c.year}`:""}</span></li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={ORANGE}>
            <div className="text-[9.5pt]" style={{color:"#3A3E42"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.rv-b li{position:relative;padding-left:14px;margin-bottom:2px}.rv-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:${ORANGE}}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 inline-block uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.06em",color:"#fff",background:c,padding:"4px 16px",borderRadius:"10px 10px 10px 2px"}}>{t}</h2>{children}</section>; }
