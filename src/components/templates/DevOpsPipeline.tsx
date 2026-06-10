// DevOpsPipeline — DevOps / SRE / Platform Engineers (dark slate pipeline)
// Slate + electric green pipeline stages + mono accents + uptime stats. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function DevOpsPipeline({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [], awards = [] } = data;
  const G = "#3DDC84";
  const stages = ["PLAN","BUILD","TEST","DEPLOY","MONITOR"];
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#161B22", color:"#D2DAE2", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.5 }}>
      <header className="relative" style={{ padding:"44px 48px 18px" }}>
        <p className="m-0 mb-1 text-[9pt]" style={{ color:"#5C8A6E", fontFamily:'"JetBrains Mono",monospace' }}>$ kubectl describe engineer</p>
        <h1 className="m-0" style={{ fontWeight:900, fontSize:"40pt", lineHeight:0.95, letterSpacing:"-0.02em", textTransform:"uppercase", color:"#F0F4F8" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1 uppercase" style={{ fontSize:"13pt", color:G, fontWeight:800, letterSpacing:"0.14em" }}>{basics.role}</p>
        <p className="m-0 mt-2 text-[8.5pt]" style={{ color:"#7C8894", fontFamily:'"JetBrains Mono",monospace' }}>{[basics.email,basics.phone,basics.location,basics.website].filter(Boolean).join("  |  ")}</p>
        <div className="flex items-center mt-5" style={{ gap:0 }}>
          {stages.map((s,i)=>(<React.Fragment key={i}>
            <div className="flex flex-col items-center" style={{ width:92 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", border:`2.5px solid ${i<4?G:"#39434E"}`, background:i<4?"rgba(61,220,132,0.12)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", color:i<4?G:"#7C8894", fontWeight:800, fontSize:"10pt", boxShadow:i<4?`0 0 10px rgba(61,220,132,0.4)`:"none" }}>{i<4?"✓":"●"}</div>
              <span className="text-[7.5pt] mt-1" style={{ color:"#7C8894", letterSpacing:"0.12em", fontFamily:'"JetBrains Mono",monospace' }}>{s}</span>
            </div>
            {i<stages.length-1 && <div style={{ flex:1, height:2.5, background:i<3?G:"#39434E", marginTop:-16 }}/>}
          </React.Fragment>))}
        </div>
      </header>
      <div className="grid gap-7" style={{ padding:"20px 48px 44px", gridTemplateColumns:"1.5fr 1fr" }}>
        <div>
          {basics.summary && <Sec t="profile" g={G}><RichTextRender html={basics.summary} style={{color:"#A8B4C0",fontSize:"10pt"}}/></Sec>}
          <Sec t="experience" g={G}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[11pt]" style={{color:"#F0F4F8"}}>{e.role}</p>
              <p className="m-0 text-[9pt]" style={{color:G,fontFamily:'"JetBrains Mono",monospace'}}>{e.company} [{dateRange(e.startDate,e.endDate,e.current)}]</p>
              <BulletsRender bullets={e.bullets} className="dop-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#A8B4C0"}}/>
            </div>))}
          </Sec>
          <Sec t="education" g={G}>
            {education.map((e,i)=>(<p key={i} className="m-0 mb-1 text-[10pt]" style={{color:"#A8B4C0"}}><b style={{color:"#F0F4F8"}}>{e.degree}</b>, {e.school}{e.endDate?` · ${e.endDate}`:""}</p>))}
          </Sec>
        </div>
        <div>
          <Sec t="stack" g={G}>
            <div className="flex flex-wrap gap-1.5">{skills.map((s,i)=>(<span key={i} style={{padding:"3px 10px",fontSize:"8.5pt",fontWeight:700,color:G,border:`1px solid rgba(61,220,132,0.4)`,borderRadius:6,fontFamily:'"JetBrains Mono",monospace'}}>{s}</span>))}</div>
          </Sec>
          {awards.length>0 && <Sec t="metrics" g={G}>
            <div className="grid gap-2" style={{gridTemplateColumns:"1fr 1fr"}}>{awards.slice(0,4).map((a,i)=>(<div key={i} style={{border:"1px solid #2A333E",borderRadius:8,padding:"8px 10px",background:"#1B222B"}}><div style={{fontWeight:800,fontSize:"14pt",color:G,lineHeight:1}}>{a.title}</div>{a.issuer&&<div className="text-[7.5pt] mt-1 uppercase" style={{color:"#7C8894",letterSpacing:"0.08em"}}>{a.issuer}</div>}</div>))}</div>
          </Sec>}
          {certifications.length>0 && <Sec t="certs" g={G}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9pt",color:"#A8B4C0"}}>{certifications.map((c,i)=>(<li key={i} className="mb-1"><span style={{color:G}}>[✓]</span> {c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>
          </Sec>}
          {languages.length>0 && <Sec t="lang" g={G}>
            <div className="text-[9pt]" style={{color:"#A8B4C0"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join("  ·  ")}</div>
          </Sec>}
        </div>
      </div>
      <style>{`.dop-b li{position:relative;padding-left:14px;margin-bottom:1px}.dop-b li:before{content:">";position:absolute;left:0;color:#3DDC84;font-family:"JetBrains Mono",monospace}`}</style>
    </article>
  );
}
function Sec({ t, g, children }: { t:string; g:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"11pt",fontWeight:700,letterSpacing:"0.04em",color:g,fontFamily:'"JetBrains Mono",monospace'}}><span style={{color:"#5C8A6E"}}>::</span> {t}</h2>{children}</section>; }
