import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export to `out/`; no server at runtime.
  output: "export",
  // Images are pre-optimized to WebP by `pnpm images`, so skip the runtime optimizer.
  images: { unoptimized: true },
};

export default nextConfig;
