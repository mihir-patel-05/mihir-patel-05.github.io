import { GraduationCap, BookOpen, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Education = () => {
  return (
    <section className="py-24 bg-muted/30" id="education">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center font-serif text-foreground animate-fade-in">
          Education
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
          My academic journey in data science and technology
        </p>

        <div className="max-w-5xl mx-auto">
          <Card
            className="bg-gradient-to-br from-primary/20 to-secondary/20 border-border hover:shadow-mountain transition-all duration-500 hover:-translate-y-2 animate-fade-in-up group overflow-hidden"
            style={{ animationDelay: '400ms', opacity: 0, animationFillMode: 'forwards' }}
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
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>CSE 331: Data Structures and Algorithms</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>CSE 232: Introduction to Programming C++</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>CMSE 201: Introduction to Computational Modeling</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>CMSE 202: Computational Modeling Tools</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>STT 380: Probability and Statistics for Data Science</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>STT 180: Introduction to Data Science</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>STT 200: Statistical Methods and Applications</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>CMSE/MTH 314: Linear Algebra with Applications</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>MTH 234: Calculus III</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>MTH 133: Calculus II</span>
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>MTH 132: Calculus I</span>                  
                  </div>
                  <div className="text-muted-foreground flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                    <span>CSE 231: Introduction to Programming Python</span>
                  </div>
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
