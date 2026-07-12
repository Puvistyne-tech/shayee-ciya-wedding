"use client";

import { useState } from "react";

interface CouplePhotoProps {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
}

export default function CouplePhoto({
  src,
  alt,
  fallback,
  className = "",
}: CouplePhotoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-full border-2 border-[#d4af37]/40 bg-gradient-to-br from-stone-100 to-stone-200 font-serif text-lg text-stone-500 ${className}`}
        aria-label={alt}
      >
        {fallback}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
