import { ArrowUpRight, Braces, GitBranch, FileText, Database } from "lucide-react";

const projects = [
  {
    title: "VoteInformed",
    category: "Full-stack engineering",
    description: "Making election research easier to navigate. Federal races, candidate records, and campaign finance come together through a typed API and automated FEC data pipelines.",
    tags: ["React", "TypeScript", "Express", "PostgreSQL"],
    href: "https://github.com/mihir-patel-05/2026Midterms",
    visual: "election",
  },
  {
    title: "March Madness predictions",
    category: "Machine learning · Sports analytics",
    description: "Exploring what the numbers can tell us about the tournament. A machine learning project for analyzing college basketball data and predicting March Madness outcomes.",
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    href: "https://github.com/mihir-patel-05/NCAA_College_Basketball_Analysis",
    visual: "bracket",
  },
];

const studies = [
  {
    title: "War on Drugs: a policy analysis",
    category: "Research & statistical analysis",
    description: "Examining the impact of drug policy through data, statistical analysis, and visualization.",
    tools: "Python · Statsmodels · Matplotlib",
    href: "https://github.com/mihir-patel-05/Analysis_War_on_Drugs_Policy",
    icon: FileText,
  },
  {
    title: "From scanned pages to structured text",
    category: "Applied ML & engineering",
    description: "A computer-vision pipeline that reconstructs technical documents as editable LaTeX and Markdown.",
    tools: "Python · OpenCV · Hugging Face",
    href: "https://github.com/mihir-patel-05/ocr-latex-md_mihir",
    icon: Braces,
  },
];

const ProjectVisual = ({ variant }: { variant: string }) => variant === "election" ? (
  <div className="project-visual election-visual" aria-hidden="true">
    <span className="visual-kicker">PUBLIC DATA → CLEARER CONTEXT</span>
    <div className="data-flow">
      <div className="source-docs"><span /><span /><span /></div>
      <span className="flow-line" />
      <div className="data-node"><Database size={30} strokeWidth={1.25} /></div>
      <span className="flow-line" />
      <div className="data-result"><span /><span /><span /></div>
    </div>
    <div className="visual-labels"><span>Records</span><span>Connect</span><span>Explore</span></div>
  </div>
) : (
  <div className="project-visual bracket-visual" aria-hidden="true">
    <span className="visual-kicker">THE TOURNAMENT, THROUGH DATA</span>
    <div className="bracket-art">
      <div className="bracket-round"><span /><span /><span /><span /></div>
      <div className="bracket-round second"><span /><span /></div>
      <div className="bracket-final"><GitBranch size={29} strokeWidth={1.3} /></div>
      <span className="bracket-question">What<br /><em>comes next?</em></span>
    </div>
    <span className="visual-footnote">Analyze / Model / Predict</span>
  </div>
);

const Projects = () => (
  <section id="projects" className="projects-section section-space" aria-labelledby="projects-title">
    <div className="container-shell">
      <div className="section-heading">
        <div><p className="eyebrow section-index">01 / Selected work</p><h2 id="projects-title">Questions explored.<br /><em>Ideas put to work.</em></h2></div>
        <p className="section-intro">A selection across data science,<br className="desktop-break" /> research, and software engineering.</p>
      </div>
      <div className="featured-projects">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <a className="project-visual-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
              <ProjectVisual variant={project.visual} />
              <span className="visual-arrow"><ArrowUpRight size={21} aria-hidden="true" /></span>
            </a>
            <div className="project-body">
              <p className="project-category"><span>0{index + 1}</span>{project.category}</p>
              <h3><a href={project.href} target="_blank" rel="noopener noreferrer">{project.title}<ArrowUpRight size={21} aria-hidden="true" /></a></h3>
              <p>{project.description}</p>
              <ul className="tag-list" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
      <div className="project-studies">
        {studies.map(({ icon: Icon, ...study }, index) => (
          <article className="study-row" key={study.title}>
            <span className="study-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.4} /></span>
            <div><p className="project-category">0{index + 3} / {study.category}</p><h3><a href={study.href} target="_blank" rel="noopener noreferrer">{study.title}<ArrowUpRight size={19} aria-hidden="true" /></a></h3><p>{study.description}</p></div>
            <span className="study-tools">{study.tools}</span>
          </article>
        ))}
      </div>
      <a className="text-link all-projects" href="https://github.com/mihir-patel-05?tab=repositories" target="_blank" rel="noopener noreferrer">More projects on GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
    </div>
  </section>
);
export default Projects;
