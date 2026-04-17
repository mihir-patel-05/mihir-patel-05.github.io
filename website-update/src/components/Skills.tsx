interface Cat {
  letter: string;
  lbl: string;
  title: string;
  skills: { name: string; usage: string }[];
}

const categories: Cat[] = [
  {
    letter: "a.",
    lbl: "Data Engineering",
    title: "Pipelines & storage",
    skills: [
      { name: "Python", usage: "daily" },
      { name: "SQL", usage: "daily" },
      { name: "Apache Spark", usage: "prod" },
      { name: "Microsoft Fabric", usage: "prod" },
      { name: "ETL design", usage: "prod" },
    ],
  },
  {
    letter: "b.",
    lbl: "Analytics & BI",
    title: "Seeing the shape",
    skills: [
      { name: "Power BI", usage: "prod" },
      { name: "Tableau", usage: "freq" },
      { name: "Matplotlib / Seaborn", usage: "daily" },
      { name: "Statistical methods", usage: "daily" },
    ],
  },
  {
    letter: "c.",
    lbl: "Machine Learning",
    title: "Models that matter",
    skills: [
      { name: "Scikit-learn", usage: "daily" },
      { name: "TensorFlow", usage: "freq" },
      { name: "Predictive modeling", usage: "prod" },
      { name: "NLP fundamentals", usage: "learning" },
    ],
  },
  {
    letter: "d.",
    lbl: "Engineering",
    title: "Shipping the thing",
    skills: [
      { name: "Git / GitHub", usage: "daily" },
      { name: "REST APIs", usage: "freq" },
      { name: "Cloud (AWS, Azure)", usage: "freq" },
      { name: "React / TypeScript", usage: "freq" },
    ],
  },
];

const Skills = () => (
  <section id="toolkit" className="bg-papaya py-24 md:py-[140px] px-5 md:px-10">
    <div className="max-w-[1240px] mx-auto">
      <div className="reveal grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-10 items-end mb-12 md:mb-16">
        <span className="font-mono text-[12px] text-ink-faint tracking-[0.08em]">04 — Toolkit</span>
        <h2 className="font-serif-title text-[clamp(40px,6vw,72px)] leading-[1.02]">
          What I <em className="italic font-normal text-bronze-deep">reach for.</em>
        </h2>
      </div>

      <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-rule">
        {categories.map((c) => (
          <div
            key={c.lbl}
            className="px-8 py-9 bg-cornsilk border-r border-b border-rule hover:bg-beige transition-colors"
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-bronze-deep tracking-[0.1em] uppercase pb-4 border-b border-rule mb-5">
              <span>{c.lbl}</span>
              <span>{c.letter}</span>
            </div>
            <h3 className="font-serif-title text-[22px] mb-6">{c.title}</h3>
            <ul className="flex flex-col gap-2">
              {c.skills.map((s) => (
                <li key={s.name} className="flex justify-between items-baseline py-1 text-[15px] text-ink-soft">
                  <span>{s.name}</span>
                  <span className="flex-1 border-b border-dotted border-ink-faint mx-[10px] -translate-y-1" />
                  <span className="font-mono text-[11px] text-ink-faint">{s.usage}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
