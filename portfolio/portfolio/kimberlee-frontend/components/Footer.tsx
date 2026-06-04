export default function Footer() {
  return (
    <footer className="border-t border-yellow-900/20 py-10 bg-[#030201]">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <h2 className="text-2xl tracking-[0.2em]">
          KIMBERLEE
        </h2>

        <p className="text-sm text-gray-500">
          © 2026 Kimberlee Portfolio. All Rights Reserved.
        </p>

        <div className="flex gap-6">

          <a
            href="https://www.instagram.com/tskimberleex/"
            className="text-yellow-700 hover:text-yellow-500"
          >
            Instagram
          </a>

          <a
            href="https://x.com/tskimberleexxx"
            className="text-yellow-700 hover:text-yellow-500"
          >
            Twitter
          </a>

        </div>

      </div>

    </footer>
  );
}