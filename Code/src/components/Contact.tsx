import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif text-foreground animate-fade-in">
            Let's Connect
          </h2>
          <p 
            className="text-lg text-muted-foreground mb-12 leading-relaxed animate-fade-in [animation-delay:200ms]" 
            style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}
          >
            Interested in collaborating on data science projects or discussing how data can solve your business challenges? 
            I'd love to hear from you!
          </p>

          <div 
            className="flex flex-wrap gap-4 justify-center mb-12 animate-fade-in-up [animation-delay:400ms]" 
            style={{ animationDelay: '400ms', opacity: 0, animationFillMode: 'forwards' }}
          >
            {/* Email Button */}
            <a href="mailto:mihirrpatel05@gmail.com" className="block">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-mountain transition-all hover:scale-110 hover:shadow-xl group"
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
                className="border-2 border-primary/30 hover:bg-primary/10 transition-all hover:scale-110 group"
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
                className="border-2 border-primary/30 hover:bg-primary/10 transition-all hover:scale-110 group"
              >
                <Github className="w-5 h-5 mr-2 group-hover:animate-float" />
                GitHub
              </Button>
            </a>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground">
              © 2025 Mihir Patel Portfolio. Built with passion for data and nature.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;