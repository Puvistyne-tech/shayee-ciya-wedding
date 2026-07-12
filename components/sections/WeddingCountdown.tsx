"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-09-06T09:00:00+02:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-unit flex flex-1 flex-col items-center rounded-lg border border-[#d4af37]/30 bg-white/80 px-2 py-4 shadow-sm backdrop-blur-sm">
      <span
        key={value}
        className="countdown-number font-serif text-3xl font-semibold text-[#6b1a30] tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] tracking-[0.2em] text-stone-500 uppercase">
        {label}
      </span>
    </div>
  );
}

export default function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  const isToday =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div className="countdown-glow relative mt-10 overflow-hidden rounded-xl border border-[#d4af37]/40 bg-gradient-to-b from-[#fff8f0] via-cream to-[#f5e6d0] px-4 py-8">
      <div className="pointer-events-none absolute -top-6 -left-6 h-20 w-20 rounded-full bg-[#d4af37]/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-[#6b1a30]/10 blur-2xl" />

      <div className="flex items-center justify-center gap-3 text-[#d4af37]">
        <span className="text-lg" aria-hidden>
          ✦
        </span>
        <span className="text-sm text-[#6b1a30]/50" aria-hidden>
          ✝
        </span>
        <span className="text-lg" aria-hidden>
          ✦
        </span>
      </div>

      <p className="mt-3 text-center text-xs tracking-[0.2em] text-[#8b7355] uppercase">
        Counting Down To Our Sacred Union
      </p>
      <p className="mt-1 text-center font-serif text-sm italic text-[#6b1a30]/70">
        &ldquo;This is the day the Lord has made&rdquo; — Psalm 118:24
      </p>

      {isToday ? (
        <p className="countdown-celebrate mt-6 text-center font-script text-4xl text-[#6b1a30]">
          Today is the day!
        </p>
      ) : (
        <div className="mt-6 flex gap-2 sm:gap-3">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Mins" />
          <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </div>
      )}

      <p className="mt-5 text-center text-[10px] tracking-widest text-stone-500">
        || Shubha Muhurtham ||
      </p>
    </div>
  );
}
