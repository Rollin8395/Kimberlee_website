import Link from "next/link";
import { motion } from "motion/react";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#070503] py-28 sm:py-36 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-[#c9a84c]/[0.025] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center text-center px-6">
        
        {/* Section heading */}
        <div className="w-full max-w-4xl mx-auto mb-14">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#6d5b38] mb-4">
            The Story
          </p>

          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#f5eed6] tracking-wide">
            Behind{" "}
            <em className="text-[#c9a84c] italic font-normal">
              The Lens
            </em>
          </h2>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 1.04 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative w-full max-w-[560px] mb-16"
        >
          {/* Soft gold atmosphere */}
          <div className="absolute inset-16 bg-[#c9a84c]/[0.06] blur-[100px]" />

          <div className="relative overflow-hidden">
            <img
              src="https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53"
              alt="Kimberlee - Adult and Glamour Model"
              className="w-full h-[520px] sm:h-[620px] object-cover object-top transition-transform duration-[1600ms] ease-out hover:scale-[1.025]"
            />

            {/* Blend image into background */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070503] via-transparent to-[#070503]/10" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#070503]/25 via-transparent to-[#070503]/25" />

            {/* Name over image */}
            <div className="absolute bottom-10 left-0 right-0">
              <p className="font-display text-2xl sm:text-3xl italic font-light text-[#c9a84c]/80">
                Kimberlee
              </p>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-2xl mx-auto"
        >
          <p className="text-sm sm:text-[15px] text-[#8a7958] leading-[1.9] max-w-xl mx-auto">
            International glamour model and independent creator based in
            Bavaria. High-fashion aesthetics, exclusive 4K content, and
            bespoke VIP collaborations.
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-9 mb-12">
            {["Bespoke", "Discreet", "Global"].map((item) => (
              <span
                key={item}
                className="px-4 py-2 border border-[#c9a84c]/10 text-[9px] uppercase tracking-[0.18em] text-[#6d5b38] transition-all duration-300 hover:border-[#c9a84c]/30 hover:text-[#c9a84c]"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Signature + Comp Card */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-7 border-t border-[#c9a84c]/8">
            <div className="font-display text-2xl italic font-light text-[#c9a84c]/60">
              Kimberlee
            </div>

            <div className="hidden sm:block w-px h-5 bg-[#c9a84c]/15" />

            <Link
              href="/#specs"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-medium transition-colors duration-300 hover:text-[#e8d5a3]"
            >
              Comp Card
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}