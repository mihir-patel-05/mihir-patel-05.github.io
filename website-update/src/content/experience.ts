// Roles, newest first. `date` is shown as written; keep it to a year or a range.
export type Role = { company: string; role: string; date: string; bullets: string[] };

export const experience: Role[] = [
  {
    company: "Meijer",
    role: "Data Science Intern",
    date: "2026",
    bullets: [
      "Unified 20+ behavioural datasets and 3M+ rows into a queryable model on Databricks.",
      "Built attribution models on the behavioural data.",
      "Developed a retrieval-grounded analytics agent for non-technical stakeholders.",
    ],
  },
  {
    company: "Michigan State University",
    role: "Undergraduate Learning Assistant, CMSE 201",
    date: "2026 to present",
    bullets: [
      "Support 30+ students a semester in computational modelling and data analysis.",
      "Lead labs that connect statistics to practical analysis in Python.",
    ],
  },
  {
    company: "Voya Financial",
    role: "Data Engineering Intern",
    date: "2025",
    bullets: [
      "Built ingestion pipelines for Oracle datasets with Microsoft Fabric and Apache Spark.",
      "Developed semantic models and Power BI dashboards for eight cost centres.",
      "Improved data processing speed by 32%.",
    ],
  },
];
