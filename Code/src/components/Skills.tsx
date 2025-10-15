import { Database, BarChart3, Brain, Code } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Database,
      title: "Data Engineering",
      skills: ["SQL", "Python", "ETL Pipelines", "Data Warehousing"],
      color: "from-primary to-secondary"
    },
    {
      icon: BarChart3,
      title: "Analytics & Visualization",
      skills: ["Tableau", "Power BI", "Matplotlib", "Statistical Analysis"],
      color: "from-secondary to-accent"
    },
    {
      icon: Brain,
      title: "Machine Learning",
      skills: ["Scikit-learn", "TensorFlow", "Predictive Modeling", "NLP"],
      color: "from-accent to-primary"
    },
    {
      icon: Code,
      title: "Development",
      skills: ["Git", "APIs", "Cloud Platforms", "Agile Methodology"],
      color: "from-primary/80 to-secondary/80"
    }
  ];

  return (
    <section className="py-24 bg-muted/30" id="skills">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-serif text-foreground animate-fade-in">
          Skills & Expertise
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-mountain transition-all duration-500 hover:-translate-y-2 animate-scale-in group"
              style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className={`w-14 h-14 mb-4 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:animate-float`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li 
                    key={skillIndex}
                    className="text-muted-foreground flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
