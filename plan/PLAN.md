# Portfolio Implementation Plan

Personal portfolio for **Don Castillo, Full Stack Software Engineer**.
This file is the source of truth for scope, architecture and build order. Update it when a decision changes.

---

## 1. Goals

1. Show professional work that has private source (GAC-PAQ, Tangle Media, MarkBound) through clear project pages: what I built, the decisions, the results.
2. Back up the resume's React + TypeScript claim with a clean, public, well-structured codebase.
3. Load fast, read well on a phone, and pass accessibility basics. Target Lighthouse 95+ in every category.
4. Be easy to maintain: adding a project means adding one MDX file.

**Non-goals:** blog, CMS, backend, database, auth, i18n, heavy animation.

---

## 2. Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router, latest stable) + TypeScript (`strict`) | Matches resume; static generation |
| Output | Static export (`output: "export"`) | No server to run; fastest possible pages |
| Styling | Tailwind CSS v4, design tokens in `@theme` | Fast, readable, tokens in one place |
| Content | MDX in repo, typed with **Velite** (Zod-based schemas) | Typed content, reviewable in GitHub |
| Images | Static files in `public/projects/<slug>/`, pre-optimized to WebP by a build script (`sharp`) | No external service; works with static export. Cloudinary can be added later behind the same component |
| Video | Unlisted YouTube, click-to-load | No heavy embed until the user presses play; keeps large files out of the repo |
| Gallery lightbox | `yet-another-react-lightbox` | Accessible, keyboard support, small |
| Fonts | Geist + Geist Mono via `next/font/google` | Self-hosted at build, no layout shift |
| Forms | Netlify Forms | No backend; spam filtering included |
| Hosting | Netlify + custom domain (e.g. `doncastillo.dev`) | Existing CI/CD experience |
| Analytics | Plausible or Netlify Analytics | Privacy-friendly; see which projects recruiters open |
| Testing | Playwright (smoke), Lighthouse CI | Cheap, credible quality signals |

---

## 3. Information architecture

```
/                  Home
/projects          All projects, grouped: Professional · Hackathons · Academic
/projects/[slug]   Project page
/contact           Contact form
```

Navigation: fixed **left sidebar** on desktop (name, title, Home / Projects / Contact, then GitHub, LinkedIn, Credly, Resume PDF at the bottom). On mobile it becomes a **top bar with a menu button**. "Projects" stays active on `/projects/[slug]`.

External links:
- GitHub: https://github.com/DonCastillo
- LinkedIn: https://www.linkedin.com/in/don-castillo/
- Credly: https://www.credly.com/users/don-castillo/badges
- Resume: `/Don_Castillo_Resume.pdf` (in `public/`)

---

