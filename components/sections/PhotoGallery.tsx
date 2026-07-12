"use client";

import { useState } from "react";
import { PHOTO_PATHS } from "@/lib/photos";

function GalleryImage({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-100 text-xs text-stone-400">
        Photo coming soon
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
    </button>
  );
}

export default function PhotoGallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section className="bg-cream px-6 py-14">
      <h2 className="text-center font-serif text-2xl font-medium tracking-wide">
        Our Moments
      </h2>
      <div className="mx-auto mt-2 h-px w-16 bg-stone-300" />
      <p className="mx-auto mt-4 max-w-md text-center text-sm text-stone-600">
        A glimpse of our journey together
      </p>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {PHOTO_PATHS.gallery.map((src, index) => (
          <GalleryImage
            key={src}
            src={src}
            alt={`Couple photo ${index + 1}`}
            onClick={() => setLightboxSrc(src)}
          />
        ))}
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
        >
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white"
            aria-label="Close"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxSrc}
            alt="Enlarged couple photo"
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
