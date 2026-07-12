"use client";

import { FormEvent, useState } from "react";

type Attendance = "accepts" | "declines" | "";

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("");
  const [dietary, setDietary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!attendance) {
      setError("Please select your attendance.");
      return;
    }
    if (!accessKey) {
      setError("RSVP is not configured yet. Please try again later.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const attendanceLabel =
      attendance === "accepts" ? "Joyfully Accepts" : "Regretfully Declines";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Wedding RSVP — ${name.trim()}`,
          from_name: "Ciya Wedding RSVP",
          name: name.trim(),
          attendance: attendanceLabel,
          dietary: dietary.trim() || "None",
          message: [
            `Name: ${name.trim()}`,
            `Attendance: ${attendanceLabel}`,
            `Dietary restrictions: ${dietary.trim() || "None"}`,
          ].join("\n"),
          botcheck: "",
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.message ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to send your RSVP. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-cream px-6 py-14 text-center">
        <div className="mx-auto max-w-sm">
          <p className="font-script text-5xl text-stone-700">Thank you</p>
          <p className="mt-4 font-serif text-lg">
            {attendance === "accepts"
              ? "We are overjoyed that you will be joining us!"
              : "We understand and will miss you on our special day."}
          </p>
          <p className="mt-3 text-sm text-stone-600">
            Your response has been received. We look forward to celebrating with
            you.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream px-6 py-14">
      <h2 className="text-center font-serif text-2xl font-medium tracking-wide">
        RSVP
      </h2>
      <div className="mx-auto mt-2 h-px w-16 bg-stone-300" />
      <p className="mt-4 text-center text-sm text-stone-600">
        Kindly respond by August 15th, 2026
      </p>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-sm space-y-6">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold tracking-widest text-stone-500 uppercase">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border-b border-stone-300 bg-transparent py-2 text-base outline-none focus:border-stone-600"
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </div>

        <fieldset>
          <legend className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
            Attendance
          </legend>
          <div className="mt-3 space-y-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="attendance"
                value="accepts"
                checked={attendance === "accepts"}
                onChange={() => setAttendance("accepts")}
                className="accent-stone-800"
                disabled={isSubmitting}
              />
              <span className="text-sm">Joyfully Accepts</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="attendance"
                value="declines"
                checked={attendance === "declines"}
                onChange={() => setAttendance("declines")}
                className="accent-stone-800"
                disabled={isSubmitting}
              />
              <span className="text-sm">Regretfully Declines</span>
            </label>
          </div>
        </fieldset>

        <div>
          <label htmlFor="dietary" className="block text-xs font-semibold tracking-widest text-stone-500 uppercase">
            Dietary Restrictions
          </label>
          <textarea
            id="dietary"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            rows={3}
            className="mt-2 w-full resize-none border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-stone-400"
            placeholder="Any allergies or dietary needs (optional)"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full border border-stone-800 bg-stone-800 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Submit RSVP"}
        </button>
      </form>
    </section>
  );
}
