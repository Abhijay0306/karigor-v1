import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
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
    published: true,
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
    published: true,
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
    published: true,
    createdAt: new Date("2026-05-24T10:00:00.000Z"),
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const showAll = searchParams.get("all") === "true";

    const where = {};
    if (!showAll) {
      where.published = true;
    }
    if (category && category !== "All") {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const blogs = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.warn("Database connection offline. Serving fallback blogs.", error.message);
    let blogs = MOCK_BLOGS;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    if (category && category !== "All") {
      blogs = blogs.filter(b => b.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      blogs = blogs.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }
    return NextResponse.json(blogs);
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, category, tags, published } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const blog = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags: tags || [],
        published: published !== undefined ? published : true,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to create blog:", error);
    return NextResponse.json({ error: "Database save failed: " + error.message }, { status: 500 });
  }
}
