// TimelineSpineNavy — Administrators, Managers, Operations (icon timeline spine)
// White + navy circular icon nodes down a vertical spine. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Node = ({ d }: { d:string }) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4F7FB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d==="user"&&<><circle cx="12" cy="8" r="3.4"/><path d="M5.5 19a6.5 6.5 0 0 1 13 0"/></>}{d==="work"&&<><rect x="4" y="8" width="16" height="11" rx="1.5"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></>}{d==="cap"&&<><path d="M12 5l9 4-9 4-9-4 9-4Z"/><path d="M7 11v4c0 1 2.2 2.2 5 2.2s5-1.2 5-2.2v-4"/></>}{d==="gear"&&<><circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M18 6l-1.5 1.5M7.5 16.5L6 18"/></>}{d==="chat"&&<path d="M5 5h14v10H9l-4 4V5Z"/>}</svg>);

export default function TimelineSpineNavy({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#26303C", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="grid items-center" style={{ gridTemplateColumns:"170px 1fr", gap:24, padding:"40px 48px 26px", background:"#7C92A6", color:"#fff" }}>
        <div style={{ width:150, height:150, borderRadius:"50%", overflow:"hidden", background:"#5E7184", border:"4px solid #fff", justifySelf:"center" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#fff",fontWeight:700,fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"36pt", lineHeight:1, letterSpacing:"-0.01em", color:"#fff" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1" style={{ fontSize:"13pt", color:"#E6EDF3", fontWeight:600 }}>{basics.role}</p>
          <div className="mt-3" style={{ height:1, background:"rgba(255,255,255,0.4)" }} />
          <div className="flex flex-wrap mt-2 text-[8.5pt]" style={{ rowGap:3, columnGap:18, color:"#EAF1F6" }}>
            {[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<span key={i} style={{whiteSpace:"nowrap"}}>{x}</span>))}
          </div>
        </div>
      </header>
      <div className="relative" style={{ padding:"28px 48px 40px 40px" }}>
        <span style={{ position:"absolute", left:54, top:20, bottom:20, width:2, background:"#D5DEE6" }} />
        {basics.summary && <Row icon="user"><h2 className="m-0 mb-1 uppercase" style={hd}>{getLabel(data,"summary","Mi Perfil")}</h2><RichTextRender html={basics.summary} style={{color:"#46525F",fontSize:"10.5pt"}}/></Row>}
        <Row icon="work">
          <h2 className="m-0 mb-2 uppercase" style={hd}>{getLabel(data,"experience","Experiencia")}</h2>
          {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
            <p className="m-0 uppercase font-semibold text-[11pt]" style={{color:"#26303C"}}>{e.role}</p>
            <p className="m-0 font-bold text-[9.5pt]" style={{color:"#3C5670"}}>{e.company} {e.startDate&&`(${dateRange(e.startDate,e.endDate,e.current)})`}</p>
            <BulletsRender bullets={e.bullets} className="tsn-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46525F"}}/>
          </div>))}
        </Row>
        <Row icon="cap">
          <h2 className="m-0 mb-2 uppercase" style={hd}>{getLabel(data,"education","Formación")}</h2>
          {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 uppercase font-semibold text-[10.5pt]">{e.school} {e.startDate&&<span style={{color:"#6B7884",fontWeight:400}}>({e.startDate}{e.endDate?` - ${e.endDate}`:""})</span>}</p><p className="m-0 font-bold text-[9.5pt]" style={{color:"#3C5670"}}>{e.degree}</p></div>))}
        </Row>
        <div className="grid gap-x-8" style={{ gridTemplateColumns:"1fr 1fr" }}>
          <Row icon="gear">
            <h2 className="m-0 mb-2 uppercase" style={hd}>{getLabel(data,"skills","Herramientas")}</h2>
            <ul className="tsn-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46525F"}}>{skills.map((s,i)=>(<li key={i}>{s}</li>))}</ul>
          </Row>
          <Row icon="chat" nospine>
            {languages.length>0 && <><h2 className="m-0 mb-2 uppercase" style={hd}>{getLabel(data,"languages","Idiomas")}</h2>
            <ul className="tsn-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46525F"}}>{languages.map((l,i)=>(<li key={i}>{l.name}{l.level?` — ${l.level}`:""}</li>))}</ul></>}
            {certifications.length>0 && <div className="mt-2 text-[9pt]" style={{color:"#6B7884"}}>{certifications.map(c=>c.name).join(" · ")}</div>}
          </Row>
        </div>
      </div>
      <style>{`.tsn-b li{position:relative;padding-left:14px;margin-bottom:1px}.tsn-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#7C92A6}`}</style>
    </article>
  );
}
const hd: React.CSSProperties = { fontSize:"12pt", fontWeight:800, letterSpacing:"0.14em", color:"#26303C" };
function Row({ icon, children, nospine }: { icon:string; children:React.ReactNode; nospine?:boolean }){
  return (
    <div className="relative mb-6 last:mb-0" style={{ paddingLeft:42 }}>
      <span style={{ position:"absolute", left:0, top:-2, width:30, height:30, borderRadius:"50%", background:"#26303C", display:"flex", alignItems:"center", justifyContent:"center" }}><Node d={icon}/></span>
      {children}
    </div>
  );
}
