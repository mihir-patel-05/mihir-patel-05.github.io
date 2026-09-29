export const trailStops = [
  { id: "basecamp", label: "Start", terrain: "Basecamp", elevation: "1,200" },
  { id: "treeline", label: "About", terrain: "Treeline", elevation: "1,800" },
  { id: "ridgeline", label: "Projects", terrain: "Ridgeline", elevation: "2,400" },
  { id: "high-pass", label: "Experience", terrain: "High pass", elevation: "2,900" },
  { id: "summit", label: "Contact", terrain: "Summit", elevation: "3,400" },
] as const;

export const alpineProjects = [
  {
    name: "VoteInformed", discipline: "Software engineering", number: "01",
    description: "Connecting candidate records, campaign finance, and voting resources in one election research platform.",
    tools: "React / TypeScript / Express / PostgreSQL",
    href: "https://github.com/mihir-patel-05/2026Midterms",
  },
  {
    name: "PageFlow", discipline: "iOS app development", number: "02",
    description: "A gamified reading tracker with session timers, guided reflections, a quotes vault, and XP streaks, built offline-first with cloud sync.",
    tools: "Swift / SwiftUI / SwiftData / Firebase",
    href: "https://github.com/mihir-patel-05/Booktracking",
  },
  {
    name: "OzempicAI", discipline: "Full-stack engineering", number: "03",
    description: "An installable health and fitness PWA for logging meals, workouts, weight, and vitals, with analytics and row-level security on every user table.",
    tools: "React / TypeScript / Supabase / PWA",
    href: "https://github.com/mihir-patel-05/OzempicAI",
  },
  {
    name: "March Madness predictions", discipline: "Data science", number: "04",
    description: "Analyzing college basketball data and building machine learning models to predict tournament outcomes.",
    tools: "Python / Scikit-learn / Pandas",
    href: "https://github.com/mihir-patel-05/NCAA_College_Basketball_Analysis",
  },
  {
    name: "War on Drugs: a policy analysis", discipline: "Research & analysis", number: "05",
    description: "Examining the impact of drug policy through statistical analysis and data visualization.",
    tools: "Python / Statsmodels / Matplotlib",
    href: "https://github.com/mihir-patel-05/Analysis_War_on_Drugs_Policy",
  },
];

export const alpineExperience = [
  {
    company: "Meijer", role: "Data Science Intern", date: "2026",
    description: "Unified behavioral datasets on Databricks and built attribution models and a retrieval-grounded analytics agent.",
    outcome: "20+ datasets. 3M+ rows unified.",
    bullets: [
      "Unified 20+ behavioral datasets and 3M+ rows into a queryable model on Databricks.",
      "Built attribution models to analyze behavioral data.",
      "Developed a retrieval-grounded analytics agent for non-technical stakeholders.",
    ],
  },
  {
    company: "Michigan State University", role: "Undergraduate Learning Assistant · CMSE 201", date: "2026 — Present",
    description: "Lead labs and help students connect Python, computational modeling, and statistics to practical analysis.",
    outcome: "30+ students supported per semester.",
    bullets: [
      "Support 30+ students per semester in CMSE 201.",
      "Help students work through Python, computational modeling, and scientific computing.",
      "Lead labs connecting statistical concepts to practical data analysis.",
    ],
  },
  {
    company: "Voya Financial", role: "Data Engineering Intern", date: "2025",
    description: "Built ingestion pipelines with Microsoft Fabric and Spark, plus reporting models and Power BI dashboards.",
    outcome: "32% faster data processing.",
    bullets: [
      "Built ingestion pipelines for Oracle datasets using Microsoft Fabric and Apache Spark.",
      "Developed semantic models and Power BI dashboards for eight cost centers.",
      "Improved data processing speed by 32%.",
    ],
  },
];
