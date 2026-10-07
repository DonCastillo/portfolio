"use client";

import { useState } from "react";

type DemoVideoProps = {
  url: string;
  title: string;
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

/** Poster with a play button. The YouTube iframe loads only after the click. */
export function DemoVideo({ url, title }: DemoVideoProps) {
  const [playing, setPlaying] = useState(false);
  const id = youTubeId(url);
  if (!id) return null;

  return (
    <div className="relative mt-12 aspect-video overflow-hidden rounded-lg bg-ink">
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
          <span className="sr-only">Play {title} demo video</span>
          <span
            aria-hidden
            className="flex size-16 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:scale-105 motion-reduce:transition-none md:size-20"
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
