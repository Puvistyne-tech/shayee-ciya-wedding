"use client";

import { useTranslations } from "next-intl";
import { useHonorifics } from "@/components/HonorificContext";
import { HONORIFIC_GLOSSARY_ID, type HonorificKey } from "@/lib/honorifics";

const TERMS: { key: HonorificKey; label: string }[] = [
  { key: "groom", label: "Chi." },
  { key: "bride", label: "Sow." },
];

export default function HonorificGlossary() {
  const t = useTranslations("honorifics");
  const { open, toggleHonorific } = useHonorifics();

  return (
    <div
      id={HONORIFIC_GLOSSARY_ID}
      className="mx-auto mt-8 max-w-md border-t border-stone-200 pt-6 scroll-mt-8"
    >
      <p className="font-serif text-sm text-stone-700">{t("title")}</p>
      <p className="mt-1 text-xs text-stone-500">{t("intro")}</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {TERMS.map(({ key, label }) => {
          const isOpen = open === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleHonorific(key)}
              aria-expanded={isOpen}
              className={[
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                isOpen
                  ? "border-[#6b1a30] bg-[#6b1a30]/10 text-[#6b1a30]"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-400",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>

      {open && (
        <div className="mt-5 rounded-lg border border-stone-200 bg-white/80 px-4 py-4 text-left">
          <p className="text-xs font-medium text-stone-500">
            {open === "groom" ? t("groomRole") : t("brideRole")}
            <span className="text-stone-400"> · </span>
            <span className="italic text-stone-600">{t(`${open}.fullForm`)}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {t(`${open}.meaning`)}
          </p>
        </div>
      )}
    </div>
  );
}
