"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, type SectionId } from "@/data/site";
import { NavLink } from "./NavLink";

/**
 * The section the reader is on: the last one whose top has passed a line a
 * third of the way down the viewport, or the last section at the very bottom.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId>(nav[0].id);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let current: SectionId = nav[0].id;
      for (const { id } of nav) {
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
  }, [enabled]);

  return active;
}

type NavListProps = {
  /** Called after a link is clicked (the mobile menu closes itself). */
  onNavigate?: () => void;
};

/**
 * Links to the home page sections. On the home page the section in view is
 * highlighted; on project pages "Projects" is.
 */
export function NavList({ onNavigate }: NavListProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const inView = useActiveSection(onHome);
  const active: SectionId | null = onHome
    ? inView
    : pathname.startsWith("/projects")
      ? "projects"
      : null;

  return (
    <ul className="space-y-1">
      {nav.map(({ id, label }, i) => (
        <li key={id}>
          <NavLink
            href={`/#${id}`}
            label={label}
            index={i}
            active={active === id}
            onClick={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}
