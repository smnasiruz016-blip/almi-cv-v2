import { stripRichText } from "@/lib/rich-text";
import type { CVData } from "@/lib/cv-types";
import type { TailorProposal } from "@/lib/ai/tailor-cv";

export type AcceptedSections = {
  summary: boolean;
  experience: boolean;
  skills: boolean;
};

export type ATSSubscores = {
  keywords: number;
  actionVerbs: number;
  format: number;
  length: number;
};

export type ATSScore = {
  total: number;
  subscores: ATSSubscores;
  tip: string;
  missingKeywords: string[];
};

const WEIGHTS = {
  keywords: 0.4,
  actionVerbs: 0.25,
  format: 0.2,
  length: 0.15,
} as const;

const STOPWORDS = new Set<string>([
  "a", "about", "above", "after", "again", "against", "all", "also", "am",
  "an", "and", "any", "are", "as", "at", "be", "because", "been", "before",
  "being", "below", "between", "both", "but", "by", "can", "could", "did",
  "do", "does", "doing", "done", "down", "during", "each", "even", "every",
  "few", "for", "from", "further", "had", "has", "have", "having", "he",
  "her", "here", "hers", "herself", "him", "himself", "his", "how", "i",
  "if", "in", "into", "is", "it", "its", "itself", "just", "many", "may",
  "me", "might", "more", "most", "much", "must", "my", "myself", "no",
  "nor", "not", "now", "of", "off", "on", "once", "only", "or", "other",
  "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should",
  "so", "some", "such", "than", "that", "the", "their", "theirs", "them",
  "themselves", "then", "there", "these", "they", "this", "those", "through",
  "to", "too", "under", "until", "up", "us", "very", "was", "we", "were",
  "what", "when", "where", "which", "while", "who", "whom", "why", "will",
  "with", "would", "you", "your", "yours", "yourself", "ourselves", "able",
  "across", "around", "based", "best", "ever", "etc", "via", "yet",
]);

const ACTION_VERBS = new Set<string>([
  "led", "drove", "built", "shipped", "owned", "designed", "architected",
  "launched", "delivered", "created", "developed", "managed", "spearheaded",
  "directed", "established", "implemented", "improved", "increased",
  "reduced", "optimized", "streamlined", "automated", "engineered",
  "pioneered", "initiated", "executed", "mentored", "coached", "coordinated",
  "collaborated", "negotiated", "facilitated", "generated", "grew", "scaled",
  "transformed", "modernized", "rebuilt", "revamped", "redesigned",
  "researched", "analyzed", "resolved", "configured", "deployed",
  "identified", "orchestrated", "partnered", "presented", "produced",
  "promoted", "published", "recommended", "restructured", "reviewed",
  "saved", "secured", "supervised", "trained", "won", "authored", "drafted",
  "negotiated", "championed", "ran", "headed", "founded",
]);

