import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import "./styles/paper.css";

createRoot(document.getElementById("root")!).render(<><Index /><Analytics /><SpeedInsights /></>);
