export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "zh", name: "Mandarin Chinese", nativeName: "中文" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const LANGUAGE_NAME: Record<SupportedLanguage, string> = {
  en: "English",
  ur: "Urdu (اردو)",
  ar: "Arabic (العربية)",
  es: "Spanish (Español)",
  fr: "French (Français)",
  de: "German (Deutsch)",
  it: "Italian (Italiano)",
  pt: "Portuguese (Português)",
  zh: "Mandarin Chinese (中文)",
};

export const RTL_LANGUAGES: ReadonlyArray<SupportedLanguage> = ["ur", "ar"];

export function isRTL(lang: SupportedLanguage): boolean {
  return RTL_LANGUAGES.includes(lang);
}

export function isSupportedLanguage(code: string): code is SupportedLanguage {
  return SUPPORTED_LANGUAGES.some((l) => l.code === code);
}

export function getLanguageName(code: SupportedLanguage): string {
  return LANGUAGE_NAME[code] || code;
}

export interface SectionLabels {
  summary?: string;
  experience?: string;
  workExperience?: string;
  education?: string;
  skills?: string;
  competencies?: string;
  contact?: string;
  certifications?: string;
  languages?: string;
  projects?: string;
  awards?: string;
  [key: string]: any;
}

export interface TranslatedCV {
  basics: any;
  experience: any[];
  education?: any[];
  skills?: any[];
  certifications?: any[];
  languages?: any[];
  labels?: SectionLabels;
  [key: string]: any;
}

export type TranslateCvResult =
  | {
      ok: true;
      translated: TranslatedCV;
      languageCode: SupportedLanguage;
      languageName: string;
    }
  | {
      ok: false;
      error: string;
    };
