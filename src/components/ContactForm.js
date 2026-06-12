"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("Something went wrong. Please try again or email us directly.");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      description: formData.get("description"),
    };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // Validate phone — must be 7–15 digits, optional leading +
    const phoneDigits = data.phone.replace(/[\s\-().]/g, "");
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(phoneDigits)) {
      setStatus("error");
      setErrorMsg("Please enter a valid phone number.");
      return;
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setErrorMsg("Something went wrong. Please try again or email us directly.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{
        marginTop: "24px",
        padding: "32px",
        border: "1px solid var(--sand)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "22px", fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "var(--black)", marginBottom: "12px" }}>
          Thank you for your enquiry.
        </p>
        <p style={{ fontSize: "13px", letterSpacing: "0.08em", color: "rgba(50, 45, 41, 0.78)" }}>
          Our team will be in touch with you shortly.
        </p>
        <button
          style={{ marginTop: "24px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", background: "none", border: "none", color: "var(--crimson)", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status === "error" && (
        <p style={{ fontSize: "13px", color: "var(--crimson)", marginBottom: "16px", letterSpacing: "0.05em", fontWeight: "500" }}>
          {errorMsg}
        </p>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">Name *</label>
        <input id="contact-name" className="form-input" name="name" type="text" placeholder="Your full name" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">Email Address *</label>
          <input id="contact-email" className="form-input" name="email" type="email" placeholder="your@email.com" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">Phone Number *</label>
          <input id="contact-phone" className="form-input" name="phone" type="tel" placeholder="+91 12345 67890" required />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-service">Type of Service (Optional)</label>
        <select id="contact-service" className="form-input" name="service" style={{ appearance: "none", backgroundColor: "transparent", cursor: "pointer" }}>
          <option value="">Select a service</option>
          <option value="Residential Interior Design">Residential Interior Design</option>
          <option value="Commercial Interior Design">Commercial Interior Design</option>
          <option value="Renovation & Remodeling">Renovation &amp; Remodeling</option>
          <option value="Vastu Consulting">Vastu Consulting</option>
          <option value="2D Layout Planning">2D Layout Planning</option>
          <option value="3D Visualization & Renders">3D Visualization &amp; Renders</option>
          <option value="Home Styling / Decor Setup">Home Styling / Decor Setup</option>
          <option value="Modular Kitchen & Wardrobe Design">Modular Kitchen &amp; Wardrobe Design</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-description">Description (Optional)</label>
        <textarea id="contact-description" className="form-input" name="description" placeholder="Tell us about your vision, timeline, etc." rows="3" style={{ resize: "none" }} />
      </div>

      <button className="btn-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
