import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {title:"AirShow Manager — symulator organizacji pokazów lotniczych",description:"Zbuduj, zorganizuj i zrealizuj własny pokaz lotniczy. Profesjonalny symulator zarządzania AirShow."};
export const viewport: Viewport = {themeColor:[{media:"(prefers-color-scheme: light)",color:"#eef3f8"},{media:"(prefers-color-scheme: dark)",color:"#07111d"}],colorScheme:"light dark"};

const themeScript=`(()=>{try{const saved=localStorage.getItem("airshow-theme");document.documentElement.dataset.theme=saved==="light"?"light":"dark"}catch{document.documentElement.dataset.theme="dark"}})()`;

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pl" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body>{children}</body></html>}
