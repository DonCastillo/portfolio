import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

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
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          See projects
        </ButtonLink>
      </div>
    </>
  );
}
