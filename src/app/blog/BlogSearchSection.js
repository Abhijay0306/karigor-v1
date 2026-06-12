"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogSearchSection({ initialBlogs, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <section style={{ padding: "80px 60px 120px", background: "var(--white)" }}>
      {/* Search and Filters Bar */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
          marginBottom: "60px",
          borderBottom: "1px solid var(--sand)",
          paddingBottom: "24px"
        }}
      >
        {/* Category Tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: activeCategory === cat ? "var(--black)" : "none",
                color: activeCategory === cat ? "var(--white)" : "var(--black)",
                border: "1px solid",
                borderColor: activeCategory === cat ? "var(--black)" : "var(--sand)",
                padding: "8px 18px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 40px",
              border: "1px solid var(--sand)",
              fontSize: "14px",
              fontFamily: "var(--font-jost)",
              fontWeight: 300,
              backgroundColor: "transparent",
              outline: "none",
              color: "var(--black)",
            }}
          />
          <svg
            style={{ position: "absolute", left: "14px", top: "14px", color: "var(--taupe)" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Grid of Articles */}
      {filteredBlogs.length === 0 ? (
        <div style={{ padding: "80px 0", textAlign: "center", border: "1px dashed var(--sand)" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "20px", color: "var(--taupe)" }}>
            No journal articles match your query.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "48px 32px" }}>
          {filteredBlogs.map((blog) => (
            <Link 
              href={`/blog/${blog.slug}`} 
              key={blog.id} 
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
              className="blog-card-link"
            >
              <div 
                style={{ 
                  position: "relative", 
                  height: "250px", 
                  width: "100%", 
                  overflow: "hidden", 
                  backgroundColor: "var(--sand)",
                  marginBottom: "24px"
                }}
              >
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  className="blog-card-image"
                />
              </div>
              <span 
                style={{ 
                  fontSize: "11px", 
                  letterSpacing: "0.2em", 
                  textTransform: "uppercase", 
                  color: "var(--crimson)", 
                  display: "block", 
                  marginBottom: "8px" 
                }}
              >
                {blog.category}
              </span>
              <h2 
                style={{ 
                  fontFamily: "var(--font-cormorant)", 
                  fontSize: "24px", 
                  fontWeight: "400", 
                  lineHeight: "1.3", 
                  color: "var(--black)",
                  marginBottom: "12px" 
                }}
              >
                {blog.title}
              </h2>
              <p style={{ fontSize: "14px", lineHeight: "1.7", color: "rgba(50,45,41,0.78)", marginBottom: "20px" }}>
                {blog.excerpt}
              </p>
              <div 
                style={{ 
                  fontSize: "11px", 
                  letterSpacing: "0.08em", 
                  color: "var(--taupe)",
                  textTransform: "uppercase" 
                }}
              >
                {formatDate(blog.createdAt)}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Global CSS bindings for hovers */}
      <style jsx global>{`
        .blog-card-link:hover .blog-card-image {
          transform: scale(1.03);
        }
      `}</style>
    </section>
  );
}
