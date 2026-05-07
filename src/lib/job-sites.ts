/**
 * Cross-product helper that maps a CV's free-text location to a country
 * AlmiJob recognises, then fetches the matching job-site cards from
 * AlmiJob's public source-directory endpoint.
 *
 * Server-side only: fetchJobSitesForCountry runs from RSC / route
 * handlers, so we don't need CORS on the AlmiJob side.
 */

export type JobSite = {
  name: string;
  url: string;
  category: string;
  note: string;
  country?: string;
  region?: string;
};

const COUNTRY_PATTERNS: ReadonlyArray<{
  canonical: string;
  patterns: readonly RegExp[];
}> = [
  { canonical: "Iceland", patterns: [/\biceland\b/i] },
  { canonical: "Denmark", patterns: [/\bdenmark\b/i] },
  {
    canonical: "United States",
    patterns: [
      /\bunited states\b/i,
      /\busa\b/i,
      /(?:^|,\s*)us\s*$/i,
    ],
  },
  {
    canonical: "United Kingdom",
    patterns: [
      /\bunited kingdom\b/i,
      /\bbritain\b/i,
      /(?:^|,\s*)uk\s*$/i,
    ],
  },
  { canonical: "Pakistan", patterns: [/\bpakistan\b/i] },
];

export function extractCountry(
  location: string | null | undefined,
): string | undefined {
  if (!location) return undefined;
  const trimmed = location.trim();
  if (!trimmed) return undefined;
  for (const { canonical, patterns } of COUNTRY_PATTERNS) {
    if (patterns.some((p) => p.test(trimmed))) return canonical;
  }
  return undefined;
}

const ALMIJOB_BASE_URL =
  process.env.ALMIJOB_BASE_URL ?? "https://almijob.almiworld.com";
const FETCH_TIMEOUT_MS = 3000;
const REVALIDATE_SECONDS = 3600;

export async function fetchJobSitesForCountry(
  country: string | undefined,
): Promise<JobSite[]> {
  if (!country) return [];

  const url = `${ALMIJOB_BASE_URL}/api/source-directory?country=${encodeURIComponent(country)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: controller.signal,
    });
    if (!res.ok) {
      console.warn(
        `[job-sites] fetch failed: HTTP ${res.status} for country=${country}`,
      );
      return [];
    }
    const data = (await res.json()) as { sources?: unknown };
    if (!Array.isArray(data.sources)) return [];
    return data.sources as JobSite[];
  } catch (err) {
    console.warn(
      `[job-sites] fetch error for country=${country}:`,
      err instanceof Error ? err.message : err,
    );
    return [];
  } finally {
    clearTimeout(timer);
  }
}
