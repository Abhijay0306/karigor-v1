import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

// Fallback SEO-rich blog articles matching user requests
const MOCK_BLOGS = [
  {
    id: "blog-1",
    title: "Vastu-Friendly Interiors: 5 Ancient Principles for Modern Homes",
    slug: "vastu-friendly-interiors-modern-homes",
    excerpt: "Discover how to balance the flow of energy in your apartment using Vastu guidelines for layout placement, directional alignment, and natural element balancing.",
    content: `
# Vastu-Friendly Interiors: 5 Ancient Principles for Modern Homes

Designing a home is not just about visual aesthetics; it is about how the space feels. In Indian interior design, **Vastu Shastra**—the ancient science of architecture and spatial geometry—plays an essential role in inviting health, harmony, and prosperity into our living environments.

Here are five simple, Vastu-compliant rules that you can easily integrate into your modern apartment layout without sacrificing contemporary style.

## 1. The Entrance (The Gateway of Energy)
The main entrance of the home should ideally face **North, East, or North-East**. This area should be well-lit, clutter-free, and inviting. To attract positive energy, avoid placing shoe racks or garbage cans directly next to the threshold.

## 2. The Kitchen (The Fire Element)
According to Vastu, the kitchen represents the fire element. The ideal zone for the kitchen is the **South-East** corner of the home. When cooking, you should ideally face East. Keep the sink (water) and the stove (fire) apart from each other, as opposing elements can lead to domestic friction.

## 3. The Living Room (The Hub of Gathering)
Your living room should face **North or East**. Vastu suggests that heavy furniture, such as sofas or storage cabinets, should be placed in the **South or West** walls, leaving the center of the room open to circulate light and energy.

## 4. The Master Bedroom (Rest & Strength)
For deep sleep and emotional stability, the master bedroom must be situated in the **South-West** corner. Vastu advises sleeping with your head pointing towards the **South** or **East**—never to the North, which disrupts blood circulation due to magnetic pulls.

## 5. Colors and Light (Atmospheric Balance)
Color psychology is deeply tied to Vastu. Choose warm neutrals like cream, sand, and taupe to promote peace. Subtle crimson accents in the South-East stimulate vitality, while light blues and greens in the North-East support mental clarity.
    `,
    coverImage: "/gallery-3.jpeg",
    category: "Vastu-Friendly",
    tags: ["Vastu", "Home Decor", "Indian Culture"],
    createdAt: new Date("2026-05-10T10:00:00.000Z"),
  },
  {
    id: "blog-2",
    title: "The Ultimate Guide to Luxury Affordable Interiors",
    slug: "guide-luxury-affordable-interiors",
    excerpt: "How to achieve high-end editorial styling on a practical budget. Learn the designer secrets of material selection, focal lighting, and space layering.",
    content: `
# The Ultimate Guide to Luxury Affordable Interiors

Many believe that a premium, luxury home requires an astronomical budget. However, in modern interior design, **luxury is not about cost; it is about intent, curation, and craftsmanship.** 

Here is our studio guide on how to make your home look like a high-end designer space without breaking the bank.

## 1. Focus on the 'Hero' Elements
Don't try to buy high-end versions of every single item. Instead, invest in one or two 'heroes' per room—such as a custom travertine coffee table, a statement chandelier, or an accent velvet armchair. Surround these with high-quality, budget-friendly neutral pieces.

## 2. Layering Textures for Depth
A flat room looks cheap. A premium room looks layered. Combine different textures within the same color family:
* Boucle fabrics on cushions.
* Brushed metal trim on side tables.
* A textured wool rug underfoot.
* Linen-blend sheer curtains that puddle slightly on the floor.

## 3. Sophisticated Color Palettes
Steer clear of neon or high-saturation primary colors. A high-end palette is almost always rooted in warm neutrals: cream, beige, soft charcoal, and off-white. Use deep, rich tones like forest green, navy, or a sophisticated crimson as subtle, deliberate accents.

## 4. Elevating Builder-Grade Hardware
One of the quickest and cheapest design hacks is replacing standard kitchen handles, cabinet hinges, and light switches. Opt for solid brushed brass, matte black metal, or knurled stainless steel handles. It instantly elevates modular cabinetry.
    `,
    coverImage: "/gallery-1.jpeg",
    category: "Affordable Luxury",
    tags: ["Budget Design", "Luxury", "Styling Tips"],
    createdAt: new Date("2026-05-18T10:00:00.000Z"),
  },
  {
    id: "blog-3",
    title: "Space-Saving Ideas for Compact Modern Apartments",
    slug: "space-saving-ideas-modern-apartments",
    excerpt: "Transform tiny floor plans with multifunctional custom furniture, hidden wall storages, and clever paint tricks that make rooms feel double their size.",
    content: `
# Space-Saving Ideas for Compact Modern Apartments

As city living scales up, square footage often scales down. However, compact apartments don't have to feel cramped. With strategic space planning and smart modular solutions, you can maximize utility while retaining a high-end design feel.

## 1. Multifunctional Custom Furniture
Custom furniture is your best friend in a small space. Think sofas with built-in storage drawers, hydraulic beds that lift easily, and nesting coffee tables that can stack away.

## 2. Go Vertical (Floor-to-Ceiling Cabinetry)
Instead of using low, wide dressers that take up valuable floor footprint, build storage upwards. Floor-to-ceiling wardrobes paint-matched to the walls blend into the architecture and draw the eyes upward, making ceilings feel higher.

## 3. Light and Mirrors
Placing large floor mirrors opposite windows reflects natural light and doubles the visual size of a room. Keep window treatments light and airy to let maximum sunlight in.
    `,
    coverImage: "/gallery-5.jpg",
    category: "Space-Saving",
    tags: ["Apartment Living", "Space Planning", "Modular Furniture"],
    createdAt: new Date("2026-05-24T10:00:00.000Z"),
  }
];

