"use client";

import { useState } from "react";
import { sendContactMessage } from "@/lib/api";

const INQUIRY_TYPES = [
  "Booking Inquiry",
  "Custom Content",
  "Brand Collaboration",
  "General",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: INQUIRY_TYPES[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMsg("");

    const res = await sendContactMessage({
      name: form.name,
      email: form.email,
      inquiryType: form.subject,
      message: form.message,
    });
    if (res.success) {
      setStatus("sent");
      setStatusMsg(res.message);
      setForm({ name: "", email: "", subject: INQUIRY_TYPES[0], message: "" });
    } else {
      setStatus("error");
      setStatusMsg(res.message || "Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-[#070503] py-28 sm:py-36 overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-light text-[#f5eed6] tracking-wide mb-3">
            Direct <em className="text-[#c9a84c] italic font-normal">Contact</em>
          </h2>
          <p className="text-sm text-[#6d5b38]">
            Bookings, collaborations &amp; VIP inquiries. All correspondence discreet.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-[#0c0905] border border-[#c9a84c]/10 rounded-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-[#6d5b38] font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#140e06] border border-[#c9a84c]/10 focus:border-[#c9a84c]/40 rounded-lg px-4 py-3 text-sm text-[#f5eed6] placeholder-[#4a3e28] outline-none transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-[#6d5b38] font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#140e06] border border-[#c9a84c]/10 focus:border-[#c9a84c]/40 rounded-lg px-4 py-3 text-sm text-[#f5eed6] placeholder-[#4a3e28] outline-none transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-[#6d5b38] font-medium mb-2">
                Inquiry
              </label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-[#140e06] border border-[#c9a84c]/10 focus:border-[#c9a84c]/40 rounded-lg px-4 py-3 text-sm text-[#f5eed6] outline-none transition-colors duration-300 cursor-pointer"
              >
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#0e0a06] text-[#f5eed6]">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-[#6d5b38] font-medium mb-2">
                Message
              </label>
              <textarea
                rows={3}
                required
                placeholder="Details, dates, concept..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#140e06] border border-[#c9a84c]/10 focus:border-[#c9a84c]/40 rounded-lg px-4 py-3 text-sm text-[#f5eed6] placeholder-[#4a3e28] outline-none transition-colors duration-300 resize-y min-h-[90px]"
              />
            </div>

            {/* Discretion notice */}
            <div className="text-[10px] text-[#5a4a2e] text-center">
              100% discretion. Your information is never shared.
            </div>

            {/* Submit & Status */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto px-7 py-3 rounded-sm bg-[#c9a84c] hover:bg-[#e8d5a3] disabled:opacity-50 text-[#070503] font-semibold text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <span className="text-xs text-[#c9a84c]">{statusMsg || "Sent!"}</span>
              )}
              {status === "error" && (
                <span className="text-xs text-[#c0504a]">{statusMsg}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
