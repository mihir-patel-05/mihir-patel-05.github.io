const profileImageSrc = `${import.meta.env.BASE_URL}linkedin-profile.jpg`;

const principles = [
  { n: "P.01", t: "Systems before spectacle", d: "Clear architecture and dependable foundations make ambitious products possible." },
  { n: "P.02", t: "Models earn trust", d: "Useful machine learning starts with honest baselines, good data, and explainable decisions." },
  { n: "P.03", t: "Ship, learn, refine", d: "A working product creates the feedback that turns a promising idea into a better one." },
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
          <h3 className="font-serif-title text-[clamp(32px,3.5vw,48px)] leading-[1.1] mb-6 md:mb-8" style={{ textWrap: "balance" }}>
            I like the seam between reliable software and{" "}
            <em className="italic font-normal text-bronze-deep">useful machine learning.</em>
          </h3>
          <p className="text-[18px] leading-[1.6] text-ink-soft mb-4 max-w-[60ch]">
            I'm an undergraduate at Michigan State studying Data Science with a minor in Business. I work across the
            stack — from interfaces and APIs to databases, data pipelines, and models — because the best technical
            decisions make both the system and the user experience better.
          </p>
          <p className="text-[18px] leading-[1.6] text-ink-soft mb-4 max-w-[60ch]">
            This past summer at <strong className="font-medium text-ink">Meijer</strong>, I built ML attribution
            models and a retrieval-grounded GenAI analytics agent on Databricks that drove a ~30% lift in customer
            conversions. The summer before, at <strong className="font-medium text-ink">Voya Financial</strong>, I
            engineered ingestion pipelines in Microsoft Fabric and Spark that cut processing time by 32%. At
            Michigan State, I help students build confidence with Python and computational modeling as a learning
            assistant for CMSE 201.
          </p>
          <p className="text-[18px] leading-[1.6] text-ink-soft mb-4 max-w-[60ch]">
            My recent work ranges from a full-stack election data platform and offline-first iOS app to computer-vision
            tooling and AI-assisted emergency guidance. I care about clean interfaces, thoughtful data models, honest
            evaluation, and getting useful software into people's hands.
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
