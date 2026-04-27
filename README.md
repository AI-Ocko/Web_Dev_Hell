# Web Dev Hell

A public Notion-style personal site: journal, TV/movie reviews, watchlist, recipes, and coding projects. Built with [Astro](https://astro.build), Markdown-driven, brutalist styling, deployed to GitHub Pages.

## Stack

- **Astro 5** — static site generator with content collections
- **Markdown** — every entry is a `.md` file with zod-validated frontmatter
- **Brutalist CSS** — single `global.css`, system + monospace fonts, hard borders, no shadows/gradients, dark-mode via `prefers-color-scheme`
- **GitHub Pages** — deployed via GitHub Actions on push to `main`

## Project structure

```
.
├── astro.config.mjs            # site + base for GH Pages, noop image service
├── package.json
├── tsconfig.json
├── src/
│   ├── content/
│   │   ├── config.ts           # 5 collections + zod schemas
│   │   ├── journal/            # NNN-slug.md (writings)
│   │   ├── reviews/            # tv/movie reviews with ratings
│   │   ├── watchlist/          # queued tv/movies
│   │   ├── recipes/            # recipes with tags
│   │   └── projects/           # coding projects
│   ├── layouts/
│   │   ├── Base.astro          # nav + footer + global.css
│   │   └── Entry.astro         # single-entry wrapper
│   ├── pages/
│   │   ├── index.astro         # landing (sections + recent journal)
│   │   ├── about.astro
│   │   ├── journal/{index,[slug]}.astro
│   │   ├── reviews/{index,[slug]}.astro
│   │   ├── watchlist.astro
│   │   ├── recipes/{index,[slug]}.astro
│   │   └── projects/{index,[slug]}.astro
│   └── styles/global.css
└── .github/workflows/deploy.yml
```

## Content collections

Defined in `src/content/config.ts`. Every collection has a zod schema — bad frontmatter fails the build.

| Collection  | Frontmatter fields                                                       |
| ----------- | ------------------------------------------------------------------------ |
| `journal`   | `title`, `number`, `date`, `draft?`                                      |
| `reviews`   | `title`, `kind` (movie/tv), `year`, `rating` (1–5), `watchedOn`, `draft?`|
| `watchlist` | `title`, `kind`, `addedOn`, `source?`                                    |
| `recipes`   | `title`, `servings?`, `time?`, `tags[]`, `date`                          |
| `projects`  | `name`, `status` (active/shipped/archived), `repo?`, `demo?`, `stack[]`, `date` |

## Pages

- `/` — landing with section links + 3 most-recent journal entries
- `/about` — about page
- `/journal` and `/journal/<slug>` — list + entry
- `/reviews` and `/reviews/<slug>` — table with star ratings + entry
- `/watchlist` — single table page
- `/recipes` and `/recipes/<slug>` — list with tags + entry
- `/projects` and `/projects/<slug>` — list with status/stack + entry (with repo/demo links)

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/Web_Dev_Hell
npm run build    # static output to dist/
npm run preview  # preview production build
```

## Adding content

Drop a Markdown file into the right collection folder, commit, push. No code changes needed.

```markdown
---
title: "002: Some Title"
number: 2
date: 2026-05-01
---

Body in Markdown.
```

## Deployment

`.github/workflows/deploy.yml` runs on push to `main` using `withastro/action@v3` → `actions/deploy-pages@v4`.

One-time setup: in the GitHub repo settings → **Pages** → set **Source** to **GitHub Actions**.

Site URL: `https://ai-ocko.github.io/Web_Dev_Hell`

## Notes

- Astro's optional `sharp` image service is disabled in `astro.config.mjs` (`noop` service) because `node-gyp` fails to build sharp locally and no image optimization is currently used.
- Site is fully static — zero client JavaScript by default.

## Out of scope (for later)

Search, RSS, tag pages, comments, image optimization. Easy to bolt on once needed.
