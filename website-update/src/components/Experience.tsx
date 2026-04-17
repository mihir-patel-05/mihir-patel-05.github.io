import { useState } from "react";

interface Achievement { value: string; label: string; }
interface Exp {
  year: string;
  role: string;
  company: string;
  loc: string;
  desc: string[];
  achievements: Achievement[];
  tags: string[];
}

const experiences: Exp[] = [
  {
    year: "2026 →",
    role: "Data Science / ML Intern",
    company: "Meijer",
    loc: "Grand Rapids, MI",
    desc: [
      "Incoming on the Data Science / ML team for Summer 2026.",
      "Details under NDA until start date.",
    ],
    achievements: [],
    tags: ["Data Science", "Machine Learning", "Python"],
  },
  {
    year: "2026 —",
    role: "Undergraduate Learning Assistant",
    company: "CMSE 201 · Michigan State",
    loc: "East Lansing, MI",
    desc: [
      "Hold weekly office hours for students learning introductory data analysis and computational methods.",
      "Coach on the practical side of Jupyter, Python, Matplotlib, and scikit-learn — the gap between reading docs and writing real analysis.",
      "Translate abstract statistics into concrete problem-solving intuition.",
    ],
    achievements: [],
    tags: ["Python", "Jupyter", "Matplotlib", "Scikit-learn", "Teaching"],
  },
  {
    year: "2025",
    role: "Data Analyst / Engineering Intern",
    company: "Voya Financial",
    loc: "Detroit, MI",
    desc: [
      "Engineered scalable ingestion pipelines in Microsoft Fabric + Apache Spark, processing 2M+ row datasets from Oracle ERP/EPM.",
      "Partnered with FP&A to design interactive Power BI dashboards serving 8 cost centers.",
      "Built & optimized 5 semantic models linked to Fabric Dataflows — the bones of the reporting system.",
    ],
    achievements: [
      { value: "32%", label: "Faster data processing" },
      { value: "30%", label: "Faster reporting" },
      { value: "2M+", label: "Rows per job" },
    ],
    tags: ["Power BI", "Microsoft Fabric", "Apache Spark", "SQL", "Python", "ETL"],
  },
];

const Experience = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="work" className="bg-cornsilk py-24 md:py-[140px] px-5 md:px-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="reveal grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-10 items-end mb-12 md:mb-16">
          <span className="font-mono text-[12px] text-ink-faint tracking-[0.08em]">02 — Work</span>
          <h2 className="font-serif-title text-[clamp(40px,6vw,72px)] leading-[1.02]">
            Selected <em className="italic font-normal text-bronze-deep">experience.</em>
          </h2>
        </div>

        <div className="border-t border-ink">
          {experiences.map((e, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="border-b border-rule cursor-pointer transition-[padding] duration-300 hover:pl-5"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-10 items-baseline py-8 md:py-9">
                  <div className="font-mono text-[13px] text-ink-soft tracking-[0.04em]">{e.year}</div>
                  <div className="font-serif-title text-[clamp(24px,3vw,36px)] leading-[1.15]">
                    {e.role},{" "}
                    <span className="italic font-normal text-bronze-deep">{e.company}</span>
                  </div>
                  <div className="font-mono text-[12px] text-ink-soft md:text-right">{e.loc}</div>
                </div>

                <div
                  className="overflow-hidden transition-[max-height] duration-500"
                  style={{ maxHeight: isOpen ? 600 : 0 }}
                >
                  <div className="bg-papaya p-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6 rounded-sm">
                    <ul className="list-none space-y-2">
                      {e.desc.map((d, j) => (
                        <li key={j} className="text-[15px] text-ink-soft leading-[1.55] pl-5 relative">
                          <span className="absolute left-0 top-[2px] text-bronze-deep font-serif">→</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-4">
                      {e.achievements.map((a, j) => (
                        <div key={j} className="p-4 bg-cornsilk border border-rule rounded-sm">
                          <div className="font-serif-title text-[48px] leading-none text-bronze-deep">{a.value}</div>
                          <div className="font-mono text-[11px] text-ink-soft mt-[6px] uppercase tracking-[0.04em]">
                            {a.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-[6px]">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] text-ink-soft px-[10px] py-1 bg-cornsilk border border-rule rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
