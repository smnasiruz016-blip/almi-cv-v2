// NurseGlassPastel — Nurse Practitioners, Nurses, Allied Health (soft glassmorphism)
// Icy pastel blue + glass card + floating orbs/capsule + donut dials. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function NurseGlassPastel({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const N = "#1B2A6B";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(160deg,#E8F0FA 0%,#DCE8F6 50%,#E4ECF8 100%)", color:"#2A3550", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <div aria-hidden>
        <span style={{ position:"absolute", right:90, top:70, width:150, height:150, borderRadius:"50%", background:"linear-gradient(135deg,#3DE0D2,#3FA9F5)", opacity:0.85 }}/>
        <span style={{ position:"absolute", right:36, top:250, width:54, height:54, borderRadius:"50%", background:"linear-gradient(135deg,#B89CF6,#8A6BE8)", opacity:0.8 }}/>
        <span style={{ position:"absolute", left:-26, top:560, width:90, height:44, borderRadius:9999, background:"linear-gradient(90deg,#FFF 50%,#3F51E8 50%)", boxShadow:"0 8px 18px rgba(63,81,232,0.25)", transform:"rotate(-18deg)" }}/>
        <span style={{ position:"absolute", right:60, bottom:120, width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#7EC8F0,#4D8BE8)", opacity:0.5 }}/>
      </div>
      <div className="relative" style={{ margin:"34px 38px", background:"rgba(255,255,255,0.65)", border:"1px solid rgba(255,255,255,0.9)", borderRadius:28, backdropFilter:"blur(10px)", boxShadow:"0 18px 50px rgba(80,110,170,0.18)", padding:"40px 44px 36px" }}>
        <header style={{ marginBottom:20 }}>
          <h1 className="m-0" style={{ fontWeight:800, fontSize:"38pt", lineHeight:0.98, letterSpacing:"-0.02em", color:N }}>{basics.fullName}</h1>
          <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:"#5A6884", letterSpacing:"0.22em", fontWeight:600 }}>{basics.role}</p>
        </header>
        <div className="grid gap-8" style={{ gridTemplateColumns:"230px 1fr" }}>
          <div>
            <div style={{ width:190, height:220, borderRadius:24, overflow:"hidden", background:"#C9D9EE", boxShadow:"0 10px 26px rgba(80,110,170,0.25)", border:"5px solid rgba(255,255,255,0.9)" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:N,fontWeight:800,fontSize:"42pt"}}>{initials(basics.fullName)}</div>}
            </div>
            <Sec t={getLabel(data,"skills","Skills")} c={N}>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",lineHeight:1.9,color:"#46527A"}}>{skills.map((s,i)=>(<li key={i} className="flex items-center gap-2"><span style={{width:8,height:8,borderRadius:3,background:"linear-gradient(135deg,#3DE0D2,#3F51E8)",flexShrink:0}}/>{s}</li>))}</ul>
            </Sec>
            <Sec t={getLabel(data,"contact","Contact")} c={N}>
              <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9,color:"#46527A",wordBreak:"break-word"}}>{[basics.phone,basics.email,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
            </Sec>
            {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={N}>
              <div className="text-[9.5pt]" style={{color:"#46527A"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
            </Sec>}
          </div>
          <div>
            {basics.summary && <Sec t={getLabel(data,"summary","About Me")} c={N}><RichTextRender html={basics.summary} style={{color:"#5A6884",fontSize:"10pt"}}/></Sec>}
            <Sec t={getLabel(data,"experience","Work Experience")} c={N}>
              {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
                <p className="m-0 font-bold text-[11pt]" style={{color:N}}>{e.role}</p>
                <p className="m-0 text-[9.5pt]" style={{color:"#3F8BE8",fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
                <BulletsRender bullets={e.bullets} className="ngp-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#5A6884"}}/>
              </div>))}
            </Sec>
            <Sec t={getLabel(data,"education","Education")} c={N}>
              {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:N}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#7A86A4"}}>{e.school}{e.endDate?` · ${e.endDate}`:""}</p></div>))}
            </Sec>
            <div className="flex gap-5 mt-2">
              {certifications.slice(0,4).map((c,i)=>(<div key={i} className="text-center" style={{width:86}}>
                <svg viewBox="0 0 60 60" style={{width:56,height:56,margin:"0 auto"}}>
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#D6E2F2" strokeWidth="9"/>
                  <circle cx="30" cy="30" r="24" fill="none" stroke="url(#g)" strokeWidth="9" strokeDasharray={`${(110-i*16)} 151`} strokeLinecap="round" transform="rotate(-90 30 30)"/>
                  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3DE0D2"/><stop offset="100%" stopColor="#3F51E8"/></linearGradient></defs>
                </svg>
                <p className="m-0 mt-1 text-[8pt] font-semibold" style={{color:"#46527A",lineHeight:1.3}}>{c.name}</p>
              </div>))}
            </div>
          </div>
        </div>
      </div>
      <style>{`.ngp-b li{position:relative;padding-left:13px;margin-bottom:2px}.ngp-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#3F8BE8}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mt-5 first:mt-0 mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"12pt",fontWeight:800,letterSpacing:"0.08em",color:c}}>{t}</h2>{children}</section>; }
