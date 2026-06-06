// OrganicBlush — warm cream/beige, organic floral bg, colored timeline date bars
// For accountants, admin, consultants, advisors — warm professional. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const BARS = ["#D8A38C","#9CAE84","#C290B0","#E0BBA0"];
export default function OrganicBlush({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#F2ECE2", color:"#5C4A3E", fontFamily:'"Cormorant Garamond","Georgia",serif', fontSize:"11pt", lineHeight:1.55 }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.5,
        backgroundImage:"radial-gradient(circle at 20% 8%,#E7DCCB 0 3px,transparent 4px),radial-gradient(circle at 60% 5%,#E7DCCB 0 3px,transparent 4px),radial-gradient(circle at 88% 12%,#E7DCCB 0 5px,transparent 6px),radial-gradient(circle at 40% 4%,#E7DCCB 0 2px,transparent 3px)", backgroundSize:"100% 120px", backgroundRepeat:"no-repeat" }}/>
      <header className="relative grid items-center" style={{ gridTemplateColumns:"230px 1fr", gap:30, padding:"44px 50px 22px" }}>
        <div style={{ width:200, height:222, background:"#fff", padding:10, boxShadow:"0 10px 24px rgba(120,90,70,0.22)", transform:"rotate(-2deg)" }}>
          <div style={{ width:"100%", height:"100%", overflow:"hidden", background:"#9DA68C" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"48pt"}}>{initials(basics.fullName)}</div>}
          </div>
        </div>
        <div>
          <h1 className="m-0" style={{ fontFamily:'"Pinyon Script",cursive', fontSize:"40pt", lineHeight:1.05, color:"#8A6A52", fontWeight:400 }}>{basics.fullName}</h1>
          <p className="m-0 mt-2 text-[15pt]" style={{ color:"#7A6253" }}>{basics.role}</p>
          {basics.summary && <div className="mt-3"><p className="m-0 mb-1 uppercase" style={{fontSize:"12pt",letterSpacing:"0.1em",color:"#6A5343",fontFamily:'"Inter",sans-serif',fontWeight:600}}>Sobre mí</p><RichTextRender html={basics.summary} style={{color:"#6A5747",fontSize:"10.5pt"}}/></div>}
        </div>
      </header>
      <div className="relative grid gap-10" style={{ padding:"16px 50px 44px", gridTemplateColumns:"0.85fr 1.25fr" }}>
        <div>
          <Sec t={getLabel(data,"contact","Contacto")}>
            <div className="text-[10.5pt]" style={{color:"#6A5747",lineHeight:1.9}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          </Sec>
          <Sec t={getLabel(data,"education","Educación")}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-bold uppercase text-[10.5pt]" style={{color:"#5C4A3E",fontFamily:'"Inter",sans-serif',letterSpacing:"0.02em"}}>{e.school}{e.endDate?` | ${e.endDate}`:""}</p><p className="m-0 text-[10.5pt]" style={{color:"#7A6253"}}>{e.degree}</p></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certificaciones")}>
            {certifications.map((c,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#5C4A3E"}}>{c.name}</p>{(c.issuer||c.year)&&<p className="m-0 italic text-[10pt]" style={{color:"#8A7263"}}>{[c.issuer,c.year].filter(Boolean).join(" – ")}</p>}</div>))}
          </Sec>}
          <Sec t={getLabel(data,"skills","Habilidades")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"2px 0",color:"#6A5747",display:"flex",gap:8}}><span style={{color:"#B08468"}}>•</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Idiomas")}>
            <div className="text-[10.5pt]" style={{color:"#6A5747"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"experience","Experiencia Laboral")}>
            {experience.map((e,i)=>(<div key={i} className="mb-4 last:mb-0">
              <div style={{ display:"inline-block", background:BARS[i%BARS.length], color:"#fff", fontFamily:'"Inter",sans-serif', fontSize:"9pt", padding:"2px 12px", marginBottom:5 }}>{dateRange(e.startDate,e.endDate,e.current)}</div>
              <p className="m-0 uppercase text-[14pt]" style={{color:"#5C4A3E",lineHeight:1.05}}>{e.company}</p>
              <p className="m-0 font-bold text-[11pt]" style={{color:"#7A5E4E",fontFamily:'"Inter",sans-serif'}}>{e.role}</p>
              <BulletsRender bullets={e.bullets} className="ob-b" style={{margin:"4px 0 0",padding:0,listStyle:"none",fontSize:"10.5pt",color:"#6A5747"}}/>
            </div>))}
          </Sec>
        </div>
      </div>
      <style>{`.ob-b li{position:relative;padding-left:15px;margin-bottom:2px}.ob-b li:before{content:"•";position:absolute;left:0;color:#B08468}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2" style={{fontSize:"20pt",fontWeight:500,color:"#8A6A52"}}>{t}</h2>{children}</section>; }
