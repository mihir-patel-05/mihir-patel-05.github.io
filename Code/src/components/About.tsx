import { Mountain, TrendingUp, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-serif text-foreground animate-fade-in">
            About Me
          </h2>
          
          {/* Profile Picture Section */}
          <div className="flex justify-center mb-12 animate-scale-in [animation-delay:200ms]" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
              <Avatar className="relative w-40 h-40 md:w-48 md:h-48 border-4 border-background shadow-mountain">
                <AvatarImage src="/placeholder.svg" alt="Profile" className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                  DS
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-12 text-center leading-relaxed animate-fade-in [animation-delay:400ms]" style={{ animationDelay: '400ms', opacity: 0, animationFillMode: 'forwards' }}>
            Just like exploring national parks reveals hidden natural wonders, I believe diving deep into data 
            uncovers valuable insights that drive meaningful business decisions. As an aspiring data scientist, 
            I'm passionate about transforming raw data into actionable solutions that solve real-world problems.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 rounded-lg bg-card hover:shadow-card transition-all duration-300 border border-border animate-slide-in-left [animation-delay:600ms] hover:-translate-y-2 group" style={{ animationDelay: '600ms', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:animate-float">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Explorer Mindset</h3>
              <p className="text-muted-foreground">
                Navigating complex datasets like uncharted territories to discover insights
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card hover:shadow-card transition-all duration-300 border border-border animate-fade-in-up [animation-delay:700ms] hover:-translate-y-2 group" style={{ animationDelay: '700ms', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:animate-float">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Data-Driven</h3>
              <p className="text-muted-foreground">
                Building scalable solutions that turn data into business value
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card hover:shadow-card transition-all duration-300 border border-border animate-slide-in-right [animation-delay:800ms] hover:-translate-y-2 group" style={{ animationDelay: '800ms', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:animate-float">
                <Users className="w-8 h-8 text-white" />
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
