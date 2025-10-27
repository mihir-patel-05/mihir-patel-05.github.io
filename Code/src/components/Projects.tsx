import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "March Madness Outcome Prediction Model Development",
      description: "ML-powered model for predicting March Madness tournament outcomes",
      tags: ["Python", "Scikit-learn", "Pandas", "Numpy", "Machine Learning"],
      gradient: "from-primary/20 to-secondary/20",
      codeUrl: "https://github.com/mihir-patel-05/NCAA_College_Basketball_Analysis"
      
    },
    {
      title: "War on Drugs Policy Analysis",
      description: "Statistical analysis of the impact of drug policies using Python",
      tags: ["Pyton", "Pandas", "NumPy", "NumPy", "Matplotlib", "Seaborn", "Statsmodels"],
      gradient: "from-secondary/20 to-accent/20",
      codeUrl: "https://github.com/mihir-patel-05/Analysis_War_on_Drugs_Policy"
    },
    {
      title: "Event Check-in APP",
      description: "Web app for event check-ins using TypeScript and React",
      tags: ["TypeScript", "React", "MySQL", "Next.js", "Tailwind CSS", "Stripe API", "Prisma", "Typeform API"],
      gradient: "from-accent/20 to-primary/20",
      codeUrl: "https://github.com/mihir-patel-05/KDC_Checkin_2025"
    },
    {
      title: "RespondXR",
      description: "Turn Anyone into a First Responder using AI-powered emergency guidance that saves lives when every second counts",
      tags: ["React Native", "TypeScript", "Expo", "Google Gemini API", "Anthropic Model API", "Computer Vision"],
      gradient: "from-primary/20 to-accent/20",
      codeUrl: "https://github.com/mihir-patel-05/Respond-XR",
      websiteUrl: "http://respondxr.tech/"
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
                <div className="flex gap-3 w-full">
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="block flex-1">
                    <Button size="lg" variant="outline" className="w-full border-primary/30 hover:bg-primary/10 px-6 py-3 text-base">
                      <Github className="w-5 h-5 mr-2" />
                      Code
                    </Button>
                  </a>
                  {project.websiteUrl && (
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="block flex-1">
                      <Button size="lg" variant="outline" className="w-full border-primary/30 hover:bg-primary/10 px-6 py-3 text-base">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Website
                      </Button>
                    </a>
                  )}
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
