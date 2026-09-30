import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {title:"AirShow Manager — symulator organizacji pokazów lotniczych",description:"Zbuduj, zorganizuj i zrealizuj własny pokaz lotniczy. Profesjonalny symulator zarządzania AirShow."};
export const viewport: Viewport = {themeColor:[{media:"(prefers-color-scheme: light)",color:"#f4f6f8"},{media:"(prefers-color-scheme: dark)",color:"#0c1116"}],colorScheme:"light dark"};

const themeScript=`(()=>{try{const saved=localStorage.getItem("airshow-theme");document.documentElement.dataset.theme=saved==="dark"?"dark":"light"}catch{document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pl" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body>{children}</body></html>}
