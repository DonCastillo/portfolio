import { defineCollection, defineConfig, s } from "velite";

// s.mdx() reports an empty file body as an issue, which --strict turns into a build
// failure. The long-form body is optional, so compile it only when there is one.
const mdx = s.mdx();
const optionalMdx = s
  .custom<string | undefined>((i) => i === undefined || typeof i === "string")
  .transform(async (value, { meta, addIssue }) => {
    if (!(value ?? meta.content)?.trim()) return undefined;
    const result = await mdx.safeParseAsync(value, { meta });
    if (result.success) return result.data;
    result.error.issues.forEach(addIssue);
    return undefined;
  });

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

    // src is a path in public/, e.g. "/projects/gac-paq/cover.webp".
    // kind "mobile": a phone screenshot, shown whole and centred instead of cropped.
    cover: s.object({
      src: s.string(),
      alt: s.string(),
      kind: s.enum(["mobile", "desktop"]).default("desktop"),
    }),
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
    body: optionalMdx, // optional longer write-up
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
