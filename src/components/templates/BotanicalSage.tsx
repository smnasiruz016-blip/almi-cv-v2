// BotanicalSage — soft sage green, botanical leaf motifs, vertical script name
// For environmental, wellness, eco, sustainability, NGO roles. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

function Leaf({ style }: { style?:React.CSSProperties }){
  return (<svg viewBox="0 0 60 90" style={style} fill="none"><path d="M30 4 C8 24 8 64 30 86 C52 64 52 24 30 4 Z" fill="#A9C29A" opacity="0.55"/><path d="M30 8 V82" stroke="#7E9C6E" strokeWidth="1.4"/>{[20,34,48,62].map((y,i)=>(<g key={i}><path d={`M30 ${y} L${30-12} ${y-8}`} stroke="#7E9C6E" strokeWidth="1"/><path d={`M30 ${y} L${30+12} ${y-8}`} stroke="#7E9C6E" strokeWidth="1"/></g>))}</svg>);
}

export default function BotanicalSage({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#EAF0E2", color:"#3F4A38", fontFamily:'"Cormorant Garamond","Georgia",serif', fontSize:"11pt", lineHeight:1.6 }}>
      <Leaf style={{ position:"absolute", top:-6, right:24, width:70, height:100, transform:"rotate(24deg)" }}/>
      <Leaf style={{ position:"absolute", top:60, right:90, width:54, height:80, transform:"rotate(-12deg)" }}/>
      <Leaf style={{ position:"absolute", bottom:20, left:18, width:64, height:96, transform:"rotate(-28deg)" }}/>
      <Leaf style={{ position:"absolute", bottom:90, left:74, width:46, height:70, transform:"rotate(16deg)" }}/>
      <div className="relative grid" style={{ gridTemplateColumns:"210px 1fr", minHeight:1123 }}>
        <aside className="relative" style={{ padding:"40px 18px 40px 40px" }}>
          <div style={{ width:120, height:120, overflow:"hidden", border:"5px solid #fff", boxShadow:"0 6px 16px rgba(80,100,60,0.2)", marginBottom:30 }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",background:"#9DB48C",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"34pt"}}>{initials(basics.fullName)}</div>}
          </div>
          <div style={{ writingMode:"vertical-rl", transform:"rotate(180deg)", display:"flex", alignItems:"flex-end", gap:14, height:520 }}>
            <span style={{ fontFamily:'"Pinyon Script",cursive', fontSize:"40pt", color:"#6E8C5E", fontWeight:400, lineHeight:0.9 }}>{basics.fullName}</span>
            <span style={{ fontSize:"13pt", letterSpacing:"0.06em", color:"#5A6B4E" }}>{basics.role}</span>
          </div>
        </aside>
        <main style={{ padding:"42px 48px 42px 10px" }}>
          {basics.summary && <Sec t={getLabel(data,"summary","INFOS")}><RichTextRender html={basics.summary} style={{color:"#4E5A44",fontSize:"11pt"}}/></Sec>}
          <Sec t={getLabel(data,"contact","CONTACT")}>
            <div className="text-[10.5pt]" style={{color:"#4E5A44",lineHeight:1.9}}>{[basics.location,basics.phone,basics.email,basics.website].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          </Sec>
          <Sec t={getLabel(data,"experience","EXPÉRIENCES PROFESSIONNELLES")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[12.5pt]" style={{color:"#34402D"}}>{e.role}</p>
              <p className="m-0 italic text-[10.5pt]" style={{color:"#6E8C5E"}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="bs-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"10.5pt",color:"#4E5A44"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","FORMATION")}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-bold text-[11.5pt]" style={{color:"#34402D"}}>{e.school}</p><p className="m-0 italic text-[10.5pt]" style={{color:"#6E7C5E"}}>{e.degree}{e.endDate?`, ${dateRange(e.startDate,e.endDate)}`:""}</p></div>))}
          </Sec>
          <div className="grid gap-8" style={{gridTemplateColumns:"1fr 1fr"}}>
            <Sec t={getLabel(data,"skills","COMPÉTENCES")}>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"2px 0",color:"#4E5A44",display:"flex",gap:8}}><span style={{color:"#7E9C6E"}}>❧</span>{s}</li>))}</ul>
            </Sec>
            <div>
              {certifications.length>0 && <Sec t={getLabel(data,"certifications","CERTIFICATIONS")}>
                <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",color:"#4E5A44"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><b style={{color:"#34402D"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
              </Sec>}
              {languages.length>0 && <Sec t={getLabel(data,"languages","LANGUES")}>
                <div className="text-[10.5pt]" style={{color:"#4E5A44"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
              </Sec>}
            </div>
          </div>
        </main>
      </div>
      <style>{`.bs-b li{position:relative;padding-left:14px;margin-bottom:2px}.bs-b li:before{content:"–";position:absolute;left:0;color:#7E9C6E}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"12.5pt",fontWeight:700,color:"#6E8C5E",letterSpacing:"0.12em",fontFamily:'"Inter",sans-serif'}}>{t}</h2>{children}</section>; }
