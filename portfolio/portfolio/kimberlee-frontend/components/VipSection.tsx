import Link from "next/link";

const vipTiers = [
  {
    name: "OnlyFans VIP",
    eyebrow: "Most Popular",
    description:
      "Your direct connection to Kimberlee with exclusive content, private messaging, and personal access.",
    link: "https://onlyfans.com/tskimberleexxx",
    primary: true,
    features: [
      "Daily 4K exclusive sets",
      "Direct messaging",
      "Custom commissions",
      "Exclusive livestreams",
    ],
  },
  {
    name: "Exclusive Vault",
    eyebrow: "Private Collection",
    description:
      "Explore the private collection beyond the public archive, with premium video and behind-the-scenes content.",
    link: "https://www.ts-kimberlee.com/",
    primary: false,
    features: [
      "Full exclusive archive",
      "60fps video clips",
      "Premium collections",
      "Raw BTS content",
    ],
  },
];

export default function VipSection() {
  return (
    <section
      id="vip"
      className="relative w-full overflow-hidden bg-[#0a0805] py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/[0.025] blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">

          

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#c9a84c]/20" />
            
            <span className="h-px w-12 bg-[#c9a84c]/20" />
          </div>
        </div>

        {/* ========================= */}
        {/* VIP OPTIONS */}
        {/* ========================= */}

        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">

          {vipTiers.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex min-h-[430px] flex-col p-8 sm:p-10 ${
                tier.primary
                  ? "border border-[#c9a84c]/35 bg-[#110d06]"
                  : "border border-[#c9a84c]/10 bg-[#0d0a06]"
              }`}
            >

              {/* Top gold line */}
              {tier.primary && (
                <div className="absolute left-0 right-0 top-0 h-px bg-[#c9a84c]/60" />
              )}

              {/* Card header */}
              <div className="flex items-start justify-between">

                <span
                  className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] ${
                    tier.primary
                      ? "bg-[#c9a84c] text-[#070503]"
                      : "border border-[#c9a84c]/20 text-[#c9a84c]/80"
                  }`}
                >
                  {tier.eyebrow}
                </span>

                <span className="font-display text-sm text-[#403621]">
                  VIP
                </span>
              </div>

              {/* Title */}
              <div className="mt-9">
                <h3 className="font-display text-3xl font-light text-[#f5eed6] sm:text-4xl">
                  {tier.name}
                </h3>

                <p className="mt-4 max-w-md text-xs leading-6 text-[#756548]">
                  {tier.description}
                </p>
              </div>

              {/* Divider */}
              <div className="my-8 h-px w-full bg-[#c9a84c]/10" />

              {/* Features */}
              <div className="flex-1">

                <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]/50">
                  Includes
                </p>

                <ul className="space-y-3.5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-xs text-[#9a8965]"
                    >
                      <span className="h-px w-4 shrink-0 bg-[#c9a84c]/40" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Button */}
              <a
                href={tier.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-9 flex w-full items-center justify-center gap-3 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${
                  tier.primary
                    ? "bg-[#c9a84c] text-[#070503] hover:bg-[#e8d5a3]"
                    : "border border-[#c9a84c]/30 text-[#c9a84c] hover:border-[#c9a84c] hover:bg-[#c9a84c]/5"
                }`}
              >
                <span>
                  {tier.primary
                    ? "Join OnlyFans"
                    : "Enter Exclusive Vault"}
                </span>

                <span className="transition-transform duration-300 hover:translate-x-1">
                  →
                </span>
              </a>

            </article>
          ))}

        </div>

        {/* ========================= */}
        {/* BESPOKE */}
        {/* ========================= */}

        <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center justify-between gap-6 border-t border-[#c9a84c]/10 pt-8 text-center sm:pt-10 md:flex-row md:text-left">

          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.35em] text-[#c9a84c]/60">
              Private Requests
            </p>

            <h4 className="font-display text-xl font-light text-[#f5eed6]">
              Bespoke Content
            </h4>

            <p className="mt-1 text-xs text-[#6d5b38]">
              Tailored commissions and private collaborations.
            </p>
          </div>

          <Link
            href="/bookings"
            className="group inline-flex items-center gap-3 border border-[#c9a84c]/25 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a84c] transition-all duration-300 hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#070503]"
          >
            <span>Inquire</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}