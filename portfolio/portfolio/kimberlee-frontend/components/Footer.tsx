import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070503] text-[#5a4a2e] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-[#c9a84c]/20 flex items-center justify-center group-hover:border-[#c9a84c]/50 transition-colors duration-500">
                <span className="font-display text-base font-semibold text-[#c9a84c]">K</span>
              </div>
              <span className="font-display text-xl tracking-[0.25em] text-[#f5eed6]/70 group-hover:text-[#c9a84c] transition-colors duration-500">
                KIMBERLEE
              </span>
            </Link>
            <p className="text-xs text-[#4a3e28] leading-relaxed max-w-xs">
              Adult glamour model &amp; creator based in Bavaria.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#6d5b38] font-medium">
              Portfolio
            </h3>
            <ul className="space-y-3 text-xs">
              <li><Link href="/gallery" className="hover:text-[#c9a84c] transition-colors duration-300">Gallery</Link></li>
              <li><Link href="/videos" className="hover:text-[#c9a84c] transition-colors duration-300">Videos</Link></li>
              <li><Link href="/#specs" className="hover:text-[#c9a84c] transition-colors duration-300">Comp Card</Link></li>
              <li><Link href="/#specs" className="hover:text-[#c9a84c] transition-colors duration-300">About</Link></li>
            </ul>
          </div>

          {/* VIP */}
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c]/50 font-medium">
              VIP
            </h3>
            <ul className="space-y-3 text-xs">
              <li><a href="https://onlyfans.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a84c] transition-colors duration-300">OnlyFans</a></li>
              <li><a href="https://fansly.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a84c] transition-colors duration-300">Fansly</a></li>
              <li><a href="https://www.instagram.com/tskimberleex/" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a84c] transition-colors duration-300">Instagram</a></li>
              <li><a href="https://x.com/tskimberleexxx" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a84c] transition-colors duration-300">X / Twitter</a></li>
            </ul>
          </div>
        </div>

        {/* 2257 */}
        <div className="border-t border-[#c9a84c]/8 pt-8 pb-5 text-[10px] text-[#4a3e28] leading-relaxed">
          <p>
            18 U.S.C. &sect; 2257: All creators were 18+ at time of production. Records maintained by custodian of records per 18 U.S.C. &sect; 2257 and 28 C.F.R. Part 75.
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#c9a84c]/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#3e3320]">
          <p>&copy; {currentYear} Kimberlee Official. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/#specs" className="hover:text-[#c9a84c] transition-colors duration-300">Privacy</Link>
            <Link href="/vip" className="hover:text-[#c9a84c] transition-colors duration-300">VIP</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
