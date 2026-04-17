const courses = [
  ["CSE 331", "Data Structures & Algorithms"],
  ["CSE 232", "Intro to Programming, C++"],
  ["CSE 231", "Intro to Programming, Python"],
  ["CMSE 201", "Intro to Computational Modeling"],
  ["CMSE 202", "Computational Modeling Tools"],
  ["CMSE 314", "Linear Algebra w/ Applications"],
  ["STT 380", "Probability & Stats for DS"],
  ["STT 200", "Statistical Methods"],
  ["STT 180", "Intro to Data Science"],
  ["MTH 234", "Calculus III"],
  ["MTH 133", "Calculus II"],
  ["MTH 132", "Calculus I"],
];

const Education = () => (
  <section id="education" className="bg-cornsilk py-24 md:py-[140px] px-5 md:px-10">
    <div className="max-w-[1240px] mx-auto">
      <div className="reveal grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-10 items-end mb-12 md:mb-16">
        <span className="font-mono text-[12px] text-ink-faint tracking-[0.08em]">05 — Education</span>
        <h2 className="font-serif-title text-[clamp(40px,6vw,72px)] leading-[1.02]">
          Where I'm <em className="italic font-normal text-bronze-deep">learning.</em>
        </h2>
      </div>

      <div className="reveal grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-[60px] p-8 lg:p-12 bg-tea border border-rule">
        <div>
          <h3 className="font-serif-title text-[clamp(32px,4vw,48px)] leading-[1.05] mb-3">
            Michigan State <em className="italic font-normal text-bronze-deep">University</em>
          </h3>
          <div className="text-[17px] text-ink mb-6">B.S. Data Science, minor in Business</div>
          <div className="font-mono text-[12px] text-ink-soft flex flex-col gap-[6px] pt-5 border-t border-ink/15">
            <span><span className="text-bronze-deep">— </span>Expected graduation, May 2027</span>
            <span><span className="text-bronze-deep">— </span>Major coursework across CSE, CMSE, STT</span>
            <span><span className="text-bronze-deep">— </span>Undergraduate Learning Assistant, CMSE 201</span>
          </div>
        </div>

        <div>
          <div className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.1em] mb-4">
            Relevant coursework
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
            {courses.map(([code, name]) => (
              <div
                key={code}
                className="text-[14px] text-ink py-[6px] flex gap-[10px] border-b border-dotted border-ink/15"
              >
                <span className="font-mono text-[11px] text-bronze-deep shrink-0 min-w-[60px]">{code}</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Education;
