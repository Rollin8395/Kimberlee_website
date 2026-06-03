"use client";

import { useEffect, useState } from "react";

export default function GalleryPreview() {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold mb-8">
        Featured Photos
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo) => (
          <div key={photo.id}>
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-[500px] object-cover"
            />
            <p className="mt-2">{photo.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}