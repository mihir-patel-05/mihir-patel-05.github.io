import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = "", duration = 1500 }: AnimatedCounterProps) => {
  const [ref, isVisible] = useIntersectionObserver(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="inline-block animate-count-up">
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
