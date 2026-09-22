import Education from "./Education";
import Skills from "./Skills";

const About = () => (
  <section id="about" className="about-section section-space" aria-labelledby="about-title">
    <div className="container-shell about-grid">
      <div className="about-copy"><p className="eyebrow section-index">03 / A little about me</p><h2 id="about-title">The question<br /><em>comes first.</em></h2>
        <p>I like going past the headline: researching a topic, working through the data, and writing until I can explain what I’ve learned clearly.</p>
        <p>That curiosity carries into how I build. I want to understand the problem, test my assumptions, and make something useful. Studying business alongside data science helps me connect technical decisions to the people they affect.</p>
        <Education />
      </div>
      <Skills />
    </div>
  </section>
);
export default About;
