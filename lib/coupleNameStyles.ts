export function getCoupleNameClass(
  locale: string,
  variant: "invitation" | "spotlight"
) {
  if (locale === "ta") {
    return variant === "invitation"
      ? "mt-3 font-serif leading-snug text-stone-800 text-[clamp(0.65rem,2.5vw,1.125rem)]"
      : "mt-3 text-center font-serif leading-snug text-stone-800 text-[clamp(0.8rem,3.2vw,1.75rem)]";
  }

  if (locale === "fr") {
    return variant === "invitation"
      ? "mt-3 font-serif leading-snug text-stone-800 text-[clamp(0.6rem,2.2vw,1rem)]"
      : "mt-3 text-center font-serif leading-snug text-stone-800 text-[clamp(0.75rem,2.8vw,1.5rem)]";
  }

  return variant === "invitation"
    ? "mt-3 font-script text-4xl text-stone-800"
    : "mt-3 text-center font-script text-4xl text-stone-800 sm:text-5xl";
}
