import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mountains.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif tracking-tight relative inline-block">
            <span className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-white pr-1 animate-typing">
              Mihir Patel
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 max-w-2xl mx-auto font-light animate-fade-in [animation-delay:3500ms]" style={{ animationDelay: '3500ms', opacity: 0, animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent animate-pulse-glow">
              Data Scientist & Analytics Enthusiast
            </span>
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200 font-light animate-fade-in [animation-delay:4000ms]" style={{ animationDelay: '4000ms', opacity: 0, animationFillMode: 'forwards' }}>
            Solving complex business problems through data-driven solutions
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in [animation-delay:4500ms]" style={{ animationDelay: '4500ms', opacity: 0, animationFillMode: 'forwards' }}>
            <Button 
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-mountain transition-all hover:scale-110 hover:shadow-xl"
            >
              View My Work
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-2 border-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all hover:scale-110"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer"
        aria-label="Scroll to content"
      >
        <ArrowDown className="w-8 h-8 text-white/80" />
      </button>
    </section>
  );
};

export default Hero;
