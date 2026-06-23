import type { MetadataRoute } from "next";
import { COUNTRY_LANDING } from "@/lib/country-landing";
import { COUNTRIES_SERVED } from "@/lib/countries";
import { JOB_ROLES } from "@/lib/roles";
import { CV_ORIGINS, CV_ORIGIN_DESTINATIONS } from "@/lib/cv-origin-localization";
import { ROLE_CV_CONTENT_SLUGS, CV_GRID_COUNTRIES } from "@/lib/role-cv-content";
import { hasFreeCvContent } from "@/lib/free-cv-content";

export const SITE_ORIGIN = "https://almicv.almiworld.com";

// 45k URLs/chunk — under Google's 50k cap, with headroom. The canonical surface
// (hubs + origins + the un-thinned role×country grid) stays well under one chunk
// today and auto-grows: numCvSitemapChunks() drives both /sitemap/N.xml and the
// /sitemap-index.xml handler so they never drift.
export const CV_SITEMAP_CHUNK = 45_000;

const STATIC_ROUTES: ReadonlyArray<{ path: string; cf: MetadataRoute.Sitemap[number]["changeFrequency"]; p: number }> = [
  { path: "/", cf: "weekly", p: 1.0 },
  { path: "/pricing", cf: "monthly", p: 0.8 },
  { path: "/templates", cf: "weekly", p: 0.9 },
  { path: "/resume-score", cf: "monthly", p: 0.7 },
  { path: "/cv-guide", cf: "weekly", p: 0.9 },
];

// Single source of truth — only index-worthy URLs (gate-enforced), shared by the
// chunk route + the index handler.
export function buildAllCvUrls(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_ORIGIN}${r.path}`, lastModified: now, changeFrequency: r.cf, priority: r.p,
  }));

  // /templates/role/[slug] role hubs (all JOB_ROLES — 514).
  for (const r of JOB_ROLES) out.push({ url: `${SITE_ORIGIN}/templates/role/${r.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  // /jobs/[country] (196, preserved).
  for (const c of COUNTRY_LANDING) out.push({ url: `${SITE_ORIGIN}/jobs/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  // /cv-guide/[country] hubs (193).
  for (const c of COUNTRIES_SERVED) out.push({ url: `${SITE_ORIGIN}/cv-guide/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  // /free-cv-maker/[country] transactional landing pages — self-canonical, listed
  // only where sourced content exists (mirrors the page's hasFreeCvContent gate).
  for (const c of COUNTRIES_SERVED) if (hasFreeCvContent(c.slug)) out.push({ url: `${SITE_ORIGIN}/free-cv-maker/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  // Origin × destination CV guides — now the full 191-origin FROM-set.
  for (const dest of CV_ORIGIN_DESTINATIONS) for (const o of CV_ORIGINS) out.push({ url: `${SITE_ORIGIN}/cv-guide/${dest}/from-${o.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  // Role × country grid — the un-thinned cells: a role with sourced CV content ×
  // EVERY served country (193, family standing rule). Self-canonical + indexed.
  // At full 514 roles this is 514 × 193 ≈ 99k cells; the 45k auto-chunk handles it.
  for (const role of ROLE_CV_CONTENT_SLUGS) for (const country of CV_GRID_COUNTRIES) out.push({ url: `${SITE_ORIGIN}/cv-guide/${country}/${role}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 });

  return out;
}

export function numCvSitemapChunks(): number {
  return Math.max(1, Math.ceil(buildAllCvUrls().length / CV_SITEMAP_CHUNK));
}
