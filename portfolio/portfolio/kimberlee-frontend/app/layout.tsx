import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import AgeGate from "@/components/AgeGate";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kimberlee · Official Adult Model & Glamour Creator Portfolio",
  description:
    "Official luxury portfolio for Kimberlee. International adult model, glamour creator, and travel personality based in Bavaria. Exclusive VIP access, bookings, comp card, and 4K media.",
  keywords: [
    "Kimberlee",
    "Model",
    "Adult Model",
    "Glamour Creator",
    "OnlyFans VIP",
    "Comp Card",
    "Bavaria Model",
    "Fashion",
    "Lingerie",
    "Bespoke Content",
  ],
  authors: [{ name: "Kimberlee" }],
  openGraph: {
    title: "Kimberlee · Official Adult Model & Glamour Creator",
    description:
      "Official luxury portfolio for Kimberlee. Exclusive VIP access, booking inquiries, comp card, and photo & video collections.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kimberlee · Official Model Portfolio",
    description: "International glamour model, digital creator, and traveler.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0805",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="bg-[#0a0805] text-[#f0e0b0] font-sans antialiased selection:bg-[#3a2e14] selection:text-[#e8d5a3]">
        <AgeGate />
        {children}
      </body>
    </html>
  );
}
