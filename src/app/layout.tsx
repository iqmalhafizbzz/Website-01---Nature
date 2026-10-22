import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "@/components/arc/foundation.css";
import "./globals.css";

// Inter (variable) is the main face; a mono face carries Titan-style labels, buttons and figures.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://accounting-demo.primaxoft.com"),
  title: { default: "Halia & Co. | Tax & Accounting in Petaling Jaya", template: "%s | Halia & Co." },
  description: "Accounting, tax and payroll for small businesses in the Klang Valley, for one fixed monthly fee. A Primaxoft demo site.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

// Site pages get their header and footer from (site)/layout.tsx; the dev-only canvas at /canvas/ has none.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
