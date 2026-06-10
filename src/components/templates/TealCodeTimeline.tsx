// TealCodeTimeline — Web/Frontend Developers (clean teal infographic)
// Teal header band + circle photo + </> watermarks + dot timeline + skill bars + footer band. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function TealCodeTimeline({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  const T = "#2E7E8C";
  return (
    <article className="w-[794px] min-h-[1123px] bg-white relative overflow-hidden print:shadow-none"
      style={{ color:"#2A3338", fontFamily:'"Inter",sans-serif', fontSize:"10.5pt", lineHeight:1.55, display:"flex", flexDirection:"column" }}>
      <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none", color:"#E8EEF0", fontWeight:800, fontSize:"22pt" }}>
        {[[20,370],[420,350],[700,560],[40,640],[460,700],[690,900],[30,1040],[450,1050]].map(([x,y],i)=>(<span key={i} style={{position:"absolute",left:x,top:y}}>&lt;/&gt;</span>))}
      </div>
      <header className="relative" style={{ marginTop:36, background:T, color:"#fff", padding:"26px 48px", minHeight:120 }}>
        <h1 className="m-0" style={{ fontWeight:800, fontSize:"38pt", lineHeight:1, letterSpacing:"-0.01em" }}>{basics.fullName}</h1>
        <p className="m-0 mt-1" style={{ fontSize:"15pt", color:"#CDE6EB", fontWeight:400 }}>{basics.role}</p>
        <div style={{ position:"absolute", right:44, top:-26, width:150, height:150, borderRadius:"50%", padding:5, background:"#fff", boxShadow:"0 4px 14px rgba(0,0,0,0.15)" }}>
          <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", background:"#D8E6EA", border:`3px solid ${T}` }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:T,fontWeight:700,fontSize:"38pt"}}>{initials(basics.fullName)}</div>}
          </div>
        </div>
      </header>
      <div className="relative grid gap-9 flex-1" style={{ padding:"28px 48px 26px", gridTemplateColumns:"1.05fr 1fr" }}>
        <div>
          <Sec t={getLabel(data,"experience","Work Experience")} c={T}>
            {experience.map((e,i)=>(<div key={i} className="relative mb-4 last:mb-0" style={{ paddingLeft:22 }}>
              <span style={{ position:"absolute", left:0, top:4, width:11, height:11, borderRadius:"50%", background:T }}/>
              {i<experience.length-1 && <span style={{ position:"absolute", left:4.5, top:18, bottom:-16, width:2, background:"#BFD8DE" }}/>}
              <p className="m-0 font-bold text-[11pt]">{e.role}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#5C6B72"}}>{e.company}</p>
              <p className="m-0 text-[9pt]" style={{color:"#8A99A0"}}>{dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="tct-b" style={{margin:"4px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46545B",fontStyle:"italic"}}/>
            </div>))}
          </Sec>
          {basics.summary && <Sec t={getLabel(data,"summary","Profile")} c={T}><RichTextRender html={basics.summary} style={{color:"#46545B",fontSize:"10pt"}}/></Sec>}
        </div>
        <div>
          <Sec t={getLabel(data,"skills","Skills")} c={T}>
            {skills.slice(0,9).map((s,i)=>(<div key={i} className="mb-2"><div className="text-[10pt]">{s}</div><div style={{height:8,marginTop:3,borderRadius:5,background:"#CFE2E6"}}><div style={{height:"100%",borderRadius:5,width:`${93-i*5}%`,background:T}}/></div></div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")} c={T}>
            {education.map((e,i)=>(<div key={i} className="relative mb-2.5" style={{ paddingLeft:22 }}>
              <span style={{ position:"absolute", left:0, top:4, width:11, height:11, borderRadius:"50%", background:T }}/>
              <p className="m-0 font-bold text-[10.5pt]">{e.school}</p>
              <p className="m-0 text-[9.5pt]" style={{color:"#5C6B72"}}>{e.degree}{e.endDate?` · ${e.endDate}`:""}</p>
              {e.notes && <p className="m-0 text-[9pt]" style={{color:"#8A99A0"}}>{e.notes}</p>}
            </div>))}
          </Sec>
          {(certifications.length>0||languages.length>0) && <Sec t={getLabel(data,"certifications","Certifications")} c={T}>
            {certifications.length>0 && <ul className="tct-b" style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",color:"#46545B"}}>{certifications.map((c,i)=>(<li key={i}>{c.name}{c.year?` · ${c.year}`:""}</li>))}</ul>}
            {languages.length>0 && <p className="m-0 mt-1 text-[9.5pt]" style={{color:"#5C6B72"}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join("  ·  ")}</p>}
          </Sec>}
        </div>
      </div>
      <footer style={{ background:T, color:"#fff", padding:"14px 48px", display:"flex", flexWrap:"wrap", gap:26, justifyContent:"center", fontSize:"9.5pt" }}>
        {[basics.phone,basics.email,basics.website].filter(Boolean).map((x,i)=>(<span key={i}>{x}</span>))}
      </footer>
      <style>{`.tct-b li{position:relative;padding-left:13px;margin-bottom:2px}.tct-b li:before{content:"";position:absolute;left:0;top:6px;width:6px;height:6px;border-radius:50%;background:#2E7E8C}`}</style>
    </article>
  );
}
function Sec({ t, c, children }: { t:string; c:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5" style={{fontSize:"14pt",fontWeight:800,color:c,borderBottom:`2px solid ${c}`,paddingBottom:3,display:"inline-block",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
