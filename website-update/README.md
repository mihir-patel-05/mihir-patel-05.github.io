# Mihir Patel — Personal Website

Redesigned with a warm editorial aesthetic using the cornsilk / tea green / bronze palette.

## Stack
Vite + React 19 + TypeScript + Tailwind + shadcn/ui

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Design notes
- **Type**: Fraunces (display serif), Inter (body), JetBrains Mono (metadata)
- **Palette**: tokens defined in `src/index.css` under `:root`. Change hex values there once; Tailwind picks them up via the `hsl(var(--x))` pattern.
- **Sections**: Hero, About, Experience, Projects, Skills (as "Toolkit"), Education, Contact
- **No more**: neural-net bg, typing animation, gradient glow, fake skill-bar percentages

## Content to update
- `src/components/Experience.tsx` — `experiences` array
- `src/components/Projects.tsx` — `projects` array
- `src/components/Skills.tsx` — `categories` array
- `src/components/Education.tsx` — `courses` array
- `src/components/Hero.tsx` — headline name + intro
- `src/components/About.tsx` — about copy + principles
- `public/linkedin-profile.jpg` — swap with a new photo if needed
