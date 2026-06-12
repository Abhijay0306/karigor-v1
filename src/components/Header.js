"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when path changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (
        navRef.current && !navRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [menuOpen]);

  return (
    <header id="header" className={`${isScrolled || pathname !== "/" ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <Link
        href="/"
        className="logo"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image
          src={isScrolled || pathname !== "/" || menuOpen ? "/logo-black.svg" : "/logo-white.svg"}
          alt="Karigor Interior"
          width={140}
          height={40}
          priority
          className="nav-logo"
        />
      </Link>

      <button
        className="hamburger"
        ref={hamburgerRef}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
      </button>

      <nav ref={navRef} className={menuOpen ? "open" : ""}>
        <Link href="/projects" className={pathname === "/projects" ? "active" : ""}>Portfolio</Link>
        <Link href="/gallery" className={pathname === "/gallery" ? "active" : ""}>Gallery</Link>
        <Link href="/services" className={pathname.startsWith("/services") ? "active" : ""}>Services</Link>
        <Link href="/about" className={pathname === "/about" ? "active" : ""}>About Us</Link>
        <Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""}>Blog</Link>
        <Link href="/contact" className="nav-cta">Enquire</Link>
      </nav>

      {/* Maroon Announcement Banner */}
      <div 
        style={{ 
          position: "absolute", 
          top: "100%", 
          left: 0, 
          width: "100%", 
          background: "var(--crimson)", 
          color: "var(--white)", 
          textTransform: "uppercase", 
          fontSize: "10px", 
          letterSpacing: "0.22em", 
          padding: "8px 20px", 
          textAlign: "center", 
          fontWeight: "400",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          pointerEvents: "none",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          opacity: isScrolled || pathname !== "/" ? 1 : 0,
          transform: isScrolled || pathname !== "/" ? "translateY(0)" : "translateY(-100%)",
          transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: -1
        }}
      >
        Easy finance or installment options also available
      </div>
    </header>
  );
}
