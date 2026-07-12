"use client";

import {
  downloadICS,
  getGoogleCeremonyUrl,
  getOutlookUrl,
  WEDDING,
} from "@/lib/calendarEvent";

export default function SaveTheDate() {
  const handleAddToCalendar = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = "/api/calendar";
      return;
    }

    downloadICS();
  };

  return (
    <section className="border-y border-stone-200 bg-gradient-to-b from-white to-cream px-6 py-14 text-center">
      <p className="text-xs tracking-[0.3em] text-[#8b7355] uppercase">
        Mark Your Calendar
      </p>
      <h2 className="mt-3 font-serif text-2xl font-medium tracking-wide text-stone-800">
        Save the Date
      </h2>
      <div className="mx-auto mt-2 h-px w-16 bg-[#d4af37]/50" />

      <p className="mx-auto mt-5 max-w-md text-base text-stone-700">
        Sunday, 6 September 2026
      </p>
      <p className="mt-1 text-sm text-stone-600">
        Muhurtham 9:00 AM · Reception 4:00 PM
      </p>
      <p className="mt-2 text-sm text-stone-500">{WEDDING.location}</p>

      <button
        type="button"
        onClick={handleAddToCalendar}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#6b1a30] bg-[#6b1a30] px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#5a1528]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="h-5 w-5"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
        Add to Calendar
      </button>

      <p className="mt-3 text-xs text-stone-500">
        Opens your device calendar on mobile · Downloads on desktop
      </p>

      <div className="mx-auto mt-6 flex max-w-sm flex-col gap-2 sm:flex-row sm:justify-center">
        <a
          href={getGoogleCeremonyUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-medium tracking-wide text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
        >
          Google Calendar
        </a>
        <a
          href={getOutlookUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-medium tracking-wide text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
        >
          Outlook
        </a>
        <a
          href="/api/calendar"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-medium tracking-wide text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
        >
          Download .ics
        </a>
      </div>
    </section>
  );
}
