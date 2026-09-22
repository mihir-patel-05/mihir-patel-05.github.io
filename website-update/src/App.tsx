import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Mountains = lazy(() => import("./pages/Mountains"));
const Civic = lazy(() => import("./pages/Civic"));
const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="mihir-portfolio-theme" disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mountains.html" element={<Suspense fallback={<main className="not-found"><p>Opening the mountain portfolio…</p></main>}><Mountains /></Suspense>} />
            <Route path="/civic.html" element={<Suspense fallback={<main className="not-found"><p>Opening the civic portfolio…</p></main>}><Civic /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
