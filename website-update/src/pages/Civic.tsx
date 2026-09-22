import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight, BookOpen, Landmark, MapPin } from "lucide-react";
import CivicScene, { type CivicView } from "@/components/civic/CivicScene";
import ThemeToggle from "@/components/ThemeToggle";
import { alpineExperience, alpineProjects } from "@/components/alpine/trail";
import "@/styles/civic.css";

const landmarks: { id: CivicView; section: string; label: string; caption: string }[] = [
  { id: "overview", section: "top", label: "The Mall", caption: "Start here" },
  { id: "lincoln", section: "civic-about", label: "Lincoln", caption: "About & interests" },
  { id: "monument", section: "civic-work", label: "Monument", caption: "Projects" },
  { id: "capitol", section: "civic-experience", label: "Capitol", caption: "Experience" },
];

export default function Civic() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activeView, setActiveView] = useState<CivicView>("overview");

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;
    const sections = landmarks.map(landmark => document.getElementById(landmark.section)!);
    let active: CivicView = "overview";
    let frame = 0;
    const update = () => {
      frame = 0;
      const focus = window.scrollY + window.innerHeight * (window.innerWidth <= 800 ? .72 : .52);
      const centers = sections.map(section => {
        const rect = section.getBoundingClientRect();
        return window.scrollY + rect.top + rect.height / 2;
      });
      let progress = 0;
      for (let index = 0; index < centers.length - 1; index++) {
        if (focus >= centers[index + 1]) {
          progress = index + 1;
        } else if (focus > centers[index]) {
          progress = index + (focus - centers[index]) / (centers[index + 1] - centers[index]);
          break;
        } else {
          break;
        }
      }
      progressRef.current = Math.min(3, progress);
      journey.style.setProperty("--civic-progress", String(progressRef.current / 3));
      const next = landmarks[Math.round(progressRef.current)].id;
      if (next !== active) { active = next; setActiveView(next); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resizeObserver = new ResizeObserver(schedule);
    sections.forEach(section => resizeObserver.observe(section));
    update();
    const initialFrame = requestAnimationFrame(() => {
      const target = sections.find(section => `#${section.id}` === window.location.hash);
      target?.scrollIntoView({ behavior: "instant", block: "start" });
      update();
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(initialFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="civic-page">
      <a className="civic-skip" href="#civic-main">Skip to content</a>
      <header className="civic-header">
        <a href="#top" className="civic-wordmark" aria-label="Mihir Patel, back to top">
          <Landmark size={24} strokeWidth={1.5} aria-hidden="true" />
          <span><strong>Mihir Patel</strong><small>A civic atlas</small></span>
        </a>
        <nav className="civic-nav" aria-label="Civic portfolio sections">
          <a href="#civic-about">About</a>
          <a href="#civic-work">Work</a>
          <a href="#civic-experience">Experience</a>
          <a href="#civic-contact">Contact</a>
        </nav>
        <div className="civic-header-actions">
          <a href="/" className="civic-back"><ArrowLeft size={15} aria-hidden="true" /> Original</a>
          <ThemeToggle />
        </div>
      </header>

      <main id="civic-main" tabIndex={-1}>
        <div className="civic-journey" ref={journeyRef}>
          <div className="civic-chapters">
            <section id="top" className="civic-chapter civic-hero" aria-labelledby="civic-title">
              <div className="civic-hero-copy">
                <p className="civic-eyebrow"><span className="civic-status" /> Open to Data Science & Software Engineering roles</p>
                <p className="civic-overline">The portfolio of Mihir Patel</p>
                <h1 id="civic-title">Understand the system.<br /><em>Build what matters.</em></h1>
                <p className="civic-lede">I study Data Science at Michigan State and build software that makes complex information easier to use. My interest in the American political system and Enlightenment thought keeps me asking how ideas, evidence, and institutions shape decisions.</p>
                <div className="civic-hero-links">
                  <a className="civic-primary" href="#civic-work">See my work <ArrowDown size={18} aria-hidden="true" /></a>
                  <a className="civic-secondary" href="mailto:mihirrpatel05@gmail.com">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
                <div className="civic-credentials"><span>Michigan State University</span><span>B.S. Data Science · Business minor</span><span>Class of 2027</span></div>
              </div>
            </section>

            <section id="civic-about" className="civic-chapter civic-inquiry" aria-labelledby="civic-about-title">
              <div className="civic-chapter-card">
                <p className="civic-section-index">01 / Lincoln Memorial · About</p>
                <BookOpen size={31} strokeWidth={1.25} aria-hidden="true" />
                <h2 id="civic-about-title">Read widely.<br /><em>Reason carefully.</em><br />Build deliberately.</h2>
                <div className="civic-inquiry-body"><p>What draws me to political history is the same habit I bring to technical work: look closely at the structure, question the assumptions, and make the result understandable to someone else.</p><p>In practice, that means digging into data, testing a model, and writing software people can actually use.</p></div>
                <div className="civic-skill-groups"><div><strong>Analysis</strong><span>Python · SQL · Pandas · Scikit-learn</span></div><div><strong>Software</strong><span>TypeScript · React · Next.js · Node.js</span></div><div><strong>Data systems</strong><span>PostgreSQL · Spark · Databricks · AWS</span></div></div>
              </div>
            </section>

            <section id="civic-work" className="civic-chapter civic-work" aria-labelledby="civic-work-title">
              <div className="civic-chapter-card">
                <div className="civic-section-intro"><p className="civic-section-index">02 / Washington Monument · Projects</p><h2 id="civic-work-title">Ideas made <em>useful.</em></h2><p>Selected projects where research, data, and software meet real questions.</p></div>
                <div className="civic-project-grid">{alpineProjects.map(project => (
                  <article className="civic-project" key={project.href}>
                    <div className="civic-project-top"><span>{project.number} / {project.discipline}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
                    <h3><a href={project.href} target="_blank" rel="noopener noreferrer">{project.name}</a></h3>
                    <p>{project.description}</p><p className="civic-tools">{project.tools}</p>
                  </article>
                ))}</div>
                <a className="civic-inline-link" href="https://github.com/mihir-patel-05?tab=repositories" target="_blank" rel="noopener noreferrer">Browse all repositories <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </section>

            <section id="civic-experience" className="civic-chapter civic-experience" aria-labelledby="civic-experience-title">
              <div className="civic-chapter-card">
                <div className="civic-section-intro"><p className="civic-section-index">03 / U.S. Capitol · Experience</p><h2 id="civic-experience-title">Work in <em>practice.</em></h2><p>Research instincts paired with delivery experience across analytics, engineering, and teaching.</p></div>
                <div className="civic-job-list">{alpineExperience.map(job => (
                  <article key={job.company} className="civic-job"><span className="civic-job-date">{job.date}</span><div><h3>{job.company}</h3><p className="civic-job-role">{job.role}</p><p>{job.description}</p></div><strong>{job.outcome}</strong></article>
                ))}</div>
              </div>
            </section>
          </div>

          <aside className="civic-map-panel" aria-label="Scroll through a stylized 3D National Mall">
            <div className="civic-map-heading"><span><MapPin size={15} aria-hidden="true" /> Washington, D.C.</span><span>Scroll to travel / 01—03</span></div>
            <CivicScene progressRef={progressRef} />
            <div className="civic-map-compass" aria-hidden="true">N <span>↑</span></div>
            <div className="civic-landmarks" role="navigation" aria-label="Landmark stops">
              {landmarks.map(landmark => (
                <a key={landmark.id} href={`#${landmark.section}`} className={activeView === landmark.id ? "is-active" : ""} aria-current={activeView === landmark.id ? "location" : undefined}>
                  <span>{landmark.label}</span><small>{landmark.caption}</small>
                </a>
              ))}
            </div>
            <p className="civic-map-note">A stylized National Mall, not to scale. <a href="https://www.nps.gov/places/000/national-mall.htm" target="_blank" rel="noopener noreferrer">About the Mall <ArrowUpRight size={12} aria-hidden="true" /></a></p>
            <div className="civic-map-progress" aria-hidden="true"><span /></div>
          </aside>
        </div>

        <section id="civic-contact" className="civic-contact" aria-labelledby="civic-contact-title">
          <p className="civic-section-index">04 / The next conversation</p>
          <h2 id="civic-contact-title">Have a problem worth <em>thinking through?</em></h2>
          <p>I’m looking for Data Science and Software Engineering opportunities. Let’s compare notes.</p>
          <a className="civic-contact-email" href="mailto:mihirrpatel05@gmail.com">mihirrpatel05@gmail.com <ArrowUpRight size={24} aria-hidden="true" /></a>
          <div className="civic-contact-links"><a href="https://www.linkedin.com/in/mihir-patel-a9a19821a/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a><a href="https://github.com/mihir-patel-05" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a><a href="/mountains.html">Mountain version <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </section>
      </main>
      <footer className="civic-footer"><span>© {new Date().getFullYear()} Mihir Patel</span><span>Designed for curiosity. Built for clarity.</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
