// DaisyFieldGreen — Students, Creatives, Admin, Entry-level (friendly floral)
// Deep green sidebar + daisy motifs + flower-icon timeline. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const Daisy = ({ s=22, c="#CDE8A0" }: { s?:number; c?:string }) => (
  <svg viewBox="0 0 40 40" width={s} height={s}>{Array.from({length:8}).map((_,i)=>{const a=i*Math.PI/4;return <ellipse key={i} cx={20+Math.cos(a)*10} cy={20+Math.sin(a)*10} rx="5" ry="8" fill={c} transform={`rotate(${i*45} ${20+Math.cos(a)*10} ${20+Math.sin(a)*10})`}/>;})}<circle cx="20" cy="20" r="5.5" fill="#4F7A3A"/></svg>
);

export default function DaisyFieldGreen({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], interests = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden bg-white print:shadow-none"
      style={{ color:"#2E3A24", fontFamily:'"Inter",sans-serif', fontSize:"10pt", lineHeight:1.5 }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:250, background:"#3C5A30" }} />
      <header className="relative" style={{ background:"#2E4724", color:"#EAF3DD", padding:"34px 40px 30px 290px" }}>
        <div style={{ position:"absolute", left:40, top:30, width:160, height:170, borderRadius:"46% 54% 50% 50% / 52% 48% 52% 48%", overflow:"hidden", background:"#52743F", border:"3px solid #CDE8A0" }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:"#CDE8A0",fontWeight:700,fontSize:"34pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <p className="m-0 text-[11pt] uppercase" style={{ color:"#CDE8A0", fontWeight:400, letterSpacing:"0.16em" }}>{basics.role}</p>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"32pt", lineHeight:1, textTransform:"uppercase", letterSpacing:"0.01em", color:"#F4FAE9" }}>{basics.fullName}</h1>
      </header>
      <div className="relative grid" style={{ gridTemplateColumns:"250px 1fr" }}>
        <aside style={{ color:"#E4F0D5", padding:"24px 30px 40px" }}>
          <SecL t={getLabel(data,"skills","Compétences")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10pt",lineHeight:1.9}}>{skills.map((s,i)=>(<li key={i} className="flex items-center gap-2"><span style={{width:7,height:7,borderRadius:"50%",background:"#CDE8A0",flexShrink:0}}/>{s}</li>))}</ul>
          </SecL>
          {languages.length>0 && <SecL t={getLabel(data,"languages","Langues")}>
            {languages.map((l,i)=>(<div key={i} className="mb-1.5 text-[10pt]">{l.name}{l.level?<span style={{color:"#A9C98A"}}> — {l.level}</span>:null}</div>))}
          </SecL>}
          {certifications.length>0 && <SecL t={getLabel(data,"certifications","Certifications")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.7}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` (${c.year})`:""}</li>))}</ul>
          </SecL>}
          <div className="flex flex-wrap gap-1 mt-4" style={{ maxWidth:170 }}>{Array.from({length:9}).map((_,i)=><Daisy key={i} s={30}/>)}</div>
        </aside>
        <main style={{ padding:"24px 40px 40px 30px" }}>
          {basics.summary && <SecR t={getLabel(data,"summary","Profil")}><RichTextRender html={basics.summary} style={{color:"#46543A",fontSize:"10pt"}}/></SecR>}
          <SecR t={getLabel(data,"experience","Expériences professionnelles")}>
            {experience.map((e,i)=>(<div key={i} className="relative mb-4 last:mb-0" style={{ paddingLeft:34 }}>
              <span style={{ position:"absolute", left:0, top:2 }}><Daisy s={24} c="#7BA85A"/></span>
              {i<experience.length-1 && <span style={{ position:"absolute", left:11, top:28, bottom:-16, width:2, background:"#CFE0BC" }}/>}
              <p className="m-0"><b className="text-[11pt]">{e.company}</b> <span style={{color:"#5C7A48",fontStyle:"italic"}}>| {e.role}</span></p>
              <p className="m-0 text-[9pt]" style={{color:"#7B8C6C"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="dfg-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46543A"}}/>
            </div>))}
          </SecR>
          <SecR t={getLabel(data,"education","Éducation")}>
            {education.map((e,i)=>(<div key={i} className="relative mb-3 last:mb-0" style={{ paddingLeft:34 }}>
              <span style={{ position:"absolute", left:0, top:2 }}><Daisy s={24} c="#7BA85A"/></span>
              <p className="m-0 font-bold text-[10.5pt]">{e.school}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#5C7A48"}}>{e.degree}{e.endDate?` — ${e.endDate}`:""}</p>
            </div>))}
          </SecR>
          {interests.length>0 && <SecR t={getLabel(data,"interests","Centres d'intérêts")}>
            <div className="flex flex-wrap gap-2">{interests.map((it,i)=>(<span key={i} className="flex items-center gap-1.5 text-[9.5pt]"><Daisy s={18} c="#7BA85A"/>{it}</span>))}</div>
          </SecR>}
          <div className="mt-3 pt-3 text-[9pt]" style={{ borderTop:"1px solid #DDE8CF", color:"#6B7A5C" }}>{[basics.phone,basics.email,basics.location].filter(Boolean).join("   ·   ")}</div>
        </main>
      </div>
      <style>{`.dfg-b li{position:relative;padding-left:13px;margin-bottom:1px}.dfg-b li:before{content:"❀";position:absolute;left:0;color:#7BA85A;font-size:7pt;top:2px}`}</style>
    </article>
  );
}
function SecL({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.1em",color:"#CDE8A0"}}>{t}</h2>{children}</section>; }
function SecR({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-3 uppercase" style={{fontSize:"12pt",fontWeight:800,letterSpacing:"0.06em",color:"#3C5A30"}}>{t}</h2>{children}</section>; }
