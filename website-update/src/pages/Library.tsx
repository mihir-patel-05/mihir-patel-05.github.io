import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookMarked, BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import LibraryScene, { type LibraryBook } from "@/components/library/LibraryScene";
import { alpineExperience, alpineProjects } from "@/components/alpine/trail";
import { courseworkAreas, courseworkSummary } from "@/components/library/coursework";
import { favorites } from "@/components/library/reading";
import "@/styles/library.css";

const volumes: { id: LibraryBook; label: string; caption: string }[] = [
  { id: "about", label: "About", caption: "The person behind the work" },
  { id: "projects", label: "Projects", caption: "Things I've built" },
  { id: "experience", label: "Experience", caption: "Where I've practiced" },
  { id: "coursework", label: "Coursework", caption: "What I've studied" },
  { id: "contact", label: "Contact", caption: "The next conversation" },
];
// Scroll stages: the entrance, one per volume, then the return view.
const lastStage = volumes.length + 1;
const pad = (value: number) => String(value).padStart(2, "0");

function ExperiencePages() {
  const [page, setPage] = useState(0);
  const job = alpineExperience[page];

  return <>
    <div className="library-page library-page-title"><span className="library-page-number">Volume III · Experience</span><h2 id="open-volume-title">The work<br /><em>in practice.</em></h2><p>Hands-on roles across data science, engineering, and teaching have made me a better builder and a clearer communicator.</p><span className="library-page-footer">Analytics · Engineering · Teaching</span></div>
    <div className="library-page library-page-detail library-paged-detail"><span className="library-page-number">Experience · {String(page + 1).padStart(2, "0")}</span><article key={job.company} className="library-featured-entry library-job-feature" aria-live="polite"><span>{job.date}</span><h3>{job.company}</h3><strong>{job.role}</strong><ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></article><nav className="library-page-controls" aria-label="Experience pages"><button type="button" onClick={() => setPage(previous => previous - 1)} disabled={page === 0} aria-label="Previous experience"><ChevronLeft size={18} /> Previous</button><span>Page {page + 1} of {alpineExperience.length}</span><button type="button" onClick={() => setPage(previous => previous + 1)} disabled={page === alpineExperience.length - 1} aria-label="Next experience">Next <ChevronRight size={18} /></button></nav></div>
  </>;
}

function ProjectPages() {
  const [page, setPage] = useState(0);
  const project = alpineProjects[page];

  return <>
    <div className="library-page library-page-title"><span className="library-page-number">Volume II · Projects</span><h2 id="open-volume-title">Ideas made<br /><em>useful.</em></h2><p>Four projects that show how I approach research, modeling, and shipping software.</p><a className="library-page-link" href="https://github.com/mihir-patel-05?tab=repositories" target="_blank" rel="noopener noreferrer">All repositories <ArrowUpRight size={17} /></a><span className="library-page-footer">Selected work · 2025—2026</span></div>
    <div className="library-page library-page-detail library-paged-detail"><span className="library-page-number">Project · {project.number}</span><article key={project.href} className="library-featured-entry library-project-feature" aria-live="polite"><span>{project.discipline}</span><h3>{project.name}</h3><p>{project.description}</p><small>{project.tools}</small><a href={project.href} target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={18} /></a></article><nav className="library-page-controls" aria-label="Project pages"><button type="button" onClick={() => setPage(previous => previous - 1)} disabled={page === 0} aria-label="Previous project"><ChevronLeft size={18} /> Previous</button><span>Page {page + 1} of {alpineProjects.length}</span><button type="button" onClick={() => setPage(previous => previous + 1)} disabled={page === alpineProjects.length - 1} aria-label="Next project">Next <ChevronRight size={18} /></button></nav></div>
  </>;
}

