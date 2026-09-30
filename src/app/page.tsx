"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CalendarDays, Plane, ShieldCheck, Trophy } from "lucide-react";
import styles from "./page.module.css";

type Career = { eventName: string; location: string; budget: number; days: number; scale: string; eventDate: string };

const starter: Career = { eventName: "Baltic Wings AirShow", location: "Poland", budget: 650000, days: 332, scale: "Regional AirShow", eventDate: "2027-08-28" };

export default function Home() {
  const [career, setCareer] = useState<Career | null>(null);
  const [creating, setCreating] = useState(false);
  if (career) return <Dashboard career={career} />;
  if (creating) return <CareerSetup onBack={()=>setCreating(false)} onCreate={setCareer} />;
  return <main className={styles.landing}>
    <div className={styles.eyebrow}>AIRSHOW MANAGEMENT SIMULATION</div>
    <section className={styles.hero}>
      <div><span className={styles.kicker}>BUILD · ORGANIZE · DELIVER</span><h1>AIRSHOW<br/><b>MANAGER</b></h1><p>Od pierwszego telefonu do zespołu pokazowego aż po otwarcie bram. Zbuduj organizację, zabezpiecz budżet i dowieź dzień pokazu.</p><div className={styles.actions}><button onClick={()=>setCreating(true)}>Nowa kariera <ArrowRight size={18}/></button><button className={styles.secondary} disabled>Kontynuuj <small>brak zapisu</small></button></div></div>
      <div className={styles.radar}><div className={styles.radarSweep}/><Plane size={42}/><span>OPS / 001</span></div>
    </section>
    <div className={styles.featureRow}><Feature icon={<CalendarDays/>} title="365 dni" text="Pełny cykl przygotowań"/><Feature icon={<ShieldCheck/>} title="Operations" text="Bezpieczeństwo i logistyka"/><Feature icon={<Trophy/>} title="Career" text="Buduj reputację organizatora"/></div>
  </main>;
}

function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}) { return <div className={styles.feature}>{icon}<div><strong>{title}</strong><span>{text}</span></div></div> }

function Dashboard({career}:{career:Career}) {
 const [days,setDays]=useState(career.days);
 const [feed,setFeed]=useState(["Organization established. Season planning has begun."]);
 const tasks=[["Zbuduj zespół operacyjny","High"],["Przygotuj pierwszą ofertę sponsorską","High"],["Rozpocznij rozmowy z uczestnikami","Medium"],["Ustal strategię sprzedaży biletów","Medium"]];
 const advance=(amount:number)=>{
   const next=Math.max(0,days-amount); setDays(next);
   const crossed=(limit:number)=>days>limit&&next<=limit;
   if(crossed(300))setFeed(x=>["Participant application window is now open.",...x]);
   else if(crossed(270))setFeed(x=>["First sponsor outreach window has opened.",...x]);
   else if(crossed(240))setFeed(x=>["Early ticketing strategy is now due.",...x]);
   else setFeed(x=>[`Time advanced by ${amount} day${amount>1?"s":""}. No critical events.`,...x].slice(0,5));
 };
 return <main className={styles.app}><aside><div className={styles.brand}><Plane/> <b>ASM</b></div><nav>{["Overview","Operations","Participants","Sponsors","Team","Infrastructure","Ticketing","Marketing","Finance"].map((x,i)=><button className={i===0?styles.active:""} key={x}>{x}</button>)}</nav><div className={styles.season}>SEASON 01<br/><strong>{career.scale}</strong></div></aside><section className={styles.workspace}><header><div><span>OPERATIONS CENTER</span><h2>{career.eventName}</h2><p>{career.location} · {career.eventDate}</p></div><div className={styles.timebox}><div className={styles.countdown}><b>{days}</b><span>DAYS TO AIRSHOW</span></div><div className={styles.timeControls}><button onClick={()=>advance(1)}>+1 DAY</button><button onClick={()=>advance(7)}>+7 DAYS</button></div></div></header><div className={styles.metrics}><Metric label="AVAILABLE CASH" value={money(career.budget)} sub="Opening budget"/><Metric label="REPUTATION" value="12 / 100" sub="Regional organizer"/><Metric label="CONFIRMED ACTS" value="0" sub="Start outreach"/><Metric label="READINESS" value="4%" sub="Planning phase"/></div><div className={styles.grid}><article className={styles.panel}><div className={styles.panelHead}><div><span>MISSION CONTROL</span><h3>Priority tasks</h3></div><b>4 OPEN</b></div>{tasks.map(([task,priority],i)=><div className={styles.task} key={task}><span className={styles.taskNo}>0{i+1}</span><div><strong>{task}</strong><small>Deadline: {Math.max(0,days-(i+1)*25)} days remaining</small></div><em>{priority}</em></div>)}</article><article className={styles.panel}><div className={styles.panelHead}><div><span>EVENT HEALTH</span><h3>Departments</h3></div></div>{[["Air Operations",8],["Commercial",4],["Safety",6],["Marketing",2]].map(([name,val])=><div className={styles.health} key={name as string}><div><span>{name}</span><b>{val}%</b></div><progress value={val as number} max="100"/></div>)}</article></div><div className={styles.timeline}><div className={styles.panelHead}><div><span>ORGANIZER LOG</span><h3>Latest events</h3></div><b>LIVE</b></div>{feed.map((item,i)=><div className={styles.logItem} key={i}><span>D-{days}</span><p>{item}</p></div>)}</div><div className={styles.alert}><span>D-{days}</span><div><strong>{days>300?"Foundation phase":"Planning phase active"}</strong><p>{days>300?"Build your core team and prepare participant outreach.":"Deadlines are getting closer. Review open tasks before advancing time."}</p></div><button>OPEN BRIEF <ArrowRight size={16}/></button></div></section></main>
}
const money=(n:number)=>new Intl.NumberFormat("pl-PL",{style:"currency",currency:"PLN",maximumFractionDigits:0}).format(n);
function Metric({label,value,sub}:{label:string;value:string;sub:string}) { return <div className={styles.metric}><span>{label}</span><strong>{value}</strong><small>{sub}</small></div> }
