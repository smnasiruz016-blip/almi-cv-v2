// WatercolorBlush — soft pink/blush watercolor, elegant serif + script name, photo block
// For designers, creatives, admin, marketing — feminine elegant. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function WatercolorBlush({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(160deg,#FBEDE6 0%,#FCF4EE 45%,#FAEAE2 100%)", color:"#5A4038", fontFamily:'"Cormorant Garamond","Georgia",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <div aria-hidden style={{ position:"absolute", top:-60, right:-40, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,#F4CDBE 0%,transparent 70%)", opacity:0.6 }}/>
      <div aria-hidden style={{ position:"absolute", bottom:-80, left:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle,#F6D9CE 0%,transparent 70%)", opacity:0.5 }}/>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"230px 1fr", gap:0, padding:"42px 48px 22px" }}>
        <div style={{ width:212, height:236, background:"#9FB0A8", overflow:"hidden", boxShadow:"0 10px 26px rgba(150,100,90,0.25)" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"54pt",fontWeight:500}}>{initials(basics.fullName)}</div>}
        </div>
        <div style={{ background:"#F3C9BA", margin:"18px 0 18px -18px", padding:"34px 30px", position:"relative", minHeight:200, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <h1 className="m-0" style={{ fontFamily:'"Pinyon Script","Cormorant Garamond",cursive', fontSize:"44pt", lineHeight:0.95, color:"#4A332C", fontWeight:400 }}>{basics.fullName}</h1>
          <p className="m-0 mt-3 uppercase" style={{ fontSize:"15pt", letterSpacing:"0.18em", color:"#6B4A40", fontWeight:500 }}>{basics.role}</p>
        </div>
      </header>
      <div className="relative grid gap-10" style={{ padding:"14px 48px 44px", gridTemplateColumns:"1fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","PERFIL")}><RichTextRender html={basics.summary} style={{color:"#6A4F46",fontSize:"11pt"}}/></Sec>}
          <Sec t={getLabel(data,"skills","HABILIDADES")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"11pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"3px 0",color:"#5A4038",display:"flex",gap:8}}><span style={{color:"#C77E66"}}>•</span>{s}</li>))}</ul>
          </Sec>
          <Sec t={getLabel(data,"contact","CONTACTO")}>
            <div className="text-[10.5pt]" style={{color:"#6A4F46",lineHeight:1.9}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"education","EDUCACIÓN")}>
            {education.map((e,i)=>(<div key={i} className="mb-2.5"><p className="m-0 font-bold text-[11.5pt]" style={{color:"#4A332C"}}>{e.school}</p><p className="m-0 text-[10.5pt]" style={{color:"#7A5C52"}}>{dateRange(e.startDate,e.endDate)}{e.degree?` | ${e.degree}`:""}</p>{e.notes&&<p className="m-0 text-[10pt]" style={{color:"#8A6C62"}}>{e.notes}</p>}</div>))}
          </Sec>
          <Sec t={getLabel(data,"experience","EXPERIENCIA")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold uppercase text-[10.5pt]" style={{color:"#4A332C",letterSpacing:"0.02em"}}>{e.company}</p>
              <p className="m-0 text-[10.5pt]" style={{color:"#C77E66",fontWeight:600}}>{e.role} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="wb-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"10.5pt",color:"#6A4F46"}}/>
            </div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","CERTIFICACIONES")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#6A4F46"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#4A332C"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","IDIOMAS")}>
            <div className="text-[10.5pt]" style={{color:"#6A4F46"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.wb-b li{position:relative;padding-left:14px;margin-bottom:2px}.wb-b li:before{content:"•";position:absolute;left:0;color:#C77E66}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-6 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"17pt",fontWeight:600,color:"#5A4038",letterSpacing:"0.04em"}}>{t}</h2>{children}</section>; }
