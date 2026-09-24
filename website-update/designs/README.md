# Earlier portfolio design notes

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

## Alternative: the alpine portfolio

Compare the original at `/` with the mountain design at `/mountains.html`.
The original page and its components are unchanged. Vite builds two actual HTML
entry points, so `mountains.html` also works on static hosting without an SPA rewrite.

- `src/pages/Mountains.tsx`: the standalone alternative's page composition.
- `src/components/alpine/trail.ts`: five elevation stops, selected projects, and experience.
- `src/components/alpine/AlpineLandscape.tsx`: original layered SVG terrain, snow, forest, contours, and the ascent route.
- `src/components/alpine/useAlpineJourney.ts`: scroll progress, route marker, active sections, progressive reveals, direct-link alignment, and keyboard focus.
- `src/styles/alpine.css`: scoped natural alpine day/night palettes and responsive layout.

The landscape is an Alps-inspired illustration, not a map of a real trail; elevations
are narrative markers. Scroll follows Basecamp → Treeline (About) → Ridgeline
(Projects) → High pass (Experience) → Summit (Contact). The persistent section
navigation works without scrolling through every chapter. The Original link returns
to the first design for comparison.

Layered SVG supplies scroll-driven depth without Three.js or an additional rendering
dependency. The alternative is lazy-loaded. Scroll work is batched into animation
frames, and React only updates when the active section changes. Reduced-motion
preferences disable parallax and reveals; content remains visible if IntersectionObserver
is unavailable. Both designs share the saved light/dark preference, with separate palettes.

Verification includes production builds, TypeScript, lint on changed files, direct
static-page loading, chapter deep links, section navigation/focus, both themes, mobile
widths down to 320 px, desktop text enlargement, reduced motion, and return to the
original. Accessibility scans reported no violations; text over illustrated backgrounds
also requires visual review because automated contrast detection cannot resolve SVG layers.

The alternative is committed separately as page foundation, animated landscape, and
navigation/accessibility polish. Revert those commits newest first to remove it.
