import { notFound } from "next/navigation";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BotanicalPattern from "@/components/BotanicalPattern";

// Static details dictionary for each of the 9 interior design services
const SERVICES_DATA = {
  "residential-interior-design": {
    title: "Residential Interior Design Studio",
    subtitle: "Complete home formatting for luxury apartments and duplexes.",
    metaTitle: "Luxury Residential Interior Designers in Kolkata | Karigor",
    metaDesc: "Elevate your home with Karigor's luxury residential design. From spatial planning to final styling, we build editorial spaces within your budget.",
    desc: "We approach residential design as a custom portrait of its inhabitants. Our studio specializes in high-fidelity space optimization for modern apartments, ensuring every corner represents your personal aesthetic and functional needs. We integrate custom millwork, curated lighting, and selected color stories to transform your space.",
    vastuTip: "Ensure the North-East zone of your residence is kept light and clutter-free to facilitate the influx of positive energies.",
    materialHighlight: "Water-resistant marine grade plywood, teak veneer paneling, high-durability linen blends, and solid brass accents.",
    workflowDetail: "Structural measurement -> 2D flow zoning -> 3D photo renders -> Material tray reviews -> On-site civil execution -> Furnishing installation.",
    beforeImg: "/gallery-7.jpeg",
    afterImg: "/gallery-1.jpeg",
  },
  "modular-kitchen": {
    title: "German Modular Kitchen Systems",
    subtitle: "High-performance, space-saving kitchen layouts.",
    metaTitle: "German Modular Kitchen Design Kolkata | Affordable Luxury",
    metaDesc: "Discover high-performance modular kitchen designs in Kolkata by Karigor. Customized smart pantry storage and soft-close mechanisms.",
    desc: "A kitchen is a workspace that must run with engineering precision. We construct German-style modular kitchens utilizing durable, waterproof materials, anti-scratch acrylic finishes, and smart storage organizers (pull-out larders, corner carousels, soft-close drawers).",
    vastuTip: "Place the cooking hub (stove) in the South-East zone of the kitchen, and keep water sinks in the North-East side.",
    materialHighlight: "Boiling Waterproof (BWP) blockboards, seamless acrylic shutters, quartz stone counter slabs, and Blum hardware fittings.",
    workflowDetail: "Triangle workflow calculation -> Cabinet height mapping -> Material finish selection -> Carcass pre-assembly -> Site integration.",
    beforeImg: "/gallery-8.jpeg",
    afterImg: "/gallery-4.jpg",
  },
  "bedroom-design": {
    title: "Luxury Bedroom Design",
    subtitle: "Restful sanctuaries optimized for sleep and comfort.",
    metaTitle: "Premium Bedroom Interior Designers Kolkata | Karigor",
    metaDesc: "Create a tranquil master bedroom with Karigor Interior. Custom upholstered headboards, hidden storage wardrobes, and atmospheric lighting.",
    desc: "Your bedroom is where the day begins and ends. We focus heavily on sensory design: acoustic dampening panels, blackout window tracks, warm ambient lighting arrays (3000K), and custom hydraulic bed systems that maximize hidden space.",
    vastuTip: "Position the bed headboard towards the South or West, and avoid placing mirror panels directly facing the bed.",
    materialHighlight: "Velvet fabric panels, walnut veneer trims, soft-touch laminates, and warm-glow LED tracks.",
    beforeImg: "/gallery-7.jpeg",
    afterImg: "/gallery-2.jpeg",
  },
  "living-room-design": {
    title: "Living Room Design",
    subtitle: "Editorial-style common areas designed for hosting.",
    metaTitle: "Premium Living Room Interior Designers in Kolkata",
    metaDesc: "Design a statement-making living room. Karigor blends elegant textures, focal media walls, and custom furniture for extraordinary hosting.",
    desc: "The living room represents the social face of your home. We combine custom-engineered television consoles, stone-clad feature walls, and modular seating arrangements that invite conversation, balancing grandeur with warmth.",
    vastuTip: "Place heavy seating systems along the South and West walls of the room, leaving the North-East floor center open.",
    materialHighlight: "Travertine cladding slabs, boucle fabrics, brushed steel accents, and light oak floor panels.",
    beforeImg: "/gallery-8.jpeg",
    afterImg: "/gallery-3.jpeg",
  },
  "office-interior": {
    title: "Office & Commercial Interiors",
    subtitle: "Workspaces optimized for productivity and brand identity.",
    metaTitle: "Commercial & Office Interior Designers Kolkata | Karigor",
    metaDesc: "Elevate your workplace. Karigor designs ergonomic offices, conference hubs, and client greeting zones that reflect brand values.",
    desc: "A well-designed workspace boosts team productivity by up to 20%. We balance functional acoustics, ergonomic desk heights, task lighting, and strategic brand placements to create clean corporate office and clinic interiors.",
    vastuTip: "Position the business owner's desk in the South-West sector facing North or East to support authority and focus.",
    materialHighlight: "Acoustic fabric walls, commercial grade carpet tiles, powder-coated steel table frames, and high-gloss reception counters.",
    beforeImg: null,
    afterImg: null,
  },
  "renovation": {
    title: "Renovation & Remodeling",
    subtitle: "Complete structural transformations for aged spaces.",
    metaTitle: "Apartment Renovation & Bathroom Remodeling Kolkata",
    metaDesc: "Complete home renovation by Karigor. We handle floor replacement, plumbing overhauls, drywall layout mapping, and paint finishes.",
    desc: "Renovating requires a deep understanding of historical structures. We handle floor tile replacement, bathroom waterproofing updates, plumbing lines replacement, structural wall adjustments (if permitted), and complete drywall framing.",
    vastuTip: "Correct old structural defects (like leaky pipes or dark corners) to restore clean Vastu energy flow.",
    materialHighlight: "Italian marble flooring, anti-fungal wall seals, concealed copper piping, and premium emulsion paints.",
    beforeImg: "/gallery-8.jpeg",
    afterImg: "/gallery-1.jpeg",
  },
  "space-planning": {
    title: "Space Planning & 2D Layouts",
    subtitle: "Precise dimensional maps and circulation flow layouts.",
    metaTitle: "2D Layout & Interior Space Planning Services Kolkata",
    metaDesc: "Achieve functional layout layouts. Karigor maps out furniture dimensions, door swings, and walking corridors before you build.",
    desc: "Good design starts with a pen. We measure your rooms down to the millimeter and draft multiple zoning options, detailing door swing clearances, walk-through pathways, and electrical plug access coordinates.",
    vastuTip: "Maintain the Brahmasthan (exact geometrical center of the property) open and free of walls or column placements.",
    materialHighlight: "High-accuracy laser surveys, digital CAD blueprints, and electrical mapping overlays.",
    beforeImg: null,
    afterImg: null,
  },
  "custom-furniture": {
    title: "Custom Furniture & Millwork",
    subtitle: "Tailor-made woodwork pieces built in our private shop.",
    metaTitle: "Bespoke Wood Furniture Manufacturers Kolkata | Karigor",
    metaDesc: "Order custom dining sets, storage sideboards, and bed frames crafted in Karigor's workshop. 100% seasoned teak and waterproof plywood.",
    desc: "Standard showroom furniture rarely fits local room dimensions. We craft custom credenzas, dining sets, floating vanity desks, and wardrobe closets inside our private workshops, ensuring millimeter accuracy and wood longevity.",
    vastuTip: "Prefer square or rectangular wooden furniture shapes; avoid circular or irregular metal dining tops.",
    materialHighlight: "Seasoned Burma Teak, water-resistant marine ply, high-pressure laminates, and heavy-duty drawer runners.",
    beforeImg: null,
    afterImg: null,
  },
  "turnkey-solutions": {
    title: "Turnkey Design & Execution",
    subtitle: "One cohesive contract from layout blueprints to key handovers.",
    metaTitle: "Turnkey Interior Design Contractors in Kolkata | Karigor",
    metaDesc: "Hassle-free home design. Karigor manages 3D renders, modular workshop builds, plumbing, wiring, painting, and final staging.",
    desc: "Why coordinate with ten separate carpenters, painters, and suppliers? With our turnkey service, you sign one contract. We handle 3D renderings, material orders, plumbing, wiring, painting, and clean up for a move-in ready handover.",
    vastuTip: "Start your layout build with an auspicious Bhoomi Pooja/home blessing to align work energy from day one.",
    materialHighlight: "Full material accountability logs, direct supply chains, and strict quality control checklists.",
    beforeImg: "/gallery-7.jpeg",
    afterImg: "/gallery-4.jpg",
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDesc,
  };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  return (
    <main style={{ paddingTop: "100px" }}>
      {/* ─── HERO HEADER ─── */}
      <section style={{ background: "var(--cream)", padding: "80px 60px 60px" }}>
        <p className="section-label">Service Spotlight</p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(42px, 5vw, 68px)", fontWeight: "300", color: "var(--black)", lineHeight: "1.1", marginBottom: "16px" }}>
          {service.title}
        </h1>
        <p style={{ fontSize: "16px", letterSpacing: "0.08em", color: "var(--crimson)", textTransform: "uppercase", marginBottom: "28px" }}>
          {service.subtitle}
        </p>
      </section>

      {/* ─── DETAILED BREAKDOWN ─── */}
      <section className="service-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", padding: "100px 60px", background: "var(--white)" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "32px", fontWeight: "300", marginBottom: "24px" }}>
            The Studio <em>Approach</em>
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.9", color: "rgba(50,45,41,0.78)", marginBottom: "32px" }}>
            {service.desc}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ borderLeft: "2px solid var(--crimson)", paddingLeft: "20px" }}>
              <h4 style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--taupe)", marginBottom: "6px" }}>Vastu Guideline</h4>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--black)" }}>{service.vastuTip}</p>
            </div>

            <div style={{ borderLeft: "2px solid var(--crimson)", paddingLeft: "20px" }}>
              <h4 style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--taupe)", marginBottom: "6px" }}>Materials Used</h4>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--black)" }}>{service.materialHighlight}</p>
            </div>

            <div style={{ borderLeft: "2px solid var(--crimson)", paddingLeft: "20px" }}>
              <h4 style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--taupe)", marginBottom: "6px" }}>Execution Milestones</h4>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--black)" }}>{service.workflowDetail}</p>
            </div>
          </div>
        </div>

        {/* Before/After slider showcase if images exist, else visual decoration */}
        <div>
          {service.beforeImg && service.afterImg ? (
            <div style={{ position: "sticky", top: "120px" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "24px", fontWeight: "300", marginBottom: "16px", color: "var(--black)" }}>
                Transformation Showcase
              </h3>
              <BeforeAfterSlider 
                beforeSrc={service.beforeImg} 
                afterSrc={service.afterImg} 
                height="450px" 
              />
              <p style={{ fontSize: "12px", color: "var(--taupe)", marginTop: "12px", textAlign: "center", letterSpacing: "0.05em" }}>
                Drag the central bar to review structural details.
              </p>
            </div>
          ) : (
            <div style={{ position: "sticky", top: "120px", height: "450px", background: "var(--cream)", border: "1px solid var(--sand)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center" }}>
              <div style={{ width: "80px", height: "1px", background: "var(--crimson)", marginBottom: "20px" }}></div>
              <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "24px", fontWeight: "400", color: "var(--black)", marginBottom: "12px" }}>Bespoke Execution</h4>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "rgba(50,45,41,0.78)" }}>
                Every design is customized to fit your room parameters. Sourced directly from our local Kolkata mills for maximum cost efficiency.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── SECTION CTA ─── */}
      <section style={{ textAlign: "center", padding: "100px 60px", background: "var(--cream)", borderTop: "1px solid var(--sand)", position: "relative", overflow: "hidden" }}>
        <BotanicalPattern opacity={0.06} color="#AC9C8D" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "36px", fontWeight: "300", color: "var(--black)", marginBottom: "16px" }}>
            Ready to design yours?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(50,45,41,0.78)", marginBottom: "32px", maxWidth: "680px", margin: "0 auto 32px" }}>
            Connect with Principal Designer Sangeeta Banerjee for an initial spacing consultation and modular budget walkthrough.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Book Consultation</Link>
            <a href="https://wa.me/919748850377" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: "var(--black)", borderColor: "var(--black)" }}>
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
