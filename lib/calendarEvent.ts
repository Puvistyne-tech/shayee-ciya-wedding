import { VENUE_ADDRESS, VENUE_NAME } from "@/lib/venue";
import type { Locale } from "@/i18n/routing";

export interface CalendarStrings {
  title: string;
  description: string;
  ceremonySummary: string;
  receptionSummary: string;
  filename: string;
}

const TIMES = {
  ceremonyStart: "20260906T070000Z",
  ceremonyEnd: "20260906T090000Z",
  receptionStart: "20260906T140000Z",
  receptionEnd: "20260906T180000Z",
  googleCeremonyDates: "20260906T070000Z/20260906T090000Z",
  googleReceptionDates: "20260906T140000Z/20260906T180000Z",
};

function escapeICS(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function buildEvent(
  uid: string,
  summary: string,
  start: string,
  end: string,
  strings: CalendarStrings
) {
  const location = `${VENUE_NAME}, ${VENUE_ADDRESS}`;
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${escapeICS(strings.description)}`,
    `LOCATION:${escapeICS(location)}`,
    "END:VEVENT",
  ].join("\r\n");
}

export function generateICS(strings: CalendarStrings) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sayeethan Prasanciya Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    buildEvent(
      "wedding-ceremony@sayeethan-prasanciya",
      strings.ceremonySummary,
      TIMES.ceremonyStart,
      TIMES.ceremonyEnd,
      strings
    ),
    buildEvent(
      "wedding-reception@sayeethan-prasanciya",
      strings.receptionSummary,
      TIMES.receptionStart,
      TIMES.receptionEnd,
      strings
    ),
    "END:VCALENDAR",
  ].join("\r\n");
}

function googleCalendarUrl(
  title: string,
  dates: string,
  strings: CalendarStrings
) {
  const location = `${VENUE_NAME}, ${VENUE_ADDRESS}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates,
    details: strings.description,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getGoogleCeremonyUrl(strings: CalendarStrings) {
  return googleCalendarUrl(
    strings.ceremonySummary,
    TIMES.googleCeremonyDates,
    strings
  );
}

export function getGoogleReceptionUrl(strings: CalendarStrings) {
  return googleCalendarUrl(
    strings.receptionSummary,
    TIMES.googleReceptionDates,
    strings
  );
}

export function getOutlookUrl(strings: CalendarStrings) {
  const location = `${VENUE_NAME}, ${VENUE_ADDRESS}`;
  const params = new URLSearchParams({
    subject: strings.title,
    startdt: "2026-09-06T09:00:00",
    enddt: "2026-09-06T18:00:00",
    body: strings.description,
    location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function downloadICS(strings: CalendarStrings) {
  const blob = new Blob([generateICS(strings)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = strings.filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function getCalendarApiUrl(locale: Locale) {
  return `/api/calendar?locale=${locale}`;
}

export function getWeddingLocation() {
  return `${VENUE_NAME}, ${VENUE_ADDRESS}`;
}
