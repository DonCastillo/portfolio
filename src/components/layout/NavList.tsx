"use client";

import { usePathname } from "next/navigation";
import { nav, type SectionId } from "@/data/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { NavLink } from "./NavLink";

const sectionIds = nav.map(({ id }) => id);

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
  const inView = useActiveSection(sectionIds, onHome);
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
