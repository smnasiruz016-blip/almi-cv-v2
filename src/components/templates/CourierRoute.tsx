// CourierRoute — Delivery Drivers, Couriers, Rideshare, Last-mile Logistics
// White + route-map dashed path + pin markers + amber/navy. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function CourierRoute({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const N = "#1F3552", A = "#F2920D";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#2A3240", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"42px 48px 26px", background:N, color:"#fff", overflow:"hidden" }}>
        <svg viewBox="0 0 794 170" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.35 }} fill="none">
          <path d="M-20 140 Q160 60 340 110 Q520 160 660 70 Q720 35 820 50" stroke={A} strokeWidth="3" strokeDasharray="10 8"/>
          {[[60,118],[340,110],[660,70]].map(([x,y],i)=>(<g key={i}><path d={`M${x} ${y-22} a11 11 0 0 1 11 11 c0 8-11 22-11 22 s-11-14-11-22 a11 11 0 0 1 11-11Z`} fill={A}/><circle cx={x} cy={y-11} r="4" fill={N}/></g>))}
        </svg>
        <h1 className="m-0 uppercase relative" style={{ fontWeight:900, fontSize:"36pt", lineHeight:0.95, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase relative" style={{ fontSize:"13pt", color:A, fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9pt] relative" style={{ color:"#AEBCCF" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      {awards.length>0 && <div className="grid gap-3" style={{ padding:"18px 48px 0", gridTemplateColumns:`repeat(${Math.min(awards.length,4)},1fr)` }}>
        {awards.slice(0,4).map((a,i)=>(<div key={i} className="text-center" style={{ padding:"10px 12px", borderRadius:10, background:"#FBF3E4", border:"1px solid #F2DDB4" }}>
          <div style={{ fontWeight:900, fontSize:"15pt", lineHeight:1, color:"#C26F08" }}>{a.title}</div>
          {a.issuer&&<div className="text-[7.5pt] mt-1 uppercase" style={{ color:"#8A7A5C", letterSpacing:"0.08em", fontWeight:700 }}>{a.issuer}</div>}
        </div>))}
      </div>}
      <div className="grid gap-9" style={{ padding:"20px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} n={N} a={A}><RichTextRender html={basics.summary} style={{color:"#46505E",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Driving Experience")} n={N} a={A}>
            {experience.map((e,i)=>(<div key={i} className="relative mb-4 last:mb-0" style={{ paddingLeft:24 }}>
              <span style={{ position:"absolute", left:0, top:2, width:13, height:13, borderRadius:"50%", border:`3.5px solid ${A}`, background:"#fff" }}/>
              {i<experience.length-1 && <span style={{ position:"absolute", left:5, top:18, bottom:-16, borderLeft:`2px dashed #E2CDA4` }}/>}
              <p className="m-0 font-bold text-[11.5pt]" style={{color:N}}>{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:"#C26F08",fontWeight:700}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="cr-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10pt",color:"#46505E"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education & Training")} n={N} a={A}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#46505E"}}><b style={{color:N}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"certifications","Licenses")} n={N} a={A}>
            <div className="flex flex-wrap gap-1.5">{certifications.map((c,i)=>(<span key={i} style={{padding:"4px 11px",fontSize:"9pt",fontWeight:800,color:"#fff",background:i%2?A:N,borderRadius:6}}>{c.name}</span>))}</div>
          </Sec>
          <Sec t={getLabel(data,"skills","Skills")} n={N} a={A}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt"}}>{skills.map((s,i)=>(<li key={i} className="flex items-start gap-2 mb-1" style={{color:"#333D4B"}}><span style={{color:A,fontWeight:900}}>➤</span>{s}</li>))}</ul>
          </Sec>
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} n={N} a={A}>
            <div className="text-[9.5pt]" style={{color:"#46505E"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.cr-b li{position:relative;padding-left:15px;margin-bottom:2px}.cr-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:#F2920D}`}</style>
    </article>
  );
}
function Sec({ t, n, a, children }: { t:string; n:string; a:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11.5pt",fontWeight:900,letterSpacing:"0.08em",color:n,borderLeft:`5px solid ${a}`,paddingLeft:8}}>{t}</h2>{children}</section>; }
