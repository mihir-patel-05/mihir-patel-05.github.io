import { useEffect, useRef, useState } from "react";
import { trailStops } from "./trail";

export function useAlpineJourney() {
  const root = useRef<HTMLDivElement>(null);
  const [activeStop, setActiveStop] = useState<string>(trailStops[0].id);

  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const sections = trailStops.map(stop => document.getElementById(stop.id)!);
    const route = page.querySelector<SVGPathElement>("#alpine-route-path");
    const marker = page.querySelector<SVGCircleElement>("#alpine-route-marker");
    const halo = page.querySelector<SVGCircleElement>("#alpine-route-marker-halo");
    const routeLength = route?.getTotalLength() ?? 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = page.querySelectorAll<HTMLElement>("[data-reveal]");
    let currentStop: string = trailStops[0].id;
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    const update = () => {
      frame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      // One scroll-driven CSS update; React only rerenders when a section changes.
      page.style.setProperty("--trail-progress", String(progress));
      if (route && marker && halo) {
        const point = route.getPointAtLength(progress * routeLength);
        for (const node of [marker, halo]) {
          node.setAttribute("cx", String(point.x));
          node.setAttribute("cy", String(point.y));
        }
      }
      let active: string = trailStops[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * .45) active = section.id;
      }
      if (progress > .985) active = trailStops[trailStops.length - 1].id;
      if (active !== currentStop) {
        currentStop = active;
        setActiveStop(active);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configureReveals = () => {
      observer?.disconnect();
      page.classList.remove("alpine-enhanced");
      if (motion.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      }, { threshold: .05, rootMargin: "0px 0px -24px 0px" });
      // Only hide content below the fold. Deep links and restored positions stay readable.
      targets.forEach(target => {
        if (target.getBoundingClientRect().top < window.innerHeight) target.classList.add("is-visible");
        else observer?.observe(target);
      });
      page.classList.add("alpine-enhanced");
    };
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let target = event.target.closest("[data-reveal]");
      while (target) {
        target.classList.add("is-visible");
        target = target.parentElement?.closest("[data-reveal]") ?? null;
      }
    };
    configureReveals();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    page.addEventListener("focusin", revealFocused);
    motion.addEventListener("change", configureReveals);
    // Font or responsive text reflow can change the total ascent length.
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : undefined;
    resizeObserver?.observe(page);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      page.removeEventListener("focusin", revealFocused);
      motion.removeEventListener("change", configureReveals);
    };
  }, []);

  return { root, activeStop };
}
