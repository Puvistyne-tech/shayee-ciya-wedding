"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { LocaleFlag } from "@/components/LocaleFlag";

const localeOrder: Locale[] = ["ta", "en", "fr"];

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");

  return (
    <nav
      aria-label={t("label")}
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      {localeOrder.map((code) => {
        const isActive = locale === code;

        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            aria-label={t(code)}
            aria-current={isActive ? "page" : undefined}
            className={[
              "rounded-md p-1.5 transition-all",
              isActive
                ? "bg-stone-200/80 ring-2 ring-[#6b1a30]/40 ring-offset-2 ring-offset-cream"
                : "opacity-70 hover:opacity-100 hover:bg-stone-100",
            ].join(" ")}
          >
            <LocaleFlag locale={code} className="h-5 w-8 rounded-sm border border-stone-200/80 object-cover shadow-sm" />
          </Link>
        );
      })}
    </nav>
  );
}
