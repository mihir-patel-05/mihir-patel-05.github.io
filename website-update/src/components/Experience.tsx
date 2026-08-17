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
    year: "May - Aug. 2026",
    role: "Data Science Intern",
    company: "Meijer",
    loc: "Grand Rapids, MI",
    desc: [
      "Designed and built a unified customer-journey data platform on Databricks, architecting the schema and ingestion layer to consolidate 20+ datasets (3M+ rows) into one queryable model powering cross-channel attribution.",
      "Shipped a production LLM agent (Databricks Genie) for natural-language querying by non-technical stakeholders, with scoped table permissions, tuned retrieval context, and secured testing to eliminate hallucinated responses before release.",
      "Modeled multi-channel attribution across 3 marketing channels, surfacing spend inefficiencies that drove budget reallocation and a ~30% lift in customer conversions.",
    ],
    achievements: [
      { value: "20+", label: "Datasets unified" },
      { value: "3M+", label: "Rows consolidated" },
      { value: "~30%", label: "Lift in conversions" },
    ],
    tags: ["Databricks", "Databricks Genie", "LLM Integration", "Data Modeling", "Data Engineering"],
  },
  {
    year: "June - Aug. 2025",
    role: "Data Engineer Intern",
    company: "Voya Financial",
    loc: "Detroit, MI",
    desc: [
      "Re-architected enterprise data pipelines from Alteryx to Microsoft Fabric on Apache Spark, cutting refresh time 32% through distributed processing and query optimization.",
      "Automated recurring reporting into scheduled, monitored jobs across 8 cost centers, replacing hand-run refreshes with reliable, fault-tolerant execution.",
      "Designed and optimized 5 semantic models (Power BI + Fabric Dataflows) over 2M+ row datasets from Oracle ERP/EPM systems, cutting reporting turnaround 30%.",
    ],
    achievements: [
      { value: "32%", label: "Faster refreshes" },
      { value: "8", label: "Cost centers automated" },
      { value: "30%", label: "Faster reporting" },
    ],
    tags: ["Alteryx", "Microsoft Fabric", "Apache Spark", "Power BI", "Fabric Dataflows", "Oracle ERP/EPM"],
  },
  {
    year: "Jan. 2026 - Present",
    role: "Undergraduate Learning Assistant",
    company: "Michigan State University",
    loc: "East Lansing, MI",
    desc: [
      "Mentored 30+ students per semester in Python programming, data structures, and computational problem-solving through one-on-one and small-group sessions.",
      "Led weekly lab sessions on core scientific-computing libraries (NumPy, Pandas, Matplotlib), reinforcing debugging and data-modeling workflows.",
    ],
    achievements: [
      { value: "30+", label: "Students mentored per semester" },
    ],
    tags: ["Python", "Data Structures", "NumPy", "Pandas", "Matplotlib", "Mentoring"],
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
