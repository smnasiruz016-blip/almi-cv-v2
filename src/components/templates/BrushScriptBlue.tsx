// BrushScriptBlue — white + sky-blue watercolor brush strokes, script headers, photo
// For writers, journalists, copywriters, content creators. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

function Brush({ style, w=260 }: { style?:React.CSSProperties; w?:number }){
  return (<svg viewBox="0 0 260 70" preserveAspectRatio="none" style={style} width={w}><path d="M4 40 C40 18 80 52 120 32 C160 14 200 50 256 28 L256 56 C200 70 150 44 110 58 C70 70 36 50 4 60 Z" fill="#BFE0EE"/></svg>);
}
export default function BrushScriptBlue({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#2A2E33", fontFamily:'"Cormorant Garamond","Georgia",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <header className="relative grid items-start" style={{ gridTemplateColumns:"1fr 250px", gap:20, padding:"46px 50px 16px" }}>
        <div>
          <h1 className="m-0" style={{ fontFamily:'"Pinyon Script",cursive', fontSize:"48pt", lineHeight:1.04, color:"#1F2937", fontWeight:400 }}>{basics.fullName}</h1>
          <div className="inline-block mt-3" style={{ border:"1.4px solid #2A2E33", borderRadius:"50%/60%", padding:"5px 22px" }}>
            <span className="uppercase" style={{ fontFamily:'"Inter",sans-serif', fontSize:"11pt", letterSpacing:"0.22em", color:"#2A2E33" }}>{basics.role}</span>
          </div>
          {basics.summary && <div className="mt-4" style={{ maxWidth:380 }}><RichTextRender html={basics.summary} style={{color:"#4A4E53",fontSize:"11pt"}}/></div>}
        </div>
        <div className="relative" style={{ paddingTop:6 }}>
          <div style={{ position:"absolute", inset:"-14px", borderRadius:"50%", background:"#BFE0EE", opacity:0.7 }}/>
          <div className="relative" style={{ width:212, height:212, borderRadius:"50%", overflow:"hidden", background:"#A9B4BD" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"54pt"}}>{initials(basics.fullName)}</div>}
          </div>
        </div>
      </header>
      <div className="grid gap-10" style={{ padding:"10px 50px 44px", gridTemplateColumns:"1.4fr 1fr" }}>
        <div>
          <Sec t={getLabel(data,"experience","Experiencia")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 text-[10.5pt]" style={{color:"#6A7078",fontFamily:'"Inter",sans-serif'}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <p className="m-0 uppercase font-semibold text-[11.5pt]" style={{color:"#1F2937",fontFamily:'"Inter",sans-serif',letterSpacing:"0.04em"}}>{e.role}</p>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#4A8FB0"}}>{e.company}</p>
              <BulletsRender bullets={e.bullets} className="bsb-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10.5pt",color:"#4A4E53"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Formación")}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 underline text-[10.5pt]" style={{color:"#1F2937",fontFamily:'"Inter",sans-serif',fontWeight:600}}>{dateRange(e.startDate,e.endDate)} · {e.degree}</p><p className="m-0 text-[10.5pt]" style={{color:"#5A6068"}}>{e.school}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Habilidades")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"3px 0",color:"#3A4046",display:"flex",gap:8}}><span style={{color:"#4A8FB0"}}>•</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certificaciones")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#4A4E53"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#1F2937"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          <Sec t={getLabel(data,"languages","Idiomas")}>
            {languages.length>0 ? languages.map((l,i)=>(<div key={i} className="flex justify-between text-[10.5pt]" style={{color:"#3A4046",borderBottom:"1px solid #E4ECF0",padding:"3px 0"}}><span>{l.name}</span><span style={{color:"#6A7078"}}>{l.level||""}</span></div>)) : null}
          </Sec>
          <Sec t={getLabel(data,"contact","Contacto")}>
            <div className="text-[10.5pt]" style={{color:"#3A4046",lineHeight:1.85}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          </Sec>
        </div>
      </div>
      <style>{`.bsb-b li{position:relative;padding-left:14px;margin-bottom:2px}.bsb-b li:before{content:"•";position:absolute;left:0;color:#4A8FB0}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return (<section className="mb-6 last:mb-0">
  <div className="relative inline-block mb-2.5" style={{ paddingRight:8 }}>
    <svg viewBox="0 0 260 70" preserveAspectRatio="none" style={{ position:"absolute", left:-10, top:6, width:"112%", height:42, zIndex:0 }}><path d="M4 40 C40 18 80 52 120 32 C160 14 200 50 256 28 L256 56 C200 70 150 44 110 58 C70 70 36 50 4 60 Z" fill="#BFE0EE"/></svg>
    <h2 className="m-0 relative" style={{ fontFamily:'"Pinyon Script",cursive', fontSize:"30pt", color:"#1F2937", fontWeight:400, zIndex:1, paddingLeft:6 }}>{t}</h2>
  </div>
  <div>{children}</div>
</section>); }
