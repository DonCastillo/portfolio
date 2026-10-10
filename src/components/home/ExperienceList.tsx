import { experience } from "@/data/experience";

/** One row per role: dates, role · company, and a one-line summary. */
export function ExperienceList() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mt-20"
    >
      <h2
        id="experience-heading"
        className="text-2xl font-semibold tracking-tight text-ink"
      >
        Experience
      </h2>
      <ol className="mt-6 border-b border-border">
        {experience.map(({ period, role, company, summary }) => (
          <li
            key={`${role}-${company}`}
            className="grid gap-1 border-t border-border py-5 md:grid-cols-[10rem_1fr] md:gap-6"
          >
            <p className="font-mono text-xs text-muted uppercase md:pt-1 md:text-[13px] md:normal-case">
              {period}
            </p>
            <div>
              <h3 className="text-base font-semibold text-ink">
                {role} · {company}
              </h3>
              <p className="mt-1 hidden text-sm text-body md:block">
                {summary}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
