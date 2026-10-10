import { externalLinks, site } from "@/data/site";

/** GitHub · LinkedIn · Credly · Resume, shown at the bottom of the sidebar and the mobile menu. */
export function ExternalLinks() {
  return (
    <ul className="text-sm text-ink-2">
      {externalLinks.map(({ href, label }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-8 items-center gap-1.5 hover:text-accent"
          >
            {label}
            <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
      <li>
        <a
          href={site.links.resume}
          download
          className="inline-flex min-h-8 items-center gap-1.5 hover:text-accent"
        >
          Resume (PDF)
          <span aria-hidden>↓</span>
        </a>
      </li>
    </ul>
  );
}
