import { site } from "@/data/site";

/** schema.org Person for the home page. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  sameAs: [site.links.github, site.links.linkedin, site.links.credly],
};

/** JSON for a <script type="application/ld+json">, with `<` escaped so content can't close the tag. */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
