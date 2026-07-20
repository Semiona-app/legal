import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH is set by the GitHub Pages workflow ("/legal").
// Leave it empty for local dev, Vercel, or a custom domain (legal.semiona.com).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  turbopack: { root: __dirname },
};

export default nextConfig;
