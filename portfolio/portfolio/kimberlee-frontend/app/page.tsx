import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedPhotos from "@/components/FeaturedPhotos";
import GalleryPreview from "@/components/GalleryPreview";
import VideoPreview from "@/components/VideoPreview";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0805] text-[#e8d5a3]">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedPhotos />
      <GalleryPreview />
      <VideoPreview />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}