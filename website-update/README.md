# Mihir Patel — The Library

The Vercel preview for `redesign_astra` builds only the library at `/`. The Vite production build uses `index.html` and `src/library-main.tsx`; it does not include the other page entries or their React components.

The mountain animation and original redesign remain in `designs/` for local comparison. Run `npm ci` and `npm run dev` in this directory, then open `/designs/mountains.html` or `/designs/original.html`. Their React components and styles remain under `src/`. The `designs/` folder is not a Vite production build input.

To check the library locally, run `npm run build` and inspect `dist/`, or run `npm run dev` and open `/`. Vercel configuration in this folder and at the repository root supports either project root setting while always publishing only `website-update/dist`.
