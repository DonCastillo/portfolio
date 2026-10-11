"use client";

import { useEffect, useState } from "react";

/**
 * The section the reader is on, from `ids` in page order: the last one whose
 * top has passed a line a third of the way down the viewport, or the last
 * section at the very bottom. Starts on the first id.
 */
export function useActiveSection<T extends string>(
  ids: readonly T[],
  enabled = true,
): T {
  const [active, setActive] = useState<T>(ids[0]);
  // A string key, so a new array with the same ids doesn't restart the effect.
  const key = ids.join(" ");

  useEffect(() => {
    if (!enabled) return;
    const list = key.split(" ") as T[];
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && (atBottom || el.getBoundingClientRect().top <= line)) {
          current = id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key, enabled]);

  return active;
}
