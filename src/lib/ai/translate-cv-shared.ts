import type { LanguageCode } from "@/lib/cv-types";

export type SupportedLanguage = Exclude<LanguageCode, "en">;

export const SUPPORTED_LANGUAGES: {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  rtl: boolean;
}[] = [
  { code: "ur", name: "Urdu", nativeName: "اردو", rtl: true },
  { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  { code: "de", name: "German", nativeName: "Deutsch", rtl: false },
  { code: "es", name: "Spanish", nativeName: "Español", rtl: false },
  { code: "fr", name: "French", nativeName: "Français", rtl: false },
  { code: "it", name: "Italian", nativeName: "Italiano", rtl: false },
  { code: "pt", name: "Portuguese", nativeName: "Português", rtl: false },
  { code: "zh", name: "Mandarin Chinese", nativeName: "中文", rtl: false },
];

export const LANGUAGE_NAME: Record<SupportedLanguage, string> =
  Object.fromEntries(SUPPORTED_LANGUAGES.map((l) => [l.code, l.name])) as Record<
    SupportedLanguage,
    string
  >;

export type TranslatedCV = {
  basics: {
    role?: string;
    location?: string;
    summary?: string;
  };
  experience: Array<{
    role?: string;
    location?: string;
    bullets?: string[];
  }>;
  education: Array<{
    degree?: string;
    location?: string;
    notes?: string;
  }>;
  skills: string[];
  projects?: Array<{ description?: string }>;
  languages?: Array<{ name?: string; level?: string }>;
  awards?: Array<{ title?: string }>;
  certifications?: Array<{ name?: string }>;
  interests?: string[];
  sectionLabels: {
    profile: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    languages: string;
    awards: string;
    certifications: string;
    interests: string;
  };
};

export type TranslateCvResult =
  | {
      ok: true;
      translated: TranslatedCV;
      languageCode: SupportedLanguage;
      languageName: string;
    }
  | { ok: false; error: string };

export function isSupportedLanguage(v: unknown): v is SupportedLanguage {
  return typeof v === "string" && v in LANGUAGE_NAME;
}
