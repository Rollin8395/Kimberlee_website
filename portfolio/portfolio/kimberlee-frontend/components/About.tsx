export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--bg-deep)",
        borderTop: "0.5px solid rgba(201,168,76,0.12)",
        padding: "96px 0",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 48px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 72,
        alignItems: "center",
      }} className="about-grid">

        {/* Image */}
        <div style={{ position: "relative" }}>
          <img
            src="https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53"
            alt="Kimberlee"
            style={{
              width: "100%",
              height: 680,
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          {/* Gold frame accent */}
          <div style={{
            position: "absolute",
            bottom: -16, right: -16,
            width: "60%", height: "40%",
            border: "0.5px solid rgba(201,168,76,0.25)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: -16, left: -16,
            width: "40%", height: "30%",
            border: "0.5px solid rgba(201,168,76,0.2)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Text */}
        <div>
          {/* Eyebrow */}
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 10, fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--gold)",
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 24,
          }}>
            <span style={{ width: 28, height: "0.5px", background: "var(--gold)", display: "block", flexShrink: 0 }} />
            About
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--text-primary)",
            marginBottom: 32,
            letterSpacing: "0.02em",
          }}>
            The Woman Behind<br />
            The <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Experience</em>
          </h2>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 13, lineHeight: 2.2,
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
            marginBottom: 20,
          }}>
            Hey! I&apos;m <strong style={{ color: "var(--gold-dim)", fontWeight: 400 }}>Kimber Lee</strong>, born in Regensburg, Bavaria.
            I travel frequently because of my work, but I also enjoy spending time
            with family and friends.
          </p>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 13, lineHeight: 2.2,
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
            marginBottom: 20,
          }}>
            Fashion, travel, shopping and nature are some of my biggest passions.
            I enjoy discovering new places, meeting new people, and creating
            memorable experiences through photography and creative projects.
          </p>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 13, lineHeight: 2.2,
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
            marginBottom: 40,
          }}>
            This portfolio is a collection of moments, memories and adventures
            from my journey around the world.
          </p>

          {/* Divider */}
          <div style={{ width: 48, height: "0.5px", background: "rgba(201,168,76,0.3)", marginBottom: 28 }} />

          {/* Signature */}
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: 36,
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--gold)",
            letterSpacing: "0.04em",
          }}>
            Kimberlee
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; padding: 0 28px !important; }
        }
      `}</style>
    </section>
  );
}