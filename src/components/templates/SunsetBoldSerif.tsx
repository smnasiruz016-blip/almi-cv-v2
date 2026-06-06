// SunsetBoldSerif — warm coral→peach gradient aura, huge bold display serif name
// For marketing, creative directors, brand, design leads. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function SunsetBoldSerif({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#ECEAE6", color:"#1A1A1A", fontFamily:'"Cormorant Garamond","Georgia",serif', fontSize:"11pt", lineHeight:1.5 }}>
      <div aria-hidden style={{ position:"absolute", top:-120, left:-120, width:520, height:480, borderRadius:"50%", background:"radial-gradient(circle,#FF8A5C 0%,#FF6FA0 38%,transparent 70%)", opacity:0.5, filter:"blur(6px)" }}/>
      <header className="relative grid items-start" style={{ gridTemplateColumns:"1fr 196px", gap:24, padding:"46px 50px 18px" }}>
        <div>
          <h1 className="m-0" style={{ fontFamily:'"Fraunces","Cormorant Garamond",serif', fontWeight:600, fontSize:"62pt", lineHeight:0.86, letterSpacing:"-0.01em" }}>{basics.fullName.split(" ")[0]}<br/>{basics.fullName.split(" ").slice(1).join(" ")}</h1>
          <p className="m-0 mt-4 text-[11pt]" style={{ fontFamily:'"Inter",sans-serif', color:"#2A2A2A", fontWeight:500 }}>{[basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
        </div>
        <div style={{ width:188, height:210, overflow:"hidden", background:"#C7B8AE", clipPath:"polygon(8% 0,100% 4%,96% 100%,0 94%)" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"44pt"}}>{initials(basics.fullName)}</div>}
        </div>
      </header>
      <div className="relative" style={{ padding:"0 50px", marginTop:6 }}><div style={{ height:1.5, background:"#1A1A1A" }}/></div>
      <div className="relative" style={{ padding:"24px 50px 44px" }}>
        {basics.summary && <section className="mb-6"><h2 className="m-0 mb-2" style={Hd}>{getLabel(data,"summary","Profil professionnel")}</h2><RichTextRender html={basics.summary} style={{color:"#333",fontSize:"11pt",fontFamily:'"Inter",sans-serif',textAlign:"justify"}}/></section>}
        <section className="mb-6">
          <h2 className="m-0 mb-3" style={Hd}>{getLabel(data,"experience","Expériences professionnelles")}</h2>
          {experience.map((e,i)=>(<div key={i} className="grid mb-3 last:mb-0" style={{gridTemplateColumns:"1fr 1fr",gap:18}}>
            <div><p className="m-0 uppercase font-bold text-[11pt]" style={{fontFamily:'"Inter",sans-serif'}}>{e.role}</p><BulletsRender bullets={e.bullets} className="sbs-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#444",fontFamily:'"Inter",sans-serif'}}/></div>
            <div style={{borderLeft:"1.5px solid #1A1A1A",paddingLeft:16}}><p className="m-0 font-semibold text-[11pt]" style={{fontFamily:'"Inter",sans-serif'}}>{e.company}</p><p className="m-0 text-[10pt]" style={{color:"#666",fontFamily:'"Inter",sans-serif'}}>{dateRange(e.startDate,e.endDate,e.current)}</p></div>
          </div>))}
        </section>
        <section className="mb-6">
          <h2 className="m-0 mb-3" style={Hd}>{getLabel(data,"education","Formations")}</h2>
          {education.map((e,i)=>(<div key={i} className="grid mb-2 last:mb-0" style={{gridTemplateColumns:"1fr 1fr",gap:18}}>
            <p className="m-0 uppercase font-bold text-[11pt]" style={{fontFamily:'"Inter",sans-serif'}}>{e.degree}</p>
            <div style={{borderLeft:"1.5px solid #1A1A1A",paddingLeft:16}}><p className="m-0 font-semibold text-[11pt]" style={{fontFamily:'"Inter",sans-serif'}}>{e.school}</p><p className="m-0 text-[10pt]" style={{color:"#666",fontFamily:'"Inter",sans-serif'}}>{dateRange(e.startDate,e.endDate)}</p></div>
          </div>))}
        </section>
        <section className="grid" style={{gridTemplateColumns:"1fr 1fr",gap:30}}>
          <div><h2 className="m-0 mb-2" style={Hd}>{getLabel(data,"skills","Compétences")}</h2><ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt",fontFamily:'"Inter",sans-serif',color:"#333"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"2px 0"}}>{s}</li>))}</ul></div>
          <div>
            {certifications.length>0 && <><h2 className="m-0 mb-2" style={Hd}>{getLabel(data,"certifications","Certifications")}</h2><ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",fontFamily:'"Inter",sans-serif',color:"#333"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul></>}
            {languages.length>0 && <div className="mt-3"><h2 className="m-0 mb-2" style={Hd}>{getLabel(data,"languages","Langues")}</h2><div className="text-[10.5pt]" style={{fontFamily:'"Inter",sans-serif',color:"#333"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div></div>}
          </div>
        </section>
      </div>
      <style>{`.sbs-b li{position:relative;padding-left:13px;margin-bottom:1px}.sbs-b li:before{content:"•";position:absolute;left:0}`}</style>
    </article>
  );
}
const Hd: React.CSSProperties = { fontFamily:'"Fraunces","Cormorant Garamond",serif', fontWeight:600, fontSize:"21pt", letterSpacing:"-0.01em" };
