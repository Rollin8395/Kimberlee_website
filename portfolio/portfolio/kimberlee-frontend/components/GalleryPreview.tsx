"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { getPhotos, Photo } from "@/lib/api";

const CATEGORIES = ["All", "Glamour", "VIP"];

export default function GalleryPreview() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* =========================
     LOAD FROM BACKEND
  ========================= */

  useEffect(() => {
  let mounted = true;

  const loadPhotos = async () => {
    try {
      console.log("LOADING PHOTOS...");

      const data = await getPhotos();

      console.log("PHOTOS RECEIVED:", data);

      if (!mounted) return;

      setPhotos(data);
      setLoading(false);
    } catch (error) {
      console.error("FAILED TO LOAD PHOTOS:", error);

      if (!mounted) return;

      setPhotos([]);
      setLoading(false);
    }
  };

  loadPhotos();

  return () => {
    mounted = false;
  };
}, []);

  /* =========================
     CATEGORY FILTER
  ========================= */

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter(
          (photo) =>
            photo.category?.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  const displayPhotos = filteredPhotos.slice(0, 6);

  /* =========================
     LIGHTBOX
  ========================= */

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextPhoto = useCallback(() => {
    if (
      lightboxIndex === null ||
      displayPhotos.length === 0
    ) {
      return;
    }

    setLightboxIndex(
      (lightboxIndex + 1) % displayPhotos.length
    );
  }, [lightboxIndex, displayPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (
      lightboxIndex === null ||
      displayPhotos.length === 0
    ) {
      return;
    }

    setLightboxIndex(
      (lightboxIndex - 1 + displayPhotos.length) %
        displayPhotos.length
    );
  }, [lightboxIndex, displayPhotos.length]);

  /* =========================
     KEYBOARD
  ========================= */

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [
    lightboxIndex,
    closeLightbox,
    nextPhoto,
    prevPhoto,
  ]);

  const currentPhoto =
    lightboxIndex !== null
      ? displayPhotos[lightboxIndex]
      : null;

  return (
    <>
      <section
        id="gallery"
        className="relative w-full bg-[#070503] py-28 sm:py-36 overflow-hidden"
      >
        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#c9a84c]/[0.025] blur-[150px]" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center px-6">

          {/* HEADER */}
          <div className="w-full max-w-4xl mx-auto text-center mb-12">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#6d5b38] mb-4">
              Selected Collection
            </p>

            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light uppercase tracking-wide text-[#f5eed6] mb-4">
              <em className="text-[#c9a84c] italic font-normal">
                Gallery
              </em>
            </h2>

            <Link
              href="/gallery"
              className="inline-block text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] hover:text-[#e8d5a3] transition-colors duration-300"
            >
              View All ({photos.length})
            </Link>
          </div>

          {/* CATEGORIES */}
          <div className="w-full max-w-6xl mx-auto mb-14">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              {CATEGORIES.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`
                      relative
                      pb-2
                      text-[9px]
                      sm:text-[10px]
                      uppercase
                      tracking-[0.2em]
                      transition-colors
                      duration-300
                      cursor-pointer
                      ${
                        active
                          ? "text-[#c9a84c]"
                          : "text-[#6d5b38] hover:text-[#a99368]"
                      }
                    `}
                  >
                    {category}

                    {active && (
                      <motion.span
                        layoutId="gallery-category"
                        className="absolute left-0 right-0 bottom-0 h-px bg-[#c9a84c]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PHOTOS */}
          <div className="w-full max-w-7xl mx-auto">

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-[4/5] bg-[#0d0a06] animate-pulse"
                  />
                ))}
              </div>
            ) : displayPhotos.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">

                {displayPhotos.map((photo, index) => (
                  <motion.button
                    key={photo.id}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    initial={{
                      opacity: 0,
                      y: 40,
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
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0a06]">

                      {/* IMAGE */}
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                        onLoad={() => {
                          console.log(
                            "IMAGE LOADED:",
                            photo.imageUrl
                          );
                        }}
                        onError={(e) => {
                          console.error(
                            "IMAGE FAILED:",
                            photo.imageUrl
                          );

                          e.currentTarget.style.opacity = "0";
                        }}
                      />

                      {/* Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-[#c9a84c]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Center plus */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full border border-[#f5eed6]/50 bg-[#070503]/30 backdrop-blur-sm flex items-center justify-center text-[#f5eed6] text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                          +
                        </div>
                      </div>

                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">

                        {photo.category && (
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a84c] mb-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                            {photo.category}
                          </p>
                        )}

                        <h3 className="font-display text-xl sm:text-2xl font-light italic text-[#f5eed6]">
                          {photo.title}
                        </h3>

                      </div>
                    </div>
                  </motion.button>
                ))}

              </div>

            ) : (

              <div className="py-20 text-center">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#6d5b38]">
                  No images available
                </p>
              </div>

            )}

          </div>

          {/* BOTTOM LINK */}
          <div className="mt-16 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] hover:text-[#e8d5a3] transition-colors duration-300"
            >
              Explore Full Gallery
              <span className="text-base">→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#050402]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[92vh] flex flex-col items-center"
            >

              {/* CLOSE */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 sm:-right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-[#c9a84c] text-[#c9a84c] hover:text-[#070503] border border-white/10 flex items-center justify-center transition-all duration-300 z-10"
              >
                ×
              </button>

              {/* PREVIOUS */}
              {displayPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/5 hover:bg-[#c9a84c] text-[#c9a84c] hover:text-[#070503] border border-white/10 flex items-center justify-center text-xl transition-all duration-300 z-10"
                >
                  ‹
                </button>
              )}

              {/* NEXT */}
              {displayPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/5 hover:bg-[#c9a84c] text-[#c9a84c] hover:text-[#070503] border border-white/10 flex items-center justify-center text-xl transition-all duration-300 z-10"
                >
                  ›
                </button>
              )}

              {/* LIGHTBOX IMAGE */}
              <motion.img
                key={currentPhoto.imageUrl}
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{ duration: 0.4 }}
                className="max-h-[75vh] w-auto max-w-[90vw] object-contain"
                onError={() => {
                  console.error(
                    "LIGHTBOX IMAGE FAILED:",
                    currentPhoto.imageUrl
                  );
                }}
              />

              {/* CAPTION */}
              <div className="mt-5 text-center">
                <h3 className="font-display text-xl sm:text-2xl text-[#f5eed6] font-light italic">
                  {currentPhoto.title}
                </h3>

                {currentPhoto.category && (
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#8a7a5a] mt-2">
                    {currentPhoto.category}
                  </p>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}