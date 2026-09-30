"use client";
import { useEffect,useState } from "react";
import { Moon,Sun } from "lucide-react";
import styles from "../app/page.module.css";

type Theme="light"|"dark";
export default function ThemeToggle({compact=false}:{compact?:boolean}){
  const [theme,setTheme]=useState<Theme>("light");
  useEffect(()=>{setTheme((document.documentElement.dataset.theme as Theme)||"light")},[]);
  const toggle=()=>{const next=theme==="light"?"dark":"light";document.documentElement.dataset.theme=next;localStorage.setItem("airshow-theme",next);setTheme(next)};
  return <button type="button" className={compact?styles.themeCompact:styles.themeToggle} onClick={toggle} aria-label={theme==="light"?"Włącz tryb ciemny":"Włącz tryb jasny"} title={theme==="light"?"Tryb ciemny":"Tryb jasny"}>{theme==="light"?<Moon size={16}/>:<Sun size={16}/>} {!compact&&<span>{theme==="light"?"Ciemny":"Jasny"}</span>}</button>
}