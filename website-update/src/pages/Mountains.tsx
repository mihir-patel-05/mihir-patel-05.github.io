import { ArrowDown, ArrowLeft, ArrowUpRight, Mountain, Footprints, Compass } from "lucide-react";
import AlpineLandscape from "@/components/alpine/AlpineLandscape";
import { useAlpineJourney } from "@/components/alpine/useAlpineJourney";
import ThemeToggle from "@/components/ThemeToggle";
import { alpineExperience, alpineProjects, trailStops } from "@/components/alpine/trail";
import "@/styles/alpine.css";

const Mountains = () => {
  const { root, activeStop, handleNavigation } = useAlpineJourney();
  const current = trailStops.find(stop => stop.id === activeStop)!;

  return (
  <div ref={root} onClick={handleNavigation} className="alpine-page" data-stage={activeStop}>
    <AlpineLandscape />
    <a className="alpine-skip" href="#alpine-main">Skip to content</a>
    <header className="alpine-header">
      <a className="alpine-brand" href="#basecamp"><Mountain size={25} strokeWidth={1.4} aria-hidden="true" /><span>Mihir Patel<span className="alpine-brand-caption">The scenic route</span></span></a>
      <nav className="alpine-nav" aria-label="Mountain portfolio sections">
        {trailStops.map(stop => <a key={stop.id} href={`#${stop.id}`} aria-current={activeStop === stop.id ? "location" : undefined}>{stop.label}</a>)}
      </nav>
      <div className="alpine-header-tools"><a className="alpine-original" href="/" aria-label="Compare with the original portfolio"><ArrowLeft size={15} aria-hidden="true" /><span>Original</span></a><ThemeToggle /></div>
    </header>

    <aside className="alpine-trail-indicator" aria-label="Your place on the mountain">
      <span className="alpine-trail-label">The ascent</span>
      <div className="alpine-waypoints">{trailStops.map((stop, index) => <a key={stop.id} href={`#${stop.id}`} className={activeStop === stop.id ? "is-current" : ""} aria-label={`${stop.terrain}: ${stop.label}`} aria-current={activeStop === stop.id ? "location" : undefined}><span>{String(index).padStart(2, "0")}</span><i /></a>)}</div>
      <span className="alpine-current-elevation">{current.elevation}<small>meters</small></span>
    </aside>
    <div className="alpine-scroll-meter" aria-hidden="true"><span /></div>
    <main id="alpine-main" tabIndex={-1}>
      <section id="basecamp" className="alpine-stage alpine-hero" aria-labelledby="alpine-title" tabIndex={-1}>
        <div className="alpine-hero-copy" data-reveal>
          <p className="alpine-kicker"><span className="alpine-status" /> The portfolio of Mihir Patel</p>
          <h1 id="alpine-title">Always<br /><em>exploring.</em></h1>
          <p className="alpine-hero-intro">Data science. Software. The great outdoors.</p>
          <p className="alpine-hero-description">An analytical mind, a proactive approach, and a love for the trail. I follow good questions wherever they lead.</p>
          <a className="alpine-button" href="#treeline">Start the ascent <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <div className="alpine-hero-bottom"><span><Footprints size={17} aria-hidden="true" /> Scroll to explore</span><span>Michigan State · Data Science ’27</span><span>Open to Data Science & SWE roles</span></div>
      </section>

      <section id="treeline" className="alpine-stage" aria-labelledby="treeline-title" tabIndex={-1}>
        <div className="alpine-paper alpine-about" data-reveal>
          <p className="alpine-kicker">01 / Treeline <span>1,800 m</span></p>
          <h2 id="treeline-title">A little about<br /><em>the explorer.</em></h2>
          <p>I’m Mihir, a Data Science student at Michigan State with a minor in Business. I like researching a topic, digging into the data, and writing until I can explain what I’ve learned.</p>
          <p>I bring that same curiosity to software: understand the problem, test the assumptions, then build something useful. Away from a screen, you’ll find me hiking.</p>
          <div className="alpine-values"><span>Analytics</span><span>Proactive</span><span>Strategic</span></div>
          <div className="alpine-pack"><p className="alpine-kicker"><Compass size={16} aria-hidden="true" /> In my pack</p><dl><div><dt>Analyze</dt><dd>Python, SQL, Pandas, Scikit-learn</dd></div><div><dt>Build</dt><dd>TypeScript, React, Next.js, Node.js</dd></div><div><dt>Connect</dt><dd>PostgreSQL, Spark, Databricks, AWS</dd></div></dl></div>
          <div className="alpine-education"><img src={`${import.meta.env.BASE_URL}linkedin-profile.jpg`} alt="Mihir Patel" width="56" height="56" loading="lazy" /><div><strong>Michigan State University</strong><span>B.S. Data Science · Business minor</span><span>Expected May 2027</span></div></div>
        </div>
        <div className="alpine-field-note" aria-hidden="true"><span>FIELD NOTE / 01</span><p>There’s usually more<br />to discover.</p><span className="alpine-note-line" /></div>
      </section>

      <section id="ridgeline" className="alpine-stage alpine-project-stage" aria-labelledby="ridgeline-title" tabIndex={-1}>
        <div className="alpine-paper alpine-projects" data-reveal>
          <p className="alpine-kicker">02 / Ridgeline <span>2,400 m</span></p>
          <div className="alpine-section-heading"><h2 id="ridgeline-title">Routes I’ve<br /><em>explored.</em></h2><p>Selected projects in<br />data and software.</p></div>
          <div className="alpine-project-list">{alpineProjects.map(project => (
            <article className="alpine-project" key={project.href} data-reveal>
              <div className="alpine-project-meta"><span>{project.number}</span><span>{project.discipline}</span></div>
              <h3><a href={project.href} target="_blank" rel="noopener noreferrer">{project.name}<ArrowUpRight size={21} aria-hidden="true" /></a></h3>
              <p>{project.description}</p><p className="alpine-tools">{project.tools}</p>
            </article>
          ))}</div>
          <a className="alpine-text-link" href="https://github.com/mihir-patel-05?tab=repositories" target="_blank" rel="noopener noreferrer">All projects on GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </section>

      <section id="high-pass" className="alpine-stage" aria-labelledby="high-pass-title" tabIndex={-1}>
        <div className="alpine-paper alpine-work" data-reveal>
          <p className="alpine-kicker">03 / High pass <span>2,900 m</span></p>
          <h2 id="high-pass-title">Experience<br /><em>along the way.</em></h2>
          <div className="alpine-experience-list">{alpineExperience.map(job => (
            <article key={job.company} data-reveal><p className="alpine-job-date">{job.date}</p><h3>{job.company}</h3><p className="alpine-job-role">{job.role}</p><p>{job.description}</p><p className="alpine-outcome">↗ {job.outcome}</p></article>
          ))}</div>
        </div>
        <div className="alpine-field-note alpine-note-right" aria-hidden="true"><span>FIELD NOTE / 02</span><p>Perspective is earned<br />one step at a time.</p><span className="alpine-note-line" /></div>
      </section>

      <section id="summit" className="alpine-stage alpine-summit" aria-labelledby="summit-title" tabIndex={-1}>
        <div className="alpine-paper alpine-contact" data-reveal>
          <span className="alpine-summit-icon"><Mountain size={36} strokeWidth={1.2} aria-hidden="true" /></span>
          <p className="alpine-kicker">04 / Summit · 3,400 m</p>
          <h2 id="summit-title">The next<br /><em>adventure.</em></h2>
          <p>I’m looking for opportunities in Data Science and Software Engineering. Have a good problem to work on? I’d love to hear about it.</p>
          <a className="alpine-email" href="mailto:mihirrpatel05@gmail.com">mihirrpatel05@gmail.com <ArrowUpRight size={20} aria-hidden="true" /></a>
          <div className="alpine-socials"><a href="https://www.linkedin.com/in/mihir-patel-a9a19821a/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a><a href="https://github.com/mihir-patel-05" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        </div>
        <footer className="alpine-footer"><span>© {new Date().getFullYear()} Mihir Patel</span><a href="/">Compare with original <ArrowUpRight size={14} aria-hidden="true" /></a><a href="/library.html">Library version <ArrowUpRight size={14} aria-hidden="true" /></a><a href="#basecamp">Back to basecamp ↑</a></footer>
      </section>
    </main>
  </div>
  );
};
export default Mountains;
