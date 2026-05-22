import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/internal/"],
      },
    ],
    sitemap: "https://almicv.almiworld.com/sitemap-index.xml",
    host: "https://almicv.almiworld.com",
  };
}
