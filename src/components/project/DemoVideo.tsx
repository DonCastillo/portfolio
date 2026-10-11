"use client";

import { useState } from "react";

type DemoVideoProps = {
  url: string;
  title: string;
  /** Shown behind the play button until the video loads (the project cover). */
  poster?: { src: string; fit: "cover" | "contain" };
};

/** YouTube video ID from a watch, youtu.be, embed or shorts URL. */
function youTubeId(url: string): string | undefined {
  try {
    const { hostname, pathname, searchParams } = new URL(url);
    const host = hostname.replace(/^(www|m)\./, "");
    if (host === "youtu.be") return pathname.slice(1) || undefined;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      return (
        searchParams.get("v") ??
        pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]
      );
    }
  } catch {
    // Not a URL; fall through.
  }
  return undefined;
}

/** Poster (the cover, or a dark box) with a play button. The YouTube iframe loads only after the click. */
export function DemoVideo({ url, title, poster }: DemoVideoProps) {
  const [playing, setPlaying] = useState(false);
  const id = youTubeId(url);
  if (!id) return null;

  return (
    <div
      className={`relative mt-12 aspect-video overflow-hidden rounded-lg ${
        poster ? "border border-border bg-placeholder" : "bg-ink"
      }`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`${title} demo video`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex size-full items-center justify-center"
        >
          {poster && (
            // Decorative: the button's label already says what it does.
            // eslint-disable-next-line @next/next/no-img-element -- static export; images are pre-optimized by `pnpm images`
            <img
              src={poster.src}
              alt=""
              loading="eager"
              decoding="async"
              className={`absolute inset-0 size-full ${
                poster.fit === "contain" ? "object-contain p-4" : "object-cover"
              }`}
            />
          )}
          <span className="sr-only">Play {title} demo video</span>
          {/* Accent fill and shadow keep the button visible on light and dark posters. */}
          <span
            aria-hidden
            className="relative flex size-16 items-center justify-center rounded-full bg-accent text-white shadow-lg transition group-hover:scale-105 group-hover:bg-accent-hover motion-reduce:transition-none md:size-20"
          >
            <svg
              viewBox="0 0 24 24"
              className="ml-1 size-7"
              fill="currentColor"
            >
              <path d="M8 5.5v13l10.5-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
