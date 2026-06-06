// DarkSplitPro — Marketing, Strategy, Comms (bold dark + accent blocks)
// Charcoal sidebar + blue highlight section bars + footer contact band. atsSafe:false.
"use client";
import React from "react";
import { TemplateProps, dateRange, BulletsRender, RichTextRender, getLabel, initials } from "./types";

export default function DarkSplitPro({ data }: TemplateProps) {
  const { basics, experience = [], education = [], skills = [], languages = [] } = data;
  const ACC = "#4D6BF5";
  return (
    <article className="w-[794px] min-h-[1123px] relative overflow-hidden print:shadow-none"
      style={{ background:"#2B333B", color:"#E7ECF1", fontFamily:'"Inter",sans-serif', fontSize:"10pt", lineHeight:1.5, display:"flex", flexDirection:"column" }}>
      <header className="relative" style={{ background:"#222A31", padding:"30px 44px 26px", display:"grid", gridTemplateColumns:"150px 1fr", gap:26, alignItems:"center" }}>
        <div style={{ width:140, height:160, overflow:"hidden", background:"#3A444E", border:`3px solid ${ACC}` }}>
          {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div className="flex items-center justify-center h-full" style={{color:ACC,fontWeight:800,fontSize:"38pt"}}>{initials(basics.fullName)}</div>}
        </div>
        <div>
          <h1 className="m-0" style={{ fontWeight:900, fontSize:"38pt", lineHeight:0.96, letterSpacing:"-0.01em", color:"#fff" }}>{basics.fullName}</h1>
          <p className="m-0 mt-1" style={{ fontSize:"16pt", color:"#fff", fontWeight:400 }}>{basics.role}</p>
        </div>
      </header>
      <div className="grid gap-9 flex-1" style={{ padding:"28px 44px 30px", gridTemplateColumns:"1fr 1.35fr" }}>
        <div>
          {basics.summary && <Sec acc={ACC} t={getLabel(data,"summary","Sobre mí")}><RichTextRender html={basics.summary} style={{color:"#C2CBD4",fontSize:"10pt"}}/></Sec>}
          <Sec acc={ACC} t={getLabel(data,"skills","Aptitudes")}>
            {skills.slice(0,6).map((s,i)=>(<div key={i} className="mb-2.5"><div className="text-[9.5pt] mb-1">{s}.</div><div style={{height:8,borderRadius:5,background:"#3A444E"}}><div style={{height:"100%",borderRadius:5,width:`${88-i*7}%`,background:ACC}}/></div></div>))}
          </Sec>
          {languages.length>0 && <Sec acc={ACC} t={getLabel(data,"languages","Idiomas")}>
            {languages.map((l,i)=>(<p key={i} className="m-0 mb-0.5 text-[9.5pt]"><b>{l.name}:</b> <span style={{color:"#AEB8C2"}}>{l.level}</span></p>))}
          </Sec>}
        </div>
        <div>
          <Sec acc={ACC} t={getLabel(data,"experience","Experiencia")}>
            {experience.map((e,i)=>(<div key={i} className="mb-3 last:mb-0">
              <p className="m-0 font-bold text-[10.5pt]" style={{color:"#fff"}}>{e.company} / {dateRange(e.startDate,e.endDate,e.current)}</p>
              <p className="m-0 italic text-[9.5pt]" style={{color:ACC,fontWeight:600}}>{e.role}</p>
              <BulletsRender bullets={e.bullets} className="dsp-b" style={{margin:"2px 0 0",padding:0,listStyle:"none",fontSize:"9.5pt",color:"#C2CBD4"}}/>
            </div>))}
          </Sec>
          <Sec acc={ACC} t={getLabel(data,"education","Formación académica")}>
            {education.map((e,i)=>(<div key={i} className="mb-1.5"><p className="m-0 font-bold text-[10pt]" style={{color:"#fff"}}>{e.school} {e.startDate&&<span style={{color:"#8A95A0",fontWeight:400}}>/ {e.startDate}{e.endDate?` - ${e.endDate}`:""}</span>}</p><p className="m-0 text-[9.5pt]" style={{color:"#AEB8C2"}}>{e.degree}</p></div>))}
          </Sec>
        </div>
      </div>
      <footer style={{ background:"#222A31", padding:"18px 44px", display:"grid", gridTemplateColumns:"1.4fr auto 1.3fr", gap:20, alignItems:"center" }}>
        <div>
          <p className="m-0 font-extrabold text-[16pt]" style={{ color:"#fff", lineHeight:1 }}>{basics.fullName}</p>
          <p className="m-0 text-[11pt]" style={{ color:"#AEB8C2" }}>{basics.role}</p>
        </div>
        {basics.photoUrl ? <img src={basics.photoUrl} alt="" style={{ width:54, height:54, objectFit:"cover", border:`2px solid ${ACC}` }}/> : <span/>}
        <div className="text-[9pt]" style={{ color:"#C2CBD4", lineHeight:1.8 }}>{[basics.phone,basics.email,basics.location].filter(Boolean).map((x,i)=>(<div key={i}>{x}</div>))}</div>
      </footer>
      <style>{`.dsp-b li{position:relative;padding-left:13px;margin-bottom:1px}.dsp-b li:before{content:"";position:absolute;left:0;top:6px;width:5px;height:5px;border-radius:50%;background:${ACC}}`}</style>
    </article>
  );
}
function Sec({ t, acc, children }: { t:string; acc:string; children:React.ReactNode }){ return <section className="mb-5 last:mb-0"><h2 className="m-0 mb-2.5 uppercase" style={{fontSize:"11pt",fontWeight:800,letterSpacing:"0.08em",color:"#fff",background:acc,display:"inline-block",padding:"3px 12px",whiteSpace:"nowrap"}}>{t}</h2>{children}</section>; }
