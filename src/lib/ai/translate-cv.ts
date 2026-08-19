import { requireAIAccess } from "@/lib/ai/access";
import type { CVData } from "@/lib/cv-types";
import {
  LANGUAGE_NAME,
  isSupportedLanguage,
  type TranslateCvResult,
  type TranslatedCV,
  type SupportedLanguage,
} from "@/lib/ai/translate-cv-shared";

// Server action or API helper to translate CV using OpenAI/Anthropic/Gemini
export async function translateCv(params: {
  cvId: string;
  targetLanguage: string;
}): Promise<TranslateCvResult> {
  const { cvId, targetLanguage } = params;

  if (!isSupportedLanguage(targetLanguage)) {
    return { ok: false, error: "Unsupported target language" };
  }

  try {
    const res = await fetch("/api/ai/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cvId, targetLanguage }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, error: err.error || "Translation failed" };
    }

    const data = await res.json();
    return {
      ok: true,
      translated: data.translated,
      languageCode: targetLanguage as SupportedLanguage,
      languageName: LANGUAGE_NAME[targetLanguage as SupportedLanguage],
    };
  } catch (error: any) {
    return { ok: false, error: error.message || "Failed to translate CV" };
  }
}
