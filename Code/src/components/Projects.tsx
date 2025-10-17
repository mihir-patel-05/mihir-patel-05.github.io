import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "March Madness Outcome Prediction Model Development",
      description: "ML-powered model for predicting March Madness tournament outcomes",
      tags: ["Python", "Scikit-learn", "Pandas", "Numpy", "Machine Learning"],
      gradient: "from-primary/20 to-secondary/20"
    },
    {
      title: "War on Drugs Policy Analysis",
      description: "Statistical analysis of the impact of drug policies using Python",
      tags: ["Pyton", "Pandas", "NumPy", "NumPy", "Matplotlib", "Seaborn", "Statsmodels"],
      gradient: "from-secondary/20 to-accent/20"
    },
    {
      title: "Event Check-in APP",
      description: "Web app for event check-ins using TypeScript and React",
      tags: ["TypeScript", "React", "MySQL", "Next.js", "Tailwind CSS", "Stripe API", "Prisma", "Typeform API"],
      gradient: "from-accent/20 to-primary/20"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center font-serif text-foreground animate-fade-in">
          Featured Projects
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
          Explore my portfolio of data science and coding projects that demonstrate real-world problem-solving
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className={`bg-gradient-to-br ${project.gradient} border-border hover:shadow-mountain transition-all duration-500 hover:-translate-y-3 hover:scale-105 animate-fade-in-up group`}
              style={{ animationDelay: `${400 + index * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <CardHeader>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 border-primary/30 hover:bg-primary/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
