"use client";

import { useTranslations } from "next-intl";
import {
  GOOGLE_MAPS_URL,
  VENUE_ADDRESS_LINE1,
  VENUE_ADDRESS_LINE2,
  VENUE_NAME,
} from "@/lib/venue";

export default function Venue() {
  const t = useTranslations("venue");

  return (
    <section className="px-6 py-14">
      <h2 className="text-center font-serif text-2xl font-medium tracking-wide">
        {t("heading")}
      </h2>
      <div className="mx-auto mt-2 h-px w-16 bg-stone-300" />

      <div className="mt-8 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M12 21s-7-4.5-7-11a7 7 0 1114 0c0 6.5-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </div>

        <h3 className="font-serif text-xl font-medium">{VENUE_NAME}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {VENUE_ADDRESS_LINE1}
          <br />
          {VENUE_ADDRESS_LINE2}
        </p>

        <p className="mt-6 text-sm text-stone-500 italic">
          {t("dressCode")}
        </p>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-800 px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-stone-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
            <path d="M12 21s-7-4.5-7-11a7 7 0 1114 0c0 6.5-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {t("openInMaps")}
        </a>
      </div>
    </section>
  );
}
