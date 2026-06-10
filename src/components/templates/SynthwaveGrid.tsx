// SynthwaveGrid — UI Designers, Digital Artists, Creative Technologists (retro)
// Black→sunset horizon + neon pink perspective grid + glow photo ring + white cards. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function SynthwaveGrid({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const P = "#FF2BB0";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"linear-gradient(180deg,#0A0508 0%,#1A0510 30%,#5A1430 46%,#C42A52 54%,#180410 60%,#10030B 100%)", color:"#F5EAF2", fontFamily:'"Plus Jakarta Sans","Inter",sans-serif', fontSize:"10pt", lineHeight:1.5 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <g stroke={P} strokeWidth="1.1" opacity="0.55">
          {Array.from({length:12}).map((_,i)=><line key={"h"+i} x1="0" y1={620+i*46} x2="794" y2={620+i*46}/>)}
          {Array.from({length:15}).map((_,i)=>{const x=i*56.7;return <line key={"v"+i} x1={397+(x-397)*0.22} y1="600" x2={x} y2="1123"/>;})}
        </g>
        <line x1="0" y1="600" x2="794" y2="600" stroke={P} strokeWidth="2.5" opacity="0.9"/>
      </svg>
      <header className="relative" style={{ padding:"44px 48px 10px", textAlign:"center" }}>
        <h1 className="m-0 uppercase" style={{ fontWeight:900, fontSize:"42pt", lineHeight:0.95, letterSpacing:"0.04em", color:"#FFF8FD", textShadow:`0 0 18px rgba(255,43,176,0.8), 3px 3px 0 #5A1430` }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"15pt", color:P, fontWeight:800, letterSpacing:"0.22em", textShadow:"0 0 12px rgba(255,43,176,0.7)" }}>{basics.role}</p>
      </header>
      <div className="relative grid gap-6" style={{ padding:"18px 48px 44px", gridTemplateColumns:"250px 1fr" }}>
        <aside>
          <div style={{ width:160, height:160, borderRadius:"50%", margin:"6px auto 16px", padding:5, border:`4px solid ${P}`, boxShadow:`0 0 26px rgba(255,43,176,0.8)` }}>
            <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#2A0A1C", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:P,fontWeight:800,fontSize:"38pt"}}>{initials(basics.fullName)}</span>}
            </div>
          </div>
          <h2 className="m-0 mb-2 uppercase" style={{ fontSize:"13pt", fontWeight:900, color:P, letterSpacing:"0.1em", textShadow:"0 0 10px rgba(255,43,176,0.6)" }}>{getLabel(data,"skills","Skills")}</h2>
          {skills.slice(0,7).map((s,i)=>(<div key={i} className="flex items-center gap-2 mb-1.5"><span className="text-[9.5pt] font-bold" style={{ color:"#FF8BD6", width:104, flexShrink:0 }}>{s}</span><div style={{flex:1,height:9,borderRadius:5,background:"rgba(255,255,255,0.12)"}}><div style={{height:"100%",borderRadius:5,width:`${92-i*7}%`,background:"linear-gradient(90deg,#FF2BB0,#9D5CFF)",boxShadow:"0 0 8px rgba(255,43,176,0.8)"}}/></div></div>))}
          <div style={{ background:"#FFF8FD", color:"#241019", borderRadius:14, padding:"14px 16px", marginTop:18 }}>
            <h2 className="m-0 mb-1.5 uppercase" style={{ fontSize:"11pt", fontWeight:900, letterSpacing:"0.06em" }}>{getLabel(data,"contact","Contact")}</h2>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9pt",lineHeight:1.9,wordBreak:"break-word",color:"#4A3340"}}>{[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </div>
        </aside>
        <main>
          <div style={{ background:"#FFF8FD", color:"#241019", borderRadius:14, padding:"18px 20px" }}>
            <h2 className="m-0 mb-2 uppercase" style={{ fontSize:"12pt", fontWeight:900, letterSpacing:"0.06em" }}>{getLabel(data,"summary","About Me")}</h2>
            {basics.summary && <RichTextRender html={basics.summary} style={{ fontSize:"9.5pt", color:"#4A3340", marginBottom:10 }}/>}
            <h2 className="m-0 mb-2 mt-3 uppercase" style={{ fontSize:"12pt", fontWeight:900, letterSpacing:"0.06em" }}>{getLabel(data,"experience","Experience")}</h2>
            {experience.map((e,i)=>(<div key={i} className="flex items-start justify-between gap-3 mb-2.5" style={{ borderBottom:i<experience.length-1?"1px solid #F0DCE8":"0", paddingBottom:8 }}>
              <div style={{flex:1,minWidth:0}}>
                <p className="m-0 font-bold text-[10.5pt]">{e.company}</p>
                <p className="m-0 text-[9pt]" style={{color:"#A04A7C"}}>{e.role}</p>
                <BulletsRender bullets={e.bullets} className="sw-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"9pt",color:"#4A3340"}}/>
              </div>
              <span className="text-[9.5pt] font-bold whitespace-nowrap" style={{flexShrink:0}}>{dateRange(e.startDate,e.endDate,e.current)}</span>
            </div>))}
          </div>
          <div style={{ background:"#FFF8FD", color:"#241019", borderRadius:14, padding:"16px 20px", marginTop:16 }}>
            <h2 className="m-0 mb-2 uppercase" style={{ fontSize:"12pt", fontWeight:900, letterSpacing:"0.06em" }}>{getLabel(data,"education","Education")}</h2>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]"><b>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
            {certifications.length>0 && <p className="m-0 mt-2 text-[9pt]" style={{color:"#A04A7C"}}>{certifications.map(c=>c.name).join("  ·  ")}</p>}
            {languages.length>0 && <p className="m-0 mt-1 text-[9pt]" style={{color:"#4A3340"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join("  ·  ")}</p>}
          </div>
        </main>
      </div>
      <style>{`.sw-b li{position:relative;padding-left:12px;margin-bottom:1px}.sw-b li:before{content:"";position:absolute;left:0;top:5px;width:5px;height:5px;border-radius:50%;background:#FF2BB0}`}</style>
    </article>
  );
}
