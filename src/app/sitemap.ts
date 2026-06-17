/**
 * Chunked sitemap route (kept at /sitemap/[id].xml, fronted by the manual
 * /sitemap-index.xml handler; /sitemap.xml is reserved per
 * almijob-v2/docs/SITEMAP_CHUNKING_FUTURE.md).
 *
 * Canonical surface = chunk 0 only: statics + /templates/role/[slug] role
 * hubs (JOB_ROLES) + 196 /jobs/[country] + 193 /cv-guide/[country] hubs
 * (~650 URLs).
 *
 * The /cv-guide/[country]/[role] grid (COUNTRIES_SERVED × JOB_ROLES ≈ 50,759)
 * is DELIBERATELY excluded: the role dimension is a name token over
 * country-level convention data, so those pages are thin near-duplicates that
 * canonicalise up to /cv-guide/[country] (see that page's generateMetadata).
 * Listing them would dilute crawl budget. The pages still render for users.
 *
 * Now well under Google's 50k cap, so chunk 0 alone suffices. The chunked
 * routing + async-id signature are retained so the /sitemap-index.xml ->
 * /sitemap/0.xml URL shape is unchanged and restoring the grid later is a
 * small change (builder kept in git history).
 *
 * CRITICAL — `id: Promise<string>` + `await id` per SITEMAP_CHUNKING_FUTURE.md.
 * Test discipline: NEVER smoke via `npx tsx`. Use `npx next start && curl
 * /sitemap/0.xml`.
 */

import type { MetadataRoute } from "next";
import { COUNTRY_LANDING } from "@/lib/country-landing";
import { COUNTRIES_SERVED } from "@/lib/countries";
import { JOB_ROLES } from "@/lib/roles";
import { CV_ORIGINS, CV_ORIGIN_DESTINATIONS } from "@/lib/cv-origin-localization";

const SITE_ORIGIN = "https://almicv.almiworld.com";

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

export async function generateSitemaps() {
  // Single chunk — the canonical surface (~650 URLs) fits well within one.
  return [{ id: 0 }];
}

export default async function sitemap({
  id,
}: {
  // NOTE: `id` is a Promise in Next 16. Number(id) without await returns NaN.
  // This is the bug documented in almijob-v2/docs/SITEMAP_CHUNKING_FUTURE.md.
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  // Only chunk 0 is generated; any other id yields an empty sitemap.
  if (Number(await id) !== 0) return [];
  const now = new Date();

  {
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

    // Origin × destination CV guides (10 destinations × 10 researched origins =
    // 100). Distinct per-origin copy → self-canonical + indexed (NOT thin like
    // the role×country grid). Promotion is data-only (add a destination slug).
    const cvOriginEntries: MetadataRoute.Sitemap = CV_ORIGIN_DESTINATIONS.flatMap(
      (dest) =>
        CV_ORIGINS.map((o) => ({
          url: `${SITE_ORIGIN}/cv-guide/${dest}/from-${o.slug}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
    );

    return [
      ...staticEntries,
      ...templateEntries,
      ...roleHubEntries,
      ...jobsEntries,
      ...cvCountryHubs,
      ...cvOriginEntries,
    ];
  }
}
