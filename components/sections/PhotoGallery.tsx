"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import FlexiblePhoto, { useFlexiblePhotoSrc } from "@/components/FlexiblePhoto";
import { PHOTO_PATHS } from "@/lib/photos";

const galleryPhotos = PHOTO_PATHS.gallery;

function GalleryImage({
  src,
  alt,
  index,
  placeholder,
  onClick,
}: {
  src: string;
  alt: string;
  index: number;
  placeholder: string;
  onClick: (index: number) => void;
}) {
  const { src: resolvedSrc, failed, handleError } = useFlexiblePhotoSrc(src);

  if (failed) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-100 text-xs text-stone-400">
        {placeholder}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedSrc}
        alt={alt}
        onError={handleError}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
    </button>
  );
}

function LightboxImage({
  src,
  unavailable,
}: {
  src: string;
  unavailable: string;
}) {
  const { src: resolvedSrc, failed, handleError } = useFlexiblePhotoSrc(src);

  if (failed) {
    return (
      <div className="flex h-[70vh] w-[min(90vw,40rem)] items-center justify-center rounded-lg border border-dashed border-white/30 text-sm text-white/60">
        {unavailable}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt=""
      onError={handleError}
      className="max-h-[calc(85vh-5rem)] max-w-[min(90vw,56rem)] rounded-lg object-contain"
    />
  );
}

function NavButton({
  label,
  text,
  onClick,
  direction,
}: {
  label: string;
  text: string;
  onClick: () => void;
  direction: "previous" | "next";
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label={label}
    >
      {direction === "previous" && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      )}
      <span>{text}</span>
      {direction === "next" && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

export default function PhotoGallery() {
  const t = useTranslations("gallery");
  const tCommon = useTranslations("common");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [headingBgError, setHeadingBgError] = useState(false);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current - 1 + galleryPhotos.length) % galleryPhotos.length;
    });
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current + 1) % galleryPhotos.length;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, closeLightbox, showPrevious, showNext]);

  return (
    <section className="bg-cream px-6 py-14">
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden px-6 py-12 text-center sm:py-14">
        {!headingBgError && (
          <div className="pointer-events-none absolute inset-0">
            <FlexiblePhoto
              src={PHOTO_PATHS.momentsBackground}
              alt=""
              onLoadFailed={() => setHeadingBgError(true)}
              className="h-full w-full object-cover object-[center_35%]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-cream/75 backdrop-blur-[1px]" />
          </div>
        )}

        <div className="relative">
          <h2 className="font-serif text-2xl font-medium tracking-wide text-stone-800">
            {t("heading")}
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-stone-300" />
          <p className="mx-auto mt-4 max-w-md text-sm text-stone-600">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {galleryPhotos.map((src, index) => (
          <GalleryImage
            key={src}
            src={src}
            index={index}
            alt={t("photoAlt", { n: index + 1 })}
            placeholder={tCommon("photoComingSoon")}
            onClick={setLightboxIndex}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/85"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t("viewerLabel")}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            aria-label={tCommon("close")}
          >
            ✕
          </button>

          <div
            className="flex flex-1 items-center justify-center p-6 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <LightboxImage
              src={galleryPhotos[lightboxIndex]}
              unavailable={tCommon("photoUnavailable")}
            />
          </div>

          <div
            className="flex items-center justify-between gap-4 border-t border-white/15 bg-black/50 px-4 py-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <NavButton
              label={tCommon("previousPhoto")}
              text={tCommon("previous")}
              direction="previous"
              onClick={showPrevious}
            />
            <p className="text-sm font-medium text-white">
              {lightboxIndex + 1} / {galleryPhotos.length}
            </p>
            <NavButton
              label={tCommon("nextPhoto")}
              text={tCommon("next")}
              direction="next"
              onClick={showNext}
            />
          </div>
        </div>
      )}
    </section>
  );
}
