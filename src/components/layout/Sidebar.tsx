import Link from "next/link";
import { site } from "@/data/site";
import { ExternalLinks } from "./ExternalLinks";
import { NavList } from "./NavList";

/** Fixed left sidebar, desktop only (lg and up). */
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col justify-between overflow-y-auto border-r border-border px-4 py-10 lg:flex">
      <div>
        <Link href="/" className="block px-3">
          <span className="block text-[17px] font-semibold text-ink">
            {site.name}
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-muted">
            {site.title}
          </span>
        </Link>

        <nav aria-label="Main" className="mt-10">
          <NavList />
        </nav>
      </div>

      <div className="px-3">
        <ExternalLinks />
      </div>
    </aside>
  );
}
