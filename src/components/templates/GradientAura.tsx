// GradientAura — soft blue→pink aesthetic gradient aura, elegant serif, pill headers
// For marketing, social media, content, brand — modern feminine. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function GradientAura({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(135deg,#E7ECFB 0%,#EDE7F6 40%,#F7E6F0 70%,#FBEAF1 100%)", color:"#2C2A3A", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <div aria-hidden style={{ position:"absolute", bottom:120, right:-40, width:260, height:200, borderRadius:"50%", background:"radial-gradient(circle,#F3B6D6 0%,transparent 70%)", opacity:0.55 }}/>
      <div aria-hidden style={{ position:"absolute", bottom:-30, left:-30, width:220, height:200, borderRadius:"50%", background:"radial-gradient(circle,#C9BCF0 0%,transparent 70%)", opacity:0.5 }}/>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"232px 1fr", gap:26, padding:"44px 50px 24px" }}>
        <div style={{ width:212, height:236, borderRadius:"110px 110px 110px 110px / 130px 130px 130px 130px", overflow:"hidden", background:"#A7AEB8", boxShadow:"0 12px 30px rgba(120,110,160,0.3)" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"50pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:"54pt", lineHeight:0.9, fontWeight:500, color:"#2A2838" }}>{basics.fullName.split(" ")[0]}</h1>
          <p className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:"24pt", lineHeight:1, color:"#4A4660", letterSpacing:"0.08em", textTransform:"uppercase" }}>{basics.fullName.split(" ").slice(1).join(" ")}</p>
          <p className="m-0 mt-2" style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:"16pt", color:"#6A6480" }}>{basics.role}</p>
        </div>
      </header>
      <div className="relative grid gap-9" style={{ padding:"14px 50px 44px", gridTemplateColumns:"1fr 1.05fr" }}>
        <div>
          <Sec t={getLabel(data,"experience","Experiencia")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#2C2A3A"}}>{e.role}</p>
              <p className="m-0 uppercase text-[9pt]" style={{color:"#7E789A",letterSpacing:"0.08em"}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ga-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#4A4658"}}/>
            </div>))}
          </Sec>
        </div>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Sobre mí")}><RichTextRender html={basics.summary} style={{color:"#4A4658",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"education","Educación")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[10.5pt]" style={{color:"#2C2A3A"}}>{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#6A6480"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p></div>))}
          </Sec>
          <Sec t={getLabel(data,"skills","Software")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"2px 0",color:"#4A4658",display:"flex",gap:8}}><span style={{color:"#C07AB0"}}>•</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certificaciones")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#4A4658"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#2C2A3A"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          <Sec t={getLabel(data,"contact","Contacto")}>
            <div className="text-[10pt]" style={{color:"#4A4658",lineHeight:1.85}}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}{languages.length>0 && <div className="mt-1">{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>}</div>
          </Sec>
        </div>
      </div>
      <style>{`.ga-b li{position:relative;padding-left:13px;margin-bottom:2px}.ga-b li:before{content:"–";position:absolute;left:0;color:#C07AB0}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{ display:"inline-block", fontFamily:'"Cormorant Garamond",serif', fontSize:"17pt", fontWeight:500, color:"#3A3650", padding:"3px 20px", borderRadius:9999, border:"1.5px solid rgba(120,110,160,0.4)", background:"rgba(255,255,255,0.4)" }}>{t}</h2><div className="mt-2.5">{children}</div></section>; }
