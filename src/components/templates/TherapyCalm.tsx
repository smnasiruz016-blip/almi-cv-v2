// TherapyCalm — soft warm beige + muted sage/terracotta, rounded calm layout
// For psychologists, counselors, therapists, social workers. atsSafe:true.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

const SAGE="#8AA293", CLAY="#C58A6F", INK="#43463F", CREAM="#F6F2EA";
export default function TherapyCalm({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [], certifications = [] } = data;
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:CREAM, color:INK, fontFamily:'"Cormorant Garamond","Georgia",serif', fontSize:"11pt", lineHeight:1.6 }}>
      <header className="relative" style={{ padding:"46px 52px 28px", background:SAGE, color:"#fff", borderBottomRightRadius:80 }}>
        <div className="grid items-center" style={{ gridTemplateColumns:"140px 1fr", gap:24 }}>
          <div style={{ width:134, height:134, borderRadius:"50%", overflow:"hidden", border:"5px solid rgba(255,255,255,0.55)", background:"#9FB3A5" }}>
            {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"40pt"}}>{initials(basics.fullName)}</div>}
          </div>
          <div>
            <h1 className="m-0" style={{ fontWeight:600, fontSize:"38pt", lineHeight:1, letterSpacing:"0.01em" }}>{basics.fullName}</h1>
            <p className="m-0 mt-1 uppercase" style={{ fontFamily:'"Inter",sans-serif', fontSize:"11.5pt", letterSpacing:"0.2em", color:"rgba(255,255,255,0.92)", fontWeight:500 }}>{basics.role}</p>
          </div>
        </div>
      </header>
      <div className="relative grid gap-9" style={{ padding:"26px 52px 44px", gridTemplateColumns:"1fr 1.4fr" }}>
        <div>
          <Sec t={getLabel(data,"contact","Contact")}>
            <div className="text-[10.5pt]" style={{color:"#5A5D54",lineHeight:1.9,fontFamily:'"Inter",sans-serif'}}>{[basics.phone,basics.email,basics.website,basics.location].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
          </Sec>
          <Sec t={getLabel(data,"skills","Areas of Focus")}>
            <ul style={{margin:0,padding:0,listStyle:"none",fontSize:"10.5pt"}}>{skills.map((s,i)=>(<li key={i} style={{padding:"3px 0",color:"#4A4D44",display:"flex",gap:9}}><span style={{color:CLAY}}>❋</span>{s}</li>))}</ul>
          </Sec>
          {certifications.length>0 && <Sec t={getLabel(data,"certifications","Licenses & Certs")}>
            {certifications.map((c,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-semibold text-[11pt]" style={{color:INK}}>{c.name}</p>{(c.issuer||c.year)&&<p className="m-0 italic text-[10pt]" style={{color:"#7A7D72"}}>{[c.issuer,c.year].filter(Boolean).join(" · ")}</p>}</div>))}
          </Sec>}
          {languages.length>0 && <Sec t={getLabel(data,"languages","Languages")}>
            <div className="text-[10.5pt]" style={{color:"#4A4D44",fontFamily:'"Inter",sans-serif'}}>{languages.map(l=>`${l.name}${l.level?` (${l.level})`:""}`).join(" · ")}</div>
          </Sec>}
        </div>
        <div>
          {basics.summary && <Sec t={getLabel(data,"summary","About Me")}><RichTextRender html={basics.summary} style={{color:"#4A4D44",fontSize:"11pt"}}/></Sec>}
          <Sec t={getLabel(data,"experience","Experience")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0" style={{position:"relative",paddingLeft:20}}>
              <span style={{position:"absolute",left:0,top:5,width:11,height:11,borderRadius:"50%",background:CLAY}}/>
              <span style={{position:"absolute",left:5,top:16,bottom:-10,width:1.5,background:"#D8D2C6"}}/>
              <p className="m-0 font-semibold text-[13pt]" style={{color:INK}}>{e.role}</p>
              <p className="m-0 text-[10.5pt]" style={{color:CLAY,fontWeight:600,fontFamily:'"Inter",sans-serif'}}>{e.company} · {dateRange(e.startDate,e.endDate,e.current)}</p>
              <BulletsRender bullets={e.bullets} className="tcm-b" style={{margin:"3px 0 0",padding:0,listStyle:"none",fontSize:"10.5pt",color:"#4A4D44",fontFamily:'"Inter",sans-serif'}}/>
            </div>))}
          </Sec>
          <Sec t={getLabel(data,"education","Education")}>
            {education.map((e,i)=>(<div key={i} className="mb-2"><p className="m-0 font-semibold text-[12pt]" style={{color:INK}}>{e.degree}</p><p className="m-0 text-[10.5pt]" style={{color:"#7A7D72",fontFamily:'"Inter",sans-serif'}}>{e.school}{e.endDate?`, ${dateRange(e.startDate,e.endDate)}`:""}</p></div>))}
          </Sec>
        </div>
      </div>
      <style>{`.tcm-b li{position:relative;padding-left:14px;margin-bottom:2px}.tcm-b li:before{content:"–";position:absolute;left:0;color:${CLAY}}`}</style>
    </article>
  );
}
function Sec({ t, children }: { t:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2" style={{fontSize:"16pt",fontWeight:600,color:"#6E8576"}}>{t}</h2>{children}</section>; }
