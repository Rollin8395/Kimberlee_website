"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPhotos, Photo } from "@/lib/api";

const CATEGORIES = ["All", "Glamour", "Editorial", "VIP", "Travel"];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* =====================================================
     LOAD PHOTOS
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const loadPhotos = async () => {
      try {
        const data = await getPhotos();

        if (!mounted) return;

        setPhotos(data);
      } catch (error) {
        console.error("Failed to load photos:", error);

        if (!mounted) return;

        setPhotos([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPhotos();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     FILTER PHOTOS
  ===================================================== */

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter(
          (photo) =>
            photo.category
              ?.toLowerCase()
              .includes(activeCategory.toLowerCase())
        );

  /* =====================================================
     LIGHTBOX
  ===================================================== */

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null || filteredPhotos.length === 0) {
      return;
    }

    setLightboxIndex(
      (lightboxIndex + 1) % filteredPhotos.length
    );
  }, [lightboxIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null || filteredPhotos.length === 0) {
      return;
    }

    setLightboxIndex(
      (lightboxIndex - 1 + filteredPhotos.length) %
        filteredPhotos.length
    );
  }, [lightboxIndex, filteredPhotos.length]);

  /* =====================================================
     KEYBOARD CONTROLS
  ===================================================== */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        nextPhoto();
      }

      if (event.key === "ArrowLeft") {
        prevPhoto();
      }
    };

    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [
    lightboxIndex,
    closeLightbox,
    nextPhoto,
    prevPhoto,
  ]);

  const currentPhoto =
    lightboxIndex !== null
      ? filteredPhotos[lightboxIndex]
      : null;

  return (
    <main className="min-h-[100dvh] bg-[#0a0805] text-[#f0e0b0] flex flex-col">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* IMPORTANT:
          Navbar is fixed, so reserve its 88px height.
      */}
      <div className="h-[88px] w-full shrink-0" />

      {/* =====================================================
          ARCHIVE HEADER
      ===================================================== */}

        {/* ARCHIVE HERO */}
<section className="relative w-full overflow-hidden bg-[#0a0805] py-16 sm:py-20 lg:py-24">
  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/[0.035] blur-[110px]" />

  <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-center px-6 text-center">
    
    <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-[#c9a84c]/75">
      The Collection
    </p>

    <h1 className="font-display text-5xl font-light leading-none tracking-[0.01em] text-[#f5eed6] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
      Photo <em className="text-[#c9a84c]">Archive</em>
    </h1>

    <div className="mt-4 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-[#c9a84c]/30" />

      <span className="text-[11px] uppercase tracking-[0.35em] text-[#c9a84c]/60">
        {filteredPhotos.length} Photos
      </span>

      <span className="h-px w-8 bg-[#c9a84c]/30" />
    </div>

    <div className="mt-4 border border-[#c9a84c]/40 px-3 py-1">
      <span className="text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]">
        VIP Access
      </span>
    </div>

  </div>
</section>

      {/* =====================================================
          CATEGORY NAVIGATION
      ===================================================== */}

      <div className="w-full border-y border-[#c9a84c]/10 bg-[#0a0805]">

        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">

          <div className="flex items-center justify-center gap-2 overflow-x-auto py-4">

            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-sm px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? "bg-[#c9a84c] text-[#070503]"
                    : "text-[#8a7957] hover:bg-[#c9a84c]/5 hover:text-[#c9a84c]"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

        </div>
      </div>

      {/* =====================================================
          PHOTO GRID
      ===================================================== */}

      <section className="w-full flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 xl:px-10 2xl:px-12">

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">

            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[3/4] rounded-md bg-[#120e06] animate-pulse"
              />
            ))}

          </div>
        )}

        {/* Photos */}
        {!loading && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">

            {filteredPhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[3/4] overflow-hidden rounded-md bg-[#120e06] text-left cursor-pointer animate-fade-up"
              >

                {/* Image */}
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  onError={(event) => {
                    console.error(
                      "Gallery image failed:",
                      photo.imageUrl
                    );

                    event.currentTarget.style.opacity = "0";
                  }}
                />

                {/* Hover gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0805]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Gold border */}
                <div className="pointer-events-none absolute inset-0 rounded-md border border-[#c9a84c]/0 transition-colors duration-500 group-hover:border-[#c9a84c]/30" />

                {/* VIP badge */}
                {photo.isVip && (
                  <div className="absolute left-3 top-3">
                    <span className="rounded-sm bg-[#c9a84c] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#070503]">
                      VIP
                    </span>
                  </div>
                )}

                {/* Hover information */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                  <p className="font-display text-lg font-light leading-tight text-[#f5eed6]">
                    {photo.title}
                  </p>

                  {photo.category && (
                    <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#c9a84c]/80">
                      {photo.category}
                    </p>
                  )}

                </div>

              </button>
            ))}

          </div>
        )}

        {/* Empty state */}
        {!loading && filteredPhotos.length === 0 && (
          <div className="flex min-h-[350px] w-full items-center justify-center text-center">

            <div>

              <p className="font-display text-3xl font-light text-[#f5eed6]/60">
                No photos found
              </p>

              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[#6d5b38]">
                No photos in this category
              </p>

            </div>

          </div>
        )}

      </section>

      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      {currentPhoto && (
        <div
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-[#050402]/96 p-4 backdrop-blur-2xl sm:p-8 animate-fade-in"
        >

          <div
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[92vh] max-w-6xl flex-col items-center cursor-default"
          >

            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute -right-1 -top-12 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#c9a84c] transition-colors duration-300 hover:bg-[#c9a84c] hover:text-[#070503] sm:-right-4"
            >
              &times;
            </button>

            {/* Previous */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-2xl text-[#c9a84c] transition-colors duration-300 hover:bg-[#c9a84c] hover:text-[#070503] sm:-left-14"
              >
                &#8249;
              </button>
            )}

            {/* Next */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-2xl text-[#c9a84c] transition-colors duration-300 hover:bg-[#c9a84c] hover:text-[#070503] sm:-right-14"
              >
                &#8250;
              </button>
            )}

            {/* Large image */}
            <img
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              className="max-h-[78vh] max-w-[90vw] object-contain sm:max-h-[82vh]"
            />

            {/* Caption */}
            <div className="mt-5 text-center">

              <p className="font-display text-xl font-light italic text-[#f5eed6] sm:text-2xl">
                {currentPhoto.title}
              </p>

              {currentPhoto.category && (
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#c9a84c]/70">
                  {currentPhoto.category}
                </p>
              )}

            </div>

          </div>

        </div>
      )}

      <Footer />

    </main>
  );
}