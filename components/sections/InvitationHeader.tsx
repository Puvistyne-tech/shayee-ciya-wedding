"use client";

import { useTranslations, useLocale } from "next-intl";
import CouplePhoto from "@/components/CouplePhoto";
import WeddingCountdown from "@/components/sections/WeddingCountdown";
import WeInviteYou from "@/components/sections/WeInviteYou";
import { PHOTO_PATHS } from "@/lib/photos";
import {
  formatWeddingDate,
  formatWeekday,
} from "@/lib/dates";
import {
  GOOGLE_MAPS_URL,
  VENUE_ADDRESS_LINE1,
  VENUE_ADDRESS_LINE2,
  VENUE_NAME,
} from "@/lib/venue";
import { getCoupleNameClass } from "@/lib/coupleNameStyles";

export default function InvitationHeader({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("invitation");
  const locale = useLocale();

  return (
    <section
      id="invitation-start"
      className={`border-y border-stone-300 bg-cream px-6 py-12 text-center lg:border-y-0 lg:border-l lg:py-16 ${className}`}
    >
      <p className="text-xs tracking-widest text-stone-600 uppercase">
        {t("blessing1")}
      </p>
      <p className="mt-1 text-xs tracking-widest text-stone-600">
        {t("blessing2")}
      </p>

      <h2 className="mt-8 font-serif text-2xl font-medium tracking-wide">
        {t("heading")}
      </h2>

      <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-stone-700 italic">
        {t("body")}
      </p>

      <WeddingCountdown />

      <div className="mx-auto mt-10 grid max-w-lg grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-3 sm:gap-4">
        <div className="min-w-0 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-500 uppercase">
            {t("groom")}
          </p>
          <CouplePhoto
            src={PHOTO_PATHS.groom}
            alt="Sayeethan"
            fallback="S"
            className="mx-auto mt-3 h-24 w-24"
          />
          <p className="mt-3 text-sm leading-relaxed text-stone-600 whitespace-pre-line">
            {t("groomParents")}
          </p>
          <p className="mt-1 text-xs text-stone-500 italic">{t("theirSon")}</p>
          <p className={`${getCoupleNameClass(locale, "invitation")} break-words`}>
            {t("groomName")}
          </p>
        </div>

        <div className="flex flex-col items-center pt-6 shrink-0">
          <div className="h-16 w-px bg-stone-300" />
          <div className="my-2 text-stone-400">&#10047;</div>
          <div className="h-16 w-px bg-stone-300" />
        </div>

        <div className="min-w-0 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-500 uppercase">
            {t("bride")}
          </p>
          <CouplePhoto
            src={PHOTO_PATHS.bride}
            alt="Prasanciya"
            fallback="P"
            className="mx-auto mt-3 h-24 w-24"
          />
          <p className="mt-3 text-sm leading-relaxed text-stone-600 whitespace-pre-line">
            {t("brideParents")}
          </p>
          <p className="mt-1 text-xs text-stone-500 italic">
            {t("theirDaughter")}
          </p>
          <p className={`${getCoupleNameClass(locale, "invitation")} break-words`}>
            {t("brideName")}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white px-4 py-5 text-left">
          <div className="flex items-center gap-2 text-[#6b1a30]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4 shrink-0"
              aria-hidden
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p className="text-xs font-semibold tracking-widest uppercase">
              {t("date")}
            </p>
          </div>
          <p className="mt-2 font-serif text-base font-medium text-stone-800">
            {formatWeddingDate(locale)}
          </p>
          <p className="mt-1 text-sm text-stone-600">
            {formatWeekday(locale)}
          </p>
          <p className="mt-2 text-xs text-stone-500">{t("muhurtham")}</p>
          <p className="text-xs text-stone-500">{t("reception")}</p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white px-4 py-5 text-left">
          <div className="flex items-center gap-2 text-[#6b1a30]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4 shrink-0"
              aria-hidden
            >
              <path d="M12 21s-7-4.5-7-11a7 7 0 1114 0c0 6.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <p className="text-xs font-semibold tracking-widest uppercase">
              {t("venue")}
            </p>
          </div>
          <p className="mt-2 font-serif text-base font-medium text-stone-800">
            {VENUE_NAME}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            {VENUE_ADDRESS_LINE1}
            <br />
            {VENUE_ADDRESS_LINE2}
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-medium tracking-wide text-[#8b7355] underline-offset-2 hover:underline"
          >
            {t("viewOnMaps")}
          </a>
        </div>
      </div>

      <WeInviteYou />
    </section>
  );
}
