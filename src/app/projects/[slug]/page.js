import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BotanicalPattern from "@/components/BotanicalPattern";

// Fallback project details database if offline
const MOCK_PROJECTS = [
  {
    id: "mock-1",
    title: "The Editorial Living Room",
    slug: "editorial-living-room",
    description: "Designed for a family that loves to host, this living room blends sophisticated French oak panels, soft natural fabrics, and sleek travertine marble surfaces. The layout was planned to optimize the circulation paths and draw the eyes toward the focal media unit, which features integrated lighting systems and custom brass shelving. Vastu direction alignments were verified during surveying.",
    category: "Living Room Design",
    style: "Modern Luxury",
    budget: "Affordable Luxury",
    materials: "Travertine Stone, French Oak Veneer, Boucle Fabrics, Solid Brass Trim",
    heroImage: "/gallery-1.jpeg",
    galleryImages: ["/gallery-2.jpeg", "/gallery-3.jpeg", "/gallery-5.jpg"],
    beforeImage: "/gallery-7.jpeg",
    afterImage: "/gallery-1.jpeg",
    published: true,
  },
  {
    id: "mock-2",
    title: "Sleek Charcoal Modular Kitchen",
    slug: "charcoal-modular-kitchen",
    description: "A kitchen is an engine for spatial utility. This modular kitchen showcases zero-fingerprint charcoal surfaces, double-height storage shelves, and hidden pantry cabinets. Sourced directly from our custom carpentry shops, the setup was executed under 3 weeks. Vastu guidelines were integrated by aligning the stove zone to the South-East quadrant.",
    category: "Modular Kitchen",
    style: "Contemporary Minimalist",
    budget: "Premium",
    materials: "Acrylic Shutters, Quartz Countertop Slabs, Blum Hardware Soft-Closes",
    heroImage: "/gallery-4.jpg",
    galleryImages: ["/gallery-5.jpg", "/gallery-6.jpg", "/gallery-1.jpeg"],
    beforeImage: "/gallery-8.jpeg",
    afterImage: "/gallery-4.jpg",
    published: true,
  },
  {
    id: "mock-3",
    title: "Mid-Century Modern Bedroom Suite",
    slug: "mid-century-bedroom-suite",
    description: "A calm, neutral bedroom suite centering walnut wood panel details and custom bed frames. Storage was integrated vertically with floor-to-ceiling wardrobes that paint-match the wall panels, eliminating visual clutter. Acoustic wall backings were added to limit noise travel.",
    category: "Bedroom Design",
    style: "Mid-Century Modern",
    budget: "Affordable Luxury",
    materials: "Burma Teak Wood, Linen Fabric Upholstery, Warm LED Tracks",
    heroImage: "/gallery-2.jpeg",
    galleryImages: ["/gallery-1.jpeg", "/gallery-3.jpeg", "/gallery-6.jpg"],
    beforeImage: null,
    afterImage: null,
    published: true,
  }
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let project;
  try {
    project = await prisma.project.findUnique({
      where: { slug },
    });
  } catch {
    project = MOCK_PROJECTS.find(p => p.slug === slug);
  }

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Karigor Studio Interior Portfolio`,
    description: `${project.description.slice(0, 150)}... Project by Karigor Interior Kolkata.`,
  };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  let project;
  let relatedProjects = [];

  try {
    project = await prisma.project.findUnique({
      where: { slug },
    });
    if (project) {
      relatedProjects = await prisma.project.findMany({
        where: {
          category: project.category,
          slug: { not: slug },
          published: true,
        },
        take: 2,
      });
    }
  } catch (error) {
    console.warn("DB connection offline in Project Detail page. Loading mock data.");
    project = MOCK_PROJECTS.find(p => p.slug === slug);
    if (project) {
      relatedProjects = MOCK_PROJECTS.filter(p => p.category === project.category && p.slug !== slug);
    }
  }

  if (!project) {
    notFound();
  }

  return (
    <main style={{ paddingTop: "100px" }}>
      {/* ─── HERO HEADER ─── */}
      <section style={{ background: "var(--cream)", padding: "80px 60px 48px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--crimson)", marginBottom: "16px" }}>
          <Link href="/projects" style={{ color: "var(--black)", textDecoration: "none" }}>Portfolio</Link>
          <span>/</span>
          <span>{project.category}</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: "300", color: "var(--black)", lineHeight: "1.1", marginBottom: "12px" }}>
          {project.title}
        </h1>
      </section>

      {/* ─── SPECIFICATIONS BAR ─── */}
      <section className="project-spec-bar" style={{ padding: "24px 60px", background: "var(--white)", borderTop: "1px solid var(--sand)", borderBottom: "1px solid var(--sand)", display: "flex", flexWrap: "wrap", gap: "40px 80px" }}>
        <div>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--taupe)", display: "block", marginBottom: "4px" }}>Design Style</span>
          <span style={{ fontSize: "15px", fontWeight: "400", color: "var(--black)" }}>{project.style}</span>
        </div>
        <div>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--taupe)", display: "block", marginBottom: "4px" }}>Budget Bracket</span>
          <span style={{ fontSize: "15px", fontWeight: "400", color: "var(--black)" }}>{project.budget}</span>
        </div>
        <div>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--taupe)", display: "block", marginBottom: "4px" }}>Key Materials</span>
          <span style={{ fontSize: "15px", fontWeight: "400", color: "var(--black)" }}>{project.materials}</span>
        </div>
      </section>

      {/* ─── DETAILED WALKTHROUGH ─── */}
      <section className="project-detail-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", padding: "100px 60px", background: "var(--white)" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "32px", fontWeight: "300", marginBottom: "24px", color: "var(--black)" }}>
            Project Narrative
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "2.0", color: "rgba(50,45,41,0.78)", whiteSpace: "pre-line" }}>
            {project.description}
          </p>

          {/* GALLERY GRID ROW */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div style={{ marginTop: "60px" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "24px", fontWeight: "300", marginBottom: "28px" }}>Gallery Showcase</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {project.galleryImages.map((img, i) => (
                  <div key={i} style={{ position: "relative", height: "260px", width: "100%", backgroundColor: "var(--sand)" }}>
                    <Image
                      src={img}
                      alt={`${project.title} detail ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Before / After comparisons or hero placement */}
        <div>
          {project.beforeImage && project.afterImage ? (
            <div style={{ position: "sticky", top: "120px" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "24px", fontWeight: "300", marginBottom: "20px" }}>Before &amp; After</h3>
              <BeforeAfterSlider 
                beforeSrc={project.beforeImage} 
                afterSrc={project.afterImage} 
                height="480px" 
              />
              <p style={{ fontSize: "12px", color: "var(--taupe)", marginTop: "12px", textAlign: "center", letterSpacing: "0.05em" }}>
                Slide the divider handle to compare construction changes.
              </p>
            </div>
          ) : (
            <div style={{ position: "sticky", top: "120px", width: "100%", height: "480px", backgroundColor: "var(--sand)" }}>
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ─── RELATED PROJECTS ─── */}
      {relatedProjects.length > 0 && (
        <section style={{ padding: "100px 60px", background: "var(--cream)", borderTop: "1px solid var(--sand)" }}>
          <p className="section-label">Explore More</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "36px", fontWeight: "300", marginBottom: "48px" }}>
            Similar <em>projects</em>
          </h2>
          <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            {relatedProjects.map((p) => (
              <Link href={`/projects/${p.slug}`} key={p.id} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ position: "relative", height: "300px", width: "100%", backgroundColor: "var(--sand)", marginBottom: "16px", overflow: "hidden" }}>
                  <Image
                    src={p.heroImage}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    className="hover-zoom"
                  />
                </div>
                <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px", fontWeight: "400", margin: 0 }}>{p.title}</h4>
                <p style={{ fontSize: "12px", color: "var(--taupe)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>{p.category}</p>
              </Link>
            ))}
          </div>

        </section>
      )}

      {/* ─── BOTTOM CTA ─── */}
      <section style={{ textAlign: "center", padding: "100px 60px", background: "var(--crimson)", color: "var(--white)", position: "relative", overflow: "hidden" }}>
        <BotanicalPattern opacity={0.14} color="#EFE9E1" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "36px", fontWeight: "300", marginBottom: "16px" }}>
            Love this design aesthetic?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(250,248,245,0.85)", marginBottom: "32px", maxWidth: "450px", margin: "0 auto 32px" }}>
            Bring a similar Vastu-friendly look to your layout. Book a measurement survey today.
          </p>
          <Link href="/contact" className="btn-primary btn-primary-black">
            Enquire About Similar Project
          </Link>
        </div>
      </section>
    </main>
  );
}
