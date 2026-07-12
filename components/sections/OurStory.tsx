"use client";

import { PHOTO_PATHS } from "@/lib/photos";

const milestones = [
  {
    year: "2019",
    title: "How We Met",
    description:
      "Our paths crossed at a mutual friend's gathering, and an evening of laughter turned into something neither of us expected.",
  },
  {
    year: "2020",
    title: "First Date",
    description:
      "A quiet dinner that stretched into hours of conversation — we knew then that this was the beginning of something beautiful.",
  },
  {
    year: "2023",
    title: "Together",
    description:
      "Through every season, we grew closer, building a life filled with love, adventure, and unwavering support for one another.",
  },
  {
    year: "2025",
    title: "The Proposal",
    description:
      "Under a sky full of stars, he asked and she said yes — and our forever began.",
  },
] as const;

function StoryPhoto({ year, title }: { year: string; title: string }) {
  const src = PHOTO_PATHS.story[year as keyof typeof PHOTO_PATHS.story];

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-stone-200 bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        className="aspect-[4/3] w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement?.classList.add("hidden");
        }}
      />
    </div>
  );
}

export default function OurStory() {
  return (
    <section className="px-6 py-14">
      <h2 className="text-center font-serif text-2xl font-medium tracking-wide">
        Our Story
      </h2>
      <div className="mx-auto mt-2 h-px w-16 bg-stone-300" />

      <div className="relative mt-10">
        <div className="absolute top-0 bottom-0 left-4 w-px bg-stone-200" />

        <div className="space-y-10">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="relative pl-12">
              <div className="absolute top-1 left-2.5 h-3 w-3 rounded-full border-2 border-stone-400 bg-cream" />
              <p className="text-xs font-semibold tracking-widest text-gold uppercase">
                {milestone.year}
              </p>
              <h3 className="mt-1 font-serif text-lg font-medium">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {milestone.description}
              </p>
              <StoryPhoto year={milestone.year} title={milestone.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
