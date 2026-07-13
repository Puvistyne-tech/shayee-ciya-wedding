import { getTranslations } from "next-intl/server";
import { generateICS, type CalendarStrings } from "@/lib/calendarEvent";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

async function getCalendarStrings(locale: string): Promise<CalendarStrings> {
  const t = await getTranslations({ locale, namespace: "calendar" });
  return {
    title: t("title"),
    description: t("description"),
    ceremonySummary: t("ceremonySummary"),
    receptionSummary: t("receptionSummary"),
    filename: t("filename"),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLocale = searchParams.get("locale") ?? routing.defaultLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  const strings = await getCalendarStrings(locale);
  const ics = generateICS(strings);

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${strings.filename}"`,
    },
  });
}
