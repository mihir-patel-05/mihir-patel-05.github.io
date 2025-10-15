import { Briefcase, Calendar, MapPin, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Interface defining the structure of an experience entry
 * @property company - Name of the company or organization
 * @property position - Job title or role
 * @property location - Physical or remote location
 * @property dateRange - Employment period (e.g., "Jun 2024 - Aug 2024")
 * @property description - Array of key responsibilities and achievements
 * @property tags - Technologies, tools, or skills used
 * @property gradient - Tailwind gradient classes for card styling
 * @property achievements - Optional quantifiable achievements or highlights
 */
interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  dateRange: string;
  description: string[];
  tags: string[];
  gradient: string;
  achievements?: string[];
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      company: "Tech Analytics Corp",
      position: "Data Science Intern",
      location: "San Francisco, CA",
      dateRange: "Jun 2024 - Aug 2024",
      description: [
        "Developed machine learning models to predict customer churn with 87% accuracy, directly contributing to a 15% improvement in customer retention rates",
        "Built automated ETL pipelines processing 2M+ records daily using Python (pandas, NumPy) and SQL, reducing data processing time by 60%",
        "Created interactive Tableau dashboards for executive stakeholders featuring real-time KPIs, reducing manual reporting time by 40%",
        "Collaborated with cross-functional teams across product, marketing, and engineering to translate business requirements into scalable technical solutions",
        "Implemented data validation and quality checks ensuring 99.9% data accuracy across all pipelines"
      ],
      tags: ["Python", "SQL", "Tableau", "Machine Learning", "Scikit-learn", "pandas", "ETL"],
      gradient: "from-primary/20 to-secondary/20",
      achievements: [
        "15% improvement in customer retention",
        "60% reduction in processing time"
      ]
    },
    {
      company: "DataViz Solutions",
      position: "Analytics Intern",
      location: "Remote",
      dateRange: "Jan 2024 - May 2024",
      description: [
        "Analyzed customer behavior data across 500K+ users to identify key engagement metrics and trends, leading to actionable insights for product development",
        "Designed and implemented comprehensive A/B testing framework for product feature optimization, enabling data-driven decision making across 12+ experiments",
        "Created Power BI reports and interactive dashboards visualizing KPIs for marketing and product teams, serving 25+ stakeholders",
        "Conducted advanced statistical analysis on user segmentation using clustering algorithms, resulting in 3 distinct user personas and targeted marketing campaigns",
        "Presented weekly insights to leadership team, influencing product roadmap decisions and marketing strategies"
      ],
      tags: ["Power BI", "A/B Testing", "Statistics", "Data Analysis", "Python", "User Segmentation"],
      gradient: "from-secondary/20 to-accent/20",
      achievements: [
        "12+ A/B tests completed",
        "3 user personas identified"
      ]
    },
    {
      company: "University Research Lab",
      position: "Research Assistant",
      location: "Berkeley, CA",
      dateRange: "Sep 2023 - Dec 2023",
      description: [
        "Researched state-of-the-art natural language processing techniques for sentiment analysis applications in e-commerce product reviews",
        "Processed and cleaned large text datasets containing 1M+ reviews from social media platforms using Python and NLTK",
        "Implemented deep learning models (LSTM, BERT) using TensorFlow and PyTorch, achieving 87% accuracy on emotion classification tasks",
        "Co-authored research paper titled 'Emotion Detection in Customer Reviews Using Transfer Learning' accepted to IEEE conference",
        "Conducted literature reviews on 50+ academic papers and synthesized findings for research team"
      ],
      tags: ["NLP", "TensorFlow", "PyTorch", "Research", "Python", "BERT", "Deep Learning"],
      gradient: "from-accent/20 to-primary/20",
      achievements: [
        "87% model accuracy achieved",
        "1 research paper published"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center font-serif text-foreground animate-fade-in">
          Experience
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
          My professional journey in data science, analytics, and research
        </p>

        <div className="max-w-5xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${exp.gradient} border-border hover:shadow-mountain transition-all duration-500 hover:-translate-y-2 animate-fade-in-up group overflow-hidden`}
              style={{ animationDelay: `${400 + index * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:animate-float">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-foreground text-xl md:text-2xl group-hover:text-primary transition-colors duration-300">
                          {exp.position}
                        </CardTitle>
                        <CardDescription className="text-lg font-semibold text-muted-foreground mt-1">
                          {exp.company}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground md:text-right">
                    <div className="flex items-center gap-2 md:justify-end">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="font-medium">{exp.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-2 md:justify-end">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Key Achievements Section */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-accent" />
                      <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                        Key Achievements
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <Badge
                          key={achIndex}
                          variant="secondary"
                          className="bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-colors duration-300"
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Responsibilities Section */}
                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-muted-foreground flex items-start gap-3 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies Section */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:border-primary/30 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
