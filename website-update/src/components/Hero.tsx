import { ArrowDown, ArrowUpRight } from "lucide-react";

const Hero = () => (
  <section id="top" className="hero container-shell" aria-labelledby="hero-title">
    <div className="hero-main">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Open to Data Science & SWE roles</p>
        <h1 id="hero-title">Mihir Patel<span className="title-dot">.</span></h1>
        <p className="hero-statement">Understand deeply.<br /><em>Build deliberately.</em></p>
        <p className="hero-description">I turn questions into analysis, and analysis into useful software. Studying Data Science at Michigan State, with a business perspective on the problems worth solving.</p>
        <div className="hero-actions">
          <a className="button-primary" href="#projects">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
          <a className="text-link" href="https://github.com/mihir-patel-05" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <figure className="hero-portrait">
        <div className="portrait-grid" aria-hidden="true"><span>01 / A little perspective</span><i>+</i></div>
        <div className="portrait-frame">
          <img src={`${import.meta.env.BASE_URL}linkedin-profile.jpg`} alt="Mihir Patel" width="800" height="800" fetchPriority="high" />
        </div>
        <figcaption><span>East Lansing, Michigan</span><span className="portrait-coordinate" aria-hidden="true">↗</span></figcaption>
      </figure>
    </div>
    <div className="principles" aria-label="What drives me">
      <div><span className="principle-number">01</span><h2>Analytics</h2><p>Follow the evidence.</p></div>
      <div><span className="principle-number">02</span><h2>Proactive</h2><p>Turn curiosity into action.</p></div>
      <div><span className="principle-number">03</span><h2>Strategic</h2><p>Keep the bigger picture in view.</p></div>
    </div>
  </section>
);
export default Hero;
