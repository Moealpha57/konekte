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
  description: "Konekte aide les clients à trouver des prestataires locaux vérifiés à Conakry.",
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
