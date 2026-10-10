import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";

const elsewhere = [
  { href: site.links.linkedin, label: "LinkedIn" },
  { href: site.links.github, label: "GitHub" },
  { href: site.links.credly, label: "Credly" },
];

/** Last section on the home page: the contact form, with links elsewhere. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="mt-20">
      <h2
        id="contact-heading"
        className="text-2xl font-semibold tracking-tight text-ink"
      >
        Contact
      </h2>
      <p className="mt-3 max-w-150 text-lg leading-relaxed">
        Open to full stack and frontend roles in Calgary or remote. Send a note
        and I&apos;ll reply within two business days.
      </p>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <ContactForm />

        <aside aria-labelledby="elsewhere">
          <h3
            id="elsewhere"
            className="font-mono text-xs tracking-wide text-subtle uppercase"
          >
            Elsewhere
          </h3>
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
          <p className="mt-8 text-[13px] leading-relaxed text-muted">
            This site uses Google Analytics to count visits and see which pages
            are read. It doesn&apos;t collect anything you type in the form.
          </p>
        </aside>
      </div>
    </section>
  );
}
