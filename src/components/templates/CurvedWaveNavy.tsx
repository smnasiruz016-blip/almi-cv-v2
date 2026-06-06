// CurvedWaveNavy — Financial advisors, Consultants, Executives (clean wave)
// White + navy curved wave header + circle photo + condensed caps. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function CurvedWaveNavy({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], interests = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#2A323C", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <div className="relative" style={{ height:230 }}>
        <svg viewBox="0 0 794 230" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
          <path d="M0 0 H794 V150 Q560 235 300 175 Q120 132 0 192 Z" fill="#1F3A52"/>
          <path d="M0 0 H794 V120 Q560 205 300 145 Q120 102 0 162 Z" fill="#2C5274" opacity="0.6"/>
        </svg>
        <div style={{ position:"absolute", left:48, top:36, width:160, height:160, borderRadius:"50%", overflow:"hidden", background:"#dfe6ec", border:"4px solid #fff", boxShadow:"0 4px 14px rgba(0,0,0,0.2)" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#1F3A52",fontWeight:700,fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div style={{ position:"absolute", left:240, top:56, right:40 }}>
          <h1 className="m-0 uppercase" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"0.02em", color:"#fff" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#C6DDF0", letterSpacing:"0.22em", fontWeight:600 }}>{basics.role}</p>
        </div>
      </div>
      <div className="grid gap-9" style={{ padding:"14px 48px 44px", gridTemplateColumns:"1fr 1.55fr" }}>
        <div>
          <Sec t={getLabel(data,"contact","Contacto")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9,color:"#3C4854"}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </Sec>
          {interests.length>0 && <Sec t={getLabel(data,"interests","Información")}>
            <ul className="cwn-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3C4854"}}>{interests.map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </Sec>}
          <Sec t={getLabel(data,"skills","Herramientas")}>
            {skills.slice(0,7).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt] uppercase font-semibold" style={{letterSpacing:"0.02em",color:"#2A323C"}}>{s}</div><div style={{height:6,marginTop:2,borderRadius:4,background:"#DCE3EA"}}><div style={{height:"100%",borderRadius:4,width:`${88-i*6}%`,background:"#1F3A52"}}/></div></div>))}
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Idiomas")}>
            <table style={{fontSize:"9.5pt",color:"#3C4854"}}><tbody>{languages.map((l,i)=>(<tr key={i}><td className="uppercase font-bold pr-3" style={{letterSpacing:"0.02em"}}>{l.name}</td><td>{l.level}</td></tr>))}</tbody></table>
          </Sec>}
        </div>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Mi Perfil")}><RichTextRender html={basics.summary} style={{color:"#46525F",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experiencia")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 uppercase font-bold text-[11pt]" style={{color:"#1F3A52"}}>{e.role}</p>
              <p className="m-0 italic text-[9.5pt]" style={{color:"#3C5670",fontWeight:600}}>{e.company} {e.startDate&&`(${dateRange(e.startDate,e.endDate,e.current)})`}</p>
              <BulletsRender bullets={e.bullets} className="cwn-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46525F"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Formación")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 uppercase font-bold text-[10.5pt]" style={{color:"#1F3A52"}}>{e.school} {e.startDate&&<span style={{color:"#6B7884",fontWeight:400}}>({e.startDate}{e.endDate?` - ${e.endDate}`:""})</span>}</p><p className="m-0 text-[9.5pt]" style={{color:"#46525F"}}>{e.degree}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certificaciones")}><ul className="cwn-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46525F"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul></Sec>}
        </div>
      </div>
      <style>{`.cwn-b li{position:relative;padding-left:14px;margin-bottom:1px}.cwn-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#2C5274}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"13pt",fontWeight:800,letterSpacing:"0.06em",color:"#1F3A52",borderBottom:"2px solid #1F3A52",paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
