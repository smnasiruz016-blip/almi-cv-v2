// ============================================================================
// Google Fonts wiring for the 20-template engine.
//
// Each font here is loaded by next/font/google at build time (self-hosted).
// RR-400: preload is OFF for the 9 template-only faces. Preloading all 11 put
// ~700 KB of fonts ahead of the home hero and made mobile LCP 10 s. Inter and
// Fraunces keep preload: the site chrome uses them (the faces carry the plain
// family names). The @font-face rules still ship, so a template face
// downloads the moment a template or the editor uses it. The exported `variable`
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
//   Cormorant Garamond → ReligiousTraditional, RealEstateElegant, WellnessGolden (Batch 4)
//   Playfair Display → BeautyPortfolio, RealEstateElegant, WellnessGolden (Batch 4 fallback)
//   Amiri            → ReligiousTraditional (Arabic-friendly)
//   Plus Jakarta Sans → IceBlueGlass, AdminFluid, CyberEmerald, CloudLight (Batch 4)
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
  Plus_Jakarta_Sans,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true, // RR-400: the site chrome uses this face (same family name as public/fonts)
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
  preload: true, // RR-400: the site chrome uses this face (same family name as public/fonts)
});

// JetBrains Mono is a variable font — full weight axis loads in one file.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

// Space Grotesk is variable; covers 300-700 in a single face.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});

// DM Serif Display ships only at weight 400 on Google Fonts.
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

// Lora is variable; supports italic.
export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

// Crimson Pro is variable.
export const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

// Cormorant Garamond is NOT variable — pin weights actually used.
// Templates use 400/500/600/700 across regular + italic.
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

// Playfair Display is variable; supports italic.
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
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
  preload: false,
});

// Plus Jakarta Sans is variable; Batch 4 templates reference it by literal
// family name (e.g. fontFamily: '"Plus Jakarta Sans","Inter",sans-serif').
// Also loaded by cv-fonts.ts for editor pages, but mounted at the root here
// so the /templates gallery preview can use it too.
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
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
  plusJakartaSans.variable,
].join(" ");
