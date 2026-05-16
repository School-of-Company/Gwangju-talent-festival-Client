import { cn } from "@/shared/utils/cn";

const videoSrc = process.env.NEXT_PUBLIC_INTRO_VIDEO_URL ?? "/videos/intro-video.mp4";

export default function MainYoutubeVideo() {
  return (
    <>
      <div className={cn("absolute", "inset-0", "overflow-hidden")}>
        <video
          className={cn(
            "absolute",
            "top-1/2",
            "left-1/2",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "w-[177.78vh]",
            "h-[56.25vw]",
            "min-w-full",
            "min-h-full",
            "scale-[1.15]",
            "pointer-events-none",
          )}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      <div
        className={cn(
          "absolute",
          "inset-0",
          "bg-gradient-to-t",
          "from-black",
          "via-black/30",
          "to-black/10",
        )}
      />
      <div
        className={cn(
          "absolute",
          "inset-0",
          "bg-gradient-to-b",
          "from-black/60",
          "to-transparent",
        )}
      />
    </>
  );
}
