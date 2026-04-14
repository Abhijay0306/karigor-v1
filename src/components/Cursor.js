"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    // Add event listeners for mouse position
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
    };

    let animationFrameId;

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      animationFrameId = requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", onMouseMove);
    animateRing();

    // Event delegation for hover states
    const onHover = (e) => {
      if (e.target.closest("a, button, .project-card, .service-card, .journal-card")) {
        if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(2.5)";
        if (ringRef.current) {
          ringRef.current.style.transform = "translate(-50%,-50%) scale(1.5)";
          ringRef.current.style.opacity = "0.25";
        }
      }
    };

    const onLeave = (e) => {
      if (e.target.closest("a, button, .project-card, .service-card, .journal-card")) {
        if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)";
        if (ringRef.current) {
          ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
          ringRef.current.style.opacity = "0.5";
        }
      }
    };

    document.addEventListener("mouseover", onHover);
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