## 4. Design tokens (from the approved mockup)

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg: #FAFAF8;
  --color-surface: #F0F0EC;     /* active nav, callouts */
  --color-placeholder: #EDEDE8; /* image placeholders */
  --color-border: #E4E4E0;
  --color-border-strong: #D4D4CE;
  --color-ink: #18181B;
  --color-ink-2: #27272A;
  --color-body: #3F3F46;
  --color-muted: #52525B;
  --color-subtle: #5B5B63;      /* smallest text that still passes 4.5:1 */
  --color-accent: #0F6E6E;      /* deep teal */
  --color-accent-hover: #0B5454;

  --font-sans: var(--font-geist), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 10px;
}
```

Type scale: hero 72/1.0 (44 on mobile) · page H1 56 · H2 22–24 · body 15–20 · mono meta 12–13.
Layout: sidebar about 240px; content max-width 880px; padding 88px × 64px desktop, 48px × 20px mobile.
Rules: one accent colour only; mono font for numbers, dates and stack tags; touch targets ≥ 44px; no gradients, glassmorphism, skill bars or logo walls.

Dark mode: **phase 2 (optional).** Tokens are named so a `[data-theme="dark"]` override can be added later without touching components.

---

## 5. Content model

One MDX file per project in `content/projects/`. Frontmatter is validated at build. **An invalid file fails the build.**

```ts
// velite.config.ts (excerpt)
const projects = defineCollection({
  name: "Project",
  pattern: "projects/*.mdx",
  schema: s.object({
    title: s.string(),
    slug: s.slug("projects"),
    category: s.enum(["professional", "hackathon", "academic", "personal"]),
    summary: s.string().max(200),            // short description (cards + page intro)
    role: s.string().optional(),             // "Full Stack Mobile Developer"
    client: s.string().optional(),           // "University of Lethbridge"
    period: s.string(),                      // "2023 – Present"
    status: s.enum(["shipped", "in-progress"]).default("shipped"),

    // hackathon / academic context
    event: s.string().optional(),            // "HackED 2024" or "CPSC 4210 Capstone"
    award: s.string().optional(),            // "1st place, Best Use of AI"
    duration: s.string().optional(),         // "36 hrs"
    team: s.object({ size: s.number(), role: s.string() }).optional(),

    links: s.object({
      github: s.string().url().optional(),
      demo: s.string().url().optional(),     // demo video
      live: s.string().url().optional(),     // live site / app store
    }),
    sourceNote: s.string().optional(),       // "Source private (research project)"

    metrics: s.array(s.object({ value: s.string(), label: s.string() })).max(4).optional(),
    highlights: s.array(s.string()).min(2).max(5),
    stack: s.array(s.string()).min(1),

    cover: s.object({ src: s.string(), alt: s.string() }),   // path in public/, e.g. "/projects/gac-paq/cover.webp"
    gallery: s.array(s.object({
      src: s.string(),
      alt: s.string(),
      caption: s.string().optional(),
      kind: s.enum(["mobile", "desktop"]).default("desktop"),
    })).default([]),

    featured: s.boolean().default(false),
    order: s.number(),
    body: s.mdx(),                           // optional longer write-up
  }),
});
```

Rules:
- `links.*` are all optional. The UI **hides** missing links. If `github` is missing and `sourceNote` is set, the note is shown instead of a dead button.
- `highlights` describe **what I did**, starting with a verb, ideally with a number.
- For team projects, highlights must say which part I built.
- Gallery: `mobile` images render in portrait 9:19 tiles; `desktop` images render full-width 16:9 below them.
- Image paths must exist in `public/`. A build check fails on a missing file.

### Project content (initial)

| Slug | Category | Featured | Status |
|---|---|---|---|
| `gac-paq` | professional | ✅ | Ready to write |
| `media-optimization-pipeline` | professional | ✅ | Ready to write |
| `headless-cms-migration` | professional | | Ready to write |
| `markbound` | professional | ✅ | In progress label |
| `[hackathon-1]` | hackathon | | **Need project list** |
| `[hackathon-2]` | hackathon | | **Need project list** |
| `[academic-1]` | academic | | **Need project list** |
| `[academic-2]` | academic | | **Need project list** |

---

## 6. Directory structure

```
.
├── PLAN.md
├── README.md                  # architecture, decisions, AI-assisted workflow
├── content/
│   └── projects/*.mdx
├── public/
│   ├── Don_Castillo_Resume.pdf
│   ├── projects/<slug>/      # cover.webp, 01.webp, 02.webp… (optimized output)
│   └── __forms.html           # static form so Netlify detects the contact form
├── src/
│   ├── app/
│   │   ├── layout.tsx         # fonts, <Sidebar/>, <MobileNav/>, main shell
│   │   ├── page.tsx           # Home
│   │   ├── projects/
│   │   │   ├── page.tsx       # grouped index
│   │   │   └── [slug]/page.tsx  # generateStaticParams + generateMetadata
│   │   ├── contact/page.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx  # + per-project OG image
│   ├── components/
│   │   ├── layout/   Sidebar.tsx · MobileNav.tsx · NavLink.tsx
│   │   ├── home/     Hero.tsx · ImpactStrip.tsx · ExperienceList.tsx · Education.tsx · ClosingCta.tsx
│   │   ├── project/  ProjectCard.tsx · ProjectHeader.tsx · ProjectLinks.tsx · DemoVideo.tsx
│   │   │             Metrics.tsx · Highlights.tsx · StackTags.tsx · Gallery.tsx · NextProject.tsx
│   │   ├── contact/  ContactForm.tsx
│   │   └── ui/       Button.tsx · Badge.tsx · Placeholder.tsx · ProjectImage.tsx (the one place images are rendered)
│   ├── data/                  # plain data, no logic
│   │   ├── site.ts            # name, title, location, links, nav items
│   │   ├── experience.ts      # typed roles for the home page
│   │   └── education.ts
│   └── lib/                   # helper logic
│       ├── projects.ts        # getProjects, getProject, getFeatured, groupByCategory, getNext
│       └── seo.ts
├── assets/projects/<slug>/    # original screenshots (PNG/JPG), input to the image script
├── scripts/optimize-images.mjs  # sharp: resize + convert assets/ → public/projects/
├── tests/smoke.spec.ts
├── .github/workflows/ci.yml
├── lighthouserc.json
└── netlify.toml
```

---

## 7. Page specs

### Home `/`
1. **Hero:** mono eyebrow "FULL STACK SOFTWARE ENGINEER · CALGARY, AB (RELOCATING)", name, a 2-sentence intro, buttons **Download resume** and **Get in touch**.
2. **Impact strip:** `5+ yrs` · `17 · 23` countries/languages · `−90%` bandwidth · `20+` sites migrated.
3. **Featured projects:** 3 cards from `featured: true`, sorted by `order`, with a "View all projects →" link.
4. **Experience:** 4 rows (dates · role · company · one line), from `data/experience.ts`.
5. **Education & certifications:** BSc (Great Distinction), Diploma (Honours), "9 IBM certifications…" linking to Credly.
6. **Closing CTA:** "Open to full stack and frontend roles in Calgary or remote." → Contact.

### Projects `/projects`
- Header: count, H1, one-line intro.
- Sections in order: **Professional**, **Hackathons**, **Academic** (and Personal if used). An empty section is not rendered.
- Card: cover (16:10), title, period, status/award badge, event line (hackathon/academic), summary, stack.
- Grid: `repeat(auto-fit, minmax(320px, 1fr))`.

### Project `/projects/[slug]`
Order: ← All projects · **Title** · Summary · Meta line (role · client/event · period · team) · **Links** (Live ↗, Demo video ↗, GitHub ↗ or source note) · **Demo video** (poster + play button, loads on click) · **Metrics** (if any) · **What I did** (highlights) · **Tech stack** (tags) · **Gallery** (mobile tiles, then desktop images; lightbox on click) · optional MDX body · **Next project →**.

### Contact `/contact`
- Fields: name, email, message, plus a hidden honeypot. All are labelled `<label>`s with native validation.
- Submits with `fetch` to `/__forms.html` (Netlify Forms with Next.js), showing inline **sending / success / error** states and no page redirect.
- Side column: LinkedIn, GitHub, Credly, location.

---

## 8. Cross-cutting requirements

**Accessibility:** semantic landmarks (`aside`, `nav`, `main`, `article`); `aria-current="page"` on the active nav link; visible focus rings; a skip-to-content link; alt text required by the schema; colour contrast ≥ 4.5:1; mobile menu with `aria-expanded` that closes on Escape and on route change; respects `prefers-reduced-motion`.

**SEO:** `generateMetadata` per page; canonical URLs; Open Graph and Twitter cards; OG images generated at build (site default + one per project, showing title and headline metric); `sitemap.xml`; `robots.txt`; JSON-LD `Person` on the home page.

**Performance budget:** LCP < 2.0s on mobile; CLS < 0.05; JS on the home page < 100 KB gzipped; images pre-converted to WebP (cover ≤ 1600px wide, gallery ≤ 1200px, phone shots ≤ 800px, each ≤ 250 KB), with explicit `width`/`height` to prevent layout shift and `loading="lazy"` below the fold; video iframe only after click.

---

## 9. Quality and CI

`.github/workflows/ci.yml` runs on every PR and push to `main`:
1. `pnpm install --frozen-lockfile`
2. `pnpm lint` (ESLint + Next config) and `pnpm format:check` (Prettier)
3. `pnpm typecheck` (`tsc --noEmit`)
4. `pnpm build` (this also validates all content via Velite)
5. `pnpm test:e2e`: Playwright smoke tests:
   - home renders the hero and 3 featured cards
   - every project card link resolves to a 200 page
   - mobile menu opens, closes and navigates
   - contact form shows a validation error on an empty submit
6. Lighthouse CI on `/`, `/projects` and one project page, failing if any score is < 95

Netlify deploy previews on every PR; production deploys from `main`.

---

## 10. Build order (milestones)

Each milestone ends with a deploy to a preview URL.

### M0: Setup (≈ 2 hrs)
- [x] Create public repo `portfolio`; Next.js + TS strict + Tailwind v4 + ESLint + Prettier + pnpm
- [x] `output: "export"` and `images: { unoptimized: true }` in `next.config.ts`, `netlify.toml`
- [x] `scripts/optimize-images.mjs` with `sharp`; run it as `pnpm images` and in `prebuild`
- [x] Connect Netlify; first deploy of the hello-world page
- [x] Add `PLAN.md`, a stub `README.md`, and a CI workflow (lint, typecheck, build)

**Done when:** a preview URL deploys from a PR and CI is green.

### M1: Layout shell (≈ 3 hrs)
- [x] Tokens + fonts in `globals.css` / `layout.tsx`
- [x] `Sidebar`, `NavLink` (active state, including nested `/projects/*`), `MobileNav`
- [x] Skip link, `not-found.tsx`, `data/site.ts`

**Done when:** all four routes exist with placeholder content and the nav works on desktop and mobile.

### M2: Content layer (≈ 2 hrs)
- [x] Velite config + schema (section 5)
- [ ] `lib/projects.ts` helpers with unit-level type safety
- [ ] Write `gac-paq.mdx` as the reference project (real content, placeholder images)

**Done when:** an invalid frontmatter field fails the build with a clear error.

### M3: Project page (≈ 4 hrs)
- [ ] `ProjectHeader`, `ProjectLinks` (hide missing, show source note), `DemoVideo` (click to load)
- [ ] `Metrics`, `Highlights`, `StackTags`, `Gallery` + lightbox, `NextProject`
- [ ] `generateStaticParams`, `generateMetadata`

**Done when:** `/projects/gac-paq` matches the mockup at 1440px and 390px.

### M4: Projects index (≈ 2 hrs)
- [ ] `ProjectCard` with badges (in progress, award) and event line
- [ ] Grouped sections; empty groups hidden
- [ ] Add MDX files for media pipeline, CMS migration and MarkBound

### M5: Home (≈ 3 hrs)
- [ ] `Hero`, `ImpactStrip`, featured cards, `ExperienceList`, `Education`, `ClosingCta`
- [ ] `data/experience.ts`, `data/education.ts`

### M6: Contact (≈ 2 hrs)
- [ ] `ContactForm` + `public/__forms.html` + honeypot
- [ ] Inline states; test a real submission on the Netlify preview

### M7: SEO, analytics, polish (≈ 3 hrs)
- [ ] OG images, sitemap, robots, JSON-LD
- [ ] Analytics script
- [ ] Accessibility pass (keyboard only, screen reader spot check, axe)
- [ ] Playwright smoke tests + Lighthouse CI added to the workflow

### M8: Content and launch (≈ 3 hrs + content time)
- [ ] Real screenshots and cover images in `assets/projects/`, run through `pnpm images`; demo videos uploaded to YouTube (unlisted)
- [ ] Hackathon and academic projects added (or their sections removed)
- [ ] Resume PDF in `public/`
- [ ] Custom domain + HTTPS; final Lighthouse run
- [ ] README finished (section 12); link the site from LinkedIn, GitHub profile and resume

**Total:** about 24 hours of build time, which fits two weekends.

---

## 11. Content checklist (Don to gather)

| Item | For | Status |
|---|---|---|
| Hackathon project list (name, event, year, award, team size, my role, stack, repo) | Projects | ☐ |
| School / capstone project list (same fields) | Projects | ☐ |
| GAC-PAQ: 5–6 phone screenshots (include RTL + a CJK language), 1 admin portal screenshot | Gallery | ☐ |
| GAC-PAQ: App Store / Google Play links (check what the study allows) | Links | ☐ |
| GAC-PAQ: admin portal stack and database | Stack | ☐ |
| Demo videos (60–120 s each) for GAC-PAQ and MarkBound | Demo | ☐ |
| Media pipeline: before/after numbers or a simple architecture diagram | Gallery | ☐ |
| CMS migration: architecture diagram (Hugo → Directus) | Gallery | ☐ |
| Client permission for live links to Tangle Media sites | Links | ☐ |
| Current resume PDF | Resume | ☐ |
| Domain name chosen and purchased | Launch | ☐ |

---

## 12. README outline

1. What this is + live link + Lighthouse badge
2. Stack and why (short version of section 2)
3. Architecture: static export, typed MDX content, build-time image optimization
4. Adding a project (one MDX file; the schema enforces the rest)
5. Quality: CI steps, tests, performance budget
6. **How I used AI:** built with Claude Code; I owned the architecture and component design and reviewed every change; examples of what I changed or rejected
7. Local development commands

---

## 13. Open decisions

| # | Decision | Default if not decided |
|---|---|---|
| 1 | Domain name | `doncastillo.dev` |
| 2 | Plausible (paid, nicer) vs Netlify Analytics | Netlify Analytics |
| 3 | Demo video host | YouTube unlisted |
| 7 | Move images to Cloudinary later | Optional: swap `ProjectImage` to a Cloudinary loader; content paths stay the same shape |
| 4 | Dark mode in v1 or later | Later |
| 5 | Keep "Personal" category | Only if a personal project qualifies |
| 6 | Optional MDX long-form body on project pages | Supported, unused at launch |
