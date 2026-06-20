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

import { SITE_ORIGIN, numCvSitemapChunks } from "@/lib/cv-sitemap-urls";

// Chunk count derived from the shared URL builder → the index never drifts from
// the actual /sitemap/N.xml chunks, and auto-grows as the grid un-thins.
export function GET() {
  const now = new Date().toISOString();
  const entries = Array.from({ length: numCvSitemapChunks() }, (_, i) =>
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
