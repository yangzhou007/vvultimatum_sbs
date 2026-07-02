import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ANALYTICS_CONFIG } from "@/config/ads";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  other: ANALYTICS_CONFIG.googleAdsenseId
    ? {
        "google-adsense-account": ANALYTICS_CONFIG.googleAdsenseId,
      }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
