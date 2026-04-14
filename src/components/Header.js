"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header id="header" className={isScrolled ? "scrolled" : ""}>
      <a
        href="#"
        className="logo"
        style={{ display: "flex", alignItems: "center" }}
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      >
        <Image
          src={isScrolled ? "/logo-black.svg" : "/logo-white.svg"}
          alt="Karigor Interior"
          width={140}
          height={40}
          priority
          className="nav-logo"
        />
      </a>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>
      <nav className={menuOpen ? "open" : ""}>
        <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>Gallery</a>
        <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Services</a>
        <a href="#studio" onClick={(e) => { e.preventDefault(); scrollTo("studio"); }}>About Us</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }} className="nav-cta">Enquire</a>
      </nav>
    </header>
  );
}
