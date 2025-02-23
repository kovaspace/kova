import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "qdsnlotkhjzlugngzjiw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/assets/images",
        search: "",
      },
    ],
  },
};

export default nextConfig;
