import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}, ${site.title}.`,
  alternates: { canonical: "/contact" },
};

const elsewhere = [
  { href: site.links.linkedin, label: "LinkedIn" },
  { href: site.links.github, label: "GitHub" },
  { href: site.links.credly, label: "Credly" },
];

export default function ContactPage() {
  return (
    <>
      <h1 className="text-[2.5rem] leading-tight font-semibold tracking-tight text-ink md:text-display">
        Contact
      </h1>
      <p className="mt-5 max-w-150 text-lg leading-relaxed md:text-xl">
        Open to full stack and frontend roles in Calgary or remote. Send a note
        and I&apos;ll reply within two business days.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <ContactForm />

        <aside aria-labelledby="elsewhere">
          <h2
            id="elsewhere"
            className="font-mono text-xs tracking-wide text-subtle uppercase"
          >
            Elsewhere
          </h2>
          <ul className="mt-3">
            {elsewhere.map(({ href, label }) => (
              <li key={href} className="border-b border-border">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-between text-[15px] text-ink hover:text-accent"
                >
                  {label}
                  <span aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">{site.location}</p>
        </aside>
      </div>
    </>
  );
}
