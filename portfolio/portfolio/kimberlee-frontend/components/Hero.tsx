"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a0805] via-[#110d06] to-[#0a0805]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287"
          alt=""
          className="w-full h-full object-cover object-top brightness-[0.3] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805]/40 via-[#0a0805]/20 to-[#0a0805]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0805]/30 via-transparent to-[#0a0805]/30" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="fade-up font-display text-[5rem] sm:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-light leading-[0.88] text-[#f5eed6] tracking-[0.02em] mb-6">
          Kimber
          
          <em className="text-[#c9a84c] italic font-normal">Lee</em>
        </h1>

        <p className="fade-up delay-1 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#6d5b38] font-medium mb-10">
          International Model &middot; ADULT Content Creator
        </p>

        

        <div className="fade-up delay-2 flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/vip"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#070503] bg-[#c9a84c] hover:bg-[#e8d5a3] px-7 py-3 rounded-sm transition-colors duration-300"
          >
            Enter VIP
          </Link>
          <Link
            href="/gallery"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#c9a84c] hover:text-[#e8d5a3] border border-[#c9a84c]/25 hover:border-[#c9a84c]/50 px-6 py-3 rounded-sm transition-colors duration-300"
          >
            Gallery
          </Link>
        </div>

        {/* <div className="fade-up delay-3 flex items-center justify-center gap-6 text-[9px] uppercase tracking-[0.2em] text-[#5a4a2e]">
          <span>4K Ultra HD</span>
          <span className="w-1 h-1 rounded-full bg-[#c9a84c]/30" />
          <span>100% Discreet</span>
        </div> */}
      </div>
    </section>
  );
}
