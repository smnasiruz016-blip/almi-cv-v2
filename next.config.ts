import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Vercel Blob — TemplateImage uploads from /admin/templates land here
      // (see src/lib/photo-upload.ts + src/app/admin/templates/actions.ts).
      // The hash-prefixed subdomain is per-project, so the wildcard
      // matches whatever Blob host this project resolves to.
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    return [
      // /designs was the public gallery in PR #50; PR #51 consolidated
      // everything under /templates. 301 preserves any inbound links
      // and SEO equity. ?role= filter survives via wildcard in :path*.
      {
        source: "/designs",
        destination: "/templates",
        permanent: true,
      },
      {
        source: "/designs/:path*",
        destination: "/templates/:path*",
        permanent: true,
      },
      // /templates/[slug] detail pages were removed in PR #53 (Recipe
      // sunset); the gallery now links to /cv/new?template=… instead.
      // These two slugs still surface as GSC "Not found (404)" (2026-06-08
      // Coverage drilldown) from before the route was dropped. 301 to the
      // gallery recovers residual link equity. Exact paths (not a
      // /templates/:slug wildcard) so the live /templates/role hub is
      // untouched.
      {
        source: "/templates/pearl",
        destination: "/templates",
        permanent: true,
      },
      {
        source: "/templates/healthcare-bold-clinical-v1",
        destination: "/templates",
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {
      // /admin/templates uploader posts multi-image FormData via a Server
      // Action; each file is capped at 8 MB and batches can be ~6 files.
      // Next's default 1 MB body limit rejects with statusCode 413 +
      // surfaces as a 500 "Node.js process exited" fatal to the client.
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
