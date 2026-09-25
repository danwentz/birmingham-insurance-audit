import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/section-8-property-insurance",
        destination: "/affordable-housing-insurance",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
