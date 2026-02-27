import { BrainCircuit, TrendingUp, Workflow } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const profileImageSrc = `${import.meta.env.BASE_URL}linkedin-profile.jpg`;

const About = () => {
  const [sectionRef, isVisible] = useIntersectionObserver(0.1);

  return (
    <section id="about" className="py-24 bg-background bg-grid-pattern">
      <div className="container mx-auto px-6" ref={sectionRef}>
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-serif text-foreground">
            About Me
          </h2>

          {/* Profile Picture Section */}
          <div className={`flex justify-center mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
              <Avatar className="relative w-40 h-40 md:w-48 md:h-48 border-4 border-background shadow-data">
                <AvatarImage src={profileImageSrc} alt="LinkedIn profile photo" className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                  MP
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <p className={`text-lg text-muted-foreground mb-12 text-center leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            I'm driven by the belief that every dataset tells a story waiting to be uncovered. As an aspiring data scientist,
            I combine statistical rigor with creative problem-solving to transform raw data into actionable insights
            that drive meaningful business decisions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className={`text-center p-6 rounded-lg bg-card hover:shadow-card transition-all duration-500 border border-border hover:-translate-y-2 group delay-[400ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:animate-float">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Explorer Mindset</h3>
              <p className="text-muted-foreground">
                Navigating complex datasets like uncharted territories to discover insights
              </p>
            </div>

            <div className={`text-center p-6 rounded-lg bg-card hover:shadow-card transition-all duration-500 border border-border hover:-translate-y-2 group delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:animate-float">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Data-Driven</h3>
              <p className="text-muted-foreground">
                Building scalable solutions that turn data into business value
              </p>
            </div>

            <div className={`text-center p-6 rounded-lg bg-card hover:shadow-card transition-all duration-500 border border-border hover:-translate-y-2 group delay-[600ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:animate-float">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Problem Solver</h3>
              <p className="text-muted-foreground">
                Translating business challenges into technical solutions with measurable impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
