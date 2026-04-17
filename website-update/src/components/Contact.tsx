const links = [
  { label: "Email", href: "mailto:mihirrpatel05@gmail.com", val: "mihirrpatel05@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mihir-patel-a9a19821a/", val: "/in/mihir-patel" },
  { label: "GitHub", href: "https://github.com/mihir-patel-05", val: "@mihir-patel-05" },
];

const Contact = () => (
  <section id="contact" className="bg-ink text-cornsilk px-5 md:px-10 pt-24 md:pt-[120px] pb-16">
    <div className="max-w-[1240px] mx-auto">
      <div className="reveal grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-10 items-end mb-12 md:mb-16">
        <span className="font-mono text-[12px] tracking-[0.08em] text-cornsilk/40">06 — Contact</span>
        <span className="inline-flex items-center gap-[10px] font-mono text-[12px] uppercase tracking-[0.12em] text-cornsilk/60 before:content-[''] before:w-6 before:h-px before:bg-cornsilk/60">
          Let's talk
        </span>
      </div>

      <div className="reveal grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 md:gap-[60px] items-end pb-16 md:pb-20 border-b border-cornsilk/20">
        <h2 className="font-serif font-normal text-[clamp(56px,10vw,156px)] leading-[.95] tracking-[-0.035em]" style={{ fontVariationSettings: '"opsz" 144' }}>
          Let's build something{" "}
          <em className="italic text-bronze">thoughtful.</em>
        </h2>
        <p className="text-[17px] leading-[1.55] text-cornsilk/75 max-w-[38ch]">
          If you're working on a problem where data has a real part to play — or you just want to say hi — I'd love to
          hear from you. I answer every email.
        </p>
      </div>

      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group relative flex justify-between items-center py-8 border-b border-cornsilk/20 font-serif text-[22px] md:text-[32px] font-normal transition-all duration-300 hover:pl-5 hover:text-bronze"
          >
            <span>
              <span className="italic">{l.label}</span>{" "}
              <span className="inline-block text-[20px] ml-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </span>
            <span className="hidden md:inline font-mono text-[13px] not-italic text-cornsilk/60 group-hover:text-bronze">
              {l.val}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-20 flex flex-wrap gap-4 justify-between font-mono text-[12px] text-cornsilk/50">
        <span>© 2026 Mihir Patel. Set in Fraunces & Inter.</span>
        <span>Designed & built with care.</span>
      </div>
    </div>
  </section>
);

export default Contact;
