# Mihir Patel — personal site

One page, built with Vite and React, deployed from this folder by Vercel (`vercel.json` at the repository root builds `website-update/` and publishes `dist/`).

## Run locally

```bash
npm ci
npm run dev
```

## Check and build

```bash
npm run typecheck
npm run lint
npm run build
```

`dist/` holds `index.html`, `404.html`, the stylesheet and one small script.

## Where things live

- `src/content/` is the only place copy and lists change: `site.ts` (greeting, about, section leads, updated date), `projects.ts`, `experience.ts`, `coursework.ts`, `reading.ts`.
- `src/pages/Index.tsx` lays the content out. `src/styles/paper.css` holds the design tokens and every style.
- `src/components/ThemeToggle.tsx` is the Dark / Light link in the footer. The page follows the system theme until a choice is saved under `mihir-portfolio-theme` in local storage; `index.html` applies the saved choice before first paint.
- `public/` has the favicon, the portrait (also the social preview image) and `robots.txt`.

## Design

Paper: a document. White page, Source Serif 4, deep-navy text and one blue (`#1a4fd6`) for links, the header rule and the email button; a navy page with a lighter blue in dark mode. One centred column: a greeting and first-person about, then Projects as a two-column grid, Experience as short prose per role, Writing, Now and Contact. No cards, icons, motion or component library. The tokens and the reasoning are in the "Mihir Patel Site Redesign" design system.

## Browser checks

Both themes, the saved theme after reload, 320px width, keyboard focus on every link and the toggle, reduced motion, and `/404.html`.
