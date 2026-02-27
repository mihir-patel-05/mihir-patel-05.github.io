import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Contact = () => {
  const [sectionRef, isVisible] = useIntersectionObserver(0.1);

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-muted/30 to-background bg-grid-pattern">
      <div className="container mx-auto px-6" ref={sectionRef}>
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif text-foreground">
            Let's Connect
          </h2>
          <p className={`text-lg text-muted-foreground mb-4 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Interested in collaborating on data science projects or discussing how data can solve your business challenges?
            I'd love to hear from you!
          </p>

          {/* Terminal element */}
          <p className={`font-mono text-sm text-accent/70 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            &gt; ready_to_connect = True
          </p>

          <div className={`flex flex-wrap gap-4 justify-center mb-12 transition-all duration-700 delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Email Button */}
            <a href="mailto:mihirrpatel05@gmail.com" className="block">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-data transition-all hover:scale-110 hover:shadow-xl hover:animate-node-glow group"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:animate-float" />
                Email Me
              </Button>
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/mihir-patel-a9a19821a/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:bg-primary/10 transition-all hover:scale-110 hover:animate-node-glow group"
              >
                <Linkedin className="w-5 h-5 mr-2 group-hover:animate-float" />
                LinkedIn
              </Button>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/mihir-patel-05"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:bg-primary/10 transition-all hover:scale-110 hover:animate-node-glow group"
              >
                <Github className="w-5 h-5 mr-2 group-hover:animate-float" />
                GitHub
              </Button>
            </a>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground">
              &copy; 2025 Mihir Patel Portfolio. Built with passion for data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
