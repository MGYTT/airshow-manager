"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { ArrowRight, CalendarDays, Plane } from "lucide-react";
import { createGame,saveGame,scales,type ScaleId } from "../lib/game";
import styles from "../app/page.module.css";

export default function CareerSetup(){
 const router=useRouter(); const [name,setName]=useState("Baltic Wings AirShow"); const [location,setLocation]=useState("Polska"); const [date,setDate]=useState("2027-08-28"); const [scaleId,setScaleId]=useState<ScaleId>("regional");
 const selected=scales.find(x=>x.id===scaleId)!;
 const submit=(e:FormEvent)=>{e.preventDefault();const save=createGame({eventName:name.trim()||"Nowy AirShow",location,eventDate:date,scaleId,budget:selected.budget});saveGame(save);router.push("/gra/centrum")};
 return <main className={styles.setup}><header className={styles.setupHeader}><button onClick={()=>router.push("/")}>← Strona główna</button><div className={styles.wordmark}><span className={styles.mark}><Plane size={16}/></span><b>AIRSHOW MANAGER</b></div><span>NOWA KARIERA · SEZON 01</span></header>
 <form onSubmit={submit} className={styles.setupBody}><section className={styles.setupLead}><span className={styles.eyebrow}>KONFIGURACJA ORGANIZACJI</span><h1>Zaprojektuj swój<br/><em>pierwszy AirShow.</em></h1><p>To nie jest wybór kosmetyczny. Skala wydarzenia ustala budżet startowy i poziom presji operacyjnej pierwszego sezonu.</p><div className={styles.setupFields}><label>Nazwa wydarzenia<input required maxLength={48} value={name} onChange={e=>setName(e.target.value)} placeholder="np. Baltic Wings AirShow"/></label><div><label>Kraj<select value={location} onChange={e=>setLocation(e.target.value)}><option>Polska</option><option>Czechy</option><option>Niemcy</option><option>Wielka Brytania</option><option>Francja</option></select></label><label>Data pokazu<input required type="date" value={date} onChange={e=>setDate(e.target.value)}/></label></div></div><div className={styles.setupInfo}><CalendarDays size={18}/><div><b>Startujesz 332 dni przed wydarzeniem.</b><span>Czas w grze wpływa na odpowiedzi uczestników, terminy i późniejsze koszty.</span></div></div></section>
 <section className={styles.scaleSelector}><header><span>PROFIL WYDARZENIA</span><h2>Wybierz poziom ambicji.</h2></header><div className={styles.scaleList}>{scales.map((scale,i)=><button type="button" key={scale.id} className={scaleId===scale.id?styles.scaleSelected:""} onClick={()=>setScaleId(scale.id)}><span>0{i+1}</span><div><strong>{scale.label}</strong><small>{scale.tone} · {scale.audience}</small><p>{scale.description}</p></div><b>{new Intl.NumberFormat("pl-PL").format(scale.budget)} PLN</b></button>)}</div><div className={styles.setupSummary}><span><small>WYBRANY PROFIL</small><b>{selected.label}</b></span><span><small>BUDŻET STARTOWY</small><b>{new Intl.NumberFormat("pl-PL").format(selected.budget)} PLN</b></span></div><button className={styles.primaryAction}>Rozpocznij sezon <ArrowRight size={16}/></button><p className={styles.actionHint}>Po utworzeniu organizacji zapis gry będzie aktualizowany automatycznie.</p></section></form></main>
}
