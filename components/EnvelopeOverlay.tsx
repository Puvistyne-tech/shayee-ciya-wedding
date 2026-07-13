"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { EnvelopeHalfDecor, SealImage } from "@/components/EnvelopeTheme";
import { playCrackSound, unlockAudio } from "@/lib/playCrackSound";

type SealPhase = "intact" | "broken";
type DragZone = "top" | "bottom";

interface EnvelopeOverlayProps {
  onOpen: () => void;
}

const OPEN_THRESHOLD = 0.45;
const SEAL_ZONE_PX = 140;

function SwipeHint({
  direction,
  label,
  className,
}: {
  direction: "up" | "down";
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 flex flex-col items-center text-center ${className}`}
    >
      <p className="font-serif text-xs font-medium tracking-widest text-[#f5d78e] uppercase drop-shadow-sm">
        {label}
      </p>
      <div
        className={`mt-1 text-[#f5d78e] ${direction === "up" ? "animate-bounce-up" : "animate-bounce-gentle"}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="h-7 w-7"
          aria-hidden
        >
          {direction === "up" ? (
            <path d="M12 19V5M5 12l7-7 7 7" />
          ) : (
            <path d="M12 5v14M5 12l7 7 7-7" />
          )}
        </svg>
      </div>
    </div>
  );
}

export default function EnvelopeOverlay({ onOpen }: EnvelopeOverlayProps) {
  const t = useTranslations("envelope");
  const [sealPhase, setSealPhase] = useState<SealPhase>("intact");
  const [openProgress, setOpenProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartY = useRef(0);
  const dragStartProgress = useRef(0);
  const dragZoneRef = useRef<DragZone>("top");
  const openProgressRef = useRef(0);
  const hasOpened = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sealPhaseRef = useRef<SealPhase>("intact");

  useEffect(() => {
    sealPhaseRef.current = sealPhase;
  }, [sealPhase]);

  useEffect(() => {
    const lockScroll = !isFullyOpen && !isHidden;
    document.body.style.overflow = lockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isHidden, isFullyOpen]);

  const completeOpen = useCallback(() => {
    if (hasOpened.current) return;
    hasOpened.current = true;
    setIsFullyOpen(true);
    onOpen();
    window.setTimeout(() => setIsHidden(true), 450);
  }, [onOpen]);

  const breakSeal = useCallback(() => {
    if (sealPhaseRef.current !== "intact") return;
    sealPhaseRef.current = "broken";
    setSealPhase("broken");
    void playCrackSound();
  }, []);

  const handleSealPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    unlockAudio();
    breakSeal();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    unlockAudio();

    if (sealPhaseRef.current === "intact") {
      breakSeal();
      return;
    }
    if (isFullyOpen) return;

    const seamY = window.innerHeight / 2;
    const y = e.clientY;

    if (y >= seamY - SEAL_ZONE_PX && y < seamY) {
      dragZoneRef.current = "top";
    } else if (y >= seamY && y <= seamY + SEAL_ZONE_PX) {
      dragZoneRef.current = "bottom";
    } else {
      return;
    }

    overlayRef.current?.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setIsAnimating(false);
    dragStartY.current = e.clientY;
    dragStartProgress.current = openProgress;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const maxDrag = window.innerHeight * 0.5;
    const deltaY =
      dragZoneRef.current === "top"
        ? dragStartY.current - e.clientY
        : e.clientY - dragStartY.current;
    const next = Math.min(
      1,
      Math.max(0, dragStartProgress.current + deltaY / maxDrag)
    );
    openProgressRef.current = next;
    setOpenProgress(next);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsAnimating(true);

    if (openProgressRef.current >= OPEN_THRESHOLD) {
      openProgressRef.current = 1;
      setOpenProgress(1);
      completeOpen();
    } else {
      openProgressRef.current = 0;
      setOpenProgress(0);
    }
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (openProgressRef.current >= 1) {
      setIsHidden(true);
    }
  };

  const halfStyle = (direction: "up" | "down") => ({
    transform:
      direction === "up"
        ? `translateY(-${openProgress * 100}%)`
        : `translateY(${openProgress * 100}%)`,
    transition: isDragging ? "none" : "transform 0.35s ease-out",
  });

  const sealTransition = isDragging ? "none" : "transform 0.35s ease-out";

  const topSealStyle = {
    transform: `translate(-50%, calc(-60% - ${openProgress * 50}dvh))`,
    transition: sealTransition,
  };

  const bottomSealStyle = {
    transform: `translate(-50%, calc(-20% + ${openProgress * 50}dvh))`,
    transition: sealTransition,
  };

  const showHints =
    sealPhase === "broken" && openProgress < 0.05 && !isDragging && !isFullyOpen;

  if (isHidden) return null;

  return (
    <div
      ref={overlayRef}
      className={[
        "fixed inset-0 z-50 overflow-visible bg-[#6b1a30] select-none",
        sealPhase === "broken" && !isFullyOpen ? "touch-none" : "",
        isFullyOpen ? "pointer-events-none" : "pointer-events-auto",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        opacity: isFullyOpen ? 0 : 1,
        transition: isFullyOpen ? "opacity 0.4s ease-out" : "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 h-[calc(50dvh+6px)] w-full z-20"
        style={halfStyle("up")}
        onTransitionEnd={isAnimating ? handleTransitionEnd : undefined}
      >
        <div className="absolute inset-0 overflow-hidden">
          <EnvelopeHalfDecor variant="top" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[50dvh] w-full z-10"
        style={halfStyle("down")}
      >
        <div className="absolute inset-0 overflow-hidden">
          <EnvelopeHalfDecor variant="bottom" />
        </div>
      </div>

      {showHints && (
        <>
          <SwipeHint
            direction="up"
            label={t("swipeUp")}
            className="top-[calc(50dvh-6.5rem)] left-1/2 z-40 -translate-x-1/2"
          />
          <SwipeHint
            direction="down"
            label={t("swipeDown")}
            className="top-[calc(50dvh+5rem)] left-1/2 z-40 -translate-x-1/2 [&_p]:text-[#6b1a30]/90 [&_svg]:text-[#6b1a30]/80"
          />
        </>
      )}

      {sealPhase === "broken" && (
        <>
          <div
            className="pointer-events-none absolute top-[50dvh] left-1/2 z-20 w-44"
            style={bottomSealStyle}
          >
            <SealImage src="/assets/broken-seal-bottom.png" alt="" />
          </div>
          <div
            className="pointer-events-none absolute top-[50dvh] left-1/2 z-30 w-44"
            style={topSealStyle}
          >
            <SealImage src="/assets/broken-seal-top.png" alt="" />
          </div>
        </>
      )}

      {sealPhase === "intact" && (
        <button
          type="button"
          onPointerDown={handleSealPointerDown}
          className="absolute top-1/2 left-1/2 z-40 min-h-48 min-w-48 -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation transition-transform hover:scale-105 active:scale-95"
          aria-label={t("breakSeal")}
          tabIndex={0}
        >
          <SealImage
            src="/assets/wax-seal.png"
            alt={t("waxSealAlt")}
            className="mx-auto w-44 rounded-full drop-shadow-lg"
          />
        </button>
      )}
    </div>
  );
}
