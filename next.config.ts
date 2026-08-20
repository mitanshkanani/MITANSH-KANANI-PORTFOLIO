import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode for highlighting potential problems in development.
  reactStrictMode: true,
  // Required for react-three-fiber / three.js in Next.js 13.1+ (transpile ESM).
  transpilePackages: ["three"],
};

export default nextConfig;

