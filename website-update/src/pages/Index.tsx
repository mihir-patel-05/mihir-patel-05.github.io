import ThemeToggle from "@/components/ThemeToggle";
import { courseworkAreas, courseworkSummary } from "@/content/coursework";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { currentRead, favorites } from "@/content/reading";
import { site } from "@/content/site";


// "STT 180 · CMSE 201, 202, 381 · CMSE 382 (in progress)": completed courses grouped by prefix,
// then the in-progress ones.
const courseLine = (courses: { code: string; inProgress?: boolean }[]) => {
  const done = courses.filter(course => !course.inProgress);
  const groups: string[] = [];
  for (const course of done) {
    const [prefix, number] = course.code.split(" ");
    const last = groups.at(-1);
    if (last?.startsWith(prefix + " ")) groups[groups.length - 1] = `${last}, ${number}`;
    else groups.push(course.code);
  }
  const inProgress = courses.filter(course => course.inProgress).map(course => course.code);
  if (inProgress.length) groups.push(`${inProgress.join(", ")} (in progress)`);
  return groups.join(" · ");
};


const Index = () => (
  <>
    <a className="skip" href="#projects">Skip to projects</a>
    <div className="page">
      <header className="header">
        <div>
          <h1 className="name">{site.name}</h1>
          <p className="intro">{site.intro}</p>
          <p className="links">
            <a href={`mailto:${site.email}`}>Email</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={site.essays} target="_blank" rel="noopener noreferrer">Essays ↗</a>
          </p>
        </div>
        <img className="portrait" src="/linkedin-profile.jpg" alt="Mihir Patel" width="96" height="96" fetchPriority="high" />
      </header>
      <div className="rule" aria-hidden="true" />
      <p className="now"><strong>Now.</strong> {site.now}{currentRead && <> Reading <em>{currentRead.title}</em>.</>}</p>

      <main>
        <section className="section" id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">Projects</h2>
          <ul>
            {projects.map(project => (
              <li className="entry" key={project.href}>
                <h3><a href={project.href} target="_blank" rel="noopener noreferrer">{project.name}</a></h3>
                <p>{project.description}</p>
                <p className="meta">{project.tools}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <ul>
            {experience.map(job => (
              <li className="entry job" key={job.company + job.role}>
                <p className="meta">{job.date}</p>
                <div>
                  <h3>{job.company}</h3>
                  <p className="meta">{job.role}</p>
                  <ul className="bullets">{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="education" aria-labelledby="education-title">
          <h2 id="education-title">Education</h2>
          <div>
            <div className="entry">
              <h3>Michigan State University</h3>
              <p className="meta">{courseworkSummary.degree} · {courseworkSummary.graduation} · GPA {courseworkSummary.gpa} · Dean's List, {courseworkSummary.deansList} terms</p>
            </div>
            <div className="entry courses">
              {courseworkAreas.map(area => (
                <div key={area.name}>
                  <h3>{area.name}</h3>
                  <span className="meta">{courseLine(area.courses)}</span>
                </div>
              ))}
            </div>
            {favorites.length > 0 && (
              <div className="entry">
                <p>Favourite books: {favorites.map((book, index) => <span key={book.title}><em>{book.title}</em>{index < favorites.length - 1 ? ", " : "."}</span>)}</p>
              </div>
            )}
          </div>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <div>
            <p className="intro" style={{ marginTop: 0 }}>{site.contact}</p>
            <p className="contact-action"><a className="button" href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
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
