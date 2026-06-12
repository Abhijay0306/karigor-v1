"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * PageTransition
 * Premium dual-curtain page transition for Karigor Interior.
 * 
 * Flow:
 *   1. Intercept internal link clicks before navigation begins.
 *   2. Slide panels IN (top: black, bottom: crimson) and fade in the center seam.
 *   3. Once curtains are closed, trigger programmatic routing via router.push().
 *   4. On pathname change (under the curtain), trigger content reveal and slide panels OUT.
 *   5. First load and back/forward navigation skip the curtain and fade up content naturally.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  
  const topRef = useRef(null);
  const botRef = useRef(null);
  const seamRef = useRef(null);
  const labelRef = useRef(null);
  
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const isTransitioning = useRef(false);

  // Human-readable page name from path
  function getPageLabel(path) {
    if (!path || path === "/") return "Karigor Interior";
    const segments = path.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "";
    return last
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  const EASE_IN  = "cubic-bezier(0.86, 0, 0.07, 1)";   // sharp ease — fast in, precise stop
  const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";    // spring ease — snappy departure

  useEffect(() => {
    const handleLinkClick = (e) => {
      // 1. Find the nearest anchor element
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // 2. Validate if we should intercept
      const isInternal = href.startsWith("/") || href.startsWith(window.location.origin);
      const isHash = href.startsWith("#") || href.includes("#");
      const isSpecial = href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:");
      const isNewTab = anchor.target === "_blank";
      const hasModifiers = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      const isDownload = anchor.hasAttribute("download");

      // Extract and clean path
      let targetPath = href;
      if (href.startsWith(window.location.origin)) {
        targetPath = href.slice(window.location.origin.length);
      }
      if (!targetPath) targetPath = "/";

      // Compare base pathnames (ignoring query strings and hashes)
      const targetPathname = targetPath.split("?")[0].split("#")[0];

      if (targetPathname === pathname) {
        // We are already on this page. Let Next.js handle it normally (e.g. scroll to top).
        return;
      }

      const hasExtension = /\.[a-zA-Z0-9]+$/.test(targetPathname);

      if (isInternal && !isHash && !isSpecial && !isNewTab && !hasModifiers && !isDownload && !hasExtension) {
        // Block both native navigation and Next.js <Link> React synthetic events
        e.preventDefault();
        e.stopPropagation();
        
        // Prevent duplicate trigger if already transitioning
        if (isTransitioning.current) return;
        isTransitioning.current = true;

        const targetLabel = getPageLabel(targetPath);
        setLabel(targetLabel);
        setVisible(true); // display: "flex"

        // Ensure display: flex is painted before starting transitions
        setTimeout(() => {
          const top = topRef.current;
          const bot = botRef.current;
          const seam = seamRef.current;
          const lbl = labelRef.current;
          if (!top || !bot || !seam || !lbl) {
            router.push(targetPath);
            isTransitioning.current = false;
            return;
          }

          // Initial closed-state setup (invisible/off-screen)
          top.style.transition = "none";
          bot.style.transition = "none";
          seam.style.transition = "none";
          lbl.style.transition = "none";

          top.style.transform = "scaleY(0)";
          bot.style.transform = "scaleY(0)";
          seam.style.opacity = "0";
          lbl.style.transform = "translateY(12px)";

          // Flush layout
          top.getBoundingClientRect();

          // Phase 1: Panels slide IN (0ms -> 550ms)
          top.style.transition = `transform 0.55s ${EASE_IN}`;
          bot.style.transition = `transform 0.55s ${EASE_IN}`;
          top.style.transform = "scaleY(1)";
          bot.style.transform = "scaleY(1)";

          // Phase 2: Seam and label fade IN (150ms -> 550ms)
          seam.style.transition = "opacity 0.35s ease 0.15s";
          seam.style.opacity = "1";

          lbl.style.transition = "transform 0.40s ease 0.15s";
          lbl.style.transform = "translateY(0)";

          // Phase 3: Wait for curtain to close completely, hold briefly, then navigate
          setTimeout(() => {
            router.push(targetPath);
          }, 600); // 550ms animation + 50ms hold
        }, 20);
      }
    };

    // Use capture phase to intercept the click BEFORE React's synthetic event system sees it
    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, [router]);

  // Handle route change completion (under the closed curtain)
  useEffect(() => {
    if (isTransitioning.current) {
      // Navigated via click interception, run the curtain-out animation
      const top = topRef.current;
      const bot = botRef.current;
      const seam = seamRef.current;

      if (top && bot && seam) {
        // Wait a brief moment to guarantee the new page has rendered under the curtain
        setTimeout(() => {
          // Trigger the .page-content reveal animation to fade-up the new content
          const pageEl = document.querySelector(".page-content");
          if (pageEl) {
            pageEl.style.animation = "none";
            pageEl.getBoundingClientRect(); // force reflow
            pageEl.style.animation = "";
          }

          // Phase 4: Seam fades OUT
          seam.style.transition = "opacity 0.25s ease";
          seam.style.opacity = "0";

          // Phase 5: Panels split/slide OUT
          top.style.transition = `transform 0.65s ${EASE_OUT}`;
          bot.style.transition = `transform 0.65s ${EASE_OUT}`;
          top.style.transform = "scaleY(0)";
          bot.style.transform = "scaleY(0)";

          // Phase 6: Hide wrapper completely and clear lock
          setTimeout(() => {
            setVisible(false); // display: "none"
            isTransitioning.current = false;
          }, 650);
        }, 100);
      } else {
        setVisible(false);
        isTransitioning.current = false;
      }
    } else {
      // Direct load, page refresh, or back/forward navigation.
      // Do not run curtain transition (avoiding flash of page then close curtain bug).
      // Simply trigger the page content reveal fade-up animation.
      const pageEl = document.querySelector(".page-content");
      if (pageEl) {
        pageEl.style.animation = "none";
        pageEl.getBoundingClientRect(); // force reflow
        pageEl.style.animation = "";
      }
    }
  }, [pathname]);

  const panelBase = {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        pointerEvents: visible ? "all" : "none",
        display: visible ? "flex" : "none", // Completely hides overlay when not active
        flexDirection: "column",
      }}
    >
      {/* ── Top panel (black) — slides DOWN from top ── */}
      <div
        ref={topRef}
        style={{
          ...panelBase,
          background: "var(--black)",
          transformOrigin: "top center",
          transform: "scaleY(0)",
        }}
      >
        <GridTexture color="#AC9C8D" opacity={0.05} />
      </div>

      {/* ── Center label seam ── */}
      <div
        ref={seamRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <div style={{ width: 36, height: 1, background: "var(--crimson)" }} />
        <p
          ref={labelRef}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(16px, 2.5vw, 24px)",
            fontWeight: 300,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(239,233,225,0.9)",
            transform: "translateY(12px)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </p>
        <div style={{ width: 36, height: 1, background: "var(--crimson)" }} />
      </div>

      {/* ── Bottom panel (crimson) — slides UP from bottom ── */}
      <div
        ref={botRef}
        style={{
          ...panelBase,
          background: "var(--crimson)",
          transformOrigin: "bottom center",
          transform: "scaleY(0)",
        }}
      >
        <GridTexture color="#EFE9E1" opacity={0.07} />
      </div>
    </div>
  );
}

/* Lightweight inline SVG grid texture for the curtain panels */
function GridTexture({ color, opacity }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vertical lines */}
      {[0, 120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke={color} strokeWidth="1" />
      ))}
      {/* Horizontal lines */}
      {[0, 75, 150, 225, 300].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke={color} strokeWidth="1" />
      ))}
      {/* Diagonal marks */}
      <line x1="0" y1="0" x2="600" y2="300" stroke={color} strokeWidth="0.5" opacity="0.6" />
      <line x1="600" y1="0" x2="1200" y2="300" stroke={color} strokeWidth="0.5" opacity="0.6" />
      <line x1="0" y1="300" x2="600" y2="0" stroke={color} strokeWidth="0.5" opacity="0.6" />
      <line x1="600" y1="300" x2="1200" y2="0" stroke={color} strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}
