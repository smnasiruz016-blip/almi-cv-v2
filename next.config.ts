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
