import { ButtonLink } from "@/components/ui/Button";
import type { Project } from "@/lib/projects";

type ProjectLinksProps = {
  links: Project["links"];
  sourceNote?: string;
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
        <ButtonLink
          key={label}
          href={href}
          external
          size="sm"
          variant={i === 0 ? "primary" : "secondary"}
        >
          {label}
        </ButtonLink>
      ))}
      {note && <p className="font-mono text-xs text-subtle">GitHub: {note}</p>}
    </div>
  );
}
