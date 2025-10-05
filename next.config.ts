import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export", // Dinonaktifkan agar bisa pakai dynamic routing dengan use(params)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
