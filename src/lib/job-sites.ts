/**
 * Cross-product helper that maps a CV's free-text location to an ISO
 * alpha-2 country code AlmiJob recognises, then fetches the matching
 * job-site cards from AlmiJob's deployed /api/sources endpoint.
 *
 * Server-side only: fetchJobSitesForCountry runs from RSC / route
 * handlers, so we don't need CORS on the AlmiJob side.
 */

export type JobSite = {
  name: string;
  url: string;
  category: string;
};

type CountryIso = "IS" | "DK" | "US" | "GB" | "PK";

const COUNTRY_PATTERNS: ReadonlyArray<{
  iso: CountryIso;
  patterns: readonly RegExp[];
}> = [
  { iso: "IS", patterns: [/\biceland\b/i] },
  { iso: "DK", patterns: [/\bdenmark\b/i] },
  {
    iso: "US",
    patterns: [/\bunited states\b/i, /\busa\b/i, /(?:^|,\s*)us\s*$/i],
  },
  {
    iso: "GB",
    patterns: [/\bunited kingdom\b/i, /\bbritain\b/i, /(?:^|,\s*)uk\s*$/i],
  },
  { iso: "PK", patterns: [/\bpakistan\b/i] },
];

export function extractCountry(
  location: string | null | undefined,
): CountryIso | undefined {
  if (!location) return undefined;
  const trimmed = location.trim();
  if (!trimmed) return undefined;
  for (const { iso, patterns } of COUNTRY_PATTERNS) {
    if (patterns.some((p) => p.test(trimmed))) return iso;
  }
  return undefined;
}

const ALMIJOB_BASE_URL =
  process.env.ALMIJOB_BASE_URL ?? "https://almijob.almiworld.com";
const FETCH_TIMEOUT_MS = 3000;
const REVALIDATE_SECONDS = 3600;

type RawSource = {
  website?: unknown;
  category?: unknown;
  fallbackUrl?: unknown;
};

function parseSources(data: unknown): JobSite[] | null {
  if (!data || typeof data !== "object") return null;
  const sources = (data as { sources?: unknown }).sources;
  if (!Array.isArray(sources)) return null;
  const out: JobSite[] = [];
  for (const raw of sources as RawSource[]) {
    if (
      typeof raw?.website !== "string" ||
      typeof raw?.fallbackUrl !== "string" ||
      typeof raw?.category !== "string"
    ) {
      return null;
    }
    out.push({
      name: raw.website,
      url: raw.fallbackUrl,
      category: raw.category,
    });
  }
  return out;
}

export async function fetchJobSitesForCountry(
  country: string | undefined,
): Promise<JobSite[]> {
  if (!country) return [];

  const url = `${ALMIJOB_BASE_URL}/api/sources?country=${encodeURIComponent(country)}`;
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
    const json = (await res.json()) as unknown;
    const sites = parseSources(json);
    if (sites === null) {
      console.warn(
        `[job-sites] response shape mismatch for country=${country}`,
      );
      return [];
    }
    return sites;
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