const TOKEN_RE = /[a-z][a-z0-9+.#/-]*/g;

function tokenizeSignificant(text: string): string[] {
  const out: string[] = [];
  for (const match of text.toLowerCase().matchAll(TOKEN_RE)) {
    const word = match[0];
    if (word.length < 4) continue;
    if (STOPWORDS.has(word)) continue;
    out.push(word);
  }
  return out;
}

function uniqueTokens(text: string): Set<string> {
  return new Set(tokenizeSignificant(text));
}

function firstWord(s: string): string {
  const m = s.trim().match(/^[A-Za-z][A-Za-z'-]*/);
  return m ? m[0].toLowerCase() : "";
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

/**
 * Build the effective CV that would result from applying the accepted
 * sections of the tailored proposal. This is what we score against the JD —
 * mirrors the merge logic in applyTailor.
 */
function effectiveCV(
  cv: CVData,
  tailored: TailorProposal,
  accepted: AcceptedSections,
): {
  summary: string;
  bullets: string[];
  skills: string[];
} {
  const summary = accepted.summary
    ? tailored.summary
    : stripRichText(cv.basics?.summary ?? "");

  const experience = cv.experience ?? [];
  const bullets: string[] = [];
  experience.forEach((entry, idx) => {
    if (
      accepted.experience &&
      tailored.experienceBullets[idx]?.bullets
    ) {
      bullets.push(...tailored.experienceBullets[idx].bullets);
    } else {
      for (const b of entry.bullets ?? []) {
        bullets.push(stripRichText(b));
      }
    }
  });

  const skills = accepted.skills
    ? tailored.skillsOrder
    : cv.skills ?? [];

  return { summary, bullets, skills };
}

function scoreKeywords(
  jdTokens: Set<string>,
  cvText: string,
): { score: number; missing: string[] } {
  if (jdTokens.size === 0) return { score: 100, missing: [] };
  const cvTokens = uniqueTokens(cvText);
  let overlap = 0;
  const missing: string[] = [];
  for (const w of jdTokens) {
    if (cvTokens.has(w)) overlap++;
    else missing.push(w);
  }
  const score = Math.round((overlap / jdTokens.size) * 100);
  return { score: clamp(score), missing };
}

function scoreActionVerbs(bullets: string[]): number {
  if (bullets.length === 0) return 70;
  let strong = 0;
  for (const b of bullets) {
    if (ACTION_VERBS.has(firstWord(b))) strong++;
  }
  return clamp(Math.round((strong / bullets.length) * 100));
}

function scoreFormat(experienceCount: number): number {
  return experienceCount === 0 ? 60 : 90;
}

function scoreLength(wordCount: number): number {
  if (wordCount < 300) return 60;
  if (wordCount <= 700) return 100;
  if (wordCount <= 1200) return 90;
  return 70;
}

function generateTip(
  subscores: ATSSubscores,
  missing: string[],
): string {
  const entries = Object.entries(subscores) as [
    keyof ATSSubscores,
    number,
  ][];
  entries.sort((a, b) => a[1] - b[1]);
  const [lowestKey, lowestValue] = entries[0];

  if (lowestValue >= 88) {
    return "Your CV is strongly aligned with this job — apply with confidence.";
  }

  switch (lowestKey) {
    case "keywords": {
      const top = missing.slice(0, 3);
      if (top.length === 0) {
        return "Add more JD-specific terms to your Skills and Experience.";
      }
      const list = top.map((w) => `'${w}'`).join(", ");
      return `Add ${list} from the JD to your Skills or Experience.`;
    }
    case "actionVerbs":
      return "Start more bullets with action verbs (Led, Drove, Built…).";
    case "length":
      if (lowestValue === 60) {
        return "Your CV is short — add more detail to Experience.";
      }
      return "Tighten your CV — aim for 300–700 words of focused content.";
    case "format":
      return "Add at least one Experience entry to round out your CV.";
    default:
      return "Add more JD-specific detail to your Experience and Skills.";
  }
}

export function computeATSScore(input: {
  cvData: CVData;
  jobDescription: string;
  tailored: TailorProposal;
  accepted: AcceptedSections;
}): ATSScore {
  const { cvData, jobDescription, tailored, accepted } = input;

  const eff = effectiveCV(cvData, tailored, accepted);
  const cvText = [eff.summary, ...eff.bullets, ...eff.skills].join(" ");
  const jdTokens = uniqueTokens(jobDescription);

  const { score: keywords, missing } = scoreKeywords(jdTokens, cvText);
  const actionVerbs = scoreActionVerbs(eff.bullets);
  const format = scoreFormat((cvData.experience ?? []).length);
  const wordCount = cvText
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const length = scoreLength(wordCount);

  const total = Math.round(
    keywords * WEIGHTS.keywords +
      actionVerbs * WEIGHTS.actionVerbs +
      format * WEIGHTS.format +
      length * WEIGHTS.length,
  );

  const subscores: ATSSubscores = { keywords, actionVerbs, format, length };
  const tip = generateTip(subscores, missing);

  return {
    total: clamp(total),
    subscores,
    tip,
    missingKeywords: missing,
  };
}
