import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#education", label: "Education" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 md:py-[18px]
        flex items-center justify-between backdrop-blur
        bg-cornsilk/80 transition-colors
        ${scrolled ? "border-b border-rule" : "border-b border-transparent"}`}
    >
      <a href="#top" className="flex items-baseline gap-[10px] font-serif italic font-medium text-[22px]">
        <span className="w-[7px] h-[7px] rounded-full bg-bronze inline-block -translate-y-[3px]" />
        Mihir Patel
      </a>

      <div className="hidden md:flex gap-7 text-[13px] tracking-[0.02em]">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="relative text-ink-soft py-1 hover:text-ink transition-colors
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0
              after:bg-bronze-deep after:transition-[width] after:duration-300 hover:after:w-full"
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="font-mono text-[12px] px-[14px] py-2 border border-ink rounded-full
          hover:bg-ink hover:text-cornsilk transition-colors"
      >
        Get in touch ↗
      </a>
    </nav>
  );
};

export default Nav;