function parseMarkdownToHTML(mdText) {
  if (!mdText) return "";
  let html = mdText.trim();
  
  // Headers
  html = html.replace(/^#\s+(.+)$/gm, '<h1 style="font-family: var(--font-cormorant); font-size: 34px; font-weight: 300; margin: 32px 0 16px; color: var(--black); line-height: 1.25;">$1</h1>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 style="font-family: var(--font-cormorant); font-size: 26px; font-weight: 300; margin: 28px 0 14px; color: var(--black); line-height: 1.25;">$1</h2>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 style="font-family: var(--font-cormorant); font-size: 20px; font-weight: 400; margin: 24px 0 12px; color: var(--black);">$1</h3>');
  
  // Bold & Italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 500; color: var(--black);">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em style="font-style: italic;">$1</em>');
  
  // Bullets
  html = html.replace(/^\*\s+(.+)$/gm, '<li style="margin-left: 24px; margin-bottom: 8px; list-style-type: circle; line-height: 1.7; color: rgba(50,45,41,0.78);">$1</li>');

  // Paragraphs
  const sections = html.split(/\n\n+/);
  html = sections
    .map(sec => {
      const trimmed = sec.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<li") || trimmed.startsWith("<ul")) {
        return trimmed;
      }
      return `<p style="margin-bottom: 22px; font-size: 16px; line-height: 1.95; color: rgba(50,45,41,0.78);">${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let blog;
  try {
    blog = await prisma.blogPost.findUnique({
      where: { slug },
    });
  } catch {
    blog = MOCK_BLOGS.find(b => b.slug === slug);
  }

  if (!blog) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${blog.title} | Karigor Design Journal`,
    description: blog.excerpt,
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  let blog;
  let relatedBlogs = [];

  try {
    blog = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (blog) {
      relatedBlogs = await prisma.blogPost.findMany({
        where: {
          category: blog.category,
          slug: { not: slug },
          published: true,
        },
        take: 2,
      });
    }
  } catch (error) {
    console.warn("DB connection offline in Blog details page. Sourcing fallback post.");
    blog = MOCK_BLOGS.find(b => b.slug === slug);
    if (blog) {
      relatedBlogs = MOCK_BLOGS.filter(b => b.category === blog.category && b.slug !== slug);
    }
  }

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": blog.coverImage,
    "datePublished": blog.createdAt,
    "description": blog.excerpt,
    "author": {
      "@type": "Person",
      "name": "Sangeeta Banerjee"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Karigor Interior",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo-black.svg"
      }
    }
  };

  return (
    <main style={{ paddingTop: "100px" }}>
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── BLOG HERO ─── */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 24px 40px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--crimson)", marginBottom: "16px" }}>
          <Link href="/blog" style={{ color: "var(--black)", textDecoration: "none" }}>Journal</Link>
          <span>/</span>
          <span>{blog.category}</span>
        </div>
        
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(34px, 4.5vw, 56px)", fontWeight: "300", color: "var(--black)", lineHeight: "1.2", marginBottom: "20px" }}>
          {blog.title}
        </h1>
        
        <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--taupe)", fontStyle: "italic", marginBottom: "32px" }}>
          {blog.excerpt}
        </p>
      </section>

      {/* ─── BLOG FEATURED IMAGE ─── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto 60px", padding: "0 24px" }}>
        <div style={{ position: "relative", height: "550px", width: "100%", backgroundColor: "var(--sand)" }}>
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* ─── EDITORIAL ARTICLE CONTENT ─── */}
      <section style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr", gap: "60px", maxWidth: "1100px", margin: "0 auto 100px", padding: "0 24px" }}>
        {/* Main Content */}
        <article 
          style={{ fontFamily: "var(--font-jost)", fontSize: "16px", fontWeight: "300" }}
          dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(blog.content) }}
        />

        {/* Sidebar */}
        <aside style={{ alignSelf: "start" }}>
          {/* Studio card */}
          <div style={{ background: "var(--cream)", border: "1px solid var(--sand)", padding: "32px", marginBottom: "40px" }}>
            <h4 style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px", fontWeight: "400", color: "var(--black)", marginBottom: "12px" }}>
              Karigor Interior
            </h4>
            <p style={{ fontSize: "13px", lineHeight: "1.7", color: "rgba(50,45,41,0.78)", marginBottom: "20px" }}>
              We deliver premium interior architecture, custom cabinetry, and Vastu-compliant layouts in Kolkata, matching luxury visuals to affordable costs.
            </p>
            <Link href="/contact" className="btn-primary">
              Book Survey
            </Link>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div>
              <h4 style={{ fontFamily: "var(--font-jost)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--taupe)", borderBottom: "1px solid var(--sand)", paddingBottom: "12px", marginBottom: "16px" }}>
                Related Reading
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {relatedBlogs.map((b) => (
                  <Link href={`/blog/${b.slug}`} key={b.id} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <h5 style={{ fontFamily: "var(--font-cormorant)", fontSize: "18px", fontWeight: "400", lineHeight: "1.3", margin: "0 0 6px" }}>{b.title}</h5>
                    <span style={{ fontSize: "11px", color: "var(--crimson)" }}>{b.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
