"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ScrollIndicator from "@/components/ScrollIndicator";
import VideoHero from "@/components/VideoHero";
import InvitationHeader from "@/components/sections/InvitationHeader";
import OurStory from "@/components/sections/OurStory";
import PhotoGallery from "@/components/sections/PhotoGallery";
import RSVPForm from "@/components/sections/RSVPForm";
import SaveTheDate from "@/components/sections/SaveTheDate";
import Schedule from "@/components/sections/Schedule";
import Venue from "@/components/sections/Venue";

const EnvelopeOverlay = dynamic(
  () => import("@/components/EnvelopeOverlay"),
  { ssr: false }
);

export default function Home() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <>
      <main className="relative w-full">
        <div className="lg:flex lg:min-h-screen">
          <div className="relative h-dvh w-full lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:shrink-0">
            <VideoHero shouldPlay={envelopeOpen} />
          </div>

          <div className="flex justify-center border-b border-stone-200 bg-gradient-to-b from-stone-200/80 to-cream py-5 lg:hidden">
            <ScrollIndicator targetId="invitation-start" />
          </div>

          <div className="lg:flex lg:w-1/2 lg:flex-col lg:overflow-y-auto lg:h-screen">
            <div className="hidden lg:flex justify-center border-b border-stone-200 bg-stone-100 py-4">
              <ScrollIndicator targetId="our-story" />
            </div>
            <InvitationHeader className="lg:flex lg:flex-1 lg:flex-col lg:justify-center" />
          </div>
        </div>

        <div id="our-story">
          <OurStory />
        </div>
        <PhotoGallery />
        <Schedule />
        <Venue />
        <SaveTheDate />
        <RSVPForm />

        <footer className="border-t border-stone-200 px-6 py-10 text-center">
          <p className="font-serif text-sm italic text-stone-600">
            Cordially Inviting You,
          </p>
          <p className="mt-3 text-sm text-stone-700">
            K. Ravi – R. Kalamathi
          </p>
          <p className="text-sm text-stone-700">
            S. Rajasegar – R. Amuthalini
          </p>
        </footer>
      </main>

      <EnvelopeOverlay onOpen={() => setEnvelopeOpen(true)} />
    </>
  );
}
