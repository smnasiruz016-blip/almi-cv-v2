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
}

export interface TranslatedCV {
  basics: {
    fullName?: string;
    role?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    summary?: string;
    photoUrl?: string;
  };
  experience?: Array<{
    id?: string;
    company?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    bullets?: string[];
    achievements?: string[];
  }>;
  education?: Array<{
    id?: string;
    degree?: string;
    institution?: string;
    year?: string;
    gradYear?: string;
  }>;
  skills?: string[] | Array<{ name: string; level?: string }>;
  certifications?: string[] | Array<{ title?: string; name?: string }>;
  languages?: string[] | Array<{ language?: string; name?: string; fluency?: string; level?: string }>;
  labels?: SectionLabels;
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
