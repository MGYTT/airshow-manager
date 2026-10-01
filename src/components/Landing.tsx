"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Banknote, Cloud, Handshake, LockKeyhole, LogIn, Plane, ShieldCheck, Ticket, UserPlus, Users } from "lucide-react";
import { loadCloudSave } from "../lib/cloudSave";
import { useAuth } from "./AuthProvider";
import ThemeToggle from "./ThemeToggle";
import styles from "../app/page.module.css";

const systems=[
  [Plane,"Program lotniczy","Buduj program, zapraszaj zespoły i negocjuj warunki udziału."],
  [Banknote,"Finanse","Kontroluj płynność, zobowiązania i każdą decyzję kosztową."],
  [Handshake,"Sponsorzy","Pozyskuj partnerów i realizuj świadczenia zapisane w umowach."],
  [ShieldCheck,"Operacje","Spinaj bezpieczeństwo, logistykę, lotnisko i harmonogram."],
  [Ticket,"Publiczność","Zarządzaj cenami, sprzedażą i doświadczeniem widzów."],
  [Users,"Zespół","Buduj kompetentną organizację i wzmacniaj departamenty."]
] as const;

export default function Landing(){
 const router=useRouter();
 const {user,loading}=useAuth();
 const [hasSave,setHasSave]=useState(false);

 useEffect(()=>{
   if(!user){setHasSave(false);return}
   let cancelled=false;
   loadCloudSave(user.id).then(info=>{if(!cancelled)setHasSave(Boolean(info.game))}).catch(()=>{if(!cancelled)setHasSave(false)});
   return()=>{cancelled=true};
 },[user]);

 const login=(next="/gra/centrum")=>router.push(`/auth?mode=login&next=${encodeURIComponent(next)}`);
 const register=()=>router.push("/auth?mode=register&next=%2Fnowa-kariera");

 return <main className={styles.landing}>
  <header className={styles.siteHeader}>
   <div className={styles.wordmark}><span className={styles.mark}><Plane size={17}/></span><div><b>AIRSHOW MANAGER</b><small>Build. Organize. Deliver.</small></div></div>
   <nav><a href="#systemy">Systemy</a><a href="#sezon">Sezon</a><a href="#centrum">Centrum dowodzenia</a></nav>
   <div className={styles.headerActions}>
    <span className={styles.version}>PRE-ALPHA · 0.3</span>
    {!loading&&user?<button className={styles.accountEntry} onClick={()=>router.push("/konto")}>Moje konto</button>:!loading&&<><button className={styles.headerLogin} onClick={()=>login()}><LogIn size={14}/> Zaloguj się</button><button className={styles.headerRegister} onClick={register}><UserPlus size={14}/> Załóż konto</button></>}
    <ThemeToggle/>
   </div>
  </header>

  <section className={styles.hero}>
   <div className={styles.heroCopy}>
    <span className={styles.eyebrow}>PROFESJONALNY SYMULATOR ZARZĄDZANIA AIRSHOW</span>
    <h1>Zbuduj wydarzenie,<br/><em>które działa pod presją.</em></h1>
    <p>Od pierwszego budżetu do ostatniej odprawy przed otwarciem bram. Podejmuj decyzje organizatora i obserwuj ich konsekwencje w całym sezonie.</p>
    <div className={styles.heroActions}>
     {user?<>{hasSave?<button onClick={()=>router.push("/gra/centrum")}>Kontynuuj karierę <ArrowRight size={16}/></button>:<button onClick={()=>router.push("/nowa-kariera")}>Utwórz pierwszą karierę <ArrowRight size={16}/></button>}<button onClick={()=>router.push("/nowa-kariera")}>Nowa kariera <span>Konto aktywne</span></button></>:<><button onClick={register}><UserPlus size={16}/> Załóż konto i rozpocznij</button><button onClick={()=>login()}><LogIn size={15}/> Mam już konto <span>Zaloguj się</span></button></>}
    </div>
    {!user&&!loading&&<div className={styles.heroAccountNotice}><LockKeyhole size={15}/><span><b>Konto jest wymagane do gry.</b> Każda kariera i cloud save są przypisane do konkretnego użytkownika.</span></div>}
    <div className={styles.heroMeta}><span><b>10–12 mies.</b> przygotowań</span><span><b>12+</b> systemów zarządzania</span><span><b>1</b> konto · własny cloud save</span></div>
   </div>
   <div className={styles.heroVisual}><div className={styles.visualHeader}><span>SEZON / 01</span><span>STATUS · PLANOWANIE</span></div><div className={styles.visualRunway}><i/><Plane size={31}/><b>27</b></div><div className={styles.visualReadout}><div><span>CEL OPERACYJNY</span><strong>Zabezpiecz program<br/>i płynność wydarzenia.</strong></div><div className={styles.visualStats}><span>BUDŻET<b>650 000 PLN</b></span><span>HORYZONT<b>332 DNI</b></span></div></div></div>
  </section>

  {!user&&!loading&&<section className={styles.homeAccountGate}>
   <div className={styles.homeGateIntro}><span>SECURE ACCESS / CLOUD CAREER</span><h2>Najpierw konto.<br/>Potem Twoja organizacja.</h2><p>AirShow Manager nie uruchamia anonimowych karier. Konto chroni zapis gry, oddziela dane graczy i umożliwia kontynuację na innym urządzeniu.</p></div>
   <div className={styles.homeGateActions}>
    <article><span className={styles.homeGateIcon}><UserPlus size={19}/></span><div><small>NOWY ORGANIZATOR</small><h3>Załóż konto</h3><p>Utwórz konto, potwierdź e-mail i rozpocznij pierwszą karierę.</p></div><button onClick={register}>Rejestracja <ArrowRight size={15}/></button></article>
    <article><span className={styles.homeGateIcon}><LogIn size={19}/></span><div><small>MASZ JUŻ KONTO</small><h3>Zaloguj się</h3><p>Wczytaj swoją karierę i najnowszy zapis zsynchronizowany z chmurą.</p></div><button onClick={()=>login()}>Logowanie <ArrowRight size={15}/></button></article>
   </div>
   <div className={styles.homeGateSecurity}><span><ShieldCheck size={15}/><b>Row Level Security</b><small>Każdy gracz widzi wyłącznie własny zapis.</small></span><span><Cloud size={15}/><b>Cloud Save</b><small>Postęp przypisany do konta użytkownika.</small></span><span><LockKeyhole size={15}/><b>Protected Game</b><small>Bez sesji nie wejdziesz do kariery ani gry.</small></span></div>
  </section>}

  {user&&<section className={styles.homeSignedIn}>
   <div><span>ACCOUNT ACTIVE</span><h2>Witaj ponownie.</h2><p>{hasSave?"Twój zapis chmurowy jest gotowy. Możesz kontynuować prowadzenie AirShow.":"Konto jest aktywne. Utwórz pierwszą organizację i rozpocznij sezon."}</p></div>
   <div><button onClick={()=>hasSave?router.push("/gra/centrum"):router.push("/nowa-kariera")}>{hasSave?"Kontynuuj karierę":"Utwórz karierę"} <ArrowRight size={15}/></button><button onClick={()=>router.push("/konto")}>Moje konto</button></div>
  </section>}

  <section className={styles.statement} id="systemy"><span>01 / SYSTEM GRY</span><div><h2>Nie zarządzasz ekranami.<br/>Zarządzasz konsekwencjami.</h2><p>Każdy moduł wpływa na pozostałe. Droższy uczestnik poprawia program, ale ogranicza płynność. Słaba sprzedaż wymusza cięcia. Opóźnienia operacyjne podnoszą ryzyko.</p></div></section>
  <section className={styles.systemGrid}>{systems.map(([Icon,title,text],i)=><article key={title}><div><span>0{i+1}</span><Icon size={18}/></div><h3>{title}</h3><p>{text}</p></article>)}</section>
  <section className={styles.seasonFlow} id="sezon"><div className={styles.flowIntro}><span>02 / PEŁNY SEZON</span><h2>Od pustego planu<br/>do Event Day.</h2><p>Tempo przygotowań rośnie wraz ze zbliżającą się datą. Im później reagujesz, tym droższe stają się błędy.</p></div><div className={styles.flowSteps}>{[["01","Fundamenty","Budżet, termin, organizacja"],["02","Program","Uczestnicy i sponsorzy"],["03","Gotowość","Operacje, bilety, marketing"],["04","Event Day","Realizacja i wynik"]].map(x=><div key={x[0]}><b>{x[0]}</b><strong>{x[1]}</strong><span>{x[2]}</span></div>)}</div></section>
  <section className={styles.productPreview} id="centrum"><div><span>03 / CENTRUM DOWODZENIA</span><h2>Decyzje przed dekoracją.</h2><p>Interfejs pokazuje to, co potrzebne w danym momencie: stan finansów, gotowość, priorytety, terminy i ostatnie zdarzenia.</p><button onClick={()=>user?router.push(hasSave?"/gra/centrum":"/nowa-kariera"):register()}>{user?(hasSave?"Otwórz Command Center":"Utwórz organizację"):"Załóż konto, aby zagrać"} <ArrowRight size={15}/></button></div><div className={styles.previewWindow}><header><span>AIRSHOW MANAGER / OPERACJE</span><b>D-214</b></header><div className={styles.previewMetrics}><span>GOTÓWKA<b>487 000 PLN</b></span><span>PROGRAM<b>4 / 8</b></span><span>GOTOWOŚĆ<b>38%</b></span></div><div className={styles.previewTask}><span>PRIORYTET</span><strong>Potwierdź strefę pokazów</strong><b>W TOKU</b></div><div className={styles.previewTask}><span>UCZESTNICY</span><strong>3 odpowiedzi oczekują</strong><b>AKTYWNE</b></div></div></section>
  <footer className={styles.siteFooter}><div className={styles.wordmark}><span className={styles.mark}><Plane size={15}/></span><b>AIRSHOW MANAGER</b></div><span>WERSJA ROZWOJOWA · 0.3</span><span>{user?"KONTO: AKTYWNE":"DOSTĘP: WYMAGA KONTA"}</span></footer>
 </main>
}