"use client";

import { useTranslations } from "next-intl";

interface ScrollIndicatorProps {
  targetId: string;
  className?: string;
}

export default function ScrollIndicator({
  targetId,
  className = "",
}: ScrollIndicatorProps) {
  const t = useTranslations("common");

  const scrollToContent = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToContent}
      className={`group flex flex-col items-center gap-1 transition-opacity hover:opacity-80 ${className}`}
      aria-label={t("scrollToInvitation")}
    >
      <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase">
        {t("scroll")}
      </span>
      <div className="animate-bounce-gentle text-stone-600 group-hover:text-stone-800">
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
  );
}
