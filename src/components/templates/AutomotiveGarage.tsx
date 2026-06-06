// AutomotiveGarage — Mechanics, Auto Technicians, Service Advisors, Detailers
// Carbon black + racing red + gear/checkered motif + bold condensed. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function AutomotiveGarage({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#17191C", color:"#E6E8EB", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"40px 48px 26px", background:"linear-gradient(100deg,#1E2125 0%,#17191C 70%)", borderBottom:"4px solid #E0322E" }}>
        <div style={{ position:"absolute", top:0, right:0, width:120, height:"100%", backgroundImage:"repeating-conic-gradient(#23262B 0% 25%, #1A1C20 0% 50%)", backgroundSize:"20px 20px", opacity:0.5 }} />
        <svg viewBox="0 0 60 60" style={{ position:"absolute", right:48, top:34, width:56, height:56 }} fill="none" stroke="#E0322E" strokeWidth="3"><circle cx="30" cy="30" r="10"/><circle cx="30" cy="30" r="24"/>{Array.from({length:8}).map((_,i)=>{const a=i*Math.PI/4;return <line key={i} x1={30+Math.cos(a)*10} y1={30+Math.sin(a)*10} x2={30+Math.cos(a)*24} y2={30+Math.sin(a)*24}/>;})}</svg>
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"44pt", lineHeight:0.9, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#F4F5F7" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13.5pt", color:"#E0322E", fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-3 text-[9pt]" style={{ color:"#9098A2" }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-7" style={{ padding:"24px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")}><RichTextRender html={basics.summary} style={{color:"#B4BBC4",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#E0322E",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="ag-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#B4BBC4"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Training")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]">{e.degree}</p><p className="m-0 text-[10pt]" style={{color:"#8B939D"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Specialties")}>
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[9.5pt]">{s}</div><div style={{height:7,marginTop:2,background:"#262A2F",transform:"skewX(-14deg)"}}><div style={{height:"100%",width:`${92-i*6}%`,background:"#E0322E"}}/></div></div>))}
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#B4BBC4"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><span style={{color:"#E0322E"}}>▸</span> <b style={{color:"#F4F5F7"}}>{c.name}</b>{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[9.5pt]" style={{color:"#B4BBC4"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.ag-b li{position:relative;padding-left:15px;margin-bottom:1px}.ag-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;background:#E0322E;transform:skewX(-14deg)}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:900,letterSpacing:"0.12em",color:"#E0322E",borderLeft:"4px solid #E0322E",paddingLeft:8}}>{t}</h2>{children}</section>; }
