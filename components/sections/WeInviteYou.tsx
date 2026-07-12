"use client";

import { useState } from "react";
import { PHOTO_PATHS } from "@/lib/photos";

export default function WeInviteYou() {
  const [heroError, setHeroError] = useState(false);

  return (
    <div className="relative mt-12 overflow-hidden border-t border-stone-200 pt-12 text-center">
      {!heroError && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden opacity-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO_PATHS.coupleHero}
            alt=""
            onError={() => setHeroError(true)}
            className="h-full w-full object-cover"
            aria-hidden
          />
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #d4af37 1px, transparent 1px), radial-gradient(circle at 80% 70%, #6b1a30 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <p className="relative text-xs tracking-[0.3em] text-[#8b7355] uppercase">
        Together With Our Families
      </p>

      <h2 className="relative mt-4 font-serif text-3xl leading-snug font-medium tracking-wide text-stone-800 lg:text-4xl">
        We Joyfully Invite You All
      </h2>

      <div className="relative mx-auto mt-4 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-[#d4af37]/50" />
        <span className="text-[#6b1a30]/40" aria-hidden>
          ✝
        </span>
        <span className="text-[#d4af37]" aria-hidden>
          ❋
        </span>
        <div className="h-px w-12 bg-[#d4af37]/50" />
      </div>

      <p className="relative mx-auto mt-6 max-w-md text-base leading-relaxed text-stone-700">
        To join us as we celebrate the beginning of our forever — a union blessed
        by tradition, faith, and the love of everyone dear to us.
      </p>

      <p className="relative mx-auto mt-4 max-w-sm font-serif text-sm italic text-stone-600">
        Your presence would honour us more than any gift.
      </p>
    </div>
  );
}
