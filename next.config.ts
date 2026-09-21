import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      { source: "/og.png", destination: "/opengraph-image" },
    ];
  },
};

export default nextConfig;
