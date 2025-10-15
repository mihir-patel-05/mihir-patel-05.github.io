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
      company: "Voya Financial",
      position: "Data Analyst Intern",
      location: "Detroit, MI",
      dateRange: "Jun 2025 - Aug 2025",
      description: [
        "Engineered scalable data ingestion pipelines using Microsoft Fabric + Apache Spark, improving distributed data processing performance by 32% and enabling downstream analytics",
        "Partnered with the FP&A team to design interactive Power BI dashboards for 8 cost centers, transforming financial data into actionable insights",
        "Built and optimized 5 semantic models in Power BI linked to Fabric Dataflows, processing 2M+ row datasets from Oracle ERP/EPM systems, increasing reporting time by 30%"
      ],
      tags: ["Power BI", "Microsoft Fabric", "Apache Spark", "Data Pipelines", "Data Analysis", "SQL", "Python" ,"ETL"],
      gradient: "from-primary/20 to-secondary/20",
      achievements: [
        "32% reduction in data processing time",
        "30% increase in reporting speed"
      ]
    },
    {
      company: "BAPS Swaminarayan Sanstha",
      position: "Data Analyst",
      location: "Canton, MI",
      dateRange: "Jun 2022 - Aug 2024",
      description: [
        "Leveraged SQL + Python analytics to identify engagement trends across youth activity programs, increasing participation effectiveness by 15%",
        "Designed a data-driven registration pipeline improving user tracking for 500+ attendees, reducing operational processing time and proving data quality + insights",
        "Created financial dashboards to detect cost savings and delivered insights that saved $4,000 in event operations through data-driven decision-making"
      ],
      tags: ["SQL", "Python", "Data Analysis", "Data Visualization", "Dashboards", "Power BI", "Expense Analytics"],
      gradient: "from-secondary/20 to-accent/20",
      achievements: [
        "15% increase in youth program engagement",
        "$4,000 in event cost savings"
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
