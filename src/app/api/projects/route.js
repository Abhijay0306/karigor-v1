import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// Fallback project data if database connection fails
const MOCK_PROJECTS = [
  {
    id: "mock-1",
    title: "The Editorial Living Room",
    slug: "editorial-living-room",
    description: "A luxury minimalist living room designed for comfort and hosting, utilizing warm oak tones and soft boucle fabrics.",
    category: "Living Room Design",
    style: "Modern Luxury",
    budget: "Affordable Luxury",
    materials: "Travertine, French Oak, Boucle Fabric, Brushed Brass",
    heroImage: "/gallery-1.jpeg",
    galleryImages: ["/gallery-2.jpeg", "/gallery-3.jpeg"],
    beforeImage: "/gallery-7.jpeg",
    afterImage: "/gallery-1.jpeg",
    published: true,
    createdAt: new Date(),
  },
  {
    id: "mock-2",
    title: "Sleek Charcoal Modular Kitchen",
    slug: "charcoal-modular-kitchen",
    description: "A high-performance modular kitchen with seamless anti-fingerprint surfaces, hidden pantry systems, and premium Vastu-friendly layouts.",
    category: "Modular Kitchen",
    style: "Contemporary Minimalist",
    budget: "Premium",
    materials: "Quartz Countertops, Acrylic Cabinets, Integrated LED Lighting",
    heroImage: "/gallery-4.jpg",
    galleryImages: ["/gallery-5.jpg", "/gallery-6.jpg"],
    beforeImage: "/gallery-8.jpeg",
    afterImage: "/gallery-4.jpg",
    published: true,
    createdAt: new Date(),
  },
  {
    id: "mock-3",
    title: "Mid-Century Modern Bedroom Suite",
    slug: "mid-century-bedroom-suite",
    description: "A warm and inviting bedroom suite focusing on walnut paneling, soft atmospheric lighting, and space-saving built-in wardrobes.",
    category: "Bedroom Design",
    style: "Mid-Century Modern",
    budget: "Affordable Luxury",
    materials: "Walnut Veneer, Velvet Upholstery, Terrazzo Side Tables",
    heroImage: "/gallery-2.jpeg",
    galleryImages: ["/gallery-1.jpeg", "/gallery-3.jpeg"],
    beforeImage: null,
    afterImage: null,
    published: true,
    createdAt: new Date(),
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const showAll = searchParams.get("all") === "true";

    const where = {};
    if (category && category !== "All") {
      where.category = category;
    }
    if (!showAll) {
      where.published = true;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.warn("Database connection offline. Serving fallback projects.", error.message);
    // Filter mock data locally
    let projects = MOCK_PROJECTS;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    if (category && category !== "All") {
      projects = projects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase().includes(p.category.toLowerCase()));
    }
    return NextResponse.json(projects);
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      description,
      category,
      style,
      budget,
      materials,
      heroImage,
      galleryImages,
      beforeImage,
      afterImage,
      published,
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        category,
        style,
        budget,
        materials,
        heroImage,
        galleryImages: galleryImages || [],
        beforeImage,
        afterImage,
        published: published !== undefined ? published : true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Database save failed: " + error.message }, { status: 500 });
  }
}
