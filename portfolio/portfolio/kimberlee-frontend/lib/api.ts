const API_URL = "http://localhost:8080/api";

export async function getPhotos() {
  const res = await fetch(`${API_URL}/photos`);
  return res.json();
}

export async function getVideos() {
  const res = await fetch(`${API_URL}/videos`);
  return res.json();
}

export async function sendMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}