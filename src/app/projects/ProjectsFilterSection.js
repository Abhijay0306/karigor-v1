"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsFilterSection({ initialProjects, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? initialProjects
    : initialProjects.filter(p => p.category === activeCategory);

  return (
    <section style={{ padding: "80px 60px 120px", background: "var(--white)" }}>
      {/* Category Tabs */}
      <div 
        style={{ 
          display: "flex", 
          gap: "12px", 
          flexWrap: "wrap", 
          marginBottom: "60px",
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

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <div style={{ padding: "80px 0", textAlign: "center", border: "1px dashed var(--sand)" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "20px", color: "var(--taupe)" }}>
            No projects published in this category yet.
          </p>
        </div>
      ) : (
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", 
            gap: "40px" 
          }}
        >
          {filteredProjects.map((project) => (
            <Link 
              href={`/projects/${project.slug}`} 
              key={project.id}
              className="group"
              style={{ textDecoration: "none", display: "block" }}
            >
              <div 
                style={{ 
                  position: "relative", 
                  height: "360px", 
                  width: "100%", 
                  overflow: "hidden", 
                  backgroundColor: "var(--sand)",
                  marginBottom: "20px"
                }}
              >
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ 
                    objectFit: "cover", 
                    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)" 
                  }}
                  className="project-grid-image"
                />
                <div 
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    background: "linear-gradient(to top, rgba(50,45,41,0.4) 0%, transparent 40%)" 
                  }} 
                />
                <div 
                  style={{ 
                    position: "absolute", 
                    top: "20px", 
                    left: "20px", 
                    background: "var(--crimson)", 
                    color: "white", 
                    padding: "6px 12px", 
                    fontSize: "10px", 
                    letterSpacing: "0.15em", 
                    textTransform: "uppercase" 
                  }}
                >
                  {project.category}
                </div>
              </div>

              <h2 
                style={{ 
                  fontFamily: "var(--font-cormorant)", 
                  fontSize: "24px", 
                  fontWeight: "400", 
                  color: "var(--black)", 
                  marginBottom: "8px",
                  lineHeight: "1.2"
                }}
              >
                {project.title}
              </h2>
              <div 
                style={{ 
                  display: "flex", 
                  gap: "16px", 
                  fontSize: "12px", 
                  letterSpacing: "0.05em", 
                  color: "var(--taupe)",
                  textTransform: "uppercase"
                }}
              >
                <span>{project.style}</span>
                <span>•</span>
                <span>{project.budget}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Global hover transitions */}
      <style jsx global>{`
        .group:hover .project-grid-image {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
}
