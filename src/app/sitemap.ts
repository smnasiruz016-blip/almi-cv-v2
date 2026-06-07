/**
 * Chunked sitemap with async-id pattern from day one.
 *
 * Coverage:
 *   - Chunk 0: statics (7) + 23 templates + N /templates/role/[slug]
 *     hubs (one per role with active TemplateImage rows, ~61 today)
 *     + 196 /jobs/[country] + 193 cv-guide country hubs = ~480 URLs
 *   - Chunks 1..N: 263 × 193 = 50,759 /cv-guide/[country]/[role] URLs,
 *     split into 25,000-URL chunks (3 chunks at current scale)
 *
 * Total ≈ 51,178 URLs. Past Google's 50k-per-sitemap cap, so chunking
 * is mandatory.
 *
 * CRITICAL — `id: Promise<string>` + `await id` per
 * almijob-v2/docs/SITEMAP_CHUNKING_FUTURE.md. Without the await the
 * chunks render as empty <urlset></urlset> bodies — that bug ate
 * 4 AlmiJob PRs (#26-#29).
 *
 * Test discipline: NEVER smoke via `npx tsx`. Use `npm run build &&
 * npx next start && curl /sitemap/N.xml`.
 */

import type { MetadataRoute } from "next";
import { COUNTRY_LANDING } from "@/lib/country-landing";
import { COUNTRIES_SERVED } from "@/lib/countries";
import { JOB_ROLES } from "@/lib/roles";

const SITE_ORIGIN = "https://almicv.almiworld.com";
const CHUNK = 25000;

const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/templates", changeFrequency: "weekly", priority: 0.9 },
  { path: "/resume-score", changeFrequency: "monthly", priority: 0.7 },
  // /login and /signup are noindex (auth route group) — excluded from sitemap.
  { path: "/cv-guide", changeFrequency: "weekly", priority: 0.9 },
];

const TOTAL_CV_GUIDE = COUNTRIES_SERVED.length * JOB_ROLES.length;
const NUM_CV_CHUNKS = Math.ceil(TOTAL_CV_GUIDE / CHUNK);

let _allCvGuideCache: MetadataRoute.Sitemap | null = null;

function buildAllCvGuideUrls(): MetadataRoute.Sitemap {
  if (_allCvGuideCache) return _allCvGuideCache;
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];
  for (const c of COUNTRIES_SERVED) {
    for (const r of JOB_ROLES) {
      out.push({
        url: `${SITE_ORIGIN}/cv-guide/${c.slug}/${r.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }
  _allCvGuideCache = out;
  return out;
}

export async function generateSitemaps() {
  // Chunk 0 = statics + templates + jobs + cv-guide country hubs.
  // Chunks 1..NUM_CV_CHUNKS = cv-guide role-country grid URLs.
  return Array.from({ length: 1 + NUM_CV_CHUNKS }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  // NOTE: `id` is a Promise in Next 16. Number(id) without await returns NaN.
  // This is the bug documented in almijob-v2/docs/SITEMAP_CHUNKING_FUTURE.md.
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const n = Number(await id);
  const now = new Date();

  if (n === 0) {
    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
      url: `${SITE_ORIGIN}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    }));

    // /templates/[slug] detail pages were removed in PR #53 with the
    // Recipe system; the /templates gallery now indexes TemplateImage
    // role hubs only. No per-template detail URL exists to advertise.
    const templateEntries: MetadataRoute.Sitemap = [];

    // /templates/role/[roleSlug] hubs — PNG sunset moved the source of
    // truth from "roles with TemplateImage rows" (max 61 historical) to
    // "every JOB_ROLES entry" (263). Each hub now renders a live React
    // preview via suggestTemplate() with classic-serif fallback, so the
    // old "no thin content" guard isn't needed — every URL has a real
    // A4 preview + role-tailored copy + CTA.
    const roleHubEntries: MetadataRoute.Sitemap = JOB_ROLES.map((r) => ({
      url: `${SITE_ORIGIN}/templates/role/${r.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // Existing /jobs/[country] SEO (196 countries — preserved).
    const jobsEntries: MetadataRoute.Sitemap = COUNTRY_LANDING.map((c) => ({
      url: `${SITE_ORIGIN}/jobs/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // New /cv-guide/[country] hubs (193 — excludes the 6 hub-only).
    const cvCountryHubs: MetadataRoute.Sitemap = COUNTRIES_SERVED.map((c) => ({
      url: `${SITE_ORIGIN}/cv-guide/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [
      ...staticEntries,
      ...templateEntries,
      ...roleHubEntries,
      ...jobsEntries,
      ...cvCountryHubs,
    ];
  }

  const all = buildAllCvGuideUrls();
  const start = (n - 1) * CHUNK;
  return all.slice(start, start + CHUNK);
}
