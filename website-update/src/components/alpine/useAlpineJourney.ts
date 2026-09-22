import { useEffect, useRef, useState, type MouseEvent } from "react";
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
    const initialStop = trailStops.find(stop => `#${stop.id}` === window.location.hash);
    const initialFrame = requestAnimationFrame(() => {
      if (!initialStop) return;
      const target = document.getElementById(initialStop.id)!;
      const headerHeight = page.querySelector("header")!.getBoundingClientRect().height;
      window.scrollTo({
        top: initialStop.id === "basecamp" ? 0 : window.scrollY + target.getBoundingClientRect().top - headerHeight - 20,
        behavior: "instant",
      });
      update();
    });
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
      cancelAnimationFrame(initialFrame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      page.removeEventListener("focusin", revealFocused);
      motion.removeEventListener("change", configureReveals);
    };
  }, []);

  const handleNavigation = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    if (!anchor || !root.current) return;
    const target = document.getElementById(anchor.hash.slice(1));
    if (!target || !root.current.contains(target)) return;
    event.preventDefault();
    if (window.location.hash !== anchor.hash) window.history.pushState(null, "", anchor.hash);
    target.focus({ preventScroll: true });
    const headerHeight = root.current.querySelector("header")!.getBoundingClientRect().height;
    const top = target.id === "basecamp" || target.id === "alpine-main"
      ? 0
      : window.scrollY + target.getBoundingClientRect().top - headerHeight - 20;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return { root, activeStop, handleNavigation };
}
