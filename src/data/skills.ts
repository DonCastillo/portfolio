export type SkillGroup = {
  label: string;
  items: string[];
};

/** A short cut of the resume's skills: only what I'd lead with. */
export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "PHP"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Mobile", items: ["React Native", "Expo", "Capacitor"] },
  { label: "Backend", items: ["Node.js", "Express", "FastAPI"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { label: "Platforms", items: ["Docker", "Netlify", "Directus", "Stripe"] },
  { label: "LLM", items: ["Claude API", "OpenAI API"] },
];
