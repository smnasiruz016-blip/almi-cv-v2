// BroadcastMedia — Journalists, Broadcasters, TV/Radio, Reporters, Presenters
// White + bold red + charcoal + mic/on-air/play motif. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function BroadcastMedia({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#1C1C1E", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"36px 48px 26px", background:"#16161A", color:"#fff" }}>
        <span style={{ position:"absolute", top:22, right:46, display:"inline-flex", alignItems:"center", gap:6, background:"#E0241B", color:"#fff", fontSize:"8.5pt", fontWeight:800, letterSpacing:"0.18em", padding:"3px 10px", borderRadius:4 }}><span style={{width:7,height:7,borderRadius:"50%",background:"#fff"}}/>ON AIR</span>
        <div style={{ display:"grid", gridTemplateColumns: basics.photoUrl?"104px 1fr":"1fr", gap:18, alignItems:"center" }}>
          {basics.photoUrl && <div style={{ width:100, height:100, borderRadius:"50%", overflow:"hidden", border:"3px solid #E0241B" }}><img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
          <div>
            <h1 className="m-0" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.95, letterSpacing:"-0.02em", textTransform:"uppercase" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontSize:"12.5pt", color:"#FF5247", letterSpacing:"0.16em", fontWeight:700 }}>{basics.role}</p>
            <p className="m-0 mt-2 text-[9pt]" style={{ color:"#AFAFB6" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
          </div>
        </div>
      </header>
      <div className="grid gap-9" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#3A3A40",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#E0241B",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="bm-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#3A3A40"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#73737B"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")}>
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]">{s}</div><div style={{height:6,marginTop:2,background:"#EEE"}}><div style={{height:"100%",width:`${92-i*6}%`,background:"#E0241B"}}/></div></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Highlights")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3A3A40"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><span style={{color:"#E0241B"}}>▶</span> <b>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#3A3A40"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.bm-b li{position:relative;padding-left:15px;margin-bottom:1px}.bm-b li:before{content:"▶";position:absolute;left:0;color:#E0241B;font-size:7pt;top:3px}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:900,letterSpacing:"0.1em",color:"#16161A",borderLeft:"5px solid #E0241B",paddingLeft:8}}>{t}</h2>{children}</section>; }
