export type SkillGroup = {
  label: string;
  skills: string[];
};

/** A short cut of the resume's skills: only what I'd lead with. */
export const skills: SkillGroup[] = [
  { label: "Languages", skills: ["TypeScript", "JavaScript", "Python", "PHP"] },
  { label: "Frontend", skills: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Mobile", skills: ["React Native", "Expo", "Capacitor"] },
  { label: "Backend", skills: ["Node.js", "Express", "FastAPI"] },
  { label: "Databases", skills: ["PostgreSQL", "MySQL", "MongoDB"] },
  { label: "Platforms", skills: ["Docker", "Netlify", "Directus", "Stripe"] },
  { label: "LLM", skills: ["Claude API", "OpenAI API"] },
];
