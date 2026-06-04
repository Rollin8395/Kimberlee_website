"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Home",    href: "#" },
  { label: "Gallery", href: "#gallery" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 72,
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          justifyContent: "space-between",
          borderBottom: scrolled
            ? "0.5px solid rgba(201,168,76,0.18)"
            : "0.5px solid transparent",
          background: scrolled ? "rgba(5,4,2,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "background 0.5s, border-color 0.5s",
        }}
      >
        <a href="#" style={{
          fontFamily: "var(--font-display)",
          fontSize: 18, fontWeight: 300,
          letterSpacing: "0.22em",
          color: "var(--gold)",
          textDecoration: "none",
        }}>
          KIMBERLEE
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="nav-desktop">
          {links.map((l) => (
            <a key={l.label} href={l.href} style={{
              fontFamily: "var(--font-body)",
              fontSize: 10, fontWeight: 400,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--gold-dim)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--gold-light)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--gold-dim)")}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            fontFamily: "var(--font-body)",
            fontSize: 10, fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--bg-base)",
            background: "var(--gold)",
            padding: "9px 24px",
            borderRadius: 1,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "var(--gold-light)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--gold)")}
          >Enquire</a>
        </div>

        <button onClick={() => setOpen(!open)} className="nav-mobile-btn"
          style={{ background: "none", border: "none", color: "var(--gold)", fontSize: 20, cursor: "pointer", display: "none" }}>
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, zIndex: 99,
          background: "var(--bg-deep)",
          borderBottom: "0.5px solid var(--border-gold)",
          padding: "28px 48px",
          display: "flex", flexDirection: "column", gap: 22,
        }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--gold-dim)", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}