"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import VideoControls from "@/components/VideoControls";

interface VideoHeroProps {
  shouldPlay: boolean;
}

export default function VideoHero({ shouldPlay }: VideoHeroProps) {
  const t = useTranslations("common");
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollPausedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();

    const showFirstFrame = () => {
      video.currentTime = 0;
      video.pause();
    };

    video.addEventListener("loadeddata", showFirstFrame);
    return () => video.removeEventListener("loadeddata", showFirstFrame);
  }, []);

  useEffect(() => {
    if (!shouldPlay || !videoRef.current) return;

    const video = videoRef.current;
    video.muted = false;
    setIsMuted(false);
    video
      .play()
      .then(() => setHasPlayed(true))
      .catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => setHasPlayed(true));
      });
  }, [shouldPlay]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible =
          entry.isIntersecting && entry.intersectionRatio >= 0.3;

        if (!isVisible) {
          if (!video.paused && !video.ended) {
            scrollPausedRef.current = true;
            video.pause();
          }
          return;
        }

        if (scrollPausedRef.current && !video.ended && (shouldPlay || hasPlayed)) {
          scrollPausedRef.current = false;
          video.play().catch(() => {});
        }
      },
      { threshold: [0, 0.3, 0.5, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldPlay, hasPlayed]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const scrollToContent = () => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const targetId = isDesktop ? "meet-the-couple" : "invitation-start";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative h-full w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full min-h-full min-w-full scale-110 object-cover object-center lg:scale-125"
        playsInline
        muted
        preload="auto"
        onEnded={() => setHasEnded(true)}
      >
        <source src="/assets/intro-video.mp4" type="video/mp4" />
      </video>

      {(shouldPlay || hasPlayed) && (
        <VideoControls isMuted={isMuted} onToggleMute={toggleMute} />
      )}

      <div
        className={`absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent pb-8 pt-16 transition-opacity duration-700 ${
          hasEnded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
          aria-label={t("scrollToInvitation")}
        >
          <span className="text-[10px] tracking-[0.25em] text-white/80 uppercase">
            {t("scroll")}
          </span>
          <div className="animate-bounce-gentle text-white/90 group-hover:text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
              aria-hidden
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}
