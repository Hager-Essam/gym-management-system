import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook: counts from 0 up to `end` when the element scrolls into view.
 *
 * Usage:
 *   const { count, ref } = useCountUp(1200);
 *   <div ref={ref}>{Math.round(count)}</div>
 *
 * Concepts used: useState (the number), useRef (the DOM element),
 * useEffect (run code after render), IntersectionObserver (detect scrolling into view).
 */
export default function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // 1) Watch the element and flip `visible` the first time it appears on screen.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect(); // cleanup when the component unmounts
  }, []);

  // 2) Once visible, animate the number.
  useEffect(() => {
    if (!visible) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let frame;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // slows down near the end
      setCount(end * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, end, duration]);

  return { count, ref };
}
