import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <p className="font-mono text-xs tracking-wide text-subtle uppercase">
        404
      </p>
      <h1 className="mt-4 text-[2.5rem] leading-tight font-semibold tracking-tight text-ink md:text-display">
        Page not found
      </h1>
      <p className="mt-6 max-w-150 text-lg leading-relaxed">
        This page doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md bg-ink px-5 text-[15px] font-medium text-white hover:bg-ink-2"
        >
          Go home
        </Link>
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center rounded-md border border-border-strong px-5 text-[15px] font-medium text-ink hover:bg-surface"
        >
          See projects
        </Link>
      </div>
    </>
  );
}
