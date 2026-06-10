// FloristBloom — Florists, Garden Designers, Landscapers (soft botanical)
// Cream + rose/sage + hand-drawn bloom motifs + arch photo. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Bloom = ({ s=40, c="#D98C9F" }: { s?:number; c?:string }) => (
  <svg viewBox="0 0 40 40" width={s} height={s} fill="none" stroke={c} strokeWidth="1.4">
    {Array.from({length:6}).map((_,i)=>{const a=i*Math.PI/3;return <ellipse key={i} cx={20+8*Math.cos(a)} cy={20+8*Math.sin(a)} rx="6" ry="3.6" transform={`rotate(${i*60} ${20+8*Math.cos(a)} ${20+8*Math.sin(a)})`}/>;})}
    <circle cx="20" cy="20" r="3.4" fill={c} stroke="none"/>
  </svg>
);

export default function FloristBloom({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const R = "#B4566E", G = "#7A9471";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FBF7F0", color:"#473F3C", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <span aria-hidden style={{ position:"absolute", left:24, top:24 }}><Bloom s={52}/></span>
      <span aria-hidden style={{ position:"absolute", right:30, bottom:30 }}><Bloom s={44} c="#7A9471"/></span>
      <header className="relative" style={{ padding:"46px 52px 20px", display:"grid", gridTemplateColumns:"1fr 190px", gap:22, alignItems:"center" }}>
        <div>
          <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"42pt", lineHeight:0.98, color:"#3A3330" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1.5 uppercase" style={{ fontSize:"12pt", color:R, letterSpacing:"0.22em", fontWeight:600 }}>{basics.role}</p>
          <p className="m-0 mt-2 text-[9pt]" style={{ color:"#8A7F78" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
        <div style={{ width:180, height:220, borderRadius:"90px 90px 14px 14px", overflow:"hidden", border:`4px solid ${R}`, background:"#F2E6E0", justifySelf:"end", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:R,fontWeight:600,fontSize:"42pt",fontFamily:'"Cormorant Garamond",serif'}}>{initials(basics.fullName)}</span>}
        </div>
      </header>
      <div className="grid gap-9" style={{ padding:"16px 52px 46px", gridTemplateColumns:"1.45fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About")} c={R}><RichTextRender html={basics.summary} style={{color:"#5C534E",fontSize:"10.5pt",fontStyle:"italic"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} c={R}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]" style={{color:"#3A3330"}}>{e.role}</p>
              <p className="m-0 italic text-[10pt]" style={{color:G,fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="fb-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#5C534E"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={R}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#3A3330"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8A7F78"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Specialties")} c={R}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px dotted #E2D2C8":"0",color:"#52483F"}}><span style={{color:i%2?G:R,marginRight:8}}>❀</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c={R}>
            <ul className="fb-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#5C534E"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={R}>
            <p className="m-0 text-[10pt]" style={{color:"#5C534E"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.fb-b li{position:relative;padding-left:14px;margin-bottom:2px}.fb-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50% 50% 50% 0;background:#7A9471}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontFamily:'"Cormorant Garamond",serif',fontSize:"17pt",fontWeight:600,color:"#3A3330",borderBottom:`1px solid ${c}`,paddingBottom:3}}>{t}</h2>{children}</section>; }
