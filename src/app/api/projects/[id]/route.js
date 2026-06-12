import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

    const updatedProject = await prisma.project.update({
      where: { id },
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
        published,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: "Database update failed: " + error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Database delete failed: " + error.message }, { status: 500 });
  }
}
