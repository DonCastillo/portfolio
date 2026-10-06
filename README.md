# Don Castillo · Portfolio

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS v4, exported as a static site and hosted on Netlify.

The full plan, architecture and build order live in [`plan/PLAN.md`](plan/PLAN.md).

## Requirements

- Node.js 22 or newer
- pnpm 9 (`corepack enable` picks up the version pinned in `package.json`)

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Pages reload as you edit.

### Preview the production build

```bash
pnpm build   # optimizes images, then writes the static site to out/
pnpm start   # serves out/ at http://localhost:3000
```

Use this to check the site exactly as it will be deployed. `next start` does not work with a static export, so `pnpm start` uses [`serve`](https://github.com/vercel/serve) instead.

### Other commands

| Command          | What it does                                                 |
| ---------------- | ------------------------------------------------------------ |
| `pnpm images`    | Converts `assets/projects/**` to WebP in `public/projects/`  |
| `pnpm lint`      | ESLint                                                       |
| `pnpm format`    | Formats all files with Prettier (`format:check` only checks) |
| `pnpm typecheck` | Generates Next.js route types, then runs `tsc --noEmit`      |

## Images

Put original screenshots in `assets/projects/<slug>/` (PNG or JPG). `pnpm images` resizes them, converts them to WebP and writes them to `public/projects/<slug>/`, which is what the site serves. It also runs automatically before every build.

- `cover.*` → max 1600px wide
- portrait images (phone screenshots) → max 800px wide
- everything else → max 1200px wide
- every output must be ≤ 250 KB, or the build fails

`public/projects/` is generated, so it is not committed.

## Deploy to production (Netlify)

The site is plain static files in `out/`, so no server is needed. Build settings live in [`netlify.toml`](netlify.toml): command `pnpm build`, publish directory `out`, Node 22.

**First-time setup**

1. In Netlify, choose **Add new site → Import an existing project** and pick this GitHub repo.
2. Keep the build settings Netlify reads from `netlify.toml`. If it suggests a Next.js server setup, make sure the publish directory stays `out`.
3. Deploy.

**After that**

- Every push to `main` deploys to production.
- Every pull request gets its own preview URL.
- A custom domain can be added under **Domain management**; Netlify issues the HTTPS certificate automatically.
