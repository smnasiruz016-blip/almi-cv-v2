import type { MetadataRoute } from "next";
import { JOB_ROLES } from "@/lib/roles";
import { learnUrls } from "@/lib/cv/learn/articles";

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

/** Fixed publication date for the /learn entries. NOT a wall clock.
 *
 *  Constitution ISR standard: a lastModified that moves every build tells Google
 *  the page changed when it did not, and it makes two builds of identical content
 *  produce different bytes. Every loop below still uses `now` — changing that is a
 *  separate decision about a much larger surface and is deliberately NOT bundled
 *  into this PR. Bump this by hand when the guide set is revised. */
export const LEARN_LAST_MODIFIED = new Date("2026-08-25T00:00:00.000Z");

// Shared by the chunk route + the index handler.
//
// WHICH LOOPS ARE GATED, precisely — keep this list correct or delete it.
//   UNGATED: static, role hubs, /learn (the gated grid loops were removed, Oct 2026)
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
  // COST FIX (Oct 2026): /jobs/[country], /cv-guide/[country] hubs, the
  // origin × destination guides and the role × country grid were removed
  // (owner ruling 17 Oct; they answer 410 Gone from src/proxy.ts), so no
  // sitemap lists them any more.

  // /learn — the hub and every guide, from the SAME directory scan that feeds
  // the routes and the hub page. One source of truth, three consumers: add a
  // second one and you have rebuilt the drift this file exists to prevent.
  // Constant lastModified, unlike every loop above — see LEARN_LAST_MODIFIED.
  for (const path of learnUrls())
    out.push({
      url: `${SITE_ORIGIN}${path}`,
      lastModified: LEARN_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: path === "/learn" ? 0.9 : 0.8,
    });

  return out;
}

export function numCvSitemapChunks(): number {
  return Math.max(1, Math.ceil(buildAllCvUrls().length / CV_SITEMAP_CHUNK));
}
