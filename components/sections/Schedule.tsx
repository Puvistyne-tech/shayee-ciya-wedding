const events = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    label: "Date",
    value: "06 September 2026, Sunday",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "Muhurtham",
    value: "Morning 9:00 AM – 11:00 AM",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <circle cx="9" cy="9" r="5" />
        <circle cx="15" cy="15" r="5" />
      </svg>
    ),
    label: "Reception",
    value: "Evening 4:00 PM",
  },
];

export default function Schedule() {
  return (
    <section className="bg-cream px-6 py-14">
      <h2 className="text-center font-serif text-2xl font-medium tracking-wide">
        Schedule of Events
      </h2>
      <div className="mx-auto mt-2 h-px w-16 bg-stone-300" />

      <div className="mt-8 space-y-4">
        {events.map((event) => (
          <div
            key={event.label}
            className="flex items-start gap-4 rounded-lg border border-stone-200 bg-white px-5 py-4"
          >
            <div className="mt-0.5 text-stone-500">{event.icon}</div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
                {event.label}
              </p>
              <p className="mt-1 font-serif text-base font-medium">
                {event.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
