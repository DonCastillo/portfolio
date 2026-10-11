export const site = {
  name: "Don Castillo",
  title: "Full Stack Software Engineer",
  location: "",
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
  { href: site.links.credly, label: "Credly" },
] as const;

/** Hero intro on the home page, one string per paragraph. The first is also the OG image subtitle. */
export const intro = [
  "I build web and mobile products end to end that work at scale, including a research app used in 17 countries and 23 languages, and CMS platforms that non-technical teams run themselves.",
  "Now I’m focused on building AI tools that remove the tedious parts of people’s work and surface recommendations that help them make better decisions.",
] as const;

/** Impact strip on the home page. */
export const impact = [
  { value: "5+ yrs", label: "Professional full stack experience" },
  { value: "17 · 23", label: "Countries and languages on one mobile app" },
  { value: "−90%", label: "Network bandwidth across client sites" },
  // { value: "20+", label: "Sites migrated to a headless CMS" },
  { value: "30+", label: "projects owned end-to-end" },
  // { value: "30+", label: "CMS extensions built and maintained" },
] as const;
