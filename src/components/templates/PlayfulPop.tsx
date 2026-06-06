// PlayfulPop — colorful bold pop, rounded boxes, thick black borders, lime/lavender/pink
// For copywriters, creatives, marketing, social — fun & bold. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const LIME="#D6E85B", LAV="#C7C5F5", PINK="#F2C7EC", INK="#1A1A1A", CREAM="#FBFAF0";
export default function PlayfulPop({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:CREAM, color:INK, fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10pt", lineHeight:1.5 }}>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"210px 1fr", gap:18, padding:"36px 44px 18px" }}>
        <div className="relative">
          <div style={{ position:"absolute", inset:"-6px -6px 14px -6px", borderRadius:"50%", background:LAV }}/>
          <div className="relative" style={{ width:190, height:190, borderRadius:"50%", overflow:"hidden", border:`3px solid ${INK}`, background:"#AEB4BD" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"48pt",fontWeight:800}}>{initials(basics.fullName)}</div>}
          </div>
        </div>
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"40pt", lineHeight:0.92, letterSpacing:"-0.02em" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1.5 uppercase font-extrabold" style={{ fontSize:"13pt", letterSpacing:"0.04em" }}>{basics.role}</p>
          {basics.summary && <div style={{ marginTop:8 }}><RichTextRender html={basics.summary} style={{color:"#333",fontSize:"10pt"}}/></div>}
        </div>
      </header>
      <div className="grid gap-5" style={{ padding:"10px 44px 40px", gridTemplateColumns:"0.9fr 1.3fr" }}>
        <div className="flex flex-col gap-4">
          <Card bg={CREAM} t={getLabel(data,"contact","Contacto")}>
            <div className="text-[9.5pt]" style={{lineHeight:1.85}}>{[basics.location,basics.email,basics.phone,basics.website].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          </Card>
          <Card bg={LAV} t={getLabel(data,"skills","Competencias")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"2px 0",display:"flex",gap:7}}><span>◆</span>{s}</li>))}</ul>
            {languages.length>0 && <div className="mt-3" style={{borderTop:`2px dotted ${INK}`,paddingTop:8}}><p className="m-0 font-extrabold uppercase text-[9pt] mb-1">Idiomas</p><div className="text-[9.5pt]">{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(", ")}</div></div>}
          </Card>
          <Card bg={LIME} t={getLabel(data,"education","Formación")}>
            {education.map((e,i)=>(<div key={i} className="mb-2 last:mb-0"><p className="m-0 font-extrabold uppercase text-[9.5pt]">{e.degree}</p><p className="m-0 text-[9pt]">{dateRange(e.startDate,e.endDate)} · {e.school}</p></div>))}
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card bg={LIME} t={getLabel(data,"experience","Experiencia")}>
            {experience.map((e,i)=>(<div key={i} style={{paddingBottom:i<experience.length-1?10:0,marginBottom:i<experience.length-1?10:0,borderBottom:i<experience.length-1?`2px dotted ${INK}`:"0"}}>
              <div className="flex justify-between items-baseline"><p className="m-0 font-extrabold uppercase text-[10.5pt]">{e.role}</p><span className="text-[9pt] font-bold">{dateRange(e.startDate,e.endDate,e.current)}</span></div>
              <p className="m-0 text-[9.5pt]" style={{color:"#444"}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="pp-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#333"}}/>
            </div>))}
          </Card>
          <Card bg={PINK} t={getLabel(data,"certifications","Expertise")}>
            {certifications.length>0 ? <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt"}}>{certifications.map((c,i)=>(<li key={i} style={{padding:"2px 0",display:"flex",gap:7}}><span>★</span><span><b>{c.name}</b>{c.year?` · ${c.year}`:""}</span></li>))}</ul>
             : <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt"}}>{skills.slice(0,6).map((s,i)=>(<li key={i} style={{padding:"2px 0",display:"flex",gap:7}}><span>★</span>{s}</li>))}</ul>}
          </Card>
        </div>
      </div>
      <style>{`.pp-b li{position:relative;padding-left:13px;margin-bottom:1px}.pp-b li:before{content:"•";position:absolute;left:0;font-weight:800}`}</style>
    </article>
  );
}
function Card({ bg, t, children }: { bg:string; t:string; children:React.ReactNode }){
  return (<section style={{ background:bg, border:`3px solid ${INK}`, borderRadius:18, boxShadow:`5px 6px 0 ${INK}`, overflow:"hidden" }}>
    <div style={{ background:bg, borderBottom:`3px solid ${INK}`, padding:"7px 16px", fontWeight:800, fontSize:"12pt" }}>{t}</div>
    <div style={{ padding:"12px 16px" }}>{children}</div>
  </section>);
}
