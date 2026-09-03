import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ModelSpecs from "@/components/ModelSpecs";
import GalleryPreview from "@/components/GalleryPreview";
import VideoPreview from "@/components/VideoPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0805] text-[#f0e0b0] min-h-[100dvh]">
      <Navbar />

      <div className="space-y-20 sm:space-y-28">
        <Hero />
        <Stats />
        <GalleryPreview />
        <VideoPreview />
        <ModelSpecs />
      </div>

      <Footer />
    </main>
  );
}