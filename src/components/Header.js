"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header id="header" className={`${isScrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <a
        href="#"
        className="logo"
        style={{ display: "flex", alignItems: "center" }}
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      >
        <Image
          src={isScrolled || menuOpen ? "/logo-black.svg" : "/logo-white.svg"}
          alt="Karigor Interior"
          width={140}
          height={40}
          priority
          className="nav-logo"
        />
      </a>

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
        <a href="#gallery"  onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>Gallery</a>
        <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Services</a>
        <a href="#studio"   onClick={(e) => { e.preventDefault(); scrollTo("studio"); }}>About Us</a>
        <a href="#contact"  onClick={(e) => { e.preventDefault(); scrollTo("contact"); }} className="nav-cta">Enquire</a>
      </nav>
    </header>
  );
}
