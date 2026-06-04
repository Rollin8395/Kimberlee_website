"use client";

import { useEffect, useState } from "react";

type Photo = {
  id: number;
  imageUrl: string;
  title: string;
  category?: string;
};

// Fallback placeholder photos shown while API loads or if it fails
const PLACEHOLDERS: Photo[] = [
  { id: -1, imageUrl: "https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53", title: "Glamour", category: "Fashion" },
  { id: -2, imageUrl: "https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287", title: "Lifestyle", category: "Travel" },
  { id: -3, imageUrl: "https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53", title: "Portrait", category: "Glamour" },
  { id: -4, imageUrl: "https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287", title: "Editorial", category: "Fashion" },
  { id: -5, imageUrl: "https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53", title: "Travel", category: "Travel" },
  { id: -6, imageUrl: "https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287", title: "Evening", category: "Lifestyle" },
];

export default function GalleryPreview() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.length ? data : PLACEHOLDERS);
        setLoading(false);
      })
      .catch(() => {
        setPhotos(PLACEHOLDERS);
        setLoading(false);
      });
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <section
        id="gallery"
        style={{
          background: "var(--bg-base)",
          borderTop: "0.5px solid rgba(201,168,76,0.12)",
          padding: "96px 0",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>

          {/* Header */}
          <div style={{ marginBottom: 52 }}>
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
              Portfolio
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 300,
                color: "var(--text-primary)",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}>
                A Glimpse of{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Kimberlee</em>
              </h2>
              <a href="/gallery" style={{
                fontFamily: "var(--font-body)",
                fontSize: 10, fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold-dim)",
                textDecoration: "none",
                borderBottom: "0.5px solid rgba(201,168,76,0.3)",
                paddingBottom: 2,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--gold)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--gold-dim)")}
              >
                View Full Gallery →
              </a>
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  height: 420,
                  background: "var(--bg-card)",
                  animation: "pulse 1.8s ease-in-out infinite",
                  animationDelay: `${i * 0.1}s`,
                }} />
              ))}
            </div>
          )}

          {/* Masonry-style grid */}
          {!loading && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
            }} className="gallery-grid">
              {photos.slice(0, 6).map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => setLightbox(photo)}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: "0.5px solid rgba(201,168,76,0.08)",
                    // Stagger heights for visual rhythm
                    gridRow: i === 0 ? "span 2" : "span 1",
                  }}
                  className="gallery-item"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: i === 0 ? 560 : 270,
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                      transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s",
                    }}
                    className="gallery-img"
                  />
                  {/* Hover overlay */}
                  <div className="gallery-overlay" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(10,8,5,0.85) 0%, transparent 50%)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: 20,
                  }}>
                    {photo.category && (
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 9, letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        border: "0.5px solid rgba(201,168,76,0.5)",
                        padding: "4px 10px",
                        display: "inline-block",
                        marginBottom: 8,
                        width: "fit-content",
                      }}>
                        {photo.category}
                      </span>
                    )}
                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18, fontStyle: "italic",
                      color: "var(--gold-light)",
                      letterSpacing: "0.04em",
                    }}>
                      {photo.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(5,4,2,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "85vw", maxHeight: "90vh" }}>
            <img
              src={lightbox.imageUrl}
              alt={lightbox.title}
              style={{ maxWidth: "85vw", maxHeight: "88vh", objectFit: "contain", display: "block" }}
            />
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute", top: -16, right: -16,
                background: "var(--gold)",
                border: "none",
                width: 36, height: 36,
                borderRadius: "50%",
                color: "var(--bg-base)",
                fontSize: 16,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-body)",
              }}
            >
              ✕
            </button>
            <p style={{
              position: "absolute", bottom: -28, left: 0,
              fontFamily: "var(--font-display)",
              fontSize: 14, fontStyle: "italic",
              color: "var(--gold-dim)",
              letterSpacing: "0.06em",
            }}>
              {lightbox.title}
            </p>
          </div>
        </div>
      )}

      <style>{`
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover .gallery-img     { transform: scale(1.04); filter: brightness(0.88); }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.7; }
        }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .gallery-grid > div:first-child { grid-row: span 1 !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}