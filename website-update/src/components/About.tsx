const profileImageSrc = `${import.meta.env.BASE_URL}linkedin-profile.jpg`;

const principles = [
  { n: "P.01", t: "Signal over noise", d: "Start with the question the business actually needs answered. Everything else follows." },
  { n: "P.02", t: "Boring pipelines", d: "Reliable plumbing is the unglamorous work that makes every downstream insight trustworthy." },
  { n: "P.03", t: "Ship & measure", d: "A model in a notebook is a hypothesis. A model in production is an answer." },
];

const About = () => (
  <section id="about" className="bg-papaya py-24 md:py-[140px] px-5 md:px-10">
    <div className="max-w-[1240px] mx-auto">
      <div className="reveal grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-10 items-end mb-12 md:mb-16">
        <span className="font-mono text-[12px] text-ink-faint tracking-[0.08em]">01 — About</span>
        <span className="inline-flex items-center gap-[10px] font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft before:content-[''] before:w-6 before:h-px before:bg-ink-soft">
          A brief introduction
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 md:gap-20 items-start">
        <div className="reveal">
          <figure className="relative p-4 bg-cornsilk shadow-[0_1px_0_hsl(var(--rule)),0_30px_60px_-30px_hsla(30,33%,18%,0.25)] -rotate-[1.2deg] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]">
            <img
              src={profileImageSrc}
              alt="Mihir Patel"
              className="w-full aspect-[4/5] object-cover"
              style={{ filter: "grayscale(.15) contrast(1.05)" }}
            />
          </figure>
          <div className="font-mono text-[11px] text-ink-faint mt-4 text-center tracking-[0.05em]">
            MIHIR · SPRING '26
          </div>
        </div>

        <div className="reveal">
          <h3 className="font-serif-title text-[clamp(32px,3.5vw,48px)] leading-[1.1] mb-6 md:mb-8" style={{ textWrap: "balance" as any }}>
            Every dataset tells a story. My job is to find the{" "}
            <em className="italic font-normal text-bronze-deep">one worth telling.</em>
          </h3>
          <p className="text-[18px] leading-[1.6] text-ink-soft mb-4 max-w-[60ch]">
            I'm an undergraduate at Michigan State studying Data Science with a minor in Business — a combination that
            keeps me honest about why a model matters, not just whether it works.
          </p>
          <p className="text-[18px] leading-[1.6] text-ink-soft mb-4 max-w-[60ch]">
            Last summer at <strong className="font-medium text-ink">Voya Financial</strong> I engineered ingestion
            pipelines in Microsoft Fabric and Spark that cut processing time by 32%. This spring I'm TA'ing CMSE 201,
            and this summer I'm joining <strong className="font-medium text-ink">Meijer</strong> as a Data Science / ML
            intern.
          </p>
          <p className="text-[18px] leading-[1.6] text-ink-soft mb-4 max-w-[60ch]">
            I care about the boring parts — clean schemas, honest baselines, pipelines that don't page you at 3am —
            because those are the parts that make the interesting work possible.
          </p>

          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 border-t border-rule">
            {principles.map((p, i) => (
              <div
                key={p.n}
                className={`pt-6 pr-5 pb-0 md:pb-0
                  ${i < principles.length - 1 ? "md:border-r md:border-rule md:pr-5" : "md:pr-0"}
                  border-b border-rule md:border-b-0 pb-5 md:pb-0`}
              >
                <div className="font-mono text-[11px] text-bronze-deep tracking-[0.08em]">{p.n}</div>
                <h4 className="font-serif-title text-[20px] mt-[10px] mb-2">{p.t}</h4>
                <p className="text-[14px] text-ink-soft leading-[1.5]">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
