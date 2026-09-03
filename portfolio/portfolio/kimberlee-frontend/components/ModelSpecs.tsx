"use client";

import Link from "next/link";

const modelSpecs = [
  { label: "Height", value: '5\'11" / 180cm' },
  { label: "Bust / Cup", value: "34DD Natural" },
  { label: "Hips", value: '34" / 91 cm' },
  { label: "Birthday", value: "20th October 1984" },
  { label: "Pennis", value: "19cm / 5cm" },
  { label: "Location", value: "Bavaria, Germany" },
];

export default function ModelSpecs() {
  return (
    <section
      id="specs"
      className="relative w-full bg-[#070503] py-28 sm:py-36 overflow-hidden"
    >
      {/* Everything centered exactly like Hero */}
      <div className="w-full flex flex-col items-center text-center px-6">

        {/* PHOTO */}
        <div className="relative w-full max-w-[520px] mb-16">

          {/* Soft ambient glow */}
          <div className="absolute inset-16 bg-[#c9a84c]/10 blur-[100px]" />

          <img
            src="https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287"
            alt="Kimberlee"
            className="
              relative
              w-full
              h-[560px]
              object-cover
              object-top
              opacity-0
              animate-image-reveal
            "
          />

          {/* Blend edges into background */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070503] via-transparent to-[#070503]/10" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#070503]/30 via-transparent to-[#070503]/30" />

          {/* Name */}
          <div className="absolute bottom-10 left-0 right-0">
            <h4 className="font-display text-3xl text-[#f5eed6] font-light tracking-wide">
              KIMBERLEE
            </h4>
          </div>
        </div>

        {/* HEADER */}
        <div className="w-full max-w-4xl mb-16">
          <h2 className="fade-up font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#f5eed6] tracking-wide mb-6">
            Model{" "}
            <em className="text-[#c9a84c] italic font-normal">
              Specifications
            </em>
          </h2>

          <Link
            href="/"
            className="
              fade-up
              inline-block
              px-8
              py-4
              rounded-sm
              bg-[#c9a84c]
              hover:bg-[#e8d5a3]
              text-[#070503]
              font-semibold
              text-[10px]
              uppercase
              tracking-[0.2em]
              transition-all
              duration-300
              hover:-translate-y-0.5
            "
          >
            Make an Appointment
          </Link>
        </div>

        {/* SPECIFICATIONS */}
        <div className="w-full max-w-3xl mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8">

            {modelSpecs.map((spec, index) => (
              <div
                key={spec.label}
                className="fade-up py-4 border-b border-[#c9a84c]/10 text-center"
              >
                <span className="text-[10px] text-[#6d5b38] uppercase tracking-[0.18em] font-medium block mb-2">
                  {spec.label}
                </span>

                <span className="text-sm sm:text-base text-[#e8d5a3] font-light tracking-wide">
                  {spec.value}
                </span>
              </div>
            ))}

          </div>
        </div>

        

      </div>
    </section>
  );
}