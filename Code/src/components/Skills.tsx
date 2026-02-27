import { Database, BarChart3, Brain, Code } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface Skill {
  name: string;
  level: number;
}

const Skills = () => {
  const [sectionRef, isVisible] = useIntersectionObserver(0.1);

  const skillCategories = [
    {
      icon: Database,
      title: "Data Engineering",
      skills: [
        { name: "SQL", level: 90 },
        { name: "Python", level: 95 },
        { name: "ETL Pipelines", level: 80 },
        { name: "Data Warehousing", level: 75 },
      ] as Skill[],
      color: "from-primary to-secondary"
    },
    {
      icon: BarChart3,
      title: "Analytics & Visualization",
      skills: [
        { name: "Tableau", level: 85 },
        { name: "Power BI", level: 90 },
        { name: "Matplotlib", level: 80 },
        { name: "Statistical Analysis", level: 85 },
      ] as Skill[],
      color: "from-secondary to-accent"
    },
    {
      icon: Brain,
      title: "Machine Learning",
      skills: [
        { name: "Scikit-learn", level: 85 },
        { name: "TensorFlow", level: 70 },
        { name: "Predictive Modeling", level: 80 },
        { name: "NLP", level: 65 },
      ] as Skill[],
      color: "from-accent to-primary"
    },
    {
      icon: Code,
      title: "Development",
      skills: [
        { name: "Git", level: 90 },
        { name: "APIs", level: 80 },
        { name: "Cloud Platforms", level: 70 },
        { name: "Agile Methodology", level: 85 },
      ] as Skill[],
      color: "from-primary/80 to-secondary/80"
    }
  ];

  return (
    <section className="py-24 bg-muted/30" id="skills">
      <div className="container mx-auto px-6" ref={sectionRef}>
        <h2 className={`text-4xl md:text-5xl font-bold mb-16 text-center font-serif text-foreground transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-card rounded-xl p-6 border border-border hover:shadow-data transition-all duration-500 hover:-translate-y-2 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className={`w-14 h-14 mb-4 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:animate-float`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100 + skillIndex * 150 + 400}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
