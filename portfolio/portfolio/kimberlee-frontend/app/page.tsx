
import GalleryPreview from "@/components/GalleryPreview";
import VideoPreview from "@/components/VideoPreview";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md">

        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

          <h1 className="font-bold text-xl">
            KIMBERLEE
          </h1>

          <div className="space-x-6">

            <a href="#">About</a>

            <a href="#">Gallery</a>

            <a href="#">Videos</a>

            <a href="#">Contact</a>

          </div>

        </div>

      </nav>

      <section className="h-screen flex flex-col justify-center items-center text-center px-6">

        <p className="uppercase tracking-[0.4em] text-gray-400 mb-4">
          Official Portfolio
        </p>

        <h1 className="text-7xl md:text-9xl font-bold mb-6">
          KIMBERLEE
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-xl">
          Model, Creator and Traveler sharing moments from fashion,
          lifestyle and adventures around the world.
        </p>

        <button className="mt-10 px-8 py-4 rounded-full border border-white hover:bg-white hover:text-black transition">
          Explore Gallery
        </button>

      </section>

      <section className="max-w-5xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-bold mb-8">
          About Me
        </h2>

        <p className="text-lg text-gray-300 leading-8">
          Hey Guys! I'm Kimber Lee, born in
          Regensburg, Bavaria.

          I travel frequently because of my work,
          but I also enjoy spending time with family
          and friends.

          Fashion, travel, shopping and nature
          are some of my biggest passions.
        </p>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-5xl font-bold mb-10">
          Featured Photos
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <img
            src="https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53"
            alt="featured"
            className="w-full h-[900px] object-cover rounded-3xl"
          />

          <img
            src="https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287"
            alt="featured"
            className="w-full h-[900px] object-cover rounded-3xl"
          />

        </div>

      </section>
      <GalleryPreview />

      <VideoPreview />

    </main>
  );
}