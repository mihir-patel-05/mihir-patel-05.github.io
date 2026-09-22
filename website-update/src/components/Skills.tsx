const toolkit = [
  { title: "Analyze & model", skills: "Python, SQL, Pandas, NumPy, Scikit-learn, TensorFlow", number: "01" },
  { title: "Build & ship", skills: "TypeScript, React, Next.js, Node.js, Swift / SwiftUI", number: "02" },
  { title: "Connect & scale", skills: "PostgreSQL, Apache Spark, Databricks, Microsoft Fabric, AWS", number: "03" },
];

const Skills = () => (
  <div id="toolkit" className="toolkit">
    <p className="eyebrow">The toolkit</p>
    {toolkit.map(item => <div className="toolkit-row" key={item.title}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.skills}</p></div></div>)}
    <p className="toolkit-note">Different tools. The same starting point:<br />what does the problem actually need?</p>
  </div>
);
export default Skills;
