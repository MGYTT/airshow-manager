"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Plane, ShieldCheck, Trophy } from "lucide-react";
import styles from "./page.module.css";

type Career = { eventName: string; location: string; budget: number; days: number };

const starter: Career = { eventName: "Baltic Wings AirShow", location: "Poland", budget: 1250000, days: 365 };

export default function Home() {
  const [career, setCareer] = useState<Career | null>(null);
  if (career) return <Dashboard career={career} />;
  return <main className={styles.landing}>
    <div className={styles.eyebrow}>AIRSHOW MANAGEMENT SIMULATION</div>
    <section className={styles.hero}>
      <div><span className={styles.kicker}>BUILD · ORGANIZE · DELIVER</span><h1>AIRSHOW<br/><b>MANAGER</b></h1><p>Od pierwszego telefonu do zespołu pokazowego aż po otwarcie bram. Zbuduj organizację, zabezpiecz budżet i dowieź dzień pokazu.</p><div className={styles.actions}><button onClick={()=>setCareer(starter)}>Nowa kariera <ArrowRight size={18}/></button><button className={styles.secondary} disabled>Kontynuuj <small>brak zapisu</small></button></div></div>
      <div className={styles.radar}><div className={styles.radarSweep}/><Plane size={42}/><span>OPS / 001</span></div>
    </section>
    <div className={styles.featureRow}><Feature icon={<CalendarDays/>} title="365 dni" text="Pełny cykl przygotowań"/><Feature icon={<ShieldCheck/>} title="Operations" text="Bezpieczeństwo i logistyka"/><Feature icon={<Trophy/>} title="Career" text="Buduj reputację organizatora"/></div>
  </main>;
}

function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}) { return <div className={styles.feature}>{icon}<div><strong>{title}</strong><span>{text}</span></div></div> }

function Dashboard({career}:{career:Career}) {
 const tasks=[["Zbuduj zespół operacyjny","High"],["Przygotuj pierwszą ofertę sponsorską","High"],["Rozpocznij rozmowy z uczestnikami","Medium"],["Ustal strategię sprzedaży biletów","Medium"]];
 return <main className={styles.app}><aside><div className={styles.brand}><Plane/> <b>ASM</b></div><nav>{["Overview","Operations","Participants","Sponsors","Team","Infrastructure","Ticketing","Marketing","Finance"].map((x,i)=><button className={i===0?styles.active:""} key={x}>{x}</button>)}</nav><div className={styles.season}>SEASON 01<br/><strong>Regional Organizer</strong></div></aside><section className={styles.workspace}><header><div><span>OPERATIONS CENTER</span><h2>{career.eventName}</h2><p>{career.location} · Season 2027</p></div><div className={styles.countdown}><b>{career.days}</b><span>DAYS TO AIRSHOW</span></div></header><div className={styles.metrics}><Metric label="AVAILABLE CASH" value={money(career.budget)} sub="Opening budget"/><Metric label="REPUTATION" value="12 / 100" sub="Regional organizer"/><Metric label="CONFIRMED ACTS" value="0" sub="Start outreach"/><Metric label="READINESS" value="4%" sub="Planning phase"/></div><div className={styles.grid}><article className={styles.panel}><div className={styles.panelHead}><div><span>MISSION CONTROL</span><h3>Priority tasks</h3></div><b>4 OPEN</b></div>{tasks.map(([task,priority],i)=><div className={styles.task} key={task}><span className={styles.taskNo}>0{i+1}</span><div><strong>{task}</strong><small>Deadline: {365-(i+1)*25} days to event</small></div><em>{priority}</em></div>)}</article><article className={styles.panel}><div className={styles.panelHead}><div><span>EVENT HEALTH</span><h3>Departments</h3></div></div>{[["Air Operations",8],["Commercial",4],["Safety",6],["Marketing",2]].map(([name,val])=><div className={styles.health} key={name as string}><div><span>{name}</span><b>{val}%</b></div><progress value={val as number} max="100"/></div>)}</article></div><div className={styles.alert}><span>DAY 365</span><div><strong>Your organization has been established.</strong><p>Build your core team and secure the first partners before contacting headline display teams.</p></div><button>OPEN BRIEF <ArrowRight size={16}/></button></div></section></main>
}
const money=(n:number)=>new Intl.NumberFormat("pl-PL",{style:"currency",currency:"PLN",maximumFractionDigits:0}).format(n);
function Metric({label,value,sub}:{label:string;value:string;sub:string}) { return <div className={styles.metric}><span>{label}</span><strong>{value}</strong><small>{sub}</small></div> }
