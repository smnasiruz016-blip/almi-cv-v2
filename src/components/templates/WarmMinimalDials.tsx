// WarmMinimalDials — Full-stack devs, generalist tech (warm minimalist infographic)
// Cream + terracotta/sage + big serif name + donut percentage dials + dot timeline. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Dial = ({ pct, c1, c2 }: { pct:number; c1:string; c2:string }) => (
  <svg viewBox="0 0 90 90" style={{ width:88, height:88 }}>
    <circle cx="45" cy="45" r="34" fill="none" stroke="#E8E2D2" strokeWidth="12"/>
    <circle cx="45" cy="45" r="34" fill="none" stroke={c1} strokeWidth="12" strokeDasharray={`${pct*2.14} 214`} transform="rotate(-90 45 45)"/>
    <circle cx="45" cy="45" r="34" fill="none" stroke={c2} strokeWidth="12" strokeDasharray={`${(100-pct)*0.9} 214`} strokeDashoffset={`-${pct*2.14}`} transform="rotate(-90 45 45)"/>
    <text x="45" y="51" textAnchor="middle" fontSize="17" fontWeight="800" fill="#2E2A26">{pct}%</text>
  </svg>
);

export default function WarmMinimalDials({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const T = "#C25B3C", S = "#9DAB8E";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#FAF4E4", color:"#2E2A26", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <header className="relative" style={{ padding:"52px 56px 22px" }}>
        <div style={{ position:"absolute", right:56, top:46, width:170, height:170, borderRadius:"50%", background:T, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:"#FAF4E4",fontWeight:700,fontSize:"44pt",fontFamily:'"Cormorant Garamond",serif'}}>{initials(basics.fullName)}</span>}
        </div>
        <h1 className="m-0" style={{ fontFamily:'"Cormorant Garamond",serif', fontWeight:600, fontSize:"46pt", lineHeight:0.95, letterSpacing:"0.01em", color:"#26221E", maxWidth:480 }}>{basics.fullName}</h1>
        <p className="m-0 mt-2" style={{ fontSize:"14pt", color:T, fontWeight:700 }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[9.5pt]" style={{ color:"#7A7264" }}>{[basics.email,basics.phone,basics.location].filter(Boolean).join("   ·   ")}</p>
      </header>
      <div className="grid gap-9" style={{ padding:"22px 56px 30px", gridTemplateColumns:"1.45fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} c={T}><RichTextRender html={basics.summary} style={{color:"#54493E",fontSize:"10.5pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} c={T}>
            {experience.map((e,i)=>(<div key={i} className="relative mb-4 last:mb-0" style={{ paddingLeft:22 }}>
              <span style={{ position:"absolute", left:0, top:5, width:10, height:10, borderRadius:"50%", background:T }}/>
              {i<experience.length-1 && <span style={{ position:"absolute", left:4, top:18, bottom:-16, width:2, background:"#E2D8C4" }}/>}
              <p className="m-0 font-bold text-[11.5pt]">{e.role}</p>
              <p className="m-0 text-[10pt]" style={{color:T,fontWeight:600}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="wmd-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#54493E"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={T}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#54493E"}}><b style={{color:"#26221E"}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")} c={T}>
            <div className="flex flex-col items-center gap-4">
              {skills.slice(0,3).map((s,i)=>(<div key={i} className="text-center"><Dial pct={[90,80,75][i]} c1={T} c2={S}/><p className="m-0 mt-1 text-[9.5pt] font-bold">{s}</p></div>))}
            </div>
            {skills.length>3 && <p className="m-0 mt-3 text-[9.5pt] text-center" style={{color:"#7A7264"}}>{skills.slice(3).join("  ·  ")}</p>}
          </Sec>
        </div>
      </div>
      <footer className="grid gap-4" style={{ margin:"0 56px 44px", borderTop:"2px solid #2E2A26", paddingTop:14, gridTemplateColumns:"auto 1fr 1fr 1fr", alignItems:"start" }}>
        <span className="font-bold text-[11.5pt]" style={{fontFamily:'"Cormorant Garamond",serif',fontSize:"15pt"}}>{getLabel(data,"certifications","Credentials")}</span>
        <span className="text-[9.5pt]" style={{color:"#54493E",borderLeft:"1px solid #D8CDB6",paddingLeft:14}}>{certifications.map(c=>c.name).join(" · ")||"—"}</span>
        <span className="text-[9.5pt] font-bold" style={{borderLeft:"1px solid #D8CDB6",paddingLeft:14}}>{languages.map(l=>l.name).join(" · ")||"—"}</span>
        <span className="text-[9.5pt]" style={{color:"#54493E",borderLeft:"1px solid #D8CDB6",paddingLeft:14}}>{basics.website||basics.linkedIn||""}</span>
      </footer>
      <style>{`.wmd-b li{position:relative;padding-left:13px;margin-bottom:2px}.wmd-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#9DAB8E}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontFamily:'"Cormorant Garamond",serif',fontSize:"18pt",fontWeight:600,color:"#26221E"}}>{t}</h2>{children}</section>; }
