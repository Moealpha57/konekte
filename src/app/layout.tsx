import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeBootScript } from "@/components/AppControls";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Konekte — Services de confiance à Conakry",
  description: "Konekte aide les familles à trouver des tuteurs fiables aujourd’hui, puis des services locaux vérifiés demain.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeBootScript />
      </head>
      <body className={geistSans.className}>{children}</body>
    </html>
  );
}
