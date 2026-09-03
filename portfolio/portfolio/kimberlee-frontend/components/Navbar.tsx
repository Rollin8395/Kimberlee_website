"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "VIP Club", href: "/vip", highlight: true },
  { label: "Comp Card", href: "/#specs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
  className={`fixed top-0 left-0 right-0 z-40 h-[88px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
    scrolled
      ? "bg-[#0a0805]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(201,168,76,0.1)]"
      : "bg-[#0a0805]/95 backdrop-blur-md"
  }`}
>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center group-hover:border-[#c9a84c]/70 transition-colors duration-500">
              <span className="font-display text-lg font-semibold text-[#c9a84c]">K</span>
            </div>
            <span className="font-display text-xl tracking-[0.25em] text-[#f5eed6]/90 group-hover:text-[#c9a84c] transition-colors duration-500">
              KIMBERLEE
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                  link.highlight
                    ? "text-[#c9a84c] font-semibold"
                    : "text-[#8a7a5a] hover:text-[#f5eed6]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Booking CTA */}
            <Link
              href="/appointments"
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#070503] bg-[#c9a84c] hover:bg-[#e8d5a3] px-7 py-3 rounded-sm transition-all duration-300"
            >
              Make an Appointment
            </Link>
          </nav>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="lg:hidden p-2 text-[#c9a84c] hover:text-[#e8d5a3] transition-colors duration-300"
          >
            {open ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-[80px] z-30 bg-[#070503]/98 backdrop-blur-2xl lg:hidden flex flex-col p-10 animate-fade-in"
        >
          <div className="flex flex-col gap-7 mt-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base uppercase tracking-[0.25em] transition-colors duration-300 ${
                  link.highlight
                    ? "text-[#c9a84c] font-semibold"
                    : "text-[#8a7a5a] hover:text-[#f5eed6]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-[#c9a84c]/10 flex flex-col gap-4">
            <Link
              href="/vip"
              onClick={() => setOpen(false)}
              className="text-center py-4 rounded-sm bg-[#c9a84c] text-[#070503] font-semibold text-xs uppercase tracking-[0.2em]"
            >
              Enter VIP
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
