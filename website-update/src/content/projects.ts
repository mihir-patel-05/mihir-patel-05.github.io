// Selected projects, newest first. The title links straight to the repository.
export type Project = { name: string; description: string; tools: string; href: string };

export const projects: Project[] = [
  {
    name: "VoteInformed",
    description: "An election research platform that connects candidate records, campaign finance and voting resources in one place.",
    tools: "React, TypeScript, Express, PostgreSQL",
    href: "https://github.com/mihir-patel-05/2026Midterms",
  },
  {
    name: "March Madness predictions",
    description: "College basketball data and machine learning models that predict tournament outcomes.",
    tools: "Python, scikit-learn, pandas",
    href: "https://github.com/mihir-patel-05/NCAA_College_Basketball_Analysis",
  },
  {
    name: "War on Drugs: a policy analysis",
    description: "Statistical analysis and visualisation of the impact of drug policy.",
    tools: "Python, statsmodels, Matplotlib",
    href: "https://github.com/mihir-patel-05/Analysis_War_on_Drugs_Policy",
  },
  {
    name: "Scanned pages to structured text",
    description: "A computer-vision pipeline that reconstructs technical documents as editable LaTeX and Markdown.",
    tools: "Python, OpenCV, Hugging Face",
    href: "https://github.com/mihir-patel-05/ocr-latex-md_mihir",
  },
];
