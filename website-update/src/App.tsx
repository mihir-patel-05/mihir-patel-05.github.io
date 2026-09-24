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
const Library = lazy(() => import("./pages/Library"));
const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="mihir-portfolio-theme" disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/designs/original.html" element={<Index />} />
            <Route path="/designs/mountains.html" element={<Suspense fallback={<main className="not-found"><p>Opening the mountain portfolio…</p></main>}><Mountains /></Suspense>} />
            <Route path="/library.html" element={<Suspense fallback={<main className="not-found"><p>Opening the library…</p></main>}><Library /></Suspense>} />
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
