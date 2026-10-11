import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { categoryName, type Project } from "@/lib/projects";

type ProjectHeaderProps = {
  project: Project;
};

/** Back link with the category eyebrow opposite, title, summary and the mono meta list (role, client/event, award, team, period), one per line. */
export function ProjectHeader({ project }: ProjectHeaderProps) {
  const { title, summary, role, client, event, award, period, duration, team } =
    project;

  const meta = [
    role && { label: "Role", value: role },
    client && { label: "Client", value: client },
    event && { label: "Event", value: event },
    award && { label: "Award", value: award },
    team && {
      label: "Team",
      value: `${team.size} people · ${team.role}`,
    },
    {
      label: "Period",
      value: duration ? `${period} · ${duration}` : period,
    },
  ].filter((item) => !!item);

  return (
    <header id="overview">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-2 hover:text-accent"
        >
          <span aria-hidden>←</span> All projects
        </Link>
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          {categoryName(project.category)}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="text-[2.5rem] leading-tight font-semibold tracking-tight text-ink md:text-display">
          {title}
        </h1>
        {project.status === "in-progress" && <Badge>In progress</Badge>}
      </div>

      <p className="mt-5 max-w-170 text-lg leading-relaxed md:text-xl">
        {summary}
      </p>

      {/* One fact per line; labels in a fixed column so the values line up. */}
      <dl className="mt-5 space-y-1.5 font-mono text-xs text-muted md:text-[13px]">
        {meta.map(({ label, value }) => (
          <div key={label} className="flex gap-4">
            <dt className="w-16 shrink-0 uppercase">{label}</dt>
            <dd className="text-ink-2">{value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
