/**
 * Chunked sitemap (/sitemap/[id].xml, fronted by /sitemap-index.xml). The URL
 * set is built once in lib/cv-sitemap-urls.ts and auto-chunks at 45k — so it
 * grows safely as the role×country grid un-thins (a role becomes indexable once
 * it has sourced CV content; gate in lib/role-cv-content.ts). Today the canonical
 * surface (hubs + 191-origin pages + un-thinned grid cells) is well under one
 * chunk; numCvSitemapChunks() drives both this route and the index handler.
 *
 * CRITICAL — `id: Promise<string>` in Next 16: await + Number-coerce, or every
 * chunk slices on NaN. Test via `next start` + curl, never `tsx`.
 */
import type { MetadataRoute } from "next";
import { buildAllCvUrls, numCvSitemapChunks, CV_SITEMAP_CHUNK } from "@/lib/cv-sitemap-urls";

export async function generateSitemaps() {
  return Array.from({ length: numCvSitemapChunks() }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const idNum = Number(await id);
  const start = (Number.isNaN(idNum) ? 0 : idNum) * CV_SITEMAP_CHUNK;
  return buildAllCvUrls().slice(start, start + CV_SITEMAP_CHUNK);
}
