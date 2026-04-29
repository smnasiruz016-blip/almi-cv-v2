import type { CSSProperties } from "react";
import type {
  AccentKey,
  BodyFontKey,
  DensityKey,
  HeadingFontKey,
  PhotoStyleKey,
  SectionStyleKey,
  ThemeKey,
} from "./cv-types";

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

export type ThemeCategory = "dark" | "light";

export const THEMES: Record<
  ThemeKey,
  { name: string; category: ThemeCategory; colors: ThemeColors }
> = {
  plum: {
    name: "Plum",
    category: "dark",
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
    category: "dark",
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
    category: "dark",
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
    category: "dark",
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
    category: "dark",
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
    category: "dark",
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
  sky: {
    name: "Sky",
    category: "dark",
    colors: {
      primary: "#1E3A5F",
      primarySoft: "#E8F0FA",
      primaryText: "#F8FAFC",
      text: "#1E3A5F",
      textSoft: "#5A7A9A",
      textFaint: "#94B0C8",
      accent: "#5EEAD4",
      surface: "#F8FAFC",
    },
  },
  slate: {
    name: "Slate",
    category: "dark",
    colors: {
      primary: "#3B4252",
      primarySoft: "#ECEEF2",
      primaryText: "#F8FAFC",
      text: "#2E3440",
      textSoft: "#5C6677",
      textFaint: "#9DA4B0",
      accent: "#D4A24C",
      surface: "#F8FAFC",
    },
  },
  terracotta: {
    name: "Terracotta",
    category: "dark",
    colors: {
      primary: "#A0522D",
      primarySoft: "#FCEAE0",
      primaryText: "#FFFBF5",
      text: "#3B1F0F",
      textSoft: "#7A4F3A",
      textFaint: "#B89580",
      accent: "#5EEAD4",
      surface: "#FFFBF5",
    },
  },
  midnight: {
    name: "Midnight",
    category: "dark",
    colors: {
      primary: "#0A0E1F",
      primarySoft: "#E5E7EE",
      primaryText: "#F8FAFC",
      text: "#0A0E1F",
      textSoft: "#4A5060",
      textFaint: "#8A92A0",
      accent: "#5EEAD4",
      surface: "#F8FAFC",
    },
  },
  ivory: {
    name: "Ivory",
    category: "light",
    colors: {
      primary: "#FFFBF5",
      primarySoft: "#FFF1E3",
      primaryText: "#3B2A1F",
      text: "#3B2A1F",
      textSoft: "#7A6A55",
      textFaint: "#A89880",
      accent: "#D4A24C",
      surface: "#FFFBF5",
    },
  },
  linen: {
    name: "Linen",
    category: "light",
    colors: {
      primary: "#F5F0E8",
      primarySoft: "#F0F8F3",
      primaryText: "#2D3D2E",
      text: "#2D3D2E",
      textSoft: "#5A6F5C",
      textFaint: "#8FA092",
      accent: "#A8D5BA",
      surface: "#FFFFFF",
    },
  },
  pearl: {
    name: "Pearl",
    category: "light",
    colors: {
      primary: "#F8F4FF",
      primarySoft: "#EDE5FA",
      primaryText: "#2D1B3D",
      text: "#2D1B3D",
      textSoft: "#6B5B7A",
      textFaint: "#9D8FAB",
      accent: "#C9B8E8",
      surface: "#FFFFFF",
    },
  },
  sand: {
    name: "Sand",
    category: "light",
    colors: {
      primary: "#F0E5D5",
      primarySoft: "#FFE8D6",
      primaryText: "#3B2A1F",
      text: "#3B2A1F",
      textSoft: "#7A6045",
      textFaint: "#B89580",
      accent: "#FF7A6B",
      surface: "#FFFFFF",
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
  crimson: {
    name: "Crimson Pro",
    cssVar: "var(--font-crimson)",
    fallback: "Georgia, serif",
  },
  manrope: {
    name: "Manrope",
    cssVar: "var(--font-manrope)",
    fallback: "system-ui, sans-serif",
  },
  dmserif: {
    name: "DM Serif Display",
    cssVar: "var(--font-dmserif)",
    fallback: "Georgia, serif",
  },
  lora: {
    name: "Lora",
    cssVar: "var(--font-lora)",
    fallback: "Georgia, serif",
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
  dmsans: {
    name: "DM Sans",
    cssVar: "var(--font-dmsans)",
    fallback: "system-ui, sans-serif",
  },
  worksans: {
    name: "Work Sans",
    cssVar: "var(--font-worksans)",
    fallback: "system-ui, sans-serif",
  },
  nunito: {
    name: "Nunito Sans",
    cssVar: "var(--font-nunito)",
    fallback: "system-ui, sans-serif",
  },
};

export const ACCENTS: Record<AccentKey, { name: string; color: string }> = {
  mint: { name: "Mint", color: "#5EEAD4" },
  gold: { name: "Gold", color: "#D4A24C" },
  coral: { name: "Coral", color: "#FF7A6B" },
  lavender: { name: "Lavender", color: "#C9B8E8" },
  sage: { name: "Sage", color: "#A8D5BA" },
  sky: { name: "Sky", color: "#7DB3D8" },
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
  accent?: AccentKey;
  sectionStyle?: SectionStyleKey;
  photoStyle?: PhotoStyleKey;
  density?: DensityKey;
}) {
  const themeKey = style?.themeKey ?? "plum";
  const baseTheme = THEMES[themeKey];
  const accentColor = style?.accent
    ? ACCENTS[style.accent].color
    : baseTheme.colors.accent;

  return {
    theme: { ...baseTheme.colors, accent: accentColor },
    themeName: baseTheme.name,
    themeCategory: baseTheme.category,
    headingFont: HEADING_FONTS[style?.headingFont ?? "fraunces"],
    bodyFont: BODY_FONTS[style?.bodyFont ?? "inter"],
    density: (style?.density ?? "comfortable") as DensityKey,
    sectionStyle: (style?.sectionStyle ?? "uppercase") as SectionStyleKey,
    photoStyle: (style?.photoStyle ?? "round") as PhotoStyleKey,
  };
}

export function formatSectionTitle(
  title: string,
  sectionStyle: SectionStyleKey,
): string {
  if (sectionStyle === "uppercase") return title.toUpperCase();
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
}

export function sectionVariantStyle(
  sectionStyle: SectionStyleKey,
  theme: ThemeColors,
): CSSProperties {
  switch (sectionStyle) {
    case "titlecase":
      return {
        letterSpacing: "normal",
        textTransform: "none",
        fontSize: "13px",
      };
    case "underlined":
      return {
        letterSpacing: "normal",
        textTransform: "none",
        fontSize: "13px",
        borderBottom: `1px solid ${withAlpha(theme.text, 0.3)}`,
        paddingBottom: "4px",
        display: "inline-block",
      };
    case "boxed":
      return {
        letterSpacing: "normal",
        textTransform: "none",
        backgroundColor: theme.primarySoft,
        padding: "4px 10px",
        borderRadius: "9999px",
        display: "inline-block",
      };
    case "uppercase":
    default:
      return {};
  }
}
