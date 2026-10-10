export const site = {
  name: "Don Castillo",
  title: "Full Stack Software Engineer",
  location: "Calgary, AB (relocating)",
  url: "https://don-myportfolio.netlify.app",
  links: {
    github: "https://github.com/DonCastillo",
    linkedin: "https://www.linkedin.com/in/don-castillo/",
    credly: "https://www.credly.com/users/don-castillo/badges",
    resume: "/Don_Castillo_Resume.pdf",
  },
} as const;

/** Anchors to the home page sections; each `id` matches a section's id. */
export const nav = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education & certifications" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof nav)[number]["id"];

export const externalLinks = [
  { href: site.links.github, label: "GitHub" },
  { href: site.links.linkedin, label: "LinkedIn" },
  { href: site.links.credly, label: "Credly" },
] as const;

/** Hero intro on the home page. */
export const intro =
  "I build web and mobile apps that work at scale, including a research app used in 17 countries and 23 languages, and CMS platforms that non-technical teams can actually run themselves.";

/** Impact strip on the home page. */
export const impact = [
  { value: "5+ yrs", label: "Professional full stack experience" },
  { value: "17 · 23", label: "Countries and languages, one mobile app" },
  { value: "−90%", label: "Network bandwidth across client sites" },
  { value: "20+", label: "Sites migrated to a headless CMS" },
] as const;
