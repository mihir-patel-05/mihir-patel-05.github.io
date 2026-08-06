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
    num: "P·01 — 2026",
    title: "VoteInformed",
    desc: "A nonpartisan election intelligence platform that brings federal races, candidate records, campaign finance, and voting resources into one evidence-first experience. A React frontend is backed by a typed Express API and automated FEC data pipelines.",
    tags: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma", "Data Pipelines"],
    links: [
      { label: "Source", href: "https://github.com/mihir-patel-05/2026Midterms", arr: "↗" },
    ],
    size: "lg",
    featured: true,
  },
  {
    num: "P·02 — 2026",
    title: "Arc Life Planner",
    desc: "A full-stack planning workspace for mapping long-term goals on branching timelines. Built with authenticated server actions, a relational schema, and row-level security so personal plans stay private by design.",
    tags: ["Next.js", "TypeScript", "Supabase", "Drizzle", "PostgreSQL"],
    links: [{ label: "Source", href: "https://github.com/mihir-patel-05/Life_Planning_app", arr: "↗" }],
    size: "md",
  },
  {
    num: "P·03 — 2026",
    title: "OCR to LaTeX & Markdown",
    desc: "A computer-vision pipeline for turning scanned technical documents into structured, editable text. It combines image processing and symbol recognition with spatial parsing to reconstruct equations as LaTeX and document structure as Markdown.",
    tags: ["Python", "OpenCV", "Hugging Face", "Scikit-learn", "AST Parsing"],
    links: [{ label: "Source", href: "https://github.com/mihir-patel-05/ocr-latex-md_mihir", arr: "↗" }],
    size: "sm",
  },
  {
    num: "P·04 — 2026",
    title: "PageFlow",
    desc: "An offline-first iOS reading companion that turns sessions into a searchable knowledge base. Timers, reflections, quotes, streaks, and progress analytics are stored locally first and synced securely in the background.",
    tags: ["Swift", "SwiftUI", "SwiftData", "Supabase", "Google Books API"],
    links: [{ label: "Source", href: "https://github.com/mihir-patel-05/Booktracking", arr: "↗" }],
    size: "sm",
  },
  {
    num: "P·05 — 2026",
    title: "OzempicAI",
    desc: "An installable health and fitness PWA built for fast, mobile-first tracking. The current web architecture combines typed React components, cached server state, Supabase persistence, and Workbox-powered offline behavior.",
    tags: ["React", "TypeScript", "PWA", "Supabase", "TanStack Query"],
    links: [{ label: "Source", href: "https://github.com/mihir-patel-05/OzempicAI", arr: "↗" }],
    size: "sm",
  },
  {
    num: "P·06 — 2025",
    title: "RespondXR",
    desc: "An AI-assisted mobile guide for the first critical moments of an emergency. It translates a stressful scene into clear, step-by-step actions while professional responders are still on the way.",
    tags: ["React Native", "Expo", "Gemini", "Anthropic", "Computer Vision"],
    links: [
      { label: "Visit site", href: "https://respondxr.tech/", arr: "→" },
      { label: "Source", href: "https://github.com/mihir-patel-05/Respond-XR", arr: "↗" },
    ],
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <h2 className="font-serif-title text-[clamp(40px,6vw,72px)] leading-[1.02]">
            Things I've <em className="italic font-normal text-bronze-deep">built.</em>
          </h2>
          <a
            href="https://github.com/mihir-patel-05?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 font-mono text-[12px] text-ink border-b border-bronze pb-[2px] hover:text-bronze-deep transition-colors"
          >
            View all on GitHub <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
          </a>
        </div>
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
              style={{ textWrap: "balance" }}
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
