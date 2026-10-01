"use client";
import { useEffect,useState,type FormEvent } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import { Cloud,KeyRound,LogOut,Plane,Save,ShieldCheck,UserRound } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { loadCloudSave,deleteCloudGame } from "../lib/cloudSave";
import ThemeToggle from "./ThemeToggle";
import styles from "../app/page.module.css";

export default function AccountPage(){
  const router=useRouter();const params=useSearchParams();
  const {user,loading,configured,signOut,updatePassword,updateName}=useAuth();
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [cloudUpdated,setCloudUpdated]=useState<string|null>(null);
  const [hasCloud,setHasCloud]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const reset=params.get("reset")==="1";

  useEffect(()=>{if(!loading&&!user)router.replace("/auth?next=/konto")},[loading,user,router]);
  useEffect(()=>{
    if(!user)return;
    setName(String(user.user_metadata?.display_name??""));
    loadCloudSave(user.id).then(info=>{setHasCloud(Boolean(info.game));setCloudUpdated(info.updatedAt)}).catch(()=>{});
  },[user]);

  const saveProfile=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setError("");try{await updateName(name);setMessage("Profil został zaktualizowany.")}catch(err){setError(err instanceof Error?err.message:"Błąd aktualizacji profilu.")}finally{setBusy(false)}};
  const changePassword=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setError("");try{if(password.length<8)throw new Error("Hasło musi mieć minimum 8 znaków.");await updatePassword(password);setPassword("");setMessage("Hasło zostało zmienione.")}catch(err){setError(err instanceof Error?err.message:"Nie udało się zmienić hasła.")}finally{setBusy(false)}};
  const logout=async()=>{await signOut();router.replace("/")};
  const removeCloud=async()=>{if(!user||!confirm("Usunąć zapis gry z chmury? Konto pozostanie aktywne."))return;await deleteCloudGame(user.id);setHasCloud(false);setCloudUpdated(null);setMessage("Zapis chmurowy został usunięty.")};

  if(loading||!user)return <main className={styles.loading}><Plane size={18}/> Ładowanie konta...</main>;

  return <main className={styles.accountPage}>
    <header className={styles.accountTopbar}><button onClick={()=>router.push("/gra/centrum")}>← Wróć do gry</button><div className={styles.wordmark}><span className={styles.mark}><Plane size={17}/></span><div><b>AIRSHOW MANAGER</b><small>ACCOUNT CENTER</small></div></div><ThemeToggle compact/></header>
    <section className={styles.accountHero}><div><span>ACCOUNT CENTER</span><h1>{name||"Organizator AirShow"}</h1><p>{user.email}</p></div><button onClick={logout}><LogOut size={15}/> Wyloguj się</button></section>
    {!configured&&<div className={styles.authConfigWarning}><b>Supabase nie jest skonfigurowany.</b></div>}
    {reset&&<div className={styles.accountNotice}><KeyRound size={17}/><span>Otworzyłeś bezpieczny link odzyskiwania. Ustaw nowe hasło poniżej.</span></div>}
    {message&&<div className={styles.authSuccess}>{message}</div>}{error&&<div className={styles.authError}>{error}</div>}
    <section className={styles.accountGrid}>
      <article className={styles.accountCard}><header><UserRound size={18}/><div><span>PROFIL</span><h2>Dane organizatora</h2></div></header><form onSubmit={saveProfile}><label>Nazwa wyświetlana<input value={name} maxLength={48} onChange={e=>setName(e.target.value)}/></label><label>Adres e-mail<input value={user.email??""} disabled/></label><button disabled={busy}><Save size={15}/> Zapisz profil</button></form></article>
      <article className={styles.accountCard}><header><Cloud size={18}/><div><span>CLOUD SAVE</span><h2>Synchronizacja kariery</h2></div></header><div className={styles.cloudStatus}><b className={hasCloud?styles.good:styles.warn}>{hasCloud?"ZAPIS W CHMURZE AKTYWNY":"BRAK ZAPISU W CHMURZE"}</b><p>{hasCloud?"Cała kariera jest automatycznie synchronizowana podczas gry.":"Rozpocznij lub kontynuuj karierę, aby utworzyć zapis chmurowy."}</p>{cloudUpdated&&<small>Ostatnia synchronizacja: {new Date(cloudUpdated).toLocaleString("pl-PL")}</small>}</div>{hasCloud&&<button className={styles.dangerButton} onClick={removeCloud}>Usuń zapis chmurowy</button>}</article>
      <article className={styles.accountCard}><header><ShieldCheck size={18}/><div><span>SECURITY</span><h2>Hasło i dostęp</h2></div></header><form onSubmit={changePassword}><label>Nowe hasło<input type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 8 znaków"/></label><button disabled={busy||password.length<8}><KeyRound size={15}/> Zmień hasło</button></form></article>
    </section>
  </main>
}
