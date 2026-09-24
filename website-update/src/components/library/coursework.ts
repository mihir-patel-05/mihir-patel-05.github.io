// Michigan State University coursework, grouped by discipline. Only the cumulative GPA is shown;
// individual course grades are intentionally left out.
export type Course = { code: string; title: string; inProgress?: boolean };

export const courseworkSummary = {
  gpa: "3.92",
  credits: 117,
  deansList: 6,
  inProgressTerm: "Fall 2026",
};

export const courseworkAreas: { name: string; blurb: string; courses: Course[] }[] = [
  {
    name: "Data Science",
    blurb: "Modeling and analysis, end to end",
    courses: [
      { code: "STT 180", title: "Introduction to Data Science" },
      { code: "CMSE 201", title: "Computational Modeling & Data Analysis I" },
      { code: "CMSE 202", title: "Computational Modeling & Data Analysis II" },
      { code: "CMSE 381", title: "Fundamentals of Data Science Methods" },
      { code: "CMSE 499", title: "Independent Study in CMSE" },
      { code: "CMSE 382", title: "Optimization Methods in Data Science", inProgress: true },
      { code: "CMSE 492", title: "Selected Topics in Data Science", inProgress: true },
    ],
  },
  {
    name: "Computer Science & AI",
    blurb: "Programming, algorithms, and learning systems",
    courses: [
      { code: "CSE 232", title: "Introduction to Programming II" },
      { code: "CSE 331", title: "Algorithms and Data Structures" },
      { code: "CMSE 404", title: "Introduction to Machine Learning" },
      { code: "CSE 440", title: "Introduction to Artificial Intelligence" },
      { code: "CSE 482", title: "Big Data Analysis", inProgress: true },
    ],
  },
  {
    name: "Mathematics & Statistics",
    blurb: "The theory underneath the models",
    courses: [
      { code: "MTH 132", title: "Calculus I" },
      { code: "MTH 133", title: "Calculus II" },
      { code: "MTH 234", title: "Multivariable Calculus" },
      { code: "MTH 314", title: "Matrix Algebra I" },
      { code: "STT 380", title: "Probability & Statistics for Data Science" },
      { code: "STT 465", title: "Bayesian Statistical Methods", inProgress: true },
    ],
  },
  {
    name: "Business Minor",
    blurb: "How organizations decide, operate, and grow",
    courses: [
      { code: "BUS 109", title: "Introduction to Business: Digital Society" },
      { code: "MGT 325", title: "Management Skills" },
      { code: "MKT 327", title: "Introduction to Marketing" },
      { code: "FI 320", title: "Introduction to Finance" },
      { code: "SCM 304", title: "Survey of Supply Chain Management" },
      { code: "GBL 323", title: "Introduction to Business Law", inProgress: true },
    ],
  },
  {
    name: "Physical Sciences",
    blurb: "Lab science and quantitative reasoning",
    courses: [
      { code: "CEM 141", title: "General Chemistry" },
      { code: "CEM 142", title: "General & Inorganic Chemistry" },
      { code: "CEM 161", title: "Chemistry Laboratory I" },
      { code: "PHY 183B", title: "Physics for Scientists & Engineers I" },
      { code: "PHY 184B", title: "Physics for Scientists & Engineers II" },
    ],
  },
  {
    name: "Writing & Perspectives",
    blurb: "Communication and the wider world",
    courses: [
      { code: "WRA 101", title: "Writing as Inquiry" },
      { code: "IAH 201", title: "U.S. & the World" },
      { code: "ISS 328", title: "Social Science of Sports" },
      { code: "ENT 205", title: "Pests, Society and Environment" },
    ],
  },
];
