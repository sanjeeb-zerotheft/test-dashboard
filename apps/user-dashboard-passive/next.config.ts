import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/roi-estimator",
        destination: "/analytics/roi-estimator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
