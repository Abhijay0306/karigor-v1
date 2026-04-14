"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      description: formData.get("description"),
    };

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
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{
        marginTop: "24px",
        padding: "32px",
        border: "1px solid rgba(239,233,225,0.25)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "22px", fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "var(--cream)", marginBottom: "12px" }}>
          Thank you for your enquiry.
        </p>
        <p style={{ fontSize: "13px", letterSpacing: "0.08em", color: "rgba(250,248,245,0.6)" }}>
          Our team will be in touch with you shortly.
        </p>
        <button
          style={{ marginTop: "24px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", background: "none", border: "none", color: "rgba(250,248,245,0.5)", cursor: "pointer", textDecoration: "underline" }}
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
        <p style={{ fontSize: "13px", color: "#e07070", marginBottom: "16px", letterSpacing: "0.05em" }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <div className="form-group">
        <label className="form-label">Name *</label>
        <input className="form-input" name="name" type="text" placeholder="Your full name" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input className="form-input" name="email" type="email" placeholder="your@email.com" required />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input className="form-input" name="phone" type="tel" placeholder="+91 97488 50377" required />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Type of Service (Optional)</label>
        <select className="form-input" name="service" style={{ appearance: "none", backgroundColor: "transparent", cursor: "pointer" }}>
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
        <label className="form-label">Description (Optional)</label>
        <textarea className="form-input" name="description" placeholder="Tell us about your vision, timeline, etc." rows="3" style={{ resize: "none" }} />
      </div>

      <button className="btn-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
