/**
 * RichText is an HTML-string alias. Stored as a string so existing code paths
 * keep working; the alias signals that the value may contain inline tags
 * (<strong>, <em>, <u>, <br>, <p>) and must be passed through sanitizeRichText
 * before rendering. Use stripRichText for plain-text fallbacks.
 */
export type RichText = string;

export type CVData = {
  basics: {
    fullName: string;
    role: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedIn?: string;
    photoUrl?: string;
    summary?: RichText;
  };
  experience: Array<{
    company: string;
    role: string;
    location?: string;
    startDate: string;
    endDate?: string;
    // Optional convenience flag used by some templates to render "Present"
    // without relying on `endDate`. Existing data without this field reads as
    // undefined and falls through to the prior endDate-based behavior.
    current?: boolean;
    bullets: RichText[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    location?: string;
    startDate: string;
    endDate: string;
    notes?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    url?: string;
  }>;
  languages?: Array<{
    name: string;
    level: string;
  }>;
  awards?: Array<{
    title: string;
    issuer?: string;
    year: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer?: string;
    year?: string;
  }>;
  interests?: string[];
  // Flowing-prose summary of measurable wins. Stored as RichText so inline
  // <strong>/<em> emphasis works. Additive optional field; templates that
  // don't render it are unaffected. First consumer: Dark Bold Marketing.
  achievements?: RichText;
  style?: {
    themeKey?: ThemeKey;
    headingFont?: HeadingFontKey;
    bodyFont?: BodyFontKey;
    accent?: AccentKey;
    sectionStyle?: SectionStyleKey;
    photoStyle?: PhotoStyleKey;
    density?: DensityKey;
  };
  // Translated CV metadata. Set by the AI translator; absent on
  // English/original CVs.
  language?: LanguageCode;
  // Translated section labels. Templates read these with English fallback,
  // so existing CVs without sectionLabels render unchanged.
  sectionLabels?: SectionLabels;
};

export type LanguageCode =
  | "en"
  | "ur"
  | "ar"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "pt"
  | "zh";

export type SectionLabels = {
  profile?: string;
  experience?: string;
  education?: string;
  skills?: string;
  projects?: string;
  languages?: string;
  awards?: string;
  certifications?: string;
  interests?: string;
};

export type ThemeKey =
  | "plum"
  | "navy"
  | "forest"
  | "wine"
  | "charcoal"
  | "coral"
  | "sky"
  | "slate"
  | "terracotta"
  | "midnight"
  | "ivory"
  | "linen"
  | "pearl"
  | "sand";
export type HeadingFontKey =
  | "fraunces"
  | "playfair"
  | "inter"
  | "jakarta"
  | "crimson"
  | "manrope"
  | "dmserif"
  | "lora";

export type BodyFontKey =
  | "inter"
  | "plex"
  | "source"
  | "dmsans"
  | "worksans"
  | "nunito";

export type AccentKey = "mint" | "gold" | "coral" | "lavender" | "sage" | "sky";
export type SectionStyleKey = "uppercase" | "titlecase" | "underlined" | "boxed";
export type PhotoStyleKey = "round" | "square" | "none";
export type DensityKey = "spacious" | "comfortable" | "compact";
