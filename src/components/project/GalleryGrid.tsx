"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ProjectImage } from "@/components/ui/ProjectImage";
import type { Project } from "@/lib/projects";
import "yet-another-react-lightbox/styles.css";

// Loaded on first open, so pages without a click never download it.
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

type GalleryItem = Project["gallery"][number];

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [index, setIndex] = useState(-1);

  const mobile = items.filter((item) => item.kind === "mobile");
  const desktop = items.filter((item) => item.kind === "desktop");
  // Lightbox slides in display order: phone shots first, then desktop.
  const slides = [...mobile, ...desktop].map(({ src, alt }) => ({ src, alt }));

  function figure(item: GalleryItem) {
    return (
      <figure>
        <button
          type="button"
          onClick={() => setIndex(slides.findIndex((s) => s.src === item.src))}
          className="block w-full cursor-zoom-in rounded-lg"
        >
          <span className="sr-only">Enlarge image: </span>
          <ProjectImage src={item.src} alt={item.alt} kind={item.kind} />
        </button>
        {item.caption && (
          <figcaption className="mt-2 text-[13px] text-muted">
            {item.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      {mobile.length > 0 && (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
          {mobile.map((item) => (
            <li key={item.src}>{figure(item)}</li>
          ))}
        </ul>
      )}

      {desktop.length > 0 && (
        <ul className="space-y-3">
          {desktop.map((item) => (
            <li key={item.src}>{figure(item)}</li>
          ))}
        </ul>
      )}

      {index >= 0 && (
        <Lightbox
          open
          index={index}
          close={() => setIndex(-1)}
          slides={slides}
        />
      )}
    </div>
  );
}
