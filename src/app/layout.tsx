import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/components/arc/foundation.css";
import "./globals.css";

// Inter variable (no weight list means the variable font is served).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://accounting-demo.primaxoft.com"),
  title: { default: "Halia & Co. | Tax & Accounting in Petaling Jaya", template: "%s | Halia & Co." },
  description: "Accounting, tax and payroll for small businesses in the Klang Valley, for one fixed monthly fee. A Primaxoft demo site.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#fbfaf6" };

// Two design options share this root: option 1 in the (option-1) route group, option 2 under /option-2/.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY" data-accent="halia" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
