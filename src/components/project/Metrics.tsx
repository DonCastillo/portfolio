import type { Project } from "@/lib/projects";

type MetricsProps = {
  metrics: NonNullable<Project["metrics"]>;
};

/** Headline numbers under one rule (like the home impact strip): 2 columns on mobile, 4 on desktop. */
export function Metrics({ metrics }: MetricsProps) {
  return (
    <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 md:grid-cols-4">
      {metrics.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse gap-1">
          <dt className="text-sm text-muted">{label}</dt>
          <dd className="font-mono text-[2rem] leading-none font-semibold tracking-tight text-accent">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
