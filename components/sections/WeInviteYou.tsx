"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import FlexiblePhoto from "@/components/FlexiblePhoto";
import { PHOTO_PATHS } from "@/lib/photos";

export default function WeInviteYou() {
  const t = useTranslations("weInviteYou");
  const locale = useLocale();
  const isTamil = locale === "ta";
  const [heroError, setHeroError] = useState(false);

  return (
    <div className="relative mt-12 overflow-hidden border-t border-stone-200 px-4 pt-12 pb-10 text-center sm:px-6">
      {!heroError && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FlexiblePhoto
            src={PHOTO_PATHS.coupleHero}
            alt=""
            onLoadFailed={() => setHeroError(true)}
            className="h-full w-full object-cover object-[center_35%]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-cream/75" />
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

      <p
        className={
          isTamil
            ? "relative text-[11px] tracking-[0.12em] text-[#8b7355]"
            : "relative text-xs tracking-[0.3em] text-[#8b7355] uppercase"
        }
      >
        {t("eyebrow")}
      </p>

      <h2
        className={
          isTamil
            ? "relative mx-auto mt-4 max-w-lg font-serif text-xl leading-snug font-medium text-stone-800 sm:text-2xl"
            : "relative mt-4 font-serif text-3xl leading-snug font-medium tracking-wide text-stone-800 lg:text-4xl"
        }
      >
        {t("heading")}
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

      <p
        className={
          isTamil
            ? "relative mx-auto mt-6 max-w-lg text-sm leading-relaxed text-stone-700"
            : "relative mx-auto mt-6 max-w-md text-base leading-relaxed text-stone-700"
        }
      >
        {t("body")}
      </p>

      <p
        className={
          isTamil
            ? "relative mx-auto mt-4 max-w-md font-serif text-xs italic leading-relaxed text-stone-600"
            : "relative mx-auto mt-4 max-w-sm font-serif text-sm italic text-stone-600"
        }
      >
        {t("closing")}
      </p>
    </div>
  );
}
