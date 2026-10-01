"use client";
import { useEffect,useState,type FormEvent } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { ArrowRight,Cloud,KeyRound,LockKeyhole,Mail,Plane,ShieldCheck,UserRound } from "lucide-react";
import { useAuth } from "./AuthProvider";
import ThemeToggle from "./ThemeToggle";
import styles from "../app/page.module.css";

type Mode="login"|"register"|"recover";

export default function AuthPage(){
  const router=useRouter();
  const params=useSearchParams();
  const {user,loading,configured,signIn,signUp,requestPasswordReset}=useAuth();
  const [mode,setMode]=useState<Mode>("login");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const next=params.get("next")||"/gra/centrum";

  useEffect(()=>{if(!loading&&user)router.replace(next)},[loading,user,router,next]);

  const submit=async(e:FormEvent)=>{
    e.preventDefault();setBusy(true);setError("");setMessage("");
    try{
      if(mode==="login"){
        await signIn(email,password);
        router.replace(next);
      }else if(mode==="register"){
        if(password.length<8)throw new Error("Hasło musi mieć minimum 8 znaków.");
        const result=await signUp(email,password,name);
        if(result.needsConfirmation)setMessage("Konto utworzone. Sprawdź skrzynkę e-mail i potwierdź adres, aby aktywować konto.");
        else router.replace(next);
      }else{
        await requestPasswordReset(email);
        setMessage("Wysłaliśmy link do ustawienia nowego hasła. Sprawdź skrzynkę e-mail.");
      }
    }catch(err){setError(err instanceof Error?err.message:"Nie udało się wykonać operacji.")}
    finally{setBusy(false)}
  };

  return <main className={styles.authPage}>
    <header className={styles.authTopbar}>
      <button onClick={()=>router.push("/")}>← Strona główna</button>
      <div className={styles.wordmark}><span className={styles.mark}><Plane size={17}/></span><div><b>AIRSHOW MANAGER</b><small>SECURE ACCOUNT</small></div></div>
      <ThemeToggle compact/>
    </header>
    <section className={styles.authLayout}>
      <aside className={styles.authStory}>
        <span>ACCOUNT SYSTEM / CLOUD SAVE</span>
        <h1>Twoja organizacja.<br/><em>Twoja kariera.</em></h1>
        <p>Konto synchronizuje postęp gry pomiędzy urządzeniami i chroni zapis przed utratą danych lokalnych.</p>
        <div className={styles.authBenefits}>
          <div><Cloud size={18}/><span><b>Cloud Save</b><small>Automatyczna synchronizacja całej kariery.</small></span></div>
          <div><ShieldCheck size={18}/><span><b>Izolacja danych</b><small>Każdy użytkownik ma dostęp wyłącznie do własnego zapisu.</small></span></div>
          <div><LockKeyhole size={18}/><span><b>Bezpieczna sesja</b><small>Logowanie, potwierdzenie e-mail i odzyskiwanie hasła.</small></span></div>
        </div>
      </aside>
      <section className={styles.authCard}>
        <div className={styles.authTabs}>
          <button className={mode==="login"?styles.authTabActive:""} onClick={()=>{setMode("login");setError("");setMessage("")}}>Logowanie</button>
          <button className={mode==="register"?styles.authTabActive:""} onClick={()=>{setMode("register");setError("");setMessage("")}}>Rejestracja</button>
        </div>
        <div className={styles.authHeading}>
          <span>{mode==="recover"?"ODZYSKIWANIE DOSTĘPU":mode==="register"?"NOWE KONTO":"WITAJ PONOWNIE"}</span>
          <h2>{mode==="recover"?"Ustawimy nowy dostęp.":mode==="register"?"Utwórz konto organizatora.":"Zaloguj się do kariery."}</h2>
          <p>{mode==="recover"?"Podaj adres konta, a otrzymasz bezpieczny link resetujący.":mode==="register"?"Po rejestracji Twój obecny lokalny zapis może zostać przeniesiony do chmury.":"Po zalogowaniu pobierzemy Twój najnowszy zapis z chmury."}</p>
        </div>
        {!configured&&<div className={styles.authConfigWarning}><b>Cloud Auth wymaga konfiguracji Supabase.</b><span>Dodaj NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY w Vercel.</span></div>}
        <form className={styles.authForm} onSubmit={submit}>
          {mode==="register"&&<label><span>Imię / nazwa organizatora</span><div><UserRound size={16}/><input required maxLength={48} value={name} onChange={e=>setName(e.target.value)} placeholder="np. Michał"/></div></label>}
          <label><span>Adres e-mail</span><div><Mail size={16}/><input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="organizator@example.com"/></div></label>
          {mode!=="recover"&&<label><span>Hasło</span><div><KeyRound size={16}/><input required minLength={8} type="password" autoComplete={mode==="register"?"new-password":"current-password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 8 znaków"/></div></label>}
          {error&&<div className={styles.authError}>{error}</div>}
          {message&&<div className={styles.authSuccess}>{message}</div>}
          <button className={styles.authSubmit} disabled={busy||!configured}>{busy?"Przetwarzanie...":mode==="login"?"Zaloguj się":mode==="register"?"Utwórz konto":"Wyślij link"}<ArrowRight size={16}/></button>
        </form>
        {mode==="login"&&<button className={styles.authLink} onClick={()=>{setMode("recover");setError("");setMessage("")}}>Nie pamiętam hasła</button>}
        {mode==="recover"&&<button className={styles.authLink} onClick={()=>{setMode("login");setError("");setMessage("")}}>← Wróć do logowania</button>}
        <footer><ShieldCheck size={14}/> Sesje i dane gry są chronione przez Supabase Auth + Row Level Security.</footer>
      </section>
    </section>
  </main>
}
