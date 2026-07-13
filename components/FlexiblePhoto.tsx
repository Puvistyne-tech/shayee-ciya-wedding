"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { alternatePhotoSrc } from "@/lib/photos";

const knownMissing = new Set<string>();

function markMissing(...urls: (string | null | undefined)[]) {
  for (const url of urls) {
    if (url) knownMissing.add(url);
  }
}

function isKnownMissing(src: string): boolean {
  const alternate = alternatePhotoSrc(src);
  return knownMissing.has(src) && (!alternate || knownMissing.has(alternate));
}

export function useFlexiblePhotoSrc(initialSrc: string) {
  const [src, setSrc] = useState(initialSrc);
  const [failed, setFailed] = useState(false);
  const hasTriedAlternateRef = useRef(false);

  useEffect(() => {
    hasTriedAlternateRef.current = false;
    if (isKnownMissing(initialSrc)) {
      setSrc(initialSrc);
      setFailed(true);
      return;
    }
    setSrc(initialSrc);
    setFailed(false);
  }, [initialSrc]);

  const handleError = useCallback(() => {
    if (!hasTriedAlternateRef.current) {
      const alternate = alternatePhotoSrc(src);
      if (alternate && !knownMissing.has(alternate)) {
        hasTriedAlternateRef.current = true;
        setSrc(alternate);
        return;
      }
    }

    markMissing(initialSrc, src, alternatePhotoSrc(initialSrc));
    setFailed(true);
  }, [initialSrc, src]);

  return { src, failed, handleError };
}

interface FlexiblePhotoProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> {
  src: string;
  onLoadFailed?: () => void;
}

export default function FlexiblePhoto({
  src: initialSrc,
  onLoadFailed,
  ...props
}: FlexiblePhotoProps) {
  const { src, failed, handleError } = useFlexiblePhotoSrc(initialSrc);
  const onLoadFailedRef = useRef(onLoadFailed);
  const didNotifyFailureRef = useRef(false);

  useEffect(() => {
    onLoadFailedRef.current = onLoadFailed;
  }, [onLoadFailed]);

  useEffect(() => {
    didNotifyFailureRef.current = false;
  }, [initialSrc]);

  useEffect(() => {
    if (!failed || didNotifyFailureRef.current) return;
    didNotifyFailureRef.current = true;
    onLoadFailedRef.current?.();
  }, [failed]);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} onError={handleError} {...props} />
  );
}
