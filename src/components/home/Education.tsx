import { certifications, education } from "@/data/education";

/** One row per degree, laid out like Experience (year, degree, school · honours), then a line about certifications. */
export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="mt-20"
    >
      <h2
        id="education-heading"
        className="text-2xl font-semibold tracking-tight text-ink"
      >
        Education &amp; certifications
      </h2>
      <ol className="mt-6 border-b border-border">
        {education.map(({ degree, school, honours, year }) => (
          <li
            key={degree}
            className="grid gap-1 border-t border-border py-5 md:grid-cols-[10rem_1fr] md:gap-6"
          >
            <p className="font-mono text-xs text-muted uppercase md:pt-1 md:text-[13px] md:normal-case">
              {year}
            </p>
            <div>
              <h3 className="text-base font-semibold text-ink">{degree}</h3>
              <p className="mt-1 text-[15px] text-body">
                {school} · {honours}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-[15px] text-ink-2">
        {certifications.summary}{" "}
        <a
          href={certifications.href}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          View on Credly <span aria-hidden>↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </section>
  );
}
