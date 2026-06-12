"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function DashboardConsole({ initialProjects, initialBlogs, initialLeads }) {
  const [activeTab, setActiveTab] = useState("leads"); // leads, projects, blog
  const [projects, setProjects] = useState(initialProjects);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [leads, setLeads] = useState(initialLeads);

  // Editing / Form states
  const [editingProject, setEditingProject] = useState(null); // null or project object (empty object for NEW)
  const [editingBlog, setEditingBlog] = useState(null); // null or blog object (empty object for NEW)
  const [uploadProgress, setUploadProgress] = useState("");

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  // Image Upload helper
  const handleImageUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress("Uploading...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        callback(data.url);
        setUploadProgress("Upload complete!");
      } else {
        alert("Upload failed: " + data.error);
        setUploadProgress("Upload failed.");
      }
    } catch (err) {
      alert("Upload error.");
      setUploadProgress("Upload error.");
    }
  };

  // Project Actions
  const handleSaveProject = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const slug = formData.get("slug") || formData.get("title").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    const projectData = {
      title: formData.get("title"),
      slug,
      description: formData.get("description"),
      category: formData.get("category"),
      style: formData.get("style"),
      budget: formData.get("budget"),
      materials: formData.get("materials"),
      heroImage: editingProject.heroImage || "/gallery-1.jpeg",
      galleryImages: editingProject.galleryImages || [],
      beforeImage: editingProject.beforeImage || null,
      afterImage: editingProject.afterImage || null,
      published: formData.get("published") === "true",
    };

    const isNew = !editingProject.id;
    const url = isNew ? "/api/projects" : `/api/projects/${editingProject.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      const saved = await res.json();
      
      if (saved.error) {
        alert("Save failed: " + saved.error);
        return;
      }

      if (isNew) {
        setProjects([saved, ...projects]);
      } else {
        setProjects(projects.map(p => p.id === saved.id ? saved : p));
      }
      setEditingProject(null);
    } catch (err) {
      alert("Failed to save project.");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch {
      alert("Delete failed.");
    }
  };

  // Blog Actions
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const slug = formData.get("slug") || formData.get("title").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    const blogData = {
      title: formData.get("title"),
      slug,
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: formData.get("tags") ? formData.get("tags").split(",").map(t => t.trim()) : [],
      coverImage: editingBlog.coverImage || "/gallery-1.jpeg",
      published: formData.get("published") === "true",
    };

    const isNew = !editingBlog.id;
    const url = isNew ? "/api/blog" : `/api/blog/${editingBlog.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      const saved = await res.json();
      
      if (saved.error) {
        alert("Save failed: " + saved.error);
        return;
      }

      if (isNew) {
        setBlogs([saved, ...blogs]);
      } else {
        setBlogs(blogs.map(b => b.id === saved.id ? saved : b));
      }
      setEditingBlog(null);
    } catch (err) {
      alert("Failed to save article.");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
      }
    } catch {
      alert("Delete failed.");
    }
  };

  // Lead Actions
  const handleUpdateLeadStatus = async (id, status) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const updated = await res.json();
      if (updated.id) {
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch {
      alert("Status update failed.");
    }
  };

  return (
    <section style={{ padding: "0 60px 100px", maxWidth: "1280px", margin: "0 auto" }}>
      {/* Console Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid var(--sand)", paddingBottom: "24px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "36px", fontWeight: "300", color: "var(--black)" }}>
            Studio <em>Console</em>
          </h1>
          <p style={{ fontSize: "12px", color: "var(--taupe)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Logged in as Principal Admin</p>
        </div>
        <button onClick={handleLogout} style={{ background: "none", border: "1px solid var(--crimson)", color: "var(--crimson)", padding: "10px 24px", cursor: "pointer", fontFamily: "var(--font-jost)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Log Out
        </button>
      </div>

      {/* Tabs list */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
        <button 
          onClick={() => { setActiveTab("leads"); setEditingProject(null); setEditingBlog(null); }}
          style={{ padding: "12px 28px", border: "none", cursor: "pointer", background: activeTab === "leads" ? "var(--black)" : "var(--sand)", color: activeTab === "leads" ? "var(--white)" : "var(--black)", fontFamily: "var(--font-jost)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Enquiry Leads ({leads.length})
        </button>
        <button 
          onClick={() => { setActiveTab("projects"); setEditingProject(null); setEditingBlog(null); }}
          style={{ padding: "12px 28px", border: "none", cursor: "pointer", background: activeTab === "projects" ? "var(--black)" : "var(--sand)", color: activeTab === "projects" ? "var(--white)" : "var(--black)", fontFamily: "var(--font-jost)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Portfolio Projects ({projects.length})
        </button>
        <button 
          onClick={() => { setActiveTab("blog"); setEditingProject(null); setEditingBlog(null); }}
          style={{ padding: "12px 28px", border: "none", cursor: "pointer", background: activeTab === "blog" ? "var(--black)" : "var(--sand)", color: activeTab === "blog" ? "var(--white)" : "var(--black)", fontFamily: "var(--font-jost)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Blog Journal ({blogs.length})
        </button>
      </div>

      {/* TAB CONTENT: LEADS */}
      {activeTab === "leads" && (
        <div style={{ background: "var(--white)", border: "1px solid var(--sand)", padding: "32px", overflowX: "auto" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: "300", marginBottom: "24px" }}>Active Inquiries</h2>
          {leads.length === 0 ? (
            <p style={{ fontStyle: "italic", color: "var(--taupe)", textAlign: "center", padding: "40px 0" }}>No leads logged yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--sand)", textAlign: "left" }}>
                  <th style={{ padding: "12px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)" }}>Date</th>
                  <th style={{ padding: "12px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)" }}>Client</th>
                  <th style={{ padding: "12px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)" }}>Contact</th>
                  <th style={{ padding: "12px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)" }}>Service</th>
                  <th style={{ padding: "12px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)" }}>Message</th>
                  <th style={{ padding: "12px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)" }}>Status</th>
                  <th style={{ padding: "12px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: "1px solid var(--cream)", fontSize: "14px" }}>
                    <td style={{ padding: "12px" }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: "12px", fontWeight: 500 }}>{lead.name}</td>
                    <td style={{ padding: "12px" }}>
                      <a href={`mailto:${lead.email}`} style={{ color: "var(--crimson)", textDecoration: "none" }}>{lead.email}</a>
                      <div style={{ fontSize: "12px", color: "var(--taupe)", marginTop: "4px" }}>{lead.phone}</div>
                    </td>
                    <td style={{ padding: "12px" }}>{lead.service || "—"}</td>
                    <td style={{ padding: "12px", maxWidth: "250px", whiteSpace: "normal" }}>{lead.description || "—"}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ 
                        display: "inline-block", 
                        padding: "4px 8px", 
                        fontSize: "10px", 
                        letterSpacing: "0.05em",
                        textTransform: "uppercase", 
                        backgroundColor: lead.status === "new" ? "rgba(114,56,61,0.1)" : lead.status === "contacted" ? "rgba(37,211,102,0.1)" : "rgba(172,156,141,0.2)",
                        color: lead.status === "new" ? "var(--crimson)" : lead.status === "contacted" ? "#1e8e4c" : "var(--black)"
                      }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                      {lead.status === "new" && (
                        <button onClick={() => handleUpdateLeadStatus(lead.id, "contacted")} style={{ padding: "4px 8px", fontSize: "10px", textTransform: "uppercase", cursor: "pointer", background: "none", border: "1px solid #1e8e4c", color: "#1e8e4c" }}>
                          Contacted
                        </button>
                      )}
                      {lead.status !== "archived" && (
                        <button onClick={() => handleUpdateLeadStatus(lead.id, "archived")} style={{ padding: "4px 8px", fontSize: "10px", textTransform: "uppercase", cursor: "pointer", background: "none", border: "1px solid var(--taupe)", color: "var(--taupe)" }}>
                          Archive
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TAB CONTENT: PORTFOLIO PROJECTS */}
      {activeTab === "projects" && !editingProject && (
        <div style={{ background: "var(--white)", border: "1px solid var(--sand)", padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: "300" }}>Portfolio Showcases</h2>
            <button onClick={() => setEditingProject({ heroImage: "", galleryImages: [], published: true })} style={{ background: "var(--crimson)", color: "var(--white)", border: "none", padding: "10px 20px", cursor: "pointer", fontFamily: "var(--font-jost)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Add Project
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {projects.map((p) => (
              <div key={p.id} style={{ border: "1px solid var(--sand)", padding: "16px", position: "relative", backgroundColor: "var(--cream)" }}>
                <div style={{ position: "relative", height: "160px", width: "100%", backgroundColor: "var(--sand)", marginBottom: "12px" }}>
                  <Image src={p.heroImage} alt={p.title} fill style={{ objectFit: "cover" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px", margin: "0 0 4px" }}>{p.title}</h3>
                <span style={{ fontSize: "11px", color: "var(--crimson)", textTransform: "uppercase", display: "block" }}>{p.category}</span>
                <span style={{ fontSize: "12px", color: "var(--taupe)", marginTop: "6px", display: "block" }}>
                  {p.published ? "🟢 Published" : "🔴 Draft"}
                </span>

                <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                  <button onClick={() => setEditingProject(p)} style={{ flex: 1, padding: "6px 0", fontSize: "11px", textTransform: "uppercase", background: "var(--black)", color: "white", border: "none", cursor: "pointer" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProject(p.id)} style={{ padding: "6px 12px", fontSize: "11px", textTransform: "uppercase", background: "none", border: "1px solid var(--crimson)", color: "var(--crimson)", cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECT EDITOR FORM */}
      {activeTab === "projects" && editingProject && (
        <div style={{ background: "var(--white)", border: "1px solid var(--sand)", padding: "40px" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: "300", marginBottom: "24px" }}>
            {editingProject.id ? "Edit Project" : "Create New Project"}
          </h2>

          {uploadProgress && (
            <div style={{ background: "var(--cream)", padding: "12px", marginBottom: "20px", fontSize: "13px", color: "var(--crimson)" }}>
              {uploadProgress}
            </div>
          )}

          <form onSubmit={handleSaveProject} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input className="form-input" name="title" defaultValue={editingProject.title} required placeholder="e.g. Modern Minimalist Kitchen" />
              </div>
              <div className="form-group">
                <label className="form-label">URL Slug (leave blank to auto-generate)</label>
                <input className="form-input" name="slug" defaultValue={editingProject.slug} placeholder="e.g. modern-minimalist-kitchen" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-input" name="category" defaultValue={editingProject.category || "Residential Interior Design"} required>
                  <option value="Residential Interior Design">Residential Interior Design</option>
                  <option value="Modular Kitchen">Modular Kitchen</option>
                  <option value="Bedroom Design">Bedroom Design</option>
                  <option value="Living Room Design">Living Room Design</option>
                  <option value="Office Interior">Office Interior</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Space Planning">Space Planning</option>
                  <option value="Custom Furniture">Custom Furniture</option>
                  <option value="Turnkey Solutions">Turnkey Solutions</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Design Style *</label>
                <input className="form-input" name="style" defaultValue={editingProject.style} required placeholder="e.g. Modern Luxury, Scandinavian" />
              </div>
              <div className="form-group">
                <label className="form-label">Budget Range *</label>
                <input className="form-input" name="budget" defaultValue={editingProject.budget} required placeholder="e.g. Affordable Luxury, Premium" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Materials Description *</label>
              <input className="form-input" name="materials" defaultValue={editingProject.materials} required placeholder="e.g. Teak Veneer, French Boucle, Brushed Brass" />
            </div>

            <div className="form-group">
              <label className="form-label">Project Narrative Description *</label>
              <textarea className="form-input" name="description" defaultValue={editingProject.description} required rows="5" style={{ resize: "none" }} placeholder="Describe the layout challenges, Vastu compliance, and customization details." />
            </div>

            {/* IMAGE UPLOAD SECTION */}
            <div style={{ background: "var(--cream)", padding: "24px", border: "1px solid var(--sand)" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px", marginBottom: "16px" }}>Upload Media Assets</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
                {/* Hero Cover */}
                <div>
                  <label style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)", display: "block", marginBottom: "8px" }}>Hero Image (Cover)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setEditingProject(prev => ({ ...prev, heroImage: url })))} />
                  {editingProject.heroImage && (
                    <div style={{ position: "relative", height: "100px", width: "100%", marginTop: "12px", border: "1px solid var(--sand)" }}>
                      <Image src={editingProject.heroImage} alt="Hero preview" fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                </div>

                {/* Before Image */}
                <div>
                  <label style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)", display: "block", marginBottom: "8px" }}>Before Image (Renovation)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setEditingProject(prev => ({ ...prev, beforeImage: url })))} />
                  {editingProject.beforeImage && (
                    <div style={{ position: "relative", height: "100px", width: "100%", marginTop: "12px", border: "1px solid var(--sand)" }}>
                      <Image src={editingProject.beforeImage} alt="Before preview" fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                </div>

                {/* After Image */}
                <div>
                  <label style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)", display: "block", marginBottom: "8px" }}>After Image (Renovation)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setEditingProject(prev => ({ ...prev, afterImage: url })))} />
                  {editingProject.afterImage && (
                    <div style={{ position: "relative", height: "100px", width: "100%", marginTop: "12px", border: "1px solid var(--sand)" }}>
                      <Image src={editingProject.afterImage} alt="After preview" fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Images (multiple) */}
              <div style={{ marginTop: "24px", borderTop: "1px solid var(--sand)", paddingTop: "20px" }}>
                <label style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)", display: "block", marginBottom: "8px" }}>Additional Gallery Images</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setEditingProject(prev => ({ ...prev, galleryImages: [...(prev.galleryImages || []), url] })))} />
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                  {editingProject.galleryImages?.map((img, i) => (
                    <div key={i} style={{ position: "relative", height: "80px", width: "80px", border: "1px solid var(--sand)" }}>
                      <Image src={img} alt="Gallery item" fill style={{ objectFit: "cover" }} />
                      <button type="button" onClick={() => setEditingProject(prev => ({ ...prev, galleryImages: prev.galleryImages.filter((_, idx) => idx !== i) }))} style={{ position: "absolute", top: 2, right: 2, padding: "2px 4px", fontSize: "8px", background: "red", color: "white", border: "none", cursor: "pointer" }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Publication Status</label>
                <select className="form-input" name="published" defaultValue={editingProject.published ? "true" : "false"}>
                  <option value="true">Published (Visible on site)</option>
                  <option value="false">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
              <button className="btn-submit" type="submit" style={{ margin: 0 }}>Save Project</button>
              <button type="button" onClick={() => setEditingProject(null)} style={{ padding: "18px 44px", fontSize: "14px", letterSpacing: "0.28em", textTransform: "uppercase", cursor: "pointer", background: "none", border: "1px solid var(--black)", color: "var(--black)" }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: BLOG POSTS */}
      {activeTab === "blog" && !editingBlog && (
        <div style={{ background: "var(--white)", border: "1px solid var(--sand)", padding: "32px" }}>
          <div style={{ display: "flex", justifySpace: "space-between", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: "300" }}>Blog Articles</h2>
            <button onClick={() => setEditingBlog({ coverImage: "", tags: [], published: true })} style={{ background: "var(--crimson)", color: "var(--white)", border: "none", padding: "10px 20px", cursor: "pointer", fontFamily: "var(--font-jost)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Create Article
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {blogs.map((b) => (
              <div key={b.id} style={{ border: "1px solid var(--sand)", padding: "16px", position: "relative", backgroundColor: "var(--cream)" }}>
                <div style={{ position: "relative", height: "160px", width: "100%", backgroundColor: "var(--sand)", marginBottom: "12px" }}>
                  <Image src={b.coverImage} alt={b.title} fill style={{ objectFit: "cover" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px", margin: "0 0 4px" }}>{b.title}</h3>
                <span style={{ fontSize: "11px", color: "var(--crimson)", textTransform: "uppercase", display: "block" }}>{b.category}</span>
                <span style={{ fontSize: "12px", color: "var(--taupe)", marginTop: "6px", display: "block" }}>
                  {b.published ? "🟢 Published" : "🔴 Draft"}
                </span>

                <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                  <button onClick={() => setEditingBlog(b)} style={{ flex: 1, padding: "6px 0", fontSize: "11px", textTransform: "uppercase", background: "var(--black)", color: "white", border: "none", cursor: "pointer" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteBlog(b.id)} style={{ padding: "6px 12px", fontSize: "11px", textTransform: "uppercase", background: "none", border: "1px solid var(--crimson)", color: "var(--crimson)", cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BLOG EDITOR FORM */}
      {activeTab === "blog" && editingBlog && (
        <div style={{ background: "var(--white)", border: "1px solid var(--sand)", padding: "40px" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: "300", marginBottom: "24px" }}>
            {editingBlog.id ? "Edit Article" : "Create New Article"}
          </h2>

          {uploadProgress && (
            <div style={{ background: "var(--cream)", padding: "12px", marginBottom: "20px", fontSize: "13px", color: "var(--crimson)" }}>
              {uploadProgress}
            </div>
          )}

          <form onSubmit={handleSaveBlog} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Article Title *</label>
                <input className="form-input" name="title" defaultValue={editingBlog.title} required placeholder="Vastu Rules for Kitchens" />
              </div>
              <div className="form-group">
                <label className="form-label">URL Slug (leave blank to auto-generate)</label>
                <input className="form-input" name="slug" defaultValue={editingBlog.slug} placeholder="vastu-rules-kitchen" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-input" name="category" defaultValue={editingBlog.category || "Home Decor"} required>
                  <option value="Vastu-Friendly">Vastu-Friendly</option>
                  <option value="Affordable Luxury">Affordable Luxury</option>
                  <option value="Space-Saving">Space-Saving</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Color Psychology">Color Psychology</option>
                  <option value="Apartment Ideas">Apartment Ideas</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input className="form-input" name="tags" defaultValue={editingBlog.tags?.join(", ")} placeholder="Vastu, Kitchen, Space-Saving" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Excerpt (Summary) *</label>
              <input className="form-input" name="excerpt" defaultValue={editingBlog.excerpt} required placeholder="A brief preview of the article content to display on the blog card listing." />
            </div>

            {/* Cover Image Upload */}
            <div style={{ background: "var(--cream)", padding: "24px", border: "1px solid var(--sand)" }}>
              <label style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--taupe)", display: "block", marginBottom: "8px" }}>Cover Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setEditingBlog(prev => ({ ...prev, coverImage: url })))} />
              {editingBlog.coverImage && (
                <div style={{ position: "relative", height: "150px", width: "100%", maxWidth: "300px", marginTop: "12px", border: "1px solid var(--sand)" }}>
                  <Image src={editingBlog.coverImage} alt="Cover preview" fill style={{ objectFit: "cover" }} />
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Article Content (Markdown Supported) *</label>
              <textarea className="form-input" name="content" defaultValue={editingBlog.content} required rows="12" style={{ resize: "none", fontFamily: "monospace", fontSize: "13px" }} placeholder="# H1 Header\nUse standard headings, **bold text**, or bullet points (* Item)." />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="form-group">
                <label className="form-label">Publication Status</label>
                <select className="form-input" name="published" defaultValue={editingBlog.published ? "true" : "false"}>
                  <option value="true">Published (Visible on site)</option>
                  <option value="false">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
              <button className="btn-submit" type="submit" style={{ margin: 0 }}>Save Article</button>
              <button type="button" onClick={() => setEditingBlog(null)} style={{ padding: "18px 44px", fontSize: "14px", letterSpacing: "0.28em", textTransform: "uppercase", cursor: "pointer", background: "none", border: "1px solid var(--black)", color: "var(--black)" }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
