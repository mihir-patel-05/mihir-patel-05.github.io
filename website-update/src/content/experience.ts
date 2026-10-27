// Roles, newest first. `summary` is two or three sentences in the first person, not bullets.
export type Role = { company: string; role: string; date: string; summary: string };

export const experience: Role[] = [
  {
    company: "Meijer",
    role: "Data Science Intern",
    date: "Summer 2026",
    summary:
      "I unified more than twenty behavioural datasets, over three million rows, into one queryable model on Databricks, then built attribution models on top of it. I also developed a retrieval-grounded analytics agent so people outside the data team could ask questions of the data directly.",
  },
  {
    company: "Michigan State University",
    role: "Undergraduate Learning Assistant, CMSE 201",
    date: "2026 to present",
    summary:
      "I help thirty-plus students a semester get comfortable with Python, computational modelling and data analysis, and lead the labs that connect the statistics to real problems.",
  },
  {
    company: "Voya Financial",
    role: "Data Engineering Intern",
    date: "Summer 2025",
    summary:
      "I built ingestion pipelines for Oracle datasets with Microsoft Fabric and Apache Spark, and developed the semantic models and Power BI dashboards behind reporting for eight cost centres. The pipeline work made data processing 32% faster.",
  },
];
