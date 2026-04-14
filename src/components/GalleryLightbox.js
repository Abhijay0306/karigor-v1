"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const galleryItems = [
  { id: 1, src: "/gallery-1.jpeg", alt: "Karigor Interior project 1" },
  { id: 2, src: "/gallery-2.jpeg", alt: "Karigor Interior project 2" },
  { id: 3, src: "/gallery-3.jpeg", alt: "Karigor Interior project 3" },
  { id: 4, src: "/gallery-4.jpg",  alt: "Karigor Interior project 4" },
  { id: 5, src: "/gallery-5.jpg",  alt: "Karigor Interior project 5" },
  { id: 6, src: "/gallery-6.jpg",  alt: "Karigor Interior project 6" },
  { id: 7, src: "/gallery-7.jpeg", alt: "Karigor Interior project 7" },
  { id: 8, src: "/gallery-8.jpeg", alt: "Karigor Interior project 8" },
];

export default function GalleryLightbox() {
  const [active, setActive] = useState(null); // index or null

  const close = useCallback(() => setActive(null), []);

  const prev = useCallback((e) => {
    e.stopPropagation();
    setActive((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  const next = useCallback((e) => {
    e.stopPropagation();
    setActive((i) => (i + 1) % galleryItems.length);
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + galleryItems.length) % galleryItems.length);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % galleryItems.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <>
      {/* ── Gallery grid ── */}
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className="gallery-item reveal"
            style={{ transitionDelay: `${(item.id % 4) * 0.1}s`, cursor: "pointer" }}
            onClick={() => setActive(index)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* ── Lightbox overlay ── */}
      {active !== null && (
        <div className="lightbox-overlay" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Close">✕</button>

          <button className="lightbox-arrow lightbox-arrow-prev" onClick={prev} aria-label="Previous">&#8592;</button>

          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryItems[active].src}
              alt={galleryItems[active].alt}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <button className="lightbox-arrow lightbox-arrow-next" onClick={next} aria-label="Next">&#8594;</button>

          <p className="lightbox-counter">{active + 1} / {galleryItems.length}</p>
        </div>
      )}
    </>
  );
}
