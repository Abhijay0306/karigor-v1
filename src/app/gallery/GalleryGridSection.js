"use client";

import { useState } from "react";
import GalleryLightbox from "@/components/GalleryLightbox";

export default function GalleryGridSection({ allImages, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All"
    ? allImages
    : allImages.filter(img => img.category === activeCategory);

  return (
    <section style={{ padding: "60px 60px 120px", background: "var(--white)" }}>
      {/* Category Tabs */}
      <div 
        style={{ 
          display: "flex", 
          gap: "12px", 
          flexWrap: "wrap", 
          marginBottom: "48px",
          borderBottom: "1px solid var(--sand)",
          paddingBottom: "16px"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              padding: "8px 16px",
              cursor: "pointer",
              color: activeCategory === cat ? "var(--crimson)" : "var(--black)",
              fontWeight: activeCategory === cat ? "500" : "300",
              position: "relative",
              transition: "color 0.3s ease",
            }}
          >
            {cat}
            {activeCategory === cat && (
              <span 
                style={{ 
                  position: "absolute", 
                  bottom: "-17px", 
                  left: 0, 
                  right: 0, 
                  height: "2px", 
                  backgroundColor: "var(--crimson)" 
                }} 
              />
            )}
          </button>
        ))}
      </div>

      {/* Lightboxed Masonry Grid */}
      {filteredImages.length === 0 ? (
        <div style={{ padding: "80px 0", textAlign: "center", border: "1px dashed var(--sand)" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "20px", color: "var(--taupe)" }}>
            No gallery photographs in this category yet.
          </p>
        </div>
      ) : (
        <GalleryLightbox images={filteredImages} />
      )}
    </section>
  );
}
