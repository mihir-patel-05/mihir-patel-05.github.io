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
];
