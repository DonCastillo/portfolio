export type Role = {
  period: string;
  role: string;
  company: string;
  /** One line for the home page. */
  summary: string;
};

/** Most recent first. */
export const experience: Role[] = [
  {
    period: "2025 – Present",
    role: "Co-Founder & CTO",
    company: "MarkBound",
    summary: "Leading architecture for an early-stage B2B InsurTech product.",
  },
  {
    period: "2023 – Present",
    role: "Research Assistant, Mobile App Developer",
    company: "University of Lethbridge",
    summary:
      "Designed and launched GAC-PAQ for an international research study.",
  },
  {
    period: "2021 – Present",
    role: "Software Engineer",
    company: "Tangle Media",
    summary: "Lead the Hugo and Directus practice across 20+ client sites.",
  },
  {
    period: "2019 – 2021",
    role: "Junior Web Developer",
    company: "Tangle Media",
    summary:
      "Built production Hugo sites and moved legacy LAMP sites to JAMstack.",
  },
];
