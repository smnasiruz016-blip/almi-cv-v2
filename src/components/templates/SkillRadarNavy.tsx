// SkillRadarNavy — Frontend/Web Developers (infographic radar-chart skills)
// Navy sidebar + circle photo + pentagon radar skill chart + geo accents. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

function Radar({ labels }: { labels:string[] }) {
  const n = Math.max(labels.length,3), cx=130, cy=120, R=86;
  const pt=(r:number,i:number)=>{const a=-Math.PI/2+i*2*Math.PI/n;return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;};
  const ring=(r:number)=>labels.map((_,i)=>pt(r,i)).join(" ");
  const vals=labels.map((_,i)=>R*(0.85-0.07*(i%3)));
  return (
    <svg viewBox="0 0 260 250" style={{ width:"100%", maxWidth:300 }}>
      {[R,R*0.75,R*0.5].map((r,k)=><polygon key={k} points={ring(r)} fill={k===0?"#F4A09A":"none"} opacity={k===0?0.55:1} stroke="#E2766E" strokeWidth="1"/>)}
      <polygon points={labels.map((_,i)=>pt(vals[i]*0.42,i)).join(" ")} fill="#D9B23C" opacity="0.9"/>
      {labels.map((_,i)=><line key={i} x1={cx} y1={cy} x2={pt(R,i).split(",")[0]} y2={pt(R,i).split(",")[1]} stroke="#E2766E" strokeWidth="0.8"/>)}
      {labels.map((l,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;const x=cx+(R+22)*Math.cos(a),y=cy+(R+20)*Math.sin(a);return <text key={i} x={x} y={y} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1E2A5E">{l}</text>;})}
    </svg>
  );
}

export default function SkillRadarNavy({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#F7F4EE", color:"#2A2F45", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55, display:"grid", gridTemplateColumns:"280px 1fr" }}>
      <aside className="relative" style={{ background:"#1E2A5E", color:"#E8EBF5", padding:"40px 28px 30px", textAlign:"center" }}>
        <svg viewBox="0 0 60 60" style={{ position:"absolute", right:-14, top:"42%", width:64, height:64, opacity:0.35 }} fill="#8A93B8"><polygon points="30,2 56,16 56,44 30,58 4,44 4,16"/></svg>
        <svg viewBox="0 0 50 44" style={{ position:"absolute", left:22, bottom:90, width:72, height:62, opacity:0.5 }} fill="#A8924E"><polygon points="25,0 50,44 0,44"/></svg>
        <div style={{ width:170, height:170, borderRadius:"50%", overflow:"hidden", background:"#34406F", border:"6px solid #fff", margin:"0 auto" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#fff",fontWeight:700,fontSize:"42pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <h1 className="m-0 mt-5" style={{ fontWeight:800, fontSize:"27pt", lineHeight:1.05, color:"#fff", textTransform:"uppercase" }}>{basics.fullName}</h1>
        <p className="m-0 mt-2" style={{ fontSize:"12pt", color:"#C9D1E8" }}>{basics.role}</p>
        <div className="mx-auto mt-4" style={{ width:140, height:1, background:"rgba(255,255,255,0.35)" }}/>
        <ul style={{ margin:"18px 0 0", padding:0, listStyle:"none", fontSize:"9.5pt", lineHeight:2.1, textAlign:"left", color:"#D5DBEC", wordBreak:"break-word" }}>
          {[basics.role,basics.email,basics.website,basics.phone,basics.location].filter(Boolean).map((x,i)=>(
            <li key={i} className="flex items-center gap-3"><span style={{ width:13, height:13, borderRadius:"50%", flexShrink:0, background:["#D9B23C","#FFFFFF","#E2766E","#F4A09A","#A8924E"][i%5] }}/>{x}</li>
          ))}
        </ul>
      </aside>
      <main style={{ padding:"40px 42px 40px" }}>
        <h2 className="m-0 text-center uppercase" style={{ fontWeight:800, fontSize:"24pt", letterSpacing:"0.06em", color:"#1E2A5E" }}>{getLabel(data,"skills","Skills")}</h2>
        <Radar labels={skills.slice(0,6).map(s=>s.length>11?s.slice(0,10)+"…":s)} />
        <div style={{ height:1, background:"#D8D2C4", margin:"10px 0 18px" }}/>
        <Sec t={getLabel(data,"experience","Work Experience")}>
          {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
            <p className="m-0 font-bold text-[11pt]" style={{color:"#1E2A5E"}}>{e.role} <span style={{color:"#E2766E"}}>· {e.company}</span></p>
            <p className="m-0 text-[9pt]" style={{color:"#8A8FA6"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
            <BulletsRender bullets={e.bullets} className="srn-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#4A5068"}}/>
          </div>))}
        </Sec>
        <Sec t={getLabel(data,"education","Education")}>
          <div className="grid gap-x-6" style={{ gridTemplateColumns:"1fr 1fr" }}>
            <div>{education.map((e,i)=>(<p key={i} className="m-0 mb-1 font-bold text-[10pt]" style={{color:"#1E2A5E"}}>{e.degree}</p>))}</div>
            <div>{education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#4A5068"}}>{e.school}{e.endDate?`, ${e.endDate}`:""}</p>))}</div>
          </div>
        </Sec>
        {(certifications.length>0||languages.length>0) && <Sec t={getLabel(data,"certifications","More")}>
          {certifications.length>0 && <p className="m-0 text-[9.5pt]" style={{color:"#4A5068"}}>{certifications.map(c=>c.name).join("  ·  ")}</p>}
          {languages.length>0 && <p className="m-0 mt-1 text-[9.5pt]" style={{color:"#8A8FA6"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join("  ·  ")}</p>}
        </Sec>}
      </main>
      <style>{`.srn-b li{position:relative;padding-left:14px;margin-bottom:1px}.srn-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#D9B23C}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"15pt",fontWeight:800,color:"#1E2A5E"}}>{t}</h2>{children}</section>; }
