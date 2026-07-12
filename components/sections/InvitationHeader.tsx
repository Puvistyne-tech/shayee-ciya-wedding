import CouplePhoto from "@/components/CouplePhoto";
import WeddingCountdown from "@/components/sections/WeddingCountdown";
import WeInviteYou from "@/components/sections/WeInviteYou";
import { PHOTO_PATHS } from "@/lib/photos";
import {
  GOOGLE_MAPS_URL,
  VENUE_ADDRESS_LINE1,
  VENUE_ADDRESS_LINE2,
  VENUE_NAME,
} from "@/lib/venue";

export default function InvitationHeader({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      id="invitation-start"
      className={`border-y border-stone-300 bg-cream px-6 py-12 text-center lg:border-y-0 lg:border-l lg:py-16 ${className}`}
    >
      <p className="text-xs tracking-widest text-stone-600 uppercase">
        Srimathe Ramanujaya Namaha
      </p>
      <p className="mt-1 text-xs tracking-widest text-stone-600">
        || Sri Vigneshwaraya Namaha ||
      </p>

      <h2 className="mt-8 font-serif text-2xl font-medium tracking-wide">
        Wedding Invitation
      </h2>

      <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-stone-700 italic">
        With the blessings of the Almighty and our elders, we cordially invite
        you with your family to attend the auspicious wedding ceremony and to
        bless the newlyweds.
      </p>

      <WeddingCountdown />

      <div className="mt-10 flex items-start justify-center gap-4">
        <div className="flex-1 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-500 uppercase">
            Groom
          </p>
          <CouplePhoto
            src={PHOTO_PATHS.groom}
            alt="Sayeethan"
            fallback="S"
            className="mx-auto mt-3 h-24 w-24"
          />
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Mr. K. Ravi &<br />
            Mrs. R. Kalamathi
          </p>
          <p className="mt-1 text-xs text-stone-500 italic">their son</p>
          <p className="mt-3 font-script text-4xl text-stone-800">
            Chi. Sayeethan
          </p>
        </div>

        <div className="flex flex-col items-center pt-6">
          <div className="h-16 w-px bg-stone-300" />
          <div className="my-2 text-stone-400">&#10047;</div>
          <div className="h-16 w-px bg-stone-300" />
        </div>

        <div className="flex-1 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-500 uppercase">
            Bride
          </p>
          <CouplePhoto
            src={PHOTO_PATHS.bride}
            alt="Prasanciya"
            fallback="P"
            className="mx-auto mt-3 h-24 w-24"
          />
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Mr. S. Rajasegar &<br />
            Mrs. R. Amuthalini
          </p>
          <p className="mt-1 text-xs text-stone-500 italic">their daughter</p>
          <p className="mt-3 font-script text-4xl text-stone-800">
            Sow. Prasanciya
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white px-4 py-5 text-left">
          <div className="flex items-center gap-2 text-[#6b1a30]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4 shrink-0"
              aria-hidden
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p className="text-xs font-semibold tracking-widest uppercase">
              Date
            </p>
          </div>
          <p className="mt-2 font-serif text-base font-medium text-stone-800">
            06 September 2026
          </p>
          <p className="mt-1 text-sm text-stone-600">Sunday</p>
          <p className="mt-2 text-xs text-stone-500">
            Muhurtham: 9:00 AM – 11:00 AM
          </p>
          <p className="text-xs text-stone-500">Reception: 4:00 PM</p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white px-4 py-5 text-left">
          <div className="flex items-center gap-2 text-[#6b1a30]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4 shrink-0"
              aria-hidden
            >
              <path d="M12 21s-7-4.5-7-11a7 7 0 1114 0c0 6.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <p className="text-xs font-semibold tracking-widest uppercase">
              Venue
            </p>
          </div>
          <p className="mt-2 font-serif text-base font-medium text-stone-800">
            {VENUE_NAME}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            {VENUE_ADDRESS_LINE1}
            <br />
            {VENUE_ADDRESS_LINE2}
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-medium tracking-wide text-[#8b7355] underline-offset-2 hover:underline"
          >
            View on Google Maps
          </a>
        </div>
      </div>

      <WeInviteYou />
    </section>
  );
}
