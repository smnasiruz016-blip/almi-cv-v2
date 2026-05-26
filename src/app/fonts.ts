// ============================================================================
// Google Fonts wiring for the 20-template engine.
//
// Each font here is loaded by next/font/google at build time (self-hosted +
// preloaded; no FOIT/FOUT on the public network). The exported `variable`
// strings get mounted on <html> in src/app/layout.tsx — templates reference
// the fonts by literal family name in inline styles (e.g. fontFamily:
// '"JetBrains Mono", monospace'), but loading them here guarantees the
// font face is available document-wide.
//
// Per HANDOFF Section 6:
//   Inter, Fraunces                                      → existing (Batch 1)
//   JetBrains Mono   → TechMinimal, CyberGrid, ManufacturingPrecise
//   Space Grotesk    → CyberGrid
//   DM Serif Display → CreativeDirector, CreativePortfolio
//   Lora             → Healthcare
//   Crimson Pro      → Academic
//   Cormorant Garamond → ReligiousTraditional, RealEstateElegant
//   Playfair Display → BeautyPortfolio, RealEstateElegant
//   Amiri            → ReligiousTraditional (Arabic-friendly)
// ============================================================================

import {
  Inter,
  Fraunces,
  JetBrains_Mono,
  Space_Grotesk,
  DM_Serif_Display,
  Lora,
  Crimson_Pro,
  Cormorant_Garamond,
  Playfair_Display,
  Amiri,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

// JetBrains Mono is a variable font — full weight axis loads in one file.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Space Grotesk is variable; covers 300-700 in a single face.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// DM Serif Display ships only at weight 400 on Google Fonts.
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Lora is variable; supports italic.
export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
  display: "swap",
});

// Crimson Pro is variable.
export const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  style: ["normal", "italic"],
  display: "swap",
});

// Cormorant Garamond is NOT variable — pin weights actually used.
// Templates use 400/500/600/700 across regular + italic.
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Playfair Display is variable; supports italic.
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  style: ["normal", "italic"],
  display: "swap",
});

// Amiri is Arabic-first; load both arabic + latin subsets so the same
// face works for the ReligiousTraditional template across the alphabet
// the user actually types. Not variable — 400 + 700 covers our needs.
export const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Convenience — concatenates every font's CSS variable class so the
 *  root <html> can mount all of them in one expression. */
export const allFontVariables = [
  inter.variable,
  fraunces.variable,
  jetbrainsMono.variable,
  spaceGrotesk.variable,
  dmSerifDisplay.variable,
  lora.variable,
  crimsonPro.variable,
  cormorantGaramond.variable,
  playfairDisplay.variable,
  amiri.variable,
].join(" ");
