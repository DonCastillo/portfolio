"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";
import { ExternalLinks } from "./ExternalLinks";
import { NavLink } from "./NavLink";

/** Top bar with a menu button, below lg. */
export function MobileNav() {
  const pathname = usePathname();
  // Remember which page the menu was opened on: navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg lg:hidden">
      <div className="flex h-14 items-center justify-between px-5">
        <Link href="/" className="text-base font-semibold text-ink">
          {site.name}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpenOn(open ? null : pathname)}
          className="-mr-2.5 flex size-11 items-center justify-center rounded-md text-ink"
        >
          <svg
            aria-hidden
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-14 bottom-0 overflow-y-auto bg-bg px-3 pt-4 pb-10"
      >
        <nav aria-label="Main">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <NavLink {...item} index={i} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 border-t border-border px-3 pt-6">
          <ExternalLinks />
        </div>
      </div>
    </header>
  );
}
