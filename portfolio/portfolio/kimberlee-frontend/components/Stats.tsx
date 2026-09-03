"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { num: "150+", label: "Photo Sets" },
  { num: "60+", label: "Video Releases" },
  { num: "5.0", label: "VIP Rating" },
  { num: "100%", label: "Discreet" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#070503] py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[#c9a84c]/8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="md:px-7 text-center first:md:pl-0 last:md:pr-0"
            >
              <div className="font-display text-3xl sm:text-4xl font-light text-[#c9a84c] mb-2 tracking-wide">
                {s.num}
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.25em] text-[#5a4a2e]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
