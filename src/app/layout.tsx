import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "AirShow Manager", description: "Build, organize and deliver your own airshow." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}
