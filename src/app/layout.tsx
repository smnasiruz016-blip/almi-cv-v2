import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlmiCV — Beautiful CVs, Built Right",
  description:
    "Premium-grade resume templates, live editor, AI writing helper, and ATS scoring. Build a polished CV in minutes.",
  openGraph: {
    title: "AlmiCV — Beautiful CVs, Built Right",
    description: "Honest career toolkit. $10 once. Forever.",
    siteName: "AlmiCV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlmiCV — Beautiful CVs, Built Right",
    description: "Honest career toolkit. $10 once. Forever.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${displayFont.variable}`}>
      <body className="min-h-screen bg-cream text-plum antialiased">
        {children}
      </body>
    </html>
  );
}
