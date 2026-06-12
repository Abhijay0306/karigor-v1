"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid administrative credentials.");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", padding: "20px" }}>
      <div style={{ background: "var(--white)", width: "100%", maxWidth: "420px", padding: "48px 40px", border: "1px solid var(--sand)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--taupe)", marginBottom: "8px" }}>Karigor Studio</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "32px", fontWeight: "300", color: "var(--black)", margin: 0 }}>
            Admin <em>Portal</em>
          </h1>
        </div>

        {error && (
          <p style={{ fontSize: "13px", color: "var(--crimson)", marginBottom: "20px", letterSpacing: "0.02em", textAlign: "center", fontWeight: "500" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="login-username" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--taupe)" }}>Username</label>
            <input
              id="login-username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--sand)",
                padding: "10px 0",
                fontSize: "14px",
                fontFamily: "var(--font-jost)",
                fontWeight: 300,
                color: "var(--black)",
                outline: "none",
              }}
            />
          </div>

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="login-password" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--taupe)" }}>Password</label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--sand)",
                padding: "10px 0",
                fontSize: "14px",
                fontFamily: "var(--font-jost)",
                fontWeight: 300,
                color: "var(--black)",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "16px",
              background: "var(--black)",
              color: "var(--white)",
              border: "none",
              padding: "16px",
              fontFamily: "var(--font-jost)",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--crimson)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--black)"}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
