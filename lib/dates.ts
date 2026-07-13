const WEDDING_DATE = new Date("2026-09-06T09:00:00+02:00");
const RSVP_DEADLINE = new Date("2026-08-15T12:00:00+02:00");

export function formatWeddingDate(
  locale: string,
  options?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(WEDDING_DATE);
}

export function formatWeekday(locale: string) {
  return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(
    WEDDING_DATE
  );
}

export function formatFullDate(locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(WEDDING_DATE);
}

export function formatRsvpDeadline(locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(RSVP_DEADLINE);
}

export { WEDDING_DATE };
