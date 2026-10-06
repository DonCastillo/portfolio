import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <h1 className="text-[2.5rem] leading-tight font-semibold tracking-tight text-ink md:text-display">
      Projects
    </h1>
  );
}
