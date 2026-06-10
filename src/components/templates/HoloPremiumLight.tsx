// HoloPremiumLight — Senior professionals, consultants (light premium holographic)
// Soft pearl + holographic pastel sheen corners + thin gold rules + elegant type. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function HoloPremiumLight({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const G = "#B08D3E";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FBFAF7", color:"#26242B", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.6 }}>
      <div aria-hidden>
        <span style={{ position:"absolute", right:-110, top:-110, width:330, height:330, borderRadius:"50%", background:"radial-gradient(circle at 35% 65%, rgba(244,185,168,0.55), rgba(199,216,240,0.4) 55%, transparent 75%)" }}/>
        <span style={{ position:"absolute", left:-120, bottom:-120, width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle at 65% 35%, rgba(229,199,232,0.5), rgba(235,210,160,0.35) 55%, transparent 75%)" }}/>
      </div>
      <header className="relative" style={{ padding:"54px 60px 24px", display:"grid", gridTemplateColumns:"1fr 170px", gap:24, alignItems:"center" }}>
        <div>
          <p className="m-0 mb-2 uppercase text-[9pt]" style={{ color:G, letterSpacing:"0.4em", fontWeight:600 }}>Curriculum Vitae</p>
          <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"42pt", lineHeight:0.98, color:"#1E1C23" }}>{basics.fullName}</h1>
          <p className="m-0 mt-2 uppercase" style={{ fontSize:"12pt", color:"#6B6675", letterSpacing:"0.24em", fontWeight:600 }}>{basics.role}</p>
        </div>
        <div style={{ width:160, height:160, borderRadius:"50%", padding:4, background:"linear-gradient(135deg,#E8C77A,#E5B7D8,#C7D8F0)", justifySelf:"end" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#EEEAE2", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:G,fontWeight:600,fontSize:"38pt",fontFamily:'"Cormorant Garamond",serif'}}>{initials(basics.fullName)}</span>}
          </div>
        </div>
      </header>
      <div className="relative" style={{ margin:"0 60px", height:1, background:`linear-gradient(90deg,transparent,${G},transparent)` }}/>
      <div className="relative grid gap-10" style={{ padding:"26px 60px 48px", gridTemplateColumns:"1fr 1.5fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} g={G}><RichTextRender html={basics.summary} style={{color:"#4E4956",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","Expertise")} g={G}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"4px 0",borderBottom:i<skills.length-1?"1px solid #EAE4D8":"0",color:"#3E3947"}}><span style={{color:G,marginRight:8}}>◆</span>{s}</li>))}</ul>
          </Sec>
          <Sec t={getLabel(data,"contact","Contact")} g={G}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:2,color:"#4E4956",wordBreak:"break-word"}}>{[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} g={G}>
            <p className="m-0 text-[10pt]" style={{color:"#4E4956"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</p>
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experience")} g={G}>
            {experience.map((e,i)=>(<div key={i} className="mb-4 last:mb-0">
              <div className="flex items-start justify-between gap-3">
                <p className="m-0 font-bold text-[11.5pt]" style={{flex:1,minWidth:0,color:"#1E1C23"}}>{e.role}</p>
                <span className="text-[9pt] whitespace-nowrap" style={{color:G,flexShrink:0,paddingTop:3,fontWeight:600}}>{dateRange(e.startDate,e.endDate,e.current)}</span>
              </div>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#6B6675",fontFamily:'"Cormorant Garamond",serif',fontSize:"12.5pt"}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="hpl-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4E4956"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} g={G}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#1E1C23"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6B6675"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} g={G}>
            <p className="m-0 text-[10pt]" style={{color:"#4E4956"}}>{certifications.map(c=>`${c.name}${c.year?` (${c.year})`:""}`).join("  ·  ")}</p>
          </Sec>}
        </div>
      </div>
      <style>{`.hpl-b li{position:relative;padding-left:14px;margin-bottom:2px}.hpl-b li:before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;background:#B08D3E;transform:rotate(45deg)}`}</style>
    </article>
  );
}
function Sec({ t, g, children }: { t:string; g:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.2em",color:"#1E1C23"}}><span style={{borderBottom:`2px solid ${g}`,paddingBottom:3}}>{t}</span></h2>{children}</section>; }
