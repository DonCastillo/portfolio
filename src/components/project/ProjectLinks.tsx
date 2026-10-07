import type { Project } from "@/lib/projects";

type ProjectLinksProps = {
  links: Project["links"];
  sourceNote?: string;
};

const button = {
  primary: "bg-ink text-white hover:bg-ink-2",
  secondary: "border border-border-strong text-ink hover:bg-surface",
};

/** Live ↗ · Demo video ↗ · GitHub ↗. Missing links are hidden; without GitHub, the source note shows instead. */
export function ProjectLinks({ links, sourceNote }: ProjectLinksProps) {
  const items = [
    links.live && { href: links.live, label: "Live app" },
    links.demo && { href: links.demo, label: "Demo video" },
    links.github && { href: links.github, label: "GitHub" },
  ].filter((item) => !!item);
  const note = !links.github && sourceNote;

  if (items.length === 0 && !note) return null;

  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      {items.map(({ href, label }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-md px-4 text-sm font-medium ${
            i === 0 ? button.primary : button.secondary
          }`}
        >
          {label}
          <span aria-hidden>↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
      {note && <p className="font-mono text-xs text-subtle">GitHub: {note}</p>}
    </div>
  );
}
