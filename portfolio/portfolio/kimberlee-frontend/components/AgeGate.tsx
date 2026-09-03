"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kimberlee_age_verified";

export default function AgeGate() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const verified = localStorage.getItem(STORAGE_KEY) === "true";
      setIsVerified(verified);
    } catch {
      // If localStorage is unavailable, allow access
      setIsVerified(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Storage unavailable
    }

    setIsVerified(true);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  // Don't render anything until we know the browser's localStorage state
  if (isVerified === null || isVerified === true) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-[#0e0b07] border border-[#c9a84c]/15 rounded-xl p-8 md:p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#161108] border border-[#c9a84c]/30 text-[#c9a84c] font-display font-bold text-2xl tracking-widest mb-6">
          18+
        </div>

        <h2
          id="age-gate-title"
          className="font-display text-3xl md:text-4xl text-[#f5eed6] font-light tracking-wide mb-3"
        >
          Age Verification Required
        </h2>

        <p className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c]/70 font-medium mb-5">
          Kimberlee &middot; Official Adult &amp; Glamour Creator
        </p>

        <p className="text-sm text-[#7a6a4a] leading-relaxed mb-8 max-w-sm mx-auto">
          This exclusive portfolio features adult glamour photography,
          sensual modeling sets, and uncensored VIP previews. You must be at
          least 18 years of age to enter.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-3.5 px-6 rounded-sm bg-[#c9a84c] hover:bg-[#e8d5a3] text-[#070503] font-semibold tracking-wider text-sm uppercase transition-colors duration-300 cursor-pointer"
          >
            I am 18+, Enter
          </button>

          <button
            type="button"
            onClick={handleDecline}
            className="sm:w-32 py-3.5 px-6 rounded-sm border border-[#c9a84c]/15 text-[#6d5b38] hover:text-[#f5eed6] hover:border-[#c9a84c]/30 text-sm uppercase tracking-wider transition-colors duration-300 cursor-pointer"
          >
            Exit
          </button>
        </div>

        <p className="text-[10px] text-[#5a4a2e] leading-tight">
          All models depicted are 18 years of age or older. By entering, you
          agree to our Terms of Access and 18 U.S.C. &sect; 2257 record-keeping
          compliance statements.
        </p>
      </div>
    </div>
  );
}