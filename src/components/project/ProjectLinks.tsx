import { ButtonLink } from "@/components/ui/Button";
import type { Project } from "@/lib/projects";

type ProjectLinksProps = {
  links: Project["links"];
  sourceNote?: string;
};

const sourceHosts: Record<string, string> = {
  "github.com": "GitHub",
  "gitlab.com": "GitLab",
  "bitbucket.org": "Bitbucket",
};

/** Names the source button after the repo's host, falling back to "Source code". */
function sourceLabel(url: string): string {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return sourceHosts[host] ?? "Source code";
}

/** Live ↗ · Demo video ↗ · Project website ↗ · GitHub/GitLab/… ↗. Missing links are hidden; without a source link, the source note shows instead. */
export function ProjectLinks({ links, sourceNote }: ProjectLinksProps) {
  const items = [
    links.live && { href: links.live, label: "Live app" },
    links.demo && { href: links.demo, label: "Demo video" },
    links.website && { href: links.website, label: "Project website" },
    links.source && { href: links.source, label: sourceLabel(links.source) },
  ].filter((item) => !!item);
  const note = !links.source && sourceNote;

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
      {note && <p className="font-mono text-xs text-subtle">{note}</p>}
    </div>
  );
}
