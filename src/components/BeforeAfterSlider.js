"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt = "Before", afterAlt = "After", height = "450px" }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isDragging || isHovered) return;

    let animId;
    let lastTime = performance.now();
    const speedFactor = 0.0005; // slow, premium glide speed
    
    // Calculate initial time coordinate based on current slider position
    const clampedPos = Math.min(95, Math.max(5, sliderPosition));
    let angle = Math.asin((clampedPos - 50) / 45);
    if (isNaN(angle)) angle = 0;

    const animate = (now) => {
      const delta = now - lastTime;
      lastTime = now;
      
      // Limit delta time for background tabs or spikes
      const clampedDelta = Math.min(delta, 100);
      angle += speedFactor * clampedDelta;
      
      // Map sine wave to 5% - 95% range
      const newPos = 50 + Math.sin(angle) * 45;
      
      setSliderPosition(newPos);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isDragging, isHovered]);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="slider-container"
      style={{ height: height }}
      onMouseDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onTouchStart={() => {
        setIsDragging(true);
        setIsHovered(true);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false); // safety cleanup
      }}
      tabIndex={0}
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after comparison slider. Use left and right arrow keys to control."
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setSliderPosition((prev) => Math.max(0, prev - 5));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setSliderPosition((prev) => Math.min(100, prev + 5));
        } else if (e.key === "Home") {
          e.preventDefault();
          setSliderPosition(0);
        } else if (e.key === "End") {
          e.preventDefault();
          setSliderPosition(100);
        }
      }}
    >
      {/* After Image (Full width background) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover", pointerEvents: "none" }}
      />
      <div className="slider-label slider-label-after">
        After
      </div>

      {/* Before Image (Uses clip-path for high performance cropping) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          zIndex: 2,
        }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover", pointerEvents: "none" }}
        />
        <div className="slider-label slider-label-before">
          Before
        </div>
      </div>

      {/* Dragging Handle Line */}
      <div
        className="slider-handle-line"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Central Knob indicator */}
        <div className="slider-knob">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18 6-6-6-6M9 6 3 12l6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

