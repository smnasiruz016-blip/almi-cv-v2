// RedAccentClean — clean white + gray sidebar, bold red pill accents, divider rule
// For designers, illustrators, general professional — crisp & confident. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const RED="#E03B2F", INK="#1E1E1E";
export default function RedAccentClean({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:INK, fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10pt", lineHeight:1.55 }}>
      <div className="grid" style={{ gridTemplateColumns:"256px 1fr", minHeight:1123 }}>
        <aside style={{ background:"#ECEAE6", padding:"40px 26px" }}>
          <div style={{ width:188, height:188, margin:"0 auto 26px", overflow:"hidden", background:"#BEC2C6" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"46pt",fontWeight:700}}>{initials(basics.fullName)}</div>}
          </div>
          <Pill t={getLabel(data,"contact","Contacto")}/>
          <div className="text-[9.5pt] mb-6" style={{color:"#3A3A3A",lineHeight:1.85}}>{[basics.phone,basics.email,basics.location,basics.website].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          {certifications.length>0 && <><Pill t={getLabel(data,"certifications","Más Información")}/><ul style={{margin:"0 0 24px",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3A3A3A"}}>{certifications.map((c,i)=>(<li key={i} style={{padding:"2px 0",display:"flex",gap:7}}><span style={{color:RED}}>•</span>{c.name}</li>))}</ul></>}
          {languages.length>0 && <><Pill t={getLabel(data,"languages","Idiomas")}/><div className="mb-6">{languages.map((l,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold uppercase text-[9.5pt]" style={{color:INK}}>{l.name}:</p><p className="m-0 text-[9.5pt]" style={{color:"#4A4A4A"}}>{l.level||""}</p></div>))}</div></>}
        </aside>
        <main className="relative" style={{ padding:"42px 44px 42px 40px" }}>
          <div style={{ position:"absolute", left:0, top:46, bottom:46, width:2, background:RED }}/>
          <header className="mb-6">
            <h1 className="m-0" style={{ fontWeight:800, fontSize:"34pt", lineHeight:1, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1.5 uppercase font-bold flex items-center gap-2" style={{ fontSize:"12pt", color:RED, letterSpacing:"0.04em" }}><span>›</span>{basics.role}</p>
          </header>
          {basics.summary && <Sec t={getLabel(data,"summary","Sobre Mí")}><RichTextRender html={basics.summary} style={{color:"#3A3A3A",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experiencia Laboral")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 uppercase font-bold text-[10.5pt]" style={{color:INK,letterSpacing:"0.03em"}}>{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#6A6A6A"}}>{e.company} | {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="rac-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3A3A3A"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Datos Académicos")}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 uppercase font-bold text-[10pt]" style={{color:INK}}>{e.school}</p><p className="m-0 text-[9.5pt]" style={{color:"#6A6A6A"}}>{e.degree}{e.endDate?` | ${dateRange(e.startDate,e.endDate)}`:""}</p></div>))}
          </Sec>
          <Sec t={getLabel(data,"skills","Habilidades")}>
            <div className="grid gap-x-6 gap-y-1" style={{gridTemplateColumns:"1fr 1fr"}}>{skills.map((s,i)=>(<div key={i} style={{color:"#3A3A3A",display:"flex",gap:8}}><span style={{color:RED}}>•</span>{s}</div>))}</div>
          </Sec>
        </main>
      </div>
      <style>{`.rac-b li{position:relative;padding-left:14px;margin-bottom:2px}.rac-b li:before{content:"•";position:absolute;left:0;color:${RED}}`}</style>
    </article>
  );
}
function Pill({ t }: { t:string }){ return <div className="inline-block mb-2.5" style={{ background:RED, color:"#fff", padding:"4px 18px", borderRadius:9999, fontSize:"11pt", fontWeight:700 }}>{t}</div>; }
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"12pt",fontWeight:800,letterSpacing:"0.02em",color:INK}}>{t}</h2>{children}</section>; }
