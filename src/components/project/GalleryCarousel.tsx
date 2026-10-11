"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { imageRatio, ProjectImage } from "@/components/ui/ProjectImage";
import type { Project } from "@/lib/projects";
import "yet-another-react-lightbox/styles.css";

// Loaded on first open, so pages without a click never download it.
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

type GalleryItem = Project["gallery"][number];

type GalleryCarouselProps = {
  items: GalleryItem[];
};

// Strip order: phone shots, then tablet, then desktop.
const kindOrder = { mobile: 0, tablet: 1, desktop: 2 } as const;

/**
 * One scrolling row of screenshots, all the same height (width follows each
 * kind's shape). Swipe, arrow keys or the ‹ › buttons scroll it; a tile opens
 * the lightbox.
 */
export function GalleryCarousel({ items }: GalleryCarouselProps) {
  const [index, setIndex] = useState(-1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const stripRef = useRef<HTMLUListElement>(null);
  const stripId = useId();

  const ordered = [...items].sort(
    (a, b) => kindOrder[a.kind] - kindOrder[b.kind],
  );
  const slides = ordered.map(({ src, alt }) => ({ src, alt }));

  const updateEdges = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    setAtStart(strip.scrollLeft <= 1);
    setAtEnd(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    updateEdges();
    strip.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      strip.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  function scrollStrip(direction: 1 | -1) {
    const strip = stripRef.current;
    if (!strip) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    strip.scrollBy({
      left: direction * strip.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const arrow =
    "flex size-11 items-center justify-center rounded-md border border-border-strong text-ink hover:bg-surface disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2
          id="gallery"
          className="text-[22px] font-semibold tracking-tight text-ink"
        >
          Gallery
        </h2>
        <div className="flex items-center gap-4">
          <p className="font-mono text-xs tracking-wide text-subtle uppercase">
            {items.length} {items.length === 1 ? "screen" : "screens"} · Click
            to enlarge
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous screenshots"
              aria-controls={stripId}
              disabled={atStart}
              onClick={() => scrollStrip(-1)}
              className={arrow}
            >
              <span aria-hidden>‹</span>
            </button>
            <button
              type="button"
              aria-label="Next screenshots"
              aria-controls={stripId}
              disabled={atEnd}
              onClick={() => scrollStrip(1)}
              className={arrow}
            >
              <span aria-hidden>›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Focusable so arrow keys scroll it; padding keeps tile focus rings from being clipped. */}
      <ul
        ref={stripRef}
        id={stripId}
        tabIndex={0}
        aria-label="Screenshots"
        className="-mx-1 mt-5 flex snap-x snap-mandatory scroll-px-1 [scrollbar-width:none] gap-3 overflow-x-auto px-1 py-1 [--tile-h:20rem] md:[--tile-h:24rem] [&::-webkit-scrollbar]:hidden"
      >
        {ordered.map((item, i) => (
          <li
            key={item.src}
            className="relative shrink-0 snap-start"
            style={{ width: `calc(var(--tile-h) * ${imageRatio(item.kind)})` }}
          >
            <figure>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="block w-full cursor-zoom-in rounded-lg"
              >
                <span className="sr-only">Enlarge image: </span>
                <ProjectImage src={item.src} alt={item.alt} kind={item.kind} />
              </button>
              {item.caption && (
                <figcaption className="mt-2 text-sm text-muted">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      {index >= 0 && (
        <Lightbox
          open
          index={index}
          close={() => setIndex(-1)}
          slides={slides}
        />
      )}
    </>
  );
}
