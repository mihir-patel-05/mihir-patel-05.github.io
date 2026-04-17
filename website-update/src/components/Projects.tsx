interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  links: { label: string; href: string; arr?: string }[];
  size: "lg" | "md" | "sm";
  featured?: boolean;
}

const projects: Project[] = [
  {
    num: "P·04 — 2025",
    title: "RespondXR",
    desc: "Turns anyone into a first responder. AI-powered emergency guidance that walks a bystander through the first 90 seconds — when an ambulance is still on its way.",
    tags: ["React Native", "Expo", "Gemini", "Anthropic", "Computer Vision"],
    links: [
      { label: "Visit site", href: "http://respondxr.tech/", arr: "→" },
      { label: "Source", href: "https://github.com/mihir-patel-05/Respond-XR", arr: "↗" },
    ],
    size: "lg",
    featured: true,
  },
  {
    num: "P·03 — 2025",
    title: "Event Check-in App",
    desc: "Full-stack event platform with Stripe payments and Typeform-driven registration for campus organizations.",
    tags: ["Next.js", "TypeScript", "Prisma", "MySQL", "Stripe"],
    links: [{ label: "Source", href: "https://github.com/mihir-patel-05/KDC_Checkin_2025", arr: "↗" }],
    size: "md",
  },
  {
    num: "P·01 — 2024",
    title: "March Madness Prediction Model",
    desc: "ML pipeline that predicts NCAA tournament outcomes using historical team metrics and bracket-structured features.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    links: [{ label: "Source", href: "https://github.com/mihir-patel-05/NCAA_College_Basketball_Analysis", arr: "↗" }],
    size: "sm",
  },
  {
    num: "P·02 — 2024",
    title: "War on Drugs Policy Analysis",
    desc: "Statistical investigation into the measurable outcomes of four decades of U.S. drug policy — methodology and findings published in repo.",
    tags: ["Python", "Statsmodels", "Seaborn"],
    links: [{ label: "Source", href: "https://github.com/mihir-patel-05/Analysis_War_on_Drugs_Policy", arr: "↗" }],
    size: "sm",
  },
];

const sizeClass: Record<Project["size"], string> = {
  lg: "md:col-span-7 bg-tea min-h-[420px]",
  md: "md:col-span-5",
  sm: "md:col-span-6",
};

const Projects = () => (
  <section id="projects" className="bg-beige py-24 md:py-[140px] px-5 md:px-10">
    <div className="max-w-[1240px] mx-auto">
      <div className="reveal grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-10 items-end mb-12 md:mb-16">
        <span className="font-mono text-[12px] text-ink-faint tracking-[0.08em]">03 — Projects</span>
        <h2 className="font-serif-title text-[clamp(40px,6vw,72px)] leading-[1.02]">
          Things I've <em className="italic font-normal text-bronze-deep">built.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
        {projects.map((p) => (
          <article
            key={p.num}
            className={`reveal relative overflow-hidden flex flex-col p-8 border border-rule min-h-[340px]
              bg-cornsilk transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_hsla(30,33%,18%,0.25)]
              ${sizeClass[p.size]}`}
          >
            {p.featured && (
              <span className="absolute top-8 right-8 font-mono text-[10px] tracking-[0.1em] uppercase px-[10px] py-1 border border-ink rounded-full bg-cornsilk">
                Featured
              </span>
            )}
            <div className="font-mono text-[11px] text-ink-faint tracking-[0.08em]">{p.num}</div>
            <h3
              className={`font-serif-title mt-4 mb-3 ${p.size === "lg" ? "text-[40px] leading-[1.05]" : "text-[26px] leading-[1.2]"}`}
              style={{ textWrap: "balance" as any }}
            >
              {p.title}
            </h3>
            <p className={`text-ink-soft leading-[1.5] flex-1 ${p.size === "lg" ? "text-[17px] max-w-[46ch]" : "text-[15px]"}`}>
              {p.desc}
            </p>

            <div className="flex flex-wrap gap-[6px] my-5 font-mono text-[11px]">
              {p.tags.map((t, i) => (
                <span key={t} className="text-ink-soft">
                  {t}
                  {i < p.tags.length - 1 && <span className="text-ink-faint mx-[2px]"> · </span>}
                </span>
              ))}
            </div>

            <div className="flex gap-5 font-mono text-[12px]">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-[6px] text-ink border-b border-bronze pb-[2px] hover:text-bronze-deep hover:gap-[10px] transition-all"
                >
                  {l.label}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-[2px]">{l.arr}</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
