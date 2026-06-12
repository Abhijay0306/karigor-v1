"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollRevealText({ text, emWords = [] }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let containerTop = 0;
    let containerHeight = 0;

    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      containerTop = rect.top + scrollTop;
      containerHeight = rect.height;
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });

    let ticked = false;
    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const viewportHeight = window.innerHeight;

          // Start highlighting when the top of the element enters 85% of viewport
          const start = containerTop - viewportHeight * 0.85;
          // Finish highlighting when it reaches 20% of viewport
          const end = containerTop + containerHeight - viewportHeight * 0.2;

          const totalDistance = end - start;
          const currentDistance = scrollTop - start;

          let progress = currentDistance / totalDistance;
          if (progress < 0) progress = 0;
          if (progress > 1) progress = 1;

          setScrollProgress(progress);
          ticked = false;
        });
        ticked = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const words = text.split(" ");

  return (
    <span ref={containerRef} style={{ display: "inline-block" }}>
      {words.map((word, i) => {
        const wordThreshold = (i / words.length) * 0.85;
        const transitionWindow = 0.12;
        const progressDiff = scrollProgress - wordThreshold;
        
        let opacity = 0.18;
        if (progressDiff > 0) {
          opacity = 0.18 + (progressDiff / transitionWindow) * (1 - 0.18);
          if (opacity > 1) opacity = 1;
        }

        const cleanWord = word.replace(/[&".,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
        const isEm = emWords.some(em => cleanWord.includes(em.toLowerCase()));

        return (
          <span
            key={i}
            style={{
              opacity: opacity,
              color: isEm && opacity > 0.4 ? "var(--crimson)" : "inherit",
              transition: "opacity 0.1s ease-out, color 0.25s ease",
              display: "inline-block",
              marginRight: "0.22em",
              fontWeight: isEm ? "400" : "inherit",
              willChange: "opacity"
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
