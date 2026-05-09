import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audit AI Gratuit — Clevs AI Agency",
  description:
    "Află în 2 minute cât pierde afacerea ta în fiecare lună fără să știi. Analiză personalizată gratuită + plan concret de acțiune.",
  openGraph: {
    title: "Audit AI Gratuit — Clevs AI Agency",
    description:
      "Află în 2 minute cât pierde afacerea ta în fiecare lună fără să știi.",
    type: "website",
    locale: "ro_RO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
