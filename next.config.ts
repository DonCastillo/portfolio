import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";

const nextConfig: NextConfig = {
  // Static HTML export to `out/`; no server at runtime.
  output: "export",
  // Images are pre-optimized to WebP by `pnpm images`, so skip the runtime optimizer.
  images: { unoptimized: true },
};

export default async function config(phase: string): Promise<NextConfig> {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isBuild = phase === PHASE_PRODUCTION_BUILD;

  // Generate typed content in .velite/ from content/. Next loads this file in more
  // than one process, so the env flag keeps Velite from starting twice.
  if ((isDev || isBuild) && !process.env.VELITE_STARTED) {
    process.env.VELITE_STARTED = "1";
    const { build } = await import("velite");
    // Dev watches and keeps running on bad frontmatter; build fails on it.
    await build({ watch: isDev, clean: !isDev, strict: isBuild });
  }

  return nextConfig;
}
