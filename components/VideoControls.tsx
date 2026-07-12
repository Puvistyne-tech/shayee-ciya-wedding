interface VideoControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function VideoControls({
  isMuted,
  onToggleMute,
}: VideoControlsProps) {
  return (
    <button
      type="button"
      onClick={onToggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
      className="absolute right-4 bottom-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/90 shadow-lg backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white"
    >
      {isMuted ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="m16 9 6 6M22 9l-6 6" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="M15.5 9.5a4.5 4.5 0 0 1 0 7" />
          <path d="M18 7a7.5 7.5 0 0 1 0 10" />
        </svg>
      )}
    </button>
  );
}
