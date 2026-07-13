import type { Locale } from "@/i18n/routing";

const flagSources: Record<Locale, string> = {
  ta: "/assets/flags/sri-lanka.svg",
  en: "/assets/flags/england.svg",
  fr: "/assets/flags/france.svg",
};

export function LocaleFlag({
  locale,
  className = "h-4 w-6 rounded-sm border border-stone-200/80 object-cover shadow-sm",
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagSources[locale]}
      alt=""
      className={className}
      draggable={false}
    />
  );
}
