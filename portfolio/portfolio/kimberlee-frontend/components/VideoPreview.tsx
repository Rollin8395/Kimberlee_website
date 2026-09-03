"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { getVideos, Video } from "@/lib/api";

export default function VideoPreview() {
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
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-80px" });

  useEffect(() => {
  let mounted = true;

  getVideos()
    .then((data) => {
      if (!mounted) return;

      setVideos(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Failed to load videos:", error);

      if (!mounted) return;

      setVideos([]);
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
  };

  const closeModal = useCallback(() => {
    if (videoRef.current) videoRef.current.pause();
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
      if (e.key === "Escape") closeModal();
      if (e.key === " " && activeVideo.videoUrl) {
        e.preventDefault();
        togglePlay();
      }
      if (e.key.toLowerCase() === "m" && activeVideo.videoUrl) toggleMute();
      if (e.key.toLowerCase() === "f" && activeVideo.videoUrl) toggleFullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeVideo, closeModal, togglePlay, toggleMute, toggleFullscreen]);

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
    <>
      <section
  id="videos"
  className="relative w-full bg-[#070503] py-28 sm:py-36 overflow-hidden"
>
  {/* Cinematic background atmosphere */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#c9a84c]/[0.025] blur-[150px]" />
  </div>

  {/* Everything centered like Hero */}
  <div className="relative z-10 w-full flex flex-col items-center text-center px-6">

    {/* ================= HEADER ================= */}
    <div className="w-full max-w-4xl mx-auto text-center mb-14">

      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#6d5b38] mb-4">
        Selected Collection
      </p>

      <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light uppercase tracking-wide text-[#f5eed6] mb-4">
        <em className="text-[#c9a84c] italic font-normal">
          Videos
        </em>
      </h2>

      <Link
        href="/videos"
        className="
          inline-block
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-[#c9a84c]
          hover:text-[#e8d5a3]
          transition-colors
          duration-300
        "
      >
        View All ({videos.length})
      </Link>

    </div>

    {/* ================= VIDEO GRID ================= */}
    <div className="w-full max-w-7xl mx-auto">

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-video bg-[#0d0a06] animate-pulse"
            />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">

          {videos.slice(0, 6).map((video, index) => (
            <motion.button
              key={video.id ?? index}
              type="button"
              onClick={() => openModal(video)}
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative text-left cursor-pointer"
            >

              {/* Video thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-[#0d0a06]">

                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  loading="lazy"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-[1400ms]
                    ease-out
                    group-hover:scale-[1.06]
                  "
                />

                {/* Cinematic gradient */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#070503]
                    via-transparent
                    to-[#070503]/10
                    opacity-75
                    group-hover:opacity-100
                    transition-opacity
                    duration-700
                  "
                />

                {/* Subtle gold hover atmosphere */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-[#c9a84c]/[0.04]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-700
                  "
                />

                {/* VIP badge */}
                {video.isVip && (
                  <span
                    className="
                      absolute
                      top-5
                      left-5
                      px-3
                      py-1.5
                      bg-[#c9a84c]
                      text-[#070503]
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                    "
                  >
                    VIP 18+
                  </span>
                )}

                {/* Center play button */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <div
                    className="
                      w-16
                      h-16
                      rounded-full
                      border
                      border-[#f5eed6]/60
                      bg-[#070503]/30
                      backdrop-blur-sm
                      flex
                      items-center
                      justify-center
                      opacity-80
                      scale-90
                      group-hover:opacity-100
                      group-hover:scale-100
                      group-hover:bg-[#c9a84c]
                      group-hover:border-[#c9a84c]
                      transition-all
                      duration-500
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="ml-1 text-[#f5eed6] group-hover:text-[#070503] transition-colors duration-300"
                    >
                      <polygon
                        points="7 4 20 12 7 20 7 4"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                </div>

                {/* Video information */}
                <div className="absolute bottom-0 left-0 right-0 p-6">

                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-[#c9a84c]
                      mb-2
                      opacity-0
                      translate-y-3
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all
                      duration-500
                    "
                  >
                    {video.isVip ? "VIP Collection" : "Video Preview"}
                  </p>

                  <h3 className="font-display text-xl sm:text-2xl font-light italic text-[#f5eed6]">
                    {video.title}
                  </h3>

                </div>

              </div>

            </motion.button>
          ))}

        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#6d5b38]">
            No videos available
          </p>
        </div>
      )}

    </div>

    {/* ================= BOTTOM LINK ================= */}
    <div className="mt-16 text-center">
      <Link
        href="/videos"
        className="
          inline-flex
          items-center
          gap-4
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-[#c9a84c]
          hover:text-[#e8d5a3]
          transition-colors
          duration-300
        "
      >
        Explore Full Video Collection
        <span className="text-base">
          →
        </span>
      </Link>
    </div>

  </div>
</section>
      {/* Video Player / VIP Modal */}
      {activeVideo && (
        <div
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#050402]/96 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0a0805] rounded-xl overflow-hidden shadow-2xl"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-[#c9a84c]/10">
              <div className="flex items-center gap-3 min-w-0">
                {activeVideo.isVip && (
                  <span className="text-[9px] px-2 py-0.5 rounded-sm bg-[#c9a84c] text-[#070503] font-semibold uppercase tracking-wider shrink-0">
                    VIP 18+
                  </span>
                )}
                <h3 className="font-display text-lg sm:text-xl text-[#f5eed6] font-light italic truncate">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#c9a84c] text-[#c9a84c] hover:text-[#070503] border border-white/10 hover:border-[#c9a84c] flex items-center justify-center text-sm transition-colors cursor-pointer shrink-0 ml-4"
              >
                &times;
              </button>
            </div>

            {/* Video Body or VIP Lock Screen */}
            {activeVideo.isVip ? (
              <div className="relative aspect-video bg-[#0c0905] flex flex-col items-center justify-center p-8 text-center">
                <img
                  src={activeVideo.thumbnailUrl}
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-20"
                />
                <div className="relative z-10 max-w-md">
                  <div className="w-14 h-14 rounded-full bg-[#0a0805] border border-[#c9a84c]/40 flex items-center justify-center mx-auto mb-5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9a84c]">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h4 className="font-display text-2xl sm:text-3xl text-[#f5eed6] font-light mb-2">
                    VIP Uncensored Content
                  </h4>
                  <p className="text-xs text-[#7a6a4a] mb-6">
                    Full 4K uncensored video exclusive to VIP members.
                  </p>
                  <a
                    href="https://onlyfans.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-sm bg-[#c9a84c] hover:bg-[#e8d5a3] text-[#070503] font-semibold text-xs uppercase tracking-[0.2em] transition-colors duration-300 inline-block"
                  >
                    Unlock on OnlyFans
                  </a>
                </div>
              </div>
            ) : activeVideo.videoUrl ? (
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
                  className="w-full h-full object-contain cursor-pointer"
                />

                {/* Controls */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div
                    onClick={onProgressClick}
                    className="w-full h-1 bg-white/20 hover:h-1.5 rounded cursor-pointer mb-3 transition-all"
                  >
                    <div
                      style={{ width: `${progress}%` }}
                      className="h-full bg-[#c9a84c] rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="text-[#c9a84c] hover:text-white font-bold transition-colors"
                      >
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="text-white/50 hover:text-white transition-colors"
                      >
                        {isMuted ? "Unmute" : "Mute"}
                      </button>
                      <span className="text-[11px] text-white/40">
                        {currentTime} / {totalTime}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="text-[#c9a84c] hover:text-white text-[11px] uppercase tracking-wider transition-colors"
                    >
                      {isFullscreen ? "Exit Fullscreen [F]" : "Fullscreen [F]"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video bg-[#0c0905] flex flex-col items-center justify-center p-8 text-center">
                <img
                  src={activeVideo.thumbnailUrl}
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover blur-sm brightness-50"
                />
                <div className="relative z-10 max-w-md bg-[#0a0805]/80 backdrop-blur-md border border-[#c9a84c]/20 rounded-xl p-8">
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#c9a84c]">
                      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                    </svg>
                  </div>
                  <h4 className="font-display text-xl text-[#f5eed6] font-light mb-1">
                    4K Video Preview
                  </h4>
                  <p className="text-xs text-[#7a6a4a] mb-5">
                    Full video on VIP channels.
                  </p>
                  <Link
                    href="/vip"
                    onClick={closeModal}
                    className="inline-block px-5 py-2.5 rounded-sm bg-[#c9a84c] text-[#070503] font-semibold text-xs uppercase tracking-wider"
                  >
                    Watch on VIP Hub
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
