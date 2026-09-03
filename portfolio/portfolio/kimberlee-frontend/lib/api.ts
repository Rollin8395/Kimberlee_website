// lib/api.ts

export interface Photo {
  id: number;
  title: string;
  category?: string;
  imageUrl: string;
  isVip?: boolean;
  blurPreview?: boolean;
}

export interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration?: string;
  category?: string;
  isVip?: boolean;
}

export interface Profile {
  id: number;
  name: string;
  title: string;
  location: string;
  bio: string;
  profileImage: string;
  coverImage?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  inquiryType?: string;
  budget?: string;
}

export interface ContactResponse {
  id?: number;
  message: string;
  success?: boolean;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

/* =========================
   PHOTOS
========================= */

export async function getPhotos(): Promise<Photo[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API_BASE_URL}/photos`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch photos: ${res.status}`);
    }

    const data: Photo[] = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid photos response from backend");
    }

    return data;
  } catch (error) {
    console.error("Photos API error:", error);
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

/* =========================
   VIDEOS
========================= */

export async function getVideos(): Promise<Video[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API_BASE_URL}/videos`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch videos: ${res.status}`);
    }

    const data: Video[] = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid videos response from backend");
    }

    return data;
  } catch (error) {
    console.error("Videos API error:", error);
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}

/* =========================
   PROFILE
========================= */

export async function getProfile(): Promise<Profile | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.status}`);
    }

    const data: Profile | Profile[] = await res.json();

    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : null;
    }

    return data;
  } catch (error) {
    console.error("Profile API error:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/* =========================
   CONTACT
========================= */

export async function sendMessage(
  data: ContactPayload
): Promise<ContactResponse> {
  const payload = {
    name: data.name,
    email: data.email,
    message:
      data.inquiryType || data.budget
        ? `[Inquiry Type: ${data.inquiryType || "General"}] [Budget: ${
            data.budget || "Standard"
          }]\n\n${data.message}`
        : data.message,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(
        `Failed to send message (${res.status}): ${errorText}`
      );
    }

    const text = await res.text();

    if (!text.trim()) {
      return {
        message: "Your inquiry was sent successfully.",
        success: true,
      };
    }

    const json = JSON.parse(text);

    return {
      ...json,
      success: true,
    };
  } catch (error) {
    console.error("Contact request failed:", error);

    return {
      message:
        "Unable to send your inquiry right now. Please try again later.",
      success: false,
    };
  }
}

export const sendContactMessage = sendMessage;

/* =========================
   FALLBACK DATA
========================= */

export const FALLBACK_PHOTOS: Photo[] = [
  { id: 1, title: "Golden Hour", category: "Glamour", imageUrl: "https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287", isVip: false },
  { id: 2, title: "Lingerie Editorial", category: "VIP", imageUrl: "https://preview.redd.it/7ysnbxcdzd8g1.jpg?width=871&format=pjpg&auto=webp&s=a795747bb2110de9e6d9f64763dd710702095b53", isVip: true },
];

export const FALLBACK_VIDEOS: Video[] = [
  { id: 1, title: "4K Preview", thumbnailUrl: "https://preview.redd.it/5ro0ivenx6ea1.jpg?auto=webp&s=d6146b52b64cd1b88317fdfbeae8fc72ad279287", isVip: true, duration: "3:24" },
];