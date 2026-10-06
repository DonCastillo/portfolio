import { defineCollection, defineConfig, s } from "velite";

// One MDX file per project. Frontmatter is validated here; with --strict an
// invalid file fails the build (see PLAN.md section 5 for the field rules).
const projects = defineCollection({
  name: "Project",
  pattern: "projects/*.mdx",
  schema: s.object({
    title: s.string(),
    slug: s.slug("projects"),
    category: s.enum(["professional", "hackathon", "academic", "personal"]),
    summary: s.string().max(200), // short description (cards + page intro)
    role: s.string().optional(), // "Full Stack Mobile Developer"
    client: s.string().optional(), // "University of Lethbridge"
    period: s.string(), // "2023 – Present"
    status: s.enum(["shipped", "in-progress"]).default("shipped"),

    // hackathon / academic context
    event: s.string().optional(), // "HackED 2024" or "CPSC 4210 Capstone"
    award: s.string().optional(), // "1st place, Best Use of AI"
    duration: s.string().optional(), // "36 hrs"
    team: s.object({ size: s.number(), role: s.string() }).optional(),

    links: s.object({
      github: s.string().url().optional(),
      demo: s.string().url().optional(), // demo video
      live: s.string().url().optional(), // live site / app store
    }),
    sourceNote: s.string().optional(), // "Source private (research project)"

    metrics: s
      .array(s.object({ value: s.string(), label: s.string() }))
      .max(4)
      .optional(),
    highlights: s.array(s.string()).min(2).max(5),
    stack: s.array(s.string()).min(1),

    cover: s.object({ src: s.string(), alt: s.string() }), // path in public/, e.g. "/projects/gac-paq/cover.webp"
    gallery: s
      .array(
        s.object({
          src: s.string(),
          alt: s.string(),
          caption: s.string().optional(),
          kind: s.enum(["mobile", "desktop"]).default("desktop"),
        }),
      )
      .default([]),

    featured: s.boolean().default(false),
    order: s.number(),
    body: s.mdx(), // optional longer write-up
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    clean: true,
  },
  collections: { projects },
});
