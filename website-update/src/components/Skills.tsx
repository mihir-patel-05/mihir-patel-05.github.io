interface Cat {
  letter: string;
  lbl: string;
  title: string;
  skills: { name: string; usage: string }[];
}

const categories: Cat[] = [
  {
    letter: "a.",
    lbl: "Software Engineering",
    title: "Products & systems",
    skills: [
      { name: "TypeScript / JavaScript", usage: "daily" },
      { name: "React / Next.js", usage: "daily" },
      { name: "Node.js / Express", usage: "freq" },
      { name: "Swift / SwiftUI", usage: "freq" },
      { name: "REST API design", usage: "freq" },
    ],
  },
  {
    letter: "b.",
    lbl: "Machine Learning",
    title: "Models & evaluation",
    skills: [
      { name: "Python", usage: "daily" },
      { name: "Scikit-learn", usage: "daily" },
      { name: "TensorFlow", usage: "freq" },
      { name: "Computer vision / OCR", usage: "project" },
      { name: "Statistical modeling", usage: "daily" },
    ],
  },
  {
    letter: "c.",
    lbl: "Data & Backend",
    title: "Pipelines & persistence",
    skills: [
      { name: "SQL / PostgreSQL", usage: "daily" },
      { name: "Supabase", usage: "freq" },
      { name: "Prisma / Drizzle", usage: "freq" },
      { name: "Apache Spark", usage: "prod" },
      { name: "ETL & data modeling", usage: "prod" },
    ],
  },
  {
    letter: "d.",
    lbl: "Platform & Delivery",
    title: "From code to users",
    skills: [
      { name: "Git / GitHub", usage: "daily" },
      { name: "AWS / Azure", usage: "freq" },
      { name: "Docker", usage: "freq" },
      { name: "CI/CD", usage: "freq" },
      { name: "Testing & observability", usage: "growing" },
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
