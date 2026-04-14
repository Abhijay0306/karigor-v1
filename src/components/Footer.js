import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo" style={{ marginBottom: "24px" }}>
            <Image
              src="/logo-white.svg"
              alt="Karigor Interior"
              width={160}
              height={44}
              className="footer-logo-img"
            />
          </div>
          <p className="footer-brand-desc">A global luxury interior design studio founded to redefine the boundaries of craft, vision and spatial excellence.</p>
          <div className="footer-social">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Pinterest</a>
          </div>
        </div>
        <div>
          <p className="footer-col-title">Studio</p>
          <ul className="footer-links">
            <li><a href="#studio">About Us</a></li>
            <li><a href="#studio">Our Philosophy</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Work</p>
          <ul className="footer-links">
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#services">Services</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Contact</p>
          <ul className="footer-links">
            <li><a href="#contact">Make an Enquiry</a></li>
            <li><a href="#contact">Kolkata Studio</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Karigor Interior. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
