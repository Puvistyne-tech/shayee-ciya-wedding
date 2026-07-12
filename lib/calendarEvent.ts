import { VENUE_ADDRESS, VENUE_NAME } from "@/lib/venue";

const WEDDING = {
  title: "Sayeethan & Prasanciya — Wedding",
  location: `${VENUE_NAME}, ${VENUE_ADDRESS}`,
  description:
    "Join us as we celebrate our wedding. Muhurtham: 9:00 AM – 11:00 AM. Reception: 4:00 PM.",
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

function buildEvent(uid: string, summary: string, start: string, end: string) {
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
    `DESCRIPTION:${escapeICS(WEDDING.description)}`,
    `LOCATION:${escapeICS(WEDDING.location)}`,
    "END:VEVENT",
  ].join("\r\n");
}

export function generateICS() {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sayeethan Prasanciya Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    buildEvent(
      "wedding-ceremony@sayeethan-prasanciya",
      "Wedding Ceremony — Sayeethan & Prasanciya",
      WEDDING.ceremonyStart,
      WEDDING.ceremonyEnd
    ),
    buildEvent(
      "wedding-reception@sayeethan-prasanciya",
      "Wedding Reception — Sayeethan & Prasanciya",
      WEDDING.receptionStart,
      WEDDING.receptionEnd
    ),
    "END:VCALENDAR",
  ].join("\r\n");
}

function googleCalendarUrl(title: string, dates: string) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates,
    details: WEDDING.description,
    location: WEDDING.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getGoogleCeremonyUrl() {
  return googleCalendarUrl(
    "Wedding Ceremony — Sayeethan & Prasanciya",
    WEDDING.googleCeremonyDates
  );
}

export function getGoogleReceptionUrl() {
  return googleCalendarUrl(
    "Wedding Reception — Sayeethan & Prasanciya",
    WEDDING.googleReceptionDates
  );
}

export function getOutlookUrl() {
  const params = new URLSearchParams({
    subject: WEDDING.title,
    startdt: "2026-09-06T09:00:00",
    enddt: "2026-09-06T18:00:00",
    body: WEDDING.description,
    location: WEDDING.location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function downloadICS() {
  const blob = new Blob([generateICS()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sayeethan-prasanciya-wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export { WEDDING };
