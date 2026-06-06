// RetroDesktopOS — Designers, Illustrators, Animators, Creatives (retro 90s UI)
// Mauve desktop + beige windows w/ title bars + X buttons + mono. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function RetroDesktopOS({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#6E4F66", color:"#2A2622", fontFamily:'"JetBrains Mono","Inter",monospace', fontSize:"10pt", lineHeight:1.5, padding:"30px" }}>
      <div className="flex gap-5 items-start">
        <div style={{ width:200, flexShrink:0 }}>
          <Win title={null} accent="#E2876A">
            <div style={{ width:"100%", height:150, background:"#BFE3DA", display:"flex", alignItems:"center", justifyContent:"center", color:"#2A2622", fontWeight:700, fontSize:"40pt", overflow:"hidden" }}>
              {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : initials(basics.fullName)}
            </div>
          </Win>
          <div style={{ height:14 }}/>
          <Win title={getLabel(data,"education","Education")} accent="#E2876A">
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-bold text-[10pt]">{e.school}{e.endDate?` — ${e.endDate}`:""}</p><p className="m-0 text-[9.5pt]" style={{color:"#5A534B"}}>{e.degree}</p></div>))}
          </Win>
        </div>
        <div style={{ flex:1 }}>
          <Win title={null} accent="#E2876A" big>
            <h1 className="m-0 text-center" style={{ fontWeight:800, fontSize:"30pt", letterSpacing:"-0.01em", color:"#2A2622" }}>{basics.fullName}</h1>
          </Win>
          <div style={{ height:12 }}/>
          <div style={{ background:"#EFC56B", border:"3px solid #2A2622", padding:"8px 14px", textAlign:"center", fontWeight:700, fontSize:"15pt", boxShadow:"4px 4px 0 #2A2622" }}>{basics.role}</div>
          <div style={{ height:14 }}/>
          {basics.summary && <Win title={getLabel(data,"summary","Profile")} accent="#E2876A"><RichTextRender html={basics.summary} style={{fontSize:"10pt",color:"#3C362F"}}/></Win>}
          <div style={{ height:14 }}/>
          <Win title={getLabel(data,"skills","Skills")} accent="#E2876A">
            {skills.slice(0,6).map((s,i)=>(<div key={i} className="flex items-center justify-between mb-1.5"><span className="text-[9.5pt]">{s}</span><span style={{display:"inline-block",width:90,height:11,border:"2px solid #2A2622",background:"#FBF3DD"}}><span style={{display:"block",height:"100%",width:`${85-i*7}%`,background:"#E2876A"}}/></span></div>))}
          </Win>
          <div style={{ height:14 }}/>
          <Win title={getLabel(data,"contact","Contact Detail")} accent="#E2876A">
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"9.5pt",lineHeight:1.9}}>
              {[basics.email,basics.phone,basics.website,basics.location].filter(Boolean).map((x,i)=>(<li key={i}>▸ {x}</li>))}
            </ul>
          </Win>
        </div>
      </div>
      <div style={{ height:14 }}/>
      <Win title={getLabel(data,"experience","Experiences")} accent="#E2876A">
        {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
          <p className="m-0 font-bold text-[11pt]">● {e.role}</p>
          <p className="m-0 text-[9.5pt]" style={{color:"#8A4A38",fontWeight:700}}>{e.company} — {dateRange(e.startDate,e.endDate,e.current)}</p>
          <BulletsRender bullets={e.bullets} className="ros-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#3C362F"}}/>
        </div>))}
        {(languages.length>0||certifications.length>0) && <div className="mt-2 pt-2 text-[9pt]" style={{borderTop:"2px dotted #2A2622",color:"#5A534B"}}>
          {languages.length>0 && <span>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</span>}
          {certifications.length>0 && <span>{languages.length>0?"  ·  ":""}{certifications.map(c=>c.name).join(" · ")}</span>}
        </div>}
      </Win>
      <style>{`.ros-b li{position:relative;padding-left:13px;margin-bottom:1px}.ros-b li:before{content:"–";position:absolute;left:0;color:#8A4A38}`}</style>
    </article>
  );
}
function Win({ title, accent, children, big }: { title:string|null; accent:string; children:React.ReactNode; big?:boolean }){
  return (
    <section style={{ background:"#FBF3DD", border:"3px solid #2A2622", boxShadow:"5px 5px 0 #2A2622" }}>
      {title!==null && <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#EFC56B", borderBottom:"3px solid #2A2622", padding:"4px 8px" }}>
        <span className="flex items-center gap-2" style={{ fontWeight:700, fontSize:"11pt" }}><span style={{width:9,height:9,borderRadius:"50%",background:accent,display:"inline-block"}}/>{title}</span>
        <span style={{ width:18, height:16, background:accent, border:"2px solid #2A2622", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9pt", fontWeight:800, lineHeight:1 }}>✕</span>
      </div>}
      <div style={{ padding: big?"14px 16px":"10px 12px" }}>{children}</div>
    </section>
  );
}
