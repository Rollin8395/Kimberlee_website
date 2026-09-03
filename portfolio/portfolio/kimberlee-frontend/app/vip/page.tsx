import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VipSection from "@/components/VipSection";

export default function VipPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0a0805] text-[#f0e0b0]">
      <Navbar />

      {/* Fixed navbar spacer */}
      <div className="h-[88px] w-full shrink-0" />

      {/* ========================================================= */}
      {/* VIP HERO */}
      {/* ========================================================= */}

      <section className="relative flex w-full items-center justify-center overflow-hidden bg-[#0a0805] px-6 py-14 text-center sm:py-16 lg:py-20">

        {/* Center glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/[0.035] blur-[120px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">

          {/* Breadcrumb */}
          <div className="mb-7 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em]">
            <Link
              href="/"
              className="text-[#6d5b38] transition-colors duration-300 hover:text-[#c9a84c]"
            >
              Home
            </Link>

            <span className="text-[#c9a84c]/30">/</span>

            <span className="text-[#c9a84c]/70">
              VIP Membership
            </span>
          </div>

          {/* Eyebrow */}
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#c9a84c]/70">
            Exclusive Access
          </p>

          {/* Title */}
          <h1 className="font-display text-5xl font-light leading-none text-[#f5eed6] sm:text-6xl md:text-7xl">
            Enter the{" "}
            <em className="font-normal italic text-[#c9a84c]">
              VIP
            </em>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-lg text-xs leading-6 text-[#756548] sm:text-sm">
            Discover Kimberlee's private collection, exclusive content,
            and access beyond the public archive.
          </p>

          {/* Divider */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c9a84c]/25" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#c9a84c]/55">
              Kimberlee
            </span>

            <span className="h-px w-10 bg-[#c9a84c]/25" />
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* VIP MEMBERSHIP */}
      {/* ========================================================= */}

      <div className="w-full">
        <VipSection />
      </div>

      {/* ========================================================= */}
      {/* FINAL CTA */}
      {/* ========================================================= */}

      <section className="relative w-full border-t border-[#c9a84c]/10 bg-[#080604] px-6 py-14 text-center sm:py-16">

        <div className="mx-auto flex w-full max-w-2xl flex-col items-center">

          <p className="mb-3 text-[9px] uppercase tracking-[0.45em] text-[#c9a84c]/65">
            Continue Your Experience
          </p>

          <h2 className="font-display text-3xl font-light text-[#f5eed6] sm:text-4xl">
            Choose your{" "}
            <em className="font-normal italic text-[#c9a84c]">
              access
            </em>
          </h2>

          <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-[#6d5b38]">
            Enter the private vault or join Kimberlee on OnlyFans for
            exclusive access.
          </p>

          <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">

            {/* OnlyFans */}
            <a
              href="https://onlyfans.com/tskimberleexxx"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 bg-[#c9a84c] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#070503] transition-all duration-300 hover:bg-[#e8d5a3] sm:w-auto"
            >
              <span>Join on OnlyFans</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* Exclusive Vault */}
            <a
              href="https://www.ts-kimberlee.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 border border-[#c9a84c]/30 px-7 py-3.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#c9a84c] transition-all duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 sm:w-auto"
            >
              <span>Exclusive Vault</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}