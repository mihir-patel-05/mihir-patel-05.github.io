// Selected projects. The title links to the live site when there is one, otherwise to the repository.
export type Project = {
  name: string;
  description: string;
  tools: string;
  /** The GitHub repository. */
  href: string;
  /** The live site, if the project has one. */
  site?: string;
};

export const projects: Project[] = [
  {
    name: "War Room by VoteInformed",
    description: "A free election-night dashboard for the 2026 midterms. Live results, poll closing times, prediction-market odds, campaign money and economic data for every House and Senate race, on one screen.",
    tools: "React, TypeScript, Express, PostgreSQL, Prisma, MapLibre",
    href: "https://github.com/mihir-patel-05/Mycroft_elections_analysis",
    site: "https://warroomlanding-testing.up.railway.app/",
  },
  {
    name: "Snap-a-Store",
    description: "Built at Cal Hacks 13.0. Photograph what you want to sell, and Claude proposes names and prices; publish the catalog and share a storefront QR code. Inventory is reserved at checkout and sold only after a verified Square payment.",
    tools: "Expo, React Native, TypeScript, Claude, Square, SQLite",
    href: "https://github.com/mihir-patel-05/snap_a_store",
  },
  {
    name: "OzempicAI",
    description: "An installable health and fitness tracker: meals and calories, water, weight, workouts with planned splits, meal plans, groceries and a range-based analytics dashboard. Every user table is protected by Postgres row-level security.",
    tools: "React, TypeScript, Hono, PostgreSQL, PWA, Railway",
    href: "https://github.com/mihir-patel-05/OzempicAI",
  },
  {
    name: "ATC Voice Sim",
    description: "An open-source air traffic control simulator you work by voice. Hold push-to-talk, speak real phraseology, and pilots read back and comply. Radar scope, flight strips and conflict alerts across 19 positions at 8 facilities, with a deterministic engine checking every instruction.",
    tools: "React, TypeScript, Zustand, Web Workers, OpenAI",
    href: "https://github.com/mihir-patel-05/ate_sim",
    site: "https://atesim-website.vercel.app/",
  },
  {
    name: "The Court of Decision",
    description: "A judicial-branch simulation. Nine AI justices, each with a distinct philosophy, read your brief, hear an AI opposing counsel, deliberate in private and hand down a written opinion of the court.",
    tools: "Next.js, TypeScript, Claude, Tailwind CSS",
    href: "https://github.com/mihir-patel-05/decison_making_supreme_court",
    site: "https://decisonmakingsupremecourt-website.vercel.app/",
  },
];
