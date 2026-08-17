import type { MetadataRoute } from "next";
import { COUNTRY_LANDING } from "@/lib/country-landing";
import { COUNTRIES_SERVED } from "@/lib/countries";
import { JOB_ROLES } from "@/lib/roles";
import { CV_ORIGINS, CV_ORIGIN_DESTINATIONS } from "@/lib/cv-origin-localization";
import {
  ROLE_CV_CONTENT_SLUGS,
  CV_GRID_COUNTRIES,
  isRoleCountryIndexable,
} from "@/lib/role-cv-content";

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

// Shared by the chunk route + the index handler.
//
// WHAT "GATE-ENFORCED" MEANS HERE, precisely. Only the role×country loop is
// gated, by isRoleCountryIndexable(). The other surfaces — static, role hubs,
// /jobs/[country], /cv-guide/[country] hubs, and origin×destination — are
// emitted unconditionally and are NOT filtered by any gate.
//
// This comment used to read "only index-worthy URLs (gate-enforced)" while every
// loop was unconditional, including the ~99k role×country grid. That was not a
// small inaccuracy: it is the sentence a reader checks INSTEAD of reading the
// loops, so it actively concealed the thing it claimed to guarantee. If a
// surface here ever becomes conditional, say so on this line or delete the line.
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
  // NOTE: the free-cv-maker / cv-builder / ai-cv-builder advertise pages moved to
  // the hub (world.almiworld.com) — they are NOT served from this subdomain.
  // Origin × destination CV guides — now the full 191-origin FROM-set.
  for (const dest of CV_ORIGIN_DESTINATIONS) for (const o of CV_ORIGINS) out.push({ url: `${SITE_ORIGIN}/cv-guide/${dest}/from-${o.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  // Role × country grid — GATED, and the gate is the whole point of this loop.
  // A cell ships only where the role has sourced CV content AND the country has
  // a hand-verified convention (COUNTRY_OVERRIDES). Unverified countries render
  // their REGION's template with the name swapped in, so their cells are
  // near-duplicates; they still RENDER, they are simply not submitted and carry
  // noindex + a canonical to the country hub.
  //
  // Submitting the ungated product was ~98.8k URLs of which ~84k were those
  // near-duplicates — and because these pages are dynamic (revalidate=false,
  // no generateStaticParams), every crawl of one is a render we pay for.
  for (const role of ROLE_CV_CONTENT_SLUGS)
    for (const country of CV_GRID_COUNTRIES)
      if (isRoleCountryIndexable(role, country))
        out.push({ url: `${SITE_ORIGIN}/cv-guide/${country}/${role}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 });

  return out;
}

export function numCvSitemapChunks(): number {
  return Math.max(1, Math.ceil(buildAllCvUrls().length / CV_SITEMAP_CHUNK));
}
