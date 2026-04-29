import type { Metadata } from "next";
import {
  Crimson_Pro,
  DM_Sans,
  DM_Serif_Display,
  Fraunces,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Lora,
  Manrope,
  Nunito_Sans,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Source_Sans_3,
  Work_Sans,
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

const crimsonFont = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

const manropeFont = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSerifFont = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dmserif",
  display: "swap",
});

const loraFont = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const dmSansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

const workSansFont = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  display: "swap",
});

const nunitoFont = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
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
      className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable} ${playfairFont.variable} ${jakartaFont.variable} ${plexFont.variable} ${sourceFont.variable} ${crimsonFont.variable} ${manropeFont.variable} ${dmSerifFont.variable} ${loraFont.variable} ${dmSansFont.variable} ${workSansFont.variable} ${nunitoFont.variable}`}
    >
      <body className="min-h-screen bg-cream text-plum antialiased">
        {children}
      </body>
    </html>
  );
}
