"use client";

import { useLocale, useTranslations } from "next-intl";
import { useFlexiblePhotoSrc } from "@/components/FlexiblePhoto";
import { PHOTO_PATHS } from "@/lib/photos";
import { getCoupleNameClass } from "@/lib/coupleNameStyles";

function PortraitPhoto({
  src,
  alt,
  placeholder,
  className = "",
}: {
  src: string;
  alt: string;
  placeholder: string;
  className?: string;
}) {
  const { src: resolvedSrc, failed, handleError } = useFlexiblePhotoSrc(src);

  if (failed) {
    return (
      <div
        className={`flex aspect-[3/4] items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-100/80 text-sm text-stone-400 ${className}`}
      >
        {placeholder}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={alt}
      onError={handleError}
      className={`aspect-[3/4] w-full rounded-2xl object-contain drop-shadow-md ${className}`}
    />
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto flex items-center justify-center gap-3">
      <div className="h-px w-12 bg-[#d4af37]/50" />
      <span className="text-[#d4af37]" aria-hidden>
        ❋
      </span>
      <div className="h-px w-12 bg-[#d4af37]/50" />
    </div>
  );
}

function BrideSpotlight() {
  const t = useTranslations("meetTheCouple");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section
      id="meet-the-couple"
      className="border-b border-stone-200 bg-cream px-6 py-14"
    >
      <p className="text-center text-xs tracking-[0.3em] text-[#8b7355] uppercase">
        {t("theBride")}
      </p>
      <h2 className={getCoupleNameClass(locale, "spotlight")}>
        {t("brideName")}
      </h2>
      <SectionDivider />

      <div className="mx-auto mt-8 max-w-xs sm:max-w-sm">
        <PortraitPhoto
          src={PHOTO_PATHS.bride}
          alt="Prasanciya"
          placeholder={tCommon("photoComingSoon")}
        />
      </div>

      <p className="mx-auto mt-8 max-w-md text-center font-serif text-lg leading-relaxed text-stone-700 italic">
        &ldquo;{t("brideQuote")}&rdquo;
      </p>
      <p className="mx-auto mt-3 max-w-sm text-center text-sm text-stone-500">
        {t("brideParents")}
      </p>
    </section>
  );
}

function GroomSpotlight() {
  const t = useTranslations("meetTheCouple");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="border-b border-stone-200 bg-gradient-to-b from-white to-cream px-6 py-14">
      <p className="text-center text-xs tracking-[0.3em] text-[#8b7355] uppercase">
        {t("theGroom")}
      </p>
      <h2 className={getCoupleNameClass(locale, "spotlight")}>
        {t("groomName")}
      </h2>
      <SectionDivider />

      <div className="mx-auto mt-8 max-w-xs sm:max-w-sm">
        <PortraitPhoto
          src={PHOTO_PATHS.groom}
          alt="Sayeethan"
          placeholder={tCommon("photoComingSoon")}
        />
      </div>

      <p className="mx-auto mt-8 max-w-md text-center font-serif text-lg leading-relaxed text-stone-700 italic">
        &ldquo;{t("groomQuote")}&rdquo;
      </p>
      <p className="mx-auto mt-3 max-w-sm text-center text-sm text-stone-500">
        {t("groomParents")}
      </p>
    </section>
  );
}

export default function MeetTheCouple() {
  return (
    <>
      <BrideSpotlight />
      <GroomSpotlight />
    </>
  );
}
