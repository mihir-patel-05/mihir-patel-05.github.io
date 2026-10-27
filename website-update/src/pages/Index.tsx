import ThemeToggle from "@/components/ThemeToggle";
import { courseworkAreas } from "@/content/coursework";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { currentRead, favorites } from "@/content/reading";
import { site } from "@/content/site";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "writing", label: "Writing" },
  { id: "now", label: "Now" },
  { id: "contact", label: "Contact" },
];

const inProgress = courseworkAreas.flatMap(area => area.courses.filter(course => course.inProgress));

// "A, B and C."
const sentenceList = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

const Index = () => (
  <>
    <a className="skip" href="#projects">Skip to projects</a>
    <div className="page">
      <nav className="nav" aria-label="Site">
        <a className="nav-name" href="#top">{site.name}</a>
        <ul>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>)}</ul>
      </nav>

      <header className="hero" id="top">
        <img className="portrait" src="/linkedin-profile.jpg" alt="Mihir Patel" width="128" height="128" fetchPriority="high" />
        <h1 className="greeting">{site.greeting}</h1>
        {site.about.map(paragraph => <p className="about" key={paragraph}>{paragraph}</p>)}
        <p className="links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </p>
      </header>
      <div className="rule" aria-hidden="true" />

      <main>
        <section className="section" id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">Projects</h2>
          <p className="lead">{site.projectsLead}</p>
          <ul className="project-grid">
            {projects.map(project => (
              <li className="project" key={project.href}>
                <h3><a href={project.href} target="_blank" rel="noopener noreferrer">{project.name}</a></h3>
                <p>{project.description}</p>
                <p className="meta">{project.tools}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <p className="lead">{site.experienceLead}</p>
          <ul className="roles">
            {experience.map(job => (
              <li className="role" key={job.company + job.role}>
                <h3>{job.company}</h3>
                <p className="meta">{job.role} · {job.date}</p>
                <p>{job.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="writing" aria-labelledby="writing-title">
          <h2 id="writing-title">Writing</h2>
          <p className="lead">{site.writingLead}</p>
          <p><a className="button" href={site.essays} target="_blank" rel="noopener noreferrer">{site.writingLink} ↗</a></p>
        </section>

        <section className="section" id="now" aria-labelledby="now-title">
          <h2 id="now-title">Now</h2>
          <p className="lead">What I'm up to this term.</p>
          <ul className="now-list">
            <li><strong>Teaching</strong> CMSE 201 as a learning assistant, thirty-plus students a semester.</li>
            {inProgress.length > 0 && <li><strong>Studying</strong> {sentenceList(inProgress.map(course => course.title))}.</li>}
            {currentRead && <li><strong>Reading</strong> <em>{currentRead.title}</em> by {currentRead.author}.</li>}
            {favorites.length > 0 && (
              <li><strong>Books I'd recommend</strong> {favorites.map((book, index) => <span key={book.title}><em>{book.title}</em>{index < favorites.length - 2 ? ", " : index === favorites.length - 2 ? " and " : "."}</span>)}</li>
            )}
          </ul>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p className="lead">{site.contactLead}</p>
          <p><a className="button" href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="links"><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </section>
      </main>

      <footer className="footer">
        <span>{site.name} · {site.location} · Updated {site.updated}</span>
        <ThemeToggle />
      </footer>
    </div>
  </>
);

export default Index;
