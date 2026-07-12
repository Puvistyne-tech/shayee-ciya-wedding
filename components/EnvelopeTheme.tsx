export function HinduSymbols() {
  return (
    <div className="flex items-center justify-center gap-3 text-[#d4af37]">
      {/* Chakra */}
      <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden>
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="4" />
        {[0, 45, 90, 135].map((angle) => (
          <line
            key={angle}
            x1="16"
            y1="2"
            x2="16"
            y2="30"
            stroke="currentColor"
            strokeWidth="1"
            transform={`rotate(${angle} 16 16)`}
          />
        ))}
      </svg>
      {/* Tilak */}
      <svg viewBox="0 0 24 32" className="h-6 w-4" fill="currentColor" aria-hidden>
        <path d="M12 2 C6 10, 4 18, 12 30 C20 18, 18 10, 12 2 Z" />
        <path d="M12 8 L12 24" stroke="#4a1020" strokeWidth="1.5" fill="none" />
      </svg>
      {/* Shankha (conch) */}
      <svg viewBox="0 0 32 24" className="h-5 w-7" fill="currentColor" aria-hidden>
        <path d="M4 12 C4 4, 20 2, 28 12 C20 22, 4 20, 4 12 Z" />
        <path d="M10 12 C14 8, 20 8, 24 12" fill="none" stroke="#4a1020" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function DiyaLamp({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 56"
      className={className}
      fill="none"
      aria-hidden
    >
      <ellipse cx="20" cy="48" rx="14" ry="4" fill="#c9a227" opacity="0.4" />
      <path d="M8 48 L32 48 L28 38 L12 38 Z" fill="#d4af37" />
      <path d="M14 38 L26 38 L24 30 L16 30 Z" fill="#b8860b" />
      <path d="M20 30 C16 22, 18 14, 20 6 C22 14, 24 22, 20 30 Z" fill="#ff8c00" />
      <path d="M20 6 C18 2, 22 2, 20 6 Z" fill="#ffd700" />
      <ellipse cx="20" cy="4" rx="3" ry="4" fill="#fff8c0" opacity="0.9" />
    </svg>
  );
}

export function CornerKolam({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <g fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.7">
        <circle cx="8" cy="8" r="6" />
        <circle cx="8" cy="8" r="3" />
        {[0, 60, 120].map((a) => (
          <line
            key={a}
            x1="8"
            y1="8"
            x2={8 + 20 * Math.cos((a * Math.PI) / 180)}
            y2={8 + 20 * Math.sin((a * Math.PI) / 180)}
          />
        ))}
        <path d="M0 20 Q20 0, 40 0" />
        <path d="M0 35 Q35 0, 55 5" opacity="0.5" />
        {[14, 22, 30].map((r) => (
          <circle key={r} cx="8" cy="8" r={r} opacity={0.15 + r * 0.01} />
        ))}
      </g>
    </svg>
  );
}

export function CrossWatermark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.12">
        <line x1="30" y1="10" x2="30" y2="70" />
        <line x1="15" y1="28" x2="45" y2="28" />
        <circle cx="30" cy="28" r="22" />
      </g>
    </svg>
  );
}

