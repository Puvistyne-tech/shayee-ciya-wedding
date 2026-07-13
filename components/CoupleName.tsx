"use client";

import { useTranslations } from "next-intl";
import { useHonorifics } from "@/components/HonorificContext";
import { getCoupleNameClass } from "@/lib/coupleNameStyles";
import type { HonorificKey } from "@/lib/honorifics";

const prefixButtonClass =
  "cursor-pointer rounded-sm underline decoration-dotted decoration-stone-400/70 underline-offset-[0.2em] transition-colors hover:text-[#6b1a30] hover:decoration-[#6b1a30]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b1a30]/30";

function HonorificPrefix({
  honorific,
  children,
}: {
  honorific: HonorificKey;
  children: string;
}) {
  const t = useTranslations("honorifics");
  const { revealHonorific } = useHonorifics();

  return (
    <button
      type="button"
      onClick={() => revealHonorific(honorific)}
      className={prefixButtonClass}
      aria-label={honorific === "groom" ? t("openGroom") : t("openBride")}
    >
      {children}
    </button>
  );
}

export function CoupleName({
  prefix,
  name,
  locale,
  variant,
  honorific,
  as: Tag = "p",
}: {
  prefix?: string;
  name: string;
  locale: string;
  variant: "invitation" | "spotlight";
  honorific?: HonorificKey;
  as?: "p" | "h2";
}) {
  const className = getCoupleNameClass(locale, variant);
  const showClickablePrefix = Boolean(prefix && honorific);

  if (prefix && (locale === "ta" || locale === "fr")) {
    return (
      <Tag className={className}>
        {showClickablePrefix ? (
          <span className="block whitespace-nowrap">
            <HonorificPrefix honorific={honorific!}>{prefix}</HonorificPrefix>
          </span>
        ) : (
          <span className="block whitespace-nowrap">{prefix}</span>
        )}
        <span className="block whitespace-nowrap">{name}</span>
      </Tag>
    );
  }

  if (prefix) {
    return (
      <Tag className={`${className} break-words`}>
        {showClickablePrefix ? (
          <>
            <HonorificPrefix honorific={honorific!}>{prefix}</HonorificPrefix>{" "}
            {name}
          </>
        ) : (
          <>
            {prefix} {name}
          </>
        )}
      </Tag>
    );
  }

  return (
    <Tag className={`${className} break-words`}>
      {name}
    </Tag>
  );
}
