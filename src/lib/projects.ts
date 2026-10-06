import { projects, type Project } from "#site/content";

export type { Project };
export type Category = Project["category"];

export type ProjectGroup = {
  category: Category;
  label: string;
  projects: Project[];
};

/** Section order and headings on /projects. Adding a category to the schema fails typecheck until it's listed here. */
const categories = {
  professional: "Professional",
  hackathon: "Hackathons",
  academic: "Academic",
  personal: "Personal",
} as const satisfies Record<Category, string>;

const sorted = [...projects].sort((a, b) => a.order - b.order);

/** All projects, sorted by `order`. */
export function getProjects(): Project[] {
  return sorted;
}

export function getProject(slug: string): Project | undefined {
  return sorted.find((project) => project.slug === slug);
}

/** Featured projects for the home page, sorted by `order`. */
export function getFeatured(limit = 3): Project[] {
  return sorted.filter((project) => project.featured).slice(0, limit);
}

/** Projects grouped in section order. Empty groups are left out. */
export function groupByCategory(list: Project[] = sorted): ProjectGroup[] {
  return (Object.keys(categories) as Category[])
    .map((category) => ({
      category,
      label: categories[category],
      projects: list.filter((project) => project.category === category),
    }))
    .filter((group) => group.projects.length > 0);
}

/** The project after `slug` in `order`, wrapping to the first. Undefined if there's no other project. */
export function getNext(slug: string): Project | undefined {
  const index = sorted.findIndex((project) => project.slug === slug);
  if (index === -1 || sorted.length < 2) return undefined;
  return sorted[(index + 1) % sorted.length];
}
