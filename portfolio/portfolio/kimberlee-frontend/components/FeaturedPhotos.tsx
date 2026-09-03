"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";

export default function FeaturedPhotos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#0a0805] py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#f5eed6] tracking-wide">
            Selected{" "}
            <em className="text-[#c9a84c] italic font-normal">Works</em>
          </h2>
        </motion.div>

        {/* Two-up editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4">
          {/* Large left image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-lg group"
          >
            <img
              src="https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53"
              alt="Featured glamour series"
              className="w-full h-[480px] lg:h-[700px] object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <span className="absolute bottom-6 left-6 font-display text-sm italic text-white/40 tracking-wide">
              Glamour Series
            </span>
          </motion.div>

          {/* Right column: image + quote */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 overflow-hidden rounded-lg group"
            >
              <img
                src="https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287"
                alt="Featured editorial"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 border border-[#c9a84c]/10 rounded-lg flex flex-col justify-center"
            >
              <p className="font-display text-xl sm:text-2xl italic font-light text-[#8a7a5a] leading-relaxed tracking-wide mb-6">
                &ldquo;Every frame is a moment frozen in gold.&rdquo;
              </p>
              <Link
                href="/gallery"
                className="self-start text-[10px] font-medium uppercase tracking-[0.2em] text-[#070503] bg-[#c9a84c] hover:bg-[#e8d5a3] px-6 py-2.5 rounded-sm transition-colors duration-300"
              >
                View Gallery
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
