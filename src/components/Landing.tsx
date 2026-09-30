"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Banknote, CalendarDays, Handshake, Plane, ShieldCheck, Ticket, Users } from "lucide-react";
import { loadGame } from "../lib/game";
import styles from "../app/page.module.css";

const systems=[
  [Plane,"Program lotniczy","Buduj line-up, zapraszaj zespoły i negocjuj warunki udziału."],
  [Banknote,"Finanse","Kontroluj płynność, zobowiązania i każdą decyzję kosztową."],
  [Handshake,"Sponsorzy","Pozyskuj partnerów i realizuj świadczenia zapisane w umowach."],
  [ShieldCheck,"Operacje","Spinaj bezpieczeństwo, logistykę, lotnisko i harmonogram."],
  [Ticket,"Publiczność","Zarządzaj cenami, sprzedażą i doświadczeniem widzów."],
  [Users,"Zespół","Buduj kompetentną organizację i wzmacniaj departamenty."]
] as const;

export default function Landing(){
 const router=useRouter(); const [hasSave,setHasSave]=useState(false);
 useEffect(()=>setHasSave(Boolean(loadGame())),[]);
 return <main className={styles.landing}>
  <header className={styles.siteHeader}><div className={styles.wordmark}><span className={styles.mark}><Plane size={17}/></span><div><b>AIRSHOW MANAGER</b><small>Build. Organize. Deliver.</small></div></div><nav><a href="#systemy">Systemy</a><a href="#sezon">Sezon</a><a href="#centrum">Centrum dowodzenia</a></nav><span className={styles.version}>PRE-ALPHA · 0.2</span></header>
  <section className={styles.hero}>
   <div className={styles.heroCopy}><span className={styles.eyebrow}>PROFESJONALNY SYMULATOR ZARZĄDZANIA AIRSHOW</span><h1>Zbuduj wydarzenie,<br/><em>które działa pod presją.</em></h1><p>Od pierwszego budżetu do ostatniej odprawy przed otwarciem bram. Podejmuj decyzje organizatora i obserwuj ich konsekwencje w całym sezonie.</p><div className={styles.heroActions}><button onClick={()=>router.push("/nowa-kariera")}>Rozpocznij nową karierę <ArrowRight size={16}/></button><button disabled={!hasSave} onClick={()=>hasSave&&router.push("/gra/centrum")}>Kontynuuj sezon <span>{hasSave?"Zapis gotowy":"Brak zapisu"}</span></button></div>
   <div className={styles.heroMeta}><span><b>10–12 mies.</b> przygotowań</span><span><b>9</b> obszarów zarządzania</span><span><b>1</b> dzień, który wszystko weryfikuje</span></div></div>
   <div className={styles.heroVisual}><div className={styles.visualHeader}><span>SEZON / 01</span><span>STATUS · PLANOWANIE</span></div><div className={styles.visualRunway}><i/><Plane size={31}/><b>27</b></div><div className={styles.visualReadout}><div><span>CEL OPERACYJNY</span><strong>Zabezpiecz program<br/>i płynność wydarzenia.</strong></div><div className={styles.visualStats}><span>BUDŻET<b>650 000 PLN</b></span><span>HORYZONT<b>332 DNI</b></span></div></div></div>
  </section>
  <section className={styles.statement} id="systemy"><span>01 / SYSTEM GRY</span><div><h2>Nie zarządzasz ekranami.<br/>Zarządzasz konsekwencjami.</h2><p>Każdy moduł wpływa na pozostałe. Droższy uczestnik poprawia program, ale ogranicza płynność. Słaba sprzedaż wymusza cięcia. Opóźnienia operacyjne podnoszą ryzyko.</p></div></section>
  <section className={styles.systemGrid}>{systems.map(([Icon,title,text],i)=><article key={title}><div><span>0{i+1}</span><Icon size={18}/></div><h3>{title}</h3><p>{text}</p></article>)}</section>
  <section className={styles.seasonFlow} id="sezon"><div className={styles.flowIntro}><span>02 / PEŁNY SEZON</span><h2>Od pustego planu<br/>do Event Day.</h2><p>Tempo przygotowań rośnie wraz ze zbliżającą się datą. Im później reagujesz, tym droższe stają się błędy.</p></div><div className={styles.flowSteps}>{[["01","Fundamenty","Budżet, termin, organizacja"],["02","Program","Uczestnicy i sponsorzy"],["03","Gotowość","Operacje, bilety, marketing"],["04","Event Day","Realizacja i wynik"]].map(x=><div key={x[0]}><b>{x[0]}</b><strong>{x[1]}</strong><span>{x[2]}</span></div>)}</div></section>
  <section className={styles.productPreview} id="centrum"><div><span>03 / CENTRUM DOWODZENIA</span><h2>Decyzje przed dekoracją.</h2><p>Interfejs pokazuje to, co potrzebne w danym momencie: stan finansów, gotowość, priorytety, terminy i ostatnie zdarzenia.</p><button onClick={()=>router.push("/nowa-kariera")}>Utwórz organizację <ArrowRight size={15}/></button></div><div className={styles.previewWindow}><header><span>AIRSHOW MANAGER / OPERACJE</span><b>D-214</b></header><div className={styles.previewMetrics}><span>GOTÓWKA<b>487 000 PLN</b></span><span>PROGRAM<b>4 / 8</b></span><span>GOTOWOŚĆ<b>38%</b></span></div><div className={styles.previewTask}><span>PRIORYTET</span><strong>Potwierdź strefę pokazów</strong><b>W TOKU</b></div><div className={styles.previewTask}><span>UCZESTNICY</span><strong>3 odpowiedzi oczekują</strong><b>AKTYWNE</b></div></div></section>
  <footer className={styles.siteFooter}><div className={styles.wordmark}><span className={styles.mark}><Plane size={15}/></span><b>AIRSHOW MANAGER</b></div><span>WERSJA ROZWOJOWA · 0.2</span><span>JĘZYK: POLSKI</span></footer>
 </main>
}
