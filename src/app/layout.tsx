import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {title:"AirShow Manager — symulator organizacji pokazów lotniczych",description:"Zbuduj, zorganizuj i zrealizuj własny pokaz lotniczy. Profesjonalny symulator zarządzania AirShow."};
export const viewport: Viewport = {themeColor:"#0a0d0f",colorScheme:"dark"};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pl"><body>{children}</body></html>}
