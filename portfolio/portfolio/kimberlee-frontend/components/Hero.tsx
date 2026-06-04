"use client";
export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0a0805 0%, #1a1208 45%, #0a0805 100%)",
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          repeating-linear-gradient(90deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 0.5px, transparent 0.5px, transparent 64px),
          repeating-linear-gradient(0deg,  rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 0.5px, transparent 0.5px, transparent 64px)
        `,
        pointerEvents: "none",
      }} />

      {/* Corner ornaments */}
      <div style={{ position: "absolute", top: 32, left: 32, width: 80, height: 80,
        borderTop: "0.5px solid rgba(201,168,76,0.35)", borderLeft: "0.5px solid rgba(201,168,76,0.35)" }} />
      <div style={{ position: "absolute", bottom: 32, right: 32, width: 80, height: 80,
        borderBottom: "0.5px solid rgba(201,168,76,0.35)", borderRight: "0.5px solid rgba(201,168,76,0.35)" }} />

      {/* Left content */}
      <div style={{
        width: "50%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 64px 80px",
        position: "relative", zIndex: 2,
      }} className="hero-left">

        {/* Eyebrow */}
        <div className="fade-up" style={{
          fontFamily: "var(--font-body)",
          fontSize: 10, fontWeight: 500,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--gold)",
          display: "flex", alignItems: "center", gap: 14,
          marginBottom: 28,
        }}>
          <span style={{ display: "block", width: 28, height: "0.5px", background: "var(--gold)", flexShrink: 0 }} />
          Official Portfolio
        </div>

        {/* Name */}
        <h1 className="fade-up delay-1" style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(64px, 7vw, 100px)",
          fontWeight: 300,
          lineHeight: 1.0,
          color: "var(--text-primary)",
          letterSpacing: "0.04em",
          marginBottom: 10,
        }}>
          Kim<em style={{ color: "var(--gold)", fontStyle: "italic" }}>berlee</em>
        </h1>

        {/* Tagline */}
        <p className="fade-up delay-2" style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontStyle: "italic",
          fontWeight: 300,
          color: "var(--gold-dim)",
          letterSpacing: "0.06em",
          marginBottom: 28,
        }}>
          Model · Creator · Traveler
        </p>

        {/* Description */}
        <p className="fade-up delay-3" style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 2.0,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          maxWidth: 380,
          marginBottom: 44,
        }}>
          Born in Regensburg, Bavaria. Sharing moments from fashion,
          lifestyle and adventures around the world.
        </p>

        {/* Buttons */}
        <div className="fade-up delay-4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#gallery" style={{
            fontFamily: "var(--font-body)",
            fontSize: 10, fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--bg-base)",
            background: "var(--gold)",
            padding: "14px 34px",
            borderRadius: 1,
            textDecoration: "none",
            transition: "background 0.2s, transform 0.15s",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "var(--gold-light)"; el.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "var(--gold)"; el.style.transform = "translateY(0)"; }}
          >
            View Gallery
          </a>
          <a href="#about" style={{
            fontFamily: "var(--font-body)",
            fontSize: 10, fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            background: "transparent",
            padding: "13px 34px",
            border: "0.5px solid rgba(201,168,76,0.4)",
            borderRadius: 1,
            textDecoration: "none",
            transition: "border-color 0.2s, transform 0.15s",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--gold)"; el.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(201,168,76,0.4)"; el.style.transform = "translateY(0)"; }}
          >
            About Me
          </a>
        </div>

        {/* Scroll hint */}
        <div className="fade-up delay-5" style={{
          position: "absolute", bottom: 40, left: 64,
          display: "flex", alignItems: "center", gap: 12,
          fontFamily: "var(--font-body)",
          fontSize: 9, letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(160,128,64,0.4)",
        }}>
          <span style={{ display: "block", width: 36, height: "0.5px", background: "rgba(160,128,64,0.3)" }} />
          Scroll
        </div>
      </div>

      {/* Right image panel */}
      <div className="hero-right" style={{
        width: "50%", position: "relative",
        borderLeft: "0.5px solid rgba(201,168,76,0.1)",
      }}>
        <img
          src="https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287"
          alt="Kimberlee"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.85)",
          }}
        />
        {/* Gold vignette overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(10,8,5,0.5) 0%, transparent 40%, transparent 80%, rgba(10,8,5,0.2) 100%)",
          pointerEvents: "none",
        }} />
        {/* Bottom label */}
        <div style={{
          position: "absolute", bottom: 32, left: 32,
          fontFamily: "var(--font-display)",
          fontSize: 13, fontStyle: "italic",
          color: "rgba(201,168,76,0.6)",
          letterSpacing: "0.08em",
        }}>
          Kimberlee, 2025
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }
        .delay-5 { animation-delay: 0.75s; }
        @media (max-width: 768px) {
          .hero-left  { width: 100% !important; padding: 120px 32px 80px !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  );
}