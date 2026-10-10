import Link from "next/link";
import type { Project } from "@/lib/projects";

type NextProjectProps = {
  next?: Project;
};

/** Footer row: back to all projects, and the next project by `order` when there is one. */
export function NextProject({ next }: NextProjectProps) {
  return (
    <nav
      aria-label="More projects"
      className="mt-20 flex flex-wrap items-end justify-between gap-6"
    >
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-2 hover:text-accent"
      >
        <span aria-hidden>←</span> All projects
      </Link>
      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="group ml-auto flex min-h-11 flex-col items-end justify-center text-right"
        >
          <span className="font-mono text-xs tracking-wide text-subtle uppercase">
            Next project
          </span>
          <span className="mt-1 text-lg font-semibold text-accent group-hover:text-accent-hover">
            {next.title} <span aria-hidden>→</span>
          </span>
        </Link>
      )}
    </nav>
  );
}
