import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Library from "./pages/Library";
import "./styles/library-base.css";

createRoot(document.getElementById("root")!).render(<><Library /><Analytics /><SpeedInsights /></>);
