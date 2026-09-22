import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => (
  <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Nav />
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Projects />
      <Experience />
      <About />
    </main>
    <Contact />
  </>
);
export default Index;
