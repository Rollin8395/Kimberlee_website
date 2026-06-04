"use client";
export default function FeaturedPhotos() {
  return (
    <section
      style={{
        background: "var(--bg-card)",
        borderTop: "0.5px solid rgba(201,168,76,0.1)",
        padding: "96px 0",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 10, fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--gold)",
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 20,
          }}>
            <span style={{ width: 28, height: "0.5px", background: "var(--gold)", display: "block" }} />
            Featured
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 300,
            color: "var(--text-primary)",
            letterSpacing: "0.02em",
          }}>
            Selected <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Works</em>
          </h2>
        </div>

        {/* Two-up editorial layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 12 }} className="featured-grid">
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              src="https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53"
              alt="Featured"
              style={{ width: "100%", height: 700, objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: 24, left: 24,
              fontFamily: "var(--font-display)",
              fontSize: 13, fontStyle: "italic",
              color: "rgba(201,168,76,0.7)",
              letterSpacing: "0.06em",
            }}>
              Glamour Series
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <img
                src="https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287"
                alt="Featured 2"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>
            <div style={{
              padding: "28px 32px",
              border: "0.5px solid rgba(201,168,76,0.15)",
              background: "var(--bg-base)",
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 22, fontStyle: "italic",
                fontWeight: 300,
                color: "var(--text-muted)",
                lineHeight: 1.8,
                letterSpacing: "0.03em",
                marginBottom: 20,
              }}>
                &ldquo;Every frame is a moment frozen in gold.&rdquo;
              </p>
              <a href="#gallery" style={{
                fontFamily: "var(--font-body)",
                fontSize: 10, fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bg-base)",
                background: "var(--gold)",
                padding: "11px 26px",
                display: "inline-block",
                width: "fit-content",
                textDecoration: "none",
                borderRadius: 1,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "var(--gold-light)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--gold)")}
              >
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}