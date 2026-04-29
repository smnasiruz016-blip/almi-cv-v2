import type { Metadata } from "next";
import {
  Fraunces,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const playfairFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakartaFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const plexFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const sourceFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlmiCV — Beautiful CVs, Built Right",
  description:
    "Premium-grade resume templates, live editor, AI writing helper, and ATS scoring. Build a polished CV in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable} ${playfairFont.variable} ${jakartaFont.variable} ${plexFont.variable} ${sourceFont.variable}`}
    >
      <body className="min-h-screen bg-cream text-plum antialiased">
        {children}
      </body>
    </html>
  );
}
