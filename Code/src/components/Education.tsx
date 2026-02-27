import { GraduationCap, BookOpen, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const courses = [
  "CSE 331: Data Structures and Algorithms",
  "CSE 232: Introduction to Programming C++",
  "CMSE 201: Introduction to Computational Modeling",
  "CMSE 202: Computational Modeling Tools",
  "STT 380: Probability and Statistics for Data Science",
  "STT 180: Introduction to Data Science",
  "STT 200: Statistical Methods and Applications",
  "CMSE/MTH 314: Linear Algebra with Applications",
  "MTH 234: Calculus III",
  "MTH 133: Calculus II",
  "MTH 132: Calculus I",
  "CSE 231: Introduction to Programming Python",
];

const Education = () => {
  const [sectionRef, isVisible] = useIntersectionObserver(0.1);

  return (
    <section className="py-24 bg-muted/30 bg-grid-pattern" id="education">
      <div className="container mx-auto px-6" ref={sectionRef}>
        <h2 className={`text-4xl md:text-5xl font-bold mb-8 text-center font-serif text-foreground transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Education
        </h2>
        <p className={`text-center text-muted-foreground mb-16 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          My academic journey in data science and technology
        </p>

        <div className="max-w-5xl mx-auto">
          <Card
            className={`bg-gradient-to-br from-primary/20 to-secondary/20 border-border hover:shadow-data transition-all duration-500 hover:-translate-y-2 group overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:animate-float">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground text-xl md:text-2xl group-hover:text-primary transition-colors duration-300">
                        Michigan State University
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold text-muted-foreground mt-1">
                        B.S. Data Science with a Minor in Business
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground md:text-right">
                  <div className="flex items-center gap-2 md:justify-end">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="font-medium">Expected: May 2027</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Major & Minor Section */}
              <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                    Program Details
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-colors duration-300"
                  >
                    Major: Data Science
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 transition-colors duration-300"
                  >
                    Minor: Business
                  </Badge>
                </div>
              </div>

              {/* Relevant Coursework Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Relevant Coursework
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                  {courses.map((course, index) => {
                    const colonIndex = course.indexOf(":");
                    const code = course.substring(0, colonIndex);
                    const name = course.substring(colonIndex);
                    return (
                      <div key={index} className="text-muted-foreground flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                        <span>
                          <span className="font-mono text-accent">{code}</span>
                          {name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Education;
