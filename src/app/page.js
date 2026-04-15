import GalleryLightbox from "@/components/GalleryLightbox";
import ContactForm from "@/components/ContactForm";

const servicesList = [
  {
    num: "01",
    title: "Residential Interior Design",
    desc: "Full-home or room-specific design (living room, bedroom, kitchen, etc.) tailored to your lifestyle and aesthetic preferences.",
  },
  {
    num: "02",
    title: "Commercial Interior Design",
    desc: "Elevate your brand with designed offices, retail stores, cafes, clinics, and dynamic co-working spaces.",
  },
  {
    num: "03",
    title: "Renovation & Remodeling",
    desc: "Complete space transformation for existing interiors, breathing new life into tired structures.",
  },
  {
    num: "04",
    title: "Vastu Consulting",
    desc: "Align your architecture and interior design with ancient Vastu principles for harmony and energy balance.",
  },
  {
    num: "05",
    title: "2D Layout Planning",
    desc: "Comprehensive floor plans with accurate zoning, spatial flow analysis, and strategic furniture mapping.",
  },
  {
    num: "06",
    title: "3D Visualization & Renders",
    desc: "Experience your space before construction begins through photorealistic visual previews and immersive 3D walkthroughs.",
  },
  {
    num: "07",
    title: "Home Styling / Decor Setup",
    desc: "The final curated touch: sourcing and staging bespoke cushions, fine art, plants, and unique accessories.",
  },
  {
    num: "08",
    title: "Modular Kitchen & Wardrobe Design",
    desc: "Highly functional, aesthetically seamless modular kitchen systems and customised wardrobe solutions for modern living.",
  },
];


export default function Home() {
  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <p className="hero-eyebrow">Interior Design · Architecture · Project Management</p>
          <h1>Spaces crafted<br />for <em>extraordinary</em><br />living.</h1>
          <p className="hero-desc">Karigor Interior was founded on the belief that exceptional design should be within reach — delivered through a seamless integration of architecture, interiors, and project management within one cohesive studio.</p>
          <div className="hero-actions">
            <a href="#services" className="btn-primary">Services</a>
            <a href="#contact" className="btn-ghost">Enquire</a>
          </div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-bar">
        <div className="marquee-track">
          <span className="marquee-item">Luxury Residences <span className="marquee-dot"></span></span>
          <span className="marquee-item">Commercial Interiors <span className="marquee-dot"></span></span>
          <span className="marquee-item">Architecture <span className="marquee-dot"></span></span>
          <span className="marquee-item">Bespoke Craftsmanship <span className="marquee-dot"></span></span>
          <span className="marquee-item">Project Management <span className="marquee-dot"></span></span>
          <span className="marquee-item">Hospitality Design <span className="marquee-dot"></span></span>
          <span className="marquee-item">International Projects <span className="marquee-dot"></span></span>
          <span className="marquee-item">Luxury Residences <span className="marquee-dot"></span></span>
          <span className="marquee-item">Commercial Interiors <span className="marquee-dot"></span></span>
          <span className="marquee-item">Architecture <span className="marquee-dot"></span></span>
          <span className="marquee-item">Bespoke Craftsmanship <span className="marquee-dot"></span></span>
          <span className="marquee-item">Project Management <span className="marquee-dot"></span></span>
          <span className="marquee-item">Hospitality Design <span className="marquee-dot"></span></span>
          <span className="marquee-item">International Projects <span className="marquee-dot"></span></span>
        </div>
      </div>

      {/* ─── INTRO / ABOUT ─── */}
      <section className="intro" id="studio">
        <div className="intro-left">
          <div className="reveal">
            <p className="section-label">What We Do</p>
            <h2 className="section-title">Redefining luxury through <em>vision</em> and craft</h2>
          </div>
          <p className="intro-body reveal reveal-delay-1">
            Karigor Interior was founded on a profound appreciation for the fusion of creativity and thoughtful design — enveloped within a service that is as personal as it is professional. We believe that a beautifully crafted space is not a privilege reserved for the few, but a considered investment that every home and business deserves.
          </p>
          <p className="intro-body reveal reveal-delay-2" style={{ marginTop: "20px" }}>
            Guided by refined expertise, our designers span the creative disciplines — from interior architecture and space planning to project management and bespoke craftsmanship — working closely within your vision and budget to bring every project to fruition with artistry, transparency, and decades of mastery.
          </p>
          <div className="intro-stats reveal reveal-delay-3">
            <div>
              <div className="stat-num">10+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div>
              <div className="stat-num">180+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
        <div className="intro-right reveal">
          <div className="intro-image-block">
            <div className="img-card img-card-main" style={{ backgroundImage: "url('/section2.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            </div>
            <div className="img-card img-card-accent">
              <p className="img-card-accent-text">Craft, vision &amp; unrivalled expertise</p>
            </div>
            <div className="intro-tag">Est. 2014</div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="projects" id="gallery">
        <div className="projects-header reveal">
          <div>
            <p className="section-label">Selected Works</p>
            <h2 className="section-title">Our <em>gallery</em></h2>
          </div>
        </div>

        <GalleryLightbox />
      </section>

      {/* ─── SERVICES ─── */}
      <section className="services" id="services">
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p className="section-label">What We Do</p>
            <h2 className="section-title">A fully <em>integrated</em> studio</h2>
          </div>
        </div>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className={`service-card reveal${index % 4 !== 0 ? ` reveal-delay-${index % 4}` : ""}`}>
              <div className="service-num">{service.num}</div>
              <h3 className="service-title" style={{ fontSize: "22px" }}>{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <a href="#contact" className="service-link">Inquire Now</a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="philosophy">
        <div className="philosophy-bg"></div>
        <div className="philosophy-lines"></div>
        <div className="philosophy-content reveal">
          <blockquote className="philosophy-quote">
            &quot;Luxury is not about excess — it is about intention. We bring <em>exceptional design</em> within reach, crafting spaces that resonate with beauty, purpose, and enduring value.&quot;
          </blockquote>
          <p className="philosophy-attr">Karigor Interior — Studio Philosophy</p>
        </div>
        <div className="philosophy-deco">&ldquo;</div>
      </section>

      {/* ─── CONTACT / FORM ─── */}
      <div className="cta-section" id="contact">
        <div className="cta-left">
          <div>
            <p className="cta-tag">Begin a Conversation</p>
            <h2 className="cta-title">Let&apos;s create something extraordinary.</h2>
            <p className="cta-sub">Interior Design · Architecture · Project Management</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "rgba(250,248,245,0.5)", letterSpacing: "0.1em", marginBottom: "8px" }}>Studio, Kolkata</p>
            <a href="mailto:karigorinterior55@gmail.com" style={{ display: "block", fontSize: "13px", color: "rgba(250,248,245,0.7)", letterSpacing: "0.05em", textDecoration: "none" }}>karigorinterior55@gmail.com</a>
            <a href="tel:+919748850377" style={{ display: "block", fontSize: "13px", color: "rgba(250,248,245,0.7)", letterSpacing: "0.05em", marginTop: "6px", textDecoration: "none" }}>+91 97488 50377</a>
            <a href="tel:+917439118283" style={{ display: "block", fontSize: "13px", color: "rgba(250,248,245,0.7)", letterSpacing: "0.05em", marginTop: "4px", textDecoration: "none" }}>+91 74391 18283</a>
          </div>
        </div>
        <div className="cta-right">
          <h3 className="cta-right-title">Make an enquiry</h3>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
