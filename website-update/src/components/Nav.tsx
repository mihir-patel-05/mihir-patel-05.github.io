import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#work", label: "Experience" },
  { href: "#about", label: "About" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuLinks = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    menuLinks.current?.querySelector("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <nav className="site-nav container-shell" aria-label="Main navigation">
        <a href="#top" className="wordmark" aria-label="Mihir Patel, back to top" onClick={() => setOpen(false)}>
          <span className="monogram" aria-hidden="true">mp.</span>
          <span>Mihir Patel</span>
        </a>
        <div ref={menuLinks} id="navigation-links" className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a href="#contact" className="nav-contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="nav-controls">
          <ThemeToggle />
          <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={open}
            aria-controls="navigation-links" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Nav;
