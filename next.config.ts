import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
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