export function MarigoldGarland({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 24"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      {Array.from({ length: 18 }).map((_, i) => {
        const x = i * 22 + 8;
        return (
          <g key={i} transform={`translate(${x}, 12)`}>
            <circle r="7" fill="#e8a020" opacity="0.85" />
            <circle r="4" fill="#ffd060" />
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                rx="3"
                ry="6"
                fill="#e87820"
                opacity="0.7"
                transform={`rotate(${a})`}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function VineBorder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 20 Q50 5, 100 20 Q150 35, 200 20"
        fill="none"
        stroke="#8b7355"
        strokeWidth="1"
        opacity="0.4"
      />
      {[25, 75, 125, 175].map((x) => (
        <g key={x} transform={`translate(${x}, 20)`}>
          <ellipse rx="4" ry="8" fill="#4a6741" opacity="0.35" transform="rotate(-30)" />
          <ellipse rx="4" ry="8" fill="#4a6741" opacity="0.35" transform="rotate(30)" />
        </g>
      ))}
    </svg>
  );
}

interface EnvelopeHalfProps {
  variant: "top" | "bottom";
}

export function EnvelopeHalfDecor({ variant }: EnvelopeHalfProps) {
  if (variant === "top") {
    return (
      <>
        {/* Burgundy-gold gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3d0f1e] via-[#6b1a30] to-[#a67c52]" />

        {/* Subtle damask pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ffd700 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #ffd700 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ornate gold double border */}
        <div className="absolute inset-3 rounded-sm border border-[#d4af37]/50" />
        <div className="absolute inset-5 rounded-sm border border-[#d4af37]/25" />

        {/* Corner kolams */}
        <CornerKolam className="absolute top-2 left-2 h-16 w-16" />
        <CornerKolam className="absolute top-2 right-2 h-16 w-16 -scale-x-100" />

        {/* Top blessing */}
        <div className="absolute top-8 right-0 left-0 text-center">
          <p className="font-serif text-[10px] leading-relaxed text-[#f5d78e]/90">
            ஸ்ரீமதேராமாநுஜாயநம:
          </p>
          <p className="text-[7px] tracking-wide text-[#f5d78e]/45">
            Salutations to Sri Ramanuja
          </p>
          <p className="mt-1 font-serif text-[10px] leading-relaxed text-[#f5d78e]/80">
            || ஸ்ரீ விக்நேஸ்வராய நம ||
          </p>
          <p className="text-[7px] tracking-wide text-[#f5d78e]/45">
            Salutations to Lord Ganesha
          </p>
          <div className="mt-3 flex justify-center">
            <HinduSymbols />
          </div>
        </div>

        {/* Diya lamps */}
        <DiyaLamp className="absolute top-1/3 left-6 h-14 w-10 opacity-90" />
        <DiyaLamp className="absolute top-1/3 right-6 h-14 w-10 opacity-90" />

        {/* Groom name — centered on upper flap */}
        <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-6 text-center">
          <p className="text-[9px] tracking-[0.3em] text-[#f5d78e]/70 uppercase">
            The Groom
          </p>
          <p className="mt-1 font-script text-4xl text-[#ffd89b] drop-shadow-sm">
            Sayeethan
          </p>
          <p className="mt-2 font-serif text-[11px] leading-relaxed text-[#ffd89b]/90">
            ஓம் சுப விவாஹம்
          </p>
          <p className="text-[7px] tracking-wide text-[#f5d78e]/45">
            Om — auspicious wedding
          </p>
          <p className="mx-auto mt-2.5 max-w-[240px] font-serif text-[10px] leading-relaxed text-[#f5d78e]/80">
            &ldquo;ஸஹ நாவவது, ஸஹ நௌ புனக்து, ஸஹ வீர்யம் கரவாவஹை&rdquo;
          </p>
          <p className="mx-auto mt-1 max-w-[240px] text-[7px] leading-relaxed text-[#f5d78e]/45">
            May we move, nourish, and grow in strength together
          </p>
          <p className="mt-1 text-[7px] tracking-wide text-[#f5d78e]/40">
            — தைத்திரீய உபநிஷத்
          </p>
          <p className="text-[7px] tracking-wide text-[#f5d78e]/40">
            Taittiriya Upanishad
          </p>
          <p className="mt-1.5 font-serif text-[9px] text-[#f5d78e]/65">
            || மங்கள விவாஹ ||
          </p>
          <p className="text-[7px] tracking-wide text-[#f5d78e]/40">
            Sacred matrimony
          </p>
        </div>

        {/* Marigold garland along bottom edge */}
        <MarigoldGarland className="absolute right-4 bottom-3 left-4 h-5 opacity-80" />

        {/* Fold shadow */}
        <div className="absolute inset-0 shadow-[inset_0_-10px_24px_rgba(0,0,0,0.25)]" />
      </>
    );
  }

  return (
    <>
      {/* Ivory-gold gradient base */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f0] via-[#f5e6d0] to-[#c9a87c]" />

      {/* Parchment texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ornate borders */}
      <div className="absolute inset-3 rounded-sm border border-[#8b7355]/40" />
      <div className="absolute inset-5 rounded-sm border border-[#d4af37]/30" />

      {/* Corner kolams (inverted) */}
      <CornerKolam className="absolute bottom-2 left-2 h-16 w-16 -scale-y-100" />
      <CornerKolam className="absolute right-2 bottom-2 h-16 w-16 -scale-x-100 -scale-y-100" />

      {/* Christian cross watermark */}
      <CrossWatermark className="absolute top-1/2 left-1/2 h-32 w-24 -translate-x-1/2 -translate-y-1/2 text-[#6b1a30]" />

      {/* Bride name & Bible verse */}
      <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center">
        <p className="text-[9px] tracking-[0.3em] text-[#8b7355]/70 uppercase">
          The Bride
        </p>
        <p className="mt-1 font-script text-4xl text-[#6b1a30]/80">
          Prasanciya
        </p>
        <p className="mx-auto mt-4 max-w-[260px] font-serif text-[10px] leading-relaxed text-[#6b1a30]/75">
          &ldquo;எனவே, கடவுள் இணைத்ததை மனிதர் பிரிக்காதிருக்கட்டும்&rdquo;
        </p>
        <p className="mx-auto mt-1 max-w-[260px] text-[7px] leading-relaxed text-[#8b7355]/45">
          Therefore what God has joined, let no one separate
        </p>
        <p className="mt-1 text-[7px] tracking-wide text-[#8b7355]/40">
          — மத்தேயு 19:6, திருவிவிலியம்
        </p>
        <p className="text-[7px] tracking-wide text-[#8b7355]/40">
          Matthew 19:6 — Tamil Catholic Bible
        </p>
      </div>

      {/* Vine borders */}
      <VineBorder className="absolute top-4 right-8 left-8 h-6 opacity-60" />
      <VineBorder className="absolute right-8 bottom-16 left-8 h-6 opacity-60" />

      {/* Cross at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8b7355]/40">
        <span className="text-xl">✝</span>
      </div>

      {/* Fold shadow */}
      <div className="absolute inset-0 shadow-[inset_0_10px_24px_rgba(0,0,0,0.12)]" />
    </>
  );
}

function SealImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <span className={`isolate block  ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block h-auto w-full pointer-events-none mix-blend-screen"
      />
    </span>
  );
}

export { SealImage };
