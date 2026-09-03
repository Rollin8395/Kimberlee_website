"use client";

import { useState } from "react";
import { sendContactMessage } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const INQUIRY_TYPES = [
  "Booking Inquiry",
  "Custom Content",
  "Brand Collaboration",
  "General",
];

export default function AppointmentsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: INQUIRY_TYPES[0],
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("sending");
    setStatusMsg("");

    try {
      const res = await sendContactMessage({
        name: form.name,
        email: form.email,
        inquiryType: form.subject,
        message: form.message,
      });

      if (res.success) {
        setStatus("sent");
        setStatusMsg(res.message || "Your inquiry has been sent.");

        setForm({
          name: "",
          email: "",
          subject: INQUIRY_TYPES[0],
          message: "",
        });
      } else {
        setStatus("error");
        setStatusMsg(
          res.message || "Failed to send. Please try again."
        );
      }
    } catch (error) {
      console.error("Failed to send appointment inquiry:", error);
      setStatus("error");
      setStatusMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <main
      className="min-h-[100dvh] w-full bg-[#0a0805] text-[#f0e0b0]"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* =====================================================
          NAVBAR
          ===================================================== */}
      <Navbar />

      {/* Fixed navbar spacer */}
      <div
        style={{
          height: "88px",
          width: "100%",
          flexShrink: 0,
        }}
      />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
      <div
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ===================================================
            HEADER
            =================================================== */}
        <section
          className="relative overflow-hidden bg-[#0a0805] px-6 text-center"
          style={{
            width: "100%",
            paddingTop: "55px",
            paddingBottom: "45px",
          }}
        >
          {/* Gold glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/[0.035] blur-[130px]"
            style={{
              width: "600px",
              height: "350px",
            }}
          />

          <div
            className="relative z-10 text-center"
            style={{
              width: "100%",
              maxWidth: "850px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#c9a84c]/75 sm:text-[11px]">
              Private Bookings
            </p>

            <h1 className="font-display text-5xl font-light leading-[0.95] tracking-[0.02em] text-[#f5eed6] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Book an{" "}
              <em className="font-normal italic text-[#c9a84c]">
                Appointment
              </em>
            </h1>

            <p
              className="mt-6 text-sm leading-7 text-[#a08040] sm:text-base"
              style={{
                width: "100%",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              For bookings, collaborations and private inquiries,
              please complete the form below. All correspondence is
              handled discreetly.
            </p>

            <div className="mt-7 h-px w-16 bg-[#c9a84c]/30" />
          </div>
        </section>

        {/* ===================================================
            FORM
            =================================================== */}
        <section
          className="w-full px-5 sm:px-8 lg:px-10"
          style={{
            paddingBottom: "80px",
          }}
        >
          {/* EXPLICIT CENTERING */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              className="rounded-xl border border-[#c9a84c]/10 bg-[#0c0905] p-6 sm:p-8 lg:p-10"
              style={{
                width: "100%",
                maxWidth: "680px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* NAME + EMAIL */}
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#6d5b38]"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      className="block w-full rounded-lg border border-[#c9a84c]/10 bg-[#140e06] px-4 py-3 text-sm text-[#f5eed6] outline-none transition-colors duration-300 placeholder:text-[#4a3e28] focus:border-[#c9a84c]/40"
                    />
                  </div>

                  <div style={{ width: "100%" }}>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#6d5b38]"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      className="block w-full rounded-lg border border-[#c9a84c]/10 bg-[#140e06] px-4 py-3 text-sm text-[#f5eed6] outline-none transition-colors duration-300 placeholder:text-[#4a3e28] focus:border-[#c9a84c]/40"
                    />
                  </div>
                </div>

                {/* INQUIRY */}
                <div style={{ width: "100%" }}>
                  <label
                    htmlFor="inquiry"
                    className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#6d5b38]"
                  >
                    Inquiry
                  </label>

                  <select
                    id="inquiry"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subject: e.target.value,
                      })
                    }
                    className="block w-full cursor-pointer rounded-lg border border-[#c9a84c]/10 bg-[#140e06] px-4 py-3 text-sm text-[#f5eed6] outline-none transition-colors duration-300 focus:border-[#c9a84c]/40"
                  >
                    {INQUIRY_TYPES.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-[#0e0a06] text-[#f5eed6]"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MESSAGE */}
                <div style={{ width: "100%" }}>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#6d5b38]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Preferred date, location, concept or other details..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    className="block min-h-[130px] w-full resize-y rounded-lg border border-[#c9a84c]/10 bg-[#140e06] px-4 py-3 text-sm text-[#f5eed6] outline-none transition-colors duration-300 placeholder:text-[#4a3e28] focus:border-[#c9a84c]/40"
                  />
                </div>

                {/* NOTICE */}
                <p className="pt-1 text-center text-[10px] leading-5 text-[#5a4a2e]">
                  All inquiries are handled privately and discreetly.
                </p>

                {/* BUTTON */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-sm bg-[#c9a84c] px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#070503] transition-all duration-300 hover:bg-[#e8d5a3] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "sending"
                      ? "Sending..."
                      : "Send Inquiry"}
                  </button>

                  {status === "sent" && (
                    <p className="text-xs text-[#c9a84c]">
                      {statusMsg}
                    </p>
                  )}

                  {status === "error" && (
                    <p className="text-xs text-[#c0504a]">
                      {statusMsg}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          FOOTER
          ===================================================== */}
      <Footer />
    </main>
  );
}