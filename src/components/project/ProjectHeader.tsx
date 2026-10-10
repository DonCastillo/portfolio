import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/projects";

type ProjectHeaderProps = {
  project: Project;
};

/** Back link, title, summary and the mono meta line (role · client/event · period · team). */
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
  ].filter((item) => !!item);

  return (
    <header>
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-2 hover:text-accent"
      >
        <span aria-hidden>←</span> All projects
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="font-heading text-[2.5rem] leading-tight font-semibold tracking-tight text-ink md:text-display">
          {title}
        </h1>
        {project.status === "in-progress" && <Badge>In progress</Badge>}
      </div>

      <p className="mt-5 max-w-170 text-lg leading-relaxed md:text-xl">
        {summary}
      </p>

      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted md:text-[13px]">
        {meta.map(({ label, value }) => (
          <div key={label} className="flex gap-2">
            <dt className="uppercase">{label}</dt>
            <span aria-hidden>·</span>
            <dd className="text-ink-2">{value}</dd>
          </div>
        ))}
        <div>
          <dt className="sr-only">Period</dt>
          <dd className="text-ink-2 uppercase">
            {duration ? `${period} · ${duration}` : period}
          </dd>
        </div>
      </dl>
    </header>
  );
}
