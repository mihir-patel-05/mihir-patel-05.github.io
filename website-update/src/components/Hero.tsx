const Hero = () => {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-between px-5 md:px-10 pt-24 md:pt-32 pb-10 md:pb-20 bg-cornsilk"
    >
      {/* Top strip */}
      <div className="grid grid-cols-[1fr_auto] gap-10 font-mono text-[12px] text-ink-soft tracking-[0.05em]">
        <div className="flex items-center gap-[10px]">
          <span className="w-2 h-2 rounded-full bg-[#7a9a3c] animate-soft-pulse" />
          AVAILABLE · SUMMER '26 INTERNSHIP SECURED
        </div>
        <div>PORTFOLIO · VOL. 02 · 2026</div>
      </div>

      {/* Main */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-[60px] items-end mt-10">
          <h1 className="font-serif-display text-ink text-[clamp(56px,11vw,168px)] leading-[.92]">
            <span className="block overflow-hidden">
              <span className="inline-block animate-rise-up [animation-delay:.1s]">Mihir</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block animate-rise-up [animation-delay:.25s]">
                Patel
                <em className="relative italic font-normal text-bronze-deep">
                  ,
                  <span className="absolute left-0 right-0 bottom-[.08em] h-[.06em] bg-bronze origin-left scale-x-0 animate-underline-sweep" />
                </em>
              </span>
            </span>
          </h1>

          <div className="max-w-[380px] opacity-0 animate-fade-in [animation-delay:.7s]">
            <p className="text-[17px] leading-[1.55] text-ink-soft" style={{ textWrap: "pretty" as any }}>
              A data scientist and engineer at Michigan State, building scalable pipelines, predictive models, and
              the occasional app that saves lives when seconds matter.
            </p>
            <div className="mt-6 font-serif italic text-[22px] text-ink">
              — working out of East Lansing, MI.
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div
          className="mt-12 md:mt-20 pt-6 border-t border-rule grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10
            font-mono text-[12px] opacity-0 animate-fade-in [animation-delay:1.1s]"
        >
          {[
            ["Role", "Data Scientist"],
            ["Focus", "ML · Analytics · Pipelines"],
            ["Next", "Meijer DS/ML Intern"],
            ["Based in", "East Lansing, MI"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-ink-faint uppercase tracking-[0.08em] text-[11px] mb-2">{k}</div>
              <div className="text-ink text-[14px]">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
