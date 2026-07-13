export function getCoupleNameClass(
  locale: string,
  variant: "invitation" | "spotlight"
) {
  if (locale === "ta") {
    return variant === "invitation"
      ? "mt-3 font-serif text-xl leading-snug text-stone-800"
      : "mt-3 text-center font-serif text-2xl leading-snug text-stone-800 sm:text-3xl";
  }

  return variant === "invitation"
    ? "mt-3 font-script text-4xl text-stone-800"
    : "mt-3 text-center font-script text-4xl text-stone-800 sm:text-5xl";
}
