// NurseryMeadow — Nursery Assistants, Early Years (green meadow playful)
// White + layered green/yellow meadow waves + rounded yellow photo frame + daisies. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Daisy = ({ s=30 }: { s?:number }) => (
  <svg viewBox="0 0 40 40" width={s} height={s}>{Array.from({length:8}).map((_,i)=>{const a=i*Math.PI/4;return <ellipse key={i} cx={20+10*Math.cos(a)} cy={20+10*Math.sin(a)} rx="6" ry="4.5" fill="#fff" stroke="#EEE" strokeWidth="0.5" transform={`rotate(${i*45} ${20+10*Math.cos(a)} ${20+10*Math.sin(a)})`}/>;})}<circle cx="20" cy="20" r="6" fill="#F5C242"/></svg>
);

export default function NurseryMeadow({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const G = "#1E8A3C";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#2E4630", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55 }}>
      <svg viewBox="0 0 794 1123" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        <path d="M0 400 Q200 330 400 380 Q600 430 794 360 L794 450 Q600 520 400 470 Q200 420 0 490 Z" fill="#7FD89A" opacity="0.85"/>
        <path d="M0 490 Q200 420 400 470 Q600 520 794 450 L794 520 Q600 590 400 540 Q200 490 0 560 Z" fill="#F5E16B" opacity="0.8"/>
        <path d="M0 980 Q200 920 420 960 Q620 995 794 940 L794 1123 L0 1123 Z" fill="#8FDCA5"/>
        <path d="M0 1040 Q220 990 440 1025 Q640 1056 794 1010 L794 1123 L0 1123 Z" fill="#5BC478"/>
        <circle cx="700" cy="1050" r="34" fill="#F5C242"/><circle cx="688" cy="1040" r="5" fill="#2E4630"/><circle cx="712" cy="1040" r="5" fill="#2E4630"/><path d="M690 1060 q10 8 20 0" stroke="#2E4630" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      <header className="relative" style={{ padding:"46px 48px 0", display:"grid", gridTemplateColumns:"1fr 230px", gap:20 }}>
        <div>
          <h1 className="m-0" style={{ fontWeight:900, fontSize:"42pt", lineHeight:0.95, color:G, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1.5 uppercase" style={{ fontSize:"13pt", color:"#E8B619", fontWeight:800, letterSpacing:"0.1em" }}>{basics.role}</p>
        </div>
        <div className="relative" style={{ width:210, height:210, justifySelf:"end" }}>
          <div style={{ position:"absolute", inset:0, borderRadius:36, border:"7px solid #F5C242", overflow:"hidden", background:"#FDF8E8", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{color:"#E8B619",fontWeight:900,fontSize:"40pt"}}>{initials(basics.fullName)}</span>}
          </div>
          <span style={{ position:"absolute", left:-16, bottom:-6 }}><Daisy s={40}/></span>
          <span style={{ position:"absolute", right:-10, top:-12 }}><Daisy s={30}/></span>
        </div>
      </header>
      <div className="relative grid gap-8" style={{ padding:"100px 48px 170px", gridTemplateColumns:"1.4fr 1fr" }}>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} c={G}><RichTextRender html={basics.summary} style={{color:"#4A5E4C",fontSize:"10pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")} c={G}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#235C32"}}>{e.role} | {e.company}</p>
              <p className="m-0 text-[9pt]" style={{color:"#7C927E"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="nm-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A5E4C"}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={G}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10.5pt]" style={{color:"#235C32"}}>{e.degree}</p><p className="m-0 text-[9.5pt]" style={{color:"#7C927E"}}>{e.school}{e.endDate?` | ${e.endDate}`:""}</p></div>))}
          </Sec>
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")} c={G}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"4px 12px",fontSize:"9pt",fontWeight:700,color:"#235C32",background:["#D8F2DE","#FBF0C4","#D2EDD8","#F8E9B8"][i%4],borderRadius:9999}}>{s}</span>))}</div>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Certifications")} c={G}>
            <ul className="nm-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A5E4C"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")} c={G}>
            <div className="text-[9.5pt]" style={{color:"#4A5E4C"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
          <Sec t={getLabel(data,"contact","Contact")} c={G}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9,color:"#4A5E4C",wordBreak:"break-word"}}>{[basics.email,basics.phone,basics.linkedIn,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </Sec>
        </div>
      </div>
      <style>{`.nm-b li{position:relative;padding-left:14px;margin-bottom:2px}.nm-b li:before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50% 50% 50% 0;background:#5BC478}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-4 last:mb-0"><h2 className="m-0 mb-2 uppercase" style={{fontSize:"14pt",fontWeight:900,letterSpacing:"0.04em",color:c}}>{t}</h2>{children}</section>; }
