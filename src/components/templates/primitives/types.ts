import type { resolveStyle } from "@/lib/cv-themes";

export type ThemeColors = ReturnType<typeof resolveStyle>["theme"];
export type FontDef = { cssVar: string; fallback: string };

export type ContactKind =
  | "email"
  | "phone"
  | "location"
  | "website"
  | "linkedin";

export type ContactItem = { kind: ContactKind; value: string };
