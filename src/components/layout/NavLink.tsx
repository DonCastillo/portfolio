"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  index: number;
};

/** Active on its own path, and on nested paths ("/projects" stays active on "/projects/gac-paq"). */
export function NavLink({ href, label, index }: NavLinkProps) {
  const pathname = usePathname();
  const exact = pathname === href;
  const active = exact || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={exact ? "page" : active ? "true" : undefined}
      className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-[15px] ${
        active
          ? "bg-surface font-medium text-accent"
          : "text-ink-2 hover:bg-surface"
      }`}
    >
      <span
        aria-hidden
        className={`font-mono text-xs ${active ? "font-semibold text-ink-2" : "text-subtle"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {label}
    </Link>
  );
}
