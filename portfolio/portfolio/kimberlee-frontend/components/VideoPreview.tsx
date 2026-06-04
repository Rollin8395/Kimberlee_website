"use client";

import { useEffect, useState } from "react";

type Video = {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration?: string;
  category?: string;
};

const PLACEHOLDERS: Video[] = [
  { id: -1, title: "Behind the Scenes",  thumbnailUrl: "https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53", duration: "3:42", category: "BTS" },
  { id: -2, title: "Travel Diary — Italy", thumbnailUrl: "https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287", duration: "5:18", category: "Travel" },
  { id: -3, title: "Fashion Week Edit",   thumbnailUrl: "https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53", duration: "2:55", category: "Fashion" },
];

async function getVideos(): Promise<Video[]> {
  const res = await fetch("http://localhost:8080/api/videos");
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export default function VideoPreview() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    getVideos()
      .then((data) => { setVideos(data.length ? data : PLACEHOLDERS); setLoading(false); })
      .catch(() => { setVideos(PLACEHOLDERS); setLoading(false); });
  }, []);

  return (
    <>
      <section
        id="videos"
        style={{
          background: "var(--bg-deep)",
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
              Videos
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
                Featured{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Videos</em>
              </h2>
              <a href="/videos" style={{
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
                View All Videos →
              </a>
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[...Array(3)].map((_, i) => (
                <div key={i} style={{
                  height: 340,
                  background: "var(--bg-card)",
                  animation: "pulse 1.8s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </div>
          )}

          {/* Video cards */}
          {!loading && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }} className="video-grid">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: "0.5px solid rgba(201,168,76,0.08)",
                    background: "var(--bg-card)",
                    transition: "border-color 0.2s",
                  }}
                  className="video-card"
                >
                  {/* Thumbnail */}
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      style={{
                        width: "100%",
                        height: 260,
                        objectFit: "cover",
                        objectPosition: "center top",
                        display: "block",
                        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                      }}
                      className="video-thumb"
                    />

                    {/* Dark overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(5,4,2,0.35)",
                      transition: "background 0.3s",
                    }} className="video-overlay" />

                    {/* Play button */}
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div className="play-btn" style={{
                        width: 52, height: 52,
                        borderRadius: "50%",
                        border: "0.5px solid rgba(201,168,76,0.7)",
                        background: "rgba(10,8,5,0.6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.2s, transform 0.2s",
                      }}>
                        <div style={{
                          width: 0, height: 0,
                          borderTop: "9px solid transparent",
                          borderBottom: "9px solid transparent",
                          borderLeft: "16px solid var(--gold)",
                          marginLeft: 4,
                        }} />
                      </div>
                    </div>

                    {/* Duration badge */}
                    {video.duration && (
                      <div style={{
                        position: "absolute", bottom: 12, right: 12,
                        fontFamily: "var(--font-body)",
                        fontSize: 10, letterSpacing: "0.1em",
                        color: "var(--gold-light)",
                        background: "rgba(10,8,5,0.7)",
                        padding: "3px 8px",
                        border: "0.5px solid rgba(201,168,76,0.3)",
                      }}>
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Card footer */}
                  <div style={{ padding: "18px 20px 20px" }}>
                    {video.category && (
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 9, letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--gold-dim)",
                        display: "block",
                        marginBottom: 6,
                      }}>
                        {video.category}
                      </span>
                    )}
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20, fontWeight: 300,
                      fontStyle: "italic",
                      color: "var(--text-primary)",
                      letterSpacing: "0.02em",
                    }}>
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video modal */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(5,4,2,0.96)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            position: "relative",
            width: "80vw", maxWidth: 900,
          }}>
            {activeVideo.videoUrl ? (
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                style={{ width: "100%", display: "block", border: "0.5px solid var(--border-gold)" }}
              />
            ) : (
              <div style={{
                width: "100%", aspectRatio: "16/9",
                background: "var(--bg-card)",
                border: "0.5px solid var(--border-gold)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 12,
              }}>
                <div style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "24px solid rgba(201,168,76,0.3)" }} />
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  No video source available
                </p>
              </div>
            )}
            <button
              onClick={() => setActiveVideo(null)}
              style={{
                position: "absolute", top: -16, right: -16,
                background: "var(--gold)", border: "none",
                width: 36, height: 36, borderRadius: "50%",
                color: "var(--bg-base)", fontSize: 16,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >✕</button>
            <p style={{
              marginTop: 16,
              fontFamily: "var(--font-display)",
              fontSize: 18, fontStyle: "italic",
              color: "var(--gold-dim)",
              letterSpacing: "0.04em",
            }}>
              {activeVideo.title}
            </p>
          </div>
        </div>
      )}

      <style>{`
        .video-card:hover { border-color: rgba(201,168,76,0.3) !important; }
        .video-card:hover .video-thumb   { transform: scale(1.04); }
        .video-card:hover .video-overlay { background: rgba(5,4,2,0.2) !important; }
        .video-card:hover .play-btn      { background: rgba(201,168,76,0.15) !important; transform: scale(1.1); }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.7; }
        }
        @media (max-width: 900px) {
          .video-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .video-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}