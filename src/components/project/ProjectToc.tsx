"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/lib/useActiveSection";

export type TocItem = { id: string; label: string };

type ProjectTocProps = {
  items: TocItem[];
};

/** "On this page": links to the project's sections, with the one in view highlighted. */
export function ProjectToc({ items }: ProjectTocProps) {
  const inView = useActiveSection(items.map(({ id }) => id));
  // A clicked link stays highlighted until the reader scrolls themselves. Near
  // the bottom, the in-view rule would otherwise pick the last section instead.
  const [clicked, setClicked] = useState<string | null>(null);
  const active = clicked ?? inView;

  useEffect(() => {
    if (!clicked) return;
    const release = () => setClicked(null);
    const events = ["wheel", "touchmove", "keydown"] as const;
    events.forEach((type) =>
      window.addEventListener(type, release, { passive: true, once: true }),
    );
    return () =>
      events.forEach((type) => window.removeEventListener(type, release));
  }, [clicked]);

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-xs tracking-wide text-subtle uppercase">
        On this page
      </p>
      <ul className="mt-3 space-y-1">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={() => setClicked(id)}
              aria-current={active === id ? "true" : undefined}
              className={`block py-1 text-sm ${
                active === id
                  ? "font-medium text-accent"
                  : "text-muted hover:text-ink"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
