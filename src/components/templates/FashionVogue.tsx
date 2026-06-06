// FashionVogue — Fashion, Stylists, Models, Beauty editors, Creative directors
// White + black editorial + thin serif masthead + magazine grid. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function FashionVogue({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#111", fontFamily:'"Inter",sans-serif', fontSize:"10pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"40px 50px 14px", borderBottom:"2px solid #111" }}>
        <h1 className="m-0 text-center" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:500, fontSize:"54pt", lineHeight:0.9, letterSpacing:"0.04em", textTransform:"uppercase" }}>{basics.fullName}</h1>
        <div className="flex items-center justify-center gap-3 mt-2" style={{ fontSize:"10.5pt", letterSpacing:"0.32em", textTransform:"uppercase", color:"#444" }}>
          <span style={{flex:1,height:1,background:"#111",maxWidth:90}}/>{basics.role}<span style={{flex:1,height:1,background:"#111",maxWidth:90}}/>
        </div>
      </header>
      <div className="grid" style={{ gridTemplateColumns:"230px 1fr" }}>
        <aside style={{ padding:"22px 26px 40px", borderRight:"1px solid #111" }}>
          <div style={{ width:"100%", height:230, overflow:"hidden", background:"#EDEDED", marginBottom:18, filter:"grayscale(100%)" }}>
            {basics.photoUrl && <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
          </div>
          <SecS t={getLabel(data,"contact","Contact")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9pt",lineHeight:2,color:"#333"}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </SecS>
          <SecS t={getLabel(data,"skills","Expertise")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.8,color:"#333"}}>{skills.map((s,i)=>(<li key={i}>{s}</li>))}</ul>
          </SecS>
          {languages.length>0 && <SecS t={getLabel(data,"languages","Languages")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.8,color:"#333"}}>{languages.map((l,i)=>(<li key={i}>{l.name}{l.level?` — ${l.level}`:""}</li>))}</ul>
          </SecS>}
        </aside>
        <main style={{ padding:"22px 40px 40px" }}>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#2A2A2A",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <div className="flex items-start justify-between gap-3">
                <p className="m-0 font-semibold text-[11.5pt] uppercase" style={{letterSpacing:"0.04em",flex:1,minWidth:0}}>{e.role}</p>
                <span className="text-[8.5pt] whitespace-nowrap" style={{color:"#888",letterSpacing:"0.08em",flexShrink:0,paddingTop:2}}>{dateRange(e.startDate,e.endDate,e.current)}</span>
              </div>
              <p className="m-0 italic text-[10pt]" style={{color:"#555",fontFamily:'"Cormorant Garamond",serif',fontSize:"13pt"}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="fv-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#2A2A2A"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[10.5pt] uppercase" style={{letterSpacing:"0.03em"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#666"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Recognition")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#2A2A2A"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
        </main>
      </div>
      <style>{`.fv-b li{position:relative;padding-left:14px;margin-bottom:1px}.fv-b li:before{content:"—";position:absolute;left:0;color:#999}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:700,letterSpacing:"0.24em",color:"#111"}}>{t}</h2>{children}</section>; }
function SecS({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"10pt",fontWeight:700,letterSpacing:"0.2em",color:"#111"}}>{t}</h2>{children}</section>; }
