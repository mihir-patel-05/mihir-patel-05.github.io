import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NotFound = () => (
  <main className="not-found">
    <ThemeToggle />
    <p className="eyebrow">404 / Page not found</p>
    <h1>A small detour.</h1>
    <p>This page doesn’t exist. You can find my work back at the portfolio.</p>
    <a href="/" className="button-primary"><ArrowLeft size={18} aria-hidden="true" />Back to the portfolio</a>
  </main>
);
export default NotFound;
