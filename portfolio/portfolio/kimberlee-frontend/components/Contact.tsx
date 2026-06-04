"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const inputStyle = {
    width: "100%",
    background: "rgba(201,168,76,0.04)",
    border: "0.5px solid rgba(201,168,76,0.2)",
    borderRadius: 1,
    padding: "14px 18px",
    fontFamily: "var(--font-body)",
    fontSize: 12,
    letterSpacing: "0.06em",
    color: "var(--gold-light)",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "96px 0",
        background: "#050402",
        borderTop: "0.5px solid rgba(201,168,76,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ornament */}
      <div style={{
        position: "absolute", top: 40, right: 40,
        width: 120, height: 120,
        border: "0.5px solid rgba(201,168,76,0.08)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 40, left: 40,
        width: 80, height: 80,
        border: "0.5px solid rgba(201,168,76,0.08)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 2 }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: 10, fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--gold)",
          display: "flex", alignItems: "center", gap: 14,
          marginBottom: 20,
        }}>
          <span style={{ width: 28, height: "0.5px", background: "var(--gold)", display: "block", flexShrink: 0 }} />
          Contact
        </div>

        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 4vw, 52px)",
          fontWeight: 300,
          color: "var(--text-primary)",
          letterSpacing: "0.02em",
          marginBottom: 12,
        }}>
          Begin Your <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Enquiry</em>
        </h2>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 12, lineHeight: 2,
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
          marginBottom: 48,
        }}>
          All messages are treated with complete discretion and confidentiality.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
          />
          <textarea
            rows={6}
            placeholder="Your Message"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10, fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bg-base)",
                background: status === "sending" ? "var(--gold-dim)" : "var(--gold)",
                padding: "14px 36px",
                border: "none",
                borderRadius: 1,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "sent" && (
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: 11, letterSpacing: "0.1em",
                color: "var(--gold-dim)",
                fontStyle: "italic",
              }}>
                ✓ Message received — thank you.
              </span>
            )}
            {status === "error" && (
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: 11, letterSpacing: "0.1em",
                color: "#c0504a",
              }}>
                Something went wrong. Please try again.
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}