function CourseworkPages() {
  const [page, setPage] = useState(0);
  const area = courseworkAreas[page];

  return <>
    <div className="library-page library-page-title"><span className="library-page-number">Volume IV · Coursework</span><h2 id="open-volume-title">Learning<br /><em>by degree.</em></h2><p>Data Science at Michigan State University with a Business minor, grounded in mathematics, statistics, and computing.</p><dl className="library-transcript-stats"><div><dt>Cumulative GPA</dt><dd>{courseworkSummary.gpa}</dd></div><div><dt>Credits earned</dt><dd>{courseworkSummary.credits}</dd></div><div><dt>Dean’s List</dt><dd>{courseworkSummary.deansList}<small> terms</small></dd></div></dl><span className="library-page-footer">Michigan State University · Class of 2027</span></div>
    <div className="library-page library-page-detail library-paged-detail"><span className="library-page-number">Coursework · {pad(page + 1)}</span><article key={area.name} className="library-featured-entry library-course-feature" aria-live="polite"><span>{area.blurb}</span><h3>{area.name}</h3><ul>{area.courses.map(course => <li key={course.code}><span>{course.code}</span>{course.title}{course.inProgress && <small title={`In progress · ${courseworkSummary.inProgressTerm}`}>In progress</small>}</li>)}</ul></article><nav className="library-page-controls" aria-label="Coursework pages"><button type="button" onClick={() => setPage(previous => previous - 1)} disabled={page === 0} aria-label="Previous subject"><ChevronLeft size={18} /> Previous</button><span>Page {page + 1} of {courseworkAreas.length}</span><button type="button" onClick={() => setPage(previous => previous + 1)} disabled={page === courseworkAreas.length - 1} aria-label="Next subject">Next <ChevronRight size={18} /></button></nav></div>
  </>;
}

function VolumeContent({ book }: { book: LibraryBook }) {
  if (book === "about") return <>
    <div className="library-page library-page-title library-about-page"><span className="library-page-number">Volume I · About</span><img className="library-headshot" src="/linkedin-profile.jpg" alt="Mihir Patel" width="800" height="800" /><h2 id="open-volume-title">A curious mind,<br /><em>put to work.</em></h2><p>I’m Mihir Patel, a Data Science student at Michigan State University with a Business minor. I like finding the structure in complicated information, then building something useful from it.</p><span className="library-page-footer">Michigan State University · Class of 2027</span></div>
    <div className="library-page library-page-detail"><h3>What I bring to the table</h3><p>I move between analysis and implementation: exploring data, testing ideas, and turning the results into software people can use.</p><dl className="library-skills"><div><dt>Analysis</dt><dd>Python, SQL, Pandas, Scikit-learn</dd></div><div><dt>Software</dt><dd>TypeScript, React, Next.js, Node.js</dd></div><div><dt>Data systems</dt><dd>PostgreSQL, Spark, Databricks, AWS</dd></div></dl><p className="library-margin-note">Currently open to Data Science and Software Engineering opportunities.</p></div>
  </>;
  if (book === "projects") return <ProjectPages />;
  if (book === "experience") return <ExperiencePages />;
  if (book === "coursework") return <CourseworkPages />;
  return <>
    <div className="library-page library-page-title"><span className="library-page-number">Volume V · Contact</span><h2 id="open-volume-title">A new<br /><em>chapter?</em></h2><p>I’m looking for Data Science and Software Engineering roles. If you have a problem worth thinking through, I’d love to compare notes.</p><span className="library-page-footer">Open to opportunities</span></div>
    <div className="library-page library-page-detail"><h3>Let’s talk.</h3><p>Tell me what you’re building and where careful analysis or thoughtful software could help.</p><a className="library-email" href="mailto:mihirrpatel05@gmail.com">mihirrpatel05@gmail.com <ArrowUpRight size={20} /></a><div className="library-socials"><a href="https://www.linkedin.com/in/mihir-patel-a9a19821a/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} /></a><a href="https://github.com/mihir-patel-05" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /></a></div><p className="library-margin-note">Thanks for stopping by the library.</p></div>
  </>;
}

