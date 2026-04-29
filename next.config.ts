import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sinseungok.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "magenta-stork-113658.hostingersite.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "phuthaitech.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
