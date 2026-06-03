"use client";

import { useEffect, useState } from "react";
import { getVideos } from "@/lib/api";

export default function VideoPreview() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos().then(setVideos);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">

      <h2 className="text-4xl font-bold mb-10">
        Featured Videos
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {videos.map((video: any) => (

          <div
            key={video.id}
            className="bg-zinc-900 rounded-xl overflow-hidden"
          >

            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-80 object-cover"
            />

            <div className="p-4">
              <h3>{video.title}</h3>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}