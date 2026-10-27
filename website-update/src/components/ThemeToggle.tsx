import { useEffect, useState } from "react";

const STORAGE_KEY = "mihir-portfolio-theme";
type Theme = "light" | "dark";

const systemTheme = (): Theme => matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Reads the theme that index.html applied before first paint, or the system preference.
const currentTheme = (): Theme => {
  const saved = document.documentElement.dataset.theme;
  return saved === "light" || saved === "dark" ? saved : systemTheme();
};

// A text link in the footer: "Dark" on a light page, "Light" on a dark one.
// The choice is saved under the same key the previous site used.
const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const follow = () => { if (!document.documentElement.dataset.theme) setTheme(systemTheme()); };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* private mode: the choice lasts for this page view */ }
    setTheme(next);
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
