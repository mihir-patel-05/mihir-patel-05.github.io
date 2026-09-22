const experiences = [
  {
    year: "2026", company: "Meijer", role: "Data Science Intern", location: "Grand Rapids, MI",
    description: "Unified 20+ behavioral datasets into a queryable model on Databricks. Built attribution models and a retrieval-grounded analytics agent for non-technical stakeholders.",
    result: "3M+ rows unified", tools: "Databricks · Python · SQL · Causal inference",
  },
  {
    year: "2026 — Present", company: "Michigan State University", role: "Undergraduate Learning Assistant · CMSE 201", location: "East Lansing, MI",
    description: "Help students work through Python, computational modeling, and scientific computing. Lead labs that connect statistical concepts to practical analysis.",
    result: "30+ students per semester", tools: "Python · Jupyter · Matplotlib · Scikit-learn",
  },
  {
    year: "2025", company: "Voya Financial", role: "Data Engineering Intern", location: "Detroit, MI",
    description: "Built ingestion pipelines in Microsoft Fabric and Apache Spark for Oracle datasets. Developed semantic models and Power BI dashboards for eight cost centers.",
    result: "32% faster data processing", tools: "Microsoft Fabric · Spark · SQL · Power BI",
  },
];

const Experience = () => (
  <section id="work" className="container-shell section-space" aria-labelledby="experience-title">
    <div className="section-heading"><div><p className="eyebrow section-index">02 / Experience</p><h2 id="experience-title">Putting it into practice.</h2></div><p className="section-intro">From business data to the classroom.</p></div>
    <div className="experience-list">
      {experiences.map(experience => (
        <article className="experience-row" key={experience.company}>
          <div className="experience-date"><span>{experience.year}</span><span>{experience.location}</span></div>
          <div className="experience-detail"><h3>{experience.company}</h3><p className="experience-role">{experience.role}</p><p>{experience.description}</p><p className="experience-tools">{experience.tools}</p></div>
          <div className="experience-result"><span className="result-mark" aria-hidden="true">↗</span>{experience.result}</div>
        </article>
      ))}
    </div>
  </section>
);
export default Experience;
