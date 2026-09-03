"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getVideos, Video, FALLBACK_VIDEOS } from "@/lib/api";

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let mounted = true;

    getVideos()
      .then((data) => {
        if (!mounted) return;

        setVideos(data.length ? data : FALLBACK_VIDEOS);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;

        setVideos(FALLBACK_VIDEOS);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");

    return `${m}:${sec}`;
  };

  const openModal = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
    setTotalTime("0:00");
  };

  const closeModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    setActiveVideo(null);
    setIsPlaying(false);
    setIsFullscreen(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    if (!activeVideo) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }

      if (e.key === " " && activeVideo.videoUrl) {
        e.preventDefault();
        togglePlay();
      }

      if (e.key.toLowerCase() === "m" && activeVideo.videoUrl) {
        toggleMute();
      }

      if (e.key.toLowerCase() === "f" && activeVideo.videoUrl) {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [
    activeVideo,
    closeModal,
    togglePlay,
    toggleMute,
    toggleFullscreen,
  ]);

  const onTimeUpdate = () => {
    if (!videoRef.current) return;

    const { currentTime: ct, duration } = videoRef.current;

    if (!duration) return;

    setProgress((ct / duration) * 100);
    setCurrentTime(formatTime(ct));
    setTotalTime(formatTime(duration));
  };

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;

    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  return (
    <main className="min-h-[100dvh] flex flex-col bg-[#0a0805] text-[#f0e0b0]">
      <Navbar />

      <div className="flex-1 w-full">

        {/* NAVBAR SPACER */}
        <div className="h-[88px] w-full shrink-0" />

        {/* ========================================================= */}
        {/* VIDEO VAULT HERO */}
        {/* ========================================================= */}

        <section className="relative w-full overflow-hidden bg-[#0a0805] py-16 sm:py-20 lg:py-24">

          {/* Subtle center glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/[0.035] blur-[110px]" />

          <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-center px-6 text-center">

            {/* Eyebrow */}
            <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]/75">
              The Collection
            </p>

            {/* Title */}
            <h1 className="font-display text-5xl font-light leading-none tracking-[0.01em] text-[#f5eed6] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Video{" "}
              <em className="font-normal italic text-[#c9a84c]">
                Vault
              </em>
            </h1>

            {/* Count */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#c9a84c]/30" />

              <span className="text-[11px] uppercase tracking-[0.35em] text-[#c9a84c]/60">
                {videos.length} Videos
              </span>

              <span className="h-px w-8 bg-[#c9a84c]/30" />
            </div>

            {/* VIP Access */}
            <div className="mt-4">
              <a
                href="https://onlyfans.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#c9a84c]/40 px-3 py-1 transition-colors duration-300 hover:border-[#c9a84c]"
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]">
                  VIP Access
                </span>
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SKELETON LOADING */}
        {/* ========================================================= */}

        {loading && (
          <section className="w-full px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 xl:px-10 2xl:px-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-lg bg-[#140e06]"
                />
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* VIDEO GRID */}
        {/* ========================================================= */}

        {!loading && (
          <section className="w-full flex-1 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 xl:px-10 2xl:px-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => openModal(video)}
                  className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-[#140e06]">

                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0805]/70 via-transparent to-transparent opacity-80" />

                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#070503]/60 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:border-white/40 group-hover:bg-[#c9a84c]">

                        {video.isVip ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white group-hover:text-[#070503]"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                            />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        ) : (
                          <div className="ml-1 h-0 w-0 border-b-[7px] border-l-[13px] border-t-[7px] border-b-transparent border-l-white border-t-transparent transition-colors group-hover:border-l-[#070503]" />
                        )}

                      </div>
                    </div>

                    {/* Duration */}
                    {video.duration && (
                      <div className="absolute bottom-3 right-3 rounded-sm bg-[#0a0805]/80 px-2.5 py-0.5 text-[11px] font-medium text-[#e8d5a3] backdrop-blur-sm">
                        {video.duration}
                      </div>
                    )}

                    {/* VIP / Category */}
                    <div className="absolute left-3 top-3">
                      {video.isVip ? (
                        <span className="rounded-sm bg-[#c9a84c] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#070503]">
                          VIP Teaser
                        </span>
                      ) : (
                        <span className="rounded-sm bg-[#0a0805]/60 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#c9a84c] backdrop-blur-sm">
                          {video.category || "Preview"}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Card Info */}
                  <div className="p-5">
                    <h3 className="mb-1.5 font-display text-lg font-light leading-snug text-[#f5eed6] transition-colors duration-300 group-hover:text-[#c9a84c]">
                      {video.title}
                    </h3>

                    <p className="flex items-center justify-between text-[10px] text-[#6d5b38]">
                      <span>
                        {video.isVip ? "VIP Exclusive" : "Public Teaser"}
                      </span>

                      <span className="text-[#c9a84c]">
                        Watch &rarr;
                      </span>
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </section>
        )}

      </div>

      {/* =========================================================== */}
      {/* VIDEO PLAYER / VIP MODAL */}
      {/* =========================================================== */}

      {activeVideo && (
        <div
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex animate-fade-in flex-col items-center justify-center bg-[#050402]/96 p-4 backdrop-blur-2xl sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-xl"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-[#c9a84c]/10 bg-[#120e06]/90 p-5 backdrop-blur-xl">

              <div className="flex min-w-0 items-center gap-3">
                {activeVideo.isVip && (
                  <span className="shrink-0 rounded-sm bg-[#c9a84c] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#070503]">
                    VIP 18+
                  </span>
                )}

                <h3 className="max-w-lg truncate font-display text-lg font-light italic text-[#f5eed6] sm:text-xl">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#161108] text-sm font-bold text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#070503]"
              >
                &times;
              </button>

            </div>

            {/* ===================================================== */}
            {/* VIP LOCK SCREEN */}
            {/* ===================================================== */}

            {activeVideo.isVip ? (
              <div className="relative flex aspect-video flex-col items-center justify-center bg-[#0c0905] p-8 text-center">

                <img
                  src={activeVideo.thumbnailUrl}
                  alt={activeVideo.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-30 blur-md"
                />

                <div className="relative z-10 max-w-md">

                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a84c]/30 bg-[#161108] text-[#c9a84c]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                      />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>

                  <h4 className="mb-2 font-display text-xl font-light text-[#f5eed6] sm:text-2xl">
                    VIP Only
                  </h4>

                  <p className="mb-6 text-xs text-[#7a6a4a]">
                    Full 4K video exclusive to VIP members.
                  </p>

                  <a
                    href="https://onlyfans.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-sm bg-[#c9a84c] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#070503] transition-colors duration-300 hover:bg-[#e8d5a3]"
                  >
                    Unlock on OnlyFans
                  </a>

                </div>
              </div>

            ) : activeVideo.videoUrl ? (

              /* =================================================== */
              /* VIDEO PLAYER */
              /* =================================================== */

              <div className="relative aspect-video bg-black">

                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.thumbnailUrl}
                  onTimeUpdate={onTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="h-full w-full cursor-pointer object-contain"
                />

                {/* Controls */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">

                  {/* Progress */}
                  <div
                    onClick={onProgressClick}
                    className="mb-3 h-1.5 w-full cursor-pointer rounded bg-white/20 transition-all hover:h-2.5"
                  >
                    <div
                      style={{ width: `${progress}%` }}
                      className="h-full rounded bg-[#c9a84c]"
                    />
                  </div>

                  {/* Control Row */}
                  <div className="flex items-center justify-between text-xs text-[#e8d5a3]">

                    <div className="flex items-center gap-4">

                      <button
                        type="button"
                        onClick={togglePlay}
                        className="font-bold text-[#c9a84c] transition-colors hover:text-[#f5eed6]"
                      >
                        {isPlaying ? "Pause" : "Play"}
                      </button>

                      <button
                        type="button"
                        onClick={toggleMute}
                        className="text-[#7a6a4a] transition-colors hover:text-[#f5eed6]"
                      >
                        {isMuted ? "Unmute" : "Mute"}
                      </button>

                      <span className="text-[11px] text-[#6d5b38]">
                        {currentTime} / {totalTime}
                      </span>

                    </div>

                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="text-[11px] uppercase tracking-wider text-[#c9a84c] transition-colors hover:text-[#f5eed6]"
                    >
                      {isFullscreen
                        ? "Exit Fullscreen [F]"
                        : "Fullscreen [F]"}
                    </button>

                  </div>
                </div>
              </div>

            ) : (

              /* =================================================== */
              /* 4K PREVIEW */
              /* =================================================== */

              <div className="relative flex aspect-video flex-col items-center justify-center bg-[#0c0905] p-8 text-center">

                <img
                  src={activeVideo.thumbnailUrl}
                  alt={activeVideo.title}
                  className="absolute inset-0 h-full w-full object-cover brightness-50"
                />

                <div className="relative z-10 max-w-md rounded-xl border border-[#c9a84c]/10 bg-[#0a0805]/90 p-8 backdrop-blur-xl">

                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#161108] text-[#c9a84c]">
                    &#9654;
                  </div>

                  <h4 className="mb-1 font-display text-lg font-light text-[#f5eed6]">
                    4K Preview
                  </h4>

                  <p className="mb-5 text-xs text-[#7a6a4a]">
                    Full video on VIP channels.
                  </p>

                  <Link
                    href="/vip"
                    onClick={closeModal}
                    className="inline-block rounded-sm bg-[#c9a84c] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#070503]"
                  >
                    VIP Hub
                  </Link>

                </div>
              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}