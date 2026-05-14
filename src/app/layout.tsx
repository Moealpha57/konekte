import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { ThemeBootScript } from "@/components/AppControls";
import { MobileTabBar } from "@/components/MobileTabBar";
import { brand } from "@/lib/brand";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `${brand.name} — Trusted family help in Guinea`,
  description: brand.positioning,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeBootScript />
      </head>
      <body className={geistSans.className}>
        {children}
        <Suspense fallback={null}>
          <MobileTabBar />
        </Suspense>
      </body>
    </html>
  );
}
