import { generateICS } from "@/lib/calendarEvent";

export function GET() {
  const ics = generateICS();

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="sayeethan-prasanciya-wedding.ics"',
    },
  });
}
