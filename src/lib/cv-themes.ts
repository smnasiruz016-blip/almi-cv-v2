import type { BodyFontKey, HeadingFontKey, ThemeKey } from "./cv-types";

export type ThemeColors = {
  primary: string;
  primarySoft: string;
  primaryText: string;
  text: string;
  textSoft: string;
  textFaint: string;
  accent: string;
  surface: string;
};

export const THEMES: Record<ThemeKey, { name: string; colors: ThemeColors }> = {
  plum: {
    name: "Plum",
    colors: {
      primary: "#2D1B3D",
      primarySoft: "#F5F1FA",
      primaryText: "#FFFBF5",
      text: "#2D1B3D",
      textSoft: "#6B5B7A",
      textFaint: "#9D8FAB",
      accent: "#5EEAD4",
      surface: "#FFFBF5",
    },
  },
  navy: {
    name: "Navy",
    colors: {
      primary: "#0F1B3D",
      primarySoft: "#EAEEF7",
      primaryText: "#F8FAFC",
      text: "#0F1B3D",
      textSoft: "#5B6788",
      textFaint: "#94A3B8",
      accent: "#5EEAD4",
      surface: "#F8FAFC",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      primary: "#1F4A2E",
      primarySoft: "#E8F2EC",
      primaryText: "#F8FAFC",
      text: "#1F4A2E",
      textSoft: "#3D6B4F",
      textFaint: "#7A9A87",
      accent: "#D4A24C",
      surface: "#F8FAFC",
    },
  },
  wine: {
    name: "Wine",
    colors: {
      primary: "#5C1F2E",
      primarySoft: "#F2E8EC",
      primaryText: "#FFFBF5",
      text: "#3B1620",
      textSoft: "#7A4555",
      textFaint: "#A88A91",
      accent: "#D4A24C",
      surface: "#FFFBF5",
    },
  },
  charcoal: {
    name: "Charcoal",
    colors: {
      primary: "#1F2329",
      primarySoft: "#EDEFF2",
      primaryText: "#F8FAFC",
      text: "#1F2329",
      textSoft: "#5A6470",
      textFaint: "#94A3B8",
      accent: "#D4A24C",
      surface: "#F8FAFC",
    },
  },
  coral: {
    name: "Coral",
    colors: {
      primary: "#B84A3B",
      primarySoft: "#FFE8E3",
      primaryText: "#FFFBF5",
      text: "#3B1F1B",
      textSoft: "#8A4F47",
      textFaint: "#B89B95",
      accent: "#5EEAD4",
      surface: "#FFFBF5",
    },
  },
};

export const HEADING_FONTS: Record<
  HeadingFontKey,
  { name: string; cssVar: string; fallback: string }
> = {
  fraunces: {
    name: "Fraunces",
    cssVar: "var(--font-fraunces)",
    fallback: "Georgia, serif",
  },
  playfair: {
    name: "Playfair Display",
    cssVar: "var(--font-playfair)",
    fallback: "Georgia, serif",
  },
  inter: {
    name: "Inter",
    cssVar: "var(--font-inter)",
    fallback: "system-ui, sans-serif",
  },
  jakarta: {
    name: "Plus Jakarta Sans",
    cssVar: "var(--font-jakarta)",
    fallback: "system-ui, sans-serif",
  },
};

export const BODY_FONTS: Record<
  BodyFontKey,
  { name: string; cssVar: string; fallback: string }
> = {
  inter: {
    name: "Inter",
    cssVar: "var(--font-inter)",
    fallback: "system-ui, sans-serif",
  },
  plex: {
    name: "IBM Plex Sans",
    cssVar: "var(--font-plex)",
    fallback: "system-ui, sans-serif",
  },
  source: {
    name: "Source Sans 3",
    cssVar: "var(--font-source)",
    fallback: "system-ui, sans-serif",
  },
};

export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function resolveStyle(style?: {
  themeKey?: ThemeKey;
  headingFont?: HeadingFontKey;
  bodyFont?: BodyFontKey;
  density?: "comfortable" | "compact";
}) {
  const themeKey = style?.themeKey ?? "plum";
  return {
    theme: THEMES[themeKey].colors,
    themeName: THEMES[themeKey].name,
    headingFont: HEADING_FONTS[style?.headingFont ?? "fraunces"],
    bodyFont: BODY_FONTS[style?.bodyFont ?? "inter"],
    density: style?.density ?? "comfortable",
  };
}
