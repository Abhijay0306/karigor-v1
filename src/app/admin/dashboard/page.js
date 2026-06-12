import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import DashboardConsole from "./DashboardConsole";

export const metadata = {
  title: "Admin Studio Dashboard | Karigor Interior",
  description: "Administrative console to upload and edit projects, write blog posts, and manage customer leads.",
};

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  let projects = [];
  let blogs = [];
  let leads = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Serialize dates
    projects = projects.map(p => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.warn("Prisma projects fetch failed for dashboard:", err.message);
  }

  try {
    blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Serialize dates
    blogs = blogs.map(b => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.warn("Prisma blogs fetch failed for dashboard:", err.message);
  }

  try {
    leads = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Serialize dates
    leads = leads.map(l => ({
      ...l,
      createdAt: l.createdAt.toISOString(),
    }));
  } catch (err) {
    console.warn("Prisma leads fetch failed for dashboard:", err.message);
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--cream)", paddingTop: "100px" }}>
      <DashboardConsole 
        initialProjects={projects} 
        initialBlogs={blogs} 
        initialLeads={leads} 
      />
    </main>
  );
}
