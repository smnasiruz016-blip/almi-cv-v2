import type { MetadataRoute } from "next";
import { COUNTRY_LANDING } from "@/lib/country-landing";
import { TEMPLATE_LIST } from "@/lib/templates";

const SITE_ORIGIN = "https://almicv.almiworld.com";

const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/templates", changeFrequency: "monthly", priority: 0.8 },
  { path: "/resume-score", changeFrequency: "monthly", priority: 0.7 },
  { path: "/login", changeFrequency: "yearly", priority: 0.3 },
  { path: "/signup", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_ORIGIN}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const templateEntries: MetadataRoute.Sitemap = TEMPLATE_LIST.map((t) => ({
    url: `${SITE_ORIGIN}/templates/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const countryEntries: MetadataRoute.Sitemap = COUNTRY_LANDING.map((c) => ({
    url: `${SITE_ORIGIN}/jobs/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...templateEntries, ...countryEntries];
}