export default function Library() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const openRef = useRef<LibraryBook | null>(null);
  const favoritesRef = useRef(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openBook, setOpenBook] = useState<LibraryBook | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return;
    const stages = [document.getElementById("library-start")!, ...volumes.map(volume => document.getElementById(`library-${volume.id}`)!), document.getElementById("library-return")!];
    let frame = 0;
    const update = () => {
      frame = 0;
      const focus = scrollY + innerHeight * .5;
      const centers = stages.map(stage => { const rect = stage.getBoundingClientRect(); return scrollY + rect.top + rect.height / 2; });
      let progress = 0;
      for (let i = 0; i < centers.length - 1; i++) {
        if (focus >= centers[i + 1]) progress = i + 1;
        else if (focus > centers[i]) { progress = i + (focus - centers[i]) / (centers[i + 1] - centers[i]); break; }
        else break;
      }
      progressRef.current = Math.min(lastStage, progress);
      journey.style.setProperty("--library-progress", String(progressRef.current / lastStage));
      setActiveIndex(previous => { const next = Math.round(progressRef.current); return previous === next ? previous : next; });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    stages.forEach(stage => observer.observe(stage));
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); removeEventListener("scroll", schedule); removeEventListener("resize", schedule); };
  }, []);

  useEffect(() => {
    if (!openBook) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { openRef.current = null; setOpenBook(null); }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    addEventListener("keydown", onKeyDown);
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    return () => { document.body.style.overflow = previousOverflow; removeEventListener("keydown", onKeyDown); cancelAnimationFrame(frame); previousFocus?.focus({ preventScroll: true }); };
  }, [openBook]);

  const selectBook = (book: LibraryBook) => { openRef.current = book; setOpenBook(book); };
  const closeBook = () => { openRef.current = null; setOpenBook(null); };
  const toggleFavorites = () => { favoritesRef.current = !favoritesRef.current; setShowFavorites(favoritesRef.current); };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
  const current = activeIndex > 0 ? volumes[activeIndex - 1] : null;

  return <div className="library-site">
    <a className="library-skip" href="#library-main">Skip to content</a>
    <div className="library-journey" ref={journeyRef}>
      <div className="library-canvas"><LibraryScene progressRef={progressRef} openRef={openRef} favoritesRef={favoritesRef} onSelect={selectBook} /></div>
      <header className="library-header"><a href="#library-start" className="library-brand" aria-label="Back to the library entrance" onClick={event => { event.preventDefault(); scrollTo("library-start"); }}><BookOpen size={25} strokeWidth={1.5} /><span>MP · THE LIBRARY</span></a><h1 id="library-title">The library of <em>Mihir Patel.</em></h1><span className="library-header-end" aria-hidden="true">Five volumes · One story</span></header>
      <main id="library-main">
        <section id="library-start" className="library-stage library-start" aria-label="Library entrance" />
        {volumes.map((volume, index) => <section key={volume.id} id={`library-${volume.id}`} className="library-stage library-book-stage" aria-label={`Volume ${index + 1}: ${volume.label}`}><h2 className="library-visually-hidden">{volume.label}</h2></section>)}
        <section id="library-return" className="library-stage library-start" aria-label="Return to the full library view" />
      </main>
      <div className="library-reading-ui">{current ? <div className="library-chapter-note" aria-live="polite"><span>{pad(activeIndex)} / {pad(volumes.length)} · {current.caption}</span><strong>{current.label}</strong><small>Click the highlighted spine or open the book below.</small><button type="button" onClick={() => selectBook(current.id)}>Open {current.label} <ArrowUpRight size={17} /></button></div> : <div className="library-entry-cue"><span>Five volumes · one portfolio</span><p>Scroll toward a book, then click its binding to open a chapter.</p><button type="button" onClick={() => scrollTo("library-about")}>Start with About <ArrowUpRight size={16} /></button></div>}<nav className="library-volume-nav" aria-label="Library volumes">{volumes.map((volume, index) => <button key={volume.id} type="button" className={activeIndex === index + 1 ? "is-active" : ""} aria-current={activeIndex === index + 1 ? "location" : undefined} onClick={() => scrollTo(`library-${volume.id}`)}><span>{pad(index + 1)}</span>{volume.label}</button>)}</nav>{favorites.length > 0 && <div className="library-favorites"><button type="button" className="library-favorites-toggle" aria-pressed={showFavorites} aria-controls="library-favorites-list" onClick={toggleFavorites}><BookMarked size={16} strokeWidth={1.6} />Books I've read</button><ul id="library-favorites-list" className="library-favorites-list" hidden={!showFavorites}>{favorites.map(book => <li key={book.title}><strong>{book.title}</strong><small>{book.author}</small></li>)}</ul></div>}<div className="library-progress" aria-hidden="true"><span /></div></div>
    </div>
    {openBook && <div className="library-dialog-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) closeBook(); }}><section ref={dialogRef} className="library-dialog" role="dialog" aria-modal="true" aria-labelledby="open-volume-title"><button ref={closeRef} type="button" className="library-close" aria-label="Close book" onClick={closeBook}><X size={21} /></button><div className="library-book-spread"><VolumeContent book={openBook} /><div className="library-opening-cover" aria-hidden="true"><div className="library-cover-front"><span>M · P</span><strong>{volumes.find(volume => volume.id === openBook)?.label}</strong><small>THE LIBRARY</small></div><div className="library-cover-back" /></div></div></section></div>}
  </div>;
}
