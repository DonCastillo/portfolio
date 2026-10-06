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

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const externalLinks = [
  { href: site.links.github, label: "GitHub" },
  { href: site.links.linkedin, label: "LinkedIn" },
  { href: site.links.credly, label: "Credly" },
] as const;
