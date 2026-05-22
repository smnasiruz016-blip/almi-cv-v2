/**
 * Manual sitemap index — lists the chunk sitemaps that `generateSitemaps()`
 * emits but Next 16 does NOT auto-aggregate at /sitemap.xml.
 *
 * Lives at /sitemap-index.xml — NOT /sitemap.xml (which conflicts with
 * Next's metadata route at build time, per
 * almijob-v2/docs/SITEMAP_CHUNKING_FUTURE.md §"Pitfalls").
 *
 * Submit /sitemap-index.xml to Google Search Console once after deploy.
 */

import { COUNTRIES_SERVED } from "@/lib/countries";
import { JOB_ROLES } from "@/lib/roles";

const SITE_ORIGIN = "https://almicv.almiworld.com";
const CHUNK = 25000;

const TOTAL_CV_GUIDE = COUNTRIES_SERVED.length * JOB_ROLES.length;
const NUM_SITEMAPS = 1 + Math.ceil(TOTAL_CV_GUIDE / CHUNK);

export function GET() {
  const now = new Date().toISOString();
  const entries = Array.from({ length: NUM_SITEMAPS }, (_, i) =>
    `  <sitemap>
    <loc>${SITE_ORIGIN}/sitemap/${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
  ).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
