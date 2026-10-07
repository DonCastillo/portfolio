import { site } from "./site";

export type Credential = {
  degree: string;
  school: string;
  honours: string;
  year: string;
};

export const education: Credential[] = [
  {
    degree: "BSc Computer Science, Minor in New Media",
    school: "University of Lethbridge",
    honours: "Great Distinction",
    year: "2024",
  },
  {
    degree: "Diploma, Computer Information Technology",
    school: "Lethbridge Polytechnic",
    honours: "Honours",
    year: "2019",
  },
];

export const certifications = {
  summary:
    "9 IBM certifications, including React, Node.js and Express, Django, and Python for AI.",
  href: site.links.credly,
};
