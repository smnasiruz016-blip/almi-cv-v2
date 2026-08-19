import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    return [
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
};

export default nextConfig;
