# Mihir Patel — Portfolio

The active website lives here. Deployment configurations at the repository root build `website-update/`; `Code/` is an older version.

## Run locally

```bash
npm ci --legacy-peer-deps
npm run dev
```

## Validate and build

```bash
npx tsc --noEmit -p tsconfig.app.json
npm run build
```

Vite, React, TypeScript, and Tailwind power the site. Existing Vercel Analytics and Speed Insights integrations are preserved.

## Design and content

- Palette: `#e7ecef`, `#274c77`, `#6096ba`, `#a3cef1`, `#8b8c89`, with lighter and darker surface shades for contrast. Semantic theme tokens and responsive styles live in `src/index.css`.
- Typography: Inter for headings and body, Fraunces for emphasis, JetBrains Mono for small annotations. System fallbacks work without Google Fonts.
- Theme: follows the system preference initially; the header switch saves an explicit light/dark choice in local storage under `mihir-portfolio-theme`.
- Page: introduction → selected projects → experience → about / education / toolkit → contact.
- `src/components/Projects.tsx` holds selected projects and research. Illustrations are conceptual diagrams, not measured results or app screenshots.
- `src/components/Experience.tsx` holds roles and metrics retained from the previous portfolio.
- `Hero.tsx`, `About.tsx`, `Education.tsx`, `Skills.tsx`, and `Contact.tsx` contain their respective copy.
- `public/linkedin-profile.jpg` is the existing portrait. Metadata is in `index.html`.

## Browser checks

Check desktop and narrow mobile layouts in both themes. Verify theme persistence after reload, system theme on a fresh visit, mobile menu opening/closing and Escape focus return, section links, keyboard focus, reduced motion, and the 404 page. Contact uses an email link; there is no submission form or backend.

## Rollback

The redesign is separated into theme foundation, page redesign, and final polish commits. Use `git log --oneline` to identify the change to undo, then `git revert <commit>` to preserve history. To undo the whole redesign, revert its commits newest first. Later commits build on earlier ones, so reverting only the foundation while keeping the layout requires reconciling theme dependencies.
